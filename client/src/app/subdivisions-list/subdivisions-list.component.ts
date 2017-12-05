import { Component, OnInit } from '@angular/core';

import { SubdivisionService } from './../shared/subdivision.service';

@Component({
  selector: 'app-subdivisions-list',
  templateUrl: './subdivisions-list.component.html',
  styleUrls: ['./subdivisions-list.component.sass']
})
export class SubdivisionsListComponent implements OnInit {
  subdivisions: any;
  displayedRows = ['#', 'Name'];
  searchText: any;

  constructor(private subdivisionService: SubdivisionService) { }

  ngOnInit() {
    this.getSubdivisions();
  }

  getSubdivisions(): void {
    this.subdivisionService.getAllSubdivisions()
      .subscribe(sub => this.subdivisions = sub);
  }

}
