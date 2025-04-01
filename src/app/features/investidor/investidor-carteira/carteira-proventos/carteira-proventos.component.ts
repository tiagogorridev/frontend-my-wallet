import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js/auto';

interface MonthData {
  month: string;
  value: number;
}

interface YearData {
  totalReceived: number;
  monthlyAverage: number;
  yield: number;
  annualProjection: number;
  monthlyData: MonthData[];
}

interface Income {
  date: string;
  asset: string;
  incomeType: string;
  quantity: number;
  valuePerShare: number;
  totalValue: number;
  yield: number;
}

@Component({
  selector: 'app-carteira-proventos',
  templateUrl: './carteira-proventos.component.html',
  styleUrls: ['./carteira-proventos.component.scss']
})
export class CarteiraProventosComponent implements OnInit {
  @ViewChild('patrimonioChart', { static: true }) patrimonioChartRef!: ElementRef;

  private chartInstance: Chart | null = null;
  private readonly MONTHS = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'];

  // Variáveis para o ano selecionado
  selectedYear: number = new Date().getFullYear();

  // Opções para filtros de período
  periodoOptions: string[] = ['3 MESES', '6 MESES', '12 MESES', '24 MESES'];
  selectedPeriodo: string = '12 MESES';

  // Opções para os filtros da seção de detalhes
  tiposDetalheOptions: string[] = ['TODOS', 'DIVIDENDOS', 'JUROS', 'ALUGUÉIS'];
  selectedDetalhePeriodo: string = '12 MESES';
  selectedDetalheTipo: string = 'TODOS';

  // Dados de rendimento
  incomeData: Income[] = [
    {
      date: '20/03/2025',
      asset: 'PETR4',
      incomeType: 'Dividendo',
      quantity: 50,
      valuePerShare: 2.35,
      totalValue: 117.50,
      yield: 2.8
    },
    {
      date: '15/03/2025',
      asset: 'VALE3',
      incomeType: 'Dividendo',
      quantity: 30,
      valuePerShare: 1.85,
      totalValue: 55.50,
      yield: 2.8
    },
    {
      date: '10/03/2025',
      asset: 'Tesouro IPCA+',
      incomeType: 'Juros',
      quantity: 1,
      valuePerShare: 78.25,
      totalValue: 78.25,
      yield: 2.8
    },
    {
      date: '05/03/2025',
      asset: 'ITUB4',
      incomeType: 'Dividendo',
      quantity: 45,
      valuePerShare: 0.95,
      totalValue: 42.75,
      yield: 2.8
    },
    {
      date: '01/03/2025',
      asset: 'CDB Banco XYZ',
      incomeType: 'Juros',
      quantity: 1,
      valuePerShare: 55.80,
      totalValue: 55.80,
      yield: 2.8
    }
  ];

  filteredIncomeData: Income[] = [];
  monthlyData: MonthData[] = [];

  yearlyData: { [key: number]: YearData } = {
    2024: {
      totalReceived: 1195.50,
      monthlyAverage: 207.30,
      yield: 3.8,
      annualProjection: 2334.60,
      monthlyData: [
        { month: 'Jan', value: 125.40 },
        { month: 'Fev', value: 145.20 },
        { month: 'Mar', value: 285.75 },
        { month: 'Abr', value: 95.30 },
        { month: 'Mai', value: 125.80 },
        { month: 'Jun', value: 175.40 },
        { month: 'Jul', value: 165.20 },
        { month: 'Ago', value: 210.80 },
        { month: 'Set', value: 115.60 },
        { month: 'Out', value: 180.50 },
        { month: 'Nov', value: 230.20 },
        { month: 'Dez', value: 290.10 }
      ]
    },
    2025: {
      totalReceived: 1345.25,
      monthlyAverage: 224.20,
      yield: 4.3,
      annualProjection: 2690.50,
      monthlyData: [
        { month: 'Jan', value: 225.20 },
        { month: 'Fev', value: 165.20 },
        { month: 'Mar', value: 320.75 },
        { month: 'Abr', value: 95.30 },
        { month: 'Mai', value: 125.80 },
        { month: 'Jun', value: 175.40 },
        { month: 'Jul', value: 165.20 },
        { month: 'Ago', value: 220.80 },
        { month: 'Set', value: 115.60 },
        { month: 'Out', value: 190.50 },
        { month: 'Nov', value: 240.20 },
        { month: 'Dez', value: 300.10 }
      ]
    },
    2026: {
      totalReceived: 1495.80,
      monthlyAverage: 248.30,
      yield: 4.8,
      annualProjection: 2991.60,
      monthlyData: [
        { month: 'Jan', value: 5.40 },
        { month: 'Fev', value: 185.60 },
        { month: 'Mar', value: 350.75 },
        { month: 'Abr', value: 110.30 },
        { month: 'Mai', value: 145.80 },
        { month: 'Jun', value: 195.40 },
        { month: 'Jul', value: 185.20 },
        { month: 'Ago', value: 240.80 },
        { month: 'Set', value: 135.60 },
        { month: 'Out', value: 210.50 },
        { month: 'Nov', value: 260.20 },
        { month: 'Dez', value: 320.10 }
      ]
    }
  };

