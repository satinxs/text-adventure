import Scene from '../entities/Scene';

export const GreyRoom = new Scene({
    "name": "GreyRoom",
    "description": "You are in a simple room, <b class=\"text-grey\">grey</b> walls.",
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
            "description": "There is an old, <b class=\"text-brown\">rusty</b> door in front of you",
            "scene": "ExitRoom",
            "action": {
                "name": "exit",
                "style": "text-brown",
                "description": "Go through the rusty door",
                "do": model => {
                    if (model.user.hasItem('key'))
                        model.changeScene('ExitRoom');
                    else
                        model.sendMessage('The <b class="text-brown">door</b> won\'t open');
                }
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
