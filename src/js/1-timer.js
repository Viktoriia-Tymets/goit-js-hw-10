import flatpickr from "flatpickr";
import iziToast from "izitoast";


const datePicker = document.querySelector("#datetime-picker");
const startBtn = document.querySelector("[data-start]");
const daysEl = document.querySelector("[data-days]");
const hoursEl  = document.querySelector("[data-hours]");
const minutesEl = document.querySelector("[data-minutes]");
const secondsEl = document.querySelector("[data-seconds]");


let timerId = null;
let userSelectedDate = null;

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
      console.log(selectedDates[0]); 
    
    const selectedDate = selectedDates[0];
    const now = new Date();
if (selectedDate <= now) {
    iziToast.error({
        title: 'Error',
        message: 'Please choose a date in the future',
        position: 'topRight',
    });
    startBtn.disabled = true;
} else {
    userSelectedDate = selectedDate;
    startBtn.disabled = false;
}
    },

  };


  flatpickr(datePicker, options);
  function addLeadingZero(value) {
    return String(value).padStart(2, "0")
  };
  
  function updateTimer({days, hours, minutes, seconds}) {
    daysEl.textContent = addLeadingZero(days);
    hoursEl.textContent = addLeadingZero(hours);
    minutesEl.textContent = addLeadingZero(minutes);
    secondsEl.textContent = addLeadingZero(seconds);
  };

  function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = Math.floor(ms / day);
    const hours = Math.floor((ms % day) / hour);
    const minutes = Math.floor(((ms % day) % hour) / minute);
    const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  
    return { days, hours, minutes, seconds };

  };

  startBtn.addEventListener('click', () => {
    if (!userSelectedDate) 
        return;
    startBtn.disabled = true;
    datePicker.disabled = true;

    timerId = setInterval(() => {
        const now = new Date();
        const deltaTime = userSelectedDate - now;

        if (deltaTime <= 0) {
            clearInterval(timerId);
            iziToast.success({
                title: 'Success',
                message: 'Time is up!',
                position: 'topRight',
            });

updateTimer({days: 0, hours: 0, minutes: 0, seconds: 0});
datePicker.disabled = false;
return;
}
const timeComponents = convertMs(deltaTime);
updateTimer(timeComponents);
},1000)
  });
  