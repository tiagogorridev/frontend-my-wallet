import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Chart from 'chart.js/auto';

interface AssetCategory {
  name: string;
  isExpanded: boolean;
}

interface Dropdown {
  label: string;
  options: string[];
  isOpen: boolean;
  onSelect?: (option: string) => void;
}

@Component({
  selector: 'app-carteira-graficos',
  templateUrl: './carteira-graficos.component.html',
  styleUrls: ['./carteira-graficos.component.scss']
})
export class CarteiraGraficosComponent implements OnInit {
  @ViewChild('patrimonyEvolutionChart', { static: true }) patrimonyEvolutionChartRef!: ElementRef;
  @ViewChild('assetsDistributionChart', { static: true }) assetsDistributionChartRef!: ElementRef;
  @ViewChild('annualReturnChart', { static: true }) annualReturnChartRef!: ElementRef;
  @ViewChild('categoryDistributionChart', { static: true }) categoryDistributionChartRef!: ElementRef;

  isModalOpen = false;
  assetForm!: FormGroup;

  assetTypes = [
    { value: 'crypto', label: 'Criptomoeda' },
    { value: 'fixed-income', label: 'Renda Fixa' },
    { value: 'stocks', label: 'Ações' },
    { value: 'fiis', label: 'FIIS' }
  ];

  dropdowns: Dropdown[] = [
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
    },
    {
      label: '12 MESES',
      options: ['3 MESES', '6 MESES', '12 MESES', '24 MESES'],
      isOpen: false,
      onSelect: (option: string) => this.updatePerformanceTable(option)
    }
  ];

  assetCategories: AssetCategory[] = [
    { name: 'FIS', isExpanded: false },
    { name: 'CRIPTOMOEDAS', isExpanded: false }
  ];

  private chartInstances: { [key: string]: Chart } = {};
  private readonly months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.initForm();
    this.initializeCharts();
  }

  private initializeCharts(): void {
    this.createPatrimonyEvolutionChart();
    this.createAssetsDistributionChart();
    this.createAnnualReturnChart();
    this.createCategoryDistributionChart();
  }

  initForm(): void {
    this.assetForm = this.fb.group({
      type: ['', Validators.required],
      name: ['', Validators.required],
      currentPrice: ['', [Validators.required, Validators.min(0)]],
      purchaseDate: ['', Validators.required],
      quantity: ['', [Validators.required, Validators.min(0)]],
      purchaseValue: ['', [Validators.required, Validators.min(0)]]
    });
  }

  onSubmit(): void {
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

  @HostListener('document:keydown.escape')
  handleEscapeKey(): void {
    if (this.isModalOpen) {
      this.closeModal();
    }
  }

  @HostListener('document:click')
  onDocumentClick(): void {
    this.dropdowns.forEach(dropdown => dropdown.isOpen = false);
  }

  openModal(): void {
    this.initForm();
    this.isModalOpen = true;
  }

  closeModal(): void {
    this.isModalOpen = false;
    this.assetForm.reset();
  }

  toggleDropdown(dropdown: Dropdown): void {
    dropdown.isOpen = !dropdown.isOpen;
  }

  selectOption(dropdown: Dropdown, option: string): void {
    dropdown.label = option;
    dropdown.isOpen = false;
    if (dropdown.onSelect) {
      dropdown.onSelect(option);
    }
  }

  toggleCategoryExpansion(category: AssetCategory): void {
    this.assetCategories.forEach(cat => {
      if (cat !== category) {
        cat.isExpanded = false;
      }
    });
    category.isExpanded = !category.isExpanded;
  }

  updateChartMonths(monthOption: string): void {
    const monthsMap: { [key: string]: number } = {
      '3 MESES': 3,
      '6 MESES': 6,
      '12 MESES': 12,
      '24 MESES': 24
    };

    const monthsToShow = monthsMap[monthOption] || 12;
    this.updatePatrimonyChart(monthsToShow);
  }

  updatePerformanceTable(timeframe: string): void {
    console.log(`Performance table filtered by: ${timeframe}`);
  }

  private getMonthYearLabel(date: Date): string {
    return `${this.months[date.getMonth()]} / ${date.getFullYear()}`;
  }

  private generateMonthlyValue(date: Date): number {
    const baseValue = 10000;
    const randomVariation = Math.random() * 2000 - 1000;
    return baseValue + randomVariation;
  }

  private updatePatrimonyChart(monthsToShow: number): void {
    const chart = this.chartInstances['patrimony'];
    if (!chart) return;

    const today = new Date();
    const labels = [];
    const data = [];

    for (let i = monthsToShow - 1; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      labels.push(this.getMonthYearLabel(date));
      data.push(this.generateMonthlyValue(date));
    }

    chart.data.labels = labels;
    chart.data.datasets[0].data = data;
    chart.update();
  }

  private createPatrimonyEvolutionChart(): void {
    const ctx = this.patrimonyEvolutionChartRef.nativeElement.getContext('2d');
    const today = new Date();
    const labels = [];
    const data = [];

    for (let i = 11; i >= 0; i--) {
      const date = new Date(today.getFullYear(), today.getMonth() - i, 1);
      labels.push(this.getMonthYearLabel(date));
      data.push(this.generateMonthlyValue(date));
    }

    this.chartInstances['patrimony'] = new Chart(ctx, {
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
      options: this.getLineChartOptions()
    });
  }

  private createAssetsDistributionChart(): void {
    const ctx = this.assetsDistributionChartRef.nativeElement.getContext('2d');
    this.chartInstances['assets'] = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Criptomoedas', 'Renda Fixa'],
        datasets: [{
          data: [50, 50],
          backgroundColor: ['#FFA500', '#6b7280'],
          hoverOffset: 4
        }]
      },
      options: this.getPieChartOptions()
    });
  }

  private createAnnualReturnChart(): void {
    const ctx = this.annualReturnChartRef.nativeElement.getContext('2d');
    this.chartInstances['annualReturn'] = new Chart(ctx, {
      type: 'bar',
      data: {
        labels: this.months,
        datasets: [{
          label: 'Rentabilidade 2024',
          data: [2.5, -1.2, 3.8, 1.5, 2.1, -0.8, 4.2, 1.9, 2.7, 3.1, -1.5, 2.9],
          backgroundColor: '#FFA500',
          borderRadius: 4
        }]
      },
      options: this.getBarChartOptions()
    });
  }

  private createCategoryDistributionChart(): void {
    const ctx = this.categoryDistributionChartRef.nativeElement.getContext('2d');
    this.chartInstances['category'] = new Chart(ctx, {
      type: 'pie',
      data: {
        labels: ['Ações', 'Criptomoedas', 'Renda Fixa'],
        datasets: [{
          data: [30, 40, 30],
          backgroundColor: ['#22C55E', '#FFA500', '#6b7280'],
          hoverOffset: 4
        }]
      },
      options: this.getPieChartOptions()
    });
  }

  private getLineChartOptions(): any {
    return {
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
            callback: function(value: any) {
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
    };
  }

  private getBarChartOptions(): any {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: {
            color: '#FFFFFF',
            callback: function(value: any) {
              return value + '%';
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
    };
  }

  private getPieChartOptions(): any {
    return {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        }
      }
    };
  }
}
