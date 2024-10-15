import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  query,
  doc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { firebaseConfig } from "./firebaseConfig.js";

// Inicializa Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Obtener documentos de la colección "animales"
const getAnimals = async () => {
  const q = query(collection(db, "animales"));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
    document.getElementById("output").innerHTML += `
      <div class="card">
        <div class="card-header">${doc.data().refugio ? doc.data().refugio.nombre : "Sin refugio"}</div>
        <div class="card-body">
          <img class="imgCard img-fluid" src="./image/fondoHeader.jpeg" alt="" />
          <h5 class="card-title">${doc.data().nombre} - ${doc.data().edad}</h5>
          <p class="card-text">
            ${doc.data().descripcion}
          </p>
          <a href="#" class="btn btn-primary">
            Ver info
          </a>
          <a href="#" class="btn btn-primary">
            Adoptar
          </a>
        </div>
      </div>
    `;
  });
};

getAnimals();

// Función para obtener la lista de refugios
const getRefugios = async () => {
  const q = query(collection(db, "refugios"));
  const querySnapshot = await getDocs(q);
  let refugios = [];

  querySnapshot.forEach((doc) => {
    refugios.push(doc); // Guarda el documento completo en el array
  });

  return refugios; // Devuelve la lista de documentos
};

// Función para asignar un refugio a un animal
const asignarRefugio = async (nombreRefugio) => {
  const refugios = await getRefugios(); // Espera que se resuelvan los datos

  const refugioEncontrado = refugios.find((element) => {
    return element.data().nombre === nombreRefugio;
  });

  return refugioEncontrado ? refugioEncontrado.data() : null; // Devuelve el refugio encontrado o null
};

// Función para actualizar el refugio en un animal
const actualizarAnimalConRefugio = async (idAnimal, nombreRefugio) => {
  const refugio = await asignarRefugio(nombreRefugio);

  if (refugio) {
    // Referencia al documento del animal
    const animalRef = doc(db, "animales", idAnimal);
    
    // Actualiza el campo "refugio" del animal con la información completa del refugio
    await updateDoc(animalRef, {
      refugio: refugio
    });

    console.log(`Animal con ID ${idAnimal} actualizado con el refugio ${nombreRefugio}`);
  } else {
    console.log("Refugio no encontrado.");
  }
};

// Llamar a la función para asignar un refugio a un animal
actualizarAnimalConRefugio("LKU1VfZKdOrQudjzUnhj", "Refugio Vida y Patas");
actualizarAnimalConRefugio("OJCZBnjY1GmHERmAuZZc", "Refugio Animal Feliz");
actualizarAnimalConRefugio("SQ5dQiz8zzBdWw4Aq5QD", "Hogar Canino Los Andes");
actualizarAnimalConRefugio("Y5bysBoWJX2oujtWD00O", "Refugio Esperanza Animal");
actualizarAnimalConRefugio("ZURnVwSggSVNAfkmOIGM", "Centro de Rescate Paws");
actualizarAnimalConRefugio("kyjTmXEhUZ1371Ns1RIu", "Salvemos a los Peludos");
actualizarAnimalConRefugio("n5DVkxZwnHl5HIUExbm3", "Refugio Amigos de Cuatro Patas");
actualizarAnimalConRefugio("o6wbUVK0uW7JU4h6EnBw", "Santuario Animal Mendoza");

