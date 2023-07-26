interface MyData {
  _id: string;
  createdBy: string;
  employeeId: string | null;
  startTime: Date;
  endTime: Date;
  createdAt: Date;
  updatedAt: Date;
}

// Function to generate a random number between min and max (inclusive)
function getRandomNumber(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to create an array with 12 elements
function createArrayOfData(): MyData[] {
  const currentDate = new Date();

  const dataArray: MyData[] = [];
  for (let i = 0; i < 3; i++) {
    // Generate random hours and minutes for startTime and endTime
    const startHour = getRandomNumber(9, 22);
    const startMinute = getRandomNumber(0, 59);
    const endHour = getRandomNumber(startHour + 1, startHour + 5);
    const endMinute = getRandomNumber(0, startHour === endHour ? 59 : 0);

    const startTime = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + i,
      startHour,
      startMinute
    );

    const endTime = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      currentDate.getDate() + i + 1,
      endHour,
      endMinute
    );

    const data: MyData = {
      _id: "64b4791efa9b7553da03453c",
      createdBy: "649adba08cda7885be4a2741",
      employeeId: null,
      startTime,
      endTime,
      createdAt: new Date("2023-07-16T23:11:26.180Z"),
      updatedAt: new Date("2023-07-16T23:11:26.180Z"),
    };

    dataArray.push(data);
  }

  return dataArray;
}

// Sort array by "startTime"
function sortByStartTime(dataArray: MyData[]): MyData[] {
  return dataArray.sort(
    (a, b) => a.startTime.getTime() - b.startTime.getTime()
  );
}

// Usage
const dataArray = createArrayOfData();
const allAvailableShifts = sortByStartTime(dataArray);
export default allAvailableShifts;
