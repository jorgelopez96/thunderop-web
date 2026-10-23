<script lang="ts">
	import { getI18n } from '#lib/i18n/context.svelte.js';
	import Icon from '#lib/components/ui/Icon.svelte';
	const i18n = getI18n();
	const p = $derived(i18n.text.preview);
	// Personas de la sala de ejemplo: quién habla, quién transmite (con sus espectadores) y quién tiene el micrófono apagado.
	const gente = [
		{ n: 'Nova', c: '#c96fc9', habla: true, vivo: 0, mudo: false },
		{ n: 'Alex', c: '#4fb8d8', habla: false, vivo: 2, mudo: false },
		{ n: 'Sam', c: '#e5b84b', habla: false, vivo: 0, mudo: true },
		{ n: 'Vos', c: '#8b7cf6', habla: false, vivo: 0, mudo: false }
	];
</script>

<!-- Réplica de la sala de voz de Thunderop (v0.4): barra de salas, transmisión, tarjetas y dock. Todo escala con el ancho (em). -->
<div class="app-window" aria-hidden="true">
	<div class="titlebar">
		<span class="marca">Thunderop</span>
		<span class="ventana"><Icon name="minus" size={10} /><Icon name="square" size={9} /><Icon name="close" size={10} /></span>
	</div>
	<div class="cuerpo">
		<nav class="salas">
			<div class="grupo">{p.server}<Icon name="chevron" size={11} /></div>
			<div class="seccion">{p.voiceRooms}</div>
			<div class="sala activa"><Icon name="volume" size={11} /><span>{p.voice}</span><small class="verde">3 {p.inVoice}</small></div>
			<div class="caritas">{#each gente.slice(0, 3) as g (g.n)}<i style:background={g.c}>{g.n[0]}</i>{/each}</div>
			<div class="sala"><Icon name="volume" size={11} /><span>{p.gaming}</span><small>{p.empty}</small></div>
			<div class="seccion">{p.chats}</div>
			<div class="sala"><Icon name="hash" size={11} /><span>{p.general}</span><b class="contador">2</b></div>
			<div class="sala"><Icon name="hash" size={11} /><span>{p.clips}</span></div>
		</nav>
		<section class="voz">
			<header><strong>{p.voice}</strong><small>{p.server}</small><span class="boton"><Icon name="users" size={11} />{p.participants} · 4</span></header>
			<div class="escenario">
				<div class="juego"><div class="luna"></div><div class="monte atras"></div><div class="monte"></div></div>
				<span class="etiqueta"><i></i>Alex <b>👤 2</b></span>
			</div>
			<div class="tarjetas">
				{#each gente as g (g.n)}
					<div class="tarjeta" class:habla={g.habla} class:vivo={g.vivo} style:--c={g.c}>
						<i class="avatar" style:background={g.c}>{g.n[0]}</i>
						{#if g.vivo}<span class="en-vivo">{p.live} 👤{g.vivo}</span><span class="ver">{p.stop}</span>{/if}
						<span class="nombre">{#if g.mudo}<span class="mudo"><Icon name="mic" size={9} /></span>{/if}{g.n}</span>
					</div>
				{/each}
			</div>
			<footer class="dock">
				<span><Icon name="mic" size={13} /></span><span><Icon name="headphones" size={13} /></span><i></i>
				<span class="cian"><Icon name="monitor" size={13} /></span><span class="magenta">♫</span><span class="violeta">♪</span><i></i>
				<span class="colgar"><Icon name="phone" size={13} /></span>
			</footer>
		</section>
	</div>
</div>

<style>
	/* Colores de la app real (app.css de Thunderop). */
	.app-window { --fondo: #0e0f14; --panel: #161821; --elevado: #1c1e29; --borde: rgb(255 255 255 / .08); --texto: #e8e9f0;
		--tenue: #9ba0b4; --acento: #8b7cf6; --ok: #5bc77a; --peligro: #e25c6f;
		container-type: inline-size; overflow: hidden; color: var(--texto); background: var(--fondo); border: 1px solid #ffffff1f; border-radius: 12px;
		box-shadow: 0 30px 80px #0008, 0 0 0 1px #8b7cf622, 0 0 60px #6c3cff26; font-family: Inter, 'Manrope Variable', system-ui, sans-serif; }
	.app-window > * { font-size: max(7px, 1.75cqw); }
	.titlebar { display: flex; align-items: center; justify-content: space-between; padding: .7em 1em; background: var(--panel); border-bottom: 1px solid var(--borde); }
	.marca { font-weight: 700; letter-spacing: -.01em; }
	.ventana { display: flex; gap: 1.1em; color: var(--tenue); }
	.cuerpo { display: grid; grid-template-columns: 27% 1fr; min-height: 0; }
	.salas { display: flex; flex-direction: column; gap: .15em; padding: 1em .8em; background: var(--panel); border-right: 1px solid var(--borde); }
	.grupo { display: flex; justify-content: space-between; align-items: center; font-weight: 600; margin-bottom: .8em; }
	.seccion { margin: .9em 0 .3em .4em; font-size: .78em; font-weight: 600; letter-spacing: .08em; color: var(--tenue); }
	.sala { display: flex; align-items: center; gap: .5em; padding: .45em .5em; border-radius: 6px; color: var(--tenue); }
	.sala span { flex: 1; min-width: 0; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
	.sala.activa { background: rgb(139 124 246 / .14); color: var(--texto); }
	.sala small { font-size: .85em; color: #6b7084; }
	.sala small.verde { color: var(--ok); }
	.contador { min-width: 1.6em; padding: 0 .4em; border-radius: 99px; background: var(--acento); color: #fff; font-size: .8em; text-align: center; }
	.caritas { display: flex; gap: .3em; padding: 0 .5em .4em; }
	.caritas i, .avatar { display: grid; place-items: center; border-radius: 50%; font-style: normal; font-weight: 700; color: #fff; }
	.caritas i { width: 1.7em; height: 1.7em; font-size: .8em; }
	.voz { display: flex; flex-direction: column; gap: .8em; padding: 1em 1.2em .8em; min-width: 0; }
	.voz header { display: flex; align-items: baseline; gap: .6em; }
	.voz header strong { font-size: 1.15em; }
	.voz header small { color: var(--tenue); margin-right: auto; }
	.boton { display: inline-flex; align-items: center; gap: .4em; font-size: .85em; color: var(--tenue); }
	.escenario { position: relative; aspect-ratio: 16 / 7.2; border-radius: 9px; overflow: hidden; border: 1px solid var(--borde); }
	.juego { position: absolute; inset: 0; background: linear-gradient(180deg, #2c1c5c, #5a3f9a 60%, #8f6cc9); }
	.luna { position: absolute; width: 9%; aspect-ratio: 1; right: 14%; top: 16%; border-radius: 50%; background: #e9ddff; box-shadow: 0 0 2em #e9ddff99; }
	.monte { position: absolute; left: -5%; right: -5%; bottom: 0; height: 55%; background: #1b1238; clip-path: polygon(0 100%, 18% 30%, 34% 70%, 55% 10%, 75% 60%, 90% 25%, 100% 100%); }
	.monte.atras { height: 70%; background: #3a2a72; clip-path: polygon(0 100%, 12% 40%, 30% 75%, 48% 20%, 66% 55%, 84% 15%, 100% 100%); }
	.etiqueta { position: absolute; top: .7em; left: .7em; display: flex; align-items: center; gap: .5em; padding: .3em .6em; border-radius: 6px; background: rgb(0 0 0 / .6); font-size: .9em; font-weight: 500; }
	.etiqueta i { width: .45em; height: .45em; border-radius: 50%; background: var(--ok); }
	.etiqueta b { color: var(--peligro); font-weight: 600; }
	.tarjetas { display: grid; grid-template-columns: repeat(4, 1fr); gap: .55em; }
	.tarjeta { position: relative; aspect-ratio: 16 / 9; display: grid; place-items: center; border-radius: 8px; border: 2px solid transparent;
		background: color-mix(in srgb, var(--c) 30%, var(--panel)); }
	.tarjeta.habla { border-color: var(--ok); }
	.tarjeta.vivo { border-color: color-mix(in srgb, var(--ok) 45%, transparent); }
	.avatar { width: 32%; aspect-ratio: 1; font-size: 1.1em; box-shadow: 0 0 0 .2em rgb(0 0 0 / .2); }
	.en-vivo { position: absolute; top: .35em; left: .35em; padding: .1em .4em; border-radius: 4px; font-size: .62em; font-weight: 700; background: color-mix(in srgb, var(--ok) 70%, #000); }
	.ver { position: absolute; right: .35em; bottom: .35em; padding: .15em .45em; border-radius: 4px; font-size: .62em; background: var(--acento); }
	.nombre { position: absolute; left: .35em; bottom: .35em; display: flex; align-items: center; gap: .25em; padding: .1em .4em; border-radius: 4px; font-size: .7em; background: rgb(0 0 0 / .55); }
	.mudo { display: grid; color: var(--peligro); }
	.dock { display: flex; justify-content: center; align-items: center; gap: .5em; margin-top: .2em; padding: .5em; border-radius: 10px; background: var(--panel); border: 1px solid var(--borde); }
	.dock span { display: grid; place-items: center; width: 2.4em; height: 2.4em; border-radius: 8px; color: #b4b8c8; background: var(--elevado); font-size: .95em; }
	.dock i { width: 1px; height: 1.6em; background: var(--borde); }
	.dock .cian { color: #4fb8d8; }
	.dock .magenta { color: #c96fc9; }
	.dock .violeta { color: var(--acento); }
	.dock .colgar { background: var(--peligro); color: #fff; }
</style>
