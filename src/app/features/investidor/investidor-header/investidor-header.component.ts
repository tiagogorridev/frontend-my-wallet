import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-investidor-header',
  templateUrl: './investidor-header.component.html',
  styleUrls: ['./investidor-header.component.scss']
})
export class InvestidorHeaderComponent {
  isModalOpen = false;
  assetForm!: FormGroup;

  assetTypes = [
    { value: 'crypto', label: 'Criptomoeda' },
    { value: 'fixed-income', label: 'Renda Fixa' },
    { value: 'stocks', label: 'Ações' },
    { value: 'fiis', label: 'FIIS' }
  ];

  openModal() {
    this.isModalOpen = true;
    console.log('Modal opened');
  }

  closeModal() {
    this.isModalOpen = false;
    this.assetForm.reset();
  }

  onSubmit() {
    if (this.assetForm.valid) {
      console.log(this.assetForm.value);
      this.closeModal();
    } else {
      Object.keys(this.assetForm.controls).forEach(field => {
        const control = this.assetForm.get(field);
        control?.markAsTouched();
      });
    }
  }

  @HostListener('document:keydown.escape', ['$event'])
  handleEscapeKey(event: KeyboardEvent) {
    if (this.isModalOpen) {
      this.closeModal();
    }
  }
}
