/**
 *  Events
 */
function Events(target){
  var events = {}, i, list, args, A = Array, evt, prvntDef = false;
  target = target || this
    /**
     *  On: listen to events
     */
    target.on = function(type, func, ctx){
      (events[type] || (events[type] = [])).push({f:func, c:ctx})
    }
    /**
     *  Default: listen to events - this is default
     */
    target.default = function(type, func, ctx){
      (events[type] || (events[type] = [])).default = {f:func, c:ctx}
    }
    /**
     *  Off: stop listening to event / specific callback
     */
    target.off = function(type, func){
      list = events[type] || []
      i = list.length = func ? list.length : 0
      while(~--i<0) func == list[i].f && list.splice(i,1)
    }
    /** 
     * Emit: send event, callbacks will be triggered
     */
    target.emit = function(){
      args = A.apply([], arguments)
      list = events[args.shift()] || []
      evt = {
        data: args[0],
        args: args,
        preventDefault: function(){ prvntDef = true; }
      }
      i = -1
      while(list[++i]) list[i].f.call(list[i].c, evt)
      if(!prvntDef && !!list.default) list.default.f.call(list.default.c, evt);
      prvntDef = false;
    }
}

module.exports = Events
