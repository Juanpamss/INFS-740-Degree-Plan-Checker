import {createReducer, on} from "@ngrx/store";
import {initialState} from "./scheduler.state";
import {
  getCoursesForMajor,
  getPrereqForCourses,
  generateSemesterData,
  updateSelectedCoursesList,
  getSchedules, getScheduleData, updateTotalTakenCreditsCount
} from "./scheduler.actions";
import {getScheduleDataList} from "./scheduler.selector";

const _schedulerReducer = createReducer(
  initialState,
  on(getCoursesForMajor, (state, { courseList }) => {
    return {
      ...state,
      courseList: courseList
    }
  }),
  on(getPrereqForCourses, (state, { prereqList }) => {
    return {
      ...state,
      prereqList: prereqList
    }
  }),
  on(generateSemesterData, (state, { semesterData }) => {
    return {
      ...state,
      semesterData: semesterData
    }
  }),
  on(getSchedules, (state, { schedules }) => {
    return {
      ...state,
      schedules: schedules
    }
  }),
  on(getScheduleData, (state, { scheduleData }) => {
    return {
      ...state,
      scheduleData: scheduleData
    }
  }),
  on(updateTotalTakenCreditsCount, (state, { totalTakenCredits }) => {
    return {
      ...state,
      totalTakenCredits: totalTakenCredits
    }
  }),
  on(updateSelectedCoursesList, (state, { selectedCourse }) => {
    let auxArray = [...state.selectedCourses]
    if(auxArray.some( e => e === selectedCourse)){
      auxArray.splice(auxArray.indexOf(selectedCourse),1)
    }else{
      auxArray.push(selectedCourse)
    }
    return {
      ...state,
      selectedCourses: auxArray
    }
  })
);

export function schedulerReducer(state, action){
  return _schedulerReducer(state, action);
}
