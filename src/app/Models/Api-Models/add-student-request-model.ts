import { Address } from "./address.model";
import { Gender } from "./gender.model";

export interface AddStudentRequestModel {
    FirstName : string;
    LastName : string;
    DOB : string;
    Email : string;
    Mobile : string;
    GenderID : string;
    ProfileImageURL : string;
    Address : {
        postalAddress : string,
        physicalAddress : string
    }

}
