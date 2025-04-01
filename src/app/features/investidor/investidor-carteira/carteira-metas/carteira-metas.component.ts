import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

interface Goal {
  id: number;
  title: string;
  subtitle: string;
  icon: string;
  currentValue: number;
  targetValue: number;
  targetDate: string;
  strategy: string;
  status: 'in_progress' | 'completed';
}

@Component({
  selector: 'app-carteira-metas',
  templateUrl: './carteira-metas.component.html',
  styleUrls: ['./carteira-metas.component.scss']
})
export class CarteiraMetasComponent implements OnInit {

  addGoalForm: FormGroup;
  editGoalForm: FormGroup;
  isAddGoalModalOpen = false;
  isEditGoalModalOpen = false;
  currentEditingGoal: Goal | null = null;

  assetTypes = [
    { value: 'renda_fixa', label: 'Renda Fixa' },
    { value: 'criptoativos', label: 'Criptoativos' },
    { value: 'fiis', label: 'FIIS' },
    { value: 'tesouro_direto', label: 'Tesouro Direto' }
  ];

  termOptions = [
    { value: 'curto', label: 'Curto Prazo (até 1 ano)' },
    { value: 'medio', label: 'Médio Prazo (1-3 anos)' },
    { value: 'longo', label: 'Longo Prazo (acima de 3 anos)' }
  ];

  goals: Goal[] = [
    {
      id: 1,
      title: 'Reserva de Emergência',
      subtitle: 'Curto prazo • Essencial',
      icon: 'reserve',
      currentValue: 3500,
      targetValue: 6000,
      targetDate: '31/12/2025',
      strategy: '100% Renda Fixa',
      status: 'in_progress'
    },
    {
      id: 2,
      title: 'Viagem para Europa',
      subtitle: 'Médio prazo • Lazer',
      icon: 'vacation',
      currentValue: 15000,
      targetValue: 15000,
      targetDate: '15/01/2025',
      strategy: '70% RF / 30% Criptos',
      status: 'completed'
    },
    {
      id: 3,
      title: 'Entrada para Imóvel',
      subtitle: 'Longo prazo • Patrimonial',
      icon: 'house',
      currentValue: 35000,
      targetValue: 100000,
      targetDate: '01/01/2028',
      strategy: '60% RF / 30% FIIs / 10% Ações',
      status: 'in_progress'
    }
  ];

  filteredGoals: Goal[] = [];
  currentFilter: 'all' | 'in_progress' | 'completed' = 'all';

  constructor(private fb: FormBuilder) {
    this.addGoalForm = this.fb.group({
      title: ['', [Validators.required, Validators.minLength(3)]],
      assetType: ['', Validators.required],
      term: ['', Validators.required],
      completionDate: ['', Validators.required],
      targetValue: ['', [Validators.required, Validators.min(0)]]
    });

    this.editGoalForm = this.fb.group({
      id: [''],
      title: ['', [Validators.required, Validators.minLength(3)]],
      term: ['', Validators.required],
      completionDate: ['', Validators.required],
      targetValue: ['', [Validators.required, Validators.min(0)]],
      currentValue: ['', [Validators.required, Validators.min(0)]],
      assetType: ['', Validators.required]
    });
  }

  ngOnInit() {
    this.applyFilter('all');
  }

  openAddGoalModal() {
    this.isAddGoalModalOpen = true;
  }

  openEditGoalModal(goal: Goal) {
    this.currentEditingGoal = goal;

    let [day, month, year] = goal.targetDate.split('/');
    let formattedDate = `${year}-${month}-${day}`;

    let assetType = '';
    if (goal.strategy.includes('Renda Fixa')) {
      assetType = 'renda_fixa';
    } else if (goal.strategy.includes('Criptos')) {
      assetType = 'criptoativos';
    } else if (goal.strategy.includes('FIIs')) {
      assetType = 'fiis';
    }

    let term = '';
    if (goal.subtitle.includes('Curto prazo')) {
      term = 'curto';
    } else if (goal.subtitle.includes('Médio prazo')) {
      term = 'medio';
    } else if (goal.subtitle.includes('Longo prazo')) {
      term = 'longo';
    }

    this.editGoalForm.setValue({
      id: goal.id,
      title: goal.title,
      term: term,
      completionDate: formattedDate,
      targetValue: goal.targetValue,
      currentValue: goal.currentValue,
      assetType: assetType
    });

    this.isEditGoalModalOpen = true;
  }

