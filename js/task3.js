/*
Task3
Develop a program “Object Projection”. Input: any JSON object; prototype object. Output: projected object.
Projected object structure shall be intersection of source object and prototype object structures.
Values of properties in projected object shall be the same as values of respective properties in source object.
 */
// function objectCleaner(obj) {
//     Object.keys(obj).forEach(key => {
//         if (obj[key] && typeof obj[key] === 'object' && objectCleaner(obj[key]) === null) delete obj[key];
//     });
//     return Object.keys(obj).length ? obj : null;
// }
//1 var
// function objectProjection(srcObj, protoObj, resObj = {}, buffer = {}) {
//     for (let key in protoObj) {
//         if (protoObj !== null) {
//             let srcKey = srcObj[key];
//             let protoKey = protoObj[key];
//
//
//             console.log("srcKey - ", srcKey, "protoKey - ", protoKey, "\nresObj - ", resObj, "bufferKey - ", buffer[key])
//
//             if (protoKey === null || protoKey !== undefined) {
//                 if (typeof srcKey === 'object') {
//                     buffer[key] = {...srcKey}
//                 } else {
//                     buffer[key] = srcKey;
//                 }
//                 if (buffer[key] !== null && buffer[key] !== undefined && (protoKey === null || protoKey === undefined)) resObj = {
//                     ...resObj,
//                     ...buffer[key]
//                 };
//             } else {
//                 delete bufferKey;
//             }
//             console.log("srcKey - ", srcKey, "protoKey - ", protoKey, "\nresObj - ", resObj, "bufferKey - ", buffer[key])
//             if (typeof buffer[key] === 'object') objectProjection(srcKey, protoKey, resObj, buffer[key]);
//         }
//     }
//     console.log(resObj)
//     return resObj;
// }


//
// const src = {
//     prop11: {
//         prop21: 21,
//         prop22: {
//             prop31: 31,
//             prop32: 32
//         }
//     },
//     prop12: 12
// }
//
// const proto = {
//     prop11: {
//         prop22: null
//     }
// }
//
// const proto2 = {
//     prop11: {
//         prop22: {prop31: null}
//     }
// }
//
// const proto3 = {
//     prop11: {
//         prop22: {
//             prop31: {
//                 prop32: null
//             }
//         },
//         prop14: 15
//     },
//     prop12: 12
// }
//
// console.dir(objectProjection(src, proto));
// console.log("Task3");
// console.log("-----------------------------------------------------------------------------------");
// console.log("Src object - ", src);
// console.log("Proto object case1 - ", proto);
// console.log("Result of function objectProjection case1 - ", objectProjection(src, proto));
// console.log("Proto object case2 - ", proto2);
// console.log("Result of function objectProjection case2 - ", objectProjection(src, proto2));
// console.log("Proto object case3 - ", proto3);
// console.log("Result of function objectProjection case2 - ", objectProjection(src, proto3));


// function objectProjection(srcObj, protoObj, resObj = {}, buffer = {}) {
//
//     for (let key in protoObj) {
//             let srcKey = srcObj[key];
//             let protoKey = protoObj[key];
//             let bufferKey = buffer[key];
//
//             bufferKey = {...srcKey};
//             if (typeof protoKey !== 'object' || protoKey === null) {
//                 console.log("proto - not object", protoObj);
//
//                 resObj[key] = bufferKey;
//                 delete bufferKey
//                 console.log("resObj[key] = ", resObj)
//             }
//
//             let resKey = resObj[key];
//             console.log("srcKey && protoKey", srcKey, protoKey)
//             if (srcKey && protoKey) objectProjection(srcKey, protoKey, resKey, bufferKey);
//
//     }
//     return resObj;
// }

// function objectProjection(srcObj, protoObj, resObj = {}) {
//     for (let key in protoObj) {
//         if (protoObj !== null) {
//             let srcKey = srcObj[key];
//             let protoKey = protoObj[key];
//             if (protoKey|| protoKey===null) {
//                 if (typeof srcKey === 'object') resObj[key] = {...srcKey}; else resObj[key] = srcKey;
//             } else delete resObj[key];
//             let resKey = resObj[key];
//             if (typeof resKey === 'object') objectProjection(srcKey, protoKey, resKey);
//         }
//     }
//     return resObj;
// }
const src = {
    prop11: {
        prop21: 21,
        prop22: {
            prop31: 12,
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
            prop31: {}
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
        console.log("key, obj[key], proto[key]----", key, src[key], proto[key])

        if (((proto[key] === null || typeof proto[key] !== 'object') && src[key])) {
            buffer[key] = typeof src[key] === 'object' ? {...src[key]} : src[key];
            console.log("buffer", buffer)
            result = {
                ...result,
                ...buffer
            }
            console.log("result", result)
            buffer = {}
        }
        if (typeof proto[key] === 'object' && src[key]) {
            buffer[key] = typeof src[key] === 'object' ? {...src[key]} : src[key];
        }

        if (typeof proto[key] === 'object' && typeof src[key] !== 'object') {
            buffer = {};
            continue;
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
