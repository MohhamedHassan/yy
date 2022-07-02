import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { environment } from 'environments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
declare var $: any;


@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit {
  askHelp=[]
  lat = 51.678418;
  lng = 7.809007;
  // 4.89763 52.354015
  cond=false
  chooseLocation(one,two,el) {
    console.log(one,two)
    this.lat=one
    this.lng=two
    this.cond=true
    this.openModal(el)
  }
  modalRef?: BsModalRef;
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  user:any;
  constructor(private http:HttpClient,
    private modalService: BsModalService,
    public authservice:AuthService,
    private router:Router) {
     }
     openDetails(item){
      this.user = JSON.parse(localStorage.getItem('user'));
      this.router.navigate(['dashboard/ask-details/',item.Id,this.user.Id]);
     }
  // showNotification(from, align){
  //     const type = ['','info','success','warning','danger'];

  //     const color = Math.floor((Math.random() * 4) + 1);

  //     $.notify({
  //         icon: "notifications",
  //         message: "Welcome to <b>Material Dashboard</b> - a beautiful freebie for every web developer."

  //     },{
  //         type: type[color],
  //         timer: 4000,
  //         placement: {
  //             from: from,
  //             align: align
  //         },
  //         template: '<div data-notify="container" class="col-xl-4 col-lg-4 col-11 col-sm-4 col-md-4 alert alert-{0} alert-with-icon" role="alert">' +
  //           '<button mat-button  type="button" aria-hidden="true" class="close mat-button" data-notify="dismiss">  <i class="material-icons">close</i></button>' +
  //           '<i class="material-icons" data-notify="icon">notifications</i> ' +
  //           '<span data-notify="title">{1}</span> ' +
  //           '<span data-notify="message">{2}</span>' +
  //           '<div class="progress" data-notify="progressbar">' +
  //             '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
  //           '</div>' +
  //           '<a href="{3}" target="{4}" data-notify="url"></a>' +
  //         '</div>'
  //     });
  // }
  ngOnInit() {
    debugger;
    this.http.get(`${environment.apiUrl}AskeHelp/GetNotAccepted`).subscribe(
      (res:any) => {
        console.log(res,'GetNotAccepted')
        this.askHelp=res
        this.authservice.notifications=res
      } , err => {
        console.log(err)
      }
    )
  }
  doneHelp(Id) {
    this.http.put(`${environment.apiUrl}AskeHelp/Accepted/${Id}/${JSON.parse(localStorage.getItem('user')).Id }`,{}).subscribe(
      (res:any) => {
        console.log(res,'delete')
        this.http.get(`${environment.apiUrl}AskeHelp/GetNotAccepted`).subscribe(
          (res:any) => {
            console.log(res,'zzz')
            this.askHelp=res
            this.authservice.notifications=res
          } , err => {
            console.log(err)
          }
        )
      } , err => {
        console.log(err)
      }
    )
  }

}
