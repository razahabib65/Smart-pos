import { Component, input, output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  public readonly title = input<string>('Smart POS');
  public readonly sidebarToggle = output<void>();

  protected onToggleSidebar(): void {
    this.sidebarToggle.emit();
  }
}
