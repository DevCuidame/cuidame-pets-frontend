import { ToastrService } from 'ngx-toastr';

export function showMessage(
  tipo: string,
  mensaje: string,
  alerta: string,
  toastr: ToastrService
): void {
  const PARAMETROS = {
    timeOut: 3000,
    closeButton: true,
    enableHtml: true,
    progressBar: true,
    disableTimeOut: false,
    positionClass: 'toast-top-right',
  };
  switch (tipo) {
    case 'success':
      toastr.success(mensaje, alerta, PARAMETROS);
      break;
    case 'info':
      toastr.info(mensaje, alerta, PARAMETROS);
      break;
    case 'warning':
      toastr.warning(mensaje, alerta, PARAMETROS);
      break;
    case 'error':
      toastr.error(mensaje, alerta, PARAMETROS);
      break;
    default:
      toastr.clear(0);
      break;
  }
}
