import {Course} from "../models/course";
import {SemesterData} from "../models/semester-data";

export interface initialState{
  courseList : [],
  prereqList: [],
  selectedCourses : Course[],
  semesterData : SemesterData[]
}

export const initialState = {
  courseList : [],
  prereqList: [],
  selectedCourses : [],
  semesterData : []
}
