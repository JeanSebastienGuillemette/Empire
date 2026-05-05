import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ServiceVaisseau {
  vaisseaux = [
    {
      id:1,
      name: "Tie Fighter",
      status: "Non disponible"
    },
    {
      id:2,
      name: "Tie Interceptor",
      status: "Disponible"
    },
    {
      id:3,
      name: "Tie Bomber",
      status: "Disponible"
    }
  ];
  constructor(){}

  getVaisseauById(id: number) {
        const voiture= this.vaisseaux.find(
          (vaisseauObject) => {
            return vaisseauObject.id === id;
          }
          
        );
        return voiture;
      }

  switchOnAll(){
    for(let vaisseau of this.vaisseaux){
      vaisseau.status = "Disponible";
    }
  }

  switchOffAll(){
    for(let vaisseau of this.vaisseaux){
      vaisseau.status = "Non disponible";
    }
  }

  switchOnOne(index:number){
    this.vaisseaux[index].status = "Disponible";
  }

  switchOffOne(index:number){
    this.vaisseaux[index].status = "Non disponible";
  }

}
