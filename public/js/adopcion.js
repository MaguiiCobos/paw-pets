import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  query,
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
    console.log(`${doc.id} =>`, doc.data());
    document.getElementById("output").innerHTML += `
      <div class="card">
        <div class="card-header">${doc.data().refugio}</div>
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
