<script lang="ts">
	let { compact = false }: { compact?: boolean } = $props(); // compact: más chico (barra de la ventana de ejemplo)
</script>

<span class:compact class="brand">
	<!-- La T con el rayo, la misma de la app. -->
	<svg class="brand-logo" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
		<path d="M4.2 2h15.6A1.2 1.2 0 0 1 21 3.2v2.1a1.2 1.2 0 0 1-1.2 1.2h-4.6L13.4 11.2H17L10 22.6l1.4-7.6H7.8l1.4-8.5H4.2A1.2 1.2 0 0 1 3 5.3V3.2A1.2 1.2 0 0 1 4.2 2z" />
	</svg>
	<span class="brand-name">Thunderop</span>
</span>
