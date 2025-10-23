import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage';

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrls: ['./home.scss'],
})
export class Home implements OnInit {
  constructor(private storage: StorageService, private router: Router) {}

  ngOnInit(): void {
    // якщо користувач уже залогінений — одразу переходимо до основного застосунку
    const token = this.storage.getToken();
    if (token) {
      this.router.navigate(['/categories/angular']);
    }
  }
}
