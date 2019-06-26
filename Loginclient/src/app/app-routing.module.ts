import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes/clientes.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { AuthenticationService } from './services/authentication.service';
import { FormComponent } from './clientes/form.component';
const routes: Routes = [
    { path: '', component: LoginPageComponent },
    { path: 'home', canActivate: [AuthenticationService],component: HomePageComponent },
    { path: 'cliente', canActivate: [AuthenticationService],component: ClientesComponent },
    { path: 'clientes/form/:id', canActivate: [AuthenticationService],component: FormComponent },
    { path: 'clientes/form',component: FormComponent }

];
 
export const Routing: ModuleWithProviders = RouterModule.forRoot(routes);