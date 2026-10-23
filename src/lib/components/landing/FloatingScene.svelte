<script lang="ts">
	import { onMount } from 'svelte';

	// Fondo 3D detrás de toda la página: rayos, esferas, anillos y cápsulas con los colores de Thunderop.
	// Flotan solos, acompañan el scroll a distintas velocidades (profundidad) y siguen un poco al mouse.
	// Va con z-index 0 y el contenido (main y pie) encima con z-index 1 (app.css).
	// Con "reducir movimiento" quedan quietos (solo se redibujan al hacer scroll). three.js se carga aparte, sin frenar la portada.
	let canvas: HTMLCanvasElement;

	onMount(() => {
		let parar = () => {};
		let vivo = true;
		import('three').then((THREE) => { if (vivo) parar = iniciar(THREE); });
		return () => { vivo = false; parar(); };
	});

	function iniciar(THREE: typeof import('three')) {
		const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
		renderer.setPixelRatio(Math.min(devicePixelRatio, 1.75));
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
		camera.position.z = 18;
		scene.add(new THREE.HemisphereLight(0xffffff, 0x2a1a55, 1.6));
		const sol = new THREE.DirectionalLight(0xffffff, 2.4);
		sol.position.set(5, 8, 10);
		scene.add(sol);

		// Rayo del logo, extruido y con bordes redondeados.
		const forma = new THREE.Shape();
		forma.moveTo(0.2, 1.6); forma.lineTo(-0.7, -0.1); forma.lineTo(-0.05, -0.1);
		forma.lineTo(-0.35, -1.6); forma.lineTo(0.75, 0.25); forma.lineTo(0.1, 0.25); forma.closePath();
		const rayo = new THREE.ExtrudeGeometry(forma, { depth: 0.35, bevelEnabled: true, bevelThickness: 0.12, bevelSize: 0.1, bevelSegments: 4, curveSegments: 4 });
		rayo.center();
		const geos = [rayo, new THREE.SphereGeometry(0.55, 32, 24), rayo, new THREE.TorusGeometry(0.6, 0.2, 20, 48), new THREE.CapsuleGeometry(0.3, 0.7, 8, 20)];
		const mats = [0x8c43ff, 0x48ceff, 0xb48cff, 0xff6fb5, 0xffc94d].map((color) =>
			new THREE.MeshPhysicalMaterial({ color, roughness: 0.35, clearcoat: 1, clearcoatRoughness: 0.25 }));

		// En pantallas chicas, menos piezas y más chicas: ahí el texto ocupa casi todo el ancho.
		const chica = innerWidth < 700;
		const N = chica ? 14 : 28;
		const azar = (a: number, b: number) => a + Math.random() * (b - a);
		const piezas = Array.from({ length: N }, (_, i) => {
			const m = new THREE.Mesh(geos[i % geos.length], mats[(i * 3) % mats.length]);
			m.scale.setScalar(azar(0.55, 1.25) * (chica ? 0.6 : 1));
			scene.add(m);
			// `fila` reparte las piezas a lo largo de toda la página; `paralaje` < 1 = más lejos (se mueve más lento).
			// Hacia los costados (nunca en el centro), para no pasar por detrás del texto.
			return { m, fila: (i + Math.random()) / N, x: (i % 2 ? 1 : -1) * azar(0.45, 0.92), z: azar(-8, 1.5), paralaje: azar(0.55, 1.15), fase: azar(0, 6.3),
				giro: azar(-0.5, 0.5), rx: azar(0, 6.3), ry: azar(0, 6.3) };
		});

		// Unidades del mundo por píxel de pantalla en z = 0.
		let porPx = 0, ancho = 0, alto = 0;
		function medir() {
			const w = innerWidth, h = innerHeight;
			renderer.setSize(w, h, false);
			camera.aspect = w / h;
			camera.updateProjectionMatrix();
			porPx = (2 * camera.position.z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2))) / h;
			ancho = w * porPx * 0.55;
			alto = document.documentElement.scrollHeight * porPx;
		}
		medir();

		let mx = 0, my = 0;
		const mouse = (e: PointerEvent) => { mx = e.clientX / innerWidth - 0.5; my = e.clientY / innerHeight - 0.5; };
		const quieto = matchMedia('(prefers-reduced-motion: reduce)').matches;
		const reloj = new THREE.Clock();
		let raf = 0;
		function cuadro() {
			const t = quieto ? 0 : reloj.getElapsedTime();
			const bajado = scrollY * porPx;
			const arriba = (innerHeight * porPx) / 2;
			for (const p of piezas) {
				p.m.position.set(p.x * ancho + Math.sin(t * 0.4 + p.fase) * 0.3,
					arriba - p.fila * alto + bajado * p.paralaje + Math.sin(t * 0.6 + p.fase) * 0.4, p.z);
				p.m.rotation.set(p.rx + t * p.giro, p.ry + t * p.giro * 0.8, 0);
			}
			camera.position.x += (mx * 1.6 - camera.position.x) * 0.05;
			camera.position.y += (-my * 1.2 - camera.position.y) * 0.05;
			camera.lookAt(0, 0, 0);
			renderer.render(scene, camera);
			if (!quieto && !document.hidden) raf = requestAnimationFrame(cuadro);
		}
		const visible = () => { cancelAnimationFrame(raf); if (!document.hidden) cuadro(); };
		const alScroll = () => { if (quieto) cuadro(); };
		addEventListener('resize', medir);
		addEventListener('pointermove', mouse);
		addEventListener('scroll', alScroll, { passive: true });
		document.addEventListener('visibilitychange', visible);
		// La página termina de crecer (imágenes, fuentes) después de montar: se vuelve a medir una vez.
		const remedir = setTimeout(medir, 1500);
		cuadro();

		return () => {
			cancelAnimationFrame(raf);
			clearTimeout(remedir);
			removeEventListener('resize', medir);
			removeEventListener('pointermove', mouse);
			removeEventListener('scroll', alScroll);
			document.removeEventListener('visibilitychange', visible);
			for (const g of new Set(geos)) g.dispose();
			for (const m of mats) m.dispose();
			renderer.dispose();
		};
	}
</script>

<canvas bind:this={canvas} class="floating-scene" aria-hidden="true"></canvas>

<style>
	.floating-scene { position: fixed; inset: 0; width: 100%; height: 100%; z-index: 0; pointer-events: none; }
</style>
