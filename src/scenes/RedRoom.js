import Scene from '../entities/Scene';
import Command from '../Command';

export const RedRoom = new Scene({
    "name": "RedRoom",
    "description": "You are in a room with <b class=\"text-red\">red</b> walls.",
    "items": [
        {
            "name": "table",
            "description": "A simple table, propped against a wall"
        },
        {
            "name": "chair",
            "description": "A wooden chair",
            "action": model => {
                model.sendMessage("You... sit")
            }
        },
        {
            "name": "portrait",
            "description": "A portrait of a woman, smiling knowingly",
            break: model => {
                model.sendMessage('Now, why would you want to do that?');
            },
            "action": model => {
                model.sendMessage("You move the portrait. Behind the portrait, in a hole in the wall, there is a hammer.");

                let hammerItem = {
                    name: "hammer",
                    description: "A hammer",
                    action: model => {
                        model.sendMessage("You have a hammer");
                        model.user.items.push({ name: "hammer" });

                        model.user.actions.push({
                            name: "use hammer",
                            description: "use the hammer",
                            do: model => {
                                if (!model.currentScene.items || model.currentScene.items.length == 0)
                                    model.sendMessage('You swing your hammer around');
                                else {
                                    let message = <span>What do you want to use your hammer on?</span>;

                                    let messages = model.currentScene.items.map(item => {

                                        let action = {
                                            do: model => {

                                                if (item.break)
                                                    item.break(model);
                                                else {
                                                    model.sendMessage(item.name + " is destroyed to little pieces");
                                                    model.currentScene.items = model.currentScene.items.filter(i => i.name != item.name);
                                                    model.unregisterAction(item.name);
                                                }

                                                model.removeCommandMessages();
                                            },
                                            description: "use on " + item.name
                                        };

                                        return <Command action={action}>{action.description}</Command>;
                                    });

                                    messages.unshift(<br />);
                                    messages.unshift(message);

                                    model.sendCommandMessage(messages);
                                }
                            }
                        })

                        RedRoom.items = RedRoom.items.filter(i => i.name != "hammer");
                        model.unregisterAction('hammer');
                    }
                };

                RedRoom.items.push(hammerItem);

                let portraitItem = RedRoom.items.find(item => item.name == 'portrait');

                portraitItem.description = "A portrait of a smiling woman, out of place";
                portraitItem.action = null;
                portraitItem.noAction = true;

                model.unregisterAction('portrait');

                model.registerAction({
                    name: hammerItem.name,
                    description: "hammer",
                    do: hammerItem.action
                });
            }
        }
    ],
    "exits": [
        {
            "description": "There is a <b class=\"text-grey\">grey</b> door to your left",
            "scene": "GreyRoom",
            "action": {
                "name": "goLeft",
                "style": "text-grey",
                "description": "Go through the grey door"
            }
        },
        {
            "description": "There is a <b class=\"text-blue\">blue</b> door to your right",
            "scene": "BlueRoom",
            "action": {
                "name": "goRight",
                "style": "text-blue",
                "description": "Go through the blue door"
            }
        }
    ]
});
