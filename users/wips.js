Be.Users.Wips = {};

// User Wips
Be.Users.Wips.Collection = Be.Collection.extend({
  
  model : Backbone.Model,
  
  params : {},
  
  url : function() {
    return Be.api_url + 'users/' + this.id + '/wips?' + $.param( $.extend( {}, Be.config, this.params ) );
  }
  
});
