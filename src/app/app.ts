import { Component, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { LeftSideMenu } from './components/left-side-menu/left-side-menu';
import { UserPanel } from './components/user-panel/user-panel';
import { Preparation } from './components/preparation/preparation';
import { TopMenu } from './components/top-menu/top-menu';
import { map, Observable } from 'rxjs';
import { StorageService } from './services/storage';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports: [
    CommonModule,
    RouterOutlet,
    MatSidenavModule,
    MatToolbarModule,
    LeftSideMenu,
    UserPanel,
    TopMenu,
  ],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  isLoggedIn$: Observable<boolean>;

  constructor(private storageService: StorageService) {
    this.isLoggedIn$ = this.storageService.getTokenObservable().pipe(map((token) => !!token));
  }
}
