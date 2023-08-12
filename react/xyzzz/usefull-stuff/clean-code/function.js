// ----- Functions should do one thing ----- 
// Don't ❌
function fixCars(cars) {
  cars.forEach(car => {
    if (car.isBroken()) {
      fix(car);
    }
  });
}
// Do ✅
function fixBrokenCars(cars) {
  cars.filter(isCarBroken).forEach(fix);
}

function isCarBroken(car) {
  return car.isBroken();
}


// ----- Function names should say what they do -----
// Don't ❌
function addToDate(date, month) {
  // ...
}
const date = new Date();
// It's hard to tell from the function name what is added
addToDate(date, 1);

// Do ✅
function addMonthToDate(month, date) {
  // ...
}
const date = new Date();
addMonthToDate(1, date);


// ----- Don’t use flags as function parameters -----
// Don't ❌
function updateProgress(score, progress) {
  if (progress) {
    navigate(`${progress}&${score}`);
  } else {
    navigate(score);
  }
}
// Do ✅
function updateLocalProgress(score) {
  navigate(score);
}

function updateGlobalProgress(progress, score) {
  navigate(`${progress}&${score}`);
}


// ----- Use max 2 function arguments ----- 
// Don't ❌
function updateCarParams(engineSize, colour, parkingAssistance) {
  // ...
}

updateCarParams(1.6, 'red', true);
// Do ✅
function updateCarParams({ engineSize, colour, parkingAssistance }) {
  // ...
}

updateCarParams({
  engineSize: 1.6,
  colour: 'red',
  parkingAssistance: true,
});


// ----- Avoid negative conditionals -----
// Don't ❌
function isCarDamaged(car) {
  // ...
}

if (!isCarDamaged(car)) {
  // ...
}
// Do ✅
function isCarDamaged(car) {
  // ...
}

if (isCarDamaged(car)) {
  // ...
}