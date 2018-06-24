export default class User {
    constructor() {
        this.items = [];
        this.actions = [];
    }

    getItem(itemName) {
        return this.items.find(item => item.name === itemName);
    }

    hasItem(itemName) {
        let item = this.getItem(itemName);

        return !!item;
    }
}