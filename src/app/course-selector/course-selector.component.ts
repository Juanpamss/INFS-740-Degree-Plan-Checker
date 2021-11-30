// noinspection SpellCheckingInspection
import { Component, OnInit } from '@angular/core';
import {Course} from "../models/course";
import {Store} from "@ngrx/store";
import {
  getCourseList,
  getPrereqList,
  getSelectedCourseList, getSelectedProgram,
  getSemesterDataList,
  getTotalTakenCreditsList
} from "../state/scheduler.selector";
import {FirestoreNOSQLService} from "../services/firestore-nosql.service";
import {SemesterData} from "../models/semester-data";
import {Calendar} from "../models/calendar";
import {generateSemesterData} from "../state/scheduler.actions";

@Component({
  selector: 'app-course-selector',
  templateUrl: './course-selector.component.html',
  styleUrls: ['./course-selector.component.css']
})
export class CourseSelectorComponent implements OnInit {

  selectedCourses : Course[] = []
  prereqList: any[] = []
  prereqListCopy: any[] = []
  courseList : Course[] = []
  semesterData : SemesterData[] = []
  totalTakenCredits: number = 0
  readonly totalRequiredCredits = 30
  coursesPerSemester : number = 3
  selectedProgram: string = ""

  constructor(
    private _store: Store<{courseList: {courseList: []}}>,
    private _firestoreService : FirestoreNOSQLService
  ) { }

  ngOnInit(): void {
    this._firestoreService.getPrerequisites().finally()
    this._store.select(getCourseList).subscribe(courseList => {
      this.courseList = courseList
    })
    this._store.select(getSelectedCourseList).subscribe(selectedCourses => {
      this.selectedCourses = selectedCourses
    })
    this._store.select(getPrereqList).subscribe(prereqList => {
      this.prereqList = prereqList
      this.prereqListCopy = prereqList
    })
    this._store.select(getSemesterDataList).subscribe(semesterData => {
      this.semesterData = semesterData
    })
    this._store.select(getTotalTakenCreditsList).subscribe(totalTakenCredits => {
      this.totalTakenCredits = totalTakenCredits
    })
    this._store.select(getSelectedProgram).subscribe(selectedProgram => {
      this.selectedProgram = selectedProgram
    })
  }

