import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';

declare const $: any;
declare interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}
export const ROUTES: RouteInfo[] = [
    // { path: '/dashboard/dashboard', title: 'Dashboard',  icon: 'dashboard', class: '' },
    { path: '/dashboard/user-profile', title: 'User Profile',  icon:'person', class: '' },
    { path: '/dashboard/table-list', title: 'Ask Help',  icon:'content_paste', class: '' },
 
    // { path: '/dashboard/typography', title: 'Typography',  icon:'library_books', class: '' },
    // { path: '/dashboard/icons', title: 'Icons',  icon:'bubble_chart', class: '' },
    // { path: '/dashboard/maps', title: 'Maps',  icon:'location_on', class: '' },
    { path: '/dashboard/notifications', title: 'Helps',  icon:'notifications', class: '' },
    { path: '/dashboard/accepted', title: 'Accepted Helps',  icon:'content_paste', class: '' },
    // { path: '/dashboard/upgrade', title: 'Upgrade to PRO',  icon:'unarchive', class: 'active-pro' },
];

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  menuItems: any[];
  logout() {
    localStorage.removeItem("user")
    this.router.navigate(['/login'])
    this.authService.dark=false
}
  constructor(public authService:AuthService,
    private router:Router) { }

  ngOnInit() {
    this.menuItems = ROUTES.filter(menuItem => menuItem);
  }
  isMobileMenu() {
      if ($(window).width() > 991) {
          return false;
      }
      return true;
  };
}
