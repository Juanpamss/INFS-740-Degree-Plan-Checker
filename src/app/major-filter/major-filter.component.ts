import { Component, OnInit } from '@angular/core';
import { FirestoreNOSQLService } from "../services/firestore-nosql.service";
import {Course} from "../models/course";
import {Store} from "@ngrx/store";
import {
  clearSelectedCourseList,
  getCoursesForMajor,
  updateSelectedCoursesList, updateSelectedProgram,
  updateTotalTakenCreditsCount
} from "../state/scheduler.actions";
import {Observable} from "rxjs";

@Component({
  selector: 'app-major-filter',
  templateUrl: './major-filter.component.html',
  styleUrls: ['./major-filter.component.css']
})
export class MajorFilterComponent implements OnInit {

  majorSelection

  courseList : Course[] = []

  constructor(
    private _firestoreService : FirestoreNOSQLService,
    private _store: Store<{courseList: {courseList: []}}>
  ) {}

  ngOnInit(): void {
    this._store.select('courseList').subscribe((data) => {
      this.courseList = data.courseList
    })
  }

  getCoursesForMajor(){
    this._firestoreService.getCourses(this.majorSelection).finally()
    this._store.dispatch(clearSelectedCourseList());
    this._store.dispatch(updateSelectedProgram({selectedProgram: this.majorSelection}));
    let x = document.getElementById("courseSelection");
    x.style.display = "block";
    x = document.getElementById("electivesColumn");
    x.style.display = "block";
    x = document.getElementById("generateScheduleButton");
    x.style.display = "block";
    x = document.getElementById("relatedColumn");
    x.style.display = "block";
    this.hideStudyPlanSection()
  }

  hideStudyPlanSection(){
    let x = document.getElementById("studyPlan");
    x.style.display = "none";
  }

}
