import { Component, signal } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterOutlet } from '@angular/router';
import { LeftSideMenu } from './components/left-side-menu/left-side-menu';
import { UserPanel } from './components/user-panel/user-panel';
import { Preparation } from './components/preparation/preparation';
import { TopMenu } from './components/top-menu/top-menu';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, MatSidenavModule, MatToolbarModule, LeftSideMenu, UserPanel, TopMenu],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected readonly title = signal('ProjectAngular');
}
