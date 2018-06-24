import Scene from '../entities/Scene';

let fly = {
    name: "fly",
    description: "There is a fly buzzing around.",
    break: model => {
        if (model.user.hasItem('hammer')) {
            let chance = model.throwDice(8, 1);

            if (chance == 8) {
                model.sendMessage('Somehow, you managed to hit the fly with the hammer! It lays dead on the floor.');
                fly.action = model => model.sendMessage('It does not make you dizzy anymore.');
                fly.break = null;
            } else
                model.sendMessage('You swing your hammer around');

        } else {
            model.sendMessage('You swat at the fly hopelessly');
        }
    },
    action: model => {
        model.sendMessage('Watching the fly makes you feel dizzy');
    }
};

export const BlueRoom = new Scene({
    "name": "BlueRoom",
    "description": "You are in a room with <b class=\"text-blue\">blue</b> walls.",
    items: [fly],
    "exits": [
        {
            "description": "There is a <b class=\"text-red\">red</b> door to your left",
            "scene": "RedRoom",
            "action": {
                "name": "goLeft",
                "style": "text-red",
                "description": "Go through the red door"
            }
        },
        {
            "description": "There is a <b class=\"text-green\">green</b> door to your right",
            "scene": "GreenRoom",
            "action": {
                "name": "goRight",
                "style": "text-green",
                "description": "Go through the green door"
            }
        }
    ]
});
