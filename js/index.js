/*
Task 1
Extend JS Date object with a method daysTo() which returns number of complete days between any pair
of JS date objects: d1.daysTo(d2) should return quantity of complete days from d1 to d2.
 */

Date.prototype.dayTo = function (d2) {
    const time1 = this.getTime();
    const time2 = d2.getTime();
    const daysBetween = time1 - time2;
    return Math.abs(Math.floor(daysBetween / (1000 * 60 * 60 * 24)));
};

const d1 = new Date('2021,11,18');
const d2 = new Date('2021,11,28');

console.log(d1.dayTo(d2));

/*
Task2
Please order by Total
Develop a program which produces ordered array of sales.
Input: array of objects with the following structure {amount: 10000, quantity: 10}.
Output: new array of ordered sales. Array element structure should be: {amount: 10000, quantity: 10, Total: 100000}, where Total = amount * quantity.
Please order by Total and note that input array shall remain intact.
 */

const orderedSales = function (arrayOfSales) {
    resultArr = arrayOfSales
        .map(item => ({...item, Total: item.amount * item.quantity}))
        .sort((a, b) => a.mult > b.mult ? 1 : -1);
    return resultArr;
}

const input = [
    {amount: 50000, quantity: 44},
    {amount: 100000, quantity: 5},
    {amount: 3000, quantity: 100},
    {amount: 2, quantity: 2},
]

console.log(orderedSales(input));

/*
Task3
Develop a program “Object Projection”. Input: any JSON object; prototype object. Output: projected object.
Projected object structure shall be intersection of source object and prototype object structures.
Values of properties in projected object shall be the same as values of respective properties in source object.
 */

function objectProjection(srcObj, protoObj, resObj = {}) {

    for (let key in srcObj) {
        if (protoObj !== null) {
            let srcKey = srcObj[key];
            let protoKey = protoObj[key];
            if (protoKey === null || protoKey !== undefined) {
                if (typeof srcKey === 'object') resObj[key] = {...srcKey}; else resObj[key] = srcKey;
            } else delete resObj[key];
            let resKey = resObj[key];

            if (typeof resKey === 'object') objectProjection(srcKey, protoKey, resKey);
        }
    }
    return resObj;
}

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
        prop22: {prop31: null}
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

console.dir(objectProjection(src, proto));


