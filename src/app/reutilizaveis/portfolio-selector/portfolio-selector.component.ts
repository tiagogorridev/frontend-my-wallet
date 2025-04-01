import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-portfolio-selector',
  templateUrl: './portfolio-selector.component.html',
  styleUrls: ['./portfolio-selector.component.scss']
})
export class PortfolioSelectorComponent implements OnInit {
  isDropdownOpen = false;
  selectedPortfolio = 'Carteira Principal';
  portfolios: string[] = [
    'Carteira Principal',
    'Carteira Reserva de Emergência',
    'Carteira Viagem',
    'Carteira Aposentadoria'
  ];

  showNewPortfolioModal = false;
  newPortfolioName = '';

  constructor() { }

  ngOnInit(): void {
    document.addEventListener('click', this.closeDropdownOnClickOutside.bind(this));
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.closeDropdownOnClickOutside.bind(this));
  }

  togglePortfolioDropdown(event?: Event): void {
    if (event) {
      event.stopPropagation();
    }
    this.isDropdownOpen = !this.isDropdownOpen;
  }

  selectPortfolio(portfolio: string): void {
    this.selectedPortfolio = portfolio;
    this.isDropdownOpen = false;
  }

  openNewPortfolioModal(): void {
    this.isDropdownOpen = false;
    this.showNewPortfolioModal = true;
    this.newPortfolioName = '';
  }

  closeNewPortfolioModal(): void {
    this.showNewPortfolioModal = false;
  }

  createNewPortfolio(): void {
    if (this.newPortfolioName.trim()) {
      this.portfolios.push(this.newPortfolioName.trim());
      this.selectedPortfolio = this.newPortfolioName.trim();
      this.closeNewPortfolioModal();
    }
  }

  closeDropdownOnClickOutside(event: Event): void {
    const target = event.target as HTMLElement;
    const portfolioSelector = document.querySelector('.portfolio-selector');

    if (portfolioSelector && !portfolioSelector.contains(target)) {
      this.isDropdownOpen = false;
    }
  }
}
