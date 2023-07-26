import { ObjectId } from "mongodb";

export interface ShiftProps {
  _id: ObjectId | string;
  createdBy: string;
  employeeId: ObjectId | undefined | string;
  startTime: Date;
  endTime: Date;
  note?: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface createShift {
  createdBy: ObjectId,
  employeeId: ObjectId,
  employeeName: string,
  employeeRole: number,
  employeePosition: string,
  startTime: Date,
  endTime: Date
}
