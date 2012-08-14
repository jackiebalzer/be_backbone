Be = Be || {};
Be.BehanceProjectsCollection = {};

/**
 * Behance project collection.
 */
Be.BehanceProjectsCollection = Be.Collection.extend({
  model: Backbone.Model,
  
  // Special params object for API pagination, etc., including defaults.
  params: {
    page: 1
  },
  
  url: function () {
    return Be.api_url + 'users/' + this.id + '/projects?api_key=' + Be.api_key + '&' + $.param(this.params);
  },
  
  /**
   * Get a specific project page.
   * @param {String} name Collection name to fetch results for.
   * @param {Number|String} page Page number.
   */
  getPage: function (page) {
    switch (page) {
      case 'next':
        page = this.params.page + 1;
        break;
        
      case 'prev':
        page = this.params.page < 1 ? 1 : this.params.page - 1;
        break;
        
      default:
        page = parseInt(page, 10);
    };
    
    this.params.page = page;
    this.fetch();
  },
  
  /**
   * The Behance API returns a 'projects' object. We want the contents of the object.
   * @param {Object} response The response from the server.
   */
  parse: function (response) {
    return response.projects;
  }, // BehanceProjectsCollection#parse
  
  /**
   * Behance API is JSONP.
   * TODO - Link to documentation.
   */
  sync: function (method, model, options) {
    options.dataType = 'jsonp';
    return Backbone.sync(method, model, options);
  } // BehanceProjectsCollection#sync
});