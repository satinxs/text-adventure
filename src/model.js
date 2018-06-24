import Dice from './entities/Dice';
import Message from './entities/Message';
import User from './entities/User';

const Utilities = {
    dice: new Dice(),
    $(selector) {
        let result = document.querySelectorAll(selector);

        if (!result || result.length == 0)
            return null;

        if (result.length == 1)
            return result[0];
        else
            return result;
    },
    scrollTop(selector) {
        let obj = document.querySelector(selector);

        if (obj)
            obj.scrollTop = 0;
    },
    throwDice(faces, times) {
        faces = faces || 6;
        times = times || 1;

        return Utilities.dice.throwDice(faces, times);
    }
};

window.Utilities = Utilities;

export const model = {
    messages: [],
    actions: [],
    scenes: [],

    user: new User(),

    throwDice(faces, times) {
        return Utilities.throwDice(faces, times);
    },

    registerScenes(scenes) {
        model.scenes = scenes;
    },

    registerAction(action) {
        model.actions.push(action);
    },

    unregisterAction(actionName) {
        model.actions = model.actions.filter(a => a.name != actionName);
    },

    do(action) {
        action.do(model);
    },

    clearActions() {
        model.actions = [];
    },

    changeScene(sceneName) {
        let scene = model.scenes.find(s => s.name === sceneName);

        model.currentScene = scene;

        model.clearActions();

        let description = scene.description + "<br/>&rarr; ";

        if (scene.exits && scene.exits.length > 0) {
            for (let exit of scene.exits) {

                if (!exit.action.do)
                    exit.action.do = () => model.changeScene(exit.scene);

                model.registerAction(exit.action);
                description += exit.description + ". ";
            }
        }

        if (scene.items && scene.items.length > 0) {

            let itemsDescription = "";

            for (let item of scene.items) {

                let action = {
                    name: item.name,
                    description: item.name,
                };

                if (!item.action)
                    action.do = () => model.sendMessage("There's nothing you can do with this.");
                else
                    action.do = item.action;

                if (!item.noAction)
                    model.registerAction(action);

                itemsDescription += item.description + ". ";
            }

            description += "<hr/>There are some items: " + itemsDescription;
        }

        model.sendMessage(description);
    },

    sendMessage(msg) {
        let message = <Message value={msg} date={new Date()} />;

        model.messages.unshift(message);

        Utilities.scrollTop('.messages ul');
    },

    sendCommandMessage(msg) {
        let message = <Message inline={true} value={msg} date={new Date()} />;

        model.messages.unshift(message);

        Utilities.scrollTop('.messages ul');
    },

    removeCommandMessages() {
        model.messages = model.messages.filter(msg => !msg.attrs.inline);
    }
};