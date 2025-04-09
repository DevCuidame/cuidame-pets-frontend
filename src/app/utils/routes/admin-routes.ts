import { Routes } from '@angular/router';

export const ADMIN_ROUTES: Routes = [

  // Pets Routes
  {
    path: 'code',
    loadChildren: () =>
      import('src/app/pages/admin/code/code.module').then((m) => m.CodeModule),
  },

  { path: '', redirectTo: 'initial', pathMatch: 'full' },
];
