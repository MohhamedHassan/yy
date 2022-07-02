import { HttpClient } from '@angular/common/http';
import { Component,EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'app/services/auth.service';
import { environment } from 'environments/environment';
import { FileUploader } from 'ng2-file-upload';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {
  askHelp
  updateProfileForm:FormGroup
  totalPoints=0

  private urlChange 
  constructor(public authService:AuthService,
    private fb:FormBuilder,
    private http:HttpClient) { 
   
    }

  ngOnInit() {
    if (localStorage.getItem('user')!=null) {
      this.authService.userPrfile=JSON.parse(localStorage.getItem("user"))
    }
    this.updateProfileForm=this.fb.group({
        Id: 0,
    Name: '',
    Phone: '',
    Email: '',
    Gender: '',
    Password: '',
    Age:[0,[Validators.required,Validators.min(15),Validators.max(100)]],
    Rule: 0,
    Pointes: 0
    })
     this.updateProfileForm.patchValue(JSON.parse(localStorage.getItem("user")))
   

     this.http.get(`${environment.apiUrl}AskeHelp/GetDoneForVolunteer/${JSON.parse(localStorage.getItem('user')).Id }`
     ).subscribe(
       res => {
         console.log(res,"newwwww")
         this.askHelp=res
         for (let i = 0 ; i < this.askHelp.length;i++) {
          if(this.askHelp[i].TypeOfServes=='Delivery') {
            this.totalPoints+=10

          }
          else if(this.askHelp[i].TypeOfServes=='Home') {
            this.totalPoints+=5
            

          }
          else if(this.askHelp[i].TypeOfServes=='Nursing'){
            this.totalPoints+=9
          }
          else if(this.askHelp[i].TypeOfServes=='Help Me') {
            this.totalPoints+=3
          }
          else if(this.askHelp[i].TypeOfServes=='Disabled Assistant') {
            this.totalPoints+=13
          }
          else if(this.askHelp[i].TypeOfServes=='Elderly') {
            this.totalPoints+=11
          }
          else if(this.askHelp[i].TypeOfServes=='WASALNY') {
            this.totalPoints+=14
          }
          else  {
            this.totalPoints+=15
          }
        }
       } , err => {
         console.log(err)
       }
     )
  }
  updatee(value) {
    this.http.put(`${environment.apiUrl}UsersRigester/Updete`,value).subscribe(
      res => {
        console.log(res,"zzzzzzz")
        let user = value
        this.authService.userPrfile=value
         localStorage.setItem('user',JSON.stringify(user))
      } , err => {
        console.log(err)
      }
    )
}
updatePicture=false



}