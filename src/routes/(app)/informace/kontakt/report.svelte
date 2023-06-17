<script>
	import { enhance } from '$app/forms'
	import { notification, loading } from '$store/clientStore.js'

	let email = '',
		text = '',
		topic = '',
		error = ''

	function hadnleResult(result) {
		$loading = false
		if (result.result === 'error') {
			error = result.text
		} else if (result.result === 'success') {
			error = ''
			$notification = {
				text: result.text,
				type: result.result
			}
		}

		email = ''
		text = ''
		topic = ''
	}
</script>

<div class="container">
	<h2>Napiš nám!</h2>
	<p>
		Budeme rádi za jakýkoliv názor a uděláme maximum pro příjemný prožitek z používání aplikace.
	</p>
	<form
		action="?/saveReport"
		method="POST"
		use:enhance={() => {
			$loading = true
			return async ({ result }) => {
				hadnleResult(result.data)
			}
		}}
	>
		<div>
			<label for="email">E-mail*</label>
			<input name="email" id="email" placeholder="email@gmail.com" bind:value={email} required />
		</div>
		<div>
			<label for="topic">Téma</label>
			<input name="topic" id="topic" placeholder="Dotaz" bind:value={topic} />
		</div>

		<div>
			<label for="text">Text zprávy*</label>
			<textarea
				name="text"
				id="text"
				placeholder="Chtěl bych se zeptat..."
				bind:value={text}
				required
			/>
		</div>
		{#if error != ''}
			<p class="error">{error}</p>
		{/if}
		<button>Odeslat</button>
	</form>
</div>

<style>
	div.container {
		width: 100%;
		min-width: 300px;
		max-width: 400px;
		margin: 0 5%;
	}
	form {
		margin: 30px 0;
	}
	button {
		width: 100%;
		height: 40px;
		margin: 0;
		color: #fff;
		font-weight: bold;
		background: #6537a7;
		border: none;
		border-radius: 10px;
		outline: none;
	}
	input,
	textarea {
		width: 100%;
		border-bottom: 2px solid #6537a7;
		border-radius: 0;
		box-shadow: none;
	}
	@media (max-width: 800px) {
		div.container {
			text-align: center;
		}
	}
</style>
