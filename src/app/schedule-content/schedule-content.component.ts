import {Component, Input, OnInit, Output} from '@angular/core';
import {Course} from "../models/course";
import {Store} from "@ngrx/store";
import {
  getPrereqList,
  getSelectedCourseList,
  getSelectedProgram,
  getSemesterDataList
} from "../state/scheduler.selector";
import {SemesterData} from "../models/semester-data";
import {FirestoreNOSQLService} from "../services/firestore-nosql.service";

@Component({
  selector: 'app-schedule-content',
  templateUrl: './schedule-content.component.html',
  styleUrls: ['./schedule-content.component.css']
})
export class ScheduleContentComponent implements OnInit {

  @Input() hidden: boolean

  constructor(
    private _store: Store<{courseList: {courseList: []}}>,
    private _firestoreService : FirestoreNOSQLService
  ) { }

  selectedCourses : Course[] = []
  semesterData : SemesterData[] = []
  prereqList: any[] = []
  avgGPA : number = 0
  selectedProgram: string = ""

  ngOnInit(): void {
    this._store.select(getSemesterDataList).subscribe(semesterData => {
      this.semesterData = semesterData

      //Calculate expected GP
      let courseCounter = 0
      let auxAvg = 0
      this.semesterData.forEach( e => {
        auxAvg +=  e.courses.reduce( (total, item) => {
          courseCounter++
          return total + item.avgGPA;
        }, 0);

      })
      this.avgGPA = Number((auxAvg/courseCounter).toFixed(2))
    })
    this._store.select(getPrereqList).subscribe(prereqList => {
      this.prereqList = prereqList
    })
    this._store.select(getSelectedProgram).subscribe(selectedProgram => {
      this.selectedProgram = selectedProgram
    })
  }

  saveSemesterDataIntoDB(){
    this._firestoreService.insertScheduleData(this.semesterData, this.selectedProgram).finally(
      () => {
        alert("Schedules Saved Successfully!")
      }
    );
  }
}
