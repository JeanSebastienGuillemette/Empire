import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ServicePanier {
  private urlAjouter = 'http://localhost/Empire/backend/ajouter_panier.php';

  constructor(private http: HttpClient) {}

  ajouterAuPanier(id: number, nom: string, disponible: string) {
    return this.http.get(
      `${this.urlAjouter}?id=${id}&nom=${encodeURIComponent(nom)}&disponible=${encodeURIComponent(disponible)}`,
      { withCredentials: true }
    );
  }
}
