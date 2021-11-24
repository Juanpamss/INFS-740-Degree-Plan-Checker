import {Component, OnInit, Output} from '@angular/core';
import {Course} from "../models/course";
import {Store} from "@ngrx/store";
import {getSelectedCourseList, getSemesterDataList} from "../state/scheduler.selector";
import {SemesterData} from "../models/semester-data";

@Component({
  selector: 'app-schedule-content',
  templateUrl: './schedule-content.component.html',
  styleUrls: ['./schedule-content.component.css']
})
export class ScheduleContentComponent implements OnInit {

  constructor(
    private _store: Store<{courseList: {courseList: []}}>
  ) { }

  selectedCourses : Course[] = []

  semesterData : SemesterData[] = []

  ngOnInit(): void {
    this._store.select(getSemesterDataList).subscribe(semesterData => {
      this.semesterData = semesterData
    })
  }

}
