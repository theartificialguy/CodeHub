import dayjs from "dayjs";
const relativeTime = require("dayjs/plugin/relativeTime");

dayjs.extend(relativeTime);

export default dayjs;