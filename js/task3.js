/*
Task3
Develop a program “Object Projection”. Input: any JSON object; prototype object. Output: projected object.
Projected object structure shall be intersection of source object and prototype object structures.
Values of properties in projected object shall be the same as values of respective properties in source object.
 */

const src = {
    prop11: {
        prop21: 21,
        prop22: {
            prop31: {},
            prop32: 32
        }
    },
    prop12: 12,
    prop13: {
        prop14: {
            prop31: 22,
            prop32: 32
        },
        prop15: 23
    }
}

const proto1 = {
    prop11: {
        prop22: null
    }
}

const proto2 = {
    prop11: {
        prop22: {
            prop31: null
        }
    }
}

const proto3 = {
    prop12: 32,
    prop11: {
        prop23: null
    },
}

const proto4 = {
    prop12: {prop15: {prod14: 12}},

}

const objectProjection = (src, proto, buffer = {}, result = {}) => {
    for (const key in proto) {
        if (!src[key]) continue;

        for (const keyB in buffer) {
            if (keyB !== key) delete buffer[keyB]
        }

        buffer[key] = (typeof src[key] === 'object' ) ? {...src[key]} : src[key];

        if (((typeof proto[key] !== 'object') || proto[key] === null)) {
            result = {
                ...result,
                ...buffer
            }
            buffer = {}
        }

        if (typeof buffer[key] === 'object') objectProjection(src[key], proto[key], buffer[key], result);
    }
    return result;
}

console.log("Task3");
console.log("-----------------------------------------------------------------------------------");
console.log("Src object - ", src);
console.log("Proto object case1 - ", proto1);
console.log("Result of function objectProjection case1 - ", objectProjection(src, proto1));
console.log("Expected result of objectProjection case1 -  { prop11: { prop22: { prop31: 31, prop32: 32 } } }\n")

console.log("Proto object case2 - ", proto2);
console.log("Result of function objectProjection case2 - ", objectProjection(src, proto2));
console.log("Expected result of objectProjection case2 -  {}\n");

console.log("Proto object case3 - ", proto3);
console.log("Result of function objectProjection case3 - ", objectProjection(src, proto3));
console.log("Expected result of objectProjection case3 -  { prop12: 12 }\n");

console.log("Proto object case4 - ", proto4);
console.log("Result of function objectProjection case4 - ", objectProjection(src, proto4));
console.log("Expected result of objectProjection case4 -  { }\n");




// function objectCleaner(obj) {
//     Object.keys(obj).forEach(key => {
//         if (obj[key] && typeof obj[key] === 'object' && objectCleaner(obj[key]) === null) delete obj[key];
//     });
//     return Object.keys(obj).length ? obj : null;
// }
