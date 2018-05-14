import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';
import { UserService } from './services/user.service';
import { JwtService } from './services/jwt.service';
import { DialogService } from './services/dialog.service';
import { CustomerService } from './services/customer.service';
import { HeaderComponent } from './components/header/header.component';
import { MenuComponent } from './components/menu/menu.component';
import { AlertComponent } from './components/alert/alert.component';

import { MatExpansionModule } from '@angular/material';

@NgModule({
  imports: [CommonModule, HttpClientModule, RouterModule, MatExpansionModule],
  providers: [
    AuthService,
    JwtService,
    UserService,
    CustomerService,
    DataService,
    DialogService
  ],
  declarations: [HeaderComponent, MenuComponent, AlertComponent],
  exports: [HeaderComponent, MenuComponent, AlertComponent]
})
export class CoreModule {}
