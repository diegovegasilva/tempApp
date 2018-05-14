import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { environment } from '../../../../environments/environment';

import { Store } from '@ngrx/store';
import * as userActions from '../../../store/actions/user.actions';
import { AuthService } from '../../../core/services/auth.service';
import * as errorMsg from '../../../core/utils/error/error.codes';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  errorMsg;
  imgPath: string;

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private store: Store<any>
  ) {
    this.loginForm = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.errorMsg = errorMsg;
    this.imgPath = environment.imgPath;
  }

  login() {
    if (this.loginForm.value.email && this.loginForm.value.password) {
      const userData = {
        username: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      this.store.dispatch(new userActions.UserLogin(userData));
    }
  }

  validateToken() {}
}
