<script lang="ts">
	import { getI18n } from '#lib/i18n/context.svelte.js';
	import { cuentaMessages } from '#lib/i18n/cuenta-messages.js';
	import PaginaCuenta from './PaginaCuenta.svelte';

	let { doc }: { doc: 'terminos' | 'privacidad' } = $props();
	const i18n = getI18n();
	const legal = $derived(cuentaMessages[i18n.locale].legal);
	const texto = $derived(legal[doc]);
	const MAIL = 'soporte@thunderop.com';
</script>

<PaginaCuenta titulo={texto.titulo} ancho>
	<p class="borrador" role="note">{legal.borrador}</p>
	<p><small>{legal.version}</small></p>
	{#each texto.secciones as s}
		<section>
			<h2>{s.titulo}</h2>
			{#each s.parrafos as p}
				<!-- El mail de contacto va como link. -->
				<p>{#each p.split(MAIL) as parte, i}{#if i > 0}<a href="mailto:{MAIL}">{MAIL}</a>{/if}{parte}{/each}</p>
			{/each}
		</section>
	{/each}
</PaginaCuenta>

<style>
	.borrador { padding: 10px 14px; border: 1px solid #ffb86b66; border-radius: 10px; background: #ffb86b14; color: #ffd29c !important; font-weight: 650; }
	section { display: grid; gap: 8px; }
	h2 { margin: 8px 0 0; font-size: 18px; font-weight: 650; letter-spacing: -.02em; }
</style>
