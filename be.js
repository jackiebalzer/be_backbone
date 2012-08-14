Be = {
  
  api_url : 'http://www.behance.net/v2/',
  
  collections : {},
  
  Projects : {},
  Search : {},
  Users : {},
  Wips : {}
  
};

Be.config = {
  
  api_key : '12345678901234567890123456789012',
  callback : 'json'
  
};

Be.Model = Backbone.Model.extend({
  
  sync : function( method, model, options ) {
    
    options.dataType = 'jsonp';
    
    return Backbone.sync( method, model, options );
    
  } // sync
  
});

Be.Collection = Backbone.Collection.extend({
  
  sync : function( method, model, options ) {
    
    options.dataType = 'jsonp';
    
    return Backbone.sync( method, model, options );
    
  } // sync
  
});

Be.gather = {
  
  initialize : function() {
    
    console.log( 'Be initialized' );
    
    Be.gather.projects( 4503871 );
    Be.gather.users( 104095 );
    Be.gather.wips( 11447 );
    // Be.gather.featured_projects();
    
    
  }, // initialize
  
  featured_projects : function() {
    
    Be.collections.search = new Be.Search.Collection();
    
    Be.collections.search.params = { sort : 'featured_date' };
    
    Be.collections.search.fetch();
    
    console.log( Be.collections.search );
    
  }, // featured_projects
  
  projects : function( project_id ) {
    
    Be.collections.projects = new Be.Projects.Collection();
    
    Be.collections.projects.project_id = project_id;
    
    Be.collections.projects.fetch();
    
    console.log( Be.collections.projects );
    
  }, // projects
  
  users : function( user_id ) {
    
    Be.collections.users = new Be.Users.Collection();
    
    Be.collections.users.user_id = user_id;
    
    Be.collections.users.fetch();
    
  },
  
  wips : function( wip_id ) {
    
    Be.collections.wips = new Be.Wips.Collection();
    
    Be.collections.wips.wip_id = wip_id;
    
    Be.collections.wips.fetch();
    
  }
  
};

$(function() {
  // Be.gather.initialize();
});