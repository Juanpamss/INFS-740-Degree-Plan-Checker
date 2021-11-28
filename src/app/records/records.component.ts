import { Component, OnInit } from '@angular/core';
import {getSchedulesList, getSemesterDataList} from "../state/scheduler.selector";
import {Store} from "@ngrx/store";
import {FirestoreNOSQLService} from "../services/firestore-nosql.service";

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.css']
})
export class RecordsComponent implements OnInit {

  schedules: any[] = []

  constructor(
    private _firestoreService : FirestoreNOSQLService,
    private _store: Store<{schedules: {schedules: []}}>,
  ) { }

  ngOnInit(): void {
    this._firestoreService.getPrerequisites().finally()
    this._firestoreService.getSchedules().finally();
    this._store.select(getSchedulesList).subscribe(schedules => {
      this.schedules = schedules
    })
  }
}
