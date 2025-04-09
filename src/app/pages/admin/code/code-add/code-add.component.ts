import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
// import { ToastrService } from 'ngx-toastr';
import { Subscription, catchError, map } from 'rxjs';
// import { Producto } from 'src/app/modelos/producto';
// import { ProductoServicioService } from 'src/app/servicios/producto-servicio.service';
// import { mostrarMensaje } from 'src/app/utilidades/mensajes/toast.func';
// import { observadorAny } from 'src/app/utilidades/observadores/tipo-any';

interface HtmlInputEvent extends Event {
  target: HTMLInputElement & EventTarget;
}

@Component({
  selector: 'app-code-add',
  templateUrl: './code-add.component.html',
  styleUrls: ['./code-add.component.css'],
})
export class CodeAddComponent  {
  // private tmp: any;
  // public objProd: Producto;
  // public sub: Subscription;
  // public tmpBase64: any;

  // public file: File;

  // privPhoto: string = '';

  // constructor( public router: Router,
  //   public prodService: ProductoServicioService,
  //   public toastr: ToastrService
  // ) {
  //   this.objProd = new Producto('', '', '', 0, '', '', '');
  //   this.sub = this.tmp;
  //   this.tmpBase64 = null;
  //   this.file = this.tmp;
  // }

  // ngOnDestroy(): void {}

  // ngOnInit(): void {
  //   if (this.sub) this.sub.unsubscribe();
  // }

  // public operations(form: NgForm): void {
  //   const id: any = this.objProd.codProducto;
  //   const name: any = this.objProd.nombreProducto;
  //   const detail: any = this.objProd.detalleProducto;
  //   const value: any = this.objProd.valorProducto;
  //   const privPhoto: any = this.objProd.privadoFotoProducto; // Name of img tho
  //   const publPhoto: any = this.objProd.publicoFotoProducto
  //   const photoBs64: any = this.tmpBase64

  //   const newObjProd = new Producto(
  //     id,
  //     name,
  //     detail,
  //     value,
  //     privPhoto,
  //     publPhoto,
  //     photoBs64
  //   );
  //   console.log(newObjProd);
  //   this.sub = this.prodService
  //     .addProd(newObjProd)
  //     .pipe(
  //       map((response) => {
  //         console.log(newObjProd);

  //         mostrarMensaje(
  //           'success',
  //           'Producto creado!',
  //           'Correcto',
  //           this.toastr
  //         );
  //         form.reset();
  //         return response;
  //       }),
  //       catchError((err) => {
  //         mostrarMensaje('error', 'Producto no creado', 'Error', this.toastr);
  //         form.reset();
  //         throw err;
  //       })
  //     )
  //     .subscribe(observadorAny);
  // }

  // onPhotoSelected(event: any): void {
  //   if (event.target.files && event.target.files[0]) {
  //     this.file = <File>event.target.files[0];
  //     // Image Preview
  //     const reader = new FileReader();
  //     reader.onload = (e) => (this.tmpBase64 = reader.result);
  //     reader.readAsDataURL(this.file);
  //   }
  // }

  // showFileName(event: any):void {
  //   const file = event.target.files[0];
  //   if (file) {
  //     this.privPhoto = file.name;
  //   } else {
  //     this.privPhoto = '';
  //   }
  // }
}
