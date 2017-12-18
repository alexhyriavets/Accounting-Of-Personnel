import { Component, OnInit } from '@angular/core';

import { SubdivisionService } from './../shared/subdivision.service';
import { ExcelService } from '../shared/excel.service';

@Component({
  selector: 'app-staffing',
  templateUrl: './staffing.component.html',
  styleUrls: ['./staffing.component.sass']
})
export class StaffingComponent implements OnInit {
  subdivisions: any;
  displayedRows = ['#', 'Subdivision', 'Count of Employees', 'Total Salary'];
  searchText: any;

  constructor(private subdivisionService: SubdivisionService, private excelService: ExcelService) { }

  ngOnInit() {
    this.getSubdivisions();
  }

  getSubdivisions(): void {
    this.subdivisionService.getAllSubdivisions()
      .subscribe(sub => this.subdivisions = sub);
  }

  exportToExcel(): void {
    this.excelService.exportAsExcelFile(this.subdivisions, 'staffing');
  }

}
