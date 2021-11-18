import {
  addMonths,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  fromUnixTime,
  getUnixTime,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";

const datePickerBtn = document.querySelector(".date-picker-button");
const datePicker = document.querySelector(".date-picker");
const datePickerHeaderText = document.querySelector(".current-month");
const nextMonthBtn = document.querySelector(".next-month-button");
const prevMonthBtn = document.querySelector(".prev-month-button");
const dateGrid = document.querySelector(".date-picker-grid-dates");
let currDate = new Date();

datePickerBtn.addEventListener("click", () => {
  datePicker.classList.toggle("show");
  const selectedDate = fromUnixTime(datePickerBtn.dataset.selectedDate);
  // whenever the date picker modal is closed and reopened it should be at the selected date rather than being at navigated date
  currDate = selectedDate;
  setUpDatePicker(selectedDate);
});

function setDate(date) {
  datePickerBtn.innerText = format(date, "MMMM do, yyyy");
  datePickerBtn.dataset.selectedDate = getUnixTime(date);
}

function setUpDatePicker(selectedDate) {
  datePickerHeaderText.innerText = format(currDate, "MMMM - yyyy");
  setUpDates(selectedDate);
}

function setUpDates(selectedDate) {
  const firstWeekStart = startOfWeek(startOfMonth(currDate));
  const lastWeekEnd = endOfWeek(endOfMonth(currDate));
  // get all the dates between start of the week and end of the week
  dateGrid.innerHTML = "";
  const dates = eachDayOfInterval({ start: firstWeekStart, end: lastWeekEnd });
  dates.forEach((date) => {
    const dateElement = document.createElement("button");
    dateElement.classList.add("date");
    dateElement.innerText = date.getDate();
    if (!isSameMonth(date, currDate)) {
      dateElement.classList.add("date-picker-other-month-date");
    }
    if (isSameDay(date, selectedDate)) {
      dateElement.classList.add("selected");
    }
    dateElement.addEventListener("click", () => {
      setDate(date);
      datePicker.classList.remove("show");
    });
    dateGrid.appendChild(dateElement);
  });
}

// this event listener executes only once for every time the button is clicked
nextMonthBtn.addEventListener("click", () => {
  const selectedDate = fromUnixTime(datePickerBtn.dataset.selectedDate);
  currDate = addMonths(currDate, 1);
  setUpDatePicker(selectedDate);
});
prevMonthBtn.addEventListener("click", () => {
  const selectedDate = fromUnixTime(datePickerBtn.dataset.selectedDate);
  currDate = subMonths(currDate, 1);
  setUpDatePicker(selectedDate);
});

setDate(new Date());
