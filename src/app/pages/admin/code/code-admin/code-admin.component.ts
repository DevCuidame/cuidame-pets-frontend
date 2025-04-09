import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription, finalize, map } from 'rxjs';

@Component({
  selector: 'app-code-admin',
  templateUrl: './code-admin.component.html',
  styleUrls: ['./code-admin.component.css'],
})
export class CodeAdminComponent {
  // public tmp: any;
  // public cargaFinalizada: boolean;
  // public arrayProd: Producto[];
  // public sub: Subscription;

  // public allProds: number = 0;
  // public pagination: number = 1;


  // constructor(private prodService: ProductoServicioService, private router: Router,public toastr: ToastrService) {
  //   this.cargaFinalizada = false;
  //   this.arrayProd = [];
  //   this.sub = this.tmp;
  // }

  // public getProds(): void {
  //   this.sub = this.prodService
  //     .getProds(this.pagination)
  //     .pipe(
  //       map((response) => {
  //         console.log(response);
  //         this.arrayProd = response;
  //       }),
  //       finalize(() => {
  //         this.cargaFinalizada = true;
  //       })
  //     )
  //     .subscribe(observadorAny);
  // }

  // deleteProd (id: string){
  //   this.prodService.removeProd(id).subscribe(
  //     res => {
  //       console.log(res);
  //       mostrarMensaje(
  //         'info',
  //         'Producto eliminado!',
  //         'Correcto',
  //         this.toastr
  //       );
  //       this.router.navigate(['/private/product/manageproduct'])
  //       window.location.reload();

  //     },
  //     error => {
  //       console.log(error);
  //     }
  //   )
  // }

  // renderPage(event: number) {
  //   this.pagination = event;
  //   this.getProds();
  // }

  // editProd(id: string) {
  //   this.router.navigate(['private/product/editproduct', id])
  // }

  
  // ngOnDestroy(): void {
  //   if (this.sub) {
  //     this.sub.unsubscribe();
  //   }
  // }

  // ngOnInit(): void {
  //   this.getProds();
  // }
}
