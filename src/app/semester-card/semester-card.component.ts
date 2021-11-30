import {Component, Input, OnInit} from '@angular/core';
import {SemesterData} from "../models/semester-data";

@Component({
  selector: 'app-semester-card',
  templateUrl: './semester-card.component.html',
  styleUrls: ['./semester-card.component.css']
})
export class SemesterCardComponent implements OnInit {

  @Input() semesterData : SemesterData = null
  @Input() prereqList : any[] = []

  totalCredits : number

  tooltip

  constructor() { }

  ngOnInit(): void {
    this.totalCredits = this.semesterData.courses.reduce( (total, item) => {
      return total + item.credits;
    }, 0);
  }

  isPrereq(course){
    return this.prereqList.some( e => e.pno == course.cno && e.pcode == course.dcode)
  }

  getPrereqInfo(course){
    return this.prereqList.find( e => e.pno == course.cno && e.pcode == course.dcode)
  }
}
