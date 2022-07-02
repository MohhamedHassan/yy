import { HttpClient } from '@angular/common/http';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-done-helps',
  templateUrl: './done-helps.component.html',
  styleUrls: ['./done-helps.component.scss']
})
export class DoneHelpsComponent implements OnInit {

  constructor(private http:HttpClient,
    private modalService:BsModalService,
    public authService:AuthService) { }
  askHelp
  lat

lng  
chooseLocation(one,two,el) {
    console.log(one,two)
    this.lat=one
    this.lng=two
    this.openModal(el)
  }
  modalRef?: BsModalRef;
 
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  ngOnInit(): void { 
    if(this.authService.type=='Disabled') {
      this.http.get(`http://finalmohamed-001-site1.itempurl.com/api/AskeHelp/GetDoneForDisabled/${JSON.parse(localStorage.getItem('user')).Id }`
      ).subscribe(
        res => {
          console.log(res,"zzzzzzz")
          this.askHelp=res
        } , err => {
          console.log(err)
        }
      )
    } else {
      
      this.http.get(`http://finalmohamed-001-site1.itempurl.com/api/AskeHelp/GetDoneForVolunteer/${JSON.parse(localStorage.getItem('user')).Id }`
      ).subscribe(
        res => {
          console.log(res,"pointsss")
          this.askHelp=res
        } , err => {
          console.log(err)
        }
      )
  }

  }}