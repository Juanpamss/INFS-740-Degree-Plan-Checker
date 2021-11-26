import {Component, Input, OnInit, Output} from '@angular/core';
import {Course} from "../models/course";
import {Store} from "@ngrx/store";
import {getSelectedCourseList, getSemesterDataList} from "../state/scheduler.selector";
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

  ngOnInit(): void {
    this._store.select(getSemesterDataList).subscribe(semesterData => {
      this.semesterData = semesterData
    })
  }

  saveSemesterDataIntoDB(){
    this._firestoreService.insertScheduleData(this.semesterData).finally(
      () => {
        alert("Schedules Saved Successfully!")
      }
    );
  }
}
