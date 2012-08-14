Behance = Behance || {};
Behance.api_url = 'http://www.behance.net/v2/';
Behance.api_key = '12345678901234567890123456789012';
Behance.docs_link = 'http://developer.behance.net';

Behance.UserModel = Behance.Model.extend({
  /**
   * Set the API endpoint for users.
   */
  url: function () {
    return Behance.api_url + 'users/' + this.id + '?api_key=' + Behance.api_key;
  },
  
  /**
   * The Behance API returns a 'users' object. We want the contents of the object.
   * @param {Object} response The response from the server.
   */
  parse: function (response) {
    return response.user;
  },
  
  /**
   * Get this user's projects.
   * Using this method requires the BehanceProjectsCollection base collection.
   * @returns {Object} The BehanceUserModel object.
   */
  getProjects: function() {
    var projects = new Behance.ProjectsCollection();
    projects.id = this.get('id');
    projects.fetch();
    this.set('projects', projects);
    return this;
  }, // BehanceUserModel#getProjects
  
  /**
   * Get a specific project page.
   * @param {String} name Collection name to fetch results for.
   * @param {Number|String} page Page number.
   */
  getPage: function (name, page) {
    var collection;
    
    // Error out early.
    if (!this.has(name) && console) {
      console.error('Behance.UserModel: Make sure you\'ve populated the ' + name + ' collection before using the paging methods. See: ' + Behance.docs_link + ' for more information.');
      return false;
    }
    
    collection = this.get(name);
    collection.getPage(page);
  },
  
  /**
   * Get the next page of projects.
   */
  getNextProjectsPage: function () {
    this.getPage('projects', 'next');
    return this;
  },
  
  /**
   * Get the previous page of projects.
   */
  getPreviousProjectsPage: function () {
    this.getPage('projects', 'prev');
    return this;
  },
  
  /**
   * Get this user's WIPs.
   * Using this method requires the BehanceWipsCollection base collection.
   */
  getWips: function() {
    var wips = new Behance.WipsCollection();
    wips.id = this.get('id');
    wips.fetch();
    this.set('wips', wips);
  }
});

var app = app || {};

app.BehanceUser = new Behance.UserModel({id: 339011});
app.BehanceUser.fetch();
app.BehanceUser.getProjects();

setTimeout(function () {
  app.BehanceUser.getNextProjectsPage();
}, 1000);

setTimeout(function () {
  app.BehanceUser.getPreviousProjectsPage();
}, 2000);

// app.BehanceUser.getWips();

console.log('Be', Behance);
console.log('app', app);
