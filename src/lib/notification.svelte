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
		bottom: 50px;
		left: 0;
		width: 300px;
		padding: 20px;
		color: #fff;
		font-weight: bold;
		border-radius: 0 20px 20px 0;
		box-shadow: 0 0 20px #ccc;
		z-index: 100;
	}
	p {
		text-align: center;
		font-size: 1.2em;
	}
	.success {
		background: #341de1;
		/* background: #6537a7; */
	}
	.error {
		background: #5f1f69;
	}
</style>
