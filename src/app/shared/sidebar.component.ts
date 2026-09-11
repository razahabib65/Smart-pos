import { Component, input, signal, computed } from '@angular/core';
import { RouterModule } from '@angular/router';

export interface NavItem {
  readonly label: string;
  readonly route: string;
  readonly icon: string;
}

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  public readonly collapsed = input<boolean>(false);

  protected readonly isCollapsed = computed(() => this.collapsed());

  protected readonly navItems = signal<readonly NavItem[]>([
    { label: 'Dashboard',  route: '/dashboard',  icon: 'dashboard' },
    { label: 'Products',   route: '/products',   icon: 'products' },
    { label: 'Orders',     route: '/orders',     icon: 'orders' },
    { label: 'Customers',  route: '/customers',  icon: 'customers' },
    { label: 'Reports',    route: '/reports',     icon: 'reports' }
  ]);

  protected readonly bottomItems = signal<readonly NavItem[]>([
    { label: 'Settings',   route: '/settings',   icon: 'settings' }
  ]);
}
