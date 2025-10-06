// ============================================
// MAIN APP CODE
// ============================================

let scene, camera, renderer;
let dnaHelix;
let circleObjects = [];
let time = 0;
let raycaster, mouse;
let isZoomedIn = false;
let zoomedObject = null;
let cameraTarget = { x: 0, y: 0, z: 12 };
let cameraLookAt = { x: 0, y: 0, z: 0 };
let isTransitioning = false;
let transitionProgress = 0;
let dnaParticles = [];

class PerlinNoise {
    constructor() {
        this.perm = [];
        for(let i = 0; i < 256; i++) this.perm[i] = i;
        for(let i = 255; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.perm[i], this.perm[j]] = [this.perm[j], this.perm[i]];
        }
        this.perm = this.perm.concat(this.perm);
    }
    
    fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
    lerp(t, a, b) { return a + t * (b - a); }
    grad(hash, x, y) {
        const h = hash & 15;
        const u = h < 8 ? x : y;
        const v = h < 4 ? y : h === 12 || h === 14 ? x : 0;
        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    }
    
    noise(x, y) {
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;
        x -= Math.floor(x);
        y -= Math.floor(y);
        const u = this.fade(x);
        const v = this.fade(y);
        const a = this.perm[X] + Y;
        const b = this.perm[X + 1] + Y;
        return this.lerp(v,
            this.lerp(u, this.grad(this.perm[a], x, y),
                         this.grad(this.perm[b], x - 1, y)),
            this.lerp(u, this.grad(this.perm[a + 1], x, y - 1),
                         this.grad(this.perm[b + 1], x - 1, y - 1))
        );
    }
}

const perlin = new PerlinNoise();

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xf5f5f0);
    scene.fog = new THREE.Fog(0x8e44ad, 15, 30);

    raycaster = new THREE.Raycaster();
    mouse = new THREE.Vector2();

    camera = new THREE.PerspectiveCamera(75, (window.innerWidth * 0.6) / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 12);
    camera.lookAt(0, 0, 0);

    renderer = new THREE.WebGLRenderer({ antialias: true, preserveDrawingBuffer: true });
    renderer.setSize(window.innerWidth * 0.6, window.innerHeight);
    renderer.shadowMap.enabled = true;
    document.body.appendChild(renderer.domElement);

    createDNAHelix();

    for (let i = 0; i < 80; i++) {
        const vibrantColors = [
            0xff6b9d, 0xc44569, 0x8e44ad, 0x3498db, 
            0x1abc9c, 0xf39c12, 0xe74c3c, 0x9b59b6,
            0xff6348, 0xfeca57, 0x48dbfb, 0xff9ff3,
            0x54a0ff, 0xee5a6f, 0x00d2d3, 0x5f27cd
        ];
        const randomColor = vibrantColors[Math.floor(Math.random() * vibrantColors.length)];
        const size = Math.random() * 0.15 + 0.05;
        const x = (Math.random() - 0.5) * 15;
        const y = (Math.random() - 0.5) * 10;
        const z = (Math.random() - 0.5) * 15;
        createFloatingParticle(x, y, z, randomColor, size);
    }

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
    directionalLight.position.set(5, 8, 5);
    directionalLight.castShadow = true;
    scene.add(directionalLight);

    const pointLight1 = new THREE.PointLight(0xff6b9d, 1.2, 20);
    pointLight1.position.set(-5, 3, 3);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x3498db, 1.0, 20);
    pointLight2.position.set(5, 3, -3);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0xf39c12, 0.8, 18);
    pointLight3.position.set(0, 5, 5);
    scene.add(pointLight3);

    const pointLight4 = new THREE.PointLight(0x1abc9c, 0.9, 18);
    pointLight4.position.set(0, -2, -5);
    scene.add(pointLight4);

    window.addEventListener('resize', onWindowResize, false);
    window.addEventListener('mousemove', onMouseMove, false);
    window.addEventListener('click', onMouseClick, false);
    
    const backBtn = document.getElementById('back-btn');
    backBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        zoomOut();
    });
    backBtn.addEventListener('touchstart', function(e) {
        e.preventDefault();
        e.stopPropagation();
        zoomOut();
    });
    
    const uploadArea = document.getElementById('upload-area');
    const fileInput = document.getElementById('file-input');
    
    uploadArea.addEventListener('click', () => fileInput.click());
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('dragover');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('dragover');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('dragover');
        const file = e.dataTransfer.files[0];
        if (file && file.name.endsWith('.txt')) {
            handleFileUpload(file);
        }
    });
    
    fileInput.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (file) {
            handleFileUpload(file);
        }
    });
    
    const audioToggle = document.getElementById('audio-toggle');
    const bgMusic = document.getElementById('bg-music');
    
    audioToggle.addEventListener('click', () => {
        if (bgMusic.paused) {
            bgMusic.play();
            audioToggle.textContent = '🔊';
            audioToggle.title = 'Mute';
        } else {
            bgMusic.pause();
            audioToggle.textContent = '🔇';
            audioToggle.title = 'Unmute';
        }
    });
    
    const cameraBtn = document.getElementById('camera-btn');
    cameraBtn.addEventListener('click', () => {
        const canvas = renderer.domElement;
        const link = document.createElement('a');
        link.download = 'dna_solar_system.png';
        link.href = canvas.toDataURL();
        link.click();
    });
    
    const downloadBtn = document.getElementById('download-btn');
    downloadBtn.addEventListener('click', () => {
        const { jsPDF } = window.jspdf;
        const pdf = new jsPDF();
        
        const textContent = document.getElementById('text-content').innerText;
        const lines = pdf.splitTextToSize(textContent, 180);
        
        pdf.setFontSize(12);
        pdf.text(lines, 15, 15);
        
        pdf.save('dna_analysis.pdf');
    });
}

