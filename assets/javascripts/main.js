// Initialize everything after DOM is loaded
$(function() {
  // Initialize each backlog
  $('.backlog').each(function(index){
    backlog = RB.Factory.initialize(RB.Backlog, this); // 'this' refers to an element with class="backlog"
  });
});

// Douglas Crockford's technique for object extension
// http://javascript.crockford.com/prototypal.html
if(typeof Object.create !== 'function'){
    Object.create = function(o, methods){
        function F(){}
        F.prototype = o;
        obj = new F();
        if(typeof methods == 'object'){
          for(methodName in methods) obj[methodName] = methods[methodName];
        }
        return obj;
    };
}

var RB = {};

// Object factory for redmine_backlogs
RB.Factory = Object.create({
  
  initialize: function(objType, el){
    obj = Object.create(objType);
    obj.initialize(el);
    return obj;
  }  
  
});

// Common methods for models
RB.Model = Object.create({});