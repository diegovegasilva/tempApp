import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';

import { getAlert } from '../../../store/reducers';
import * as notificationActions from '../../../store/actions/notification.actions';

import * as animations from '../../../shared/animations';

@Component({
  selector: 'app-alert',
  templateUrl: './alert.component.html',
  styleUrls: ['./alert.component.scss'],
  animations: [animations.alertFadeInOutAnimation]
})
export class AlertComponent implements OnInit {
  alert$;

  constructor(private store: Store<any>) {}

  ngOnInit() {
    this.alert$ = this.store.select(getAlert);
  }

  closeAlert() {
    this.store.dispatch(new notificationActions.AlertRemove());
  }
}
