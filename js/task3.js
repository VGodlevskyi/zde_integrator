/*
Task3
Develop a program “Object Projection”. Input: any JSON object; prototype object. Output: projected object.
Projected object structure shall be intersection of source object and prototype object structures.
Values of properties in projected object shall be the same as values of respective properties in source object.
 */

//V1
// function objectProjection(srcObj, protoObj, resObj = {}) {
//
//     for (let key in protoObj) {
//         if (!srcObj[key]) continue;
//         let srcKey = srcObj[key];
//         let protoKey = protoObj[key];
//
//         if (protoKey === null) {
//             if (typeof srcKey === 'object') resObj[key] = {...srcKey}; else resObj[key] = srcKey;
//         continue;
//         }
//         if (typeof protoKey !== 'object') {
//             if (typeof srcKey === 'object') resObj[key] = {...srcKey}; else resObj[key] = srcKey;
//         continue;
//         }
//
//
//         let resKey = resObj[key];
//
//         if (typeof srcKey === 'object') objectProjection(srcKey, protoKey, resKey);
//
//     }
//     return resObj;
// }

// V3
// const objectProjection = (src, proto, buffer = {src}, bufferKey = null, fullBuffer = {}, result = {}) => {
//     for (const key in proto) {
//         //Checking if srcObject exist
//         if (!src[key]) continue;
//
//         //Filling fullBuffer
//         bufferKey === null ? fullBuffer[key] = {} : fullBuffer[bufferKey] = {}
//
//         //Cleaning buffer - delete all key, which are not in proto
//         for (const keyB in buffer) {
//             if (keyB !== key) delete buffer[keyB]
//         }
//
//         // filling buffer[key] on src
//         if (typeof src[key] === 'object') {
//             buffer[key] = {...src[key]}
//         } else {
//             buffer[key] = src[key]
//         }
//
//         //checking if final situation - filling result
//         if (((typeof proto[key] !== 'object') || proto[key] === null)) {
//             bufferKey === null ? fullBuffer[key] = buffer[key] : fullBuffer[bufferKey] = buffer;
//             result = {
//                 ...result,
//                 ...fullBuffer
//             }
//             buffer = {}
//         }
//         if (typeof buffer[key] === 'object') objectProjection(src[key], proto[key], buffer[key], bufferKey, fullBuffer, result);
//     }
//     return result;
// }

const src = {
    prop11: {
        prop21: 211,
        prop22: {
            prop31: {},
            prop32: 32
        }
    },
    prop12: 12,
    prop30: {
        prop31: {
            prop311: 22,
            prop312: 32
        },
        prop15: 23
    }
}

const proto1 = {
    prop11: {
        prop22: null
    },
    prop12: null

}

const proto2 = {
    prop11: {
        prop21: 213,
        prop22: {
            prop31: 32
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
//v4
const objectProjection = (src, proto, result = {}) => {
    let buffer = {}

    for (protoKey in proto) {
        if (src.hasOwnProperty(protoKey)) buffer[protoKey] = src[protoKey];
    }
    console.log("buffer---", buffer)
    for (const key in proto) {
        if (!src[key]) continue;
        if (proto[key] === null) {
            buffer[key] = typeof src[key] === 'object' ? {...src[key]} : src[key];
            result = {
                ...result,
                ...buffer
            }
            console.log("result---", result)
        } else if (typeof proto[key] !== 'object'  ) {

            result = {
                ...result,
                [key]: buffer[key]
            }
        }
        if (typeof proto[key] === 'object' && typeof proto[key] !== null) objectProjection(src[key], proto[key], result);
    }
    return result;
}


console.log("Task3");
console.log("-----------------------------------------------------------------------------------");
console.log("Src object - ", src);
console.log("Proto object case1 - ", proto1);
console.log("Result of function objectProjection case1 - ", objectProjection(src, proto1));
console.log("Expected result of objectProjection case1 -  { prop11: { prop22: { prop31: {}, prop32: 32 } },  prop12: 12 } }\n")

console.log("Proto object case2 - ", proto2);
console.log("Result of function objectProjection case2 - ", objectProjection(src, proto2));
console.log("Expected result of objectProjection case2 -  { prop11: { prop22: { prop31: {}}}\n");

console.log("Proto object case3 - ", proto3);
console.log("Result of function objectProjection case3 - ", objectProjection(src, proto3));
console.log("Expected result of objectProjection case3 -  { prop12: 12 }\n");

console.log("Proto object case4 - ", proto4);
console.log("Result of function objectProjection case4 - ", objectProjection(src, proto4));
console.log("Expected result of objectProjection case4 -  {}\n");
