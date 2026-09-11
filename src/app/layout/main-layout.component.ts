import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from '../shared/header.component';
import { SidebarComponent } from '../shared/sidebar.component';

@Component({
  selector: 'main-layout',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, SidebarComponent],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.scss'
})
export class MainLayoutComponent {
  protected readonly sidebarCollapsed = signal<boolean>(false);

  protected onToggleSidebar(): void {
    this.sidebarCollapsed.update((v) => !v);
  }
}
