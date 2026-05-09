import { Component, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-refresh',
  imports: [],
  templateUrl: './refresh.html',
  styleUrl: './refresh.scss',
})
export class Refresh {
  constructor(private router: Router, private cdr: ChangeDetectorRef) {
    setTimeout(() => {
      this.router.navigate(['/vaisseaux']);
      this.cdr.detectChanges();
    }, 3000);
  }
}
