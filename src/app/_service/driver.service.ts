import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';
import { Driver } from '../_model/driver';

@Injectable({
  providedIn: 'root'
})
export class DriverService {

  private backend = environment.backend;

  constructor(private http: HttpClient) { }

  getDrivers(): Observable<Array<Driver>> {
    return this.http.get<Array<Driver>>(`${this.backend}/drivers/get-all`);
  }

  getDriversForCompany(name: string): Observable<Array<Driver>> {
    return this.http.get<Array<Driver>>(`${this.backend}/drivers/get-all/${name}`);
  }

  deleteDriverByName(name: string) {
    return this.http.delete(`${this.backend}/drivers/name/${name}`).subscribe();
  }

  addDriver(driverDto: Driver) {
    return this.http.post(`${this.backend}/drivers`, driverDto);
  }

  editDriver(id: number, driverDto: Driver) {
    const params = new HttpParams()
      .set('newName', driverDto.name)
      .set('newAge', driverDto.age)
    return this.http.put(`${this.backend}/drivers/update/${id}`, params);
  }

  getDriverIdByName(name: string): Observable<number> {
    return this.http.get<number>(`${this.backend}/drivers/name/${name}/get-id`);
  }
}