async function handleFileUpload(file) {
    const loadingContainer = document.getElementById('loading-container');
    const loadingBar = document.getElementById('loading-bar');
    const uploadArea = document.getElementById('upload-area');
    const textContent = document.getElementById('text-content');
    const downloadBtn = document.getElementById('download-btn');
    
    uploadArea.style.display = 'none';
    loadingContainer.style.display = 'block';
    loadingBar.style.width = '10%';
    
    const reader = new FileReader();
    reader.onload = async (e) => {
        const fileContent = e.target.result;
        
        loadingBar.style.width = '20%';
        
        const { filteredContent, originalCount, filteredCount, reduction } = filterDNAFile(fileContent);
        
        loadingBar.style.width = '25%';
        
        const analysisResult = await analyzeDNAWithClaude(filteredContent);
        
        setTimeout(() => {
            loadingContainer.classList.add('fade-out');
            setTimeout(() => {
                loadingContainer.style.display = 'none';
                loadingContainer.classList.remove('fade-out');
                loadingBar.style.width = '0%';
            }, 500);
        }, 500);
        
        textContent.classList.add('fade-in');
        textContent.innerHTML = analysisResult || 'Your DNA Solar System<br><br>Explore the unique set of planets generated from your DNA sequence - one of over 10 million possibilities!<br><br>Click on any planet to learn insights about your DNA.';
        
        downloadBtn.classList.add('visible');
        
        startTransition();
    };
    
    reader.readAsText(file);
}

