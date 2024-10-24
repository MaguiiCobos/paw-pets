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
import { firebaseConfig } from "../firebaseConfig.js";

// Inicializa Firebase y Firestore
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const animales = [
  {
    nombre: "Manolo",
    edad: "8 meses",
    descripcion:
      "Manolo es un perrito rescatado, súper amoroso y juguetón. Va a ser de raza mediana o grande. Es ideal para familias con niños.",
    refugio: {},
    img: "https://revistacosas.mx/wp-content/uploads/2020/11/perro-limpieza.jpg",
    raza: "",
    tamanio: "",
    requerimientos: "• Ser mayor de 18 años.   • Aceptar visitas de seguimientos.   • Compromisos de cuidados veterinarios.   • Tener un espacio adecuado para la mascota. ",
    estado_salud: {
      vacunas: "",
      castracion: "",
      enfermedad: "",
      otro: "",
    },
  },
  {
    nombre: "Princesa",
    edad: "5 meses",
    descripcion:
      "Princesa es una cachorra muy tranquila y cariñosa, perfecta para acompañarte en el día a día.",
    refugio: {},
    img: "https://humanidades.com/wp-content/uploads/2017/02/perro-1-e1561678907722.jpg",
    raza: "",
    tamanio: "",
    requerimientos: "• Ser mayor de 18 años.   • Aceptar visitas de seguimientos.   • Compromisos de cuidados veterinarios.   • Tener un espacio adecuado para la mascota. ",
    refugio: "",
    estado_salud: {
      vacunas: "",
      castracion: "",
      enfermedad: "",
      otro: "",
    },
  },
  {
    nombre: "Coca",
    edad: "8 años",
    descripcion:
      "Es una perrita traviesa y divertida, que le gusta estar en compañia.",
    refugio: {},
    img: "https://nupec.com/wp-content/uploads/2020/07/Captura-de-pantalla-2020-07-24-a-las-17.01.11.png",
    raza: "",
    tamanio: "",
    requerimientos: "• Ser mayor de 18 años.   • Aceptar visitas de seguimientos.   • Compromisos de cuidados veterinarios.   • Tener un espacio adecuado para la mascota. ",
    estado_salud: {
      vacunas: "",
      castracion: "",
      enfermedad: "",
      otro: "",
    },
  },
  {
    nombre: "Romeo",
    edad: "4 meses",
    descripcion:
      "¡Este cachorro de 4 meses es una bolita de pelos juguetona y adorable! Romeo todavía está aprendiendo modales, pero es muy amoroso y le encanta jugar.",
    refugio: {},
    img: "https://media.traveler.es/photos/613760adcb06ad0f20e11980/master/w_1600%2Cc_limit/202931.jpg",
    raza: "",
    tamanio: "",
    requerimientos: "• Ser mayor de 18 años.   • Aceptar visitas de seguimientos.   • Compromisos de cuidados veterinarios.   • Tener un espacio adecuado para la mascota. ",
    estado_salud: {
      vacunas: "",
      castracion: "",
      enfermedad: "",
      otro: "",
    },
  },
  {
    nombre: "Karola",
    edad: "2 años",
    descripcion:
      "Le encanta aprender trucos y salir a correr. Es ideal para personas que buscan un perro activo para entrenar. Tamaño grande.",
    refugio: {},
    img: "https://s1.elespanol.com/2022/04/19/curiosidades/mascotas/666193753_223665685_1706x960.jpg",
    raza: "",
    tamanio: "",
    requerimientos: "• Ser mayor de 18 años.   • Aceptar visitas de seguimientos.   • Compromisos de cuidados veterinarios.   • Tener un espacio adecuado para la mascota. ",
    estado_salud: {
      vacunas: "",
      castracion: "",
      enfermedad: "",
      otro: "",
    },
  },
  {
    nombre: "Lola",
    edad: "1 año",
    descripcion:
      "Es una gatita traviesa y divertida, que disfruta estar en compañía. Le encanta jugar con los niños.",
    refugio: {},
    img: "https://es.mypet.com/wp-content/uploads/sites/23/2021/03/GettyImages-623368750-e1582816063521-1.jpg",
    raza: "",
    tamanio: "",
    requerimientos: "• Ser mayor de 18 años.   • Aceptar visitas de seguimientos.   • Compromisos de cuidados veterinarios.   • Tener un espacio adecuado para la mascota. ",
    estado_salud: {
      vacunas: "",
      castracion: "",
      enfermedad: "",
      otro: "",
    },
  },
  {
    nombre: "Zuma",
    edad: "3 años",
    descripcion:
      "Es un perro inteligente y obediente, le encanta aprender trucos y salir a correr.",
    refugio: {},
    img: "https://estaticos-cdn.prensaiberica.es/clip/730f1242-ae3f-486f-b882-3b4d26d53d52_16-9-discover-aspect-ratio_default_0.jpg",
    raza: "",
    tamanio: "",
    requerimientos: "• Ser mayor de 18 años.   • Aceptar visitas de seguimientos.   • Compromisos de cuidados veterinarios.   • Tener un espacio adecuado para la mascota. ",
    estado_salud: {
      vacunas: "",
      castracion: "",
      enfermedad: "",
      otro: "",
    },
  },
  {
    nombre: "Memo",
    edad: "5 meses",
    descripcion: "Memo es un gatito muy divertido, que le gusta jugar y estar en compañía de otros animales, por lo que es ideal si tienes más mascotas.",
    refugio: {},
    img: "https://fotografias.larazon.es/clipping/cmsimages01/2024/01/19/4ED02194-BB5A-4698-97DD-551467CAC980/descubre-5-cosas-que-haran-feliz-gato_98.jpg?crop=1600,900,x0,y0&width=1900&height=1069&optimize=low&format=webply",
    raza: "",
    tamanio: "",
    requerimientos: "• Ser mayor de 18 años.   • Aceptar visitas de seguimientos.   • Compromisos de cuidados veterinarios.   • Tener un espacio adecuado para la mascota. ",
    estado_salud: {
      vacunas: "",
      castracion: "",
      enfermedad: "",
      otro: "",
    },
  },
];

 







//segun chat gpt
const getRefugios = async () => {
  const q = query(collection(db, "refugios"));
  const querySnapshot = await getDocs(q);
  let refugios = [];

  querySnapshot.forEach((doc) => {
    refugios.push(doc); // Guarda el documento completo en el array
  });

  return refugios; // Devuelve la lista de documentos
};

const asignarRefugio = async (nombreRefugio) => {
  const refugios = await getRefugios(); // Espera que se resuelvan los datos

  const refugioEncontrado = refugios.find((element) => {
    return element.data().nombre === nombreRefugio;
  });

  return refugioEncontrado ? refugioEncontrado.data() : null; // Devuelve el refugio encontrado o null
};

asignarRefugio("Refugio Vida y Patas")
  .then((refugio) => {
    // console.log(refugio); // Aquí puedes ver el objeto refugio
  })
  .catch((error) => {
    console.error("Error:", error);
  });
