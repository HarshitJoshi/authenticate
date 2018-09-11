import {Component} from '@angular/core';
import {SubmitButtonService} from './SubmitButton.service';

@Component ({
    selector: 'submit-button',
    styleUrls: ['./app.component.css'],
    template: `
        <div class='keyIn' (click)='loadUser()'>
            <div class='textAlignCenter'>key in</div>
        </div>
    `,
    providers: [SubmitButtonService],
})

export class SubmitButton {

}