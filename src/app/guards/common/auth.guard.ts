import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../services/ui/custom-toastr.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from '../../base/base.component';

export const authGuard: CanActivateFn = (route, state) => {


  const jwtHelper: JwtHelperService = inject(JwtHelperService);
  const router: Router = inject(Router);
  const toastrService: CustomToastrService = inject(CustomToastrService);
  const spinner: NgxSpinnerService = inject(NgxSpinnerService);

  spinner.show(SpinnerType.BallAtom);
  const token: string = localStorage.getItem("accessToken");
  // const decodeToken  = jwtHelper.decodeToken(token);
  // const expirationDate : Date = jwtHelper.getTokenExpirationDate(token);
  let expired: boolean;
  try {
    expired = jwtHelper.isTokenExpired(token);
  } catch (error) {
    expired = true;
  }
  if (!token || expired) {

    router.navigate(["login"], { queryParams: { returnUrl: state.url } }); //tam auth olmadığında login sayfasına gönderdiğimizde giriş yaptıktan sonra gitmek istediği sayfaya yönlendirir.
    toastrService.message("Oturum açmanız gerekiyor!", "Yetkisiz Erişim!", {
      messageType: ToastrMessageType.Warning,
      position: ToastrPosition.TopRight
    });
  }

  spinner.hide(SpinnerType.BallAtom);

  return true;
};


