<script>
	import { popup } from '$store/clientStore.js'
	import UniPop from './uniPop.svelte'

	export let data

	let unis = data?.unis || []

	$: unis = data?.unis

	function editUni({ id = 0, name = '', shortname = '', logo = '' }) {
		$popup = {
			title: 'Úprava univerzity',
			component: UniPop,
			props: { id, name, shortname, logo }
		}
	}
</script>

<svelte:head>
	<title>Správa univerzit | Admin | Skillnes</title>
</svelte:head>

<div class="container">
	<h1>Správa univerzit</h1>
	<p>
		Níže jsou v tabulce jednotlivé univerzity. Kliknutím na některý z řádků se zobrazí popup s
		bližšími detaily a dalšími akcemi.
	</p>
	<button on:click={editUni}>Nová univerzita</button>
	{#if unis[0]?.id}
		<div class="table">
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Jméno</th>
						<th>Zkratka</th>
						<th>URL loga</th>
					</tr>
				</thead>
				<tbody>
					{#each unis as { id, name, shortname, logo }}
						<tr on:click={() => editUni({ id, name, shortname, logo })}>
							<td>{id}</td>
							<td>{name}</td>
							<td>{shortname}</td>
							<td>{logo}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<p>Žádné univerzity k zobrazení</p>
	{/if}
</div>

<style>
	div.container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
		padding-top: 100px;
	}
	div.table {
		max-width: 100%;
		margin-top: 50px;
		overflow: auto;
	}
	table,
	th,
	td {
		border: 1px solid #ccc;
		padding: 5px;
	}
	table {
		border-collapse: collapse;
	}
	tr {
		cursor: pointer;
	}
	tr:hover {
		background-color: #eee;
	}
	th,
	td {
		min-width: 50px;
		max-width: 150px;
		height: 30px;
		overflow: hidden;
	}
	th {
		background: #fff;
		position: sticky;
		top: 0;
	}
	button {
		background: #000;
		color: #fff;
	}
</style>
