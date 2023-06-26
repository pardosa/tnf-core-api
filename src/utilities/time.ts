export function splitTime(
  startTime: string,
  endTime: string,
  interval: number
): string[] {
  let start = startTime.split(":");
  const end = endTime.split(":");
  const result = [];
  while (parseInt(end[0]) > parseInt(start[0])) {
    while (parseInt(start[1]) < 60) {
      const temp1 = parseInt(start[1]) + interval;
      start[1] = temp1.toString();
      if (temp1 >= 60) {
        start[1] = "00";
        const temp2 = parseInt(start[0]) + 1;
        start[0] = temp2.toString();
        result.push(start.join(":"));
        break;
      }
      result.push(start.join(":"));
    }
  }
  return result;
}
