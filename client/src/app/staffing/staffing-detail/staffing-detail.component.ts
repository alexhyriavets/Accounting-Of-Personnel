import { Component, OnInit } from '@angular/core';

import { SubdivisionService } from './../../shared/subdivision.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ExcelService } from '../../shared/excel.service';

@Component({
  selector: 'app-staffing-detail',
  templateUrl: './staffing-detail.component.html',
  styleUrls: ['./staffing-detail.component.sass']
})
export class StaffingDetailComponent implements OnInit {
  staffing: any;
  displayedRows = ['Position', 'Count'];
  id = +this.route.snapshot.paramMap.get('id');

  constructor(
    private subdivisionService: SubdivisionService,
    private route: ActivatedRoute,
    private location: Location,
    private excelService: ExcelService
  ) { }

  ngOnInit() {
    this.getStaffing();
  }

  getStaffing(): void {
    this.subdivisionService.getStaffing(this.id)
      .subscribe(item => this.staffing = item);
  }

  exportToExcel(): void {
    this.excelService.exportAsExcelFile([this.staffing], 'staffing');
  }

}
