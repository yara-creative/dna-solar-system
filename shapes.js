// Shapes.js - All 8 variants for each of 7 shape families
// Used by DNA Solar System to generate unique planets based on genetic hash

// Shape family assignments (matches knowledge base categories):
// 0: TORUS - Sleep (Pink #FF6B9D)
// 1: KNOT - Mind (Purple #9B59B6)  
// 2: SPIRAL - Performance (Blue #3498DB)
// 3: CRYSTAL - Nutrition (Teal #1ABC9C)
// 4: RIBBON - Health (Orange #F39C12)
// 5: STARBURST - Senses (Red #E74C3C)
// 6: TWISTED BOX - Longevity (Magenta #C44569)

const ShapeGenerator = {
  
  // Main function: creates shape based on family (0-6) and variant (0-7)
  createShape: function(family, variant, x, y, z, color, angle) {
    const shapeFamilies = [
      this.createTorusVariant,
      this.createKnotVariant,
      this.createSpiralVariant,
      this.createCrystalVariant,
      this.createRibbonVariant,
      this.createStarburstVariant,
      this.createTwistedBoxVariant
    ];
    
    return shapeFamilies[family].call(this, variant, x, y, z, color, angle);
  },

  // ============================================
  // TORUS FAMILY - Sleep
  // ============================================
  createTorusVariant: function(variant, x, y, z, color, angle) {
    const group = new THREE.Group();
    const material = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.3,
      metalness: 0.6
    });
    
    // Add glow layers
    for (let i = 0; i < 3; i++) {
      const glowSize = 1.2 + i * 0.3;
      const glowOpacity = 0.2 - i * 0.06;
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
    
    if (variant === 0) {
      // Classic smooth torus
      const mesh = new THREE.Mesh(new THREE.TorusGeometry(0.8, 0.3, 16, 32), material);
      mesh.rotation.x = Math.PI / 4;
      mesh.castShadow = true;
      group.add(mesh);
    } 
    else if (variant === 1) {
      // Spiky torus
      const geo = new THREE.TorusGeometry(0.8, 0.3, 16, 32);
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        if (i % 3 === 0) {
          const vx = pos.getX(i), vy = pos.getY(i), vz = pos.getZ(i);
          const len = Math.sqrt(vx*vx + vy*vy + vz*vz);
          pos.setX(i, vx / len * (len + 0.4));
          pos.setY(i, vy / len * (len + 0.4));
          pos.setZ(i, vz / len * (len + 0.4));
        }
      }
      geo.computeVertexNormals();
      const mesh = new THREE.Mesh(geo, material);
      mesh.rotation.x = Math.PI / 4;
      mesh.castShadow = true;
      group.add(mesh);
    }
    else if (variant === 2) {
      // Rounded square torus
      const points = [];
      const numSegments = 64;
      const size = 0.75;
      for (let i = 0; i <= numSegments; i++) {
        const t = i / numSegments;
        const ang = t * Math.PI * 2;
        const n = 4;
        const cos_t = Math.cos(ang);
        const sin_t = Math.sin(ang);
        const sx = size * Math.sign(cos_t) * Math.pow(Math.abs(cos_t), 2/n);
        const sz = size * Math.sign(sin_t) * Math.pow(Math.abs(sin_t), 2/n);
        points.push(new THREE.Vector3(sx, 0, sz));
      }
      const squarePath = new THREE.CatmullRomCurve3(points, true);
      const squareTubeGeo = new THREE.TubeGeometry(squarePath, 100, 0.25, 16, true);
      const mesh = new THREE.Mesh(squareTubeGeo, material);
      mesh.rotation.x = Math.PI / 4;
      mesh.castShadow = true;
      group.add(mesh);
    }
    else if (variant === 3) {
      // Bumpy torus
      const points = [];
      for (let i = 0; i <= 64; i++) {
        const t = i / 64;
        const ang = t * Math.PI * 2;
        const radius = 0.75;
        points.push(new THREE.Vector3(Math.cos(ang) * radius, 0, Math.sin(ang) * radius));
      }
      const path = new THREE.CatmullRomCurve3(points, true);
      const tubeGeo = new THREE.TubeGeometry(path, 100, 0.25, 16, true);
      const pos = tubeGeo.attributes.position;
      for (let i = 0; i < pos.count; i++) {
        const segmentIndex = Math.floor((i / pos.count) * 100);
        const bulge = 0.2 + Math.abs(Math.sin((segmentIndex/100) * Math.PI * 8)) * 0.15;
        const scale = bulge / 0.25;
        const vy = pos.getY(i);
        const centerDist = Math.abs(vy);
        if (centerDist > 0.01) pos.setY(i, vy * scale);
      }
      tubeGeo.computeVertexNormals();
      const mesh = new THREE.Mesh(tubeGeo, material);
      mesh.rotation.x = Math.PI / 4;
      mesh.castShadow = true;
      group.add(mesh);
    }
    else if (variant === 4) {
      // Vertical wavy torus
      const points = [];
      for (let i = 0; i <= 64; i++) {
        const t = i / 64;
        const ang = t * Math.PI * 2;
        const radius = 0.7;
        const wave = Math.sin(ang * 3) * 0.15;
        points.push(new THREE.Vector3(Math.cos(ang) * radius, Math.sin(ang) * radius + wave, 0));
      }
      const path = new THREE.CatmullRomCurve3(points, true);
      const tubeGeo = new THREE.TubeGeometry(path, 100, 0.22, 16, true);
      const mesh = new THREE.Mesh(tubeGeo, material);
      mesh.rotation.x = Math.PI / 4;
      mesh.castShadow = true;
      group.add(mesh);
    }
    else if (variant === 5) {
      // Thick rope torus
      const points = [];
      for (let i = 0; i <= 64; i++) {
        const t = i / 64;
        const mainAngle = t * Math.PI * 2;
        const twistAngle = t * Math.PI * 8;
        const mainRadius = 0.75;
        const ropeRadius = 0.22;
        points.push(new THREE.Vector3(
          (mainRadius + Math.cos(twistAngle) * ropeRadius) * Math.cos(mainAngle),
          Math.sin(twistAngle) * ropeRadius,
          (mainRadius + Math.cos(twistAngle) * ropeRadius) * Math.sin(mainAngle)
        ));
      }
      const path = new THREE.CatmullRomCurve3(points, true);
      const tubeGeo = new THREE.TubeGeometry(path, 100, 0.2, 12, true);
      const mesh = new THREE.Mesh(tubeGeo, material);
      mesh.rotation.x = Math.PI / 4;
      mesh.castShadow = true;
      group.add(mesh);
    }
    else if (variant === 6) {
      // Hourglass torus
      const points = [];
      for (let i = 0; i <= 64; i++) {
        const t = i / 64;
        const ang = t * Math.PI * 2;
        const pinch = 0.7 + Math.abs(Math.cos(ang)) * 0.3;
        points.push(new THREE.Vector3(Math.cos(ang) * pinch, 0, Math.sin(ang) * pinch));
      }
      const path = new THREE.CatmullRomCurve3(points, true);
      const tubeGeo = new THREE.TubeGeometry(path, 100, 0.25, 16, true);
      const mesh = new THREE.Mesh(tubeGeo, material);
      mesh.rotation.x = Math.PI / 4;
      mesh.castShadow = true;
      group.add(mesh);
    }
    else if (variant === 7) {
      // Segmented torus with gaps
      for (let i = 0; i < 16; i++) {
        const startAngle = (i / 16) * Math.PI * 2;
        const endAngle = startAngle + Math.PI / 10;
        const segment = new THREE.TorusGeometry(0.8, 0.28, 8, 16, endAngle - startAngle);
        const mesh = new THREE.Mesh(segment, material);
        mesh.rotation.z = startAngle;
        mesh.rotation.x = Math.PI / 4;
        mesh.castShadow = true;
        group.add(mesh);
      }
    }
    
    group.position.set(x, y, z);
    return group;
  },

  // ============================================
  // KNOT FAMILY - Mind
  // ============================================
  createKnotVariant: function(variant, x, y, z, color, angle) {
    const group = new THREE.Group();
    const material = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.3,
      metalness: 0.6
    });
    
    // Add glow layers
    for (let i = 0; i < 4; i++) {
      const glowSize = 1.2 + i * 0.25;
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
    
    if (variant === 0) {
      // Classic (2,3) knot
      const mesh = new THREE.Mesh(new THREE.TorusKnotGeometry(0.6, 0.22, 64, 8, 2, 3), material);
      mesh.castShadow = true;
      group.add(mesh);
    } 
    else if (variant === 1) {
      // Wave loops
      const points = [];
      for (let i = 0; i <= 64; i++) {
        const t = i / 64;
        const ang = t * Math.PI * 2;
        points.push(new THREE.Vector3(
          Math.sin(ang) * 0.8,
          Math.cos(ang * 3) * 0.4,
          Math.cos(ang) * 0.8
        ));
      }
      const path = new THREE.CatmullRomCurve3(points, true);
      const tubeGeo = new THREE.TubeGeometry(path, 100, 0.18, 16, true);
      const mesh = new THREE.Mesh(tubeGeo, material);
      mesh.castShadow = true;
      group.add(mesh);
    }
    else if (variant === 2) {
      // Linked crescents
      const curve1Points = [];
      const curve2Points = [];
      for (let i = 0; i <= 32; i++) {
        const t = i / 32;
        const ang = t * Math.PI;
        curve1Points.push(new THREE.Vector3(Math.cos(ang) * 0.7, Math.sin(ang) * 0.5, 0.3));
        curve2Points.push(new THREE.Vector3(Math.cos(ang + Math.PI) * 0.7, Math.sin(ang) * 0.5, -0.3));
      }
      const path1 = new THREE.CatmullRomCurve3(curve1Points);
      const path2 = new THREE.CatmullRomCurve3(curve2Points);
      const tube1 = new THREE.Mesh(new THREE.TubeGeometry(path1, 50, 0.2, 12, false), material);
      const tube2 = new THREE.Mesh(new THREE.TubeGeometry(path2, 50, 0.2, 12, false), material);
      tube1.castShadow = true;
      tube2.castShadow = true;
      group.add(tube1, tube2);
    }
    else if (variant === 3) {
      // Figure-8 with spheres
      const points = [];
      for (let i = 0; i <= 100; i++) {
        const t = (i / 100) * Math.PI * 2;
        points.push(new THREE.Vector3(0.8 * Math.sin(t), 0.6 * Math.sin(t * 2), 0.8 * Math.cos(t)));
      }
      const path = new THREE.CatmullRomCurve3(points, true);
      const tubeGeo = new THREE.TubeGeometry(path, 100, 0.15, 12, true);
      const mesh = new THREE.Mesh(tubeGeo, material);
      mesh.castShadow = true;
      group.add(mesh);
      
      const sphere1 = new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 16), material);
      sphere1.position.set(0, 0.3, 0);
      sphere1.castShadow = true;
      const sphere2 = new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 16), material);
      sphere2.position.set(0, -0.3, 0);
      sphere2.castShadow = true;
      group.add(sphere1, sphere2);
    }
    else if (variant === 4) {
      // (3,7) knot
      const mesh = new THREE.Mesh(new THREE.TorusKnotGeometry(0.6, 0.22, 64, 8, 3, 7), material);
      mesh.castShadow = true;
      group.add(mesh);
    }
    else if (variant === 5) {
      // Flowing ribbon twist
      for (let i = 0; i < 60; i++) {
        const t = i / 60;
        const ang = t * Math.PI * 2;
        const spiral = t * Math.PI * 3;
        const box = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.06, 0.35), material);
        const radius = 0.7;
        box.position.set(Math.cos(ang) * radius, Math.sin(spiral) * 0.5, Math.sin(ang) * radius);
        box.rotation.set(spiral, ang, 0);
        box.castShadow = true;
        group.add(box);
      }
    }
    else if (variant === 6) {
      // Infinity symbol
      const points = [];
      for (let i = 0; i <= 128; i++) {
        const t = (i / 128) * Math.PI * 2;
        const scale = 0.9;
        points.push(new THREE.Vector3(
          scale * Math.cos(t) / (1 + Math.sin(t) * Math.sin(t)),
          0,
          scale * Math.sin(t) * Math.cos(t) / (1 + Math.sin(t) * Math.sin(t))
        ));
      }
      const path = new THREE.CatmullRomCurve3(points, true);
      const tubeGeo = new THREE.TubeGeometry(path, 128, 0.2, 16, true);
      const mesh = new THREE.Mesh(tubeGeo, material);
      mesh.castShadow = true;
      group.add(mesh);
    }
    else if (variant === 7) {
      // Celtic interweave
      for (let strand = 0; strand < 3; strand++) {
        const offset = (strand / 3) * Math.PI * 2;
        const points = [];
        for (let i = 0; i <= 60; i++) {
          const t = i / 60;
          const ang = t * Math.PI * 2 + offset;
          const wave = Math.sin(t * Math.PI * 6 + offset) * 0.3;
          points.push(new THREE.Vector3(
            Math.cos(ang) * (0.6 + wave),
            Math.sin(ang * 2) * 0.35,
            Math.sin(ang) * (0.6 + wave)
          ));
        }
        const path = new THREE.CatmullRomCurve3(points, true);
        const tube = new THREE.Mesh(new THREE.TubeGeometry(path, 80, 0.12, 12, true), material);
        tube.castShadow = true;
        group.add(tube);
      }
    }
    
    group.position.set(x, y, z);
    return group;
  },

  // ============================================
  // SPIRAL FAMILY - Performance
  // ============================================
  createSpiralVariant: function(variant, x, y, z, color, angle) {
    const group = new THREE.Group();
    const material = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.3,
      metalness: 0.6
    });
    
    // Add glow layers
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
    
    const sphereGeo = new THREE.SphereGeometry(0.12, 12, 12);
    const count = 50;
    
    if (variant === 0) {
      // Staircase spiral
      for (let i = 0; i < 40; i++) {
        const t = i / 40;
        const step = Math.floor(t * 8);
        const ang = step * Math.PI / 4;
        const radius = 0.7;
        const s = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.2, 0.2), material);
        s.position.set(Math.cos(ang) * radius, (t - 0.5) * 2.5, Math.sin(ang) * radius);
        s.castShadow = true;
        group.add(s);
      }
    } 
    else if (variant === 1) {
      // Daisy/flower spiral
      const center = new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 16), material);
      center.castShadow = true;
      group.add(center);
      
      for (let layer = 0; layer < 5; layer++) {
        const numPetals = 8 + layer * 2;
        const radius = 0.4 + layer * 0.2;
        const twist = layer * Math.PI / 6;
        for (let i = 0; i < numPetals; i++) {
          const ang = (i / numPetals) * Math.PI * 2 + twist;
          const petal = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 12), material);
          petal.position.set(Math.cos(ang) * radius, layer * 0.15 - 0.3, Math.sin(ang) * radius);
          petal.scale.set(1, 0.5, 2);
          petal.rotation.y = ang;
          petal.castShadow = true;
          group.add(petal);
        }
      }
    }
    else if (variant === 2) {
      // Teardrop shape
      const layers = 20;
      for (let layer = 0; layer < layers; layer++) {
        const t = layer / layers;
        const radius = Math.sin(t * Math.PI) * 0.7;
        const height = t * 2.2 - 1.1;
        const numInRing = Math.max(3, Math.floor(radius * 15));
        for (let i = 0; i < numInRing; i++) {
          const ang = (i / numInRing) * Math.PI * 2;
          const s = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 12), material);
          s.position.set(Math.cos(ang) * radius, height, Math.sin(ang) * radius);
          s.castShadow = true;
          group.add(s);
        }
      }
    }
    else if (variant === 3) {
      // Reverse cone spiral
      for (let i = 0; i < count; i++) {
        const t = i / count;
        const ang = t * Math.PI * 10;
        const radius = t * 1.2;
        const s = new THREE.Mesh(sphereGeo, material);
        s.position.set(Math.cos(ang) * radius, (1 - t) * 2.2 - 1.1, Math.sin(ang) * radius);
        s.castShadow = true;
        group.add(s);
      }
    }
    else if (variant === 4) {
      // Fibonacci spiral
      const phi = (1 + Math.sqrt(5)) / 2;
      for (let i = 0; i < count; i++) {
        const t = i / count;
        const ang = i * phi * Math.PI * 2;
        const radius = Math.sqrt(t) * 1.2;
        const s = new THREE.Mesh(sphereGeo, material);
        s.position.set(Math.cos(ang) * radius, (t - 0.5) * 1.8, Math.sin(ang) * radius);
        s.castShadow = true;
        group.add(s);
      }
    }
    else if (variant === 5) {
      // Wave spiral
      for (let i = 0; i < count; i++) {
        const t = i / count;
        const ang = t * Math.PI * 5;
        const radius = t * 0.8;
        const wave = Math.sin(t * Math.PI * 12) * 0.3;
        const s = new THREE.Mesh(sphereGeo, material);
        s.position.set(Math.cos(ang) * radius, wave, Math.sin(ang) * radius);
        s.castShadow = true;
        group.add(s);
      }
    }
    else if (variant === 6) {
      // Triple helix
      for (let i = 0; i < count; i++) {
        const t = i / count;
        for (let h = 0; h < 3; h++) {
          const offset = (h / 3) * Math.PI * 2;
          const ang = t * Math.PI * 5 + offset;
          const s = new THREE.Mesh(new THREE.SphereGeometry(0.08, 8, 8), material);
          s.position.set(Math.cos(ang) * 0.4, (t - 0.5) * 2.5, Math.sin(ang) * 0.4);
          s.castShadow = true;
          group.add(s);
        }
      }
    }
    else if (variant === 7) {
      // Conical spiral
      for (let i = 0; i < count; i++) {
        const t = i / count;
        const ang = t * Math.PI * 8;
        const radius = (1 - t) * 1.0;
        const s = new THREE.Mesh(sphereGeo, material);
        s.position.set(Math.cos(ang) * radius, (t - 0.5) * 2.0, Math.sin(ang) * radius);
        s.castShadow = true;
        group.add(s);
      }
    }
    
    group.position.set(x, y, z);
    return group;
  },

  // ============================================
  // CRYSTAL FAMILY - Nutrition
  // ============================================
  createCrystalVariant: function(variant, x, y, z, color, angle) {
    const group = new THREE.Group();
    const material = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.2,
      metalness: 0.8,
      flatShading: true
    });
    
    // Add glow layers
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
    
    if (variant === 0) {
      // Stretched octahedron
      const geo = new THREE.OctahedronGeometry(1, 0);
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) pos.setY(i, pos.getY(i) * 1.3);
      geo.computeVertexNormals();
      const mesh = new THREE.Mesh(geo, material);
      mesh.castShadow = true;
      group.add(mesh);
    } 
    else if (variant === 1) {
      // Icosahedron
      const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(0.9, 0), material);
      mesh.castShadow = true;
      group.add(mesh);
    }
    else if (variant === 2) {
      // Diamond gemstone
      const topGeo = new THREE.ConeGeometry(0.85, 0.6, 8);
      const topMesh = new THREE.Mesh(topGeo, material);
      topMesh.position.y = 0.3;
      topMesh.castShadow = true;
      group.add(topMesh);
      
      const bottomGeo = new THREE.ConeGeometry(0.85, 1.3, 8);
      const bottomMesh = new THREE.Mesh(bottomGeo, material);
      bottomMesh.position.y = -0.35;
      bottomMesh.rotation.z = Math.PI;
      bottomMesh.castShadow = true;
      group.add(bottomMesh);
      
      const tableGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.05, 8);
      const tableMesh = new THREE.Mesh(tableGeo, material);
      tableMesh.position.y = 0.625;
      tableMesh.castShadow = true;
      group.add(tableMesh);
    }
    else if (variant === 3) {
      // Real cone
      const mesh = new THREE.Mesh(new THREE.ConeGeometry(0.7, 1.6, 32), material);
      mesh.castShadow = true;
      group.add(mesh);
    }
    else if (variant === 4) {
      // Hexagonal prism
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 1.8, 6), material);
      mesh.castShadow = true;
      group.add(mesh);
    }
    else if (variant === 5) {
      // Elongated cube cluster
      const cubeSize = 0.28;
      const baseGap = 0.05;
      for (let vx = -1; vx <= 1; vx++) {
        for (let vy = -1; vy <= 1; vy++) {
          for (let vz = -1; vz <= 1; vz++) {
            const cube = new THREE.Mesh(new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize), material);
            cube.position.set(vx * (cubeSize + baseGap), vy * (cubeSize + baseGap) * 2.2, vz * (cubeSize + baseGap));
            cube.castShadow = true;
            group.add(cube);
          }
        }
      }
    }
    else if (variant === 6) {
      // Cylinder
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1.8, 16), material);
      mesh.castShadow = true;
      group.add(mesh);
    }
    else if (variant === 7) {
      // Quadruple-sided cone
      const cone1 = new THREE.Mesh(new THREE.ConeGeometry(0.6, 1.2, 8), material);
      cone1.position.y = 0.6;
      cone1.castShadow = true;
      const cone2 = new THREE.Mesh(new THREE.ConeGeometry(0.6, 1.2, 8), material);
      cone2.position.y = -0.6;
      cone2.rotation.z = Math.PI;
      cone2.castShadow = true;
      const cone3 = new THREE.Mesh(new THREE.ConeGeometry(0.6, 1.2, 8), material);
      cone3.position.x = 0.6;
      cone3.rotation.z = -Math.PI / 2;
      cone3.castShadow = true;
      const cone4 = new THREE.Mesh(new THREE.ConeGeometry(0.6, 1.2, 8), material);
      cone4.position.x = -0.6;
      cone4.rotation.z = Math.PI / 2;
      cone4.castShadow = true;
      group.add(cone1, cone2, cone3, cone4);
    }
    
    group.position.set(x, y, z);
    return group;
  },

  // ============================================
  // CRYSTAL FAMILY - Nutrition
  // ============================================
  createCrystalVariant: function(variant, x, y, z, color, angle) {
    const group = new THREE.Group();
    const material = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.2,
      metalness: 0.8,
      flatShading: true
    });
    
    // Add glow layers
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
    
    if (variant === 0) {
      // Stretched octahedron
      const geo = new THREE.OctahedronGeometry(1, 0);
      const pos = geo.attributes.position;
      for (let i = 0; i < pos.count; i++) pos.setY(i, pos.getY(i) * 1.3);
      geo.computeVertexNormals();
      const mesh = new THREE.Mesh(geo, material);
      mesh.castShadow = true;
      group.add(mesh);
    } 
    else if (variant === 1) {
      // Icosahedron
      const mesh = new THREE.Mesh(new THREE.IcosahedronGeometry(0.9, 0), material);
      mesh.castShadow = true;
      group.add(mesh);
    }
    else if (variant === 2) {
      // Diamond gemstone
      const topGeo = new THREE.ConeGeometry(0.85, 0.6, 8);
      const topMesh = new THREE.Mesh(topGeo, material);
      topMesh.position.y = 0.3;
      topMesh.castShadow = true;
      group.add(topMesh);
      
      const bottomGeo = new THREE.ConeGeometry(0.85, 1.3, 8);
      const bottomMesh = new THREE.Mesh(bottomGeo, material);
      bottomMesh.position.y = -0.35;
      bottomMesh.rotation.z = Math.PI;
      bottomMesh.castShadow = true;
      group.add(bottomMesh);
      
      const tableGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.05, 8);
      const tableMesh = new THREE.Mesh(tableGeo, material);
      tableMesh.position.y = 0.625;
      tableMesh.castShadow = true;
      group.add(tableMesh);
    }
    else if (variant === 3) {
      // Smooth cone
      const mesh = new THREE.Mesh(new THREE.ConeGeometry(0.7, 1.6, 32), material);
      mesh.castShadow = true;
      group.add(mesh);
    }
    else if (variant === 4) {
      // Hexagonal prism
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 1.8, 6), material);
      mesh.castShadow = true;
      group.add(mesh);
    }
    else if (variant === 5) {
      // Elongated cube cluster
      const cubeSize = 0.28;
      const baseGap = 0.05;
      for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
          for (let z = -1; z <= 1; z++) {
            const cube = new THREE.Mesh(new THREE.BoxGeometry(cubeSize, cubeSize, cubeSize), material);
            cube.position.set(
              x * (cubeSize + baseGap),
              y * (cubeSize + baseGap) * 2.2,
              z * (cubeSize + baseGap)
            );
            cube.castShadow = true;
            group.add(cube);
          }
        }
      }
    }
    else if (variant === 6) {
      // Smooth cylinder
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(0.5, 0.5, 1.8, 16), material);
      mesh.castShadow = true;
      group.add(mesh);
    }
    else if (variant === 7) {
      // Quadruple-sided cone
      const cone1 = new THREE.Mesh(new THREE.ConeGeometry(0.6, 1.2, 8), material);
      cone1.position.y = 0.6;
      cone1.castShadow = true;
      const cone2 = new THREE.Mesh(new THREE.ConeGeometry(0.6, 1.2, 8), material);
      cone2.position.y = -0.6;
      cone2.rotation.z = Math.PI;
      cone2.castShadow = true;
      const cone3 = new THREE.Mesh(new THREE.ConeGeometry(0.6, 1.2, 8), material);
      cone3.position.x = 0.6;
      cone3.rotation.z = -Math.PI / 2;
      cone3.castShadow = true;
      const cone4 = new THREE.Mesh(new THREE.ConeGeometry(0.6, 1.2, 8), material);
      cone4.position.x = -0.6;
      cone4.rotation.z = Math.PI / 2;
      cone4.castShadow = true;
      group.add(cone1, cone2, cone3, cone4);
    }
    
    group.position.set(x, y, z);
    return group;
  },

  // ============================================
  // RIBBON FAMILY - Health
  // ============================================
  createRibbonVariant: function(variant, x, y, z, color, angle) {
    const group = new THREE.Group();
    const material = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.4,
      metalness: 0.4
    });
    
    // Add glow layers
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
    const boxGeo = new THREE.BoxGeometry(0.22, 0.08, 0.6);
    
    if (variant === 0) {
      // Chevron/arrow pattern
      for (let i = 0; i < 30; i++) {
        const t = i / 30;
        const ang = t * Math.PI;
        const radius = 0.8;
        const height = t * 1.5;
        const box = new THREE.Mesh(boxGeo, material);
        box.position.set(Math.cos(ang) * radius, height - 0.75, Math.sin(ang) * radius * 0.3);
        box.rotation.y = ang - Math.PI / 2;
        box.castShadow = true;
        group.add(box);
      }
    } 
    else if (variant === 1) {
      // Wave ribbon
      for (let i = 0; i < segments; i++) {
        const t = i / segments;
        const ang = t * Math.PI * 2;
        const wave = Math.sin(t * Math.PI * 4) * 0.45;
        const box = new THREE.Mesh(boxGeo, material);
        box.position.set(Math.cos(ang) * 0.9, wave, Math.sin(ang) * 0.9);
        box.rotation.y = ang;
        box.castShadow = true;
        group.add(box);
      }
    }
    else if (variant === 2) {
      // Double ribbon
      for (let i = 0; i < segments; i++) {
        const t = i / segments;
        const ang = t * Math.PI * 2;
        const angle2 = ang + Math.PI / 3;
        const box = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.08, 0.45), material);
        box.position.set(Math.cos(ang) * 0.75, Math.sin(t * Math.PI * 6) * 0.3, Math.sin(ang) * 0.75);
        box.castShadow = true;
        const box2 = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.08, 0.45), material);
        box2.position.set(Math.cos(angle2) * 0.75, -Math.sin(t * Math.PI * 6) * 0.3, Math.sin(angle2) * 0.75);
        box2.castShadow = true;
        group.add(box, box2);
      }
    }
    else if (variant === 3) {
      // Starfish arms
      const center = new THREE.Mesh(new THREE.SphereGeometry(0.35, 16, 16), material);
      center.castShadow = true;
      group.add(center);
      
      const numArms = 5;
      for (let arm = 0; arm < numArms; arm++) {
        const ang = (arm / numArms) * Math.PI * 2;
        for (let i = 0; i < 8; i++) {
          const t = i / 8;
          const box = new THREE.Mesh(
            new THREE.BoxGeometry(0.25 - t * 0.1, 0.15 - t * 0.05, 0.4 - t * 0.15),
            material
          );
          const radius = 0.35 + t * 0.8;
          const droop = t * t * 0.3;
          box.position.set(Math.cos(ang) * radius, -droop, Math.sin(ang) * radius);
          box.rotation.y = ang;
          box.castShadow = true;
          group.add(box);
        }
      }
    }
    else if (variant === 4) {
      // Zigzag ribbon
      for (let i = 0; i < segments; i++) {
        const t = i / segments;
        const ang = t * Math.PI * 2;
        const zigzag = Math.sin(t * Math.PI * 10) * 0.35;
        const box = new THREE.Mesh(boxGeo, material);
        box.position.set(Math.cos(ang) * 0.85, zigzag, Math.sin(ang) * 0.85);
        box.rotation.set(zigzag, ang, t * Math.PI * 2);
        box.castShadow = true;
        group.add(box);
      }
    }
    else if (variant === 5) {
      // Tentacle formation
      const numTentacles = 6;
      for (let tentacle = 0; tentacle < numTentacles; tentacle++) {
        const baseAngle = (tentacle / numTentacles) * Math.PI * 2;
        for (let i = 0; i < 12; i++) {
          const t = i / 12;
          const box = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.12, 0.4), material);
          const radius = t * 1.1;
          const curve = Math.sin(t * Math.PI) * 0.5;
          const twist = t * Math.PI * 0.5;
          box.position.set(
            Math.cos(baseAngle + twist) * radius,
            curve - 0.3,
            Math.sin(baseAngle + twist) * radius
          );
          box.rotation.set(curve, baseAngle + twist, t * 0.8);
          box.castShadow = true;
          group.add(box);
        }
      }
    }
    else if (variant === 6) {
      // Petal formation
      const numPetals = 8;
      for (let petal = 0; petal < numPetals; petal++) {
        const petalAngle = (petal / numPetals) * Math.PI * 2;
        for (let i = 0; i < 10; i++) {
          const t = i / 10;
          const radius = t * 1.0 + 0.2;
          const box = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.08, 0.35), material);
          box.position.set(
            Math.cos(petalAngle) * radius,
            Math.sin(t * Math.PI) * 0.3,
            Math.sin(petalAngle) * radius
          );
          box.rotation.y = petalAngle;
          box.castShadow = true;
          group.add(box);
        }
      }
    }
    else if (variant === 7) {
      // Crab claws
      const center = new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 16), material);
      center.castShadow = true;
      group.add(center);
      
      const numClaws = 6;
      for (let i = 0; i < numClaws; i++) {
        const ang = (i / numClaws) * Math.PI * 2;
        for (let segment = 0; segment < 5; segment++) {
          const t = segment / 5;
          const box = new THREE.Mesh(new THREE.BoxGeometry(0.18, 0.1, 0.45), material);
          const radius = 0.25 + t * 0.6;
          const lift = t * 0.4;
          box.position.set(Math.cos(ang) * radius, lift, Math.sin(ang) * radius);
          box.rotation.y = ang;
          box.castShadow = true;
          group.add(box);
        }
        
        const tipRadius = 0.85;
        const pincerBox1 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.3), material);
        pincerBox1.position.set(Math.cos(ang - 0.15) * tipRadius, 0.4, Math.sin(ang - 0.15) * tipRadius);
        pincerBox1.rotation.y = ang - 0.3;
        pincerBox1.castShadow = true;
        
        const pincerBox2 = new THREE.Mesh(new THREE.BoxGeometry(0.12, 0.08, 0.3), material);
        pincerBox2.position.set(Math.cos(ang + 0.15) * tipRadius, 0.4, Math.sin(ang + 0.15) * tipRadius);
        pincerBox2.rotation.y = ang + 0.3;
        pincerBox2.castShadow = true;
        
        group.add(pincerBox1, pincerBox2);
      }
    }
    
    group.position.set(x, y, z);
    return group;
  },

  // ============================================
  // STARBURST FAMILY - Senses
  // ============================================
  createStarburstVariant: function(variant, x, y, z, color, angle) {
    const group = new THREE.Group();
    const material = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.3,
      metalness: 0.6
    });
    
    // Add glow layers
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
    
    if (variant === 0) {
      // Vertical pillars
      const center = new THREE.Mesh(new THREE.SphereGeometry(0.25, 16, 16), material);
      center.castShadow = true;
      group.add(center);
      
      for (let i = 0; i < 8; i++) {
        const ang = (i / 8) * Math.PI * 2;
        const pillar = new THREE.Mesh(new THREE.CylinderGeometry(0.08, 0.08, 1.2, 8), material);
        pillar.position.set(Math.cos(ang) * 0.5, 0, Math.sin(ang) * 0.5);
        pillar.castShadow = true;
        group.add(pillar);
      }
    } 
    else if (variant === 1) {
      // Box rays
      const center = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), material);
      center.castShadow = true;
      group.add(center);
      
      for (let i = 0; i < 16; i++) {
        const ang = (i / 16) * Math.PI * 2;
        const ray = new THREE.Mesh(new THREE.BoxGeometry(0.08, 0.08, 1.35), material);
        ray.position.set(Math.cos(ang) * 0.68, 0, Math.sin(ang) * 0.68);
        ray.rotation.y = ang;
        ray.castShadow = true;
        group.add(ray);
      }
    }
    else if (variant === 2) {
      // Branching tree
      const center = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), material);
      center.castShadow = true;
      group.add(center);
      
      for (let i = 0; i < 8; i++) {
        const ang = (i / 8) * Math.PI * 2;
        const spike = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.015, 0.9, 6), material);
        spike.position.set(Math.cos(ang) * 0.3, 0, Math.sin(ang) * 0.3);
        spike.rotation.set(0, ang, Math.PI / 2);
        spike.castShadow = true;
        group.add(spike);
        
        const endX = Math.cos(ang) * 0.75, endZ = Math.sin(ang) * 0.75;
        for (let j = 0; j < 3; j++) {
          const subAngle = ang + (j - 1) * Math.PI / 6;
          const subSpike = new THREE.Mesh(new THREE.CylinderGeometry(0.03, 0.015, 0.36, 6), material);
          subSpike.position.set(endX, 0, endZ);
          subSpike.rotation.set(0, subAngle, Math.PI / 2);
          subSpike.castShadow = true;
          group.add(subSpike);
        }
      }
    }
    else if (variant === 3) {
      // Flat disc with segments
      const center = new THREE.Mesh(new THREE.CylinderGeometry(0.3, 0.3, 0.15, 16), material);
      center.castShadow = true;
      group.add(center);
      
      for (let i = 0; i < 12; i++) {
        const ang = (i / 12) * Math.PI * 2;
        const segment = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.15, 0.9), material);
        segment.position.set(Math.cos(ang) * 0.6, 0, Math.sin(ang) * 0.6);
        segment.rotation.y = ang;
        segment.castShadow = true;
        group.add(segment);
      }
    }
    else if (variant === 4) {
      // Crystal ring
      const center = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), material);
      center.castShadow = true;
      group.add(center);
      
      const flatMaterial = new THREE.MeshStandardMaterial({
        color: color,
        roughness: 0.3,
        metalness: 0.6,
        flatShading: true
      });
      
      for (let i = 0; i < 10; i++) {
        const ang = (i / 10) * Math.PI * 2;
        const crystal = new THREE.Mesh(new THREE.OctahedronGeometry(0.22, 0), flatMaterial);
        crystal.position.set(Math.cos(ang) * 0.6, 0, Math.sin(ang) * 0.6);
        crystal.rotation.y = ang;
        crystal.castShadow = true;
        group.add(crystal);
      }
    }
    else if (variant === 5) {
      // Vertical spikes
      const center = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), material);
      center.castShadow = true;
      group.add(center);
      
      for (let i = 0; i < 6; i++) {
        const ang = (i / 6) * Math.PI * 2;
        const spikeUp = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.02, 1.0, 8), material);
        spikeUp.position.set(Math.cos(ang) * 0.25, 0.5, Math.sin(ang) * 0.25);
        spikeUp.castShadow = true;
        const spikeDown = new THREE.Mesh(new THREE.CylinderGeometry(0.06, 0.02, 1.0, 8), material);
        spikeDown.position.set(Math.cos(ang) * 0.25, -0.5, Math.sin(ang) * 0.25);
        spikeDown.rotation.z = Math.PI;
        spikeDown.castShadow = true;
        group.add(spikeUp, spikeDown);
      }
    }
    else if (variant === 6) {
      // Curved rays
      const center = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), material);
      center.castShadow = true;
      group.add(center);
      
      for (let i = 0; i < 10; i++) {
        const ang = (i / 10) * Math.PI * 2;
        for (let j = 0; j < 8; j++) {
          const t = j / 8;
          const curve = Math.sin(t * Math.PI) * 0.25;
          const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.05, 8, 8), material);
          sphere.position.set(
            Math.cos(ang) * (0.3 + t * 0.6) + curve,
            0,
            Math.sin(ang) * (0.3 + t * 0.6)
          );
          sphere.castShadow = true;
          group.add(sphere);
        }
      }
    }
    else if (variant === 7) {
      // Orbiting spheres
      const center = new THREE.Mesh(new THREE.SphereGeometry(0.3, 16, 16), material);
      center.castShadow = true;
      group.add(center);
      
      for (let ring = 0; ring < 3; ring++) {
        const numSpheres = 8;
        const radius = 0.7;
        const tilt = (ring / 3) * Math.PI;
        
        for (let i = 0; i < numSpheres; i++) {
          const ang = (i / numSpheres) * Math.PI * 2;
          const orb = new THREE.Mesh(new THREE.SphereGeometry(0.1, 12, 12), material);
          const vx = Math.cos(ang) * radius;
          const vy = Math.sin(ang) * radius * Math.sin(tilt);
          const vz = Math.sin(ang) * radius * Math.cos(tilt);
          orb.position.set(vx, vy, vz);
          orb.castShadow = true;
          group.add(orb);
        }
      }
    }
    
    group.position.set(x, y, z);
    return group;
  },

  // ============================================
  // TWISTED BOX FAMILY - Longevity
  // ============================================
  createTwistedBoxVariant: function(variant, x, y, z, color, angle) {
    const group = new THREE.Group();
    const material = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.5,
      metalness: 0.3
    });
    
    // Add glow layers
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
    
    if (variant === 0) {
      // Classic twisted boxes
      for (let i = 0; i < layers; i++) {
        const t = i / layers;
        const box = new THREE.Mesh(new THREE.BoxGeometry(0.9, 0.22, 0.9), material);
        box.position.y = (t - 0.5) * 1.8;
        box.rotation.y = t * Math.PI / 2;
        box.castShadow = true;
        group.add(box);
      }
    } 
    else if (variant === 1) {
      // Expanding boxes
      for (let i = 0; i < layers; i++) {
        const t = i / layers;
        const scale = 0.5 + t * 0.6;
        const box = new THREE.Mesh(new THREE.BoxGeometry(scale, 0.2, scale), material);
        box.position.y = (t - 0.5) * 2.0;
        box.rotation.y = t * Math.PI / 3;
        box.castShadow = true;
        group.add(box);
      }
    }
    else if (variant === 2) {
      // Offset ziggurat
      for (let i = 0; i < layers; i++) {
        const t = i / layers;
        const offset = (i % 2) * 0.4 - 0.2;
        const box = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.2, 0.8), material);
        box.position.set(offset, (t - 0.5) * 1.9, 0);
        box.rotation.y = t * Math.PI / 4;
        box.castShadow = true;
        group.add(box);
      }
    }
    else if (variant === 3) {
      // Tapering pyramid
      for (let i = 0; i < layers; i++) {
        const t = i / layers;
        const box = new THREE.Mesh(new THREE.BoxGeometry(1.05 - t * 0.3, 0.18, 1.05 - t * 0.3), material);
        box.position.y = (t - 0.5) * 1.95;
        box.rotation.y = t * Math.PI;
        box.castShadow = true;
        group.add(box);
      }
    }
    else if (variant === 4) {
      // Cross formation
      for (let i = 0; i < 6; i++) {
        const t = i / 6;
        const vy = (t - 0.5) * 2.0;
        
        const center = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.2, 0.4), material);
        center.position.y = vy;
        center.castShadow = true;
        group.add(center);
        
        for (let arm = 0; arm < 4; arm++) {
          const ang = (arm / 4) * Math.PI * 2;
          const box = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.18, 0.6), material);
          box.position.set(Math.cos(ang) * 0.5, vy, Math.sin(ang) * 0.5);
          box.rotation.y = ang;
          box.castShadow = true;
          group.add(box);
        }
      }
    }
    else if (variant === 5) {
      // Cross pattern boxes
      for (let i = 0; i < layers; i++) {
        const t = i / layers;
        const box = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.18, 0.7), material);
        const crossOffset = (i % 2) * 0.35;
        box.position.set(crossOffset, (t - 0.5) * 1.85, -crossOffset);
        box.rotation.y = t * Math.PI / 2 + (i % 2) * Math.PI / 4;
        box.castShadow = true;
        group.add(box);
      }
    }
    else if (variant === 6) {
      // Spiral staircase
      for (let i = 0; i < 12; i++) {
        const t = i / 12;
        const ang = t * Math.PI * 3;
        const radius = 0.6;
        const box = new THREE.Mesh(new THREE.BoxGeometry(0.5, 0.15, 0.5), material);
        box.position.set(Math.cos(ang) * radius, (t - 0.5) * 2.2, Math.sin(ang) * radius);
        box.rotation.y = ang + Math.PI / 2;
        box.castShadow = true;
        group.add(box);
      }
    }
    else if (variant === 7) {
      // Double helix boxes
      for (let i = 0; i < 10; i++) {
        const t = i / 10;
        const ang = t * Math.PI * 4;
        
        const box1 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.18, 0.4), material);
        box1.position.set(Math.cos(ang) * 0.5, (t - 0.5) * 2.0, Math.sin(ang) * 0.5);
        box1.rotation.y = ang;
        box1.castShadow = true;
        group.add(box1);
        
        const box2 = new THREE.Mesh(new THREE.BoxGeometry(0.4, 0.18, 0.4), material);
        box2.position.set(Math.cos(ang + Math.PI) * 0.5, (t - 0.5) * 2.0, Math.sin(ang + Math.PI) * 0.5);
        box2.rotation.y = ang + Math.PI;
        box2.castShadow = true;
        group.add(box2);
      }
    }
    
    group.position.set(x, y, z);
    return group;
  }
};

// Export for use in other files
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ShapeGenerator;
}