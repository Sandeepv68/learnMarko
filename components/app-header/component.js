class AppHeader {
    onCreate() {
        let self = this;
        self.state = {
            brand: null
        };
    }
    onInput(input){
        let self = this;
        self.state.brand = input.brand;
    }
}
module.exports = AppHeader;