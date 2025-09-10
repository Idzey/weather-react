import dayjs from "dayjs";
import "dayjs/locale/en";
import "dayjs/locale/ru";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

export default dayjs;