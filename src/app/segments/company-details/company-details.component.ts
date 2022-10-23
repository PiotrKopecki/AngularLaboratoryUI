import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Company } from 'src/app/_model/company';
import { Driver } from 'src/app/_model/driver';
import { CompanyService } from 'src/app/_service/company.service';
import { DriverService } from 'src/app/_service/driver.service';

@Component({
  selector: 'app-company-details',
  templateUrl: './company-details.component.html',
  styleUrls: ['./company-details.component.scss']
})
export class CompanyDetailsComponent implements OnInit {

  companiesColumns: string[] = ['name', 'numberOfTrucks'];
  membersColumns: string[] = ['id', 'name', 'age'];
  currentCompany: string = '';
  companiesList = new MatTableDataSource();
  dataSource = new MatTableDataSource();

  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  
  constructor(
    private companyService: CompanyService,
    private driverService: DriverService,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.dataSource.sort = this.sort;
    this.getCompanies();
    this.activatedRoute.params.subscribe(param => {
      this.getDrivers(param["name"]);
    })
  }

  getCompanies() {
    this.companyService.getCompanies().subscribe(
      (response: Array<Company>) => {
        this.companiesList.data = response;
      }
    )
  }

  getDrivers(name: string){
    this.currentCompany = name;
    this.driverService.getDriversForCompany(this.currentCompany).subscribe(
      (response: Array<Driver>) => {
        this.dataSource.data = response;
      }
    )
  }

  deleteDriver(name: string){
    this.driverService.deleteDriverByName(name);
    window.location.reload();
  }
}
