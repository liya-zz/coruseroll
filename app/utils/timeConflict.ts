interface CourseTime {
  day: string;
  startTime: string;
  endTime: string;
}

function parseTime(timeString: string): number {
  if (!timeString) return 0;
  const [hours, minutes] = timeString.split(':').map(Number);
  return (hours || 0) * 60 + (minutes || 0);
}

function parseCourseTime(time: string): CourseTime | null {
  if (!time) return null;
  const parts = time.split(' ');
  if (parts.length < 2) return null;
  const [day, timeRange] = parts;
  const [startTime, endTime] = timeRange.split(' - ');
  return { day, startTime, endTime };
}

export function checkTimeConflict(time1: string, time2: string): boolean {
  const course1 = parseCourseTime(time1);
  const course2 = parseCourseTime(time2);

  if (!course1 || !course2) return false;
  if (course1.day !== course2.day) return false;

  const start1 = parseTime(course1.startTime);
  const end1 = parseTime(course1.endTime);
  const start2 = parseTime(course2.startTime);
  const end2 = parseTime(course2.endTime);

  // Check for overlap or exact same time
  return (start1 <= end2 && start2 <= end1) || (start1 === start2 && end1 === end2);
}

