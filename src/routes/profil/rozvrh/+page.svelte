<script>
	import { page } from '$app/stores'
	import { notification, loading } from '$store/clientStore.js'

	let timetable = $page.data.timetable || [],
		daysOffset = 0

	const days = () => {
		let curr = new Date()
		if (daysOffset > 0) {
			curr.setDate(daysOffset)
		}
		let daysArr = []
		for (let i = 0; i < 6 + 1; i++) {
			let first = curr.getDate() - curr.getDay() + 1 + i
			let date = new Date(curr.setDate(first))
			daysArr.push({ day: date, times: times(i) })
		}
		return daysArr
	}

	const times = (day = 0) => {
		let curr = new Date()
		if (daysOffset > 0) {
			curr.setDate(daysOffset)
		}
		let timesArr = []
		for (let i = 0; i < 12 + 1; i++) {
			curr.setHours(8 + i, 0, 0, 0)
			let first = curr.getDate() - curr.getDay() + 1 + day
			let date = new Date(curr.setDate(first))
			let selected = false
			timetable.forEach(e => {
				if (new Date(e.start) - date < 100 && date - new Date(e.start) < 100) {
					selected = true
				}
			})
			timesArr.push({ time: date, selected })
		}
		return timesArr
	}

	let dateArr = days()

	async function save() {
		$loading = true
		try {
			let res = await fetch('/profil/rozvrh', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					accept: 'application/json'
				},
				body: JSON.stringify(timetable)
			})
			let resJson = await res.json()

			$notification = {
				text: resJson.text,
				type: resJson.result
			}
		} catch (err) {
			console.log(err)
		} finally {
			$loading = false
		}
	}

	function click(time) {
		console.log(time)
		time.selected = !time.selected
		dateArr = dateArr
		if (time.selected) {
			let find = timetable.find(
				e => new Date(e.start) - time.time < 100 && time.time - new Date(e.start) < 100
			)
			if (!find) {
				timetable.push({ start: time.time })
			}
		} else {
			timetable.forEach((e, i) => {
				if (new Date(e.start) - time.time < 100 && time.time - new Date(e.start) < 100) {
					timetable.splice(i, 1)
				}
			})
		}
		timetable = timetable
	}

	function nextWeek() {
		daysOffset = daysOffset + 7
		dateArr = days()
		dateArr = dateArr
	}

	function previousWeek() {
		if (daysOffset < 7) return
		daysOffset = daysOffset - 7
		dateArr = days()
		dateArr = dateArr
	}
</script>

<svelte:head>
	<title>Čas doučování | Profil | Skillnes</title>
</svelte:head>

<div class="container">
	<div>
		<h1>Čas doučování</h1>
		<p>
			Nastav si volný čas, během kterého můžešš doučovat. Stačí kliknout na okénko, kdy máš volný
			čas. Políčko vždy značí začátek hodiny v označeném čase (sloupec 10:00 značí hodinu od 10:00
			do 11:00).
		</p>
	</div>

	<div>
		<div class="table">
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
							<th
								>{day.toLocaleString('cs-CZ', {
									weekday: 'short',
									month: '2-digit',
									day: '2-digit'
								})}</th
							>
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
		</div>

		<div class="buttons">
			<button class:hide={daysOffset < 7} on:click={previousWeek}>Předchozí týden</button>
			<button on:click={nextWeek}>Následující týden</button>
		</div>
		<button class="button" on:click={save}>Uložit</button>
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
	button.button {
		width: 100%;
		height: 40px;
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
	div.buttons {
		display: flex;
		justify-content: space-between;
	}
	div.buttons .hide {
		visibility: hidden;
	}
	button {
		margin-top: 20px;
	}
	@media (max-width: 800px) {
		div.container div.table {
			max-width: 97vw;
			overflow: auto;
		}
	}
</style>
