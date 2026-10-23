/**
 * Mouse/pen dragging for a native horizontal scroller.
 * Touch scrolling stays with the browser; ordinary clicks retain their behavior.
 */
export function dragScroll(node: HTMLDivElement) {
	let active: { id: number; x: number; y: number; scroll: number; dragging: boolean } | null = null;
	let suppressClick = false;

	function updateOverflow() {
		node.classList.toggle('is-draggable', node.scrollWidth > node.clientWidth + 1);
	}

	function finish(event?: PointerEvent) {
		if (!active || (event && event.pointerId !== active.id)) return;
		const previous = active;
		active = null;
		node.classList.remove('is-dragging');
		if (node.hasPointerCapture(previous.id)) node.releasePointerCapture(previous.id);
	}

	function pointerDown(event: PointerEvent) {
		suppressClick = false;
		if (event.pointerType === 'touch' || !event.isPrimary || event.button !== 0) return;
		if (node.scrollWidth <= node.clientWidth + 1) return;
		if ((event.target as Element).closest('input, textarea, select, [contenteditable="true"]')) return;
		active = { id: event.pointerId, x: event.clientX, y: event.clientY, scroll: node.scrollLeft, dragging: false };
	}

	function pointerMove(event: PointerEvent) {
		if (!active || event.pointerId !== active.id) return;
		const deltaX = event.clientX - active.x;
		const deltaY = event.clientY - active.y;
		if (!active.dragging) {
			if (Math.abs(deltaX) < 6) return;
			if (Math.abs(deltaY) > Math.abs(deltaX)) { finish(event); return; }
			active.dragging = true;
			suppressClick = true;
			node.classList.add('is-dragging');
			node.setPointerCapture(event.pointerId);
		}
		event.preventDefault();
		node.scrollLeft = active.scroll - deltaX;
	}

	function click(event: MouseEvent) {
		if (!suppressClick || event.detail === 0) return;
		suppressClick = false;
		event.preventDefault();
		event.stopImmediatePropagation();
	}

	function keyDown(event: KeyboardEvent) {
		if (event.target !== node || event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
		const amount = node.clientWidth * .8;
		let left: number;
		switch (event.key) {
			case 'ArrowLeft': left = node.scrollLeft - amount; break;
			case 'ArrowRight': left = node.scrollLeft + amount; break;
			case 'Home': left = 0; break;
			case 'End': left = node.scrollWidth; break;
			default: return;
		}
		event.preventDefault();
		node.scrollTo({ left, behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
	}

	const observer = new ResizeObserver(updateOverflow);
	observer.observe(node);
	for (const child of node.children) observer.observe(child);
	node.addEventListener('pointerdown', pointerDown);
	document.addEventListener('pointermove', pointerMove, { passive: false });
	document.addEventListener('pointerup', finish);
	document.addEventListener('pointercancel', finish);
	node.addEventListener('lostpointercapture', finish);
	node.addEventListener('click', click, true);
	node.addEventListener('keydown', keyDown);
	updateOverflow();

	return {
		destroy() {
			finish();
			observer.disconnect();
			node.removeEventListener('pointerdown', pointerDown);
			document.removeEventListener('pointermove', pointerMove);
			document.removeEventListener('pointerup', finish);
			document.removeEventListener('pointercancel', finish);
			node.removeEventListener('lostpointercapture', finish);
			node.removeEventListener('click', click, true);
			node.removeEventListener('keydown', keyDown);
			node.classList.remove('is-draggable');
		}
	};
}
