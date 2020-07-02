const currencyUnitAndDenominationsObject = {
  'PENNY': 1,
  'NICKEL': 5,
  'DIME': 10,
  'QUARTER': 25,
  'ONE': 100,
  'FIVE': 500,
  'TEN': 1000,
  'TWENTY': 2000,
  'ONE HUNDRED': 10000
}

const moneyTakeOutFromCashInRegister = (availableAmountInCashRegister, cashInRegisterObject, change, currencyUnit) => {
  if (availableAmountInCashRegister > currencyUnitAndDenominationsObject[currencyUnit] && cashInRegisterObject[currencyUnit]) {
    if (availableAmountInCashRegister > cashInRegisterObject[currencyUnit]) {
      
      const amountOfCashToTakeAway = cashInRegisterObject[currencyUnit];

      availableAmountInCashRegister -= amountOfCashToTakeAway;

      change.push([currencyUnit, amountOfCashToTakeAway / 100]);

      cashInRegisterObject[currencyUnit] = 0;
    } else {
      const amountOfCashToTakeAway = Math.floor(availableAmountInCashRegister / currencyUnitAndDenominationsObject[currencyUnit]) * currencyUnitAndDenominationsObject[currencyUnit];
      availableAmountInCashRegister -= amountOfCashToTakeAway;

      change.push([currencyUnit, amountOfCashToTakeAway / 100]);
      cashInRegisterObject[currencyUnit] -= amountOfCashToTakeAway;
    }
  }
  return [availableAmountInCashRegister, cashInRegisterObject, change]
}

function checkCashRegister(price, cash, cid) {
  let availableAmountInCashRegister = Math.round((cash - price) * 100);

  let cashInRegisterObject = cid.reduce((accumulator, [currencyUnit, amount]) => {
    return {
      ...accumulator,
      [currencyUnit]: Math.round(amount * 100)
    }
  }, {});

  let change = [];

  [availableAmountInCashRegister, cashInRegisterObject, change] = moneyTakeOutFromCashInRegister(availableAmountInCashRegister, cashInRegisterObject, change, 'ONE HUNDRED');

  [availableAmountInCashRegister, cashInRegisterObject, change] = moneyTakeOutFromCashInRegister(availableAmountInCashRegister, cashInRegisterObject, change, 'TWENTY');

  [availableAmountInCashRegister, cashInRegisterObject, change] = moneyTakeOutFromCashInRegister(availableAmountInCashRegister, cashInRegisterObject, change, 'TEN');

  [availableAmountInCashRegister, cashInRegisterObject, change] = moneyTakeOutFromCashInRegister(availableAmountInCashRegister, cashInRegisterObject, change, 'FIVE');

  [availableAmountInCashRegister, cashInRegisterObject, change] = moneyTakeOutFromCashInRegister(availableAmountInCashRegister, cashInRegisterObject, change, 'ONE');

[availableAmountInCashRegister, cashInRegisterObject, change] = moneyTakeOutFromCashInRegister(availableAmountInCashRegister, cashInRegisterObject, change, 'QUARTER');

[availableAmountInCashRegister, cashInRegisterObject, change] = moneyTakeOutFromCashInRegister(availableAmountInCashRegister, cashInRegisterObject, change, 'DIME');

[availableAmountInCashRegister, cashInRegisterObject, change] = moneyTakeOutFromCashInRegister(availableAmountInCashRegister, cashInRegisterObject, change, 'NICKEL');

[availableAmountInCashRegister, cashInRegisterObject, change] = moneyTakeOutFromCashInRegister(availableAmountInCashRegister, cashInRegisterObject, change, 'PENNY');

if (availableAmountInCashRegister > 0) {
  return {status: 'INSUFFICIENT_FUNDS', change: []};
}

const availableAmountInCashDrawer = Object.values(cashInRegisterObject).reduce((accumulator, amount) => accumulator + amount, 0);

if (availableAmountInCashDrawer > 0) {
  return {status: 'OPEN', change: change};
}

return {status: "CLOSED", change: cid};
  // var change;
  // return change;
}

console.log(typeof checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));
console.log(checkCashRegister(19.5, 20, [["PENNY", 1.01], ["NICKEL", 2.05], ["DIME", 3.1], ["QUARTER", 4.25], ["ONE", 90], ["FIVE", 55], ["TEN", 20], ["TWENTY", 60], ["ONE HUNDRED", 100]]));