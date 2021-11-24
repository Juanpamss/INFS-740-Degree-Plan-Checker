import {createFeatureSelector, createSelector} from "@ngrx/store";
import {initialState} from "./scheduler.state";

const getCourseListState = createFeatureSelector<initialState>('courseList')
const getPrereqListState = createFeatureSelector<initialState>('prereqList')
const getSelectedCoursesListState = createFeatureSelector<initialState>('selectedCourses')
const getSemesterDataState = createFeatureSelector<initialState>('semesterData')

export const getCourseList = createSelector(getCourseListState, (state) => {
  return state.courseList
})

export const getPrereqList = createSelector(getPrereqListState, (state) => {
  return state.prereqList
})

export const getSelectedCourseList = createSelector(getSelectedCoursesListState, (state) => {
  return state.selectedCourses
})

export const getSemesterDataList = createSelector(getSemesterDataState, (state) => {
  return state.semesterData
})
