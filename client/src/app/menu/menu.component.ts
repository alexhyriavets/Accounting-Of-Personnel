import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { AddEmployeeComponent } from './../shared/add-employee/add-employee.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.sass']
})
export class MenuComponent implements OnInit {

  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

}
