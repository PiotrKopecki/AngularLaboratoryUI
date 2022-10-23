import { Router } from '@angular/router';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
})

export class RouterNavigation {

    constructor(private router: Router) { }

    openHomePage() {
        this.router.navigate(['/home']);
    }
    openLoginPage() {
        this.router.navigate(['/login']);
    }
    openDriversPage() {
        this.router.navigate(['/drivers']);
    }
    openCompaniesPage() {
        this.router.navigate(['/companies']);
    }
    openCompanyDetailsPage(name:string) {
        this.router.navigate(['/companies/' + name]);
    }
    openDriverDetailsPage(name:string) {
        this.router.navigate(['/drivers/' + name]);
    }
}