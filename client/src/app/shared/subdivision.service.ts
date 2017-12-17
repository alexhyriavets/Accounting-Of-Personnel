import { Injectable } from '@angular/core';

import { ApiService } from './api.service';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SubdivisionService {

    constructor(private apiService: ApiService) { }

    getAllSubdivisions(): Observable<any> {
        return this.apiService.get('/get_subdivisionsName');
    }

    getStaffing(subdivision): Observable<any>  {
        return this.apiService.post('/get_staffing', { subdivision: subdivision });
    }

    getPositionDetail(subId, posCode): Observable<any> {
        return this.apiService.post('/get_posDet', { subId: subId, posCode: posCode });
    }
}
