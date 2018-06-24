import m from 'mithril';
window.m = m;

import MainLayout from './MainLayout';
import { model } from './model';
import scenes from './scenes';
model.registerScenes(scenes);

let getUpAction = {
    name: 'get up',
    description: 'Get up',
    do: model => {
        model.changeScene("GreyRoom");
    }
};

model.registerAction(getUpAction);
model.sendMessage("You wake up, your vision is blurry. You're on your back, on what appears to be an underground room, with no memory of how you got here.");

m.mount(document.getElementById('root'), MainLayout);