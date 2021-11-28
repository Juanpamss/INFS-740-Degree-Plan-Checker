import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-estimated-grade',
  templateUrl: './estimated-grade.component.html',
  styleUrls: ['./estimated-grade.component.css']
})
export class EstimatedGradeComponent implements OnInit {

  constructor() { }

  @Input() avgGrade : string
  @Input() avgGpa : number

  ngOnInit(): void {
  }

}
