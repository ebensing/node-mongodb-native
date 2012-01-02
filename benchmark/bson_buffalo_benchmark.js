var BSON = require('buffalo')
var mongoNative = require('../lib/mongodb'),
  assert = require('assert'),
  Long = require('../lib/mongodb/goog/math/long').Long,
  ObjectID = require('../lib/mongodb/bson/bson').ObjectID,
  Binary = require('../lib/mongodb/bson/bson').Binary,
  Code = require('../lib/mongodb/bson/bson').Code,  
  DBRef = require('../lib/mongodb/bson/bson').DBRef,  
  Symbol = require('../lib/mongodb/bson/bson').Symbol,  
  Double = require('../lib/mongodb/bson/bson').Double,  
  MaxKey = require('../lib/mongodb/bson/bson').MaxKey,  
  MinKey = require('../lib/mongodb/bson/bson').MinKey,  
  Timestamp = require('../lib/mongodb/bson/bson').Timestamp;
  
var BSONPure = new mongoNative.BSONPure.BSON([Long, ObjectID, Binary, Code, DBRef, Symbol, Double, Timestamp, MaxKey, MinKey]);
var BSONNative = new mongoNative.BSONNative.BSON([Long, ObjectID, Binary, Code, DBRef, Symbol, Double, Timestamp, MaxKey, MinKey]);

var COUNT = 100000
// var COUNT = 20000
// var COUNT = 10000
// var COUNT = 1

// Function with scope
var function2 = function() {};
function2.scope = {a:1};

// var COUNT = 1
var object = {
    string: "Strings are great",
    decimal: 3.14159265,
    'undefined': undefined,
    bool: true,
    integer: 5,
    // regexp:/fdfdfd/mig,
    subObject: {
        moreText: "Bacon ipsum dolor sit amet cow pork belly rump ribeye pastrami andouille. Tail hamburger pork belly, drumstick flank salami t-bone sirloin pork chop ribeye ham chuck pork loin shankle. Ham fatback pork swine, sirloin shankle short loin andouille shank sausage meatloaf drumstick. Pig chicken cow bresaola, pork loin jerky meatball tenderloin brisket strip steak jowl spare ribs. Biltong sirloin pork belly boudin, bacon pastrami rump chicken. Jowl rump fatback, biltong bacon t-bone turkey. Turkey pork loin boudin, tenderloin jerky beef ribs pastrami spare ribs biltong pork chop beef.",
        longKeylongKeylongKeylongKeylongKeylongKey: "Pork belly boudin shoulder ribeye pork chop brisket biltong short ribs. Salami beef pork belly, t-bone sirloin meatloaf tail jowl spare ribs. Sirloin biltong bresaola cow turkey. Biltong fatback meatball, bresaola tail shankle turkey pancetta ham ribeye flank bacon jerky pork chop. Boudin sirloin shoulder, salami swine flank jerky t-bone pork chop pork beef tongue. Bresaola ribeye jerky andouille. Ribeye ground round sausage biltong beef ribs chuck, shank hamburger chicken short ribs spare ribs tenderloin meatloaf pork loin.",

        subObject: {
            moreText: "Bacon ipsum dolor sit amet cow pork belly rump ribeye pastrami andouille. Tail hamburger pork belly, drumstick flank salami t-bone sirloin pork chop ribeye ham chuck pork loin shankle. Ham fatback pork swine, sirloin shankle short loin andouille shank sausage meatloaf drumstick. Pig chicken cow bresaola, pork loin jerky meatball tenderloin brisket strip steak jowl spare ribs. Biltong sirloin pork belly boudin, bacon pastrami rump chicken. Jowl rump fatback, biltong bacon t-bone turkey. Turkey pork loin boudin, tenderloin jerky beef ribs pastrami spare ribs biltong pork chop beef.",
            longKeylongKeylongKeylongKeylongKeylongKey: "Pork belly boudin shoulder ribeye pork chop brisket biltong short ribs. Salami beef pork belly, t-bone sirloin meatloaf tail jowl spare ribs. Sirloin biltong bresaola cow turkey. Biltong fatback meatball, bresaola tail shankle turkey pancetta ham ribeye flank bacon jerky pork chop. Boudin sirloin shoulder, salami swine flank jerky t-bone pork chop pork beef tongue. Bresaola ribeye jerky andouille. Ribeye ground round sausage biltong beef ribs chuck, shank hamburger chicken short ribs spare ribs tenderloin meatloaf pork loin.",
        },
    },
    date: new Date(),
    // code: function() {},
    // // function2: function2,
    // buffer:new Buffer('hello world'),
    // 'null': null,
    // subArray: [1,2,3,4,5,6,7,8,9,10],
    // anotherString: "another string"
}

