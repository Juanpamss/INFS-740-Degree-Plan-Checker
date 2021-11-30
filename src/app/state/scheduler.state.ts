import {Course} from "../models/course";
import {SemesterData} from "../models/semester-data";
import {Schedule} from "../models/schedule";

export interface initialState{
  courseList : [],
  prereqList: [],
  totalTakenCredits: number,
  selectedCourses : Course[],
  semesterData : SemesterData[],
  schedules: Schedule[],
  scheduleData: [],
  selectedProgram: string
}

export const initialState = {
  courseList : [],
  prereqList: [],
  totalTakenCredits: 0,
  selectedCourses : [],
  semesterData : [],
  schedules: [],
  scheduleData: [],
  selectedProgram: ""
}
