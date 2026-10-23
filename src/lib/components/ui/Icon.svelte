<script lang="ts">
	export type IconName = 'bolt' | 'windows' | 'arrow' | 'down' | 'check' | 'globe' | 'chevron' | 'menu' | 'close' | 'mic' | 'video' | 'monitor' | 'headphones' | 'users' | 'game' | 'volume' | 'hash' | 'plus' | 'minus' | 'square' | 'phone' | 'chip' | 'search' | 'book' | 'mail';
	let { name, size = 20 }: { name: IconName; size?: number } = $props();
</script>

<svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
	{#if name === 'bolt'}
		<path d="M13.5 2 4 13h7l-1 9 10-13h-7l.5-7Z" fill="currentColor" stroke-width="0" />
	{:else if name === 'windows'}
		<path d="m2 4 8-1v8H2V4Zm10-1 10-1v9H12V3ZM2 13h8v8l-8-1v-7Zm10 0h10v9l-10-1v-8Z" fill="currentColor" stroke-width="0" />
	{:else if name === 'arrow'}
		<path d="M4 12h15m-6-6 6 6-6 6" />
	{:else if name === 'down'}
		<path d="M12 4v16m-6-6 6 6 6-6" />
	{:else if name === 'check'}
		<path d="m5 12 4 4L19 6" />
	{:else if name === 'globe'}
		<circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c5 5 5 13 0 18-5-5-5-13 0-18Z" />
	{:else if name === 'chevron'}
		<path d="m7 10 5 5 5-5" />
	{:else if name === 'menu'}
		<path d="M4 6h16M4 12h16M4 18h16" />
	{:else if name === 'close'}
		<path d="m6 6 12 12M6 18 18 6" />
	{:else if name === 'mic'}
		<rect x="9" y="2" width="6" height="13" rx="3" /><path d="M5 10v2a7 7 0 0 0 14 0v-2m-7 9v3m-4 0h8" />
	{:else if name === 'video'}
		<rect x="3" y="5" width="12" height="14" rx="3" /><path d="m15 10 6-4v12l-6-4" />
	{:else if name === 'monitor'}
		<rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8m-4-4v4" />
	{:else if name === 'chip'}
		<rect x="6" y="6" width="12" height="12" rx="2" /><rect x="9" y="9" width="6" height="6" rx="1" /><path d="M9 2v4m6-4v4M9 18v4m6-4v4M2 9h4m-4 6h4m12-6h4m-4 6h4" />
	{:else if name === 'headphones'}
		<path d="M3 14v-3a9 9 0 0 1 18 0v3M3 13h3v7H3v-7Zm15 0h3v7h-3v-7Zm3 7c0 2-3 2-6 2" />
	{:else if name === 'users'}
		<circle cx="9" cy="7" r="4" /><path d="M2 21v-2a7 7 0 0 1 14 0v2M16 3a4 4 0 0 1 0 8m4 10v-2a7 7 0 0 0-4-6" />
	{:else if name === 'game'}
		<path d="M8 6h8c3 0 5 3 6 10 0 4-4 4-7 0H9c-3 4-7 4-7 0 1-7 3-10 6-10Z" /><path d="M6 10v4m-2-2h4m8-1h.01M19 13h.01" />
	{:else if name === 'volume'}
		<path d="m11 4-6 5H2v6h3l6 5V4Zm4 4c3 2 3 6 0 8m3-11c5 4 5 10 0 14" />
	{:else if name === 'hash'}
		<path d="m10 3-4 18M18 3l-4 18M3 9h18M2 15h18" />
	{:else if name === 'plus'}
		<path d="M12 5v14M5 12h14" />
	{:else if name === 'minus'}
		<path d="M5 12h14" />
	{:else if name === 'square'}
		<rect x="5" y="5" width="14" height="14" rx="2" />
	{:else if name === 'phone'}
		<path d="M3 15c3-5 15-5 18 0v4h-5v-3a12 12 0 0 0-8 0v3H3v-4Z" />
	{:else if name === 'search'}
        <circle cx="10.5" cy="10.5" r="6.5"/><path d="m16 16 5 5"/>
    {:else if name === 'book'}
        <path d="M12 5C9 3 5 3 2 4v15c3-1 7-1 10 1 3-2 7-2 10-1V4c-3-1-7-1-10 1Zm0 0v15"/>
    {:else if name === 'mail'}
        <rect x="3" y="4" width="18" height="16" rx="2"/><path d="m3 6 9 7 9-7"/>
    {/if}
</svg>
