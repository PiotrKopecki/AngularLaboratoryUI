import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/_model/company';
import { Driver } from 'src/app/_model/driver';
import { CompanyService } from 'src/app/_service/company.service';
import { DriverService } from 'src/app/_service/driver.service';

@Component({
  selector: 'app-driver-details',
  templateUrl: './driver-details.component.html',
  styleUrls: ['./driver-details.component.scss']
})
export class DriverDetailsComponent implements OnInit {

  driversColumns: string[] = ['name', 'age'];
  companiesColumns: string[] = ['name'];
  currentDriver: '';
  currentCompanyName = '';
  driversList = new MatTableDataSource();
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  
  constructor(
    private companyService: CompanyService,
    private driverService: DriverService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.currentDriver = param["name"]
    })
    this.dataSource.sort = this.sort;
    this.getDrivers();
    this.getCompanies();
  }

  getCompanies() {
    this.dataSource.data = Array.of(this.currentCompanyName);
  }

  getDrivers(){
    this.driverService.getDrivers().subscribe(
      (response: Array<Driver>) => {
        this.driversList.data = response;
        response.forEach(driver => {
          if(driver.name == this.currentDriver){
            this.currentCompanyName = driver.company.newName;
          }
        })
      }
    )
  }

}
