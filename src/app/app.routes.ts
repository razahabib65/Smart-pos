import { Routes } from '@angular/router';
import { MainLayoutComponent } from './layout/main-layout.component';
import { DashboardComponent } from './pages/dashboard.component';
import { ProductsComponent } from './pages/products/products.component';
import { AddProductComponent } from './pages/products/add-product.component';

export const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'products/add', component: AddProductComponent },
      // Future routes — add components here as you build them:
      // { path: 'customers', component: CustomersComponent },
      // { path: 'reports',   component: ReportsComponent },
      // { path: 'settings',  component: SettingsComponent },
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
