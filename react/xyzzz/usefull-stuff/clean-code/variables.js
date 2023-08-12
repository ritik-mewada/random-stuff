/* disable-eslint */

// ----- Naming variables -----
// Don't ❌
const random = "example@gmail.com";
const myArray = ["Volvo", "Mercedes", "Audi"];
// Do ✅
const email = "example@gmail.com";
const cars = ["Volvo", "Mercedes", "Audi"];


// ----- Use searchable values -----
// Don't ❌
// no one knows what are these numbers
const workingDayInMonth = () => {
  return 5 * 4;
}
// Do ✅
// your hardcoded vars should be capitalized
const WEEKS_IN_MONTH = 4;
const WORKING_DAYS = 5;
const workingDaysInMonth = () => WEEKS_IN_MONTH * WORKING_DAYS;


// ----- Avoid adding unneded context -----
// Don't ❌
const cars = [
  {
    carBrand: "Volvo",
    carPrice: 100,
  },
  {
    carBrand: "Mercedes",
    carPrice: 125,
  }
];
const updatePrice = (price) => {
  return cars.forEach((car) => car.carPrice + price)
}
// Do ✅
const cars = [
  {
    brand: "Volvo",
    price: 100,
  },
  {
    brand: "Mercedes",
    price: 125,
  }
];
const updatePrice = (price) => {
  return cars.forEach((car) => car.price + price)
}


// ----- Avoid Mind Mapping -----
// Don't ❌
const cars = [
  {
    brand: "Volvo",
    price: 100,
  },
  {
    brand: "Mercedes",
    price: 125,
  }
];
// only I know what that 20 means 
cars.map((car) => car.price * 20);
// Do ✅
const CURRENT_TAX = 20;
cars.map((car) => car.price * CURRENT_TAX);



// ----- Use default parameters -----
// Don't ❌
const navigateToPath = (path) => {
  return path || "/random-path";
}
// Do ✅
const navigateToPath = (path = '/random-path/) => {
  ///...
}

