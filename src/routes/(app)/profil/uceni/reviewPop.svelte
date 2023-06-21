<script>
	import { invalidateAll } from '$app/navigation'
	import { enhance } from '$app/forms'
	import { notification, loading, popup } from '$store/clientStore.js'

	export let id = 0

	let error = '',
		score = 4

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
		action="?/sendReview"
		method="POST"
		use:enhance={() => {
			$loading = true
			return async ({ result }) => {
				handleResult(result.data)
			}
		}}
	>
		<input type="hidden" name="lesson" value={id} required />
		<div title={score}>
			<label for="score">Číselné hodnocení*</label>
			<div>
				{#each { length: score } as { }}
					<span style="font-size:450%">&starf;</span>
				{/each}
				{#each { length: 5 - score } as { }}
					<span style="font-size:450%">&star;</span>
				{/each}
				<input type="range" name="score" id="score" min="0" max="5" required bind:value={score} />
			</div>
		</div>
		<div>
			<label for="description">Popis hodnocení*</label>
			<textarea name="description" id="score" required placeholder="Líbilo se mi..." />
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
