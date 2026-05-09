import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class ServiceVaisseau {

  vaisseauxSubject = new Subject<any[]>();

  public urlPhp:string = "http://localhost/Empire/backend/inserer_angular66.php";
  public urlPhpGet: string = "http://localhost/Empire/backend/afficher_angular.php";
  public urlPhpDelete: string = "http://localhost/Empire/backend/destruction_angular.php";

  vaisseaux = [
    {
      id: 1,
      name: "Tie Fighter",
      status: "Non disponible"
    },
    {
      id: 2,
      name: "Tie Interceptor",
      status: "Disponible"
    },
    {
      id: 3,
      name: "Tie Bomber",
      status: "Disponible"
    },
    {
      id: 4,
      name: "Destroyer Stellaire",
      status: "Disponible"
    },
    {
      id: 5,
      name: "Étoile de la Mort",
      status: "Non disponible"
    }
  ];
  constructor(private router: Router, private http: HttpClient) { }

  getVaisseauById(id: number) {
    const voiture = this.vaisseaux.find(
      (vaisseauObject) => {
        return vaisseauObject.id === id;
      }

    );
    return voiture;
  }

  getVaisseauFromServer(){
    return this.http.get(this.urlPhpGet);
  }

  switchOnAll() {
    for (let vaisseau of this.vaisseaux) {
      vaisseau.status = "Disponible";
    }
  }

  switchOffAll() {
    for (let vaisseau of this.vaisseaux) {
      vaisseau.status = "Non disponible";
    }
  }

  switchOnOne(index: number) {
    this.vaisseaux[index].status = "Disponible";
  }

  switchOffOne(index: number) {
    this.vaisseaux[index].status = "Non disponible";
  }

  addVaisseau(name: string, status: string) {
    const vaisseauObject = {
      id: 0,
      name: "",
      status: ""
    };

    vaisseauObject.name = name;
    vaisseauObject.status = status;
    vaisseauObject.id = this.vaisseaux[(this.vaisseaux.length - 1)].id + 1;
    this.vaisseaux.push(vaisseauObject);
  }

  saveVaisseauxToServer(){
    const body = this.vaisseaux;
    return this.http.put(this.urlPhp, body, { responseType: 'text' });
  }

  detruireOne(index:number){
    let endPoints = "?id=" + index;
    this.http.delete(this.urlPhpDelete + endPoints).subscribe({
      next: (data) => console.log('Supression réussi!', data),
      error: (err) => console.error('Message d\'erreur: ', err),
      complete: () => console.log('Complété!')
    });
  }

}
