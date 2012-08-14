Be = Be || {};
Be.BehanceProjectsCollection = {};

/**
 * Behance project collection.
 */
Be.BehanceProjectsCollection = Be.Collection.extend({
  model: Backbone.Model,
  
  url: function () {
    return Be.api_url + 'users/' + this.id + '/projects?api_key=' + Be.api_key;
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