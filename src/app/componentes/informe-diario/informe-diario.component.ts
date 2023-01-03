import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IndicesService } from 'src/app/servicios/indices.service';

@Component({
  selector: 'app-informe-diario',
  templateUrl: './informe-diario.component.html',
  styleUrls: ['./informe-diario.component.css']
})
export class InformeDiarioComponent implements OnInit {

  constructor(private activatedRoute: ActivatedRoute,private indicesServices:IndicesService,private router:Router) {
    this.codigoArchivo=this.activatedRoute.snapshot.paramMap.get('id');
   }

  p:any=1;
  titulos:any=[
    'Quitar',
    'Incidente No',
    'Indicador de Mantenimiento  o falla',
    'Nivel de afectación de la interrupción a la Red',
    'ALIMENTADOR ASOCIADO A LA FALLA O SUSPENSIÓN',
    'Etapa funcional en la que se presentó la falla',
    'Instalación / Equipo que se desconectó a la falla',
    'Provincia',
    'Cantón',
    'Sector',
    'Número de Trafo',
    'Número de Seccionador',
    'Propiedad',
    'Protección que Operó',
    'Tipo de Protección que actuo',
    'Etapa funcional',
    'Instalación / Equipo',
    'Provincia',
    'Cantón',
    'Sector',
    'Línea de Subtransmisión',
    'Subestación',
    'Falla en Transmisor',
    'Tipo de Alimentador Primario',
    'Nivel de Tensión KV',
    'Nivel de Afectasión',
    'Origen de Interrupción',
    'Causa de Interrupción',
    'Transmisor',
    'Causas',
    'Potencial Nominal Instalado',
    'Potencial Nominal Fuera de Servicio',
    'Carga Instalada Fuera de Servicio',
    'Fecha Inicio Interrupcion',
    'Hora Inicio Interrupcion',
    'Fecha Fin Interrupcion',
    'Hora Fin Interrupcion',
    'Duración de Interrupción Horas/min/seg',
    'Duración de Interrupción Horas',
    'FMIK',
    'TTIK',
  ];
  codigoArchivo:any;
  term:any;
  informeDiario:any=[];
  descartadas:any=[];

  ngOnInit(): void {
    this.obtenerFilasInformeDiario();
  }

  obtenerFilasInformeDiario(){
   const resp=this.indicesServices.listarInformeDiario(this.codigoArchivo);
   resp.subscribe((data)=>{
    this.informeDiario=data;
    this.informeDiario=this.informeDiario.filter((row:any)=>row.SIND_INCIDENCIA_ESTADO==='false');
   });
  }

  onDescartar(){
    this.descartadas=this.informeDiario.filter((row:any)=>row.SIND_INCIDENCIA_ESTADO==='true');
    // console.log(this.descartadas);
  }

  onIncidenciasDescartadas(){
    this.router.navigate(['/incidencias-descartadas',this.codigoArchivo]);
  }

  onChangeCheckbox(row:any){
    console.log(row['SIND_CODIGO']);
    let indice=this.informeDiario.filter((infD:any,index:any)=>{
      if(infD.SIND_CODIGO==row['SIND_CODIGO']){
        return index
      }
    })   
    console.log('indice');
    console.log(indice);
  }

}
