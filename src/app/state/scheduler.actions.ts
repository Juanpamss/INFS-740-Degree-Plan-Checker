import {createAction, props} from "@ngrx/store";
import {Course} from "../models/course";
import {SemesterData} from "../models/semester-data";

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
