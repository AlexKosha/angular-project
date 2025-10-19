import { Component } from '@angular/core';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-left-side-menu',
  imports: [MatListModule, RouterLink],
  templateUrl: './left-side-menu.html',
  styleUrl: './left-side-menu.scss',
})
export class LeftSideMenu {}
