import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './routing/auth-guard.service';
import { SecretComponent } from './secret/secret.component';



const routes: Routes = [
  { path: '', redirectTo: '/secret', pathMatch: 'full' },
  { path: 'secret', component: SecretComponent, canActivate: [AuthGuard] },
  // { path: 'secret', component: SecretComponent },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
