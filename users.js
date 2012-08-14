Be.Users.Model = Be.Model.extend({
  
  initialize : function() {
    
  },
  
  url : function() {
    
    return Be.api_url + 'users/' + this.id + '?' + $.param( Be.config );
    
  }, // url
  
  getProjects : function() {
   
    this.set( 'projects', new Be.Users.Projects.Collection() );
    this.get('projects').id = this.id;
    
  }, // getProjects
  
  getWips : function() {
    
    this.set( 'wips', new Be.Users.Wips.Collection() );
    this.get('wips').id = this.id;
    
  }
  
});

Be.Users.Collection = Be.Collection.extend({
  
  model : Be.Users.Model
  
});