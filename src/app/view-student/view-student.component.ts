import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from 'src/Services/student.service';
import { Student } from '../Models/UI-Models/student.model';
import { GenderService } from 'src/Services/gender.service';
import { Gender } from '../Models/UI-Models/gender.model';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-view-student',
  templateUrl: './view-student.component.html',
  styleUrls: ['./view-student.component.css']
})
export class ViewStudentComponent implements OnInit {
  studentId : string | null | undefined;
  student : Student = {
    id: 0,
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
  genderList : Gender[] = [];

  constructor(private readonly studentService : StudentService,
      private readonly route : ActivatedRoute,
      private readonly genderservice : GenderService,
      private snackbar : MatSnackBar,
      private router : Router
    ) { }

  ngOnInit(): void {
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
          this.genderservice.getGenderList()
          .subscribe(
            (response) => {
              this.genderList = response;
            }
          )
        }
      }
    ); 
  }

  onUpdate(): void {
    this.studentService.updateStudentDetails(this.student.id.toString(), this.student).subscribe(
      (updatedStudent) => {
        this.snackbar.open('Student updated successfully',undefined,{
          duration : 3000
        });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onDelete() : void{
    this.studentService.deleteStudentRecord(this.student.id.toString())
      .subscribe(
        (response) => {
          this.snackbar.open('Student deleted successfully',undefined,{
            duration : 2000
          })
          setTimeout(()=>{
            this.router.navigateByUrl('/students');
          },2000);
        },
        (error) =>{
          console.log(error);
        }
      )
  }
}
