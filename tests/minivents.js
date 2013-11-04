
var Events = require("../minivents.js");
var assert = require("assert");
var events = new Events();
var obj = {};
var eventsProps = (function(){
    var arr = [];
    for(var prop in events) {
        arr.push(prop);
    }
    return arr;
}());
/**
 *  Constructor Test
 */
describe("Events Object Properties", function(){
  it("should return an object with just three methods, on, off and emit, if passed nothing", 
    function(){
      var expected =  ["on", "default", "off", "emit"];
      for(i = 0; i < eventsProps.length; i++){
        assert.equal(eventsProps[i], expected[i])
      }
  });
});

describe("Mixin should modify original obj, not create new", function(){
  it("should modify original object", function(){
    var objRef = obj; 
    Events(obj);
    assert.equal(objRef, obj);
  })  
});

describe("Default event", function(){

    it("should always happen last", function(){
        var num = 10;
        events.default("num", function(){
            num += "1"
        })
        events.on("num", function(){
            num += 1
        })
        events.emit("num")
        assert.equal(num, "111")
    })

    it("should be able to be prevented", function(){
        var events = new Events();
        var num = 0;
        events.default("num", function(){
            num += 1; 
        })
        events.on("num", function(event){
            event.preventDefault(); 
        })
        events.emit("num")
        assert.equal(num, 0)
    })

})

describe("Event object", function(){

    describe("data attribute", function(){
        it("should be the same as the first argument", function(){
            var events = new Events();
            var obj = {name:"fabs"};
            var copyObj
            events.on("test", function(event){
                copyObj = event.data 
            })
            events.emit("test", obj)
            assert.equal(obj, copyObj)
        })
    })

})

