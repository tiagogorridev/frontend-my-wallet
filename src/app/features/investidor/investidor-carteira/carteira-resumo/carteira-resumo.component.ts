import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Chart from 'chart.js/auto';

interface AssetCategory {
  name: string;
  isExpanded: boolean;
}

@Component({
  selector: 'app-carteira-resumo',
  templateUrl: './carteira-resumo.component.html',
  styleUrls: ['./carteira-resumo.component.scss']
})
export class CarteiraResumoComponent implements OnInit {
  @ViewChild('patrimonioChart', { static: true }) patrimonioChartRef!: ElementRef;
  @ViewChild('assetsDistributionChart', { static: true }) assetsDistributionChartRef!: ElementRef;

  dropdowns = [
    {
      label: '12 MESES',
      options: ['3 MESES', '6 MESES', '12 MESES', '24 MESES'],
      isOpen: false,
      onSelect: (option: string) => this.updateChartMonths(option)
    },
    {
      label: 'TODOS',
      options: ['TODOS', 'CRIPTOS', 'RENDA FIXA', 'AÇÕES'],
      isOpen: false
    }
  ];

  assetCategories: AssetCategory[] = [
    { name: 'FIIS', isExpanded: false },
    { name: 'CRIPTOMOEDAS', isExpanded: false }
  ];

  isModalOpen = false;
  assetForm!: FormGroup;

  assetTypes = [
    { value: 'crypto', label: 'Criptomoeda' },
    { value: 'fixed-income', label: 'Renda Fixa' },
    { value: 'stocks', label: 'Ações' },
    { value: 'fiis', label: 'FIIS' }
  ];

  private chartInstance: Chart | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.initForm();
    this.createPatrimonioChart();
    this.createAssetsDistributionChart();
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

  toggleDropdown(dropdown: any) {
    this.dropdowns.forEach(dd => {
      if (dd !== dropdown) {
        dd.isOpen = false;
      }
    });

    dropdown.isOpen = !dropdown.isOpen;
  }

  selectOption(dropdown: any, option: string) {
    dropdown.label = option;
    dropdown.isOpen = false;

    if (dropdown.onSelect) {
      dropdown.onSelect(option);
    }
  }

  updateChartMonths(monthOption: string) {
    let monthsToShow: number;
    switch(monthOption) {
      case '3 MESES':
        monthsToShow = 3;
        break;
      case '6 MESES':
        monthsToShow = 6;
        break;
      case '12 MESES':
        monthsToShow = 12;
        break;
      case '24 MESES':
        monthsToShow = 24;
        break;
      default:
        monthsToShow = 12;
    }

    this.updatePatrimonioChart(monthsToShow);
  }

  createPatrimonioChart() {
    const ctx = this.patrimonioChartRef.nativeElement.getContext('2d');
    const today = new Date();
    const labels = [];
    const data = [];

    for (let i = 11; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      labels.push(this.getMonthYearLabel(date));
      data.push(this.generateMonthlyValue(date));
    }

    this.chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Evolução do Patrimônio',
          data: data,
          borderColor: '#FFA500',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          tension: 0.4,
          fill: true
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          }
        },
        scales: {
          y: {
            beginAtZero: false,
            ticks: {
              color: '#FFFFFF',
              callback: function(value) {
                return 'R$ ' + Number(value).toLocaleString();
              }
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          },
          x: {
            ticks: {
              color: '#FFFFFF'
            },
            grid: {
              color: 'rgba(255, 255, 255, 0.1)'
            }
          }
        }
      }
    });
  }

  updatePatrimonioChart(monthsToShow: number) {
    if (!this.chartInstance) return;

    const today = new Date();
    const labels = [];
    const data = [];

    for (let i = monthsToShow - 1; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      labels.push(this.getMonthYearLabel(date));
      data.push(this.generateMonthlyValue(date));
    }

    this.chartInstance.data.labels = labels;
    this.chartInstance.data.datasets[0].data = data;
    this.chartInstance.update();
  }

  createAssetsDistributionChart() {
    const ctx = this.assetsDistributionChartRef.nativeElement.getContext('2d');
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Criptomoedas', 'Renda Fixa'],
        datasets: [{
          data: [50, 50],
          backgroundColor: ['#F39C12', '#6b7280'],
          hoverOffset: 4
        }]
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false
          }
        }
      }
    });
  }

  toggleCategoryExpansion(category: AssetCategory) {
    this.assetCategories.forEach(cat => {
      if (cat !== category) {
        cat.isExpanded = false;
      }
    });

    category.isExpanded = !category.isExpanded;
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

  private getMonthYearLabel(date: Date): string {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return `${months[date.getMonth()]} / ${date.getFullYear()}`;
  }

  private generateMonthlyValue(date: Date): number {
    const baseValue = 10000;
    const monthIndex = date.getMonth();
    const fluctuation = Math.sin(monthIndex) * 1000;
    return baseValue + fluctuation;
  }
}