function createDNAHelix() {
  dnaHelix = new THREE.Group();

  const height = 10;
  const radius = 2;
  const segments = 50;
  const turns = 2.5;

  const matBlack = new THREE.MeshPhysicalMaterial({
    color: 0x2c2c2c,
    metalness: 0.9,
    roughness: 0.1,
    clearcoat: 1.0,
    clearcoatRoughness: 0.15
  });

  const matBackbone = new THREE.MeshPhysicalMaterial({
    color: 0x3a3a3a,
    metalness: 0.8,
    roughness: 0.2
  });

  const matRung = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    metalness: 1.0,
    roughness: 0.2
  });

  const sphereGeo = new THREE.SphereGeometry(0.15, 16, 16);

  const positions1 = [];
  const positions2 = [];

  for (let i = 0; i < segments; i++) {
    const t = i / segments;
    const y = (t - 0.5) * height;
    const angle = t * Math.PI * 2 * turns;

    const x1 = Math.cos(angle) * radius;
    const z1 = Math.sin(angle) * radius;
    const x2 = Math.cos(angle + Math.PI) * radius;
    const z2 = Math.sin(angle + Math.PI) * radius;

    positions1.push({ x: x1, y: y, z: z1 });
    positions2.push({ x: x2, y: y, z: z2 });

    const sphere1 = new THREE.Mesh(sphereGeo, matBlack);
    sphere1.position.set(x1, y, z1);
    dnaHelix.add(sphere1);

    const sphere2 = new THREE.Mesh(sphereGeo, matBlack);
    sphere2.position.set(x2, y, z2);
    dnaHelix.add(sphere2);

    if (i > 0) {
      const prev1 = positions1[i - 1];
      const curr1 = positions1[i];
      const dist1 = Math.sqrt(
        Math.pow(curr1.x - prev1.x, 2) +
        Math.pow(curr1.y - prev1.y, 2) +
        Math.pow(curr1.z - prev1.z, 2)
      );
      const backboneGeo1 = new THREE.CylinderGeometry(0.05, 0.05, dist1, 8);
      const backbone1 = new THREE.Mesh(backboneGeo1, matBackbone);
      backbone1.position.set(
        (curr1.x + prev1.x) / 2,
        (curr1.y + prev1.y) / 2,
        (curr1.z + prev1.z) / 2
      );
      backbone1.lookAt(new THREE.Vector3(prev1.x, prev1.y, prev1.z));
      backbone1.rotateX(Math.PI / 2);
      dnaHelix.add(backbone1);

      const prev2 = positions2[i - 1];
      const curr2 = positions2[i];
      const dist2 = Math.sqrt(
        Math.pow(curr2.x - prev2.x, 2) +
        Math.pow(curr2.y - prev2.y, 2) +
        Math.pow(curr2.z - prev2.z, 2)
      );
      const backboneGeo2 = new THREE.CylinderGeometry(0.05, 0.05, dist2, 8);
      const backbone2 = new THREE.Mesh(backboneGeo2, matBackbone);
      backbone2.position.set(
        (curr2.x + prev2.x) / 2,
        (curr2.y + prev2.y) / 2,
        (curr2.z + prev2.z) / 2
      );
      backbone2.lookAt(new THREE.Vector3(prev2.x, prev2.y, prev2.z));
      backbone2.rotateX(Math.PI / 2);
      dnaHelix.add(backbone2);
    }

    if (i % 3 === 0) {
      const dist = Math.sqrt(
        Math.pow(x2 - x1, 2) +
        Math.pow(z2 - z1, 2)
      );
      const rungGeo = new THREE.CylinderGeometry(0.04, 0.04, dist, 8);
      const rung = new THREE.Mesh(rungGeo, matRung);
      rung.position.set((x1 + x2) / 2, y, (z1 + z2) / 2);
      rung.lookAt(new THREE.Vector3(x2, y, z2));
      rung.rotateX(Math.PI / 2);
      dnaHelix.add(rung);
    }
  }

  dnaHelix.position.y = 0;
  scene.add(dnaHelix);
}

function startTransition() {
    isTransitioning = true;
    transitionProgress = 0;
    
    cameraTarget.x = 0;
    cameraTarget.y = 10;
    cameraTarget.z = 0;
    
    const numObjects = 7;
    const radius = 4.5;
    
    for (let i = 0; i < numObjects; i++) {
        const angle = (i / numObjects) * Math.PI * 2;
        const x = Math.cos(angle) * radius;
        const z = Math.sin(angle) * radius;
        const y = 0;
        
        const vibrantColors = [0xff6b9d, 0x8e44ad, 0x3498db, 0x1abc9c, 0xf39c12, 0xe74c3c, 0x9b59b6];
        const color = vibrantColors[i % vibrantColors.length];
        
        const shapes = [
            createTorusKnot, createSpiral, createCrystal, 
            createRibbon, createStarBurst, createTwistedBox, createTorusKnot
        ];
        const shape = shapes[i % shapes.length];
        shape(x, y, z, color, angle);
    }
}

function updateTransition() {
    if (!isTransitioning) return;
    
    transitionProgress += 0.005;
    
    if (dnaHelix) {
        dnaHelix.position.y = transitionProgress * 25;
        dnaHelix.rotation.y += 0.02;
    }
    
    if (transitionProgress >= 1.0) {
        isTransitioning = false;
        if (dnaHelix) {
            scene.remove(dnaHelix);
            dnaHelix = null;
        }
    }
}

