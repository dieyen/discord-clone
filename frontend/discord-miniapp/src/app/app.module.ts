import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';

import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServerListComponent } from './server-list/server-list.component';
import { TopBarComponent } from './top-bar/top-bar.component';
import { ChannelListComponent } from './channel-list/channel-list.component';
import { RegisterComponent } from './register/register.component';
import { HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddServerComponent } from './add-server/add-server.component';
import { AddChannelComponent } from './add-channel/add-channel.component';
import { UserListComponent } from './user-list/user-list.component';
import { ChannelDetailComponent } from './channel-detail/channel-detail.component';
import { AddRoleComponent } from './add-role/add-role.component';
import { AddUserComponent } from './add-user/add-user.component';
// import { AddUserRoleComponent } from './add-user-role/add-user-role.component';

@NgModule({
  declarations: [
    AppComponent,
    ServerListComponent,
    TopBarComponent,
    ChannelListComponent,
    RegisterComponent,
    NavbarComponent,
    LoginComponent,
    DashboardComponent,
    AddServerComponent,
    AddChannelComponent,
    UserListComponent,
    ChannelDetailComponent,
    AddRoleComponent,
    AddUserComponent,
    AddUserRoleComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
