import { initializeApp } from "https://www.gstatic.com/firebasejs/9.0.0/firebase-app.js";
import {
  getFirestore,
  addDoc,
  collection,
  getDocs,
  query,
  doc,
  updateDoc,
} from "https://www.gstatic.com/firebasejs/9.0.0/firebase-firestore.js";
import { firebaseConfig } from "./firebaseConfig.js";

// Inicializa Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

//funcion para pasar el animal a infoAnimal
const guardarAnimal = (nombre, img, descripcion, requerimientos, edad) => {
  const animal = {
    nombre: nombre,
    img: img,
    descripcion: descripcion,
    requerimientos: requerimientos,
    edad: edad,
  };
  console.log(animal);
  localStorage.setItem("animalSeleccionado", JSON.stringify(animal));
};

const filtroAnimales = async (departamento) => {
  const contenedor = document.getElementById("output");
  const loading = document.getElementById("loading");

  // Muestra el ícono de carga
  loading.style.display = "flex";

  const q = query(collection(db, "animales"));
  const querySnapshot = await getDocs(q);

  contenedor.innerHTML = ""; // Asegúrate de limpiar el contenido antes de agregar nuevas tarjetas

  querySnapshot.forEach((doc) => {
    if (
      doc.data().refugio.departamento == departamento ||
      departamento == "todos"
    ) {
      contenedor.innerHTML += `
        <div class="card">
          <div class="card-header">${
            doc.data().refugio ? doc.data().refugio.nombre : "Sin refugio"
          }</div>
          <div class="card-body">
            <img class="imgCard img-fluid" src="${doc.data().img}" alt="" />
            <h5 class="card-title cardNombreAnimal">${doc.data().nombre} - ${
        doc.data().edad
      }</h5>
            <p class="card-text">
              ${doc.data().descripcion}
            </p>
            <a href="./infoAnimal.html" class="btn btn-primary ver-info" data-nombre="${doc.data().nombre}" data-img="${doc.data().img}" data-descripcion="${doc.data().descripcion}" data-requerimientos="${doc.data().requerimientos}" data-edad="${doc.data().edad}">
              Ver info
            </a>
            <a href="./formulario.html" class="btn btn-primary">
              Adoptar
            </a>
          </div>
        </div>
      `;
    }

  });

  document.querySelectorAll(".ver-info").forEach((boton) => {
    boton.addEventListener("click", (e) => {
      const nombre = e.currentTarget.dataset.nombre;
      const img = e.currentTarget.dataset.img;
      const descripcion = e.currentTarget.dataset.descripcion;
      const requerimientos = e.currentTarget.dataset.requerimientos;
      const edad = e.currentTarget.dataset.edad;
  
      guardarAnimal(nombre, img, descripcion, requerimientos, edad);
    });
  });

  // Si no hay animales, muestra el mensaje de "No hay animales"
  if (contenedor.innerHTML === "") {
    contenedor.innerHTML = `
      <div> 
        <h1> No hay animales </h1> 
      </div>
    `;
  }

  // Oculta el ícono de carga después de que las tarjetas se han cargado
  loading.style.display = "none";
};

filtroAnimales("todos");

// filtro
const btnCategoria = document.querySelectorAll(".btnCategoria");

btnCategoria.forEach((boton) => {
  boton.addEventListener("click", async (e) => {
    let contenedor = document.querySelector("#output");
    contenedor.innerHTML = "";
    if (e.currentTarget.id != "todos") {
      await filtroAnimales(e.currentTarget.id);
    } else if (e.currentTarget.id == "todos") {
      await filtroAnimales("todos");
    }
  });
});

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
      refugio: refugio,
    });
  } else {
    console.log("Refugio no encontrado.");
  }
};

// Llamar a la función para asignar un refugio a un animal
// actualizarAnimalConRefugio("62huk8FkntYZeu35pOwd", "Refugio Vida y Patas");
// actualizarAnimalConRefugio("6m4TNwyhlE1YZIufPhZV", "Refugio Animal Feliz");
// actualizarAnimalConRefugio("7ohTGIzkJhUcVAUqJAkn", "Hogar Canino Los Andes");
// actualizarAnimalConRefugio("MYInudbVBfjJ0udVpP3C", "Refugio Esperanza Animal");
// actualizarAnimalConRefugio("OfWldRS0JH4WdL5TdLbS", "Centro de Rescate Paws");
// actualizarAnimalConRefugio("QccndE4uRVhcLYqgZcIh", "Salvemos a los Peludos");
// actualizarAnimalConRefugio(
//   "geTScF51MdeDEh2aR8Wv",
//   "Refugio Amigos de Cuatro Patas"
// );
// actualizarAnimalConRefugio("yfdiii0vr3miuU51jcJP", "Santuario Animal Mendoza");