function createTorusKnot(x, y, z, color, angle) {
    const group = new THREE.Group();
    
    for (let i = 0; i < 4; i++) {
        const glowSize = 1.2 + i * 0.3;
        const glowOpacity = 0.4 - i * 0.09;
        const glowGeo = new THREE.CircleGeometry(glowSize, 32);
        const glowMat = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: glowOpacity,
            side: THREE.DoubleSide
        });
        const glow = new THREE.Mesh(glowGeo, glowMat);
        glow.rotation.x = -Math.PI / 2;
        group.add(glow);
    }
    
    const geometry = new THREE.TorusKnotGeometry(0.4, 0.15, 64, 8, 2, 3);
    const material = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.3,
        metalness: 0.6
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    group.add(mesh);
    
    group.position.set(x, y, z);
    group.scale.set(0, 0, 0);
    scene.add(group);
    
    circleObjects.push({ 
        mesh: group, angle,
        originalX: x, originalZ: z,
        rotationSpeed: 0.3,
        targetScale: 1, currentScale: 0
    });
}

function createSpiral(x, y, z, color, angle) {
    const group = new THREE.Group();
    
    for (let i = 0; i < 4; i++) {
        const glowSize = 1.3 + i * 0.3;
        const glowOpacity = 0.35 - i * 0.08;
        const glowGeo = new THREE.CircleGeometry(glowSize, 32);
        const glowMat = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: glowOpacity,
            side: THREE.DoubleSide
        });
        const glow = new THREE.Mesh(glowGeo, glowMat);
        glow.rotation.x = -Math.PI / 2;
        group.add(glow);
    }
    
    const sphereGeo = new THREE.SphereGeometry(0.08, 12, 12);
    const material = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.5,
        metalness: 0.3
    });
    
    for (let i = 0; i < 50; i++) {
        const t = i / 50;
        const spiralAngle = t * Math.PI * 6;
        const spiralRadius = t * 0.6;
        const sphere = new THREE.Mesh(sphereGeo, material);
        sphere.position.set(
            Math.cos(spiralAngle) * spiralRadius,
            (t - 0.5) * 1.5,
            Math.sin(spiralAngle) * spiralRadius
        );
        sphere.castShadow = true;
        group.add(sphere);
    }
    
    group.position.set(x, y, z);
    group.scale.set(0, 0, 0);
    scene.add(group);
    
    circleObjects.push({ 
        mesh: group, angle,
        originalX: x, originalZ: z,
        rotationSpeed: 0.25,
        targetScale: 1, currentScale: 0
    });
}

function createCrystal(x, y, z, color, angle) {
    const group = new THREE.Group();
    
    for (let i = 0; i < 4; i++) {
        const glowSize = 1.1 + i * 0.28;
        const glowOpacity = 0.4 - i * 0.09;
        const glowGeo = new THREE.CircleGeometry(glowSize, 32);
        const glowMat = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: glowOpacity,
            side: THREE.DoubleSide
        });
        const glow = new THREE.Mesh(glowGeo, glowMat);
        glow.rotation.x = -Math.PI / 2;
        group.add(glow);
    }
    
    const geometry = new THREE.OctahedronGeometry(0.7, 0);
    const positions = geometry.attributes.position;
    
    for (let i = 0; i < positions.count; i++) {
        const py = positions.getY(i);
        positions.setY(i, py * 1.3);
    }
    geometry.computeVertexNormals();
    
    const material = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.2,
        metalness: 0.8,
        flatShading: true
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.castShadow = true;
    group.add(mesh);
    
    group.position.set(x, y, z);
    group.scale.set(0, 0, 0);
    scene.add(group);
    
    circleObjects.push({ 
        mesh: group, angle,
        originalX: x, originalZ: z,
        rotationSpeed: 0.35,
        targetScale: 1, currentScale: 0
    });
}

