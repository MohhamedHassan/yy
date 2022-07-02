import { Injectable } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
// import 'rxjs/Rx';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import {catchError, map} from 'rxjs/operators';
import { NotificationModalComponent } from 'app/components/notification-modal/notification-modal.component';
import { NotificationModel } from 'app/models/norification.model';
import { HubConnection, HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import * as signalR from '@microsoft/signalr';

@Injectable({
	providedIn: 'root'
})

export class NotificationService {
    public notificationCount = 0;
    private hubConnection: HubConnection
    public notifications: NotificationModel[] = [];
    notification:NotificationModel={};
    private connectionUrl ='http://finalmohamed-001-site1.itempurl.com/notification';
    private apiUrl = 'http://finalmohamed-001-site1.itempurl.com/api/Notification';
    currenUser
	constructor(private matDialog : MatDialog,
					private http : HttpClient){
	}

	openNotification(){
		let dialogRef : MatDialogRef<NotificationModalComponent>;
		dialogRef = this.matDialog.open(NotificationModalComponent);

		return dialogRef.afterClosed();
	}

    token = localStorage.getItem("token");
    httpOptions = {
      headers: new HttpHeaders({
         "Authorization": "Bearer " + this.token,
         "Content-Type": "application/json"
      })
    };
  
    public connect = () => {
      this.currenUser = JSON.parse(localStorage.getItem('user'));
      this.startConnection();
      this.addListeners();
      this.GetNotifications()
      .subscribe(data => {
        this.notifications = data;
        this.notifications = this.notifications.reverse();
        this.getNotificationCount();
      })
    }
  
   public getNotificationCount(){
    this.notificationCount = this.notifications.length;
    this.notifications.forEach(element => {
      if(element.IsView == true && element.VolunteerId == this.currenUser.Id){
        this.notificationCount --;
      }
    });
    console.log('this.notificationCount',this.notificationCount)
   }
    private getConnection(): HubConnection {
       
      return new HubConnectionBuilder()
        .withUrl(this.connectionUrl)
        .configureLogging(signalR.LogLevel.Information)
        .build();
    }
  
    private startConnection() {
       
       this.hubConnection = this.getConnection();
       localStorage.removeItem('connectionId');
       localStorage.setItem('connectionId',this.hubConnection.connectionId);
      this.hubConnection.start()
        .then(() => {console.log('connection to notification started')
       
      })
        .catch((err) => console.log('error while establishing signalr connection: ' + err))
    }
  
    private addListeners() {
      this.hubConnection.on('AddNotification', data => {
        this.notification = new NotificationModel();
        this.notification.Id = data.id ? data.id : 0;
        this.notification.AskeId = data.askeId ? data.askeId : 0;
        this.notification.IsView = data.isView ? data.isView : false;
        this.notification.NotificationMasseg = data.notificationMasseg ? data.notificationMasseg : '';
        this.notification.UrlMobile = data.urlMobile ? data.urlMobile : '';
        this.notification.UrlWeb = data.urlWeb ? data.urlWeb : '';
        this.notification.VolunteerId = data.volunteerId ? data.volunteerId : 0;
        this.notifications.unshift(this.notification);
        this.notificationCount ++;
      })
  
      this.hubConnection.on("newUserConnected", _ => {
        console.log("new user connected")
      })
    }
    GetNotifications(): Observable<NotificationModel[]> {
      return this.http
        .get<NotificationModel[]>(`${this.apiUrl}/GetAll`,this.httpOptions)
        .pipe(catchError((error: any) => Observable.throw(error.json())));
    }
    ViewNotifications(userId:number,AskeId:number): Observable<boolean>{
      return this.http
      .get<boolean>(`${this.apiUrl}/GetView/${AskeId}/${userId}`,this.httpOptions)
      .pipe(catchError((error: any) => Observable.throw(error.json())));
    }
}