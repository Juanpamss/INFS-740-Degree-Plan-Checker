import { Component, OnInit } from '@angular/core';
import {SemesterData} from "../models/semester-data";
import {getScheduleDataList, getSemesterDataList} from "../state/scheduler.selector";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-records-data-readonly',
  templateUrl: './records-data-readonly.component.html',
  styleUrls: ['./records-data-readonly.component.css']
})
export class RecordsDataReadonlyComponent implements OnInit {

  semesterData: SemesterData[] = []

  constructor(
    private _store: Store<{scheduleData: {scheduleData: []}}>,
  ) { }

  ngOnInit(): void {
    this._store.select(getScheduleDataList).subscribe(scheduleData => {
      this.semesterData = [...scheduleData].sort(function (a:any,b:any){
        if (a.order < b.order) {
          return -1;
        }
        if (a.order > b.order) {
          return 1;
        }
        return 0;
      })
    })
  }

}
