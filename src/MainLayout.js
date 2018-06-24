import Command from './Command';
import { model } from './model';

export default {
    view: () => {
        return <div>
            <div class="actions bar padding center ">
                {model.user.actions.map(action => <Command action={action} class={action.style}>{action.description}</Command>)}
            </div>
            <div class="messages">
                <ul class="ul">
                    {model.messages.map(msg => <li key={msg.key}>{msg}</li>)}
                </ul>
            </div>
            <div class="actions bar padding center ">
                {model.actions.map(action => <Command action={action} class={action.style}>{action.description}</Command>)}
            </div>
        </div>;
    }
};