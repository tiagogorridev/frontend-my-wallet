import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'primeng/calendar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AdminProfileComponent } from './features/admin/admin-profile/admin-profile.component';
import { InvestidorProfileComponent } from './features/investidor/investidor-profile/investidor-profile.component';
import { AdminBuscarInvestidoresComponent } from './features/admin/admin-buscar-investidores/admin-buscar-investidores.component';
import { LoginComponent } from './features/pages/login/login.component';
import { InvestidorHomeComponent } from './features/investidor/investidor-home/investidor-home.component';
import { CarteiraResumoComponent } from './features/investidor/investidor-carteira/carteira-resumo/carteira-resumo.component';
import { CarteiraProventosComponent } from './features/investidor/investidor-carteira/carteira-proventos/carteira-proventos.component';
import { CarteiraGraficosComponent } from './features/investidor/investidor-carteira/carteira-graficos/carteira-graficos.component';
import { CarteiraMetasComponent } from './features/investidor/investidor-carteira/carteira-metas/carteira-metas.component';
import { CarteiraLancamentosComponent } from './features/investidor/investidor-carteira/carteira-lancamentos/carteira-lancamentos.component';
import { CarteiraConfiguracoesComponent } from './features/investidor/investidor-carteira/carteira-configuracoes/carteira-configuracoes.component';
import { CadastroComponent } from './features/pages/cadastro/cadastro.component';
import { ButtonModule } from 'primeng/button';
import { CarteiraAnaliseComponent } from './features/investidor/investidor-carteira/carteira-analise/carteira-analise.component';
import { InvestidorHeaderComponent } from './features/investidor/investidor-header/investidor-header.component';
import { InvestidorPagamentoComponent } from './features/investidor/investidor-pagamento/investidor-pagamento.component';
import { AdicionarAtivoComponent } from './reutilizaveis/adicionar-ativo/adicionar-ativo.component';

@NgModule({
  declarations: [
    AppComponent,
    AdminProfileComponent,
    InvestidorProfileComponent,
    AdminBuscarInvestidoresComponent,
    LoginComponent,
    InvestidorHomeComponent,
    CarteiraResumoComponent,
    CarteiraProventosComponent,
    CarteiraGraficosComponent,
    CarteiraMetasComponent,
    CarteiraLancamentosComponent,
    CarteiraConfiguracoesComponent,
    CadastroComponent,
    CarteiraAnaliseComponent,
    InvestidorHeaderComponent,
    InvestidorPagamentoComponent,
    AdicionarAtivoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    CalendarModule,
    ButtonModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
