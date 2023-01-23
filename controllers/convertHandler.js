const galToL = 3.78541;
const lbsToKg = 0.453592;
const miToKm = 1.60934;

const unitConvert = {
  gal: "L",
  l: "gal",
  mi: "km",
  km: "mi",
  lbs: "kg",
  kg: "lbs",
};

const conversionRate = {
  gal: galToL,
  l: 1 / galToL,
  mi: miToKm,
  km: 1 / miToKm,
  lbs: lbsToKg,
  kg: 1 / lbsToKg,
};

const unitMapping = {
  gal: "gallons",
  l: "liters",
  mi: "miles",
  km: "kilometers",
  lbs: "pounds",
  kg: "kilograms",
};

const inputRegex = /[a-zA-Z]+|[^a-zA-Z]+/g;
function ConvertHandler() {
  this.getNum = function (input) {
    let result;

    result = input.match(inputRegex)[0];

    let numberRegex = /\d/;

    if (numberRegex.test(result) === false) {
      result = 1;
    }

    if (result.toString().includes("/")) {
      let values = result.toString().split("/");
      if (values.length != 2) {
        return "invalid number";
      }
      result = (+values[0] / +values[1]).toFixed(5);
    }

    if (isNaN(result)) {
      return "invalid number";
    }

    return +result;
  };

  this.getUnit = function (input) {
    let inputUnit = input.match(inputRegex)[1];

    if (!inputUnit) {
      inputUnit = input.match(inputRegex)[0];
    }

    if (!unitMapping[inputUnit.toLowerCase()]) {
      return "invalid unit";
    }

    return this.spellOutUnit(inputUnit);
  };

  this.getReturnUnit = function (initUnit) {
    return unitConvert[initUnit.toLowerCase()];
  };

  this.spellOutUnit = function (unit) {
    if (unit === "L" || unit === "l") return "L";
    if (unitConvert[unit.toLowerCase()]) {
      return unit.toLowerCase();
    }
    return "invalid unit";
  };

  this.convert = function (initNum, initUnit) {
    return (
      Math.round(conversionRate[initUnit.toLowerCase()] * initNum * 1e5) / 1e5
    );
  };

  this.getString = function (initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${
      unitMapping[initUnit.toLowerCase()]
    } converts to ${returnNum} ${unitMapping[returnUnit.toLowerCase()]}`;
  };
}

module.exports = ConvertHandler;
