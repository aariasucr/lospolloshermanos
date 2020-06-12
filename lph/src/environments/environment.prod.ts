import {firebase} from './firebase.environment';

export const environment = {
  production: true,
  firebaseConfig: {            // Se añade la configuración que llega por el import.
    ...firebase.config         // Copia todo el contenido del objeto que contiene toda la configuración.
  }
};
