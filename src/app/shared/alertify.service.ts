import { Injectable } from '@angular/core';

declare let alertify: any;
declare var $: any;

@Injectable()

export class AlertifyService {
  constructor(){ }

  public msgAlert(titleAlert: string, messageAlert: string) {
    alertify.alert(titleAlert, messageAlert);
  }

  public msgConfirm(message: string){
    $('#btn').click(function() {
    alertify.confirm(message,function(e){
        if(e) {
            return true;
        } else {
            return false;
        }

    });
});
}
  public success(message: string) {
    alertify.success(message);
  }

}
