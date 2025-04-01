import { Component, OnInit, HostListener } from '@angular/core';
import { FormGroup } from '@angular/forms';

interface Lancamento {
  data: string;
  tipo: 'Compra' | 'Venda' | 'Dividendo';
  ativo: string;
  descricao: string;
  quantidade: number;
  valorUnitario: number;
  valorTotal: number;
  categoria: 'Criptomoedas' | 'Fundos Imobiliários' | 'Ações' | 'Renda Fixa';
}

interface Dropdown {
  label: string;
  options: string[];
  isOpen: boolean;
  onSelect: (option: string) => void;
}

@Component({
  selector: 'app-carteira-lancamentos',
  templateUrl: './carteira-lancamentos.component.html',
  styleUrls: ['./carteira-lancamentos.component.scss']
})
export class CarteiraLancamentosComponent implements OnInit {
  lancamentos: Lancamento[] = [
    {
      data: '20/11/2024',
      tipo: 'Compra',
      ativo: 'BTC',
      descricao: 'Compra de Bitcoin',
      quantidade: 0.05,
      valorUnitario: 78500.00,
      valorTotal: 3925.00,
      categoria: 'Criptomoedas'
    },
    {
      data: '15/03/2025',
      tipo: 'Venda',
      ativo: 'ETH',
      descricao: 'Venda de Ethereum',
      quantidade: 0.8,
      valorUnitario: 4120.00,
      valorTotal: 3296.00,
      categoria: 'Criptomoedas'
    },
    {
      data: '10/03/2025',
      tipo: 'Dividendo',
      ativo: 'PETR4',
      descricao: 'Dividendo Petrobras',
      quantidade: 50,
      valorUnitario: 2.35,
      valorTotal: 117.50,
      categoria: 'Ações'
    },
    {
      data: '01/03/2025',
      tipo: 'Compra',
      ativo: 'VALE3',
      descricao: 'Compra de Vale',
      quantidade: 30,
      valorUnitario: 68.75,
      valorTotal: 2062.50,
      categoria: 'Ações'
    }
  ];

  categorias: string[] = ['Criptomoedas', 'Fundos Imobiliários', 'Ações', 'Renda Fixa'];
  categoriaSelecionada: string = 'Criptomoedas';
  periodoMeses: number = 12;
  ativoFilter: string | null = null;
  tipoFilter: string | null = null;

  dropdowns: Dropdown[] = [
    {
      label: '12 MESES',
      options: ['3 MESES', '6 MESES', '12 MESES', '24 MESES'],
      isOpen: false,
      onSelect: (option: string) => this.updatePeriod(option)
    },
    {
      label: 'TODOS',
      options: ['TODOS', 'CRIPTOS', 'FIIS', 'AÇÕES', 'RENDA FIXA'],
      isOpen: false,
      onSelect: (option: string) => this.updateAtivoFilter(option)
    }
  ];

  constructor() {}

  ngOnInit(): void {
    this.filtrarLancamentos();
    document.addEventListener('click', this.closeDropdowns.bind(this));
  }

  ngOnDestroy(): void {
    document.removeEventListener('click', this.closeDropdowns.bind(this));
  }

  onAssetAdded(assetData: any) {
    console.log('Novo ativo adicionado:', assetData);
  }

  @HostListener('document:keydown.escape')
  handleEscapeKey(): void {
    this.closeDropdowns();
  }

  closeDropdowns(): void {
    this.dropdowns.forEach(dropdown => {
      dropdown.isOpen = false;
    });
  }

  toggleDropdown(dropdown: Dropdown): void {
    this.dropdowns.forEach(dd => {
      if (dd !== dropdown) {
        dd.isOpen = false;
      }
    });
    dropdown.isOpen = !dropdown.isOpen;
  }

  selectOption(dropdown: Dropdown, option: string): void {
    dropdown.label = option;
    dropdown.isOpen = false;
    dropdown.onSelect(option);
  }

  parseDataBR(dataString: string): Date {
    const [dia, mes, ano] = dataString.split('/').map(Number);
    return new Date(ano, mes - 1, dia);
  }

  updatePeriod(periodOption: string): void {
    const periodMap: Record<string, number> = {
      '3 MESES': 3,
      '6 MESES': 6,
      '12 MESES': 12,
      '24 MESES': 24
    };

    this.periodoMeses = periodMap[periodOption] || 12;
    console.log('Período selecionado:', this.periodoMeses, 'meses');
  }

  updateAtivoFilter(ativoOption: string): void {
    console.log('Ativo selecionado:', ativoOption);

    const ativoMap: Record<string, string | null> = {
      'TODOS': null,
      'CRIPTOS': 'Criptomoedas',
      'RENDA FIXA': 'Renda Fixa',
      'AÇÕES': 'Ações',
      'FIIS': 'Fundos Imobiliários'
    };

    this.ativoFilter = ativoMap[ativoOption] || null;
    this.categoriaSelecionada = this.ativoFilter || 'Criptomoedas';
  }

  updateTipoFilter(tipoOption: string): void {
    console.log('Tipo de transação selecionado:', tipoOption);

    const tipoMap: Record<string, string | null> = {
      'TODOS': null,
      'COMPRAS': 'Compra',
      'VENDAS': 'Venda',
      'DIVIDENDOS': 'Dividendo'
    };

    this.tipoFilter = tipoMap[tipoOption] || null;
  }

  filtrarLancamentos(): Lancamento[] {
    const hoje = new Date();
    const dataLimite = new Date();
    dataLimite.setMonth(hoje.getMonth() - this.periodoMeses);

    return this.lancamentos.filter(lancamento => {
      const dataLancamento = this.parseDataBR(lancamento.data);
      const dataMatch = dataLancamento >= dataLimite;

      let categoriaMatch = true;
      if (this.ativoFilter) {
        categoriaMatch = lancamento.categoria === this.ativoFilter;
      } else if (this.categoriaSelecionada) {
        categoriaMatch = lancamento.categoria === this.categoriaSelecionada;
      }

      const tipoMatch = this.tipoFilter ? lancamento.tipo === this.tipoFilter : true;

      return dataMatch && categoriaMatch && tipoMatch;
    });
  }

  selecionarCategoria(categoria: string): void {
    this.categoriaSelecionada = categoria;

    const categoriaMap: Record<string, string> = {
      'Criptomoedas': 'CRIPTOS',
      'Fundos Imobiliários': 'FUNDOS IMOB',
      'Ações': 'AÇÕES',
      'Renda Fixa': 'RENDA FIXA'
    };

    const filtroIndex = this.dropdowns.findIndex(dropdown =>
      dropdown.label === 'TODOS' || dropdown.options.includes('TODOS'));

    if (filtroIndex !== -1) {
      this.dropdowns[filtroIndex].label = categoriaMap[categoria] || 'TODOS';
      this.ativoFilter = categoria;
    }
  }

  calcularTotalInvestido(lancamentos: Lancamento[]): number {
    return lancamentos.reduce((total, lancamento) =>
      lancamento.tipo === 'Compra' ? total + lancamento.valorTotal : total, 0);
  }

  calcularTotalResgatado(lancamentos: Lancamento[]): number {
    return lancamentos.reduce((total, lancamento) =>
      lancamento.tipo === 'Venda' ? total + lancamento.valorTotal : total, 0);
  }

  calcularDividendos(lancamentos: Lancamento[]): number {
    return lancamentos.reduce((total, lancamento) =>
      lancamento.tipo === 'Dividendo' ? total + lancamento.valorTotal : total, 0);
  }
}
