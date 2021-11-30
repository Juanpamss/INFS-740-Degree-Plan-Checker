import {createAction, props} from "@ngrx/store";
import {Course} from "../models/course";
import {SemesterData} from "../models/semester-data";
import {Schedule} from "../models/schedule";

export const getCoursesForMajor = createAction('getCoursesForMajor',
  props<{ courseList: any[] }>()
);

export const getPrereqForCourses = createAction('getPrereqForCourses',
  props<{ prereqList: any[] }>()
);

export const updateSelectedCoursesList = createAction('updateSelectedCoursesList',
  props<{ selectedCourse: Course }>()
);

export const generateSemesterData = createAction('generateSemesterData',
  props<{ semesterData: SemesterData[] }>()
);

export const getSchedules = createAction('getSchedulesList',
  props<{ schedules: any[] }>()
);

export const getScheduleData = createAction('getScheduleDataList',
  props<{ scheduleData: any[] }>()
);

export const updateTotalTakenCreditsCount = createAction('getTotalTakenCreditsList',
  props<{ totalTakenCredits: number }>()
);

export const clearSelectedCourseList = createAction('clearSelectedCourseList');

export const updateSelectedProgram = createAction('getSelectedProgram',
  props<{ selectedProgram: string }>()
);
