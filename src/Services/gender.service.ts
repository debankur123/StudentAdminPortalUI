import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Gender } from 'src/app/Models/Api-Models/gender.model';

@Injectable({
  providedIn: 'root'
})
export class GenderService {

  private baseUrl = 'https://localhost:44342';

  constructor(private httpClient : HttpClient) { }

  getGenderList():Observable<Gender[]>{
    return this.httpClient.get<Gender[]>(this.baseUrl + '/gender')
  }

}
