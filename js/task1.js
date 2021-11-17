/*
Task 1
Extend JS Date object with a method daysTo() which returns number of complete days between any pair
of JS date objects: d1.daysTo(d2) should return quantity of complete days from d1 to d2.
 */

Date.prototype.dayTo = function (d2) {
    const time1 = this.getTime();
    const time2 = d2.getTime();
    let timeBetween = (time2 - time1>0) ? time2 - time1 : time1 - time2;
    return Math.floor(timeBetween / (1000 * 60 * 60 * 24));
};

const d1 = new Date('2021-11-17T23:00:00.000Z');
const d2 = new Date('2021-11-27T21:00:00.000Z');
console.log("Task1");
console.log("-----------------------------------------------------------------------------------");
console.log("Input values: Day 1 -", d1, "Day2-", d2);
console.log("Between", d1 ,"and", d2 , " is - ", d1.dayTo(d2), " full days");
console.log("Between", d2 ,"and", d1 , " is - ", d2.dayTo(d1), " full days");
console.log("");
