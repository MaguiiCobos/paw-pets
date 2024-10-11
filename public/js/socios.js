import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  query
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { firebaseConfig } from "./firebaseConfig.js";

// Inicializa Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


// Obtener documentos de la colección "animales"
const getSocios = async () => {
  const q1 = query(collection(db, "refugios"));
  const q2 = query(collection(db, "veterinarias"));
  const querySnapshot1 = await getDocs(q1);
  querySnapshot1.forEach((doc) => {
    console.log(`${doc.id} =>`, doc.data());
    document.getElementById("output").innerHTML += `
      <div class="card">
        <div class="card-header">Refugio</div>
        <div class="card-body">
          <h5 class="card-title">${doc.data().nombre}</h5>
          <p class="card-text">
            ${doc.data().ubicacion}
          </p>
          <p class="card-text">
            ${doc.data().contacto.telefono}
          </p>
          <p class="card-text">
            ${doc.data().contacto.mail}
          </p>
        </div>
      </div>
      `;
  });
};

getSocios();

