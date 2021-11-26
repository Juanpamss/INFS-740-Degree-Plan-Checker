import {Course} from "../models/course";
import {SemesterData} from "../models/semester-data";
import {Schedule} from "../models/schedule";

export interface initialState{
  courseList : [],
  prereqList: [],
  selectedCourses : Course[],
  semesterData : SemesterData[],
  schedules: Schedule[],
  scheduleData: []
}

export const initialState = {
  courseList : [],
  prereqList: [],
  selectedCourses : [],
  semesterData : [],
  schedules: [],
  scheduleData: []
}
