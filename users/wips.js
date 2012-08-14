Be = Be || {};
Be.BehanceWipsCollection = {};

// User Wips
Be.BehanceWipsCollection = Be.Collection.extend({
  model: Backbone.Model,
  
  params: {
    page: 1
  },
  
  url: function () {
    return Be.api_url + 'users/' + this.id + '/wips?api_key=' + Be.api_key + '&' + $.param(this.params);
  },
  
  /**
   * The Behance API returns a 'wips' object. We want the contents of the object.
   * @param {Object} response The response from the server.
   */
  parse: function (response) {
    return response.wips;
  }, // BehanceWipsCollection#parse
  
  /**
   * Behance API is JSONP.
   * TODO - Link to documentation.
   */
  sync: function (method, model, options) {
    options.dataType = 'jsonp';
    return Backbone.sync(method, model, options);
  } // BehanceWipsCollection#sync
});
