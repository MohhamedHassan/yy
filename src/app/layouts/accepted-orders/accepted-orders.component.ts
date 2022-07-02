import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { environment } from 'environments/environment';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-accepted-orders',
  templateUrl: './accepted-orders.component.html',
  styleUrls: ['./accepted-orders.component.scss']
})
export class AcceptedOrdersComponent implements OnInit {
  askHelp
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
  constructor(private http:HttpClient,
    private modalService: BsModalService,
    public authService:AuthService) { }

  ngOnInit(): void {
    debugger;
    if(this.authService.type=='Disabled') {
      this.http.get(`${environment.apiUrl}AskeHelp/GetAcceptedForDisabled/${JSON.parse(localStorage.getItem('user')).Id }`
      ).subscribe(
        res => {
          console.log(res,"zzzzzzz")
          this.askHelp=res
        } , err => {
          console.log(err)
        }
      )
    } else {
      debugger;
      this.http.get(`${environment.apiUrl}AskeHelp/GetAcceptedForVolunteer/${JSON.parse(localStorage.getItem('user')).Id }`
      ).subscribe(
        res => {
          console.log(res,"pointsss")
          this.askHelp=res
        } , err => {
          console.log(err)
        }
      )
    }

  }
  doneHelp(Id) {
    this.http.put(`${environment.apiUrl}AskeHelp/Done/${Id}`,{}).subscribe(
      (res:any) => {
        console.log(res,'delete')
        if(this.authService.type=='Disabled') {
          this.http.get(`${environment.apiUrl}AskeHelp/GetAcceptedForDisabled/${JSON.parse(localStorage.getItem('user')).Id }`
          ).subscribe(
            res => {
              console.log(res,"zzzzzzz")
              this.askHelp=res
            } , err => {
              console.log(err)
            }
          )
        } else {
          this.http.get(`${environment.apiUrl}AskeHelp/GetAcceptedForVolunteer/${JSON.parse(localStorage.getItem('user')).Id }`
          ).subscribe(
            res => {
              console.log(res,"zzzzzzz")
              this.askHelp=res
            } , err => {
              console.log(err)
            }
          )
        }
      } , err => {
        console.log(err)
      }
    )
  }
}
