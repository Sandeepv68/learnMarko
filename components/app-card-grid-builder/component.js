const Unsplash = require('../../services/unsplash');
const unsplashConfig = require('../../config/unsplash');

let UnsplashApi = new Unsplash(unsplashConfig);

class AppCardBuilder {
    onCreate() {
        let self = this;
        self.state = {
            imageData: null
        };
        console.log(self.state);
    }
    onInput() {
        let self = this;
        console.log(self.state);
    }
    onMount() {
        let self = this;
        // UnsplashApi.listPhotos(1, 10, 'latest')
        // .then(function (result) {
        //     console.log(result);
        // }).catch(function (e) {
        //     console.log(e);
        // });
        console.log(self.state);
    }
}

module.exports = AppCardBuilder;