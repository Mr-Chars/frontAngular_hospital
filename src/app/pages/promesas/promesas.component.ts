import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: []
})
export class PromesasComponent implements OnInit {

  constructor() {

    

    this.contarTres().then(
      ()=> console.log("terminó!")
    ).
    catch(error => console.error("Error en la promesa", error));

   }

  ngOnInit() {
  }

  /* : Promise<boolean> es para especificar  */
  contarTres(): Promise<boolean>
  {
    return new Promise((resolve, reject)=>
    {
      let contador =0;
      let intervalo = setInterval(()=>{
        contador++;

        console.log(contador);
        if(contador===3)
        {
          resolve(); 
          clearInterval(intervalo);
        }

      }, 1000);
    });
    
  }

}
