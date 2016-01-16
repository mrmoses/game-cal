var request = require('request');
var config = require('./config');

var baseUrl = 'http://www.giantbomb.com/api';

function get(resource, params, cb) {
    
    // &filter=field:value,field:value
    var filterString = '';
    if(params.filter) {
        filterString = params.filter;
        // for (var filter in params.filter) {
        //     if (filterString) {
        //         filterString += ',';
        //     }
        //     filterString += filter + ':' + params.filter[filter];
        // }
    }
    
    var urlQueryString = '';
    if (filterString) {
        urlQueryString += '?filter=' + filterString;
    }
    
    var sortString = '';
    if(params.sort) {
        sortString = params.sort;
    }
    
    if (sortString) {
        urlQueryString += (urlQueryString ? '&' : '?') + 'sort=' + sortString;
    }
    
    // add api key and json format
    urlQueryString += (urlQueryString ? '&' : '?') + 'api_key=' + config.GiantBombApiKey + '&format=json';
    
    // create full url
    var url = baseUrl + '/' + resource + urlQueryString;
    console.log("GET " + url);
    
    request(url, function(error, response, body) {
        if(error) {
            return cb("Error in Comic Vine API request. " + error);
        }
        
        var resp = JSON.parse(body);
        
        // check for rate limit error
        if (resp.status_code === 107) {
            error = "Comic Vine API rate limit exceeded. Please try again in a few minutes.";
        }
        
        // check for other errors
        if (!error && resp.error && resp.error !== "OK") {
            error = resp.error
        }
        
        // if there is no error
        if (!error && response.statusCode !== 200) {
            error = response.statusCode + ' ' + error;
        }
        
        cb(error, resp.results);
    });
}


exports.getReleases = function (params, cb) {
  return get('releases', params, cb);
}