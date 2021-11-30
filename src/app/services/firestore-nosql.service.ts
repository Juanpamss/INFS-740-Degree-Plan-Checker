import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, orderBy, where, addDoc } from 'firebase/firestore/lite';
import {props, Store} from "@ngrx/store";
import {getCoursesForMajor, getPrereqForCourses, getScheduleData, getSchedules} from "../state/scheduler.actions";
import {SemesterData} from "../models/semester-data";
import firebase from "firebase/compat";
import Timestamp = firebase.firestore.Timestamp;
import {Schedule} from "../models/schedule";

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAh_1F-yLc0LcXhdq-si_sZccUK1Asyuc",
  authDomain: "infs-740-scheduler.firebaseapp.com",
  projectId: "infs-740-scheduler",
  storageBucket: "infs-740-scheduler.appspot.com",
  messagingSenderId: "196035105825",
  appId: "1:196035105825:web:e4a448d59a9efd3a27bf60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class FirestoreNOSQLService {

  db = getFirestore(app);

  constructor(
    private _store: Store<any>
  ) { }

  // Get a list of courses from database
  async getCourses(program) {
    const coursesCol = collection(this.db, 'courses');
    const q = query(coursesCol, where("program", "==", program));
    const coursesSnapshot = await getDocs(q);
    const coursesList = await coursesSnapshot.docs.map(doc => doc.data());
    this._store.dispatch(getCoursesForMajor({courseList: coursesList}));
  }

  // Get a list of prerequisites from database
  async getPrerequisites() {
    const prereqCol = collection(this.db, 'prerequisites');
    const q = query(prereqCol);
    const prereqSnapshot = await getDocs(q);
    const prereqList = await prereqSnapshot.docs.map(doc => doc.data());
    this._store.dispatch(getPrereqForCourses({prereqList: prereqList}));
  }

  // Insert generated schedule into database
  async insertScheduleData(data: SemesterData[], program) {
    const scheduleColRef = collection(this.db, 'schedules');
    const scheduleDataColRef = collection(this.db, 'scheduleData');

    let scheduleToInsert = {
      userId: 1,
      program: program,
      semesterQuantity: data.length,
      createdOn: Date.now()
    }

    //To convert timestamp to date
    addDoc(scheduleColRef, scheduleToInsert).then(function(docRef) {
      data.forEach( (item, index) => {
        let dataToInsert = {
          scheduleId: docRef.id,
          term: item.term,
          year: item.year,
          order: index+1,
          courses: item.courses,
        }
        addDoc(scheduleDataColRef, dataToInsert)
      })
    })
  }

  async getSchedules(){
    const scheduleColRef = collection(this.db, 'schedules');
    //const q = query(prereqCol, where("cno", "in", cnos));
    const q = query(scheduleColRef);
    const scheduleSnapshot = await getDocs(q);
    const schedulesList = scheduleSnapshot.docs.map(
      doc => new Schedule(doc.id, doc.data().userId, doc.data().program, doc.data().semesterQuantity, doc.data().createdOn)
    );
    //Sort schedules manually by date since FireBase does not allow multiple sorting fields
    schedulesList.sort( function (a:Schedule,b:Schedule){
      if (a.createdOn < b.createdOn) {
        return -1;
      }
      if (a.createdOn > b.createdOn) {
        return 1;
      }
      return 0;
    })
    this._store.dispatch(getSchedules({schedules: schedulesList}));
  }

  async getScheduleData(scheduleId) {
    const scheduleDataColRef = collection(this.db, 'scheduleData');
    const q = query(scheduleDataColRef, where("scheduleId", "==", scheduleId));
    const scheduleDataSnapshot = await getDocs(q);
    const scheduleDataList = scheduleDataSnapshot.docs.map(doc => doc.data());
    this._store.dispatch(getScheduleData({scheduleData: scheduleDataList}));
  }

}
