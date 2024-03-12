import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/common/models/user.service';
import { BaseComponent, SpinnerType } from '../../../base/base.component';
import { NgxSpinnerService } from 'ngx-spinner';
import { AuthService } from '../../../services/common/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { HttpClientService } from '../../../services/common/http-client.service';
import { TokenResponse } from '../../../contracts/token/tokenResponse';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent extends BaseComponent implements OnInit {
  constructor(private userService: UserService, spinner: NgxSpinnerService, private authService: AuthService, private activatedRoute: ActivatedRoute, private router: Router,
    private socialAuthService: SocialAuthService, private httpClientService: HttpClientService) {
    super(spinner)
    socialAuthService.authState.subscribe(async (user: SocialUser) => {
      this.showSpinner(SpinnerType.BallAtom);
      await userService.googleLogin(user, () =>{
        authService.identityCheck();
        this.hideSpinner(SpinnerType.BallAtom)
      })
    });
  }

  ngOnInit(): void {

  }

  async login(usernameOrEmail: string, password: string) {
    this.showSpinner(SpinnerType.BallAtom)
    await this.userService.login(usernameOrEmail, password, () => {
      this.authService.identityCheck();
      this.activatedRoute.queryParams.subscribe(params => { //returnUrl işlevi kazandırdık.
        const returnUrl: string = params["returnUrl"];
        if (returnUrl)
          this.router.navigate([returnUrl]);
      });
      this.hideSpinner(SpinnerType.BallAtom);
    });
  }
}
