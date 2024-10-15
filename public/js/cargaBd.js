import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  query
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";

import { firebaseConfig } from "./firebaseConfig.js";
import { animales } from "./data/animales.js"; // Importa el arreglo de animales
import { refugios } from "./data/refugios.js"; // Importa el arreglo de animales
import { veterinarias } from "./data/veterinarias.js"; // Importa el arreglo de animales

// Inicializa Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const addDocsDatos = () => {
  console.log("addDocsDatos button pressed");
  // para rellenar la db con el arreglo de animales
  let animalCollection = collection(db, "animales");
  let refugioCollection = collection(db, "refugios");
  let veterinariaCollection = collection(db, "veterinarias");
  
  // Verifica que 'animales' esté definido
  if (animales && animales.length > 0 && refugios && refugios.length > 0 && veterinarias && veterinarias.length > 0 ) {
    console.log("animales collection is defined with", animales.length, "items");
    console.log("refugios collection is defined with", refugios.length, "items");
    console.log("veterinarias collection is defined with", veterinarias.length, "items");
    animales.forEach(async (animal) => {
      try {
        await addDoc(animalCollection, animal);
        console.log(`Animal ${animal.nombre} agregado a la base de datos.`);
      } catch (error) {
        console.error("Error al agregar el animal:", error);
      }
    });
    refugios.forEach(async (refugio) => {
        try {
          await addDoc(refugioCollection, refugio);
          console.log(`Refugio ${refugio.nombre} agregado a la base de datos.`);
        } catch (error) {
          console.error("Error al agregar el refugio:", error);
        }
      });
    veterinarias.forEach(async (veterinaria) => {
        try {
          await addDoc(veterinariaCollection, veterinaria);
          console.log(`Veterinaria ${veterinaria.nombre} agregado a la base de datos.`);
        } catch (error) {
          console.error("Error al agregar el veterinaria:", error);
        }
      });
  } else { 
    console.log("animales collection is undefined or empty");
    console.log("refugio collection is undefined or empty");
    console.log("veterinarias collection is undefined or empty");
  }
};

// Obtener documentos de la colección "animales"
const getAnimals = async () => {
  const q = query(collection(db, "animales"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // console.log(`${doc.id} =>`, doc.data());
  });
};
// Evento para agregar documentos
window.addEventListener("DOMContentLoaded", () => {
  const addButton = document.querySelector("#addDocsButton");
  if (addButton) {
    addButton.addEventListener("click", addDocsDatos);
  }

  // Ejemplo de uso de getAnimals
  getAnimals();
});


// Obtener documentos de la colección "refugios"
const getRefugios = async () => {
  const q = query(collection(db, "refugios"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // console.log(`${doc.id} =>`, doc.data());
  });
};
// Evento para agregar documentos
window.addEventListener("DOMContentLoaded", () => {
  const addButton = document.querySelector("#addDocsButton");
  if (addButton) {
    addButton.addEventListener("click", addDocsDatos);
  }

  // Ejemplo de uso de getRefugios
  getRefugios();
});


// Obtener documentos de la colección "veterinarias"
const getVeterinarias = async () => {
  const q = query(collection(db, "veterinarias"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    // console.log(`${doc.id} =>`, doc.data());
  });
};
// Evento para agregar documentos
window.addEventListener("DOMContentLoaded", () => {
  const addButton = document.querySelector("#addDocsButton");
  if (addButton) {
    addButton.addEventListener("click", addDocsDatos);
  }

  // Ejemplo de uso de getVeterinarias
  getVeterinarias();
});
