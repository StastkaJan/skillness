<script>
	import { popup } from '$store/clientStore.js'
	import UserPop from './userPop.svelte'

	export let data

	let users = data?.users || []

	$: users = data?.users

	function editFaculty({ id, name, email, active, sum }) {
		$popup = {
			title: 'Úprava uživatele',
			component: UserPop,
			props: { id, name, email, active, sum }
		}
	}
</script>

<svelte:head>
	<title>Správa Uživatelů | Admin | Skillnes</title>
</svelte:head>

<div class="container">
	<h1>Správa předmětů</h1>
	<p>
		Níže jsou v tabulce uživatelé. Kliknutím na některý z řádků se zobrazí popup s bližšími detaily
		a dalšími akcemi.
	</p>
	{#if users[0]?.id}
		<div class="table">
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Jméno</th>
						<th>Email</th>
						<th>Status</th>
						<th>Stav</th>
					</tr>
				</thead>
				<tbody>
					{#each users as { id, name, email, active, sum }}
						<tr on:click={() => editFaculty({ id, name, email, active, sum })}>
							<td>{id}</td>
							<td>{name}</td>
							<td>{email}</td>
							<td>{active === 'W' ? 'Čeká (aktivní)' : active === 'T' ? 'Aktivní' : 'Neaktivní'}</td
							>
							<td
								>{Number(sum || 0).toLocaleString('cs-CZ', {
									style: 'currency',
									currency: 'CZK'
								})}</td
							>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<p>Žádní uživatelé k zobrazení</p>
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
