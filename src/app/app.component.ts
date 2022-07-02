import { HttpClient } from '@angular/common/http';
import { Component} from '@angular/core';
import { AuthService } from './services/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
  user
  picurl
  editEnabled
  constructor(private http:HttpClient,
    public authService:AuthService,
    private authservice:AuthService) {
if (localStorage.getItem('user')!=null) {
  this.user=JSON.parse(localStorage.getItem('user'))
  console.log(this.user,"uuu")
  if(this.user.Rule==2) this.authservice.type="Disabled"
  else this.authservice.type="Volunteer"
}
    http.get(`http://finalmohamed-001-site1.itempurl.com/api/AskeHelp/GetNotAccepted`).subscribe(
      (res:any) => {
        console.log(res,'zzz')
        authservice.notifications=res
      } , err => {
        console.log(err)
      }
    )
  }


}