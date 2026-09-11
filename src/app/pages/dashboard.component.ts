import { Component, signal } from '@angular/core';

interface KpiCard {
  readonly label: string;
  readonly value: string;
  readonly trend: string;
  readonly trendUp: boolean;
  readonly icon: string;
  readonly accent: string;
}

@Component({
  selector: 'page-dashboard',
  standalone: true,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  protected readonly kpiCards = signal<readonly KpiCard[]>([
    {
      label: 'Total Sales',
      value: '$24,780',
      trend: '+12.5%',
      trendUp: true,
      icon: 'sales',
      accent: 'var(--indigo-500)'
    },
    {
      label: 'Orders Today',
      value: '148',
      trend: '+8.2%',
      trendUp: true,
      icon: 'orders',
      accent: 'var(--emerald-500)'
    },
    {
      label: 'Active Products',
      value: '1,204',
      trend: '+3.1%',
      trendUp: true,
      icon: 'products',
      accent: 'var(--sky-500)'
    },
    {
      label: 'Revenue',
      value: '$18,320',
      trend: '-2.4%',
      trendUp: false,
      icon: 'revenue',
      accent: 'var(--amber-500)'
    }
  ]);
}
