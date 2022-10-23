import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Driver } from 'src/app/_model/driver';
import { DriverService } from 'src/app/_service/driver.service';
import { RouterNavigation } from 'src/app/_service/router-navigation.service';
import { AddDriverComponent } from '../add-driver/add-driver.component';

@Component({
  selector: 'app-driver',
  templateUrl: './driver.component.html',
  styleUrls: ['./driver.component.scss']
})
export class DriverComponent implements OnInit {

  displayedColumns: string[] = ['name', 'age', 'companyName'];
  dataSource!: MatTableDataSource<Driver>;
  
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  
  constructor(
    private driverService: DriverService,
    private routerNavigation: RouterNavigation,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.dataSource! = new MatTableDataSource();
    this.dataSource.sort = this.sort;
    this.getDrivers();
  }

  getDrivers() {
    this.driverService.getDrivers().subscribe(
      (response: Array<Driver>) => {
        this.dataSource.data = response;
      }
    )
  }

  redirectToDriverDetails(name: string){
    this.routerNavigation.openDriverDetailsPage(name);
  }

  deleteDriver(name: string){
    this.driverService.deleteDriverByName(name);
    window.location.reload();
  }

  addDriver(){
    const dialogRef = this.dialog.open(AddDriverComponent);
    dialogRef.afterClosed().subscribe((result: any) => {
      if(result.name == null){
        return;
      }
      let driver: Driver = {
        "age":result.age,
        "name":result.name,
        "company":{
          "name":result.companyName,
          "newName":result.companyName
        }
      };
      this.driverService.addDriver(driver).subscribe((result2) => window.location.reload());
    })
  }

  editDriver(name: string, age: number, companyName: string){
    const dialogRef = this.dialog.open(AddDriverComponent, {
      data: {
        n: name,
        num: age,
        com: companyName
      }
    });
    dialogRef.afterClosed().subscribe((result: Driver) => {
      if(result == null || result.name == null){
        return;
      }
      this.driverService.getDriverIdByName(name).subscribe((result2: number) => {
        this.driverService.editDriver(result2, result).subscribe((result3) => window.location.reload())
      })
    })
  }
}
