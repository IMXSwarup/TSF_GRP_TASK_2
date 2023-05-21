const fileUpload = document.getElementById('file-upload');
const uploadedImage = document.getElementById('uploaded-image');
const colorBoxes = document.getElementById('color-boxes');

fileUpload.addEventListener('change', function(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(event) {
    uploadedImage.src = event.target.result;
    uploadedImage.style.display = 'block';
    colorBoxes.innerHTML = '';
  };

  reader.readAsDataURL(file);
});

uploadedImage.addEventListener('click', function(event) {
  const canvas = document.createElement('canvas');
  canvas.width = uploadedImage.width;
  canvas.height = uploadedImage.height;
  const ctx = canvas.getContext('2d');
  ctx.drawImage(uploadedImage, 0, 0, canvas.width, canvas.height);

  const x = event.offsetX;
  const y = event.offsetY;
  const pixelData = ctx.getImageData(x, y, 1, 1).data;
  const r = pixelData[0];
  const g = pixelData[1];
  const b = pixelData[2];
  const color = `rgb(${r}, ${g}, ${b})`;
  const hex = rgbToHex(r, g, b);

  const colorBox = document.createElement('div');
  colorBox.style.backgroundColor = color;
  colorBox.classList.add('color-box');
  colorBoxes.appendChild(colorBox);

  const colorLabel = document.createElement('span');
  colorLabel.classList.add('color-label');
  colorLabel.innerText = `${color} (${hex})`;
  colorBoxes.appendChild(colorLabel);
});

function rgbToHex(r, g, b) {
  const componentToHex = (c) => {
    const hex = c.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
