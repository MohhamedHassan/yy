import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-updateimg',
  templateUrl: './updateimg.component.html',
  styleUrls: ['./updateimg.component.scss']
})
export class UpdateimgComponent implements OnInit {
  public picurl: string ='';
  public editEnabled = true;
  constructor(private authService:AuthService,
    private router:Router,
    private http:HttpClient) { }

  ngOnInit(): void {
  }
  clear(){
    this.picurl = '';
 }
 updateProfilePicture() {
  let value = JSON.parse(localStorage.getItem("user"))
  value.PhotoUrl=this.picurl
  this.http.put(`http://finalmohamed-001-site1.itempurl.com/api/UsersRigester/Updete`,value).subscribe(
    res => {
      console.log(res,"zzzzzzz")
      let user = value
      this.authService.userPrfile=value
       localStorage.setItem('user',JSON.stringify(user))
this.router.navigate(['/dashboard/user-profile'])
    } , err => {
      console.log(err)
    }
  )
}
}
