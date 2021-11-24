import { Injectable } from '@angular/core';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, query, orderBy, where } from 'firebase/firestore/lite';
import {props, Store} from "@ngrx/store";
import {getCoursesForMajor, getPrereqForCourses} from "../state/scheduler.actions";

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

  courseList : any[]

  db = getFirestore(app);

  constructor(
    private _store: Store<any>
  ) { }

  // Get a list of courses from database
  async getCourses() {
    const coursesCol = collection(this.db, 'courses');
    const q = query(coursesCol, orderBy("dcode", "asc"));
    const coursesSnapshot = await getDocs(q);
    const coursesList = await coursesSnapshot.docs.map(doc => doc.data());
    this._store.dispatch(getCoursesForMajor({courseList: coursesList}));
  }

  async getPrerequisites() {
    const prereqCol = collection(this.db, 'prerequisites');
    //const q = query(prereqCol, where("cno", "in", cnos));
    const q = query(prereqCol);
    const prereqSnapshot = await getDocs(q);
    const prereqList = await prereqSnapshot.docs.map(doc => doc.data());
    this._store.dispatch(getPrereqForCourses({prereqList: prereqList}));
  }
}
