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
  selectedFile;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.userData = this.userService.getUserData();
  }

  onUploadImage() {
    this.filePickerRef.nativeElement.click();
    return;
  }

  onFileChosen(event) {
    const fileList: FileList = event.target.files;

    if (fileList.length > 0) {
      this.selectedFile = fileList[0];
      const author = firebase.auth().currentUser.uid;

      const fileName = `${author.toString()}.jpg`;

      const storageRef = firebase.storage().ref();
      this.uploadTask = storageRef.child(fileName).put(this.selectedFile);

      this.uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {
          // Upload en progreso, calculamos el porcentaje de completitud
          this.uploadStatus =
            ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toString() + "%";
        },
        (error) => {
          // Error al hacer upload
          console.error(error.message);
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
