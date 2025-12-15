document.addEventListener("DOMContentLoaded", () => {

  const intro = document.getElementById('intro');
  const form = document.getElementById('formSection');
  const cert = document.getElementById('certificate');

  const bgMusic = document.getElementById('bgMusic');
  const celebrateMusic = document.getElementById('celebrateMusic');

  // START
  document.getElementById('startBtn').addEventListener('click', () => {
    bgMusic.play();
    intro.classList.add('hidden');
    form.classList.remove('hidden');
  });

  // SIGNATURE
  const canvas = document.getElementById('sign');
  const ctx = canvas.getContext('2d');
  let drawing = false;

  canvas.addEventListener('mousedown', () => drawing = true);
  canvas.addEventListener('mouseup', () => {
    drawing = false;
    ctx.beginPath();
  });
  canvas.addEventListener('mousemove', e => {
    if (!drawing) return;
    ctx.lineWidth = 2;
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.stroke();
  });

  // CREATE CERTIFICATE
  document.getElementById('createBtn').addEventListener('click', () => {
    const name = document.getElementById('name').value.trim();
    const year = document.getElementById('year').value;
    const promise = document.getElementById('promise').value.trim();

    if (!name || !promise) {
      alert("Please fill all fields");
      return;
    }

    celebrateMusic.play();

    document.getElementById('cn').innerText = name;
    document.getElementById('cy').innerText = `Year: ${year}`;
    document.getElementById('cp').innerText = promise;
    document.getElementById('cd').innerText = new Date().toDateString();
    document.getElementById('sigImg').src = canvas.toDataURL();

    document.getElementById('qrLink').innerHTML = "";
    new QRCode(document.getElementById("qrLink"), {
      text: location.href,
      width: 120,
      height: 120
    });

    form.classList.add('hidden');
    cert.classList.remove('hidden');
  });

  // SHARE
  document.getElementById('shareBtn').addEventListener('click', async () => {
    if (navigator.share) {
      await navigator.share({
        title: "My Self Promise",
        text: "I created my New Year self promise ✨",
        url: location.href
      });
    } else {
      navigator.clipboard.writeText(location.href);
      alert("Link copied!");
    }
  });

  // MUSIC CONTROL
  document.getElementById('playMusic').onclick = () => bgMusic.play();
  document.getElementById('pauseMusic').onclick = () => bgMusic.pause();

});
