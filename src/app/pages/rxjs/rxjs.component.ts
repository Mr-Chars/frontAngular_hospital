import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber, Subscription } from 'rxjs';
import { retry, map, filter } from 'rxjs/operators';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styles: []
})
export class RxjsComponent implements OnInit, OnDestroy {
 
  subscripcion:Subscription;

  constructor() {
    

    /* El siguiente código "pipe" es para reintentar cuyo caso haya algún error */

    this.subscripcion=this.regresaObservable()
      /* .pipe(
        retry(2)
      )       */
      .subscribe(
        numero=>
                {
                  console.log("subs "+numero);
                },
        error=>
                {
                  console.log("Error en el obs:  "+error);
                },
        ()=>
                {
                  console.log("El observador terminó!");
                }
      );

   }

  ngOnInit() {
  }
  
  ngOnDestroy()
  {
    console.log("La página se va a cerrar");
    this.subscripcion.unsubscribe();

  };

  regresaObservable(): Observable<any>
  {

    return new Observable( (observer: Subscriber<any>) =>
      {
        let contador=0;

        const intervalo =setInterval(()=>
        {
          contador++;

          const salida={
            valor:contador
          };
          
          observer.next(salida);

          /* if(contador===3)
          {
            clearInterval(intervalo);
            observer.complete();
          } */
          

        },1000);
      }).pipe(
        map(resp => resp.valor),
        filter(
          (valor, index)=>
              {
                if((valor%2) === 1)
                {
                  return true;
                }else{
                  return false;
                }
                
              })
          );

  }

}
