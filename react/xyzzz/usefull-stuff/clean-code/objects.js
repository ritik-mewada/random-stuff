// ----- Object destructuring -----
const car = {
  brand: 'Volvo',
  productionYear: 2022,
  config: {
    transmission: 'manual',
    power: 115,
    parkAssist: false,
  }
};
// Don't ❌
const brand = car.brand
const productionYear = car['productionYear']
console.log(brand) // Volvo
console.log(productionYear) // 2022
// Do ✅
const { brand: carBrand, productionYear } = car;
console.log(carBrand) // Volvo
console.log(productionYear) // 2022


// ----- Use getters and setters -----
// Don't ❌
function updateMileage() {
  // ...
  return {
    mileage: 0;
  }
}
const car = updateMileage();
car.mileage = 100;
console.log(car.mileage) // 100;
// Do ✅
function updateMileage() {
  let mileage = 0;

  function getMileage() {
    return mileage;
  }
  function setMileage(value) {
    mileage = value;
  }
  return {
    getMileage,
    setMileage
  }
}
const car = updateMileage();
car.setMileage(100);
console.log(car.getMileage()) // 100;
