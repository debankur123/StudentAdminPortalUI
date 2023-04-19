import { Component, OnInit, ViewChild } from '@angular/core';
import { StudentService } from 'src/Services/student.service';
import { Student } from '../Models/UI-Models/student.model';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  students : Student[] = [];
  displayedColumns : string[] = ['firstName','lastName','dob','email','mobile','gender'];
  dataSource : MatTableDataSource<Student> = new MatTableDataSource<Student>();
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  filterString = '';
  constructor(private studentService : StudentService) { }

  ngOnInit(): void {
    //Fetch students details
    this.studentService.getAllStudents()
    .subscribe(
      (response) =>{
        this.students = response;
        this.dataSource = new MatTableDataSource<Student>(this.students);
        if(this.paginator){
          this.dataSource.paginator = this.paginator;
        }
        if(this.sort){
          this.dataSource.sort = this.sort;
        }
      },
      (error) => {
        console.log(error);
      }
    )
  }
  filterStudents(){
    this.dataSource.filter = this.filterString.trim().toLowerCase();
  }

}
