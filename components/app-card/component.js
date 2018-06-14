class AppCard {
    onCreate() {
        let self = this;
        self.state = {
            input: null,
            imageData: null
        }
    }
    onInput(input) {
        if(!input || !input.data){
            throw new Error('Error: Cannot render component -> app-card without input.');
        }
        input = input || {};
        let self = this;
        self.state.input = input.data;
    }
    onMount() {
        let self = this;
        self.state.imageData = self.state.input;
    }
}
module.exports = AppCard;