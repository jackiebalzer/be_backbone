Behance = Behance || {};

Behance.WipModel = Behance.Model.extend({
  /**
   * Set the API endpoint for users.
   */
  url : function () {
    return Behance.api_url + 'wips/' + this.id + '?api_key=' + Behance.api_key;
  },
  
  /**
   * The Behance API returns a 'wip' object. We want the contents of the object.
   * @param {Object} response The response from the server.
   */
  parse : function (response) {
    return response.wip;
  },
  
  /**
   * Get a revision of this WIP.
   * Using this method requires the RevisionsCollection base collection.
   * @returns {Object} The WipModel object.
   */
  getRevision : function() {
    
    var comments = new Behance.CommentsCollection();
    comments.id = this.get('id');
    comments.fetch();
    this.set('comments', comments);
    
    return this;
    
  } // getRevision
  
});

var app = app || {};

app.BehanceWip = new Behance.WipModel({id: 12001});
app.BehanceWip.fetch();
// app.BehanceWip.getRevision();


setTimeout(function () {
  // app.BehanceWip.getPreviousRevision();
}, 1000);

setTimeout(function () {
  // app.BehanceWip.getNextRevision();
}, 2000);

// app.BehanceUser.getWips();

console.log('Be', Behance);
console.log('app', app);
