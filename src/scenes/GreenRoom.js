import Scene from '../entities/Scene';

let rock = {
    name: "rock",
    description: "A large rock",
    damage: 0,
    break: model => {

        rock.damage++;

        switch (rock.damage) {
            case 1:
                model.sendMessage("You hit the rock with your hammer. A little crack appeared on the top of the big rock");
                break;
            case 2:
            case 3:
            case 4:
                model.sendMessage("You hit the rock with your hammer. The crack on the rock gets bigger");
                break;
            case 5:
                model.sendMessage("You hit the rock with your hammer. The rock shatters into a million little pieces. There was a key underneath it!");
                GreenRoom.items = GreenRoom.items.filter(item => item.name != "rock");

                let keyItem = {
                    name: "key",
                    description: "A small golden key",
                    break: model => {
                        model.sendMessage('The key bounces around the room making metallic noises. It appears undamaged.');
                    },
                    action: model => {
                        model.sendMessage("You have a key");
                        model.user.items.push({ name: "key" });
                        GreenRoom.items = GreenRoom.items.filter(item => item.name != 'key');
                        model.unregisterAction('key');
                    }
                };

                GreenRoom.items.push(keyItem);
                model.unregisterAction('rock');

                model.registerAction({
                    name: keyItem.name,
                    description: keyItem.description,
                    do: keyItem.action
                });

                break;
        }
    },
    action: model => {
        model.sendMessage('It\'s... a rock');
    }
};

export const GreenRoom = new Scene({
    "name": "GreenRoom",
    "description": "You are in a room with <b class=\"text-green\">green</b> walls.",
    items: [rock],
    "exits": [
        {
            "description": "There is a <b class=\"text-blue\">blue</b> door to your left",
            "scene": "BlueRoom",
            "action": {
                "name": "goLeft",
                "style": "text-blue",
                "description": "Go through the blue door"
            }
        },
        {
            "description": "There is a <b class=\"text-grey\">grey</b> door to your right",
            "scene": "GreyRoom",
            "action": {
                "name": "goRight",
                "style": "text-grey",
                "description": "Go through the grey door"
            }
        }
    ]
});