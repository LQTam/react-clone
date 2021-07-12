import * as timeago from "timeago.js";

const localeFunc = (number, index, totalSec) => {
  // number: the timeago / timein number;
  // index: the index of array below;
  // totalSec: total seconds between date to be formatted and today's date;
  return [
    ["just now", "right now"],
    ["%s seconds ago", "%s s"],
    ["1 minute ago", "m"],
    ["%s minutes ago", "%s m"],
    ["1 hour ago", "1 h"],
    ["%s hours ago", "%s h"],
    ["1 day ago", "1 d"],
    ["%s days ago", "%s d"],
    ["1 week ago", "1 w"],
    ["%s weeks ago", "%s w"],
    ["1 month ago", "1 month"],
    ["%s months ago", "%s months"],
    ["1 year ago", "1 year"],
    ["%s years ago", "%s years"],
  ][index];
};
timeago.register("messenger_lastMessage", localeFunc);

export default timeago;