  closeModal() {
    this.isAddGoalModalOpen = false;
    this.isEditGoalModalOpen = false;
    this.addGoalForm.reset();
    this.editGoalForm.reset();
    this.currentEditingGoal = null;
  }

  onSubmit() {
    if (this.addGoalForm.valid) {
      const titleControl = this.addGoalForm.get('title');
      const termControl = this.addGoalForm.get('term');
      const targetValueControl = this.addGoalForm.get('targetValue');
      const completionDateControl = this.addGoalForm.get('completionDate');
      const assetTypeControl = this.addGoalForm.get('assetType');

      const newGoal: Goal = {
        id: this.goals.length + 1,
        title: titleControl?.value ?? '',
        subtitle: `${termControl?.value ?? ''} prazo`,
        icon: 'custom',
        currentValue: 0,
        targetValue: targetValueControl?.value ?? 0,
        targetDate: completionDateControl?.value ?? '',
        strategy: assetTypeControl?.value ?? '',
        status: 'in_progress'
      };

      this.goals.push(newGoal);
      this.applyFilter(this.currentFilter);
      this.closeModal();
    }
  }

  onSubmitEdit() {
    if (this.editGoalForm.valid && this.currentEditingGoal) {
      const id = this.editGoalForm.get('id')?.value;
      const title = this.editGoalForm.get('title')?.value;
      const term = this.editGoalForm.get('term')?.value;
      const targetValue = this.editGoalForm.get('targetValue')?.value;
      const currentValue = this.editGoalForm.get('currentValue')?.value;
      const completionDate = this.editGoalForm.get('completionDate')?.value;
      const assetType = this.editGoalForm.get('assetType')?.value;

      let dateObj = new Date(completionDate);
      let formattedDate = `${String(dateObj.getDate()).padStart(2, '0')}/${String(dateObj.getMonth() + 1).padStart(2, '0')}/${dateObj.getFullYear()}`;
      let strategy = '';
      switch(assetType) {
        case 'renda_fixa':
          strategy = '100% Renda Fixa';
          break;
        case 'renda_variavel':
          strategy = '100% Renda Variável';
          break;
        case 'criptoativos':
          strategy = '100% Criptoativos';
          break;
        case 'fiis':
          strategy = '100% FIIs';
          break;
        case 'tesouro_direto':
          strategy = '100% Tesouro Direto';
          break;
      }

      let termText = '';
      switch(term) {
        case 'curto':
          termText = 'Curto prazo';
          break;
        case 'medio':
          termText = 'Médio prazo';
          break;
        case 'longo':
          termText = 'Longo prazo';
          break;
      }

      let category = this.currentEditingGoal.subtitle.split('•')[1]?.trim() || '';
      let subtitle = `${termText} • ${category}`;

      const index = this.goals.findIndex(g => g.id === id);
      if (index !== -1) {
        this.goals[index] = {
          ...this.goals[index],
          title,
          subtitle,
          targetValue,
          currentValue,
          targetDate: formattedDate,
          strategy,
          status: currentValue >= targetValue ? 'completed' : 'in_progress'
        };
      }

      this.applyFilter(this.currentFilter);

      this.closeModal();
    }
  }

  isFieldInvalid(controlName: string, form: FormGroup = this.addGoalForm): boolean {
    const control = form.get(controlName);
    return !!(control && control.invalid && control.touched);
  }

  applyFilter(filter: 'all' | 'in_progress' | 'completed') {
    this.currentFilter = filter;

    switch (filter) {
      case 'all':
        this.filteredGoals = this.goals;
        break;
      case 'in_progress':
        this.filteredGoals = this.goals.filter(goal => goal.status === 'in_progress');
        break;
      case 'completed':
        this.filteredGoals = this.goals.filter(goal => goal.status === 'completed');
        break;
    }
  }

  calculateProgressPercentage(goal: Goal): number {
    return (goal.currentValue / goal.targetValue) * 100;
  }
}
