import { Component, OnInit } from '@angular/core';
import {SemesterData} from "../models/semester-data";
import {getPrereqList, getScheduleDataList, getSemesterDataList} from "../state/scheduler.selector";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-records-data-readonly',
  templateUrl: './records-data-readonly.component.html',
  styleUrls: ['./records-data-readonly.component.css']
})
export class RecordsDataReadonlyComponent implements OnInit {

  semesterData: SemesterData[] = []
  prereqList: any[]
  avgGPA: number = 0

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
  }

}
