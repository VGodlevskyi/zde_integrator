/*
Task3
Develop a program “Object Projection”. Input: any JSON object; prototype object. Output: projected object.
Projected object structure shall be intersection of source object and prototype object structures.
Values of properties in projected object shall be the same as values of respective properties in source object.
 */
//Version1
// function objectProjection(srcObj, protoObj, resObj = {}) {
//
//     for (let key in srcObj) {
//         if (protoObj !== null) {
//             let srcKey = srcObj[key];
//             let protoKey = protoObj[key];
//             if (protoKey === null || protoKey !== undefined) {
//                 if (typeof srcKey === 'object') resObj[key] = {...srcKey}; else resObj[key] = srcKey;
//             } else delete resObj[key];
//             let resKey = resObj[key];
//
//             if (typeof resKey === 'object') objectProjection(srcKey, protoKey, resKey);
//         }
//     }
//     return resObj;
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

const objectProjection = (src, proto, buffer = {}, bufferKey=null, fullBuffer = {}, result = {}) => {
    for (const key in proto) {
        //Checking if srcObject exist
        if (!src[key]) continue;

        //Checking and rewrite  bufferKey
        if (bufferKey===null) bufferKey=key;
        fullBuffer[bufferKey]={}

        //Cleaning buffer - delete all key, which are not in proto
        for (const keyB in buffer) {
            if (keyB !== key) delete buffer[keyB]
        }

        // filling buffer[key] on src
        if (typeof src[key] === 'object'){
            buffer[key]={...src[key]}
        }else buffer=src[key]

        //checking if final situation - filling result
        if (((typeof proto[key] !== 'object') || proto[key] === null)) {
            fullBuffer[bufferKey]=buffer;
            result = {
                ...result,
                ...fullBuffer
            }
            buffer = {}
        }

        if (typeof buffer[key] === 'object') objectProjection(src[key], proto[key], buffer[key], bufferKey, fullBuffer, result);
        console.log("result ---->", result)
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
console.log("Expected result of objectProjection case2 -  { prop11: { prop22: { prop31: {}}}\n");

console.log("Proto object case3 - ", proto3);
console.log("Result of function objectProjection case3 - ", objectProjection(src, proto3));
console.log("Expected result of objectProjection case3 -  { prop12: 12 }\n");

console.log("Proto object case4 - ", proto4);
console.log("Result of function objectProjection case4 - ", objectProjection(src, proto4));
console.log("Expected result of objectProjection case4 -  {}\n");
