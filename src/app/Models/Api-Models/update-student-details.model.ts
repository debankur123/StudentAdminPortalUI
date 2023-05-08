import { Address } from "./address.model";

export interface UpdateStudentDetails{
    id : number;
    FirstName : string;
    LastName : string;
    DOB : string;
    Email : string;
    Mobile : number;
    GenderID : string;
    address : Address
    postalAddress : string;
    physicalAddress : string;
}