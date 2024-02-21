import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";



let userSelectedDate;
const startBtn = document.querySelector("button[data-start]")
const days = document.querySelector("span[data-days]")
const hours = document.querySelector("span[data-hours]")
const minutes = document.querySelector("span[data-minutes]")
const seconds = document.querySelector("span[data-seconds]")
console.log(days);
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
        iziToast.error({
          message: 'Please choose a date in the future',
          position: 'topRight'
      });
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

    const idIntervals = setInterval(() => {
       const timeLeft = convertMs(Math.abs(Date.now() - userSelectedDate.getTime()));
       if((Date.now() - userSelectedDate.getTime()) < 0){
       days.textContent = addLeadingZero(timeLeft.days)
       hours.textContent = addLeadingZero(timeLeft.hours)
       minutes.textContent = addLeadingZero(timeLeft.minutes)
       seconds.textContent = addLeadingZero(timeLeft.seconds)
       }else{ 
        myInput.removeAttribute("disabled")
        clearInterval(idIntervals)
      }
    }, 1000)
}



function addLeadingZero(value){ return value.toString().padStart(2, "0") }


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