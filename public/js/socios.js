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

// Obtener documentos de la colección "refugios y veterinarias"
// const getSocios = async () => {
//   const q1 = query(collection(db, "refugios"));
//   const q2 = query(collection(db, "veterinarias"));
//   const querySnapshot1 = await getDocs(q1);
//   querySnapshot1.forEach((doc) => {
//     console.log(`${doc.id} =>`, doc.data());
//     document.getElementById("output").innerHTML += `
//       <div class="card">
//         <div class="card-header">Refugio</div>
//         <div class="card-body">
//           <h5 class="card-title">${doc.data().nombre}</h5>
//           <p class="card-text">
//             ${doc.data().ubicacion}
//           </p>
//           <p class="card-text">
//             ${doc.data().contacto.telefono}
//           </p>
//           <p class="card-text">
//             ${doc.data().contacto.mail}
//           </p>
//         </div>
//       </div>
//       `;
//   });
//   const querySnapshot2 = await getDocs(q2);
//   querySnapshot2.forEach((doc) => {
//     console.log(`${doc.id} =>`, doc.data());
//     document.getElementById("output").innerHTML += `
//       <div class="card">
//         <div class="card-header">Refugio</div>
//         <div class="card-body">
//           <h5 class="card-title">${doc.data().nombre}</h5>
//           <p class="card-text">
//             ${doc.data().ubicacion}
//           </p>
//           <p class="card-text">
//             ${doc.data().contacto.telefono}
//           </p>
//           <p class="card-text">
//             ${doc.data().contacto.mail}
//           </p>
//         </div>
//       </div>
//       `;
//   });
// };

// getSocios();

const filtroSocios = async (departamento) => {
  const contenedor = document.getElementById("output");
  const q1 = query(collection(db, "refugios"));
  const q2 = query(collection(db, "veterinarias"));
  const querySnapshot1 = await getDocs(q1);
  const querySnapshot2 = await getDocs(q2);
  
    querySnapshot1.forEach((doc) => {
      if (doc.data().departamento == departamento || departamento == "todos") {
      console.log(`${doc.id} =>`, doc.data());
      contenedor.innerHTML += `
      <div class="card m-3">
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
      }
    });
    querySnapshot2.forEach((doc) => {
      if (doc.data().departamento == departamento || departamento == "todos") {
      console.log(`${doc.id} =>`, doc.data());
      contenedor.innerHTML += `
      <div class="card m-3">
        <div class="card-header">Veterinaria</div>
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
      }
    });
};

filtroSocios("todos");

// filtro
const btnCategoria = document.querySelectorAll(".btnCategoria");

btnCategoria.forEach((boton) => {
  boton.addEventListener("click", async (e) => {
    let contenedor = document.querySelector("#output");
    contenedor.innerHTML = "";
    if (e.currentTarget.id != "todos") {
      await filtroSocios(e.currentTarget.id);
    } else if (e.currentTarget.id == "todos") {
      await filtroSocios("todos");
    }

    if (contenedor.innerHTML == "") {
      contenedor.innerHTML = `
      <div> 
        <h1> No hay socios </h1> 
      </div>
      `;
    }
  });
});
