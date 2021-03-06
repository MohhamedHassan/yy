import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../dashboard/dashboard.component';
import { UserProfileComponent } from '../../user-profile/user-profile.component';
import { TableListComponent } from '../../table-list/table-list.component';
import { TypographyComponent } from '../../typography/typography.component';
import { IconsComponent } from '../../icons/icons.component';
import { MapsComponent } from '../../maps/maps.component';
import { NotificationsComponent } from '../../notifications/notifications.component';
import { UpgradeComponent } from '../../upgrade/upgrade.component';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatRippleModule} from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatSelectModule} from '@angular/material/select';
import { AcceptedOrdersComponent } from '../accepted-orders/accepted-orders.component';
import { DoneHelpsComponent } from './done-helps/done-helps.component';
import { AgmCoreModule } from '@agm/core';
import { CeilPipe } from 'app/ceil.pipe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { AskDetailsComponent } from './ask-details/ask-details.component';

@NgModule({
  imports: [
    CommonModule,
    ModalModule.forRoot(),
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTooltipModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyAbmPb88L_VihwJINQpwI5kWN2Gk2KzZfo',
      libraries: ['places']
    })
  ],
  declarations: [
    DashboardComponent,
    CeilPipe,
    UserProfileComponent,
    TableListComponent,
    TypographyComponent,
    IconsComponent,
    MapsComponent,
    NotificationsComponent,
    UpgradeComponent,
    AcceptedOrdersComponent,
    DoneHelpsComponent,
    AskDetailsComponent
  ]
})

export class AdminLayoutModule {}
