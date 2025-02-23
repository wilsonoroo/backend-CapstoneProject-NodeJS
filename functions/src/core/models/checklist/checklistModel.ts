import { IChecklist } from "../../interface/checklist";
import { ConfiguracionChecklist } from "../configuracionCheckList";
import { NoAplicaEmbeddable } from "../noAplicaEmbeddable";
import { SeccionPregunta } from "../seccionPregunta";


export class Checklist implements IChecklist<SeccionPregunta, ConfiguracionChecklist, NoAplicaEmbeddable>{
  id: string;
  nombre!: string;
  descripcion!: string;
  faena!: string;
  icono!: string;
  intrucciones!: string;
  tag!: string;
  empresa!: string;
  abreviatura!: string;
  empresaId!: string;
  tipo!: string;
  categoria!: boolean;
  gerencia!: boolean;
  ubicacion!: string;  
  secciones!: SeccionPregunta;
  configuracion!: ConfiguracionChecklist;
  nombreEquipo!: string;
  seccionesValidacion!: SeccionPregunta;
  noAplica!: NoAplicaEmbeddable;
 
}
