import { Routes } from '@angular/router';
import { Auth } from './auth/auth';
import { VaisseauView } from './vaisseau-view/vaisseau-view';
import { SingleVaisseau } from './single-vaisseau/single-vaisseau';
import { FourOhFour } from './four-oh-four/four-oh-four';


export const routes: Routes = [
    {path:'vaisseaux', component:VaisseauView},
    {path:'vaisseaux/:id',component:SingleVaisseau},
    {path:'auth',component:Auth},
    {path:"",component:VaisseauView},
    {path:'not-found', component:FourOhFour},
    {path:'**', redirectTo:'not-found'},
];
