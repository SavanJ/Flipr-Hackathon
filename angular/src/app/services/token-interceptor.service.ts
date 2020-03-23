import { Injectable , Injector, Inject } from '@angular/core';
import { HttpInterceptor } from "@angular/common/http";
import {AuthService} from '../services/auth.service'

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor{

  constructor(private authService:AuthService , private injector:Injector) { }

  intercept(req,next){
    let token = this.injector.get(AuthService)
    let tokenizedReq = req.clone({
      setHeaders:{
        Authorization : `Bearer ${token.getToken()} `
      }
    });

    return next.handle(tokenizedReq)

  }
}
