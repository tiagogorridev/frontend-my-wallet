import { Component, Input, Output, EventEmitter, HostListener } from '@angular/core';

@Component({
  selector: 'app-filtro-data',
  templateUrl: './filtro-data.component.html',
  styleUrls: ['./filtro-data.component.scss']
})
export class FiltroDataComponent {
  @Input() options: string[] = ['3 MESES', '6 MESES', '12 MESES', '24 MESES'];
  @Input() initialOption: string = '12 MESES';
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
