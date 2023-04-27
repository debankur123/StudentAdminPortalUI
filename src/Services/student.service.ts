import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Student } from 'src/app/Models/Api-Models/students.model';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private baseUrl = 'https://localhost:44342';

  constructor(private httpClient : HttpClient) { }

  getAllStudents() : Observable<Student[]> {
    return this.httpClient.get<Student[]>(this.baseUrl + '/students');
  }
  getStudentById(studentId : string) : Observable<Student> {
    return this.httpClient.get<Student>(this.baseUrl + '/students/' + studentId)
  }
}