function createRibbon(x, y, z, color, angle) {
    const group = new THREE.Group();
    
    for (let i = 0; i < 4; i++) {
        const glowSize = 1.4 + i * 0.3;
        const glowOpacity = 0.3 - i * 0.07;
        const glowGeo = new THREE.CircleGeometry(glowSize, 32);
        const glowMat = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: glowOpacity,
            side: THREE.DoubleSide
        });
        const glow = new THREE.Mesh(glowGeo, glowMat);
        glow.rotation.x = -Math.PI / 2;
        group.add(glow);
    }
    
    const segments = 40;
    
    for (let i = 0; i < segments; i++) {
        const t = i / segments;
        const ribbonAngle = t * Math.PI * 2;
        const twist = t * Math.PI;
        
        const boxGeo = new THREE.BoxGeometry(0.15, 0.05, 0.4);
        const material = new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.4,
            metalness: 0.4
        });
        const box = new THREE.Mesh(boxGeo, material);
        
        const radius = 0.6;
        box.position.set(
            Math.cos(ribbonAngle) * radius,
            Math.sin(twist) * 0.2,
            Math.sin(ribbonAngle) * radius
        );
        box.rotation.y = ribbonAngle;
        box.rotation.x = twist;
        box.castShadow = true;
        group.add(box);
    }
    
    group.position.set(x, y, z);
    group.scale.set(0, 0, 0);
    scene.add(group);
    
    circleObjects.push({ 
        mesh: group, angle,
        originalX: x, originalZ: z,
        rotationSpeed: 0.2,
        targetScale: 1, currentScale: 0
    });
}

function createStarBurst(x, y, z, color, angle) {
    const group = new THREE.Group();
    
    for (let i = 0; i < 5; i++) {
        const glowSize = 1.5 + i * 0.35;
        const glowOpacity = 0.4 - i * 0.08;
        const glowGeo = new THREE.CircleGeometry(glowSize, 32);
        const glowMat = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: glowOpacity,
            side: THREE.DoubleSide
        });
        const glow = new THREE.Mesh(glowGeo, glowMat);
        glow.rotation.x = -Math.PI / 2;
        group.add(glow);
    }
    
    const numSpikes = 12;
    
    for (let i = 0; i < numSpikes; i++) {
        const spikeAngle = (i / numSpikes) * Math.PI * 2;
        const cylinderGeo = new THREE.CylinderGeometry(0.05, 0.02, 0.8, 8);
        const material = new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.3,
            metalness: 0.6
        });
        const spike = new THREE.Mesh(cylinderGeo, material);
        
        spike.position.set(
            Math.cos(spikeAngle) * 0.2,
            0,
            Math.sin(spikeAngle) * 0.2
        );
        spike.rotation.z = Math.PI / 2;
        spike.rotation.y = spikeAngle;
        spike.castShadow = true;
        group.add(spike);
    }
    
    const centerGeo = new THREE.SphereGeometry(0.2, 16, 16);
    const centerMat = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.2,
        metalness: 0.8
    });
    const center = new THREE.Mesh(centerGeo, centerMat);
    center.castShadow = true;
    group.add(center);
    
    group.position.set(x, y, z);
    group.scale.set(0, 0, 0);
    scene.add(group);
    
    circleObjects.push({ 
        mesh: group, angle,
        originalX: x, originalZ: z,
        rotationSpeed: 0.3,
        targetScale: 1, currentScale: 0
    });
}

function createTwistedBox(x, y, z, color, angle) {
    const group = new THREE.Group();
    
    for (let i = 0; i < 4; i++) {
        const glowSize = 1.3 + i * 0.3;
        const glowOpacity = 0.35 - i * 0.08;
        const glowGeo = new THREE.CircleGeometry(glowSize, 32);
        const glowMat = new THREE.MeshBasicMaterial({
            color: color,
            transparent: true,
            opacity: glowOpacity,
            side: THREE.DoubleSide
        });
        const glow = new THREE.Mesh(glowGeo, glowMat);
        glow.rotation.x = -Math.PI / 2;
        group.add(glow);
    }
    
    const layers = 8;
    
    for (let i = 0; i < layers; i++) {
        const t = i / layers;
        const boxGeo = new THREE.BoxGeometry(0.6, 0.15, 0.6);
        const material = new THREE.MeshStandardMaterial({
            color: color,
            roughness: 0.5,
            metalness: 0.3
        });
        const box = new THREE.Mesh(boxGeo, material);
        
        box.position.y = (t - 0.5) * 1.2;
        box.rotation.y = t * Math.PI / 2;
        box.castShadow = true;
        group.add(box);
    }
    
    group.position.set(x, y, z);
    group.scale.set(0, 0, 0);
    scene.add(group);
    
    circleObjects.push({ 
        mesh: group, angle,
        originalX: x, originalZ: z,
        rotationSpeed: 0.25,
        targetScale: 1, currentScale: 0
    });
}

