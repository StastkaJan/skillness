<script>
	import { notification } from '$store/clientStore.js'

	export let text = '',
		type = '',
		visible = false

	$: ({ text, type } = $notification) &&
		type.length > 0 &&
		(visible = true) &&
		setTimeout(reset, 3000)

	function reset() {
		visible = false
		$notification = {
			text: '',
			type: ''
		}
	}
</script>

{#if visible}
	<div class={type}>
		<p>{text}</p>
	</div>
{/if}

<style>
	div {
		position: fixed;
		top: 62px;
		right: 0;
		left: 0;
		color: #fff;
		z-index: 100;
	}
	p {
		text-align: center;
		font-size: 1.2em;
	}
	.success {
		background: green;
	}
	.error {
		background: red;
	}
</style>
