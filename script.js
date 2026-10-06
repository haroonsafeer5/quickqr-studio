const qrInput = document.querySelector("#qrInput");
const sizeSelect = document.querySelector("#sizeSelect");
const fgColor = document.querySelector("#fgColor");
const bgColor = document.querySelector("#bgColor");
const generateBtn = document.querySelector("#generateBtn");
const qrcodeDiv = document.querySelector("#qrcode");
const downloadBtn = document.querySelector("#downloadBtn");

let qrCodeObj = null;

function generateQRCode() {
  const text = qrInput.value.trim();

  if (!text) {
    alert("Please enter some text or a URL!");
    return;
  }

  // Clear previous QR code
  qrcodeDiv.innerHTML = "";

  const size = parseInt(sizeSelect.value);

  // Generate new QR Code using library
  qrCodeObj = new QRCode(qrcodeDiv, {
    text: text,
    width: size,
    height: size,
    colorDark: fgColor.value,
    colorLight: bgColor.value,
    correctLevel: QRCode.CorrectLevel.H
  });

  // Show Download Button
  setTimeout(() => {
    downloadBtn.style.display = "block";
  }, 200);
}

// Download generated QR Code image
downloadBtn.addEventListener("click", () => {
  const img = qrcodeDiv.querySelector("img");
  if (img) {
    const link = document.createElement("a");
    link.href = img.src;
    link.download = "qrcode.png";
    link.click();
  }
});

generateBtn.addEventListener("click", generateQRCode);

// Allow Enter key to generate
qrInput.addEventListener("keyup", (e) => {
  if (e.key === "Enter") generateQRCode();
});