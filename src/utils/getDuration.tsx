let prevStartTime: any = null;
let prevEndTime: any = null;
let prevDuration: string = "";

export function getDuration(startTime: any, endTime: any) {
  const isValidStartTime = isValidTimeFormat(startTime);
  const isValidEndTime = isValidTimeFormat(endTime);

  if (!isValidStartTime || !isValidEndTime) {
    if (prevStartTime && prevEndTime) {
      return ` ${prevDuration}`;
    } else {
      return "Invalid time format";
    }
  }

  const currentDate = new Date().toISOString().split("T")[0];
  const startDateTime = new Date(`${currentDate}T${startTime}`);
  const endDateTime = new Date(`${currentDate}T${endTime}`);

  if (endDateTime < startDateTime) {
    return "Invalid duration";
  }

  const formattedStartTime = formatTime(startDateTime);
  const formattedEndTime = formatTime(endDateTime);
  const newDuration = calculateDuration(startDateTime, endDateTime);

  prevStartTime = startTime;
  prevEndTime = endTime;
  prevDuration = newDuration;

  return ` ${newDuration}`;
}

function isValidTimeFormat(timeString: string) {
  return /^([01]?[0-9]|2[0-3]):[0-5][0-9]$/.test(timeString);
}

function formatTime(time: Date) {
  const hours = time.getHours().toString().padStart(2, "0");
  const minutes = time.getMinutes().toString().padStart(2, "0");
  return `${hours}:${minutes}`;
}

function calculateDuration(startTime: any, endTime: any) {
  const timeDifference = endTime - startTime;
  const hours = Math.floor(timeDifference / (1000 * 60 * 60));
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));

  const formattedDuration = `${hours}h ${minutes}min`;
  return formattedDuration;
}