  constructor() {}

  ngOnInit(): void {
    this.createPatrimonioChart(12);
    this.updateIncomeSummaryCards();
    this.updateMonthlyBars();
    this.filteredIncomeData = [...this.incomeData];
    this.monthlyData = [...this.yearlyData[this.selectedYear].monthlyData];
  }

  // Métodos para os filtros do gráfico de evolução
  onPeriodoSelected(periodo: string): void {
    this.selectedPeriodo = periodo;
    const monthMap: { [key: string]: number } = {
      '3 MESES': 3,
      '6 MESES': 6,
      '12 MESES': 12,
      '24 MESES': 24
    };
    const months = monthMap[periodo] || 12;
    this.updatePatrimonioChart(months);
  }

  // Métodos para os filtros da seção de detalhes
  onDetalhePeriodoSelected(periodo: string): void {
    this.selectedDetalhePeriodo = periodo;
    this.filterIncomeData();
  }

  onDetalheTipoSelected(tipo: string): void {
    this.selectedDetalheTipo = tipo;
    this.filterIncomeData();
  }

  // Navegação entre anos
  navigatePrevYear(): void {
    const availableYears = Object.keys(this.yearlyData).map(Number);
    const currentIndex = availableYears.indexOf(this.selectedYear);

    if (currentIndex > 0) {
      this.selectedYear = availableYears[currentIndex - 1];
      this.updateIncomeSummaryCards();
      this.updateMonthlyBars();
    }
  }

  navigateNextYear(): void {
    const availableYears = Object.keys(this.yearlyData).map(Number);
    const currentIndex = availableYears.indexOf(this.selectedYear);

    if (currentIndex < availableYears.length - 1) {
      this.selectedYear = availableYears[currentIndex + 1];
      this.updateIncomeSummaryCards();
      this.updateMonthlyBars();
    }
  }

  // Verificar se um mês é futuro
  isFutureMonth(monthIndex: number): boolean {
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    return (this.selectedYear > currentYear) ||
           (this.selectedYear === currentYear && monthIndex > currentMonth);
  }

  // Obter altura proporcional para as barras
  getBarHeight(value: number): number {
    const maxValue = Math.max(...this.yearlyData[this.selectedYear].monthlyData.map(m => m.value));
    return (value / maxValue) * 100;
  }

  // Obter a classe CSS para comparação de valores
  getComparisonClass(currentValue: number, prevValue: number | undefined): string {
    if (!prevValue) return 'neutral';
    return currentValue >= prevValue ? 'positive' : 'negative';
  }

