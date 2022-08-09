import { Injectable, NgZone } from "@angular/core";
import { Router } from "@angular/router";

const MINUTES_UNITL_AUTO_LOGOUT = 46 // in mins
const CHECK_INTERVAL = 1000 // in ms  
const STORE_KEY = 'lastAction';
@Injectable({
  providedIn: 'root'
})
export class AutoLogoutService {

  public get lastAction() {
    return parseInt(localStorage.getItem(STORE_KEY));
  }
  public set lastAction(lastAction: number) {
    localStorage.setItem(STORE_KEY, lastAction.toString());
  }

  constructor(private router: Router, private ngZone: NgZone,) {
    this.check();
    this.initListener();
    this.initInterval();
    localStorage.setItem(STORE_KEY, Date.now().toString());
  }


  initListener() {
    //verficacion
    this.ngZone.runOutsideAngular(() => {
      document.body.addEventListener('click', () => this.reset());
      document.body.addEventListener('mouseover', () => this.reset());
      document.body.addEventListener('mouseout', () => this.reset());
      document.body.addEventListener('keydown', () => this.reset());
      document.body.addEventListener('keyup', () => this.reset());
      document.body.addEventListener('keypress', () => this.reset());
    });
  }

  reset() {
    this.lastAction = Date.now();
  }

  initInterval() {
    this.ngZone.runOutsideAngular(() => {
      setInterval(() => {
        this.check();
      }, CHECK_INTERVAL);
    })
  }

  check() {
    const now = Date.now();
    const timeleft = this.lastAction + MINUTES_UNITL_AUTO_LOGOUT * 60 * 1000;
    const diff = timeleft - now;
    const isTimeout = diff < 0;

    this.ngZone.run(() => {
      if (isTimeout) {
        //Destrucción del token
        localStorage.removeItem('token');
        localStorage.clear();
        sessionStorage.clear();
        clearTimeout();
        this.router.navigate(['']);

      }
    });
  }
}