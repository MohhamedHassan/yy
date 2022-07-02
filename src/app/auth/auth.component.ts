import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { environment } from 'environments/environment';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss']
})
export class AuthComponent implements OnInit {
  registerForm:FormGroup
  selectedImage
  typeOfUser:string
  public picurl: string ='';
  public editEnabled = true;
  constructor(private fb:FormBuilder,
    private http:HttpClient,
    private authService:AuthService,
    private router:Router) { }

  ngOnInit(): void {
    this.returnRegisterForm()
  }
  clear(){
    this.picurl = '';
 }
returnRegisterForm() {
  return this.registerForm = this.fb.group({
     Name:['',Validators.required],
     Phone:['',Validators.required],
     Email:['',[Validators.required,Validators.email,Validators.pattern(/.com$/)]],
     Gender:['',Validators.required],
     Password:['',Validators.required],
     confirmPassword:[''],
     Age:['',[Validators.required,Validators.min(15),Validators.max(100)]],
     Rule:['',Validators.required],
     PotoUrl:['']
  })

}

signup(value) {
  if(value.Rule==2) this.authService.type="Disabled"
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

  let x  = {
   Id:0,
   Name:value.Name,
   Phone:value.Phone,
   Email:value.Email,
   Gender:value.Gender,
   Password:value.Password,
   Age:value.Age,
   Rule:Number(value.Rule), 
   Pointes:0,
   PhotoUrl:this.picurl
  }



  this.http.post(`${environment.apiUrl}UsersRigester/Insert`,x
  ).subscribe(
    res => {
      console.log(res)
      this.authService.userPrfile=res
      localStorage.setItem('user',JSON.stringify(res))
    } , err => {
      console.log(err)
    }
  )
}
onImageChange(file:any) {
   this.selectedImage=file.target.files[0]
   console.log(this.selectedImage)
}
get formControls() {
  return this.registerForm.controls
}

}
