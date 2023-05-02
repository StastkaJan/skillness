<script>
	import { popup } from '$store/clientStore.js'

	export let title = '',
		visible = false,
		props = {}

	let component

	$: ({ title, component, props } = $popup) && (visible = title.length > 0)
</script>

{#if visible}
	<div class="outer" on:mousedown|self={() => (visible = false)}>
		<div>
			<h2>{title}</h2>
			<svelte:component this={component} {...props} />
		</div>
	</div>
{/if}

<style>
	div.outer {
		position: fixed;
		top: 0;
		right: 0;
		bottom: 0;
		left: 0;
		display: flex;
		justify-content: center;
		align-items: center;
		background: #0007;
		z-index: 80;
	}
	div > div {
		padding: 50px 30px;
		min-width: 300px;
		max-width: 800px;
		max-height: 70vh;
		background: #fff;
		border-radius: 50px;
		overflow: auto;
	}
	h2 {
		font-size: 2rem;
		text-align: center;
	}
</style>
