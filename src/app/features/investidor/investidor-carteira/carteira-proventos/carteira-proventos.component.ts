import { Component, OnInit, ViewChild, ElementRef, HostListener } from '@angular/core';
import Chart from 'chart.js/auto';

interface DropdownOption {
  label: string;
  options: string[];
  isOpen: boolean;
}

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

  selectedYear: number = new Date().getFullYear();
  selectedChartYear: number = new Date().getFullYear();

  dropdowns: DropdownOption[] = [
    {
      label: '12 MESES',
      options: ['3 MESES', '6 MESES', '12 MESES', '24 MESES'],
      isOpen: false
    },
    {
      label: 'TODOS',
      options: ['TODOS', 'DIVIDENDOS', 'JUROS'],
      isOpen: false
    }
  ];

  incomeDetailsDropdowns: DropdownOption[] = [
    {
      label: '12 MESES',
      options: ['3 MESES', '6 MESES', '12 MESES', '24 MESES'],
      isOpen: false
    },
    {
      label: 'TIPO DE RENDA',
      options: ['TODOS', 'DIVIDENDOS', 'JUROS'],
      isOpen: false
    }
  ];

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
  }


  toggleDropdown(dropdown: DropdownOption): void {
    this.dropdowns.forEach(dd => {
      if (dd !== dropdown) dd.isOpen = false;
    });

    dropdown.isOpen = !dropdown.isOpen;
  }

  selectOption(dropdown: DropdownOption, option: string): void {
    dropdown.label = option;
    dropdown.isOpen = false;

    if (dropdown === this.dropdowns[0]) {
      const monthMap: { [key: string]: number } = {
        '3 MESES': 3,
        '6 MESES': 6,
        '12 MESES': 12,
        '24 MESES': 24
      };
      const months = monthMap[option] || 12;
      this.updatePatrimonioChart(months);
    }
  }

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

  toggleIncomeDetailsDropdown(dropdown: DropdownOption): void {
    this.incomeDetailsDropdowns.forEach(dd => {
      if (dd !== dropdown) dd.isOpen = false;
    });

    dropdown.isOpen = !dropdown.isOpen;
  }

  selectIncomeDetailsOption(dropdown: DropdownOption, option: string): void {
    dropdown.label = option;
    dropdown.isOpen = false;
    this.filterIncomeData();
  }

  filterIncomeData(): void {
    const timeRangeFilter = this.incomeDetailsDropdowns[0].label;
    const incomeTypeFilter = this.incomeDetailsDropdowns[1].label;

    this.filteredIncomeData = this.incomeData.filter(income => {
      const incomeDate = this.parseDate(income.date);
      const currentDate = new Date();

      const timeRangeValid = this.isValidTimeRange(incomeDate, currentDate, timeRangeFilter);
      const incomeTypeValid = this.isValidIncomeType(income.incomeType, incomeTypeFilter);

      return timeRangeValid && incomeTypeValid;
    });
  }

  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event): void {
    this.dropdowns.forEach(dropdown => {
      dropdown.isOpen = false;
    });

    this.incomeDetailsDropdowns.forEach(dropdown => {
      dropdown.isOpen = false;
    });
  }



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
          label: 'Evolução do Patrimônio',
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
    const yearData = this.yearlyData[this.selectedYear];
    const prevYearData = this.yearlyData[this.selectedYear - 1];

    const summaryCards = [
      {
        value: yearData.totalReceived,
        comparisonText: this.calculatePercentageChange(prevYearData.totalReceived, yearData.totalReceived)
      },
      {
        value: yearData.monthlyAverage,
        comparisonText: this.calculatePercentageChange(prevYearData.monthlyAverage, yearData.monthlyAverage)
      },
      {
        value: yearData.yield,
        comparisonText: this.calculatePercentageChange(prevYearData.yield, yearData.yield)
      },
      {
        value: yearData.annualProjection,
        comparisonText: this.calculatePercentageChange(prevYearData.annualProjection, yearData.annualProjection)
      }
    ];

    const cardElements = document.querySelectorAll('.summary-card');
    cardElements.forEach((card, index) => {
      const valueElement = card.querySelector('.card-value') as HTMLElement;
      const comparisonElement = card.querySelector('.card-comparison') as HTMLElement;

      const data = summaryCards[index];

      valueElement.textContent = index === 2
        ? `${data.value.toFixed(1)}%`
        : `R$ ${data.value.toFixed(2)}`;

      comparisonElement.textContent = data.comparisonText;
      comparisonElement.classList.toggle('positive', !data.comparisonText.includes('-'));
    });
  }

  private updateMonthlyBars(): void {
    const yearData = this.yearlyData[this.selectedYear];
    const monthBarContainers = document.querySelectorAll('.month-bar');

    monthBarContainers.forEach((barContainer, index) => {
      const monthName = this.MONTHS[index];
      const monthData = yearData.monthlyData.find(m => m.month === monthName);

      if (monthData) {
        const barValue = barContainer.querySelector('.bar-value') as HTMLElement;
        const monthValueElement = barContainer.querySelector('.month-value') as HTMLElement;

        const maxValue = Math.max(...yearData.monthlyData.map(m => m.value));
        const heightPercentage = (monthData.value / maxValue) * 100;

        barValue.style.height = `${heightPercentage}%`;
        monthValueElement.textContent = `R$ ${monthData.value.toFixed(2)}`;

        barContainer.classList.toggle('future', index > new Date().getMonth());
        barValue.classList.toggle('future-bar', index > new Date().getMonth());
      }
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

  private calculatePercentageChange(oldValue: number, newValue: number): string {
    if (oldValue === 0) return '+0%';
    const change = ((newValue - oldValue) / oldValue) * 100;
    return `${change >= 0 ? '+' : ''}${change.toFixed(1)}%`;
  }

  private getChartLabels(monthsToShow: number): string[] {
    const labels: string[] = [];
    for (let i = monthsToShow - 1; i >= 0; i--) {
      const date = new Date(this.selectedChartYear, new Date().getMonth() - i, 1);
      labels.push(this.getMonthYearLabel(date));
    }
    return labels;
  }

  private getChartData(monthsToShow: number): number[] {
    const data: number[] = [];
    const yearData = this.yearlyData[this.selectedChartYear];

    for (let i = monthsToShow - 1; i >= 0; i--) {
      const date = new Date(this.selectedChartYear, new Date().getMonth() - i, 1);
      const monthName = this.MONTHS[date.getMonth()];

      const monthData = yearData.monthlyData.find(m => m.month === monthName);
      data.push(monthData ? monthData.value : 0);
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
}
