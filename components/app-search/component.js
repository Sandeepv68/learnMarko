class AppSearch {
    constructor() {
        this.searchQuery = '';
    }
    getKeyword() {
        let self = this;
        let inputField = self.getEl('search_field');
        let searchButton = self.getEl('search_button');
        self.searchQuery = inputField.value;
        if (self.searchQuery.length >= 3) {
            searchButton.classList.remove('hide');
        } else {
            searchButton.classList.add('hide');
        }
    }

    search() {
        let self = this;
        console.log(self.searchQuery);
    }
    // emitKeyword() {
    //     let self = this;
    //     let inputField = self.getEl('search_field');
    //     self.emit('keywordEntered', inputField.value);
    // }
}

module.exports = AppSearch;