import {Component, Input, OnInit} from '@angular/core';
import {FirestoreNOSQLService} from "../services/firestore-nosql.service";

@Component({
  selector: 'app-records-table',
  templateUrl: './records-table.component.html',
  styleUrls: ['./records-table.component.css']
})
export class RecordsTableComponent implements OnInit {

  @Input() schedules: any[] = []

  constructor(
    private _firestoreService : FirestoreNOSQLService,
  ) { }

  ngOnInit(): void {
  }

  convertDate(date){
    return new Date(date).toLocaleDateString("en-us")
  }

  getScheduleData(tableRow){
    this._firestoreService.getScheduleData(tableRow.scheduleId).then(
      () => {
        this.showElements()
      }
    )
  }

  showElements(){
    let x = document.getElementById("rowRecordsDataReadOnly");
    x.style.display = "block";
  }

}