var object2 = {
    // string: "Strings are great",
    // decimal: 3.14159265,
    // 'undefined': undefined,
    // bool: true,
    // integer: 5,
    // regexp:/fdfdfd/mig,
    subObject: {
      a:'hello'
        // moreText: "Bacon ipsum dolor sit amet cow pork belly rump ribeye pastrami andouille. Tail hamburger pork belly, drumstick flank salami t-bone sirloin pork chop ribeye ham chuck pork loin shankle. Ham fatback pork swine, sirloin shankle short loin andouille shank sausage meatloaf drumstick. Pig chicken cow bresaola, pork loin jerky meatball tenderloin brisket strip steak jowl spare ribs. Biltong sirloin pork belly boudin, bacon pastrami rump chicken. Jowl rump fatback, biltong bacon t-bone turkey. Turkey pork loin boudin, tenderloin jerky beef ribs pastrami spare ribs biltong pork chop beef.",
        // longKeylongKeylongKeylongKeylongKeylongKey: "Pork belly boudin shoulder ribeye pork chop brisket biltong short ribs. Salami beef pork belly, t-bone sirloin meatloaf tail jowl spare ribs. Sirloin biltong bresaola cow turkey. Biltong fatback meatball, bresaola tail shankle turkey pancetta ham ribeye flank bacon jerky pork chop. Boudin sirloin shoulder, salami swine flank jerky t-bone pork chop pork beef tongue. Bresaola ribeye jerky andouille. Ribeye ground round sausage biltong beef ribs chuck, shank hamburger chicken short ribs spare ribs tenderloin meatloaf pork loin.",
        //     
        // subObject: {
        //     moreText: "Bacon ipsum dolor sit amet cow pork belly rump ribeye pastrami andouille. Tail hamburger pork belly, drumstick flank salami t-bone sirloin pork chop ribeye ham chuck pork loin shankle. Ham fatback pork swine, sirloin shankle short loin andouille shank sausage meatloaf drumstick. Pig chicken cow bresaola, pork loin jerky meatball tenderloin brisket strip steak jowl spare ribs. Biltong sirloin pork belly boudin, bacon pastrami rump chicken. Jowl rump fatback, biltong bacon t-bone turkey. Turkey pork loin boudin, tenderloin jerky beef ribs pastrami spare ribs biltong pork chop beef.",
        //     longKeylongKeylongKeylongKeylongKeylongKey: "Pork belly boudin shoulder ribeye pork chop brisket biltong short ribs. Salami beef pork belly, t-bone sirloin meatloaf tail jowl spare ribs. Sirloin biltong bresaola cow turkey. Biltong fatback meatball, bresaola tail shankle turkey pancetta ham ribeye flank bacon jerky pork chop. Boudin sirloin shoulder, salami swine flank jerky t-bone pork chop pork beef tongue. Bresaola ribeye jerky andouille. Ribeye ground round sausage biltong beef ribs chuck, shank hamburger chicken short ribs spare ribs tenderloin meatloaf pork loin."
        // }
    },
    
    // dbref: new DBRef('collection', new ObjectID(), 'db'),
    // long: Long.fromNumber(1000),
    // // double: new Double(3.14),
    // code1: new Code((function() {}).toString(), {a:1}),
    // code: new Code((function() {}).toString()),
    // minKey: new MinKey(),
    // maxKey: new MaxKey(),
    // objectId: new ObjectID(),
    // binary: new Binary('hello world'),
    // symbol: new Symbol('hello'),
    // timestamp: Timestamp.fromNumber(1000),    
    // date: new Date(),
    // // fuction1: function() {},
    // // function2: function2,
    // // buffer:new Buffer('hello world'),
    // 'null': null,
    // subArray: [1,2,3,4,5,6,7,8,9,10],
    // anotherString: "another string"
}

// // object2 = object;
// var x, start, end, i
// var serializedBSON, serializedBSONPure, serializedBSONNative, serializedJSON
// var deserializedBSON, deserializedBSONPure, deserializedBSONNative, deserializedJSON
// 
// for (i=COUNT; --i>=0; ) {
//   calculate1 = BSON.calculate(object)
//   // calculate2 = BSONPure.calculateObjectSize(object2, true)
//   calculate3 = BSONPure.calculateObjectSize2(object2, true)
//   calculate4 = BSONNative.calculateObjectSize(object2)
// }
// 
// start = new Date
// for (i=COUNT; --i>=0; ) {
//   calculate1 = BSON.calculate(object)
// }
// end = new Date
// console.log(COUNT + "x buffalo.calculate(object)                      time = ", end - start, "ms -", COUNT * 1000 / (end - start), " ops/sec")
// 
// start = new Date
// for (i=COUNT; --i>=0; ) {
//     calculate2 = BSONPure.calculateObjectSize2(object, true)
// }
// end = new Date
// console.log(COUNT + "x BSONPure.calculateObjectSize(object)                      time = ", end - start, "ms -", COUNT * 1000 / (end - start), " ops/sec")
// 
// 
// start = new Date
// for (i=COUNT; --i>=0; ) {
//     calculate3 = BSONPure.calculateObjectSize2(object2)
// }
// end = new Date
// console.log(COUNT + "x BSONPure.calculateObjectSize2(object)                      time = ", end - start, "ms -", COUNT * 1000 / (end - start), " ops/sec")
// 
// 
// console.log("==================================================================")
// console.dir("BSON.calculate :: " + calculate1)
// // console.dir("BSONPure.calculateObjectSize :: " + calculate2)
// console.dir("BSONPure.calculateObjectSize2 :: " + calculate3)
// console.dir("BSONNative.calculateObjectSize :: " + calculate4)

