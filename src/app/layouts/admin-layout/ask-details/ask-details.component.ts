import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { environment } from 'environments/environment';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'app/services/notification.service';
@Component({
  selector: 'app-ask-details',
  templateUrl: './ask-details.component.html',
  styleUrls: ['./ask-details.component.scss']
})
export class AskDetailsComponent implements OnInit {

 
  constructor(public authservice:AuthService,
    public http:HttpClient,
    private activatedRoute:ActivatedRoute,
    private notificationService:NotificationService
    ) { }
    details

  ngOnInit(): void {
    debugger;
    this.activatedRoute.params.subscribe(
      params =>  {
        console.log(params)
        this.http.get(`${environment.apiUrl}AskeHelp/GetById/${params.id}`).subscribe(
          res => {
            this.details=res
            console.log(res,"nbgfds")
          }
        )
        var user = JSON.parse(localStorage.getItem('user'));
        var i = this.notificationService.notifications.findIndex(x=>x.AskeId == params.id);
        console.log('i',i)
        if(i > -1){
          console.log('not',this.notificationService.notifications[i])
          if(this.notificationService.notifications[i].IsView == false || this.notificationService.notifications[i].VolunteerId != user.Id){
            this.notificationService.notifications[i].IsView = true;
            this.notificationService.notificationCount --;
            this.http.get(`http://finalmohamed-001-site1.itempurl.com/api/Notification/GetView/${params.id}/${params.user}`).subscribe(
              res => {
          }
        )
          }
      
       }
     
  })

}
}
