import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'hayCupo'
})
export class HayCupoPipe implements PipeTransform {

  transform(value: any): any 
  {
    if(value == 0)
    {
      return "No hay mas cupo";
    }
    else
    {
      return "Hay cupo";
    }
  }

}
