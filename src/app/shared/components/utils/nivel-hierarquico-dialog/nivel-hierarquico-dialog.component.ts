import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { TreeNode } from 'primeng/api';

@Component({
  selector: 'app-nivel-hierarquico-dialog',
  templateUrl: './nivel-hierarquico-dialog.component.html',
  styleUrls: ['./nivel-hierarquico-dialog.component.scss'],
})
export class NivelHierarquicoDialogComponent implements OnInit {


  data: TreeNode[] = [];

  constructor(
    private readonly modal: ModalController,
    ) { }

  ngOnInit() {
    this.data = [
      {
        label: 'Nível 1',
        type: 'person',
        styleClass: 'p-person',
        expanded: true,
        data: { nome: 'Presidência' },
        children: [
          {
            label: 'Nível 2',
            type: 'person',
            styleClass: 'p-person',
            expanded: true,
            data: { nome: 'Vice presidências' },
            children: [{
              label: 'Nível 3',
              type: 'person',
              styleClass: 'p-person',
              expanded: true,
              data: { nome: 'Diretorias' },
              children: [{
                label: 'Nível 4',
                type: 'person',
                styleClass: 'p-person',
                expanded: true,
                data: { nome: 'Gerências' },
                children: [{
                  label: 'Nível 5',
                  type: 'person',
                  styleClass: 'p-person',
                  expanded: true,
                  data: { nome: 'Coordenadorias' },
                  children: [{
                    label: 'Nível 6 ao Nível 10',
                    type: 'person',
                    styleClass: 'p-person',
                    expanded: true,
                    data: { nome: "Equipes" }
                  }]
                }]
              }]
            }]
          }
        ]
      }
    ]
  }

  fechar() {
    this.modal.dismiss();
  }

}

