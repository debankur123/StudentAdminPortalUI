import { Address } from "./address.model";

export interface UpdateStudentDetails{
    id : number;
    FirstName : string;
    LastName : string;
    DOB : string;
    Email : string;
    Mobile : string;
    GenderID : string;
    address : Address
    postalAddress : string;
    physicalAddress : string;
}