/***************************************
  BACKLOG
***************************************/

RB.Backlog = Object.create(RB.Model, {
    
  initialize: function(el){
    this.el = el;
    // Make the list sortable
    list = this.getList();
    list.sortable({ connectWith: '.list',
                    placeholder: 'placeholder',
                    forcePlaceholderSize: true,
                    dropOnEmpty: true,
                    start: function(event, ui){ ui.item.addClass("dragging") },
                    stop : function(event, ui){ ui.item.removeClass("dragging")  } 
                    });
    list.disableSelection();
    
    // Initialize each item in the backlog
    this.getItems().each(function(index){
      item = RB.Factory.initialize(RB.Item, this); // 'this' refers to an element with class="item"
    });
  },
  
  getItems: function(){
    return this.getList().children(".item");
  },

  getList: function(){
    return $(this.el).children(".list").first();
  }
  
});