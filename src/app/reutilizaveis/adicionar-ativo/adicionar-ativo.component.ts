import { Component, EventEmitter, Input, Output, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-adicionar-ativo',
  templateUrl: './adicionar-ativo.component.html',
  styleUrls: ['./adicionar-ativo.component.scss']
})
export class AdicionarAtivoComponent {
  @Input() modalTitle: string = 'Adicionar Novo Ativo';
  @Output() assetAdded = new EventEmitter<any>();

  isModalOpen = false;
  assetForm!: FormGroup;

  assetTypes = [
    { value: 'crypto', label: 'Criptomoeda' },
    { value: 'fixed-income', label: 'Renda Fixa' },
    { value: 'stocks', label: 'Ações' },
    { value: 'fiis', label: 'FIIS' }
  ];

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  initForm() {
    this.assetForm = this.fb.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      currentPrice: ['', [Validators.required, Validators.min(0)]],
      purchaseDate: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(0)]],
      purchaseValue: ['', [Validators.required, Validators.min(0)]]
    });
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
    this.assetForm.reset();
  }

  onSubmit() {
    if (this.assetForm.valid) {
      this.assetAdded.emit(this.assetForm.value);
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
