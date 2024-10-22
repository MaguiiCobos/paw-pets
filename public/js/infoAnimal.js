window.onload = () => {
  const animal = JSON.parse(localStorage.getItem("animalSeleccionado"));

  if (animal) {
    document.querySelector(".imgInfo").src = animal.img;
    document.querySelector(".cardNombreAnimal").innerText = animal.nombre;
    document.querySelector(".card-text").innerText = animal.descripcion;
    document.querySelector(".requerimientos").innerText = animal.requerimientos;
    document.querySelector(".cardEdadAnimal").innerText = animal.edad;
  }
};
