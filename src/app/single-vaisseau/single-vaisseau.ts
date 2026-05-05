import { Component, OnInit } from '@angular/core';
import { ServiceVaisseau } from '../services/service-vaisseau';
import { RouterModule, ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-single-vaisseau',
  imports: [RouterModule],
  templateUrl: './single-vaisseau.html',
  styleUrl: './single-vaisseau.scss',
})
export class SingleVaisseau implements OnInit {
  name:string = 'Vaisseau';
  status:string = 'Status';

  constructor(private service:ServiceVaisseau, private route:ActivatedRoute, private router:Router){}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    const vaisseau = this.service.getVaisseauById(+id);
    if (!vaisseau) {
      this.router.navigate(['/not-found']);
    } else {
      this.name = vaisseau.name;
      this.status = vaisseau.status;
    }
  }
}
