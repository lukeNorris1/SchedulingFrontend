interface MyData {
  _id: string;
  createdBy: string;
  employeeId: string;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Function to create a single shift
function createSingleShift(): MyData {
  const currentDate = new Date();
  const oneHourMilliseconds = 60 * 60 * 1000; // Number of milliseconds in one hour
  const sixHoursMilliseconds = 6 * 60 * 60 * 1000; // Number of milliseconds in six hours

  const startTime = new Date(currentDate.getTime() + oneHourMilliseconds);
  const endTime = new Date(currentDate.getTime() + sixHoursMilliseconds);

  const shift: MyData = {
    _id: "64b4791efa9b7553da03453c",
    createdBy: "649adba08cda7885be4a2741",
    employeeId: "6486caa69004c2e2e44ab268",
    startTime,
    endTime,
    createdAt: new Date("2023-07-16T23:11:26.180Z"),
    updatedAt: new Date("2023-07-16T23:11:26.180Z"),
  };

  return shift;
}

// Usage
const mockNextShift = createSingleShift();
export default mockNextShift;
