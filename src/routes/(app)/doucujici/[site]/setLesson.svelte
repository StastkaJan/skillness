<script>
	import { invalidateAll } from '$app/navigation'
	import { loading, notification, popup } from '$store/clientStore.js'

	export let teaching = [],
		timetable,
		site

	let selectedDate,
		selectedTime,
		selectedSubject = {},
		selectedSubjectId,
		error = '',
		times = []

	$: selectedSubjectId && getTeaching()

	function dateClick(date) {
		selectedDate = date
		getTimes()
	}

	function timeClick(time) {
		selectedTime = time
	}

	function getTeaching() {
		selectedSubject = teaching.filter(obj => obj.id === selectedSubjectId)[0]
	}

	async function getTimes() {
		$loading = true
		fetch(`/doucujici/${site}?date=${selectedDate}`, {
			method: 'GET'
		})
			.then(res => {
				return res.json()
			})
			.then(res => {
				if (res.result == 'error') {
					$notification = {
						text: res.text,
						type: res.result
					}
				} else {
					times = res.times
				}
			})
			.finally(() => {
				$loading = false
			})
	}

	async function registerLecture() {
		$loading = true
		console.log(selectedTime)
		fetch(`/doucujici/${site}`, {
			method: 'POST',
			body: JSON.stringify({
				teaching: selectedSubjectId,
				timetable: selectedTime
			})
		})
			.then(res => {
				return res.json()
			})
			.then(res => {
				if (res.result == 'error') {
					error = res.text
				} else {
					$notification = {
						text: res.text,
						type: res.result
					}
					$popup = {
						title: '',
						component: null,
						props: {}
					}
					invalidateAll()
				}
			})
			.finally(() => {
				$loading = false
			})
	}
</script>

<form on:submit|preventDefault={registerLecture}>
	<div>
		<label for="teaching">Předmět*</label>
		<select name="teaching" id="teaching" required bind:value={selectedSubjectId}>
			{#each teaching as { name, id, ident }}
				<option value={id} label="{name} - {ident}" />
			{/each}
		</select>
	</div>
	<div class="dates">
		<span>Den doučování*</span>
		<br />
		{#each timetable as { start }}
			<span
				class="button"
				on:click={() => {
					dateClick(start)
				}}
				on:keypress={() => {
					dateClick(start)
				}}
				class:selected={selectedDate === start}
			>
				{start.toLocaleString('cs-CZ', {
					weekday: 'short',
					month: '2-digit',
					day: '2-digit'
				})}
			</span>
		{/each}
	</div>
	{#if times && times[0]}
		<div class="dates">
			<span>Čas doučování*</span>
			<br />
			{#each times as { start, id }}
				<span
					class="button"
					on:click={() => {
						timeClick(id)
					}}
					on:keypress={() => {
						timeClick(id)
					}}
					class:selected={selectedTime === id}
				>
					{new Date(start).getHours()}:00
				</span>
			{/each}
		</div>
	{/if}
	<p>
		Cena {Number(selectedSubject?.price || 0).toLocaleString('cs-CZ', {
			style: 'currency',
			currency: 'CZK'
		})}
	</p>
	{#if error != ''}
		<p class="error">{error}</p>
	{/if}
	<button class="button">Potvrdit</button>
</form>

<style>
	div.dates span.button {
		display: inline-block;
		margin: 10px;
		padding: 0.5em 1em;
		border-radius: 5px;
		background: #eee;
	}
	div.dates span.button.selected {
		color: #fff;
		background-color: #000;
	}
	button.button {
		background: #000;
		color: #fff;
	}
</style>
