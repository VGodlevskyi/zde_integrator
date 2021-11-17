/*
Task2
Please order by Total
Develop a program which produces ordered array of sales.
Input: array of objects with the following structure {amount: 10000, quantity: 10}.
Output: new array of ordered sales. Array element structure should be: {amount: 10000, quantity: 10, Total: 100000}, where Total = amount * quantity.
Please order by Total and note that input array shall remain intact.
 */

//  sorting order depends on sortKey: if sortKey>=0 (and default) - аscending, if sortKey<0 -  descending

const orderedSales = function (arrayOfSales, sortKey) {
sortKey<0 ? sortKey=-1 : sortKey=1;
    resultArr = arrayOfSales
        .map(item => ({...item, Total: item.amount * item.quantity}))
        .sort((a, b) => a.Total > b.Total ? -sortKey : sortKey);
    return resultArr;
}

const inputArray = [
    {amount: 50000, quantity: 44},
    {amount: 50000, quantity: 50},
    {amount: 3000, quantity: 10000},
    {amount: 2, quantity: 2000},
]

console.log("Task2");
console.log("-----------------------------------------------------------------------------------");
console.log("Input array - ", inputArray);
console.log("result array -", orderedSales(inputArray, 5 ));
console.log("");