/*import {firebase} from './firebase.environment';

export const environment = {
  production: true,
  firebaseConfig: {            // Se añade la configuración que llega por el import.
    ...firebase.config         // Copia todo el contenido del objeto que contiene toda la configuración.
  }
};*/

export const environment = {
  production: true,
  firebaseConfig: {
    // Se añade la configuración que llega por el import.
    apiKey: "AIzaSyCp0uZpvmob9CKnj3ss4s5O9PHfaYqr_vg",
    authDomain: "lhp-ci2400.firebaseapp.com",
    databaseURL: "https://lhp-ci2400.firebaseio.com",
    projectId: "lhp-ci2400",
    storageBucket: "lhp-ci2400.appspot.com",
    messagingSenderId: "109795544705",
    appId: "1:109795544705:web:06f0b2f9c9c8a533380780",
    measurementId: "G-70M8BRKPMF" // Copia todo el contenido del objeto que contiene toda la configuración.
  },
  firebaseToken: {
    token:
      "1//05OhMA3ShvtAPCgYIARAAGAUSNwF-L9IrnnDLl3Qs4VTzVzzA5sSN0uRtDVpn1sNdawxm5771zk9N2z4xW722RnYJ2Do0xjPvrDU"
  }
};
