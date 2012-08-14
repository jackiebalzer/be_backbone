Behance = {
  
  api_url : 'http://www.behance.net/v2/',
  
  collections : {},
  
  Projects : {},
  Search : {},
  Users : {},
  Wips : {}
  
};

Behance.config = {
  
  api_key : '12345678901234567890123456789012',
  callback : 'json'
  
};

Behance.Model = Backbone.Model.extend({
  
  /**
   * Behance API is JSONP.
   * TODO - Link to documentation.
   */
  sync : function( method, model, options ) {
    
    options.dataType = 'jsonp';
    
    return Backbone.sync( method, model, options );
    
  } // sync
  
});

Behance.Collection = Backbone.Collection.extend({
  
  /**
   * Behance API is JSONP.
   * TODO - Link to documentation.
   */
  sync : function( method, model, options ) {
    
    options.dataType = 'jsonp';
    
    return Backbone.sync( method, model, options );
    
  } // sync
  
});

Behance.gather = {
  
  initialize : function() {
    
    console.log( 'Be initialized' );
    
    Behance.gather.projects( 4503871 );
    Behance.gather.users( 104095 );
    Behance.gather.wips( 11447 );
    // Behance.gather.featured_projects();
    
    
  } // initialize
  
  
};

$(function() {
  // Behance.gather.initialize();
});