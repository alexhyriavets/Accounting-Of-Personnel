import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SubdivisionService {

    constructor(private apiService: ApiService) { }

    getAllSubdivisions(): Observable<any> {
        return this.apiService.get('/get_subdivisionsName');
    }
}
