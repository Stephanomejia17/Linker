import { Vacante } from "src/vacantes/entities/vacante.entity";
import { TipoInteraccion } from "../entities/interacciones.entity";
import { Postulante } from "src/postulante/entities/postulante.entity";

export class CreateInteraccioneDto {
    //interaccion:TipoInteraccion;
    accion_empresa: TipoInteraccion;
    accion_postulante: TipoInteraccion;
    vacante_id:string;
    postulante_id:string;
}
