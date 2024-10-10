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

// Inicializa Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const addDocsAnimals = () => {
  console.log("addDocsAnimals button pressed");
  // para rellenar la db con el arreglo de animales
  let animalCollection = collection(db, "animales");
  
  // Verifica que 'animales' esté definido
  if (animales && animales.length > 0) {
    console.log("animales collection is defined with", animales.length, "items");
    animales.forEach(async (animal) => {
      try {
        await addDoc(animalCollection, animal);
        console.log(`Animal ${animal.nombre} agregado a la base de datos.`);
      } catch (error) {
        console.error("Error al agregar el animal:", error);
      }
    });
  } else { 
    console.log("animales collection is undefined or empty");
  }
};

// Obtener documentos de la colección "animales"
const getAnimals = async () => {
  const q = query(collection(db, "animales"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    console.log(`${doc.id} =>`, doc.data());
  });
};

// Evento para agregar documentos
window.addEventListener("DOMContentLoaded", () => {
  const addButton = document.querySelector("#addDocsButton");
  if (addButton) {
    addButton.addEventListener("click", addDocsAnimals);
  }

  // Ejemplo de uso de getAnimals
  getAnimals();
});
