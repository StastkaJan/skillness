<script>
	import { popup } from '$store/clientStore.js'
	import SubjectPop from './subjectPop.svelte'

	export let data

	let subjects = data?.subjects || []

	$: subjects = data?.subjects

	function editFaculty({ id, name, ident, faculty, description }) {
		$popup = {
			title: 'Úprava univerzity',
			component: SubjectPop,
			props: { id, name, ident, faculty, description, faculties: data?.faculties }
		}
	}
</script>

<svelte:head>
	<title>Správa předmětů | Admin | Skillnes</title>
</svelte:head>

<div class="container">
	<h1>Správa předmětů</h1>
	<p>
		Níže jsou v tabulce jednotlivé předměty. Kliknutím na některý z řádků se zobrazí popup s
		bližšími detaily a dalšími akcemi.
	</p>
	<button on:click={editFaculty}>Nový předmět</button>
	{#if subjects[0]?.id}
		<div class="table">
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Jméno</th>
						<th>Ident</th>
						<th>Fakulta</th>
						<th>Popis</th>
					</tr>
				</thead>
				<tbody>
					{#each subjects as { id, name, ident, faculty, description }}
						<tr on:click={() => editFaculty({ id, name, ident, faculty, description })}>
							<td>{id}</td>
							<td>{name}</td>
							<td>{ident}</td>
							<td>{faculty}</td>
							<td>{description}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<p>Žádné předměty k zobrazení</p>
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
