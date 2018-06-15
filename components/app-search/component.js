class AppSearch {
    onCreate(){
        let self = this;
        self.state = {
            placeholder: null
        }
    }
    onInput(input){
        let self = this;
        self.state.placeholder = input.data;
    }
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

    /**
     * Redirect to search page with serach query attached
     */
    search() {
        let self = this;
        let inputField = self.getEl('search_field');
        window.location = window.location.origin + `/search/${inputField.value}`;
    }
    // emitKeyword() {
    //     let self = this;
    //     let inputField = self.getEl('search_field');
    //     self.emit('keywordEntered', inputField.value);
    // }
}

module.exports = AppSearch;