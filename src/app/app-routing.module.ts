import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomepageComponent} from "./homepage/homepage.component";
import {RecordsComponent} from "./records/records.component";

const routes: Routes = [
  { path: '', component: HomepageComponent },
  { path: 'Records', component: RecordsComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
