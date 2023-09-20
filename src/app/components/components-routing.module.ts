import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InsertComponent } from './pages/insert/insert.component';
import { UpdateComponent } from './pages/update/update.component';
import { TableComponent } from './pages/table/table.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'table',
        component: TableComponent,
      },
      {
      path: 'insert',
      component: InsertComponent,
      },
      {
        path: 'update',
        component: UpdateComponent
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ComponentsRoutingModule { }