  // Calcular variação percentual
  calculatePercentageChange(oldValue: number | undefined, newValue: number): string {
    if (!oldValue || oldValue === 0) return '+0%';
    const change = ((newValue - oldValue) / oldValue) * 100;
    return `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
  }

  // Filtrar dados de rendimento
  private filterIncomeData(): void {
    this.filteredIncomeData = this.incomeData.filter(income => {
      const incomeDate = this.parseDate(income.date);
      const currentDate = new Date();

      const timeRangeValid = this.isValidTimeRange(incomeDate, currentDate, this.selectedDetalhePeriodo);
      const incomeTypeValid = this.isValidIncomeType(income.incomeType, this.selectedDetalheTipo);

      return timeRangeValid && incomeTypeValid;
    });
  }

  private parseDate(dateString: string): Date {
    const [day, month, year] = dateString.split('/').map(Number);
    return new Date(year, month - 1, day);
  }

  private isValidTimeRange(incomeDate: Date, currentDate: Date, timeRangeFilter: string): boolean {
    const monthsDiff = this.monthsDifference(incomeDate, currentDate);

    switch (timeRangeFilter) {
      case '3 MESES': return monthsDiff <= 3;
      case '6 MESES': return monthsDiff <= 6;
      case '12 MESES': return monthsDiff <= 12;
      case '24 MESES': return monthsDiff <= 24;
      default: return true;
    }
  }

  private isValidIncomeType(incomeType: string, incomeTypeFilter: string): boolean {
    switch (incomeTypeFilter) {
      case 'TODOS': return true;
      case 'DIVIDENDOS': return incomeType === 'Dividendo';
      case 'JUROS': return incomeType === 'Juros';
      case 'ALUGUÉIS': return incomeType === 'Aluguel';
      default: return true;
    }
  }

  private monthsDifference(date1: Date, date2: Date): number {
    return Math.abs(
      (date2.getFullYear() - date1.getFullYear()) * 12 +
      (date2.getMonth() - date1.getMonth())
    );
  }

  // Criar e atualizar gráficos
  private createPatrimonioChart(monthsToShow: number): void {
    const ctx = this.patrimonioChartRef.nativeElement.getContext('2d');

    if (this.chartInstance) {
      this.chartInstance.destroy();
    }

    const labels = this.getChartLabels(monthsToShow);
    const data = this.getChartData(monthsToShow);

    this.chartInstance = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          label: 'Evolução dos Proventos',
          data: data,
          borderColor: '#FFA500',
          backgroundColor: 'rgba(255, 165, 0, 0.2)',
          tension: 0.4,
          fill: true
        }]
      },
      options: this.getChartOptions()
    });
  }

  private updatePatrimonioChart(monthsToShow: number): void {
    if (!this.chartInstance) return;

    const labels = this.getChartLabels(monthsToShow);
    const data = this.getChartData(monthsToShow);

    this.chartInstance.data.labels = labels;
    this.chartInstance.data.datasets[0].data = data;
    this.chartInstance.update();
  }

  private updateIncomeSummaryCards(): void {
    // Já implementado via HTML e binding
  }

  private updateMonthlyBars(): void {
    this.monthlyData = [...this.yearlyData[this.selectedYear].monthlyData];
  }

  private getChartLabels(monthsToShow: number): string[] {
    const labels: string[] = [];
    const currentDate = new Date();

    for (let i = monthsToShow - 1; i >= 0; i--) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1
      );
      labels.push(this.getMonthYearLabel(date));
    }
    return labels;
  }

  private getChartData(monthsToShow: number): number[] {
    const data: number[] = [];
    const currentDate = new Date();

    for (let i = monthsToShow - 1; i >= 0; i--) {
      const date = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() - i,
        1
      );

      const year = date.getFullYear();
      const monthName = this.MONTHS[date.getMonth()];

      // Verificar se temos dados para este ano
      if (this.yearlyData[year]) {
        const monthData = this.yearlyData[year].monthlyData.find(m => m.month === monthName);
        data.push(monthData ? monthData.value : 0);
      } else {
        data.push(0);
      }
    }

    return data;
  }

  private getMonthYearLabel(date: Date): string {
    return `${this.MONTHS[date.getMonth()]} / ${date.getFullYear()}`;
  }

  private getChartOptions(): any {
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
            callback: function(value: number) {
              return 'R$ ' + Number(value).toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 });
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

  private getMonthsFromPeriodo(periodo: string): number {
    const monthMap: { [key: string]: number } = {
      '3 MESES': 3,
      '6 MESES': 6,
      '12 MESES': 12,
      '24 MESES': 24
    };
    return monthMap[periodo] || 12;
  }
}
