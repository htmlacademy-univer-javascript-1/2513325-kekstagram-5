let checkLength = function(string) {
  let normalizerString =  string.replaceAll(' ', '').toLowerCase();
  let voidString = "";
  for (let i = normalizerString.length - 1; i >= 0; i--) {
    voidString += normalizerString[i];
  }
  return normalizerString === voidString;
}

function isMeetingWithinWorkHours(startWork, endWork, startMeeting, meetingDuration) {
  function timeToMinutes(time) {
    var parts = time.split(':');
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  }

  var startWorkMinutes = timeToMinutes(startWork);
  var endWorkMinutes = timeToMinutes(endWork);
  var startMeetingMinutes = timeToMinutes(startMeeting);
  var endMeetingMinutes = startMeetingMinutes + meetingDuration;

  return startMeetingMinutes >= startWorkMinutes && endMeetingMinutes <= endWorkMinutes;
}
