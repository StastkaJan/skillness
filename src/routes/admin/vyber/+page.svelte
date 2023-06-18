<script>
	import { popup } from '$store/clientStore.js'
	import WithdrawPop from './withdraw.svelte'

	export let data

	let withdraw = data?.withdraw || []

	function showWithdraw({ id, user, sum, account }) {
		$popup = {
			title: 'Požadavek na výběr',
			component: WithdrawPop,
			props: { id, user, sum, account }
		}
	}
</script>

<svelte:head>
	<title>Požadavky na výběr | Admin | Skillnes</title>
</svelte:head>

<div class="container">
	<h1>Požadavky na výběr</h1>
	<p>
		Níže jsou v tabulce jednotlivé požadavky na výběr. Kliknutím na některý z řádků se zobrazí popup
		s bližšími detaily.
	</p>
	{#if withdraw[0]?.id}
		<div class="table">
			<table>
				<thead>
					<tr>
						<th>ID</th>
						<th>Uživatel</th>
						<th>Částka</th>
						<th>Účet</th>
					</tr>
				</thead>
				<tbody>
					{#each withdraw as { id, user, sum, account }}
						<tr on:click={() => showWithdraw({ id, user, sum, account })}>
							<td>{id}</td>
							<td>{user}</td>
							<td>{sum}</td>
							<td>{account}</td>
						</tr>
					{/each}
				</tbody>
			</table>
		</div>
	{:else}
		<p>Žádné požadavky k zobrazení</p>
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
