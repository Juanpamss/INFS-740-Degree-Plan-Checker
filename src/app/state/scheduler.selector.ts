import {createFeatureSelector, createSelector} from "@ngrx/store";
import {initialState} from "./scheduler.state";

const getCourseListState = createFeatureSelector<initialState>('courseList')
const getPrereqListState = createFeatureSelector<initialState>('prereqList')
const getSelectedCoursesListState = createFeatureSelector<initialState>('selectedCourses')
const getSemesterDataState = createFeatureSelector<initialState>('semesterData')
const getSchedulesState = createFeatureSelector<initialState>('schedules')
const getScheduleDataState = createFeatureSelector<initialState>('scheduleData')
const getTotalTakenCreditsState = createFeatureSelector<initialState>('totalTakenCredits')
const getSelectedProgramState = createFeatureSelector<initialState>('selectedProgram')

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

export const getSchedulesList = createSelector(getSchedulesState, (state) => {
  return state.schedules
})

export const getScheduleDataList = createSelector(getScheduleDataState, (state) => {
  return state.scheduleData
})

export const getTotalTakenCreditsList = createSelector(getTotalTakenCreditsState, (state) => {
  return state.totalTakenCredits
})

export const getSelectedProgram = createSelector(getSelectedProgramState, (state) => {
  return state.selectedProgram
})
