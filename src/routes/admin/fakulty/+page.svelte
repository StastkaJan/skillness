<script>
	import { popup } from '$store/clientStore.js'
	import FacultyPop from './facultyPop.svelte'

	export let data

	let faculty = data?.faculties || []

	$: faculty = data?.faculties

	function editFaculty({ id = 0, name = '', shortname = '', uni = '' }) {
		$popup = {
			title: 'Úprava univerzity',
			component: FacultyPop,
			props: { id, name, shortname, uni, unis: data.unis }
		}
	}
</script>

<svelte:head>
	<title>Správa fakult | Admin | Skillnes</title>
</svelte:head>

<div class="container">
	<h1>Správa fakult</h1>
	<p>
		Níže jsou v tabulce jednotlivé fakulty. Kliknutím na některý z řádků se zobrazí popup s bližšími
		detaily a dalšími akcemi.
	</p>
	<button on:click={editFaculty}>Nová fakulta</button>
	{#if faculty[0]?.id}
		<div class="table">
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Jméno</th>
						<th>Zkratka</th>
						<th>Univerzita</th>
					</tr>
				</thead>
				<tbody>
					{#each faculty as { id, name, shortname, uni }}
						<tr on:click={() => editFaculty({ id, name, shortname, uni })}>
							<td>{id}</td>
							<td>{name}</td>
							<td>{shortname}</td>
							<td>{uni}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<p>Žádné fakulty k zobrazení</p>
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
