import {Component} from '@angular/core';
import {SubmitButtonService} from './submit-button.service';

@Component ({
    selector: 'submit-button',
    styleUrls: ['../button-sign-in/button-sign-in.component.css'],
    template: `
        <div class='keyIn' (click)='loadUser()'>
            <div class='textAlignCenter'>key in</div>
        </div>
    `,
    providers: [SubmitButtonService],
})

export class SubmitButton {

}