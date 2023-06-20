<script>
	import { enhance } from '$app/forms'
	import { page } from '$app/stores'
	import { notification, loading } from '$store/clientStore.js'
	import { goto } from '$app/navigation'

	export let data

	let amount

	if ($page.data.returnObj.text) {
		$notification = {
			text: data.returnObj.text,
			type: data.returnObj.result
		}
	}

	function toPayment(id = '') {
		$loading = true
		fetch(`/profil/stav/opakovatplatbu?id=${id}`, {
			method: 'POST',
			body: JSON.stringify({
				amount
			})
		})
			.then(res => {
				return res.json()
			})
			.then(res => {
				if (res.type === 'redirect') {
					goto(resJson.location)
				}
				$notification = {
					text: res.text,
					type: res.result
				}
				if (res.result == 'success') {
					goto(res.paymentUrl)
				}
			})
			.finally(() => {
				$loading = false
			})
	}

	function handleResult(result) {
		$loading = false
		$notification = {
			text: result.data.text,
			type: result.data.result
		}
		if (result.data.result == 'success') {
			goto(result.data.paymentUrl)
		}
	}
</script>

<svelte:head>
	<title>Stav účtu | Profil | Skillnes</title>
</svelte:head>

<div class="container">
	<div class="intro">
		<h1>Stav účtu</h1>
		<p>
			Zde vidíš stav účtu s historií přímých plateb i plateb získaných či utracených z doučování.
			Také zde můžeš přidat kredity na svůj účet. Nárok na kredity za doučování vzniká 7 dnů po jeho
			datu.
		</p>
	</div>

	<div class="overview">
		<div class="balance">
			<h2>Aktuální stav</h2>
			<p>
				<span>
					{Number(data.balance.sum).toLocaleString('cs-CZ', {
						style: 'currency',
						currency: 'CZK'
					})}
				</span>
			</p>
		</div>
		<div>
			<h2>Přidat částku</h2>
			<form
				action="?/pay"
				method="POST"
				use:enhance={() => {
					$loading = true
					return async ({ result }) => {
						handleResult(result)
					}
				}}
			>
				<div>
					<input
						type="number"
						name="amount"
						bind:value={amount}
						required
						placeholder="200"
						min="1"
					/>
				</div>
				<button>Zaplatit</button>
			</form>
		</div>
	</div>

	<div>
		<h2>Historie plateb</h2>
		{#if data?.payments?.length > 0}
			<table>
				<tr>
					<th>Datum</th>
					<th>Zdroj</th>
					<th>Částka</th>
					<th>Stav</th>
				</tr>
				{#each data?.payments as { timestamp, sum, paid, id, lesson }}
					<tr>
						<td>
							{new Date(timestamp).toLocaleString('cs-CZ', {
								year: 'numeric',
								month: 'short',
								day: 'numeric'
							})}
						</td>
						<td>
							{#if lesson}
								Doučování
							{:else}
								Platba
							{/if}
						</td>
						<td>
							{Number(sum).toLocaleString('cs-CZ', { style: 'currency', currency: 'CZK' })}
						</td>
						<td>
							{#if paid == 'T'}
								Zaplaceno
							{:else if new Date(Number(new Date(timestamp)) + 12096e5) <= new Date() || paid == 'F'}
								Platba neproběhla
							{:else}
								Čeká na zaplacení
								<button
									on:click={() => {
										toPayment(id)
									}}
								>
									Otevřít
								</button>
							{/if}
						</td>
					</tr>
				{/each}
			</table>
		{:else}
			<p>Žádné proběhlé platby</p>
		{/if}
	</div>
</div>

<style>
	div.container,
	div.overview {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
	}
	div.container {
		gap: 50px;
		flex-direction: column;
		width: 100%;
		max-width: 750px;
		margin-bottom: 50px;
	}
	div.intro {
		text-align: center;
	}
	div.overview {
		gap: 100px;
	}
	div.balance > p span {
		font-size: 2.5em;
		font-weight: bold;
	}
	table th,
	table td {
		padding: 5px 20px;
	}
	input {
		border-bottom: 2px solid #000;
		border-radius: 0;
		box-shadow: none;
	}
	button {
		width: 100%;
		height: 40px;
		margin: 0;
		color: #fff;
		font-weight: bold;
		background: #000;
		border: none;
		border-radius: 5px;
		outline: none;
	}
	table button {
		width: unset;
		margin-left: 10px;
	}
</style>
