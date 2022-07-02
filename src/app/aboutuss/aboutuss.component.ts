import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-aboutuss',
  templateUrl: './aboutuss.component.html',
  styleUrls: ['./aboutuss.component.scss']
})
export class AboutussComponent implements OnInit {

  constructor(private http:HttpClient) { }

  ngOnInit(): void {
  }

}
