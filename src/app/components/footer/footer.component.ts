import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  test : Date = new Date();
  
  constructor(public authService:AuthService) { }

  ngOnInit() {
  }
  scrl(el: HTMLElement) {
    el.scrollIntoView();
}
}
