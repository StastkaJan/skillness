<script>
	import { popup } from '$store/clientStore.js'
	import ReportPop from './report.svelte'

	export let data

	let reports = data?.reports || []

	function showReport({ id, topic, email, text }) {
		$popup = {
			title: 'Podrobnosti otázky / připomínky',
			component: ReportPop,
			props: { id, topic, email, text }
		}
	}
</script>

<svelte:head>
	<title>Dotazy a připomínky | Admin | Skillnes</title>
</svelte:head>

<div class="container">
	<h1>Dotazy a připomínky</h1>
	<p>
		Níže jsou v tabulce jednotlivé otázky a připomínky. Kliknutím na některý z řádků se zobrazí
		popup s bližšími detaily.
	</p>
	{#if reports[0]?.id}
		<div class="table">
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Topic</th>
						<th>Email</th>
						<th>Popis</th>
					</tr>
				</thead>
				<tbody>
					{#each reports as { id, topic, email, text }}
						<tr on:click={() => showReport({ id, topic, email, text })}>
							<td>{id}</td>
							<td>{topic}</td>
							<td>{email}</td>
							<td>{text}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<p>Žádné dotazy či připomínky k zobrazení</p>
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
</style>
