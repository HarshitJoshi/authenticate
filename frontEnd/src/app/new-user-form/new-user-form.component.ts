import {Component} from '@angular/core';
import { NewUserFormService} from './new-user-form.service';

@Component({
  selector: 'app-new-user-form',
  templateUrl: './new-user-form.component.html',
  styleUrls: ['./new-user-form.component.css'], 
  providers: [NewUserFormService],
})

export class NewUserFormComponent{
    model= {
      firstname: '',
      lastname: '',
      email: '',
      username: '',
      password: '',
    }

  constructor (private newUserFormService: NewUserFormService) {};

  register() {
    this.newUserFormService.register(this.model).subscribe(console.log);
  }
}
