import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  apiUrl:"http://finalmohamed-001-site1.itempurl.com/api"
  type
  userPrfile
  notifications=[]
  dark=false
  constructor(private http:HttpClient) { }
  signup(body,TypeOfUser) {
    return this.http.post(`http://finalmohamed-001-site1.itempurl.com/api/${TypeOfUser}/Insert`,body)
  }
  signin(body) {
    return this.http.post(`${this.apiUrl}/LogInInsert`,body)
  }
}
