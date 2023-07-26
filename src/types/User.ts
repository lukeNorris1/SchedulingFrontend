import { ObjectId } from "mongodb";

export type User = {
  _id: ObjectId | string;
  email: string;
  password: string;
  fullName: string;
  availability: Record<number, { start: string; end: string }>;
  payRate: number;
  roles: number[];
  jobTitle: string,
  createdAt: Date;
  updatedAt: Date;
  token: string;
};



export const ROLES: { [key: string]: number } = {
  'Employee': 2001,
  'Editor': 2442,
  'Admin': 5150
};

export function getHighestRole(role: number) {
  return Object.keys(ROLES).find((key) => ROLES[key] === role);
}

export type Credential = {
  email: string;
  password: string;
};


export type CredentialReg = {
  email: string;
  password: string;
  fullName: string;
};
