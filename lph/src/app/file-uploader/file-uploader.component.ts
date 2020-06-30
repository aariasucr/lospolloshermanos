import {Component, OnInit, ViewChild, ElementRef, Output, EventEmitter, Input} from "@angular/core";
import * as firebase from "firebase"; // Aquí es el único lugar donde se deja por el uso de la constante STATE_CHANGED
import {UserService} from "../shared/user.service";
import {AngularFireStorage} from "@angular/fire/storage";
import {AngularFireAuth} from "@angular/fire/auth";

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

  constructor(
    private userService: UserService,
    private firebaseAuth: AngularFireAuth,
    private firebaseStorage: AngularFireStorage
  ) {}

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
      console.log("qwjdkjqndwkqwd", this.selectedFile.name);
      this.firebaseAuth.currentUser.then((user) => {
        if (user != null) {
          const author = user.uid;
          const current = new Date();
          console.log("El autor: ", author);
          const timestamp = current.getTime();
          const fileName = `posts/${author.toString()}/${author.toString() + timestamp.toString()}.jpg`;

          /** [FB] Actualización */
          // const storageRef = firebase.storage().ref();
          const storageRef = this.firebaseStorage.storage.ref();
          this.uploadTask = storageRef.child(fileName).put(this.selectedFile);
          console.log("ajbskjdnkqwn---------------->>>>");
          this.uploadTask.on(
            firebase.storage.TaskEvent.STATE_CHANGED,
            (snapshot) => {
              // Upload en progreso, calculamos el porcentaje de completitud
              this.uploadStatus =
                ((snapshot.bytesTransferred / snapshot.totalBytes) * 100).toString() + "%";
            },
            (error) => {
              // Error al hacer upload
              console.log("ajbskjdnkqwn------>>>>");
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
      });
    }
  }
}
