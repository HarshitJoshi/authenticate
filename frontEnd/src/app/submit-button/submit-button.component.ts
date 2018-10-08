import {Component} from '@angular/core';
import {SubmitButtonService} from './submit-button.service';

@Component ({
    selector: 'submit-button',
    styleUrls: ['../button-sign-in/button-sign-in.component.css'],
    template: `
        <div class='keyIn' (click)='login()'>
            <div class='textAlignCenter'>key in</div>
        </div>
    `,
    providers: [SubmitButtonService],
})

export class SubmitButton {
  username='username';
  password='password';
  constructor (private submitButtonService: SubmitButtonService) {};
  login() {
    this.submitButtonService.login(this.username, this.password).subscribe(console.log);
  }
}