export class MateriasInscriptas
{
  public nombre:string;
  public cuatrimestre:string;
  public cupos:number;
  public profesor:string;
  public nota:number;

    constructor(nombre:string, cuatrimestre:string, cupos:number, profesor:string, nota:number)
    {
        this.nombre = nombre;
        this.cuatrimestre = cuatrimestre;
        this.cupos = cupos;
        this.profesor = profesor;
        this.nota = nota;
    }

}
