const filters = {
  Brightness: { value: 100, min: 0, max: 200, unit: "%" },
  Contrast: { value: 100, min: 0, max: 200, unit: "%" },
  Exposure: { value: 100, min: 0, max: 200, unit: "%" },
  Saturation: { value: 100, min: 0, max: 200, unit: "%" },
  HueRotation: { value: 0, min: 0, max: 360, unit: "deg" },
  Blur: { value: 0, min: 0, max: 20, unit: "px" },
  Grayscale: { value: 0, min: 0, max: 100, unit: "%" },
  Sepia: { value: 0, min: 0, max: 100, unit: "%" },
  Opacity: { value: 100, min: 0, max: 100, unit: "%" },
  Invert: { value: 0, min: 0, max: 100, unit: "%" },
};
const imageCanvas = document.querySelector("#image-canvas");
const filterContainer = document.querySelector(".filters");
const imgInput = document.querySelector("#image-input");
const canvasCtx = imageCanvas.getContext("2d");
let file = null;
let imagess = null;

function createFilterElement(name, unit = "%", value, min, max) {
  const div = document.createElement("div");
  div.classList.add("filter");

  const input = document.createElement("input");
  input.type = "range";
  input.min = min;
  input.max = max;
  input.value = value;
  input.id = name;

  const p = document.createElement("p");
  p.innerText = name;

  div.appendChild(p);
  div.appendChild(input);

  input.addEventListener("input", (event) => {
    console.log(input.value);
  });

  return div;
}
Object.keys(filters).forEach((key) => {
  const filterElement = createFilterElement(
    key,
    filters[key].unit,
    filters[key].value,
    filters[key].min,
    filters[key].max,
  );
  filterContainer.appendChild(filterElement);
});

imgInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  const img = new Image();
  const imagePlaceholder = document.querySelector(".placeholder");
  imagePlaceholder.style.display = "none";
  img.src = URL.createObjectURL(file);
  img.onload = () => {
    imagess = img;
    imageCanvas.width = img.width;
    imageCanvas.height = img.height;
    canvasCtx.drawImage(img, 0, 0);
  };
});
function Applyblur() {
  canvasCtx.filter = `blur(5px)`;
  canvasCtx.drawImage(imagess, 0, 0);
}
