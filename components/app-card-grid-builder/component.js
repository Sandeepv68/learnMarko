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
        console.log(self.state);
    }
}
module.exports = AppCardBuilder;