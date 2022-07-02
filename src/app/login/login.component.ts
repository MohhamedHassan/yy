import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm:FormGroup
  constructor(private fb:FormBuilder,
    private authService:AuthService,
    private router:Router,
    private http:HttpClient) { }


    ngOnInit(): void {
      this.returnLoginForm()
    }
  returnLoginForm() {
    return this.loginForm = this.fb.group({
       Email:['',[Validators.required,Validators.email]],
       Password:['',Validators.required]
    })
  
  }
  siginIn(value) {
    console.log(value)
    this.http.post(`${environment.apiUrl}UsersRigester/login`,value
    ).subscribe(
      (res:any) => {
        console.log(res,"fghj")
        if(res.Password==null)  alert("something went wrong")
        else {
          if(res.Rule==2) this.authService.type="Disabled"
          else this.authService.type="Volunteer"
          this.router.navigate(['/dashboard/dashboard']) 
          this.http.get(`${environment.apiUrl}AskeHelp/GetNotAccepted`).subscribe(
            (res:any) => {
              console.log(res,'zzz')
              this.authService.notifications=res
            } , err => {
              console.log(err)
            }
          )
          localStorage.setItem('user',JSON.stringify(res))
        }
      } , err => {
        console.log(err)
        alert("something went wrong")
      }
    )
  }
  get formControls() {
    return this.loginForm.controls
  }

}
