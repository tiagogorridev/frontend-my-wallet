import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Chart from 'chart.js/auto';

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

  private chartInstances: { [key: string]: Chart } = {};

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createPatrimonyEvolutionChart();
    this.createAssetsDistributionChart();
    this.createAnnualReturnChart();
    this.createCategoryDistributionChart();
  }

  @HostListener('document:click')
  onDocumentClick() {
    this.dropdowns.forEach(dropdown => dropdown.isOpen = false);
  }

  toggleDropdown(dropdown: any) {
    dropdown.isOpen = !dropdown.isOpen;
  }

  selectOption(dropdown: any, option: string) {
    dropdown.label = option;
    dropdown.isOpen = false;
    if (dropdown.onSelect) {
      dropdown.onSelect(option);
    }
  }

  private getMonthYearLabel(date: Date): string {
    const months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];
    return `${months[date.getMonth()]} / ${date.getFullYear()}`;
  }

  private createPatrimonyEvolutionChart() {
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

  private createAssetsDistributionChart() {
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

  private createAnnualReturnChart() {
    const ctx = this.annualReturnChartRef.nativeElement.getContext('2d');
    const data = {
      labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'],
      datasets: [{
        label: 'Rentabilidade 2024',
        data: [2.5, -1.2, 3.8, 1.5, 2.1, -0.8, 4.2, 1.9, 2.7, 3.1, -1.5, 2.9],
        backgroundColor: '#FFA500',
        borderRadius: 4
      }]
    };

    this.chartInstances['annualReturn'] = new Chart(ctx, {
      type: 'bar',
      data: data,
      options: this.getBarChartOptions()
    });
  }

  private createCategoryDistributionChart() {
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

  private getLineChartOptions() {
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

  private getBarChartOptions() {
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

  private getPieChartOptions() {
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

  private generateMonthlyValue(date: Date): number {
    const baseValue = 10000;
    const randomVariation = Math.random() * 2000 - 1000;
    return baseValue + randomVariation;
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

    this.updatePatrimonyChart(monthsToShow);
  }

  private updatePatrimonyChart(monthsToShow: number) {
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
}
