import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { AddStudentRequestModel } from 'src/app/Models/Api-Models/add-student-request-model';
import { Student } from 'src/app/Models/Api-Models/students.model';
import { UpdateStudentDetails } from 'src/app/Models/Api-Models/update-student-details.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private baseUrl = 'https://localhost:44342';

  constructor(private httpClient: HttpClient) {}

  getAllStudents(): Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.baseUrl + '/students');
  }
  getStudentById(studentId: string): Observable<Student> {
    return this.httpClient.get<Student>(
      this.baseUrl + '/students/' + studentId
    );
  }
  updateStudentDetails(
    studentId: string,
    studentRequest: Student
  ): Observable<Student> {
    const updateStudentDetails: UpdateStudentDetails = {
      id: studentRequest.id,
      FirstName: studentRequest.firstName,
      LastName: studentRequest.lastName,
      DOB: studentRequest.dob,
      Email: studentRequest.email,
      Mobile: studentRequest.mobile.toString(),
      GenderID: studentRequest.genderID.toString(),
      address: studentRequest.address,
      physicalAddress: studentRequest.address.physicalAddress,
      postalAddress: studentRequest.address.postalAddress,
    };
    return this.httpClient.put<Student>(
      `${this.baseUrl}/students/${studentId}`,
      updateStudentDetails
    );
  }

  deleteStudentRecord(studentId: string): Observable<void> {
    return this.httpClient.delete<void>(
      this.baseUrl + '/students/' + studentId
    );
  }

  addStudentDetails(studentRequest: Student): Observable<Student> {
    const addStudentRequest: AddStudentRequestModel = {
      FirstName: studentRequest.firstName,
      LastName: studentRequest.lastName,
      DOB: studentRequest.dob,
      Email: studentRequest.email,
      Mobile: studentRequest.mobile.toString(),
      GenderID: studentRequest.genderID,
      ProfileImageURL: studentRequest.profileImageURL,
      Address: {
        postalAddress: studentRequest.address.postalAddress,
        physicalAddress: studentRequest.address.physicalAddress,
      },
    };
    return this.httpClient.post<Student>(
      this.baseUrl + '/students/add',
      addStudentRequest
    );
  }

  uploadImage(studentId: string, file: File) {
    const formData = new FormData();
    formData.append('profileImage', file);

    return this.httpClient.post(
      this.baseUrl + '/students/' + studentId + '/upload-image',
      formData,
      {
        responseType: 'text',
      }
    );
  }

  getImagePath(path : string){
    return `${this.baseUrl}/${path}`;
  }
}
