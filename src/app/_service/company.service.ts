import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { AddEditCompany } from '../_model/add-edit-company';
import { Company } from '../_model/company';
import { Driver } from '../_model/driver';

@Injectable({
  providedIn: 'root'
})
export class CompanyService {

  private backend = environment.backend;

  constructor(private http: HttpClient) { }

  getCompanies(): Observable<Array<Company>> {
    return this.http.get<Array<Company>>(`${this.backend}/companies/get-all`);
  }

  getCompanyIdByName(name: string): Observable<number> {
    return this.http.get<number>(`${this.backend}/companies/name/${name}/get-id`);
  }

  deleteCompanyByName(name: string) {
    return this.http.delete(`${this.backend}/companies/name/${name}`).subscribe();
  }

  addCompany(companyDto: AddEditCompany) {
    return this.http.post(`${this.backend}/companies`, companyDto);
  }

  editCompany(id: number, companyDto: AddEditCompany) {
    const params = new HttpParams()
      .set('newName', companyDto.name)
      .set('numberOfTrucks', companyDto.numberOfTrucks)
    return this.http.put(`${this.backend}/companies/update/${id}`, params);
  }
}