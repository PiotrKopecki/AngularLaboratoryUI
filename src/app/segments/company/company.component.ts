import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { AddEditCompany } from 'src/app/_model/add-edit-company';
import { Company } from 'src/app/_model/company';
import { CompanyService } from 'src/app/_service/company.service';
import { RouterNavigation } from 'src/app/_service/router-navigation.service';
import { SnackBarService } from 'src/app/_service/snackbar.service';
import { AddCompanyComponent } from '../add-company/add-company.component';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrls: ['./company.component.scss']
})
export class CompanyComponent implements OnInit {

  displayedColumns: string[] = ['name', 'numberOfTrucks'];
  dataSource!: MatTableDataSource<Company>;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  
  constructor(
    private companyService: CompanyService,
    private routerNavigation: RouterNavigation,
    private dialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.dataSource! = new MatTableDataSource();
    this.dataSource.sort = this.sort;
    this.getCompanies();
  }

  getCompanies() {
    this.companyService.getCompanies().subscribe(
      (response: Array<Company>) => {
        this.dataSource.data = response
      }
    )
  }

  redirectToCompanyDetails(name: string){
    this.routerNavigation.openCompanyDetailsPage(name);
  }

  deleteCompany(name: string){
    this.companyService.deleteCompanyByName(name);
    window.location.reload();
  }

  addCompany(){
    const dialogRef = this.dialog.open(AddCompanyComponent);
    dialogRef.afterClosed().subscribe((result: AddEditCompany) => {
        if(result.name == null){
          return;
        }
        let companyDto = result;
        companyDto.drivers = [];
        this.companyService.addCompany(companyDto).subscribe(result => window.location.reload());
    })
  }

  editCompany(name: string, numberOfTrucks: number){
    const dialogRef = this.dialog.open(AddCompanyComponent, {
      data: {
        n: name,
        num: numberOfTrucks
      }
    });
    dialogRef.afterClosed().subscribe((result: AddEditCompany) => {
      let companyDto = result;
      companyDto.drivers = [];
      this.companyService.getCompanyIdByName(name).subscribe((result: number) => {
        console.log(result)
        this.companyService.editCompany(result, companyDto).subscribe(result2 => window.location.reload());
      });
    })
  }
}
