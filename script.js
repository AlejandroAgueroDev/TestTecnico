document.addEventListener("DOMContentLoaded", () => {
  const grid = document.getElementById("grid");
  const totalColumnas = 100;
  const tamañoCeldas = window.innerWidth / totalColumnas;
  const totalFilas = Math.floor(window.innerHeight / tamañoCeldas);
  const colorPicker = document.getElementById("colorPicker");
  let selectorColor = "black";
  let isDrawing = false;

  grid.style.gridTemplateRows = `repeat(${totalFilas}, 1fr)`;

  for (let i = 0; i < totalColumnas * totalFilas; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");

    cell.addEventListener("click", () => {
      cell.style.backgroundColor =
        cell.style.backgroundColor === selectorColor ? "white" : selectorColor;
    });

    cell.addEventListener("mousedown", (e) => {
      if (e.button === 0) {
        isDrawing = true;
        cell.style.backgroundColor = selectorColor;
      }
    });

    cell.addEventListener("mouseenter", () => {
      if (isDrawing) {
        cell.style.backgroundColor = selectorColor;
      }
    });

    cell.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      colorPicker.classList.add("visible");
      colorPicker.style.left = `${e.pageX}px`;
      colorPicker.style.top = `${e.pageY}px`;
    });

    grid.appendChild(cell);
  }

  document.addEventListener("mouseup", () => {
    isDrawing = false;
  });

  document.addEventListener("click", (e) => {
    if (!colorPicker.contains(e.target)) {
      colorPicker.classList.remove("visible");
    }
  });

  colorPicker.addEventListener("mouseleave", () => {
    colorPicker.classList.remove("visible");
  });

  document.querySelectorAll(".color-option").forEach((option) => {
    option.addEventListener("click", (e) => {
      selectorColor = e.target.getAttribute("data-color");
      colorPicker.classList.remove("visible");
    });
  });
});
