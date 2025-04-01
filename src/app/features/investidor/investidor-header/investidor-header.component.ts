import { Component } from '@angular/core';

@Component({
  selector: 'app-investidor-header',
  templateUrl: './investidor-header.component.html',
  styleUrls: ['./investidor-header.component.scss']
})
export class InvestidorHeaderComponent {
  onAssetAdded(assetData: any) {
    console.log('Novo ativo adicionado:', assetData);
  }
}
