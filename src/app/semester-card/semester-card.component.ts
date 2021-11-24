import {Component, Input, OnInit} from '@angular/core';
import {SemesterData} from "../models/semester-data";

@Component({
  selector: 'app-semester-card',
  templateUrl: './semester-card.component.html',
  styleUrls: ['./semester-card.component.css']
})
export class SemesterCardComponent implements OnInit {

  @Input() semesterData : SemesterData = null

  totalCredits : number

  constructor() { }

  ngOnInit(): void {
    this.totalCredits = this.semesterData.courses.reduce( (total, item) => {
      return total + item.credits;
    }, 0);
  }

}
