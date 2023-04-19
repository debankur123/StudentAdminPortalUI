import { Address } from "./address.model";
import { Gender } from "./gender.model";

export interface Student{
    id : string;
    firstName : string;
    lastName : string;
    dob : string;
    email : string;
    mobile : string;
    profileImageURL : string;
    genderID : string;
    gender : Gender;
    address : Address;
}