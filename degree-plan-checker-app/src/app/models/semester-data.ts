import {Course} from "./course";
export class SemesterData {
  term: string;
  year: number;
  courses: Course[];

  constructor(term, year, courses) {
    this.term = term;
    this.year = year;
    this.courses = courses
  }
}