// console.log("========================================================== serialize")
// console.log("BSON.serialize :: ")
// console.dir(BSON.serialize(object).toString('hex'))
// console.log("BSONPure.serialize2 :: ")
// console.dir(BSONPure.serialize2(object2, null, true).toString('hex'))
// console.dir(BSONPure.serialize2(object2, null, true).toString('ascii'))
// console.log("BSONPure.serialize :: ")
// console.dir(BSONPure.serialize(object, null, true).toString('hex'))
// console.log("BSONNative.serialize :: ")
// console.dir(BSONNative.serialize(object2, null, true).toString('hex'))
// console.dir(BSONNative.serialize(object2, null, true).toString('ascii'))

// Serialize
var a = BSONPure.serialize2(object2, null, true);
var b = BSONNative.serialize(object2, null, true);

console.log("==================================== check")
for(var i = 0; i < b.length; i++) {
  console.log("[" + a[i] + "] = [" + b[i] + "] :: " + (a[i] === b[i]));
}

// assert.equal(BSONNative.serialize(object2, null, true).toString('hex'), 
//   BSONPure.serialize2(object2, null, true).toString('hex'))

start = new Date
for (i=COUNT; --i>=0; ) {
    serializedBSON = BSON.serialize(object)
}
end = new Date
console.log(COUNT + "x buffalo.serialize(object)                      time = ", end - start, "ms -", COUNT * 1000 / (end - start), " ops/sec")

start = new Date
for (i=COUNT; --i>=0; ) {
    serializedBSONPure = BSONPure.serialize2(object, null, true)
}
end = new Date
console.log(COUNT + "x mongodb.BSONPure.serialize2(object)             time = ", end - start, "ms -", COUNT * 1000 / (end - start), " ops/sec")

start = new Date
for (i=COUNT; --i>=0; ) {
    serializedBSONPure = BSONPure.serialize(object, null, true)
}
end = new Date
console.log(COUNT + "x mongodb.BSONPure.serialize(object)             time = ", end - start, "ms -", COUNT * 1000 / (end - start), " ops/sec")

if (BSONNative) {
    start = new Date
    for (i=COUNT; --i>=0; ) {
        serializedBSONNative = BSONNative.serialize(object, null, true)
    }
    end = new Date
    console.log(COUNT + "x mongodb.BSONNative.serialize(object)       time = ", end - start, "ms -", COUNT * 1000 / (end - start), " ops/sec")
}

start = new Date
for (i=COUNT; --i>=0; ) {
    serializedJSON = JSON.stringify(object)
}
end = new Date
console.log(COUNT + "x JSON.stringify(object)                         time = ", end - start, "ms -", COUNT * 1000 / (end - start), " ops/sec")

// 
// start = new Date
// for (i=COUNT; --i>=0; ) {
//     deserializedBSON = BSON.parse(serializedBSON)
// }
// end = new Date
// console.log(COUNT + "x buffalo.parse(buffer)                          time = ", end - start, "ms -", COUNT * 1000 / (end - start), " ops/sec")
// 
// 
// start = new Date
// for (i=COUNT; --i>=0; ) {
//     deserializedBSONPure = BSONPure.deserialize(serializedBSONPure)
// }
// end = new Date
// console.log(COUNT + "x mongodb.BSONPure.deserialize(buffer)           time = ", end - start, "ms -", COUNT * 1000 / (end - start), " ops/sec")
// 
// 
// if (BSONNative) {
//     start = new Date
//     for (i=COUNT; --i>=0; ) {
//         deserializedBSONNative = BSONNative.deserialize(serializedBSONNative)
//     }
//     end = new Date
//     console.log(COUNT + "x mongodb.BSONNative.deserialize(buffer)     time = ", end - start, "ms -", COUNT * 1000 / (end - start), " ops/sec")
// }
// 
// start = new Date
// for (i=COUNT; --i>=0; ) {
//     deserializedJSON = JSON.parse(serializedJSON)
// }
// end = new Date
// console.log(COUNT + "x JSON.parse(string)                             time = ", end - start, "ms -", COUNT * 1000 / (end - start), " ops/sec")

function compare(b1, b2) {
    try {
        require('assert').deepEqual(b1,b2)
        return true
    } catch (e) {
        console.error(e)
        return false
    }
}