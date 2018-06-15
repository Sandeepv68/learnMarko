//Dependency
const axios = require('axios');

//Set API url
const LOCATION = 'https://api.unsplash.com/';

//Define api signatures
let SCHEMA = {
    USERS_PUBLIC_PROFILE: 'users/',
    USERS_PORTFOLIO: 'users/:username/portfolio',
    USERS_PHOTOS: 'users/:username/photos',
    USERS_LIKED_PHOTOS: 'users/:username/likes',
    USERS_COLLECTIONS: 'users/:username/collections',
    USERS_STATISTICS: 'users/:username/statistics',

    LIST_PHOTOS: 'photos',
    LIST_CURATED_PHOTOS: 'photos/curated',
    GET_A_PHOTO: 'photos/:id',
    GET_A_RANDOM_PHOTO: 'photos/random',
    GET_A_PHOTO_STATISTICS: 'photos/:id/statistics',
    GET_A_PHOTO_DOWNLOAD_LINK: 'photos/:id/download',
    UPDATE_A_PHOTO: 'photos/:id',
    LIKE_A_PHOTO: 'photos/:id/like',
    UNLIKE_A_PHOTO: 'photos/:id/like',

    SEARCH_PHOTOS: 'search/photos',
    SEARCH_COLLECTIONS: 'search/collections',
    SEARCH_USERS: 'search/users',

    CURRENT_USER_PROFILE: 'me',
    UPDATE_CURRENT_USER_PROFILE: 'me',

    STATS_TOTALS: 'stats/total',
    STATS_MONTH: 'stats/month',

    LIST_COLLECTIONS: 'collections',
    LIST_FEATURED_COLLECTIONS: 'collections/featured',
    LIST_CURATED_COLLECTIONS: 'collections/curated',
    GET_COLLECTION: 'collections/:id',
    GET_CURATED_COLLECTION: 'collections/curated/:id',
    GET_COLLECTION_PHOTOS: 'collections/:id/photos',
    GET_CURATED_COLLECTION_PHOTOS: 'collections/curated/:id/photos',
    LIST_RELATED_COLLECTION: 'collections/:id/related',
    CREATE_NEW_COLLECTION: 'collections',
    UPDATE_EXISTING_COLLECTION: 'collections/:id',
    DELETE_COLLECTION: 'collections/:id',
    ADD_PHOTO_TO_COLLECTION: 'collections/:collection_id/add',
    REMOVE_PHOTO_FROM_COLLECTION: 'collections/:collection_id/remove'
};

/**
 * Unsplash api wrapper bootstrap - exposing the promise factories to access the Unsplash API endpoints.
 * @namespace UnsplashApi
 * @param {Object} options - The options object containing Unsplash developer account details (required).
 */
let UnsplashApi = function (options) {
    if (options) {
        let self = this;
        options = Object.assign({}, options);
        self.access_key = (options.access_key ? options.access_key : (function () {
            throw new Error('Access Key missing!');
        }()));
        self.secret_key = (options.secret_key ? options.secret_key : (function () {
            throw new Error('Secret Key missing!');
        }()));
        self.redirect_uri = (options.redirect_uri ? options.redirect_uri : (function () {
            throw new Error('Redirect URI missing!');
        }()));
        self.code = (options.code ? options.code : (function () {
            throw new Error('Authorization Code missing!');
        }()));
        self.grant_type = 'authorization_code';
        if (options.bearer_token) {
            self.bearer_token = options.bearer_token;
        }
        self.headers = {
            'Content-type': 'application/json',
            'Authorization': (self.bearer_token ? 'Bearer ' + self.bearer_token : 'Client-ID ' + self.access_key)
        };
    } else {
        throw new Error('Initilisation parameters missing!');
    }
};

//Set available order_by options
let availableOrders = ['latest', 'oldest', 'popular'];
//Sset available orientation options
let availableOrientations = ['landscape', 'portrait', 'squarish'];

/**
 * Helper function to check whether an item belongs to an Array.
 * @function contains
 * @param {*} item - The item to be checked (required).
 * @returns {Number} - An integer representing the presence or absence of an item.
 */
Array.prototype.contains = function (item) {
    return this.indexOf(item) > -1;
};

/**
 * Heler function to fetch a given url
 * @function fetchUrl
 * @param {Object} self - The 'this' object holding the context of the 'UnsplashApi' object (required).
 * @param {String} url - The url to be fetched (required).
 * @returns {Object} - The JSON data object.
 */
let fetchUrl = function (self, url) {
    let iSelf = self;
    return axios(url, {
        headers: iSelf.headers
    }).then(function (res) {
        return res;
    }).catch(function (err) {
        return Promise.reject(err);
    });
};

/**
 * Promise factory to access the list Photos endpoint of the Unsplash API.
 * @function listPhotos
 * @memberof UnsplashApi
 * @param {Number} page - The page number of results to fetch (Optional, defaults to 1).
 * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
 * @param {String} order_by - The sort method for results (Optional, Valid values: latest, oldest, popular; defaults to: latest).
 * @returns {Object} - The JSON data object. 
 */
UnsplashApi.prototype.listPhotos = function (page, per_page, order_by) {
    let self = this;
    if (order_by !== undefined && !availableOrders.contains(order_by)) {
        throw new Error('Parameter : order_by has an unsupported value!');
    }
    let url = LOCATION + SCHEMA.LIST_PHOTOS +
        '?page=' + (page && !isNaN(page) ? +page : 1) +
        '&per_page=' + (per_page && !isNaN(per_page) ? +per_page : 10) +
        '&order_by=' + (order_by ? order_by : 'latest');
    return fetchUrl(self, url);
};

/**
 * Promise factory to access the Search Photos endpoint of the Unsplash API.
 * @function search
 * @memberof UnsplashApi
 * @param {String} query - The search query (required).
 * @param {Number} page - The page number of results to fetch (Optional, defaults to 1).
 * @param {Number} per_page - The number of items per page (Optional, defaults to 10).
 * @param {Number} collections - The collection ID(‘s) to narrow the search. If multiple, comma-separated (Optional).
 * @param {String} orientation - Filter search results by photo orientation (Optional, Valid values are landscape, portrait, and squarish, defaults to: landscape).
 * @returns {Object} - The JSON data object.
 */
UnsplashApi.prototype.search = function (query, page, per_page, collections, orientation) {
    let self = this;
    if (!availableOrientations.contains(orientation) && orientation !== undefined) {
        throw new Error('Parameter : orientation has an unsupported value!');
    }
    if (query === undefined) {
        throw new Error('Parameter : query is missing!');
    }
    let url = LOCATION + SCHEMA.SEARCH_PHOTOS +
        '?query=' + (query ? encodeURIComponent(query) : '') +
        '&page=' + (page && !isNaN(page) ? +page : 1) +
        '&per_page=' + (per_page && !isNaN(per_page) ? +per_page : 10) +
        '&collections=' + (collections && !isNaN(collections) ? +collections : '') +
        '&orientation=' + (orientation ? encodeURIComponent(orientation) : '');
    return fetchUrl(self, url);
};

module.exports = UnsplashApi;