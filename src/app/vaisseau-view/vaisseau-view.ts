import { Component, OnInit } from '@angular/core';
import { VaisseauModels } from '../vaisseau-models/vaisseau-models';
import { ServiceVaisseau } from '../services/service-vaisseau';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { EditorComponent } from '@tinymce/tinymce-angular';

@Component({
  selector: 'app-vaisseau-view',
  imports: [VaisseauModels, CommonModule, FormsModule, EditorComponent],
  templateUrl: './vaisseau-view.html',
  styleUrl: './vaisseau-view.scss',
})
export class VaisseauView implements OnInit {
  editMode = false;
  pageTitle = 'Les modèles de vaisseaux';
  editorConfig = {licenseKey: 'gpl', height: 150};
  isAuth = false;
  vaisseaux: any;
  lastUpdate = new Observable((observer) => {
    if (typeof window !== 'undefined') {
      window.setInterval(() => { observer.next(new Date().toLocaleString("fr-CA")) }, 1000);
    }
  });
  constructor(private cdr: ChangeDetectorRef, private service: ServiceVaisseau, private router: Router) {
    setTimeout(() => {
      this.isAuth = true;
      this.cdr.detectChanges();
    }, 4000);
  }

  ngOnInit() {
    this.vaisseaux = this.service.vaisseaux;
  }

  onAllumer() {
    if (confirm('Etes-vous sûr de vouloir rendre tous vos vaisseaux Disponible ?')) {
      this.service.switchOnAll();
      this.cdr.detectChanges();
    } else {
      return;
    }
  }

  onFermer() {
    if (confirm('Etes-vous sûr de vouloir rendre tous vos vaisseaux Non disponible ?')) {
      this.service.switchOffAll();
      this.cdr.detectChanges();
    } else {
      return;
    }
  }

  onSave(){
    this.service.saveVaisseauxToServer()
    .subscribe(response => {
      this.vaisseaux = response;
      this.router.navigate(['/refresh']);
    });
  }

  onFetch(){
    this.service.getVaisseauFromServer()
    .subscribe((response: any) =>{
      this.vaisseaux = response as any[];
      this.service.vaisseaux = this.vaisseaux;
      this.router.navigate(['/refresh']);
    });
  }
}
