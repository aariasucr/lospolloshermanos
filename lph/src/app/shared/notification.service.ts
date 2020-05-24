import {Injectable} from "@angular/core";
import {ToastrService} from "ngx-toastr";

@Injectable({
  providedIn: "root"
})
export class NotificationService {
  constructor(private toast: ToastrService) {}

  private toastSettings = {
    closeButton: true,
    progressBar: true,
    timeOut: 2000
  };

  showErrorMessage(title: string, message: string, tiempo = 2000) {
    this.toastSettings.timeOut = tiempo;
    this.toast.error(message, title, this.toastSettings);
  }

  showSuccessMessage(title: string, message: string, tiempo = 2000) {
    this.toastSettings.timeOut = tiempo;
    this.toast.success(message, title, this.toastSettings);
  }
}
