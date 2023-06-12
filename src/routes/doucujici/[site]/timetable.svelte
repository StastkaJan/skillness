<script>
	export let timetable = timetable,
		selectedTime = {}

	let daysOffset = 0

	let curr = new Date()
	curr.setHours(22, 0, 0, 0)
	let tomorrow = new Date(curr.setDate(curr.getDay() + 1))

	const days = () => {
		let daysArr = []
		for (let i = 0; i < 6 + 1; i++) {
			let curr = new Date()
			if (daysOffset > 0) {
				curr.setDate(curr.getDate() + daysOffset)
			}
			let first = curr.getDate() - curr.getDay() + 1 + i
			let date = new Date(curr.setDate(first))
			daysArr.push({ day: date, times: times(i) })
		}
		return daysArr
	}

	const times = (day = 0) => {
		let timesArr = []
		for (let i = 0; i < 12 + 1; i++) {
			let curr = new Date()
			if (daysOffset > 0) {
				curr.setDate(curr.getDate() + daysOffset)
			}
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

	function click(time) {
		if (time.time < tomorrow) {
			return
		}
		console.log(time)
		time.selectedTime = true
		selectedTime = time
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

<div class="container">
	<div>
		<h2>Čas doučování</h2>
		<p>Vyber si kdy máš čas k doučování z časových možností učitele.</p>
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
						<tr class:invalid={times[0].time < tomorrow}>
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
									class:selected={time.selectedTime || false}
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
	tr.invalid {
		background: #eee;
	}
	tr.invalid td {
		cursor: default;
	}
	tr.invalid .highlight {
		background: rgba(95, 31, 105, 0.5);
	}
	td {
		cursor: pointer;
	}
	.highlight {
		background: #5f1f693f;
	}
	.selected {
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
