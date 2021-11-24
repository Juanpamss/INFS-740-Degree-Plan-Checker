import {Component, Input, OnInit} from '@angular/core';
import {Course} from "../models/course";
import {Store} from "@ngrx/store";
import {updateSelectedCoursesList} from "../state/scheduler.actions";
import {getCourseList, getSelectedCourseList} from "../state/scheduler.selector";
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
  }

  addCourse(course){
    this._store.dispatch(updateSelectedCoursesList({selectedCourse: course}));
  }

  collapsePanel(){
    this.collapsed = true
  }
}
