import {Course} from "./course";
export class Schedule {
  scheduleId: string;
  userId: number;
  program: string;
  semesterQuantity: number;
  createdOn: any;

  constructor(scheduleId, userId, program, semesterQuantity, createdOn) {
    this.scheduleId = scheduleId;
    this.userId = userId;
    this.program = program;
    this.semesterQuantity = semesterQuantity;
    this.createdOn = createdOn
  }
}
