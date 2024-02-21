import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";


let userSelectedDate;
const startBtn = document.querySelector(".start_btn")
startBtn.setAttribute("disabled", "disabled")

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]);
      if(selectedDates[0].getTime()>Date.now()){
        userSelectedDate = selectedDates[0];
        startBtn.removeAttribute("disabled")
        }
      else{
        window.alert("Please choose a date in the future")
        startBtn.setAttribute("disabled", "disabled")
        }
    },
  };
const myInput = document.querySelector("#datetime-picker");
console.log(myInput);
const fp = flatpickr(myInput, options);

startBtn.addEventListener("click", startTimer);

function startTimer(){
    startBtn.setAttribute("disabled", "disabled")
    myInput.setAttribute("disabled", "disabled")

    setInterval(() => {
       const timeLeft = convertMs(Date.now() - userSelectedDate.getTime());
       console.log(timeLeft.days)
    }, 1000)
}



function addLeadingZero(value){ return toString(value).padStart(2, "0") }


function convertMs(ms) {
    // Number of milliseconds per unit of time
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;
  
    // Remaining days
    const days = Math.floor(ms / day);
    // Remaining hours
    const hours = Math.floor((ms % day) / hour);
    // Remaining minutes
    const minutes = Math.floor(((ms % day) % hour) / minute);
    // Remaining seconds
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };
  }
  
  console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
  console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
  console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}