import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { FooterComponent } from './footer/footer.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { AcceptedOrdersComponent } from './accepted-orders/accepted-orders.component';
import { NotificationModalComponent } from './notification-modal/notification-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { BsModalService } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule
    
  ],
  declarations: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent,
    AcceptedOrdersComponent,
    NotificationModalComponent
  ],
  exports: [
    FooterComponent,
    NavbarComponent,
    SidebarComponent
    
  ],
  entryComponents:[NotificationModalComponent],
  providers: [BsModalService],

})
export class ComponentsModule { }
