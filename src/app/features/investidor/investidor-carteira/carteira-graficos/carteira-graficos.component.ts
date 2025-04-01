import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import Chart from 'chart.js/auto';

interface AssetCategory {
  name: string;
  isExpanded: boolean;
}

interface LegendItem {
  class: string;
  label: string;
  percentage: number;
}

interface PerformanceItem {
  periodo: string;
  rentabilidade: string;
  cdi: string;
  ibovespa: string;
  sp500: string;
  bitcoin: string;
}

interface CryptoAsset {
  symbol: string;
  quantidade: number;
  precoMedio: number;
  precoAtual: number;
  variacao: string;
  rentabilidade: string;
  saldo: number;
  variacao24h: string;
  variacao30d: string;
  nota: number;
  percentCarteira: string;
  percentIdeal: string;
  comprar: string;
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

  assetCategories: AssetCategory[] = [
    { name: 'FIS', isExpanded: false },
    { name: 'CRIPTOMOEDAS', isExpanded: false },
    { name: 'AÇÕES', isExpanded: false },
    { name: 'RENDA FIXA', isExpanded: false }
  ];

  assetDistributionLegend: LegendItem[] = [
    { class: 'crypto', label: 'Criptomoedas', percentage: 50 },
    { class: 'fixed-income', label: 'Renda Fixa', percentage: 50 }
  ];

  categoryDistributionLegend: LegendItem[] = [
    { class: 'stocks', label: 'Ações', percentage: 30 },
    { class: 'crypto', label: 'Criptomoedas', percentage: 40 },
    { class: 'fixed-income', label: 'Renda Fixa', percentage: 30 }
  ];

  private fullPerformanceData: PerformanceItem[] = [
    {
      periodo: 'Janeiro 2024',
      rentabilidade: '+2.3%',
      cdi: '+0.8%',
      ibovespa: '+1.5%',
      sp500: '+2.1%',
      bitcoin: '+5.2%'
    },
    {
      periodo: 'Fevereiro 2024',
      rentabilidade: '+1.7%',
      cdi: '+0.6%',
      ibovespa: '+1.8%',
      sp500: '+1.9%',
      bitcoin: '+4.5%'
    },
    {
      periodo: 'Janeiro 2025',
      rentabilidade: '+1.5%',
      cdi: '+0.7%',
      ibovespa: '+0.9%',
      sp500: '+1.8%',
      bitcoin: '+6.2%'
    },
    {
      periodo: 'Fevereiro 2025',
      rentabilidade: '-1.2%',
      cdi: '+0.7%',
      ibovespa: '-2.1%',
      sp500: '-1.5%',
      bitcoin: '-3.8%'
    },
    {
      periodo: 'Março 2025',
      rentabilidade: '+1.8%',
      cdi: '+0.8%',
      ibovespa: '+1.2%',
      sp500: '+1.7%',
      bitcoin: '+7.4%'
    }
  ];

  performanceTableData: PerformanceItem[] = [];

  cryptoAssets: CryptoAsset[] = [
    {
      symbol: 'BTC',
      quantidade: 0.05,
      precoMedio: 78500,
      precoAtual: 80000,
      variacao: '+1.91%',
      rentabilidade: '+1.91%',
      saldo: 4000,
      variacao24h: '+2.3%',
      variacao30d: '+15.7%',
      nota: 9,
      percentCarteira: '40.00%',
      percentIdeal: '30.00%',
      comprar: 'NÃO'
    },
    {
      symbol: 'ETH',
      quantidade: 0.5,
      precoMedio: 4120,
      precoAtual: 4000,
      variacao: '-2.91%',
      rentabilidade: '-2.91%',
      saldo: 2000,
      variacao24h: '-1.2%',
      variacao30d: '+5.4%',
      nota: 8,
      percentCarteira: '20.00%',
      percentIdeal: '15.00%',
      comprar: 'SIM'
    },
    {
      symbol: 'UNI',
      quantidade: 20,
      precoMedio: 50,
      precoAtual: 45,
      variacao: '-10.00%',
      rentabilidade: '-10.00%',
      saldo: 900,
      variacao24h: '-2.50%',
      variacao30d: '-8.70%',
      nota: 7,
      percentCarteira: '9.00%',
      percentIdeal: '5.00%',
      comprar: 'NÃO'
    }
  ];

  private chartInstances: { [key: string]: Chart } = {};
  private readonly months = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  constructor() {}

  ngOnInit(): void {
    this.initializeCharts();
    this.updatePerformanceTable('12 MESES');
  }

  private initializeCharts(): void {
    this.createPatrimonyEvolutionChart();
    this.createAssetsDistributionChart();
    this.createAnnualReturnChart();
    this.createCategoryDistributionChart();
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
    const monthsMap: { [key: string]: number } = {
      '3 MESES': 3,
      '6 MESES': 6,
      '12 MESES': 12,
      '24 MESES': 24
    };

    const monthsToShow = monthsMap[timeframe] || 12;

    this.performanceTableData = this.fullPerformanceData
      .slice(-monthsToShow);

    console.log(`Performance table filtered by: ${timeframe} - showing ${monthsToShow} months`);
  }

  onAssetAdded(assetData: any) {
    console.log('Novo ativo adicionado:', assetData);
  }

  getValueClass(value: string): string {
    if (value.startsWith('+')) {
      return 'positive';
    } else if (value.startsWith('-')) {
      return 'negative';
    }
    return '';
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
        labels: this.assetDistributionLegend.map(item => item.label),
        datasets: [{
          data: this.assetDistributionLegend.map(item => item.percentage),
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
          label: 'Rentabilidade 2025',
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
        labels: this.categoryDistributionLegend.map(item => item.label),
        datasets: [{
          data: this.categoryDistributionLegend.map(item => item.percentage),
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
