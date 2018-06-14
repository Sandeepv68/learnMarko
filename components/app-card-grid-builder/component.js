const Unsplash = require('../../services/unsplash');
const unsplashConfig = require('../../config/unsplash');

class AppCardBuilder {
    onCreate() {
        let self = this;
        self.state = {
            imageData: null,
            imageDataAppend: null
        };
    }
    onInput() {
        let self = this;
    }
    onMount() {
        let self = this;
        let page = 1;
        let perPage = 9;
        let orderBy = 'latest';
        let UnsplashApi = new Unsplash(unsplashConfig);
        UnsplashApi.listPhotos(page, perPage, orderBy)
            .then(function (result) {
                self.state.imageData = result.data;;
            }).catch(function (e) {
                console.log(e);
            });
        window.addEventListener('scroll', function () {
            let d = document.documentElement;
            let offset = d.scrollTop + window.innerHeight;
            let height = d.offsetHeight;
            if (offset === height) {
                console.log('hit');
                page = page + 1;
                UnsplashApi.listPhotos(page, perPage, orderBy)
                    .then(function (result) {
                        self.state.imageDataAppend = result.data;
                    }).catch(function (e) {
                        console.log(e);
                    });

            }
        });
    }
    onUpdate(){
        let self = this;
        console.log(self.state);
    }
}

module.exports = AppCardBuilder;