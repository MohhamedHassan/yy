import { Component, OnInit, ElementRef, TemplateRef } from '@angular/core';
import { ROUTES } from '../sidebar/sidebar.component';
import {Location, LocationStrategy, PathLocationStrategy} from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from 'app/services/auth.service';
import { NotificationService } from 'app/services/notification.service';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { NotificationModalComponent } from '../notification-modal/notification-modal.component';
declare var $: any;

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
    private listTitles: any[];
    uder:any
    location: Location;
      mobile_menu_visible: any = 0;
    private toggleButton: any;
    private sidebarVisible: boolean;

    constructor(location: Location,
        public authservice:AuthService,
        private element: ElementRef, private router: Router,
        private notificationService:NotificationService,
        private modalService: BsModalService,
       ) {
      this.location = location;
          this.sidebarVisible = false;
        this.user = JSON.parse(localStorage.getItem('user'));

    }

    ngOnInit(){
    this.notificationService.connect();
      this.listTitles = ROUTES.filter(listTitle => listTitle);
      const navbar: HTMLElement = this.element.nativeElement;
      this.toggleButton = navbar.getElementsByClassName('navbar-toggler')[0];
      this.router.events.subscribe((event) => {
        this.sidebarClose();
         var $layer: any = document.getElementsByClassName('close-layer')[0];
         if ($layer) {
           $layer.remove();
           this.mobile_menu_visible = 0;
         }
     });
    }

    sidebarOpen() {
        const toggleButton = this.toggleButton;
        const body = document.getElementsByTagName('body')[0];
        setTimeout(function(){
            toggleButton.classList.add('toggled');
        }, 500);

        body.classList.add('nav-open');

        this.sidebarVisible = true;
    };
    sidebarClose() {
        const body = document.getElementsByTagName('body')[0];
        this.toggleButton.classList.remove('toggled');
        this.sidebarVisible = false;
        body.classList.remove('nav-open');
    };
    sidebarToggle() {
        // const toggleButton = this.toggleButton;
        // const body = document.getElementsByTagName('body')[0];
        var $toggle = document.getElementsByClassName('navbar-toggler')[0];

        if (this.sidebarVisible === false) {
            this.sidebarOpen();
        } else {
            this.sidebarClose();
        }
        const body = document.getElementsByTagName('body')[0];

        if (this.mobile_menu_visible == 1) {
            // $('html').removeClass('nav-open');
            body.classList.remove('nav-open');
            if ($layer) {
                $layer.remove();
            }
            setTimeout(function() {
                $toggle.classList.remove('toggled');
            }, 400);

            this.mobile_menu_visible = 0;
        } else {
            setTimeout(function() {
                $toggle.classList.add('toggled');
            }, 430);

            var $layer = document.createElement('div');
            $layer.setAttribute('class', 'close-layer');


            if (body.querySelectorAll('.main-panel')) {
                document.getElementsByClassName('main-panel')[0].appendChild($layer);
            }else if (body.classList.contains('off-canvas-sidebar')) {
                document.getElementsByClassName('wrapper-full-page')[0].appendChild($layer);
            }

            setTimeout(function() {
                $layer.classList.add('visible');
            }, 100);

            $layer.onclick = function() { //asign a function
              body.classList.remove('nav-open');
              this.mobile_menu_visible = 0;
              $layer.classList.remove('visible');
              setTimeout(function() {
                  $layer.remove();
                  $toggle.classList.remove('toggled');
              }, 400);
            }.bind(this);

            body.classList.add('nav-open');
            this.mobile_menu_visible = 1;

        }
    };

    getTitle(){
      var titlee = this.location.prepareExternalUrl(this.location.path());
      if(titlee.charAt(0) === '#'){
          titlee = titlee.slice( 1 );
      }

      for(var item = 0; item < this.listTitles.length; item++){
          if(this.listTitles[item].path === titlee){
              return this.listTitles[item].title;
          }
      }
      return 'Dashboard';
    }
    logout() {
        localStorage.removeItem("user")
        this.router.navigate(['/login'])
        this.authservice.dark=false
    }
    popUpOpenNotificationResponse:any;
    modalRef?: BsModalRef;
 
    openModal(template: TemplateRef<any>) {
      this.modalRef = this.modalService.show(template);
    }
    onOpenNotification(){
        this.modalService.show(NotificationModalComponent);
		// this.notificationService.openNotification().
		// 	subscribe( res => {this.popUpOpenNotificationResponse = res},
		// 				  err => console.log(err),
		// 				  ()  => this.getOpenNotificationResponse(this.popUpOpenNotificationResponse))
	}

    getOpenNotificationResponse(response : any ){
        var user = JSON.parse(localStorage.getItem('user'));
        // this.notificationService.notifications.forEach(element => {
        //     if(element.IsView != true){
        //         this.notificationService.ViewNotifications(user.Id,element.AskeId)
        //         .subscribe(data => {
        //             var i = this.notificationService.notifications.findIndex(x=>x.Id == element.Id);
        //             if(i > -1){
        //                 this.notificationService.notifications[i].IsView = true;
        //             }
        //         })
        //     }
        // });
	}
    user : any;
    goToDetails(item){
        debugger;
        console.log(item);
        this.modalRef.hide();
        
        this.router.navigate(['dashboard/ask-details/',item.AskeId,this.user.Id]);
    }
}
