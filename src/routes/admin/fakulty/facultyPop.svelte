<script>
	import { invalidateAll } from '$app/navigation'
	import { enhance } from '$app/forms'
	import { notification, loading, popup } from '$store/clientStore.js'

	export let id = 0,
		name = '',
		shortname = '',
		uni = '',
		unis = []

	console.log(unis)

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
		action="?/saveFaculty"
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
		<input type="hidden" name="id" value={id} />
		<div>
			<label for="name">Jméno</label>
			<input type="text" name="name" value={name} />
		</div>
		<div>
			<label for="shortname">Zkratka</label>
			<input type="text" name="shortname" value={shortname} />
		</div>
		<div>
			<label for="uni">Univerzita</label>
			<select name="uni" id="uni">
				{#each unis as { name, id }}
					<option value={id} label={name} selected={name === uni} />
				{/each}
			</select>
		</div>
		{#if error != ''}
			<p class="error">{error}</p>
		{/if}
		<button>Uložit</button>
	</form>
	{#if id != 0}
		<form
			action="?/deleteFaculty"
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
