export type User = {
  _id: string;
  email: string;
  password: string;
  fullName: string;
  availability: Record<number, { start: string; end: string }>;
  payRate: number;
  roles: number[];
  jobTitle: string;
  createdAt: Date;
  updatedAt: Date;
  token: string;
};

const getUser: User = {
  _id: "1234",
  email: "example@example.com",
  password: "pas$w0rd",
  fullName: "John James",
  availability: {
    0: {
      start: "9:00",
      end: "17:00",
    },
    1: {
      start: "9:00",
      end: "17:00",
    },
  },
  payRate: 42.21,
  roles: [2001, 5150],
  jobTitle: "Surprised Viewer",
  createdAt: new Date(),
  updatedAt: new Date(),
  token: "4444333221",
};

export default getUser;
