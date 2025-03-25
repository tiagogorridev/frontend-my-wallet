import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// Admin
import { AdminBuscarInvestidoresComponent } from './features/admin/admin-buscar-investidores/admin-buscar-investidores.component';
import { AdminProfileComponent } from './features/admin/admin-profile/admin-profile.component';

// Investidor
import { InvestidorProfileComponent } from './features/investidor/investidor-profile/investidor-profile.component';
import { InvestidorHomeComponent } from './features/investidor/investidor-home/investidor-home.component';
import { CarteiraResumoComponent } from './features/investidor/investidor-carteira/carteira-resumo/carteira-resumo.component';
import { CarteiraProventosComponent } from './features/investidor/investidor-carteira/carteira-proventos/carteira-proventos.component';
import { CarteiraGraficosComponent } from './features/investidor/investidor-carteira/carteira-graficos/carteira-graficos.component';
import { CarteiraMetasComponent } from './features/investidor/investidor-carteira/carteira-metas/carteira-metas.component';
import { CarteiraLancamentosComponent } from './features/investidor/investidor-carteira/carteira-lancamentos/carteira-lancamentos.component';
import { CarteiraConfiguracoesComponent } from './features/investidor/investidor-carteira/carteira-configuracoes/carteira-configuracoes.component';
import { CarteiraAnaliseComponent } from './features/investidor/investidor-carteira/carteira-analise/carteira-analise.component';

// Pages (todos os usuários)
import { LoginComponent } from './features/pages/login/login.component';
import { CadastroComponent } from './features/pages/cadastro/cadastro.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'cadastro', component: CadastroComponent },

  // Rotas do Administrador
  {
    path: 'admin',
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: AdminProfileComponent },
      { path: 'buscar-investidores', component: AdminBuscarInvestidoresComponent }
    ],
  },

  // Rotas do Investidor
  {
    path: 'investidor',
    children: [
      { path: '', redirectTo: 'profile', pathMatch: 'full' },
      { path: 'profile', component: InvestidorProfileComponent },
      { path: 'home', component: InvestidorHomeComponent },
      { path: 'carteira-resumo', component: CarteiraResumoComponent },
      { path: 'carteira-proventos', component: CarteiraProventosComponent },
      { path: 'carteira-graficos', component: CarteiraGraficosComponent },
      { path: 'carteira-metas', component: CarteiraMetasComponent },
      { path: 'carteira-lancamentos', component: CarteiraLancamentosComponent },
      { path: 'carteira-configuracoes', component: CarteiraConfiguracoesComponent },
      { path: 'carteira-analise', component: CarteiraAnaliseComponent }
    ],
  },

  { path: '**', redirectTo: 'login' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
