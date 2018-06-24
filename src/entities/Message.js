export default class Message {
    constructor(vnode) {
        this.value = vnode.attrs.value;
        this.date = vnode.attrs.date;
        vnode.key = +vnode.attrs.date;
        this.inline = vnode.attrs.inline;
    }

    view() {
        return <div class="message">
            <small>({this.getTime(this.date)}) </small>
            {this.inline ? this.value : m.trust(this.value)}
        </div>;
    }

    getTime(date) {
        date = date || new Date();
        let pad2 = n => ('0' + n).slice(-2);
        return pad2(date.getHours()) + ":" + pad2(date.getMinutes()) + ':' + date.getSeconds();
    }
}