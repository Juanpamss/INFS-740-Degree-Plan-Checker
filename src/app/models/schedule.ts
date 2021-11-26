import {Course} from "./course";
export class Schedule {
  scheduleId: string;
  userId: number;
  semesterQuantity: number;
  createdOn: any;

  constructor(scheduleId, userId, semesterQuantity, createdOn) {
    this.scheduleId = scheduleId;
    this.userId = userId;
    this.semesterQuantity = semesterQuantity,
    this.createdOn = createdOn
  }
}
