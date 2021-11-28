import {Component, Input, OnInit} from '@angular/core';
import {Course} from "../models/course";
import {Store} from "@ngrx/store";
import {updateSelectedCoursesList, updateTotalTakenCreditsCount} from "../state/scheduler.actions";
import {getCourseList, getSelectedCourseList, getTotalTakenCreditsList} from "../state/scheduler.selector";
import {NgbAccordion, NgbPanel, NgbPanelChangeEvent} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-accordion',
  templateUrl: './accordion.component.html',
  styleUrls: ['./accordion.component.css']
})
export class AccordionComponent implements OnInit {

  @Input() accordionType : String
  @Input() filter : Object

  courseList : Course[] = []
  selectedCourses : Course[] = []
  collapsed = false
  totalTakenCredits : number = 0

  constructor(
    private _store: Store<{courseList: {courseList: []}}>
  ) { }

  ngOnInit(): void {
    this._store.select(getCourseList).subscribe(courseList => {
      this.courseList = courseList
    })

    this._store.select(getSelectedCourseList).subscribe(selectedCourses => {
      this.selectedCourses = selectedCourses
    })
    this._store.select(getTotalTakenCreditsList).subscribe(totalTakenCredits => {
      this.totalTakenCredits = totalTakenCredits
    })
  }

  addCourse(course){
    this._store.dispatch(updateSelectedCoursesList({selectedCourse: course}));
    this.updateTotalCreditsCount()
  }

  updateTotalCreditsCount(){
    this._store.dispatch(updateTotalTakenCreditsCount({totalTakenCredits:
        this.selectedCourses.reduce( (total, item) => {
          return total + item.credits;
        }, 0)
    }));
  }

  disabledButton(item){
    let difference = this.courseList.filter(x => !this.selectedCourses.includes(x));
    return difference.some(e => e == item) && this.totalTakenCredits == 30
  }

}