function createFloatingParticle(x, y, z, color, size) {
    const geometry = new THREE.SphereGeometry(size, 12, 12);
    const material = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.3,
        metalness: 0.5,
        emissive: color,
        emissiveIntensity: 0.3,
        transparent: true,
        opacity: 0.7
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(x, y, z);
    mesh.castShadow = true;
    scene.add(mesh);
    
    if (!window.floatingParticles) window.floatingParticles = [];
    window.floatingParticles.push({
        mesh: mesh,
        originalY: y,
        speed: Math.random() * 0.3 + 0.1,
        offset: Math.random() * Math.PI * 2
    });
}

function onWindowResize() {
    camera.aspect = (window.innerWidth * 0.6) / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth * 0.6, window.innerHeight);
}

function onMouseMove(event) {
    const canvasWidth = window.innerWidth * 0.6;
    if (event.clientX > canvasWidth) return;
    
    mouse.x = (event.clientX / canvasWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
}

function onMouseClick(event) {
    const canvasWidth = window.innerWidth * 0.6;
    if (event.clientX > canvasWidth) return;
    if (isZoomedIn) return;
    if (circleObjects.length === 0) return;
    
    mouse.x = (event.clientX / canvasWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    
    raycaster.setFromCamera(mouse, camera);
    
    const allMeshes = [];
    circleObjects.forEach(obj => {
        obj.mesh.traverse(child => {
            if (child.isMesh) {
                allMeshes.push({ mesh: child, parent: obj });
            }
        });
    });
    
    const intersects = raycaster.intersectObjects(allMeshes.map(m => m.mesh));

    if (intersects.length > 0) {
        const clickedMesh = intersects[0].object;
        const objData = allMeshes.find(m => m.mesh === clickedMesh);
        if (objData && objData.parent) {
            zoomToObject(objData.parent);
        }
    }
}

function zoomToObject(objData) {
    isZoomedIn = true;
    zoomedObject = objData;
    
    const objPos = objData.mesh.position;
    
    cameraTarget.x = objPos.x + 3;
    cameraTarget.y = objPos.y;
    cameraTarget.z = objPos.z;
    
    cameraLookAt.x = objPos.x;
    cameraLookAt.y = objPos.y;
    cameraLookAt.z = objPos.z;
    
    document.getElementById('back-btn').classList.add('active');
    
    updateTextPanel(objData);
}

function updateTextPanel(objData) {
    const categories = [
        { name: 'Origins', subtitle: 'Your DNA ancestry' },
        { name: 'Mind', subtitle: 'How you think, feel, and focus' },
        { name: 'Body', subtitle: 'Your strength, endurance, and recovery' },
        { name: 'Nutrition', subtitle: 'How your body processes food & nutrients' },
        { name: 'Sleep', subtitle: 'Your sleep, energy, and daily cycles' },
        { name: 'Senses', subtitle: 'Visible traits & sensory quirks' },
        { name: 'Resilience', subtitle: 'Ability to repair & longevity' }
    ];
    
    const index = circleObjects.indexOf(objData);
    const category = categories[index];
    
    document.getElementById('text-content').innerHTML = 
        `<span style="text-decoration: underline;">${category.name}</span><br>${category.subtitle}`;
}

function zoomOut() {
    isZoomedIn = false;
    zoomedObject = null;
    
    cameraTarget.x = 0;
    cameraTarget.y = 10;
    cameraTarget.z = 0;
    
    cameraLookAt.x = 0;
    cameraLookAt.y = 0;
    cameraLookAt.z = 0;
    
    document.getElementById('back-btn').classList.remove('active');
    
    document.getElementById('text-content').innerHTML = 'Your DNA Solar System<br><br>Explore the unique set of planets generated from your DNA sequence - one of over 10 million possibilities!<br><br>Click on any planet to learn insights about your DNA.';
}

function showHoverLabel(objData) {
    const categories = [
        { name: 'Origins' },
        { name: 'Mind' },
        { name: 'Body' },
        { name: 'Nutrition' },
        { name: 'Sleep' },
        { name: 'Senses' },
        { name: 'Resilience' }
    ];
    
    const index = circleObjects.indexOf(objData);
    const category = categories[index];
    
    let label = document.getElementById('hover-label');
    if (!label) {
        label = document.createElement('div');
        label.id = 'hover-label';
        label.style.position = 'fixed';
        label.style.background = 'rgba(0, 0, 0, 0.8)';
        label.style.color = 'white';
        label.style.padding = '8px 16px';
        label.style.borderRadius = '6px';
        label.style.fontFamily = "'Menlo', 'Monaco', 'Courier New', monospace";
        label.style.fontSize = '14px';
        label.style.fontWeight = 'bold';
        label.style.pointerEvents = 'none';
        label.style.zIndex = '2000';
        label.style.transition = 'opacity 0.2s ease';
        document.body.appendChild(label);
    }
    
    label.textContent = category.name;
    label.style.opacity = '1';
    
    const objPos = objData.mesh.position.clone();
    objPos.project(camera);
    
    const canvasWidth = window.innerWidth * 0.6;
    const x = (objPos.x * 0.5 + 0.5) * canvasWidth;
    const y = (-objPos.y * 0.5 + 0.5) * window.innerHeight;
    
    label.style.left = (x + 30) + 'px';
    label.style.top = (y - 20) + 'px';
}

function hideHoverLabel() {
    const label = document.getElementById('hover-label');
    if (label) {
        label.style.opacity = '0';
    }
}

function animate() {
    requestAnimationFrame(animate);
    time += 0.01;

    updateTransition();

    camera.position.x += (cameraTarget.x - camera.position.x) * 0.05;
    camera.position.y += (cameraTarget.y - camera.position.y) * 0.05;
    camera.position.z += (cameraTarget.z - camera.position.z) * 0.05;
    
    camera.lookAt(cameraLookAt.x, cameraLookAt.y, cameraLookAt.z);

    if (dnaHelix && !isTransitioning) {
        dnaHelix.rotation.y += 0.005;
    }

    if (window.floatingParticles) {
        window.floatingParticles.forEach(particle => {
            particle.mesh.position.y = particle.originalY + 
                Math.sin(time * particle.speed + particle.offset) * 0.5;
            particle.mesh.rotation.x += 0.01;
            particle.mesh.rotation.y += 0.01;
        });
    }

    if (!isZoomedIn && !isTransitioning && circleObjects.length > 0) {
        raycaster.setFromCamera(mouse, camera);
        
        const allMeshes = [];
        circleObjects.forEach(obj => {
            obj.mesh.traverse(child => {
                if (child.isMesh) {
                    allMeshes.push({ mesh: child, parent: obj });
                }
            });
        });
        
        const intersects = raycaster.intersectObjects(allMeshes.map(m => m.mesh));

        circleObjects.forEach(obj => {
            obj.targetScale = 1;
        });

        if (intersects.length > 0) {
            const hoveredMesh = intersects[0].object;
            const objData = allMeshes.find(m => m.mesh === hoveredMesh);
            if (objData && objData.parent) {
                objData.parent.targetScale = 1.3;
                document.body.style.cursor = 'pointer';
                showHoverLabel(objData.parent);
            }
        } else {
            document.body.style.cursor = 'default';
            hideHoverLabel();
        }
    }

    if (circleObjects.length > 0) {
        circleObjects.forEach(({ mesh, rotationSpeed }, index) => {
            mesh.rotation.x += 0.005 * rotationSpeed;
            mesh.rotation.y += 0.008 * rotationSpeed;
            mesh.rotation.z += 0.003 * rotationSpeed;

            const obj = circleObjects[index];
            obj.currentScale += (obj.targetScale - obj.currentScale) * 0.1;
            mesh.scale.set(obj.currentScale, obj.currentScale, obj.currentScale);
        });
    }

    renderer.render(scene, camera);
}

init();
animate();
