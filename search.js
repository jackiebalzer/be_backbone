Be = Be || {};
Be.BehanceSearchCollection = {};

/**
 * Behance Search collection.
 *
 * This collection will...
 * TODO - Write docs.
 */
Be.BehanceSearchResultsCollection = Be.Collection.extend({
  model: Backbone.Model,
  
  /**
   * Available params
   */
  params: {
    // Regular search string.
    search: null,
    // Maps to the 'Most Appreciated' tab.
    sort: null,
    // Filter by Projects or People.
    content: null,
    // Time frame
    time: null
  },
  
  url: function () {
    return Be.api_url + 'search?api_key=' + Be.api_key + '&' + $.param(this.params);
  },
  
  parse: function (response) {
    return response.projects;
  },
  
  searchBy: function (options) {
    if (_.isString(options)) {
      this.searchKeyword(options);
    } else if (_.isObject(options) && !_.isArray(options)) {
      console.log('noop');
    }
  },
  
  searchKeyword: function (keyword) {
    this.nullAllExcept('search');
    this.params.search = keyword;
    this.fetch();
  },
  
  nullAllExcept: function (exception) {
    for (param in this.params) {
      if (!this.params.hasOwnProperty(param) && param == exception) { continue; }
      this.params[param] = null;
    }
    return this;
  }
});

var app = app || {};

app.SearchResults = new Be.BehanceSearchResultsCollection();
app.SearchResults.searchBy('what')
console.log('results', app.SearchResults)

