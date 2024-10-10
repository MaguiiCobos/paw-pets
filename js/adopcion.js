import { db } from "./firebaseConfig.js";
import { addDoc, collection, getDocs, query, where } from "firebase/firestore";

const addDocsAnimals = () => {
  //para rellenar la db con el arreglo de ProdutsMock
  let animalCollection = collection(db, "animales");
  animales.forEach((animal) => addDoc(animalCollection, animal));
};

// Importar Firestore
//const db = firebase.firestore();

