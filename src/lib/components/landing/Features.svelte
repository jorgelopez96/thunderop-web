<script lang="ts">
	import { getI18n } from '#lib/i18n/context.svelte.js';
	import Icon from '#lib/components/ui/Icon.svelte';

	const i18n = getI18n();
	const t = $derived(i18n.text.features);
	const features = [
		{ key: 'voice', icon: 'mic', color: '#62baff' },
		{ key: 'video', icon: 'video', color: '#bc83ff' },
		{ key: 'screen', icon: 'monitor', color: '#6cd8ff' },
		{ key: 'communities', icon: 'users', color: '#ce8fff' },
		{ key: 'resources', icon: 'chip', color: '#78acff' },
		{ key: 'connection', icon: 'bolt', color: '#bf7cff' }
	] as const;
</script>

<section class="features" id="experience" aria-labelledby="features-title">
	<div class="container">
		<div class="features-heading">
			<div class="features-intro">
				<h2 id="features-title">{t.titleLineOne}<br /><span>{t.titleLineTwo}</span></h2>
			</div>
			<p class="features-description">{t.description}</p>
		</div>

		<div class="features-grid">
			{#each features as feature (feature.key)}
				{@const card = t.cards[feature.key]}
				<article class="feature-card" style:--feature-color={feature.color} aria-labelledby={'feature-' + feature.key}>
					<span class="feature-card-icon"><Icon name={feature.icon} size={34} /></span>
					<div class="feature-card-content">
						<h3 id={'feature-' + feature.key}>{card.title}</h3>
						<p>{card.description}</p>
					</div>
				</article>
			{/each}
		</div>
	</div>
</section>

<style>
	.features {
		position: relative;
		isolation: isolate;
		padding-block: clamp(42px, 5vw, 72px) clamp(48px, 6vw, 82px);
		border-top: 1px solid #9b78e333;
		background: linear-gradient(180deg, #0c0d20b8, #08091738 85%);
		scroll-margin-top: 24px;
	}
	.features::before {
		content: '';
		position: absolute;
		z-index: -1;
		inset: 0 0 auto;
		height: 1px;
		background: linear-gradient(90deg, transparent 5%, #9f60fba1 38%, #528cff80 70%, transparent 95%);
		box-shadow: 0 0 24px #723cff35;
		pointer-events: none;
	}
	.features-heading {
		display: grid;
		grid-template-columns: minmax(0, .9fr) minmax(0, 1.1fr);
		align-items: end;
		gap: 24px 60px;
		margin-bottom: 34px;
	}
	.features-intro { min-width: 0; }
	h2 {
		margin: 17px 0 0;
		color: #f5f2ff;
		font-size: clamp(28px, 2.7vw, 40px);
		font-weight: 650;
		line-height: 1.14;
		letter-spacing: -.045em;
	}
	h2 > span { color: #c9c0f0; }
	.features-description {
		max-width: 60ch;
		margin: 0 0 3px;
		color: #adb0ca;
		font-size: 15px;
		line-height: 1.9;
	}
	.features-grid {
		display: grid;
		grid-template-columns: repeat(6, minmax(0, 1fr));
		gap: 14px;
	}
	.feature-card {
		position: relative;
		min-width: 0;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 22px;
		padding: 26px 18px 24px;
		border: 1px solid color-mix(in srgb, var(--feature-color) 30%, #20203b);
		border-radius: 14px;
		background: radial-gradient(ellipse at 30% 0, color-mix(in srgb, var(--feature-color) 9%, transparent), transparent 72%), linear-gradient(150deg, #15132e, #0d1021);
		box-shadow: inset 0 1px 0 #ffffff05, 0 8px 24px #02030b1a;
		transition: transform .2s, border-color .2s, box-shadow .2s;
	}
	.feature-card-icon {
		display: grid;
		place-items: center;
		width: 43px;
		height: 43px;
		flex-shrink: 0;
		color: var(--feature-color);
		filter: drop-shadow(0 0 8px color-mix(in srgb, var(--feature-color) 60%, transparent));
	}
	.feature-card-content { min-width: 0; }
	h3 {
		margin: 0 0 10px;
		color: #f4f1ff;
		font-size: 18px;
		font-weight: 650;
		line-height: 1.25;
		letter-spacing: -.03em;
	}
	.feature-card p { margin: 0; color: #b0b1ce; font-size: 14px; line-height: 1.75; }

	@media (hover: hover) and (pointer: fine) {
		.feature-card:hover {
			transform: translateY(-4px);
			border-color: color-mix(in srgb, var(--feature-color) 65%, #20203b);
			box-shadow: 0 10px 30px #05051766, 0 0 22px color-mix(in srgb, var(--feature-color) 9%, transparent);
		}
	}
	@media (max-width: 1279px) {
		.features-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 16px; }
		.feature-card { padding: 26px 22px; gap: 18px; }
	}
	@media (max-width: 799px) {
		.features-heading { grid-template-columns: minmax(0, 1fr); gap: 21px; margin-bottom: 28px; }
		.features-description { max-width: 58ch; }
		.features-grid { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 14px; }
		.feature-card { padding: 24px 20px; }
	}
	@media (max-width: 539px) {
		.features { padding-block: 36px 44px; }
		h2 { font-size: clamp(28px, 7.2vw, 36px); margin-top: 16px; }
		.features-heading { gap: 19px; margin-bottom: 25px; }
		.features-description { font-size: 15px; line-height: 1.8; }
		.features-grid { grid-template-columns: minmax(0, 1fr); gap: 13px; }
		.feature-card { display: grid; grid-template-columns: 43px minmax(0, 1fr); align-items: start; gap: 14px; padding: 24px 17px; }
		.feature-card-icon { height: 43px; }
		h3 { font-size: 19px; margin-bottom: 9px; }
		.feature-card p { font-size: 15px; line-height: 1.75; }
	}
</style>
