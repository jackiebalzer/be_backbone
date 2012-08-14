Be = Be || {};
Be.api_url = 'http://www.behance.net/v2/';
Be.api_key = '12345678901234567890123456789012';

Be.BehanceUserModel = Backbone.Model.extend({
  /**
   * Set the API endpoint for users.
   */
  url: function () {
    return Be.api_url + 'users/' + this.id + '?api_key=' + Be.api_key;
  },
  
  /**
   * The Behance API returns a 'users' object. We want the contents of the object.
   * @param {Object} response The response from the server.
   */
  parse: function (response) {
    return response.user;
  },
  
  /**
   * Behance API is JSONP.
   * TODO - Link to documentation.
   */
  sync: function (method, model, options) {
    options.dataType = 'jsonp';
    return Backbone.sync(method, model, options);
  }, // BehanceUserCollection#sync
  
  /**
   * Get this user's projects.
   * Using this method requires the BehanceProjectsCollection base collection.
   */
  getProjects: function() {
    var projects = new Be.BehanceProjectsCollection();
    projects.id = this.get('id');
    projects.fetch();
    this.set('projects', projects);
  }, // BehanceUserModel#getProjects
  
  /**
   * Get this user's WIPs.
   * Using this method requires the BehanceWipsCollection base collection.
   */
  getWips: function() {
    var wips = new Be.BehanceWipsCollection();
    wips.id = this.get('id');
    wips.fetch();
    this.set('wips', wips);
  }
});

var app = {}

app.BehanceUser = new Be.BehanceUserModel({id: 50000});
app.BehanceUser.fetch();
app.BehanceUser.getProjects();
app.BehanceUser.getWips();

console.log('Be', Be);
console.log('app', app);
