Be = Be || {};
Be.api_url = 'http://www.behance.net/v2/';
Be.api_key = '12345678901234567890123456789012';
Be.docs_link = 'http://developer.behance.net';

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
   * @returns {Object} The BehanceUserModel object.
   */
  getProjects: function() {
    var projects = new Be.BehanceProjectsCollection();
    projects.id = this.get('id');
    projects.fetch();
    this.set('projects', projects);
    return this;
  }, // BehanceUserModel#getProjects
  
  /**
   * Get a specific project page.
   * @param {Number|String} page Page number to fetch results for.
   */
  getProjectPage: function (page) {
    var projects;
    
    // Error out early.
    if (!this.has('projects') && console) {
      console.error('Be.BehanceUserModel: Make sure you\'ve populated the projects collection before using the paging methods. See:' + Be.docs_link + 'for more information.');
      return false;
    }
    
    projects = this.get('projects');
    projects.params.page = parseInt(page, 10);
    projects.fetch();
  },
  
  /**
   * Get the next page of projects.
   */
  getNextProjectsPage: function () {
    this.getProjectPage(this.get('projects').params.page + 1);
    return this;
  },
  
  /**
   * Get the previous page of projects.
   */
  getPreviousProjectsPage: function () {
    var currentPage = this.get('projects').params.page;
    this.getProjectPage(currentPage < 1 ? 1 : currentPage - 1);
    return this;
  },
  
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

app.BehanceUser = new Be.BehanceUserModel({id: 339011});
app.BehanceUser.fetch();
app.BehanceUser.getProjects();

// setTimeout(function () {
//   app.BehanceUser.getNextProjectsPage();
// }, 1000);

setTimeout(function () {
  app.BehanceUser.getNextProjectsPage();
}, 1000);

setTimeout(function () {
  app.BehanceUser.getPreviousProjectsPage();
}, 2000);

// app.BehanceUser.getWips();

console.log('Be', Be);
console.log('app', app);
