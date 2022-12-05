import { Component, OnInit } from '@angular/core';
import { Alimentador } from 'src/app/modelos/alimentador.interface';
import { IndicesService } from 'src/app/servicios/indices.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { catInterrupciones } from 'src/app/modelos/catinterrupciones.interface';
import { AddCatinterrupcionesComponent } from '../add-catinterrupciones/add-catinterrupciones.component';
@Component({
  selector: 'app-catinterrupciones',
  templateUrl: './catinterrupciones.component.html',
  styleUrls: ['./catinterrupciones.component.css']
})
export class CatinterrupcionesComponent implements OnInit {
  constructor(private iService:IndicesService,private modalService:NgbModal) { }

  ngOnInit(): void {
    this.obtenerAlimentadores();
  }
  //variables
  listaInterrupciones:catInterrupciones[]=[];
  p:any=1;
  
  obtenerAlimentadores(){
    this.iService.listarCatInterrupciones().subscribe(res=>{
     this.listaInterrupciones=res;
    });
  }
  
  openModal() {
    this.modalService.open(AddCatinterrupcionesComponent,
      {
        centered: true,
        size: 'lg',
        backdrop: "static",
        keyboard: false
      }
    )
  }

}
