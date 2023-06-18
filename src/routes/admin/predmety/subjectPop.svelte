<script>
	import { invalidateAll } from '$app/navigation'
	import { enhance } from '$app/forms'
	import { notification, loading, popup } from '$store/clientStore.js'

	export let id = 0,
		name = '',
		ident = '',
		faculty = '',
		description = '',
		faculties = []

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
		action="?/saveSubject"
		method="POST"
		use:enhance={() => {
			$loading = true
			return async ({ result }) => {
				handleResult(result.data)
			}
		}}
	>
		{#if id != 0}
			<p>ID: {id}</p>
		{/if}
		<input type="hidden" name="id" value={id} required />
		<div>
			<label for="name">Jméno*</label>
			<input type="text" name="name" value={name} required />
		</div>
		<div>
			<label for="ident">Ident</label>
			<input type="text" name="ident" value={ident} />
		</div>
		<div>
			<label for="faculty">Fakulta*</label>
			<select name="faculty" id="faculty">
				{#each faculties as { name, id }}
					<option value={id} label={name} selected={name === faculty} required />
				{/each}
			</select>
		</div>
		<div>
			<label for="description">Popis*</label>
			<textarea
				name="description"
				id="description"
				cols="30"
				rows="10"
				value={description}
				required
			/>
		</div>
		{#if error != ''}
			<p class="error">{error}</p>
		{/if}
		<button>Uložit</button>
	</form>
	{#if id != 0}
		<form
			action="?/deleteSubject"
			method="POST"
			use:enhance={() => {
				$loading = true
				return async ({ result }) => {
					handleResult(result.data)
				}
			}}
		>
			<input type="hidden" name="id" value={id} />
			<button>Odstranit</button>
		</form>
	{/if}
</div>

<style>
	button {
		background: #000;
		color: #fff;
	}
</style>
