<script lang="ts">
	import { getI18n } from '#lib/i18n/context.svelte.js';
	import Icon from './Icon.svelte';
	import { ClientResponseError } from 'pocketbase';
	import { pedirDescarga } from '#lib/cuenta.svelte.js';
	const i18n = getI18n();
	const t = $derived(i18n.text);
	let dialog: HTMLDialogElement;
	let codigo = $state('');
	let error = $state('');
	let revisando = $state(false);
	export function open() { error = ''; dialog?.showModal(); }
	function close() { dialog?.close(); }
	// El código lo revisa el servidor de Thunderop; solo si es correcto devuelve el link del instalador.
	// Dos botones en el mismo formulario: Estable (la que se actualiza sola) o Beta.
	async function descargar(e: SubmitEvent) {
		e.preventDefault();
		const beta = (e.submitter as HTMLButtonElement | null)?.value === 'beta';
		error = ''; revisando = true;
		try {
			window.location.href = await pedirDescarga(codigo, beta);
			close();
		} catch (e) {
			const status = e instanceof ClientResponseError ? e.status : 0;
			error = status === 401 ? t.download.wrong : status === 429 ? t.download.tooMany : t.download.failed;
		}
		finally { revisando = false; }
	}
</script>

<dialog bind:this={dialog} class="download-dialog" aria-labelledby="download-title">
	<button type="button" class="dialog-close" aria-label={t.download.dismiss} onclick={close}><Icon name="close" /></button>
	<span class="dialog-hero-icon"><Icon name="windows" size={35} /></span>
	<span class="eyebrow"><span class="status-dot"></span>{t.download.status}</span>
	<h2 id="download-title">{t.download.title}</h2>
	<p>{t.download.body}</p>
	<form class="download-code" onsubmit={descargar}>
		<label for="download-code">{t.download.code}</label>
		<input id="download-code" type="password" autocomplete="off" required maxlength="100" bind:value={codigo} aria-invalid={!!error} aria-describedby="download-error" />
		<p id="download-error" class="download-error" role="alert">{error}</p>
		<button type="submit" value="estable" class="button button-primary" disabled={revisando}>{revisando ? t.download.checking : t.download.stable}<Icon name="down" size={18} /></button>
		<button type="submit" value="beta" class="button button-secondary" disabled={revisando}>{t.download.beta}<Icon name="down" size={18} /></button>
		<details class="guia-beta">
			<summary>{t.download.betaTitle}</summary>
			<p>{t.download.betaNote}</p>
			<ol><li>{t.download.betaStep1}</li><li>{t.download.betaStep2}</li></ol>
		</details>
	</form>
</dialog>

<style>
	.download-code { display: grid; gap: 8px; width: 100%; text-align: left; }
	.download-code label { font-size: 13px; font-weight: 650; color: #d9d2f2; }
	.download-code input { min-height: 48px; padding: 0 14px; border-radius: 10px; border: 1px solid #7a62c766; background: #0d0e22; color: #fff; font: inherit; font-size: 16px; }
	.download-code input:focus-visible { outline: 2px solid #8c43ff; outline-offset: 1px; }
	.download-error { min-height: 1.4em; margin: 0; color: #ff8fa3; font-size: 13px; }
	.download-error:empty { min-height: 0; }
	.guia-beta { margin-top: 4px; padding: 12px 14px; border: 1px solid #7a62c744; border-radius: 12px; background: #0d0e2299; font-size: 13px; color: #cfc6ea; }
	.guia-beta summary { cursor: pointer; font-weight: 650; color: #e6dcff; }
	.guia-beta p { margin: 10px 0 6px; }
	.guia-beta ol { margin: 0; padding-left: 18px; display: grid; gap: 6px; }
</style>
