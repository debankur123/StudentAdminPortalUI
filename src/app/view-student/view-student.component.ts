import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from 'src/Services/student.service';
import { Student } from '../Models/UI-Models/student.model';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  studentId : string | null | undefined;
  student : Student = {
    id: '',
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    mobile: 0,
    genderID: '',
    profileImageURL: '',
    gender :{
      id : '',
      description : ''
    },
    address : {
      id : '',
      physicalAddress : '',
      postalAddress : '',
    }
  }
  constructor(private readonly studentService : StudentService,
      private readonly route : ActivatedRoute
    ) { }

  ngOnInit(): void {
    //debugger
    this.route.paramMap.subscribe(
      (response)=>{
        this.studentId = response.get('id');
        if(this.studentId){
          this.studentService.getStudentById(this.studentId)
          .subscribe(
            (success)=>{
              this.student = success;
            }
          )
        }
      }
    ); 
  }
}
