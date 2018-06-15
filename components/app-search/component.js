class AppSearch {
    getKeyword() {
        let self = this;
        let inputField = self.getEl('search_field');
        let searchButton = self.getEl('search_button');
        if (inputField.value.length >= 3) {
            searchButton.classList.remove('hide');
        } else {
            searchButton.classList.add('hide');
        }
    }

    // emitKeyword() {
    //     let self = this;
    //     let inputField = self.getEl('search_field');
    //     self.emit('keywordEntered', inputField.value);
    // }
}

module.exports = AppSearch;