function randomColor() {
  // Cores vibrantes e futuristas
  const h = Math.floor(Math.random() * 360);
  const s = 70 + Math.floor(Math.random() * 30);
  const l = 45 + Math.floor(Math.random() * 20);
  return `hsl(${h},${s}%,${l}%)`;
}

let paletteData = Array(5).fill().map(() => ({ color: randomColor(), locked: false }));

function generatePalette() {
  paletteData = paletteData.map(item =>
    item.locked ? item : { color: randomColor(), locked: false }
  );
  renderPalette();
}

function renderPalette() {
  const palette = document.getElementById('palette');
  palette.innerHTML = '';
  paletteData.forEach((item, i) => {
    const block = document.createElement('div');
    block.className = 'color-block' + (item.locked ? ' locked' : '');
    block.style.background = item.color;
    block.innerHTML = `
      <!--<span>${item.color}</span>-->
      <span class="lock${item.locked ? ' locked' : ''}" onclick="toggleLock(event,${i})">
        ${item.locked ? '🔒' : '🔓'}
      </span>
    `;
    block.onclick = (e) => { if (e.target.className.indexOf('lock') === -1) copyColor(item.color); };
    palette.appendChild(block);
  });
  // Atualiza gradiente
  document.getElementById('gradient').style.background = 
    `linear-gradient(90deg, ${paletteData.map(x=>x.color).join(',')})`;
  document.getElementById('copied').textContent = '';
}

function toggleLock(e, i) {
  e.stopPropagation();
  paletteData[i].locked = !paletteData[i].locked;
  renderPalette();
}

function copyColor(color) {
  navigator.clipboard.writeText(color);
  document.getElementById('copied').textContent = `Copied: ${color}`;
  setTimeout(() => document.getElementById('copied').textContent = '', 1200);
}

window.onload = () => {
  renderPalette();
};
window.generatePalette = generatePalette;
window.toggleLock = toggleLock;