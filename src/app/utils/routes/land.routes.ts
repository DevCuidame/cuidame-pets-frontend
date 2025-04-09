import { Routes } from '@angular/router';

export const LAND_ROUTES: Routes = [

  {
    path: 'vets', loadChildren: () => import('src/app/pages/web/public/vets/vets.module').then((m) => m.VetsModule),
  },


  { path: '', redirectTo: 'home', pathMatch: 'full' },
];
