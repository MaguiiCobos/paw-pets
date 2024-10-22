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

// const btnMapa = document.querySelectorAll(".btnMapa");

const filtroSocios = async (departamento) => {
  document.getElementById("mapa").classList.remove("disabled")
  const contenedor = document.getElementById("output");
  contenedor.innerHTML = ""; // Limpiar el contenedor antes de agregar contenido
  const q1 = query(collection(db, "refugios"));
  const q2 = query(collection(db, "veterinarias"));
  const querySnapshot1 = await getDocs(q1);
  const querySnapshot2 = await getDocs(q2);

  // Refugios
  querySnapshot1.forEach((doc) => {
    if (doc.data().departamento == departamento || departamento == "todos") {
      contenedor.innerHTML += `
        <div class="card m-3 cardSocios">
          <div class="card-header">Refugio</div>
          <div class="card-body">
            <h5 class="card-title nombreRef">${doc.data().nombre}</h5>
            <p class="card-text">${doc.data().ubicacion}</p>
            <p class="card-text">${doc.data().contacto.telefono}</p>
            <p class="card-text">${doc.data().contacto.mail}</p>
          </div>
          <button class="btnMapa" data-mapa="${
            doc.data().ubicacionLink
          }">Mostrar en el mapa</button>
        </div>
      `;
    }
  });

  // Veterinarias
  querySnapshot2.forEach((doc) => {
    if (doc.data().departamento == departamento || departamento == "todos") {
      contenedor.innerHTML += `
        <div class="card m-3">
          <div class="card-header">Veterinaria</div>
          <div class="card-body">
            <h5 class="card-title nombreVet">${doc.data().nombre}</h5>
            <p class="card-text">${doc.data().ubicacion}</p>
            <p class="card-text">${doc.data().contacto.telefono}</p>
            <p class="card-text">${doc.data().contacto.mail}</p>
          </div>
          <button class="btnMapa" data-mapa="${
            doc.data().ubicacionLink
          }">Mostrar en el mapa</button>
        </div>
      `;
    }
  });

  // Asignar eventos a los botones .btnMapa después de haber generado el contenido
  document.querySelectorAll(".btnMapa").forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const mapa = document.getElementById("mapa");
      const ubicacionLink = e.target.getAttribute("data-mapa");
      mapa.src = ubicacionLink; // Cambiar el src del iframe
    });
  });
};

// Llamar a la función inicial con "todos"
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
      document.getElementById("mapa").classList.add("disabled")
      contenedor.innerHTML = `
      <div class="col-12 divSinSocios"> 
        <h1 class="sinSocios"> Aún no hay socios.</h1> 
      </div>
      `;
    }
  });
});
