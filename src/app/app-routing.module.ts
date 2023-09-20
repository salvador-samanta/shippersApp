import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentsModule } from './components/components.module';

const routes: Routes = [
  {
    path: 'shippers', 
    loadChildren: () => import('../app/components/components.module').then(s => ComponentsModule),
  },
  {
    path: '**',
    redirectTo: 'shippers',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }