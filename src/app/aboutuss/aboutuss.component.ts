import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutuss',
  templateUrl: './aboutuss.component.html',
  styleUrls: ['./aboutuss.component.scss']
})
export class AboutussComponent implements OnInit {
  one
  two
  three
  constructor(private http:HttpClient) { }

  ngOnInit(): void {
    this.http.get('http://finalmohamed-001-site1.itempurl.com/api/AboutControuller/GetCont').subscribe(
      (res:any) => {
        this.one=res?.VolunteerNum
        this.two=res?.DisabledNum
        this.three=res?.AskeHelpNum
      }
    )
  }

}
