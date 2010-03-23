/**************************************
  ITEM
***************************************/
RB.Item = Object.create(RB.Model, {
  
  initialize: function(el){
    j = $(el);
    that = this;
    that.el = el;
    
    // Associate this object with the element for later retrieval
    j.data('that', that);

    // Observe double-click events in certain fields
    j.find('.editable').bind('mouseup', this.triggerEdit);
  },
  
  edit: function(){
    j = $(this.el);
      
    j.addClass('editing');
    
    j.find('.editable').each(function(index){
      field = $(this);
      fieldType = field.attr('fieldtype')!=null ? field.attr('fieldtype') : 'input';
      fieldName = field.attr('fieldname');
      
      // Create the input element for the field if it does not yet exist
      if(j.find(fieldType + '.' + fieldName).size()==0){
        input = fieldType=='select' ? $('#' + fieldName + '_options').clone(true) : $(document.createElement(fieldType));
        input.removeAttr('id');
        input.attr('name', fieldName);
        input.addClass(fieldName);
        input.addClass('editor');
        input.appendTo(j);
      }
      
      // Copy the value in the field to the input element
      value = ( fieldType=='select' ? field.children('.v').first().text() : field.text() );
      input.val(value);
      
    });
  },
  
  triggerEdit: function(event){
    // Get the item since what was clicked was a field
    j = $(this).parents('.item').first();
    
    // Call the edit method of the Item object
    if(!j.hasClass('editing') && !j.hasClass('dragging')){
      j.data('that').edit();
      j.find( '.' + $(event.currentTarget).attr('fieldname') + '.editor' ).focus();
    }
  }
  
});