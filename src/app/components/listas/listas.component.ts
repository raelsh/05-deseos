import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { DeseosService } from 'src/app/services/deseos.service';
import { Lista } from 'src/app/models/lista.model';
import { AlertController, IonList } from '@ionic/angular';

@Component({
  selector: 'app-listas',
  templateUrl: './listas.component.html',
  styleUrls: ['./listas.component.scss'],
})
export class ListasComponent implements OnInit {

  @ViewChild('listas') lista: IonList;

  @Input() terminada = true;

  constructor(public deseosService: DeseosService,
              private router: Router,
              private alertCtrl: AlertController) { }

  ngOnInit() {}

  listSelected(lista: Lista){
    let url: string = this.terminada?'tab2':'tab1';
    const listaId = lista.id;       
    this.router.navigateByUrl(`/tabs/${url}/agregar/${listaId}`);   
  }

  borrarLista(lista: Lista){
    this.deseosService.borrarLista(lista);
  }

  async editarLista(lista: Lista){

    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Editar lista',
      inputs: [
        {
          name: 'titulo',
          type: 'text',
          value: lista.titulo,
          placeholder: 'Nombre de la lista'
        }],
      buttons: [
      {
        text:'Cancelar',
        role:'cancel',
        handler:()=>{
          this.lista.closeSlidingItems();        
        }
      },
      {
        text:'Guardar',
        handler:(data)=>{
          if(!data.titulo){            
            return;
          }else if(data.titulo!=lista.titulo){  
            lista.titulo=data.titulo;
            this.deseosService.guardarStorage();  
            this.lista.closeSlidingItems();
          }else{
            return;
          }
        }
      }
    ]
    });

    await alert.present();
  }

}
