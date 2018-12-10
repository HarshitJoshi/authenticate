import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Injectable()

export class NewUserFormService {
  uri = 'http://localhost:3000';

  constructor(private http: HttpClient) {};

  register({username, password, email, firstname, lastname}) {
    return this.http.post(`${this.uri}/register`, {username, password, email, firstname, lastname});
  }
}