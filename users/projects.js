Be.Users.Projects = {};

// User Projects
Be.Users.Projects.Collection = Be.Collection.extend({
  
  model : Backbone.Model,
  
  params : {},
  
  url : function() {
    return Be.api_url + 'users/' + this.id + '/projects?' + $.param( $.extend( {}, Be.config, this.params ) );
  }
  
});