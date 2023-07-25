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
  styleUrls: ['./view-student.component.css'],
})
export class ViewStudentComponent implements OnInit {
  studentId: string | null | undefined;
  student: Student = {
    id: 0,
    firstName: '',
    lastName: '',
    dob: '',
    email: '',
    mobile: '',
    genderID: '',
    profileImageURL: '',
    gender: {
      id: '',
      description: '',
    },
    address: {
      id: '',
      physicalAddress: '',
      postalAddress: '',
    },
  };
  isNewStudent = false;
  header = '';
  displayProfileImageURL = '';
  genderList: Gender[] = [];

  constructor(
    private readonly studentService: StudentService,
    private readonly route: ActivatedRoute,
    private readonly genderservice: GenderService,
    private snackbar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe((response) => {
      this.studentId = response.get('id');
      if (this.studentId) {
        if (this.studentId.toLowerCase() === 'Add'.toLowerCase()) {
          // Add new Student Functionality
          this.isNewStudent = true;
          this.header = 'Add New Student';
          this.SetImage();
        } else {
          // -> Existing Student Functionality
          this.isNewStudent = false;
          this.header = 'Edit Student';
          this.studentService.getStudentById(this.studentId).subscribe(
            (success) => {
              this.student = success;
              this.SetImage();
            },
            (error) => {
              this.SetImage();
            }
          );
        }
        this.genderservice.getGenderList().subscribe((response) => {
          this.genderList = response;
        });
      }
    });
  }

  onUpdate(): void {
    this.studentService
      .updateStudentDetails(this.student.id.toString(), this.student)
      .subscribe(
        (updatedStudent) => {
          this.snackbar.open('Student updated successfully', undefined, {
            duration: 3000,
          });
          setTimeout(() => {
            this.router.navigateByUrl('/students');
          }, 2000);
        },
        (err) => {
          console.log(err);
        }
      );
  }

  onDelete(): void {
    this.studentService
      .deleteStudentRecord(this.student.id.toString())
      .subscribe(
        (response) => {
          this.snackbar.open('Student deleted successfully', undefined, {
            duration: 2000,
          });
          setTimeout(() => {
            this.router.navigateByUrl('/students');
          }, 2000);
        },
        (error) => {
          console.log(error);
        }
      );
  }
  onAdd(): void {
    this.studentService.addStudentDetails(this.student).subscribe(
      (response) => {
        this.snackbar
          .open('Record added successfully', undefined, {
            duration: 2000,
          })
          .afterDismissed()
          .subscribe(() => {
            this.router.navigateByUrl('/students');
          });
      },
      (err) => {
        console.log(err);
      }
    );
  }

  uploadImage(event: any): void {
    if (this.student) {
      const file = event.target.files[0];
      this.studentService
        .uploadImage(this.student.id.toString(), file)
        .subscribe(
          (success) => {
            this.student.profileImageURL = success;
            this.SetImage();

            this.snackbar.open('Image uploaded Successfully', undefined, {
              duration: 2000,
            });
          },
          (error) => {
            console.log(error);
          }
        );
    }
  }

  private SetImage(): void {
    if (this.student.profileImageURL) {
      //Fetch the URL
      this.displayProfileImageURL = this.studentService.getImagePath(this.student.profileImageURL) ;
    } else {
      //display default profile image
      this.displayProfileImageURL = '/assets/Profile_Avatar.jpg';
    }
  }
}
