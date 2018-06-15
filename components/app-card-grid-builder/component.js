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
            let parent = self.getEl('parent');
            let imageAppend;
            let d = document.documentElement;
            let offset = d.scrollTop + window.innerHeight;
            let height = d.offsetHeight;
            if (offset === height) {
                page = page + 1;
                UnsplashApi.listPhotos(page, perPage, orderBy)
                    .then(function (result) {
                        imageAppend = result.data;
                        imageAppend.forEach(element => {
                            $(parent).append(`<div class="col s12 m4 l4">
                            <div class="card hoverable">
                              <div class="card-image">
                                <img src="${element.urls.small}" alt="photo"/>
                              </div>
                              <div class="card-content">
                                <div class="chip">
                                  <img src="${element.user.profile_image.small}" alt="photographer"/>
                                  ${element.user.name}
                                </div>
                                <a class="grey lighten-3 waves-effect btn-flat right">
                                  <i class="material-icons grey-text left">favorite</i>
                                  ${element.likes}
                                </a>
                              </div>
                            </div>
                          </div>`);
                        });
                    }).catch(function (e) {
                        console.log(e);
                    });
            }
        });
        // let searchComponent = self.getComponent('search');
        // searchComponent.on('keywordEntered', (keyword) => {
        //     let orientation = 'landscape';
        //     UnsplashApi.search(keyword, page, perPage, '', orientation)
        //         .then(function (response) {
        //             self.state.imageData = response.data.results;
        //             self.setStateDirty('imageData')
        //         }).catch(function (e) {
        //             console.log(e);
        //         });
        // });
    }
}

module.exports = AppCardBuilder;