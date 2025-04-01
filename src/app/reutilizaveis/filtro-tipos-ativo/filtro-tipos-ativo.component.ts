import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-filtro-tipos-ativo',
  templateUrl: './filtro-tipos-ativo.component.html',
  styleUrls: ['./filtro-tipos-ativo.component.scss']
})
export class FiltroTiposAtivoComponent {
  @Input() options: string[] = ['TODOS', 'CRIPTOS', 'FIIS', 'AÇÕES', 'RENDA FIXA'];
  @Input() initialOption: string = 'TODOS';
  @Output() optionSelected = new EventEmitter<string>();

  selectedOption: string;
  isOpen: boolean = false;

  constructor() {
    this.selectedOption = this.initialOption;
  }

  ngOnInit() {
    this.selectedOption = this.initialOption;
  }

  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  selectOption(option: string): void {
    this.selectedOption = option;
    this.isOpen = false;
    this.optionSelected.emit(option);
  }

  @HostListener('document:click')
  closeDropdown(): void {
    this.isOpen = false;
  }
}
