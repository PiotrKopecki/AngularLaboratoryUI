import { Company } from "./company";
import { DriverCompany } from "./driver-company";

export interface Driver {
    id?: number,
    name: string,
    age: number,
    company: DriverCompany
}