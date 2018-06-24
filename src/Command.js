import { model } from './model';

export default class Command {
    constructor(vnode) {
        this.action = vnode.attrs.action || function () { };
        this.children = vnode.children;
        this.class = 'btn border ' + (vnode.attrs.class || '');
        vnode.key = vnode.attrs.key || +new Date();
    }

    view() {
        return <button class={this.class} onclick={e => this.do(e)}> {this.children}</button >;
    }

    do(e) {
        e.preventDefault();
        model.do(this.action);
    }
}