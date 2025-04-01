import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder } from '@angular/forms';
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

  assetCategories: AssetCategory[] = [
    { name: 'FIIS', isExpanded: false },
    { name: 'CRIPTOMOEDAS', isExpanded: false }
  ];

  private chartInstance: Chart | null = null;
  private pieChartInstance: Chart | null = null;

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createPatrimonioChart();
    this.createAssetsDistributionChart();
  }

  onAssetAdded(assetData: any) {
    console.log('Novo ativo adicionado:', assetData);
  }

  onPeriodoSelected(option: string) {
    this.updateChartByPeriod(option);
  }

  updateChartByPeriod(periodOption: string) {
    let monthsToShow: number;
    switch(periodOption) {
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
    this.pieChartInstance = new Chart(ctx, {
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
