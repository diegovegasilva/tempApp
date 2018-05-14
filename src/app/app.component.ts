import { Component, OnInit, Renderer2 } from '@angular/core';
import { Store } from '@ngrx/store';
import { filter } from 'rxjs/operators';

import * as UserActions from './store/actions/user.actions';
import * as DataActions from './store/actions/data.actions';
import * as NotificationActions from './store/actions/notification.actions';
import { getRouter } from './store/reducers/index';

import * as ErrorCodes from './core/utils/error/error.codes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  showMenu: boolean;
  previousUrl: string;

  constructor(private store: Store<any>, private renderer: Renderer2) {}

  ngOnInit() {
    this.assingBodyClass();
    this.userValidate();
    this.fetchInitialData();
  }

  assingBodyClass() {
    this.store
      .select(getRouter)
      .pipe(filter(route => !!route))
      .subscribe(route => {
        this.renderer.removeClass(document.body, this.previousUrl);
        this.renderer.addClass(
          document.body,
          this.formatUrlClass(route.state.url)
        );
        this.previousUrl = this.formatUrlClass(route.state.url);
        this.showMenu = route.state.url !== '/login';
      });
  }

  userValidate() {
    this.store.dispatch(new UserActions.UserValidate());
    /* this.store.dispatch(
      new NotificationActions.AlertShow({
        type: 'success',
        message:
          'Ha ocurrido un erro ada lñasdl asd la jkhas askjh as kdjhasd kjhasa sjs ss sjsakda1232',
        duration: 2000,
        autoHide: false
      })
    ); */
  }

  fetchInitialData() {
    this.store.dispatch(new DataActions.ProvincesFetch());
  }

  private formatUrlClass(url): string {
    url = url.slice(1).replace(/\//g, '-');
    return url + 'Page';
  }
}
