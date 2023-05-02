<script>
	import { notification } from '$store/clientStore.js'

	export let data

	let timetable = data.timetable

	const days = (start = 1, duration = 6) => {
		let curr = new Date()
		let daysArr = []
		for (let i = 0; i < duration + 1; i++) {
			let first = curr.getDate() - curr.getDay() + 1 + i
			let date = new Date(curr.setDate(first))
			daysArr.push({ day: date, times: times() })
		}
		return daysArr
	}

	const times = (start = 8, duration = 12) => {
		let curr = new Date()
		let timesArr = []
		for (let i = 0; i < duration + 1; i++) {
			curr.setHours(start + i, 0, 0)
			let first = curr.getDate() - curr.getDay() + 1
			let date = new Date(curr.setDate(first))
			timesArr.push({ time: date, selected: false })
		}
		return timesArr
	}

	let dateArr = days(),
		select = []

	select = timetable

	async function save() {
		try {
			let res = await fetch('/profil/rozvrh', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json'
				},
				body: JSON.stringify(select)
			})
			let resJson = (await res.json()).body
			if (resJson.result === 'error') {
				console.log(resJson.text)
			} else if (resJson.result === 'success') {
				notification.set({
					text: resJson.text,
					type: resJson.result
				})
			}
		} catch (err) {
			console.log(err)
		}
	}

	function click(time) {
		time.selected = !time.selected
		dateArr = dateArr
	}
</script>

<svelte:head>
	<title>Čas doučování | Profil | Skillnes</title>
</svelte:head>

<div class="container editable">
	<div>
		<h1>Čas doučování</h1>
		<p>
			Nastav si volný čas, během kterého můžešš doučovat. Stačí kliknout na okénko, kdy máš volný
			čas. Políčko vždy značí začátek hodiny v označeném čase (sloupec 10:00 značí hodinu od 10:00
			do 11:00).
		</p>
	</div>

	<div>
		<table>
			<thead>
				<tr>
					<th />
					{#each dateArr[0].times as { time }}
						<th>
							{time.getHours()}:00
						</th>
					{/each}
				</tr>
			</thead>
			<tbody>
				{#each dateArr as { day, times }}
					<tr>
						<th>{day.toLocaleString('cs-CZ', { month: '2-digit', day: '2-digit' })}</th>
						{#each times as time}
							<td
								class:highlight={time.selected}
								on:click={() => {
									click(time)
								}}
								on:keypress={() => {
									click(time)
								}}
							/>
						{/each}
					</tr>
				{/each}
			</tbody>
		</table>

		<button on:click={save}>Uložit</button>
	</div>
</div>

<style>
	div.container {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 50px;
		flex-direction: column;
		width: 100%;
		max-width: 750px;
		margin-bottom: 50px;
	}
	div.container > div:first-of-type {
		text-align: center;
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
	table,
	th,
	td {
		border: 1px solid #ccc;
		padding: 5px;
	}
	table {
		border-collapse: collapse;
	}
	th,
	td {
		width: 50px;
		height: 30px;
	}
	th {
		background: #fff;
		position: sticky;
		left: 0;
	}
	tr > th:first-of-type {
		width: 80px;
	}
	td {
		cursor: pointer;
	}
	.highlight {
		background: #5f1f69;
	}
	button {
		margin-top: 20px;
	}
	@media (max-width: 800px) {
		div.container > div {
			max-width: 97vw;
			overflow: auto;
		}
	}
</style>
