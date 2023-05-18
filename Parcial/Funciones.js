function CrearPoligono(n, r) {
  const vertices = [];
  const a = (2 * Math.PI) / n;

  for (let i = 0; i < n; i++) {
    const x = r * Math.cos(i * a);
    const y = r * Math.sin(i * a);
    vertices.push([x, y]);
  }
  return vertices;
}

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(80,window.innerWidth / window.innerHeight,0.1,1000);
const renderer = new THREE.WebGLRenderer({ alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x000000); // Establecer el color de fondo a negro
document.body.appendChild(renderer.domElement);

const piramides = [];

function crearPiramidesPoligonales() {
  const vertices = CrearPoligono(5, 1);

  const totalPiramides = 8;
  const piramidesPorFila = 4;
  const separacionHorizontal = 2.5; // Ajusta la separación de las pirámides de manera horizontal
  const separacionVertical = 3; // Ajusta la separación de las pirámides de manera vertical

  // Agregar luz ambiental
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  // Agregar luz direccional
  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(0, 1, 1);
  scene.add(directionalLight);

  const totalFilas = Math.ceil(totalPiramides / piramidesPorFila);
  const totalAnchoPiramides = (piramidesPorFila - 1) * separacionHorizontal;
  const totalAltoPiramides = (totalFilas - 1) * separacionVertical;
  const centroX = totalAnchoPiramides / 2;
  const centroY = totalAltoPiramides / 2;

  for (let i = 0; i < totalPiramides; i++) {
    const color = getRandomColor();

    const geometry = new THREE.CylinderGeometry(0.2, 0.5, 1, vertices.length);
    const material = new THREE.MeshPhongMaterial({
      color: color,
      shininess: 100,
    });
    const piramide = new THREE.Mesh(geometry, material);
    piramide.scale.set(2, 2, 2); // Ajustar la escala de la pirámide

    const fila = Math.floor(i / piramidesPorFila);
    const columna = i % piramidesPorFila;

    piramide.position.x =
      columna * separacionHorizontal -
      ((piramidesPorFila - 1) * separacionHorizontal) / 2;
    piramide.position.y = fila * separacionVertical; // Ajustar la posición vertical

    piramides.push(piramide);
    scene.add(piramide);
  }

  camera.position.z = 5;

  function animate() {
    requestAnimationFrame(animate);

    renderer.render(scene, camera);
  }

  animate();
}

crearPiramidesPoligonales();

// Función para generar un color aleatorio en formato hexadecimal
function getRandomColor() {
  const letters = '0123456789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
