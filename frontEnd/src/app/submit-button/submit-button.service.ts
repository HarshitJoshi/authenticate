import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { routerNgProbeToken } from '@angular/router/src/router_module';

@Injectable()

export class SubmitButtonService {
  uri = 'http://localhost:3000';

  constructor(private http: HttpClient) {};

  login(username, password) {
    return this.http.post(`${this.uri}/login`, {username, password});
  }
}