const dayIn = document.getElementById('day');
const monthIn = document.getElementById('month');
const yearIn = document.getElementById('year');
const yeatOut = document.getElementById('yearOut');
const monthOut = document.getElementById('monthOut');
const dayOut = document.getElementById('dayOut');
const calculateBtn = document.getElementById('CalcBtn');
const errorStyle = '0.5px solid var(--Light-red)';

calculateBtn.addEventListener('click', () =>{
    const D = dayIn.value;
    const M =  monthIn.value;
    const Y = yearIn.value;
    const birthday = `${Y}-${M}-${D}`;

let years = new Date().getFullYear() - new Date(birthday).getFullYear();
let months = new Date().getMonth() - new Date(birthday).getMonth();
let days = new Date().getDate() - Number(D);

if (months < 0){
    years = years -1;
    months = months + 12;
}

if(days < 0){
    days += getNoOfDats(Y, M -1);
}

dayOut.innerText = days;
monthOut.innerText = months;
yeatOut.innerText = years;
}
);

function getNoOfDats(y,m){
    return new Date(y,m,0).getDate();
}

dayIn.addEventListener('blur', () =>{
    validateDay();
});

const validateDay = () => {
    const D = dayIn.value;
    const M = monthIn.value;
    const Y = yearIn.value;
    if (D == '') {
      showMessage(dayIn, 'This field is required', errorStyle);
      return false;
    } else if (!validDay(Y, M, D)) {
      showMessage(dayIn, 'Must be a valid day', errorStyle);
      return false;
    } else {
      showMessage(dayIn, '', '');
      return true;
    }
  };

  monthIn.addEventListener('blur', () => {
    validateMonth();
  });
  
  const validateMonth = () => {
    const M = monthIn.value;
    if (M == '') {
      showMessage(monthIn, 'This field is required', errorStyle);
      return false;
    } else if (!validMonth(M)) {
      showMessage(monthIn, 'Must be a valid month', errorStyle);
      return false;
    } else {
      showMessage(monthIn, '', '');
      return true;
    }
  };
  
  // on Blur Year validate
  yearIn.addEventListener('blur', () => {
    validateYear();
  });
  
  const validateYear = () => {
    const Y = yearIn.value;
    const M = monthIn.value;
    const D = dayIn.value;
    if (Y == '') {
      showMessage(yearIn, 'This field is required', errorStyle);
      return false;
    } else if (!validYear(Y, M, D)) {
      showMessage(yearIn, 'Must be in past', errorStyle);
      return false;
    } else {
      showMessage(yearIn, '', '');
      return true;
    }
  };
  
  // Validate Day
  function validDay(y, m, d) {
    if (d > getNoOfDats(y, m) || d < 1) return false;
    return true;
  }
  
  // validate Month
  function validMonth(m) {
    if (m > 12 || m < 1) return false;
    return true;
  }
  
  // Validate Year
  function validYear(y, m, d) {
    const secondDate = new Date();
    const firstDate = new Date(`${y}-${m}-${d}`);
    if (firstDate.setHours(0, 0, 0, 0) <= secondDate.setHours(0, 0, 0, 0)) {
      return true;
    }
    return false;
  }


  function showMessage(elem, msg, border) {
    elem.style.border = border;
    elem.nextElementSibling.innerText = msg;
  };

  