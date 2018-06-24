export default class Scene {
    constructor(obj) {
        this.name = obj.name;
        this.description = obj.description;
        this.exits = obj.exits;
        this.items = obj.items;
    }
}