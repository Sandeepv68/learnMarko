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

    /**
     * Redirect to search page with serach query attached
     */
    search() {
        let self = this;
        window.location = window.location.href + `search/${self.searchQuery}`;
    }
    // emitKeyword() {
    //     let self = this;
    //     let inputField = self.getEl('search_field');
    //     self.emit('keywordEntered', inputField.value);
    // }
}

module.exports = AppSearch;