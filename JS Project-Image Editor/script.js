let filters = {
  Brightness: { value: 100, min: 0, max: 200, unit: "%" },
  Contrast: { value: 100, min: 0, max: 200, unit: "%" },
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
const resetButton = document.querySelector("#reset-btn");
const downloadButton = document.querySelector("#download-btn");
const presetsContainer = document.querySelector(".presets");
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
    filters[name].value = input.value;
    ApplyFilters();
  });

  return div;
}

function createFilter() {
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
}
createFilter();

imgInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  const img = new Image();
  const imagePlaceholder = document.querySelector(".placeholder");
  imageCanvas.style.display = "block";
  imagePlaceholder.style.display = "none";
  img.src = URL.createObjectURL(file);
  img.onload = () => {
    imagess = img;
    imageCanvas.width = img.width;
    imageCanvas.height = img.height;
    canvasCtx.drawImage(img, 0, 0);
  };
});
function ApplyFilters() {
  canvasCtx.filter = `
    brightness(${filters.Brightness.value}${filters.Brightness.unit})
    contrast(${filters.Contrast.value}${filters.Contrast.unit})
    saturate(${filters.Saturation.value}${filters.Saturation.unit})
    hue-rotate(${filters.HueRotation.value}${filters.HueRotation.unit})
    blur(${filters.Blur.value}${filters.Blur.unit})
    grayscale(${filters.Grayscale.value}${filters.Grayscale.unit})
    sepia(${filters.Sepia.value}${filters.Sepia.unit})
    opacity(${filters.Opacity.value}${filters.Opacity.unit})
    invert(${filters.Invert.value}${filters.Invert.unit})
  `.trim();
  canvasCtx.clearRect(0, 0, imageCanvas.width, imageCanvas.height);
  canvasCtx.drawImage(imagess, 0, 0);
}
resetButton.addEventListener("click", () => {
  filters = {
    Brightness: { value: 100, min: 0, max: 200, unit: "%" },
    Contrast: { value: 100, min: 0, max: 200, unit: "%" },
    Saturation: { value: 100, min: 0, max: 200, unit: "%" },
    HueRotation: { value: 0, min: 0, max: 360, unit: "deg" },
    Blur: { value: 0, min: 0, max: 20, unit: "px" },
    Grayscale: { value: 0, min: 0, max: 100, unit: "%" },
    Sepia: { value: 0, min: 0, max: 100, unit: "%" },
    Opacity: { value: 100, min: 0, max: 100, unit: "%" },
    Invert: { value: 0, min: 0, max: 100, unit: "%" },
  };
  ApplyFilters();
  filterContainer.innerHTML = "";
  createFilter();
});

downloadButton.addEventListener("click", () => {
  const link = document.createElement("a");
  link.download = "edited-image.png";
  link.href = imageCanvas.toDataURL();
  link.click();
});

const presets = {
  Default: {
    Brightness: 100,
    Contrast: 100,
    Saturation: 100,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },
  Drama: {
    Brightness: 90,
    Contrast: 160,
    Saturation: 110,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },
  Vintage: {
    Brightness: 105,
    Contrast: 90,
    Saturation: 70,
    HueRotation: 10,
    Blur: 0,
    Grayscale: 0,
    Sepia: 40,
    Opacity: 100,
    Invert: 0,
  },
  OldSchool: {
    Brightness: 95,
    Contrast: 85,
    Saturation: 0,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 100,
    Sepia: 20,
    Opacity: 100,
    Invert: 0,
  },
  Faded: {
    Brightness: 115,
    Contrast: 80,
    Saturation: 70,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 10,
    Sepia: 15,
    Opacity: 90,
    Invert: 0,
  },
  Noir: {
    Brightness: 85,
    Contrast: 150,
    Saturation: 0,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 100,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },
  Dreamy: {
    Brightness: 115,
    Contrast: 85,
    Saturation: 120,
    HueRotation: 10,
    Blur: 2,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 95,
    Invert: 0,
  },
  Cyberpunk: {
    Brightness: 110,
    Contrast: 150,
    Saturation: 200,
    HueRotation: 180,
    Blur: 0,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },
  Sunset: {
    Brightness: 110,
    Contrast: 110,
    Saturation: 150,
    HueRotation: 20,
    Blur: 0,
    Grayscale: 0,
    Sepia: 30,
    Opacity: 100,
    Invert: 0,
  },
  Matte: {
    Brightness: 110,
    Contrast: 90,
    Saturation: 85,
    HueRotation: 0,
    Blur: 0,
    Grayscale: 5,
    Sepia: 10,
    Opacity: 100,
    Invert: 0,
  },
  Horror: {
    Brightness: 70,
    Contrast: 160,
    Saturation: 50,
    HueRotation: 0,
    Blur: 1,
    Grayscale: 40,
    Sepia: 0,
    Opacity: 100,
    Invert: 10,
  },
  Aqua: {
    Brightness: 105,
    Contrast: 105,
    Saturation: 140,
    HueRotation: 160,
    Blur: 0,
    Grayscale: 0,
    Sepia: 0,
    Opacity: 100,
    Invert: 0,
  },
};

Object.keys(presets).forEach((presetName) => {
  const presetButton = document.createElement("button");
  presetButton.classList.add("btn");
  presetButton.innerText = presetName;
  presetsContainer.appendChild(presetButton);
  presetButton.addEventListener("click", () => {
    const preset = presets[presetName];
    Object.keys(preset).forEach((filterName) => {
      filters[filterName].value = preset[filterName];
    });
    ApplyFilters();
    filterContainer.innerHTML = "";
    createFilter();
  });
});
