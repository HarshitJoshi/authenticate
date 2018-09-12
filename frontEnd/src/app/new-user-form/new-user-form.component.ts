import {Component} from '@angular/core';

@Component({
  selector: 'app-new-user-form',
  templateUrl: './new-user-form.component.html',
  styleUrls: ['./new-user-form.component.css']
})
export class NewUserFormComponent{
  user = {
    firstname: '',
    lastname: '',
    username: '',
    passkey: ''
  };

  model=this.user;
}
