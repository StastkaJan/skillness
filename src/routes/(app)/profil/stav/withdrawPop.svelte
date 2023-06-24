<script>
	import { invalidateAll } from '$app/navigation'
	import { enhance } from '$app/forms'
	import { notification, loading, popup } from '$store/clientStore.js'

	let error = ''

	function handleResult(result) {
		$loading = false
		if (result.result === 'error') {
			error = result.text
		} else if (result.result === 'success') {
			error = ''
			$notification = {
				text: result.text,
				type: result.result
			}
			$popup = {
				title: '',
				component: null,
				props: {}
			}
			invalidateAll()
		}
	}
</script>

<div>
	<form
		action="?/saveWithdraw"
		method="POST"
		use:enhance={() => {
			$loading = true
			return async ({ result }) => {
				handleResult(result.data)
			}
		}}
	>
		<div>
			<label for="sum">Částka vůběru</label>
			<input type="number" name="sum" min="50" required />
		</div>
		<div>
			<label for="sum">Účet pro výběr</label>
			<input type="text" name="account" required />
		</div>
		{#if error != ''}
			<p class="error">{error}</p>
		{/if}
		<button>Odeslat</button>
	</form>
</div>

<style>
	button {
		background: #000;
		color: #fff;
	}
</style>
