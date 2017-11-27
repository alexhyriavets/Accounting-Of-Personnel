import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class EmployeeService {

  constructor(private apiService: ApiService) { }

  getUsers(): Observable<any> {
    return this.apiService.get('/login');
  }

}
