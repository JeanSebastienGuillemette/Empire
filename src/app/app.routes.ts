import { Routes } from '@angular/router';
import { Auth } from './auth/auth';
import { VaisseauView } from './vaisseau-view/vaisseau-view';
import { SingleVaisseau } from './single-vaisseau/single-vaisseau';
import { FourOhFour } from './four-oh-four/four-oh-four';
import { EditVaisseau } from './edit-vaisseau/edit-vaisseau';
import { Refresh } from './refresh/refresh';
import { Panier } from './panier/panier';


export const routes: Routes = [
    { path: 'vaisseaux', component: VaisseauView },
    { path: 'vaisseaux/:id', component: SingleVaisseau },
    { path: 'auth', component: Auth },
    { path: "", component: VaisseauView },
    { path: 'edit', component: EditVaisseau },
    { path: 'refresh', component: Refresh },
    { path: 'panier', component: Panier },
    { path: 'not-found', component: FourOhFour },
    { path: '**', redirectTo: 'not-found' }
];
