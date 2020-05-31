import {Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input} from "@angular/core";
import * as firebase from "firebase";
import {UserService} from "../shared/user.service";

@Component({
  selector: "app-file-uploader",
  templateUrl: "./file-uploader.component.html",
  styleUrls: ["./file-uploader.component.css"]
})
export class FileUploaderComponent implements OnInit {
  @ViewChild("filePicker", {static: false}) filePickerRef: ElementRef<HTMLInputElement>;
  @Output() imagePick = new EventEmitter<string>();
  @Input() author = "";

  uploadTask: firebase.storage.UploadTask;
  fileUrl = "";
  uploadStatus = "";
  public userData;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userData = this.userService.getUserData();
  }

  onUploadImage() {
    console.log(this.userData);
    this.filePickerRef.nativeElement.click();
    return;
  }

  onFileChosen(event) {
    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      const file: File = fileList[0];
      // Por si nos interesa el tipo de archivo (e.g. image/jpeg)
      const fileType = file.type;

      // const author = firebase.auth().currentUser.uid;
      const currentDate = new Date();
      const timestamp = currentDate.getTime();

      const fileName = `${timestamp.toString()}.jpg`;

      const storageRef = firebase.storage().ref();
      this.uploadTask = storageRef.child(fileName).put(file);

      this.uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          // Upload en progreso, calculamos el porcentaje de completitud
          this.uploadStatus =
            ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toString() + "%";
        },
        (error) => {
          // Error al hacer upload
          console.log(error);
        },
        () => {
          this.uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl) => {
            this.uploadStatus = "";
            this.fileUrl = downloadUrl;
            this.imagePick.emit(downloadUrl);
          });
        }
      );
    }
  }
}
