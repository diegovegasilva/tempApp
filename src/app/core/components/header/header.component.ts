import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as stateSelector from '../../../store/reducers';
import * as userActions from '../../../store/actions/user.actions';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  user$;

  constructor(private store: Store<any>) { }

  ngOnInit() {
    this.user$ = this.store.select(stateSelector.getUser);
  }

  logout(): void {
    this.store.dispatch(new userActions.UserLogout());
  }

}
