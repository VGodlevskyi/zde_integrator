//Tasc 1

Date.prototype.dayTo = function (d2) {
    const time1 = this.getTime();
    const time2 = d2.getTime();
    const daysBetween = time1 - time2;
    return Math.abs(Math.floor(daysBetween / (1000 * 60 * 60 * 24)));
};

const d1 = new Date('2021,11,18');
const d2 = new Date('2021,11,28');

console.log(d1.dayTo(d2));

//Tasc2

const input = [
    {amount: 50000, quantity: 44},
    {amount: 100000, quantity: 5},
    {amount: 3000, quantity: 100},
    {amount: 2, quantity: 2},
]

const orderedSales = function (arrayOfSales) {
    resultArr= arrayOfSales
        .map(item => ({...item, Total: item.amount * item.quantity}))
        .sort((a, b) => a.mult > b.mult ? 1 : -1);
    return resultArr;
}

console.log(orderedSales(input));

//Tasc3

const src = {
    prop11: {
        prop21: 21,
        prop22: {
            prop31: 31,
            prop32: 32
        }
    },
    prop12: 12
}

const proto = {
    prop11: {
        prop22: null
    }
}

const res = {
    prop11: {
        prop22: {
            prop31: 31,
            prop32: 32
        }
    }
}


