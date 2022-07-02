import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationService } from 'app/services/notification.service';

@Component({
    selector: 'notification-modal',
    templateUrl: 'notification-modal.component.html',
    styleUrls: ['notification-modal.component.scss']
})
export class NotificationModalComponent implements OnInit {
    user : any;
    
    constructor(public modalRef: MatDialogRef<NotificationModalComponent>,
        public notificationService:NotificationService,
        private router:Router
        ) {}
    ngOnInit(): void {
        // this.notificationService.connect();
        this.user = JSON.parse(localStorage.getItem('user'));
        // this.notificationService.notifications.forEach(element => {
        //     if(element.IsView != true){
        //         this.notificationService.ViewNotifications(this.user.Id,element.AskeId)
        //         .subscribe(data => {

        //         })
        //     }
        // });

    }
    goToDetails(item){
        debugger;
        console.log(item);
        var user = JSON.parse(localStorage.getItem('user'));
        this.modalRef.close();
        this.router.navigate(['dashboard/ask-details/',item.AskeId,user.Id]);
    }
}
