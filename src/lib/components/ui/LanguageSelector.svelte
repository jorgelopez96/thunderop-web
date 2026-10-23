<script lang="ts">
	import { getI18n } from '#lib/i18n/context.svelte.js';
	import Icon from './Icon.svelte';
	const i18n = getI18n();
	const t = $derived(i18n.text);
</script>

<label class="language-selector">
	<Icon name="globe" size={17} />
	<span class="sr-only">{t.language.label}</span>
	<select disabled={!i18n.ready} aria-label={t.language.label} value={i18n.locale} onchange={(event) => i18n.select(event.currentTarget.value)}>
		<option value="es" lang="es">Español</option>
		<option value="en" lang="en">English</option>
	</select>
	<Icon name="chevron" size={13} />
</label>