  generateSchedule(){
    let difference = this.courseList.filter(x => !this.selectedCourses.includes(x))
    let coreCourses : Course[] = []
    let relatedCourses : Course[] = []
    let electiveCourses : Course[] = []
    difference.forEach( e => {
      if(e.type == "Core"){
        coreCourses.push(e)
      }else if (e.type == "Related"){
        relatedCourses.push(e)
      }else {
        electiveCourses.push(e)
      }
    })

    /*console.log("core: ", coreCourses)
    console.log("related: ", relatedCourses)
    console.log("electives: ", electiveCourses)*/

    this.totalTakenCredits = this.selectedCourses.reduce( (total, item) => {
      return total + item.credits;
    }, 0);

    let semesterData : SemesterData[] = []
    let coursesToTake : Course[] = []
    let index = 0
    // Make a copy of the array to make it mutable. By default it is inmutable
    this.prereqList = [...this.prereqList]
    while(this.totalTakenCredits < this.totalRequiredCredits){
      while(coursesToTake.length < this.coursesPerSemester){
        if(coreCourses.length > 0){
          let minCoreCourse = coreCourses.reduce((prev, curr) => {
            return prev.difficulty < curr.difficulty ? prev : curr;
          });
          // Find prereq using pno and pcode
          this.prereqList.every( element => {
            if(element.cno == minCoreCourse.cno && element.dcode == minCoreCourse.dcode){
              minCoreCourse = this.courseList.find( item =>
                item.cno == element.pno && item.dcode == element.pcode
              )
              return false;
            }
            return true;
          })

          coursesToTake.push(minCoreCourse)
          //Remove class from future considerations
          coreCourses.splice(coreCourses.indexOf(minCoreCourse),1)
          this.totalTakenCredits = this.updateTotalCreditsCount(this.totalTakenCredits, minCoreCourse);
          if(this.totalTakenCredits == this.totalRequiredCredits) break;
          if(coursesToTake.length == this.coursesPerSemester) break;
        }

        if(relatedCourses.length > 0){
          let minRelatedCourse = relatedCourses.reduce((prev, curr) => {
            return prev.difficulty < curr.difficulty ? prev : curr;
          });

          // Find prereq using pno and pcode
          let elementToDelete = null;
          this.prereqList.every( element => {
            if(element.cno == minRelatedCourse.cno && element.dcode == minRelatedCourse.dcode){
              minRelatedCourse = this.courseList.find( item =>
                item.cno == element.pno && item.dcode == element.pcode
              )
              elementToDelete = element
              console.log("prereq rel",element)
              return false;
            }
            return true;
          })

          this.prereqList.splice(this.prereqList.indexOf(elementToDelete),1)
          coursesToTake.push(minRelatedCourse)

          //Remove class from future considerations
          relatedCourses.splice(relatedCourses.indexOf(minRelatedCourse),1)
          this.totalTakenCredits = this.updateTotalCreditsCount(this.totalTakenCredits, minRelatedCourse);
          if(this.totalTakenCredits == this.totalRequiredCredits) break;
          if(coursesToTake.length == this.coursesPerSemester) break;
        }

        if(electiveCourses.length > 0){
          let minElectiveCourse = electiveCourses.reduce((prev, curr) => {
            return prev.difficulty < curr.difficulty ? prev : curr;
          });

          // Find prereq using pno and pcode
          let elementToDelete = null;
          this.prereqList.every( element => {
            if(element.cno == minElectiveCourse.cno && element.dcode == minElectiveCourse.dcode){
              minElectiveCourse = this.courseList.find( item =>
                item.cno == element.pno && item.dcode == element.pcode
              )
              elementToDelete = element
              console.log("to delete",this.prereqList.indexOf(elementToDelete))
              return false;
            }
            return true;
          })

          this.prereqList.splice(this.prereqList.indexOf(elementToDelete),1)
          coursesToTake.push(minElectiveCourse)

          //Remove class from future considerations
          electiveCourses.splice(electiveCourses.indexOf(minElectiveCourse),1)
          this.totalTakenCredits = this.updateTotalCreditsCount(this.totalTakenCredits, minElectiveCourse);
          if(this.totalTakenCredits == this.totalRequiredCredits) break;
          if(coursesToTake.length == this.coursesPerSemester) break;
        }
      }

      //Calculate next term
      let nextTerm = ""
      let currentDate = new Date();

      if(semesterData.length == 0){
        if(Calendar.SpringStart < currentDate.getMonth() && Calendar.SpringEnd > currentDate.getMonth()){
          nextTerm = "Fall"
        }else{
          nextTerm = "Spring"
        }

        semesterData = [
          ...semesterData,
          new SemesterData(
            nextTerm,
            currentDate.getFullYear()+1,
            coursesToTake
          )
        ]
      }else{

        let nextYear = 0
        if(semesterData[semesterData.length-1].term == "Fall"){
          nextTerm = "Spring"
          nextYear = semesterData[semesterData.length-1].year+1
        }else{
          nextTerm = "Fall"
          nextYear = semesterData[semesterData.length-1].year
        }

        semesterData = [
          ...semesterData,
          new SemesterData(
            nextTerm,
            nextYear,
            coursesToTake
          )
        ]
      }

      this._store.dispatch(generateSemesterData({semesterData: semesterData}))
      coursesToTake = []
      index++;
    }

    this.showStudyPlanSection();
    this.prereqList = this.prereqListCopy
    this.totalTakenCredits = 0
  }

  updateTotalCreditsCount(totalTakenCredits, course){
    return totalTakenCredits + course.credits
  }

  showStudyPlanSection(){
    let x = document.getElementById("studyPlan");
    x.style.display = "block";
  }

}
