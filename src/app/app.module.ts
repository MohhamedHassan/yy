import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';;
import { AppRoutingModule } from './app.routing';
import { ComponentsModule } from './components/components.module';

import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { TableListComponent } from './table-list/table-list.component';
import { TypographyComponent } from './typography/typography.component';
import { IconsComponent } from './icons/icons.component';
import { MapsComponent } from './maps/maps.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { UpgradeComponent } from './upgrade/upgrade.component';
import {
  AgmCoreModule
} from '@agm/core';
import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { AuthComponent } from './auth/auth.component';
import { LoginComponent } from './login/login.component';
import { AboutussComponent } from './aboutuss/aboutuss.component';
import { ProfilePictureComponent } from './profile-picture/profile-picture.component';
import { FileUploadModule } from 'ng2-file-upload';
import { UpdateimgComponent } from './updateimg/updateimg.component';
import { CeilPipe } from './ceil.pipe';
import { BsModalService } from 'ngx-bootstrap/modal';

@NgModule({
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ComponentsModule,
    RouterModule,
    AppRoutingModule,
    FileUploadModule,
 
  ],
  declarations: [
    AppComponent,
    AdminLayoutComponent,
    AuthComponent,
    LoginComponent,
    AboutussComponent,
    ProfilePictureComponent,
    UpdateimgComponent,
    
  ],
  providers: [BsModalService],
  bootstrap: [AppComponent]
})
export class AppModule { }
