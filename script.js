let isDOBOpen = false;
let DateOfBirth;
const settingCogEl = document.getElementById('settingsIcon');
const settingsContentEl = document.getElementById('settingsContent');
const initialTextEl = document.getElementById('initialText');
const afterDobBtnTxtEl = document.getElementById('afterDOBbtnTxt');
const dobButtonEl = document.getElementById('dobButton');
const dobInputEl = document.getElementById('dobInput');

const yearEl = document.getElementById('year');
const monthEl = document.getElementById('month');
const dayEl = document.getElementById('day');
const hourEl = document.getElementById('hour');
const minutesEl = document.getElementById('minutes');
const secondsEl = document.getElementById('seconds');

console.log(localStorage.getItem('year'))
const makeTwoDigitNumber = (number) => {
  return number > 9 ? number : `0${number}`
}


const toggleDateOfBirthSelector = () => {
  if (isDOBOpen) {
    settingsContentEl.classList.add('hide')
  }
  else {
    settingsContentEl.classList.remove('hide')
  }

  isDOBOpen = !isDOBOpen;
  console.log("Toggle: ", isDOBOpen)
};


const updateAge = () => {
  const currentDate = new Date();
  // console.log(currentDate)
  const dateDiff = currentDate - DateOfBirth;
  const year = Math.floor((dateDiff) / (1000 * 3600 * 24 * 365));
  const month = Math.floor((dateDiff) / (1000 * 3600 * 24 * 365)) % 12;
  const day = Math.floor(dateDiff / (1000 * 60 * 60 * 24)) % 30;
  const hour = Math.floor(dateDiff / (1000 * 60 * 60)) % 24;
  const minute = Math.floor(dateDiff / (1000 * 60)) % 60;
  const second = Math.floor(dateDiff / (1000)) % 60;
  console.log({ year, month, day, hour, minute, second })

  yearEl.innerHTML = makeTwoDigitNumber(year);
  monthEl.innerHTML = makeTwoDigitNumber(month);
  dayEl.innerHTML = makeTwoDigitNumber(day);
  hourEl.innerHTML = makeTwoDigitNumber(hour);
  minutesEl.innerHTML = makeTwoDigitNumber(minute);
  secondsEl.innerHTML = makeTwoDigitNumber(second);

};
const localStorageGetter = () => {
  const year = localStorage.getItem('year')
  const month = localStorage.getItem('month')
  const date = localStorage.getItem('date')
  // const hour = localStorage.getItem('hour')
  // const minute = localStorage.getItem('minute')
  // const second = localStorage.getItem('second')
  if (year && month && date ) {

    // console.log(year,month,date,hour,minute,second)
    DateOfBirth = new Date(year, month, date, hour, minute, second)
  }
  updateAge();
};


const contentToggler = () => {
  updateAge()
  if (DateOfBirth) {


    initialTextEl.classList.add('hide')
    afterDobBtnTxtEl.classList.remove('hide')
  }
  else {
    afterDobBtnTxtEl.classList.add('hide')
    initialTextEl.classList.remove('hide')
  }
};


const setDOBHandler = () => {
  const dateString = dobInputEl.value;
  // console.log(DateOfBirth)
  DateOfBirth = dateString ? new Date(dateString) : null;

  // console.log(DateOfBirth)
  if (DateOfBirth) {

    localStorage.setItem('year', DateOfBirth.getFullYear());
    localStorage.setItem('month', DateOfBirth.getMonth());
    localStorage.setItem('date', DateOfBirth.getDate())
    // localStorage.setItem('hour', DateOfBirth.getHours())
    // localStorage.setItem('minute', DateOfBirth.getMinutes())
    // localStorage.setItem('second', DateOfBirth.getSeconds())


  }
 
  contentToggler();
  setInterval(() => {
    updateAge();
  }, 1000);
 
};

localStorageGetter();

contentToggler()
//-21:04




settingCogEl.addEventListener("click", toggleDateOfBirthSelector);
dobButtonEl.addEventListener("click", setDOBHandler);