import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { Play, Pause, RotateCcw, Eye, Compass, Layers, Maximize2, Sliders, ChevronDown, ChevronUp, Sparkles } from 'lucide-react';
import { soundFx } from '../utils/audio';

interface Simulation3DProps {
  isProjectorMode?: boolean;
}

// Pre-allocated scratch objects for zero GC per frame
const _tempVec = new THREE.Vector3();
const _tangentVec = new THREE.Vector3();
const _targetCamPos = new THREE.Vector3(0, 4.2, 5.2);
const _targetLookAt = new THREE.Vector3(0, 0, 0);
const _currentLookAt = new THREE.Vector3(0, 0, 0);

export const Simulation3D: React.FC<Simulation3DProps> = ({ isProjectorMode = false }) => {
  const mountRef = useRef<HTMLDivElement>(null);

  // Physical simulation parameters
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [radius, setRadius] = useState<number>(1.2); // meters
  const [period, setPeriod] = useState<number>(2.0); // seconds
  const [showVelocity, setShowVelocity] = useState<boolean>(true);
  const [showRadius, setShowRadius] = useState<boolean>(true);
  const [showTrail, setShowTrail] = useState<boolean>(true);
  const [showGrid, setShowGrid] = useState<boolean>(true);
  const [cameraPreset, setCameraPreset] = useState<'perspective' | 'top' | 'side'>('perspective');
  const [isDockCollapsed, setIsDockCollapsed] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'3d' | '2d'>('3d');

  // Real-time displayed metrics
  const [metrics, setMetrics] = useState({
    elapsedTime: 0,
    revolutions: 0,
    angleDeg: 0,
    linearVelocity: (2 * Math.PI * 1.2) / 2.0,
    frequency: 1 / 2.0,
    angularVelocity: (2 * Math.PI) / 2.0,
    centripetalAcc: Math.pow((2 * Math.PI * 1.2) / 2.0, 2) / 1.2
  });

  // Mutable refs for high performance 60fps animation without React re-render lag
  const simState = useRef({
    isPlaying: true,
    radius: 1.2,
    period: 2.0,
    angle: 0,
    elapsedTime: 0,
    revolutions: 0,
    showVelocity: true,
    showRadius: true,
    showTrail: true,
    cameraPreset: 'perspective' as 'perspective' | 'top' | 'side'
  });

  // Sync state to mutable refs
  useEffect(() => {
    simState.current.isPlaying = isPlaying;
  }, [isPlaying]);

  useEffect(() => {
    simState.current.radius = radius;
  }, [radius]);

  useEffect(() => {
    simState.current.period = period;
  }, [period]);

  useEffect(() => {
    simState.current.showVelocity = showVelocity;
    simState.current.showRadius = showRadius;
    simState.current.showTrail = showTrail;
  }, [showVelocity, showRadius, showTrail]);

  // Set camera target positions based on preset
  useEffect(() => {
    simState.current.cameraPreset = cameraPreset;
    if (cameraPreset === 'top') {
      _targetCamPos.set(0, 6.5, 0.001); // almost straight top down
    } else if (cameraPreset === 'side') {
      _targetCamPos.set(0, 0.6, 5.5);
    } else {
      _targetCamPos.set(0, 4.2, 5.2); // perspective
    }
  }, [cameraPreset]);

  // Handle Play/Pause
  const togglePlay = () => {
    soundFx.playClick();
    setIsPlaying(prev => !prev);
  };

  // Handle Reset
  const handleReset = useCallback(() => {
    soundFx.playClick();
    simState.current.angle = 0;
    simState.current.elapsedTime = 0;
    simState.current.revolutions = 0;
    setMetrics(prev => ({
      ...prev,
      elapsedTime: 0,
      revolutions: 0,
      angleDeg: 0
    }));
  }, []);

  // Update physical calculated values
  useEffect(() => {
    const f = 1 / period;
    const v = (2 * Math.PI * radius) / period;
    const omega = (2 * Math.PI) / period;
    const a = (v * v) / radius;

    setMetrics(m => ({
      ...m,
      frequency: f,
      linearVelocity: v,
      angularVelocity: omega,
      centripetalAcc: a
    }));
  }, [radius, period]);

  // Three.js Scene Setup
  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth;
    const height = container.clientHeight;

    // 1. Scene & Renderer setup with PBR standards
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x060913);
    scene.fog = new THREE.FogExp2(0x060913, 0.05);

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.copy(_targetCamPos);
    camera.lookAt(_targetLookAt);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    // Capped at 1.25 for smooth 60fps on integrated Intel HD/UHD graphics (Core i3 / Core i5)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.25));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    container.appendChild(renderer.domElement);

    // Procedural Studio Environment Map using PMREMGenerator & RoomEnvironment
    const pmremGenerator = new THREE.PMREMGenerator(renderer);
    pmremGenerator.compileEquirectangularShader();
    const envTexture = pmremGenerator.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTexture;
    pmremGenerator.dispose();

    // 2. Studio Lighting Rig
    // Warm key light (optimized 512x512 shadow map for low-power GPUs)
    const keyLight = new THREE.DirectionalLight(0xfff5ea, 2.5);
    keyLight.position.set(4, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 512;
    keyLight.shadow.mapSize.height = 512;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 20;
    keyLight.shadow.camera.left = -4;
    keyLight.shadow.camera.right = 4;
    keyLight.shadow.camera.top = 4;
    keyLight.shadow.camera.bottom = -4;
    keyLight.shadow.bias = -0.0005;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    // Cool fill light
    const fillLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    fillLight.position.set(-5, 4, -3);
    scene.add(fillLight);

    // Hemisphere light for natural sky/ground contrast
    const hemiLight = new THREE.HemisphereLight(0x38bdf8, 0x090d16, 0.8);
    scene.add(hemiLight);

    // 3. Lab Environment & Ground Contact Shadow
    // Floor grid
    const gridHelper = new THREE.GridHelper(10, 20, 0x0284c7, 0x1e293b);
    gridHelper.position.y = -0.01;
    scene.add(gridHelper);

    // Soft radial contact shadow canvas
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 256;
    shadowCanvas.height = 256;
    const sCtx = shadowCanvas.getContext('2d')!;
    const sGrad = sCtx.createRadialGradient(128, 128, 10, 128, 128, 120);
    sGrad.addColorStop(0, 'rgba(0, 0, 0, 0.7)');
    sGrad.addColorStop(0.5, 'rgba(0, 0, 0, 0.35)');
    sGrad.addColorStop(1, 'rgba(0, 0, 0, 0)');
    sCtx.fillStyle = sGrad;
    sCtx.fillRect(0, 0, 256, 256);

    const shadowTexture = new THREE.CanvasTexture(shadowCanvas);
    shadowTexture.colorSpace = THREE.SRGBColorSpace;
    const shadowGeo = new THREE.PlaneGeometry(7, 7);
    const shadowMat = new THREE.MeshBasicMaterial({
      map: shadowTexture,
      transparent: true,
      depthWrite: false,
      opacity: 0.8
    });
    const shadowPlane = new THREE.Mesh(shadowGeo, shadowMat);
    shadowPlane.rotation.x = -Math.PI / 2;
    shadowPlane.position.y = 0.002;
    scene.add(shadowPlane);

    // 4. Composite 3-12 Part Procedural Laboratory Apparatus
    const apparatusGroup = new THREE.Group();
    scene.add(apparatusGroup);

    // Part 1: Heavy Laboratory Base Turntable
    const baseGeo = new THREE.CylinderGeometry(0.55, 0.65, 0.12, 48);
    const baseMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      metalness: 0.85,
      roughness: 0.25
    });
    const baseMesh = new THREE.Mesh(baseGeo, baseMat);
    baseMesh.position.y = 0.06;
    baseMesh.receiveShadow = true;
    apparatusGroup.add(baseMesh);

    // Part 2: Chamfered Anodized Bearing Ring
    const ringGeo = new THREE.TorusGeometry(0.52, 0.025, 16, 48);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.9,
      roughness: 0.15,
      emissive: 0x0284c7,
      emissiveIntensity: 0.2
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 2;
    ringMesh.position.y = 0.125;
    apparatusGroup.add(ringMesh);

    // Part 3: Spindle Shaft (Vertical center core)
    const spindleGeo = new THREE.CylinderGeometry(0.12, 0.14, 0.45, 32);
    const spindleMat = new THREE.MeshStandardMaterial({
      color: 0xe2e8f0,
      metalness: 0.95,
      roughness: 0.1
    });
    const spindleMesh = new THREE.Mesh(spindleGeo, spindleMat);
    spindleMesh.position.y = 0.25;
    spindleMesh.castShadow = true;
    apparatusGroup.add(spindleMesh);

    // Part 4: Center Pivot Jewel / Optical Sensor Cap
    const capGeo = new THREE.SphereGeometry(0.14, 32, 16);
    const capMat = new THREE.MeshPhysicalMaterial({
      color: 0x06b6d4,
      metalness: 0.2,
      roughness: 0.1,
      transmission: 0.7,
      thickness: 0.5,
      emissive: 0x0891b2,
      emissiveIntensity: 0.4
    });
    const capMesh = new THREE.Mesh(capGeo, capMat);
    capMesh.position.y = 0.48;
    apparatusGroup.add(capMesh);

    // Rotating Arm & Science Probe
    const rotatingArmGroup = new THREE.Group();
    rotatingArmGroup.position.y = 0.32;
    apparatusGroup.add(rotatingArmGroup);

    // Part 5: Telescopic Radial Guide Rod
    const rodGeo = new THREE.CylinderGeometry(0.025, 0.025, 3.0, 16);
    const rodMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      metalness: 0.9,
      roughness: 0.2
    });
    const rodMesh = new THREE.Mesh(rodGeo, rodMat);
    rodMesh.rotation.z = Math.PI / 2;
    rodMesh.position.x = 1.5;
    rodMesh.castShadow = true;
    rotatingArmGroup.add(rodMesh);

    // Part 6: Counterbalance Weight (Opposite side)
    const counterGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.18, 24);
    const counterMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      metalness: 0.7,
      roughness: 0.35
    });
    const counterMesh = new THREE.Mesh(counterGeo, counterMat);
    counterMesh.rotation.z = Math.PI / 2;
    counterMesh.position.x = -0.35;
    counterMesh.castShadow = true;
    rotatingArmGroup.add(counterMesh);

    // Science Probe Puck (Composite sub-assembly)
    const probeGroup = new THREE.Group();
    probeGroup.position.x = simState.current.radius;
    rotatingArmGroup.add(probeGroup);

    // Part 7: Probe Puck Base
    const puckBaseGeo = new THREE.CylinderGeometry(0.16, 0.18, 0.16, 32);
    const puckBaseMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      metalness: 0.8,
      roughness: 0.25
    });
    const puckBase = new THREE.Mesh(puckBaseGeo, puckBaseMat);
    puckBase.castShadow = true;
    probeGroup.add(puckBase);

    // Part 8: Probe Sensor Ring
    const puckRingGeo = new THREE.TorusGeometry(0.17, 0.02, 16, 32);
    const puckRingMat = new THREE.MeshStandardMaterial({
      color: 0xf59e0b,
      metalness: 0.95,
      roughness: 0.2
    });
    const puckRing = new THREE.Mesh(puckRingGeo, puckRingMat);
    puckRing.rotation.x = Math.PI / 2;
    probeGroup.add(puckRing);

    // Part 9: Probe Optical Dome (Glowing lens)
    const puckDomeGeo = new THREE.SphereGeometry(0.11, 24, 16);
    const puckDomeMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.1,
      metalness: 0.1,
      emissive: 0x0ea5e9,
      emissiveIntensity: 0.7
    });
    const puckDome = new THREE.Mesh(puckDomeGeo, puckDomeMat);
    puckDome.position.y = 0.08;
    probeGroup.add(puckDome);

    // Orbit Ring Track (Visual trajectory)
    let orbitRingMesh: THREE.Mesh | null = null;
    const createOrbitRing = (r: number) => {
      if (orbitRingMesh) {
        scene.remove(orbitRingMesh);
        orbitRingMesh.geometry.dispose();
      }
      const ringGeometry = new THREE.RingGeometry(r - 0.02, r + 0.02, 64);
      const ringMaterial = new THREE.MeshBasicMaterial({
        color: 0x38bdf8,
        side: THREE.DoubleSide,
        transparent: true,
        opacity: 0.45
      });
      orbitRingMesh = new THREE.Mesh(ringGeometry, ringMaterial);
      orbitRingMesh.rotation.x = -Math.PI / 2;
      orbitRingMesh.position.y = 0.01;
      scene.add(orbitRingMesh);
    };
    createOrbitRing(simState.current.radius);

    // Dynamic Tangent Velocity Arrow (Vector v)
    const arrowGroup = new THREE.Group();
    probeGroup.add(arrowGroup);

    // Tangent arrow stem
    const arrowStemGeo = new THREE.CylinderGeometry(0.02, 0.02, 0.8, 16);
    const arrowStemMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const arrowStem = new THREE.Mesh(arrowStemGeo, arrowStemMat);
    arrowStem.position.y = 0.4;
    arrowGroup.add(arrowStem);

    // Tangent arrow head
    const arrowHeadGeo = new THREE.ConeGeometry(0.065, 0.18, 16);
    const arrowHeadMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
    const arrowHead = new THREE.Mesh(arrowHeadGeo, arrowHeadMat);
    arrowHead.position.y = 0.85;
    arrowGroup.add(arrowHead);

    // Orient arrow along tangent (Z-axis in local space of rotating arm)
    arrowGroup.rotation.x = Math.PI / 2;
    arrowGroup.rotation.z = -Math.PI / 2;
    arrowGroup.position.set(0, 0.1, 0);

    // Radius line
    const radiusLineGeo = new THREE.BufferGeometry().setFromPoints([
      new THREE.Vector3(0, 0, 0),
      new THREE.Vector3(simState.current.radius, 0, 0)
    ]);
    const radiusLineMat = new THREE.LineBasicMaterial({ color: 0xf59e0b, linewidth: 2 });
    const radiusLine = new THREE.Line(radiusLineGeo, radiusLineMat);
    radiusLine.position.y = 0.05;
    rotatingArmGroup.add(radiusLine);

    // Mouse / Pointer Orbit Dragging support
    let isDragging = false;
    let prevMouseX = 0;
    let prevMouseY = 0;
    let sphericalPhi = Math.PI / 4;
    let sphericalTheta = 0;
    let sphericalRadius = 6.5;

    const onPointerDown = (e: PointerEvent) => {
      if ((e.target as HTMLElement).tagName !== 'CANVAS') return;
      isDragging = true;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;
    };

    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - prevMouseX;
      const dy = e.clientY - prevMouseY;
      prevMouseX = e.clientX;
      prevMouseY = e.clientY;

      sphericalTheta -= dx * 0.008;
      sphericalPhi = Math.max(0.1, Math.min(Math.PI / 2.05, sphericalPhi - dy * 0.008));

      _targetCamPos.x = sphericalRadius * Math.sin(sphericalPhi) * Math.sin(sphericalTheta);
      _targetCamPos.y = sphericalRadius * Math.cos(sphericalPhi);
      _targetCamPos.z = sphericalRadius * Math.sin(sphericalPhi) * Math.cos(sphericalTheta);
      setCameraPreset('custom' as unknown as 'perspective');
    };

    const onPointerUp = () => {
      isDragging = false;
    };

    const onWheel = (e: WheelEvent) => {
      sphericalRadius = Math.max(3.0, Math.min(12.0, sphericalRadius + e.deltaY * 0.005));
      _targetCamPos.x = sphericalRadius * Math.sin(sphericalPhi) * Math.sin(sphericalTheta);
      _targetCamPos.y = sphericalRadius * Math.cos(sphericalPhi);
      _targetCamPos.z = sphericalRadius * Math.sin(sphericalPhi) * Math.cos(sphericalTheta);
    };

    window.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerup', onPointerUp);
    container.addEventListener('wheel', onWheel, { passive: true });

    // Window Resize Handler
    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // 5. Lossless 60fps Render Loop with Real Time-Based Kinematics
    let animationFrameId: number;
    let lastTime = performance.now();
    let lastSecondTick = 0;
    let prevRadius = simState.current.radius;
    let isVisible = true;

    // IntersectionObserver to pause rendering when scrolled away (Essential for Core i3/i5)
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        isVisible = entry.isIntersecting;
      });
    }, { threshold: 0.05 });
    observer.observe(container);

    const tick = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(tick);

      if (!isVisible || document.hidden) {
        lastTime = currentTime;
        return;
      }

      const dt = Math.min((currentTime - lastTime) / 1000, 0.1); // clamp delta
      lastTime = currentTime;

      const state = simState.current;

      // Handle radius updates dynamically
      if (Math.abs(prevRadius - state.radius) > 0.001) {
        prevRadius = state.radius;
        probeGroup.position.x = state.radius;
        createOrbitRing(state.radius);

        const posAttr = radiusLine.geometry.attributes.position;
        posAttr.setXYZ(1, state.radius, 0, 0);
        posAttr.needsUpdate = true;
      }

      // Physics Kinematics Update
      if (state.isPlaying && state.period > 0.05) {
        const omega = (2 * Math.PI) / state.period;
        const dAngle = omega * dt;
        state.angle = (state.angle + dAngle) % (2 * Math.PI);
        state.elapsedTime += dt;

        // Revolutions tracking
        const currentRevs = Math.floor(state.elapsedTime / state.period);
        if (currentRevs > state.revolutions) {
          state.revolutions = currentRevs;
          soundFx.playTick();
        }

        // Rotate the arm
        rotatingArmGroup.rotation.y = state.angle;

        // Scale velocity arrow with current linear velocity v = omega * r
        const v = omega * state.radius;
        const scaleFactor = Math.min(Math.max(v * 0.45, 0.3), 2.2);
        arrowGroup.scale.set(1, scaleFactor, 1);

        // Periodic state sync to React UI (every 100ms to avoid DOM thrash)
        if (currentTime - lastSecondTick > 100) {
          lastSecondTick = currentTime;
          setMetrics(m => ({
            ...m,
            elapsedTime: state.elapsedTime,
            revolutions: state.revolutions,
            angleDeg: Math.round((state.angle * 180) / Math.PI)
          }));
        }
      }

      // Visibility toggles
      arrowGroup.visible = state.showVelocity;
      radiusLine.visible = state.showRadius;
      if (orbitRingMesh) {
        orbitRingMesh.visible = state.showTrail;
      }
      gridHelper.visible = state.showTrail;

      // Smooth camera interpolation with exponential damping
      camera.position.x = THREE.MathUtils.damp(camera.position.x, _targetCamPos.x, 5.0, dt);
      camera.position.y = THREE.MathUtils.damp(camera.position.y, _targetCamPos.y, 5.0, dt);
      camera.position.z = THREE.MathUtils.damp(camera.position.z, _targetCamPos.z, 5.0, dt);

      _currentLookAt.x = THREE.MathUtils.damp(_currentLookAt.x, _targetLookAt.x, 5.0, dt);
      _currentLookAt.y = THREE.MathUtils.damp(_currentLookAt.y, _targetLookAt.y, 5.0, dt);
      _currentLookAt.z = THREE.MathUtils.damp(_currentLookAt.z, _targetLookAt.z, 5.0, dt);
      camera.lookAt(_currentLookAt);

      renderer.render(scene, camera);
    };

    animationFrameId = requestAnimationFrame(tick);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);
      container.removeEventListener('wheel', onWheel);

      renderer.dispose();
      baseGeo.dispose();
      baseMat.dispose();
      spindleGeo.dispose();
      spindleMat.dispose();
      rodGeo.dispose();
      rodMat.dispose();
      puckBaseGeo.dispose();
      puckBaseMat.dispose();
      arrowStemGeo.dispose();
      arrowHeadGeo.dispose();
      if (orbitRingMesh) {
        orbitRingMesh.geometry.dispose();
      }

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div className="relative w-full h-[620px] lg:h-[720px] bg-slate-950 rounded-2xl overflow-hidden border border-slate-800 shadow-2xl">
      {/* 3D WebGL Canvas Container */}
      <div
        ref={mountRef}
        className="w-full h-full cursor-grab active:cursor-grabbing"
        title="Kamerani aylantirish uchun sichqonchani bosing va sudrang"
      />

      {/* Top Floating Badge & Specs (Unobstructed center viewport) */}
      <div className="absolute top-4 left-4 z-10 flex flex-wrap items-center gap-2 pointer-events-none">
        <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl px-3 py-2 text-xs backdrop-blur-none pointer-events-auto shadow-lg flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
          <span className="font-bold text-slate-200">INTERAKTIV SIMULYATSIYA</span>
          <span className="text-slate-400 font-mono">r = {radius.toFixed(2)} m</span>
        </div>

        <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl px-3 py-2 text-xs pointer-events-auto shadow-lg flex items-center gap-2">
          <span className="text-emerald-400 font-mono font-bold">v = {metrics.linearVelocity.toFixed(2)} m/s</span>
          <span className="text-slate-500">|</span>
          <span className="text-amber-400 font-mono font-bold">T = {period.toFixed(1)} s</span>
          <span className="text-slate-500">|</span>
          <span className="text-cyan-400 font-mono font-bold">f = {metrics.frequency.toFixed(2)} Hz</span>
        </div>
      </div>

      {/* Camera View Switcher (Top Right) */}
      <div className="absolute top-4 right-4 z-10 flex items-center gap-1.5 bg-slate-900/90 border border-slate-700/80 rounded-xl p-1 shadow-lg">
        <button
          onClick={() => {
            soundFx.playClick();
            setCameraPreset('perspective');
          }}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            cameraPreset === 'perspective'
              ? 'bg-cyan-500 text-slate-950 shadow'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="3D Laboratoriya ko‘rinishi"
        >
          3D Perspektiva
        </button>
        <button
          onClick={() => {
            soundFx.playClick();
            setCameraPreset('top');
          }}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            cameraPreset === 'top'
              ? 'bg-cyan-500 text-slate-950 shadow'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="Yuqoridan 2D chizma ko‘rinishi (Proyektor uchun qulay)"
        >
          Yuqoridan (2D)
        </button>
        <button
          onClick={() => {
            soundFx.playClick();
            setCameraPreset('side');
          }}
          className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all ${
            cameraPreset === 'side'
              ? 'bg-cyan-500 text-slate-950 shadow'
              : 'text-slate-300 hover:text-white hover:bg-slate-800'
          }`}
          title="Yon tomondan ko‘rinish"
        >
          Yon tomondan
        </button>
      </div>

      {/* Real-time Physical HUD Readout (Mid Left overlay) */}
      <div className="absolute left-4 top-20 z-10 hidden md:flex flex-col gap-2 pointer-events-none">
        <div className="bg-slate-900/90 border border-slate-700/80 rounded-xl p-3 shadow-lg pointer-events-auto min-w-[210px] space-y-2">
          <div className="text-[11px] font-bold tracking-wider uppercase text-cyan-400 flex items-center justify-between">
            <span>Fizik hisob-kitoblar</span>
            <Compass className="w-3.5 h-3.5" />
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Aylanishlar soni (N):</span>
              <span className="font-mono font-bold text-amber-400 text-sm">{metrics.revolutions} marta</span>
            </div>
            <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Kuzatish vaqti (t):</span>
              <span className="font-mono font-bold text-cyan-300 text-sm">{metrics.elapsedTime.toFixed(1)} s</span>
            </div>
            <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">Burchak tezligi (ω):</span>
              <span className="font-mono font-bold text-violet-300 text-sm">{metrics.angularVelocity.toFixed(2)} rad/s</span>
            </div>
            <div className="bg-slate-950/70 p-2 rounded-lg border border-slate-800">
              <span className="text-slate-400 block text-[10px]">M-intilma tezlanish (a):</span>
              <span className="font-mono font-bold text-rose-400 text-sm">{metrics.centripetalAcc.toFixed(2)} m/s²</span>
            </div>
          </div>

          <div className="border-t border-slate-800/80 pt-2 text-[11px] text-slate-300 font-mono space-y-1">
            <div className="flex justify-between">
              <span className="text-emerald-400 font-semibold">v = 2πr / T</span>
              <span>= 2·3.14·{radius} / {period}</span>
            </div>
            <div className="flex justify-between font-bold text-emerald-300">
              <span>Chiziqli tezlik:</span>
              <span>{metrics.linearVelocity.toFixed(2)} m/s</span>
            </div>
          </div>
        </div>
      </div>

      {/* Ergonomic Collapsible Bottom Control Dock (Three.js Skill directive) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 w-[96%] max-w-4xl">
        {/* Toggle Collapse/Expand Button */}
        <div className="flex justify-center -mb-2">
          <button
            onClick={() => setIsDockCollapsed(prev => !prev)}
            className="bg-slate-900 border border-slate-700/80 text-slate-300 hover:text-white px-3 py-1 rounded-t-lg text-xs font-semibold flex items-center gap-1 shadow-md hover:bg-slate-800 transition-colors"
          >
            {isDockCollapsed ? (
              <>
                <ChevronUp className="w-3.5 h-3.5" /> Boshqaruv panelini ochish
              </>
            ) : (
              <>
                <ChevronDown className="w-3.5 h-3.5" /> Panelni yashirish
              </>
            )}
          </button>
        </div>

        {/* Control Box */}
        {!isDockCollapsed && (
          <div className="bg-slate-900/95 border border-slate-700/90 rounded-2xl p-3 sm:p-4 shadow-2xl backdrop-blur-none space-y-3">
            {/* Upper row: Play/Pause/Reset + Preset Sliders */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-800/80 pb-3">
              {/* Playback buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={togglePlay}
                  className={`px-4 py-2 rounded-xl font-bold text-sm flex items-center gap-2 shadow-lg transition-all active:scale-95 ${
                    isPlaying
                      ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                      : 'bg-emerald-500 hover:bg-emerald-400 text-slate-950'
                  }`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" /> Pauza
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" /> Davom ettirish
                    </>
                  )}
                </button>

                <button
                  onClick={handleReset}
                  className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-xl text-sm font-semibold flex items-center gap-1.5 transition-all active:scale-95"
                  title="Tajribani boshlang‘ich holatga qaytarish"
                >
                  <RotateCcw className="w-4 h-4" /> Qayta boshlash
                </button>
              </div>

              {/* Quick speed/radius presets */}
              <div className="flex items-center gap-1.5 overflow-x-auto py-1">
                <span className="text-xs text-slate-400 font-medium mr-1 hidden sm:inline">Rejimlar:</span>
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setRadius(0.6);
                    setPeriod(3.0);
                  }}
                  className="px-2.5 py-1 text-xs bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-300"
                >
                  Sekin & Kichik r
                </button>
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setRadius(1.2);
                    setPeriod(2.0);
                  }}
                  className="px-2.5 py-1 text-xs bg-slate-800/80 hover:bg-slate-700 border border-slate-700 rounded-lg text-slate-300"
                >
                  Standart (Laboratoriya)
                </button>
                <button
                  onClick={() => {
                    soundFx.playClick();
                    setRadius(2.2);
                    setPeriod(1.2);
                  }}
                  className="px-2.5 py-1 text-xs bg-cyan-950/60 hover:bg-cyan-900/60 border border-cyan-800 text-cyan-300"
                >
                  Katta radius & Tez
                </button>
              </div>
            </div>

            {/* Sliders and Toggles Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3 items-center">
              {/* Radius slider */}
              <div className="bg-slate-950/60 border border-slate-800 p-2.5 rounded-xl">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-amber-400 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    Radius (r)
                  </span>
                  <span className="font-mono font-bold text-white text-sm">{radius.toFixed(2)} m</span>
                </div>
                <input
                  type="range"
                  min="0.3"
                  max="2.4"
                  step="0.05"
                  value={radius}
                  onChange={e => setRadius(parseFloat(e.target.value))}
                  className="w-full accent-amber-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>

              {/* Period slider */}
              <div className="bg-slate-950/60 border border-slate-800 p-2.5 rounded-xl">
                <div className="flex justify-between items-center text-xs mb-1.5">
                  <span className="text-cyan-400 font-semibold flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-cyan-400"></span>
                    Davr (T)
                  </span>
                  <span className="font-mono font-bold text-white text-sm">{period.toFixed(1)} s</span>
                </div>
                <input
                  type="range"
                  min="0.5"
                  max="6.0"
                  step="0.1"
                  value={period}
                  onChange={e => setPeriod(parseFloat(e.target.value))}
                  className="w-full accent-cyan-400 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                />
              </div>

              {/* Vector & Grid Visibility Toggles */}
              <div className="lg:col-span-2 flex flex-wrap items-center gap-2">
                <label className="flex items-center gap-2 bg-slate-950/60 border border-slate-800 px-3 py-2 rounded-xl text-xs text-slate-300 cursor-pointer hover:border-slate-700">
                  <input
                    type="checkbox"
                    checked={showVelocity}
                    onChange={e => setShowVelocity(e.target.checked)}
                    className="accent-emerald-500 rounded cursor-pointer"
                  />
                  <span className="text-emerald-400 font-semibold">Tezlik vektori (v⃗)</span>
                </label>

                <label className="flex items-center gap-2 bg-slate-950/60 border border-slate-800 px-3 py-2 rounded-xl text-xs text-slate-300 cursor-pointer hover:border-slate-700">
                  <input
                    type="checkbox"
                    checked={showRadius}
                    onChange={e => setShowRadius(e.target.checked)}
                    className="accent-amber-500 rounded cursor-pointer"
                  />
                  <span className="text-amber-400 font-semibold">Radius chizig‘i (r)</span>
                </label>

                <label className="flex items-center gap-2 bg-slate-950/60 border border-slate-800 px-3 py-2 rounded-xl text-xs text-slate-300 cursor-pointer hover:border-slate-700">
                  <input
                    type="checkbox"
                    checked={showTrail}
                    onChange={e => setShowTrail(e.target.checked)}
                    className="accent-cyan-500 rounded cursor-pointer"
                  />
                  <span className="text-cyan-300 font-semibold">Trayektoriya aylanasi</span>
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
