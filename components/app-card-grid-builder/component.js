const Unsplash = require('../../services/unsplash');
const unsplashConfig = require('../../config/unsplash');

class AppCardBuilder {
    onCreate() {
        let self = this;
        self.state = {
            imageData: null
        };
    }
    onInput() {
        let self = this;
    }
    onMount() {
        let self = this;
        let UnsplashApi = new Unsplash(unsplashConfig);
        let page = 1;
        let perPage = 9;
        let orderBy = 'latest';
        UnsplashApi.listPhotos(page, perPage, orderBy)
            .then(function (result) {
                self.state.imageData = result.data;;
            }).catch(function (e) {
                console.log(e);
            });
        window.onscroll = function () {
            let d = document.documentElement;
            let offset = d.scrollTop + window.innerHeight;
            let height = d.offsetHeight;
            if (offset === height) {
                           
            }
        };
    }
}

module.exports = AppCardBuilder;