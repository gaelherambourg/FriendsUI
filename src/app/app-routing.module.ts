import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FriendComponent } from './friend/friend.component';
import { HomeComponent } from './home/home.component';
import { CarComponent } from './car/car.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'friends', component: FriendComponent },
  { path: 'cars', component: CarComponent },
  { path: '', component: HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
