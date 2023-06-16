<script>
	import { page } from '$app/stores'
	import placeholder from '$img/placeholder.png'
	import { headerBg, popup, notification, loading } from '$store/clientStore.js'
	import { onDestroy } from 'svelte'
	import Timetable from './timetable.svelte'
	import TeachingTile from './teachingTile.svelte'

	export let data

	let { teacher, timetable, teaching } = data,
		teachingCount = teaching.length

	let subjectsOpen = false

	$headerBg = false

	onDestroy(() => {
		$headerBg = true
	})

	const registerLecture = async () => {
		if (!($page.data.user?.email && $page.data.email !== teacher.email)) {
			$notification = {
				text: 'Pro přihlášení k vyučování se musíte přihlásit',
				type: 'error'
			}
			return
		} else if (!selectedSubject?.sbjid) {
			$notification = {
				text: 'Pro přihlášení k vyučování musíte vybrat předmět',
				type: 'error'
			}
			return
		} else if (!selectedTime.time) {
			$notification = {
				text: 'Pro přihlášení k vyučování musíte vybrat čas',
				type: 'error'
			}
			return
		}

		$loading = true
		fetch('/doucujici', {
			method: 'POST',
			body: JSON.stringify({
				teacher: teacher.id,
				selectedSubject: selectedSubject.sbjid,
				selectedTime
			})
		})
			.then(res => {
				return res.json()
			})
			.then(res => {
				$notification = {
					text: res.body.text,
					type: res.body.result
				}
			})
			.finally(() => {
				$loading = false
			})
	}

	function moreSubjects() {
		subjectsOpen = !subjectsOpen
	}
</script>

<svelte:head>
	<title>Přehled doučujícího | Skillnes</title>
</svelte:head>

<main>
	<h1>Profil doučujícího</h1>
	<div class="container">
		<div class="profile">
			<div>
				{#if teacher.img}
					<img src={teacher.img} alt="profile" width="150" height="150" />
				{:else}
					<img src={placeholder} alt="profile" width="150" height="150" />
				{/if}
				<h3>{teacher.name}</h3>
				<p>
					<span>{teacher.location}</span><br />
					<!-- <span>Email: {teacher.email}</span> -->
				</p>
			</div>
		</div>
		<div class="data">
			<div>
				<p>{teacher.bio}</p>
			</div>
			<div class="subjects">
				<h2>Vyučované předměty</h2>
				<div style={subjectsOpen ? 'max-height:644px;overflow:auto' : 'max-height:322px;'}>
					{#each teaching as teach, i}
						<TeachingTile {teach} />
					{/each}
				</div>
				{#if teachingCount > 4}
					<button on:click={moreSubjects}>Zobrazit více</button>
				{/if}
			</div>
			<!-- <Timetable {timetable} title="Volný čas učitele" /> -->
			<div>
				<button on:click={registerLecture}>Přihlásit se k hodině</button>
			</div>
		</div>
	</div>
</main>

<style>
	main {
		gap: 50px;
		max-width: 1200px;
		margin: 150px auto auto;
	}
	h1 {
		text-align: center;
	}
	h2 {
		text-align: center;
	}
	div.container {
		display: flex;
		gap: 50px;
	}
	div > div {
		padding: 20px;
	}
	div.profile {
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	div.profile div {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: sticky;
		top: 50px;
		width: 250px;
		word-break: break-all;
		box-shadow: 0 0 10px #ccc;
		border-radius: 20px;
	}
	img {
		max-width: 150px;
		border-radius: 50%;
		aspect-ratio: 1;
	}
	div.data p {
		width: 100%;
		max-width: 500px;
		margin: 30px auto;
	}
	.data {
		display: flex;
		flex-direction: column;
		gap: 50px;
	}
	.data > div:first-of-type {
		box-shadow: 0 0 10px #ccc;
		border-radius: 20px;
	}
	.subjects {
		max-width: 760px;
		margin: auto;
	}
	.subjects div {
		display: flex;
		gap: 20px;
		flex-wrap: wrap;
		margin: auto;
		overflow: hidden;
		transition: 0.3s;
	}
	@media (max-width: 1050px) {
		div.container {
			display: unset;
		}
	}
	@media (max-width: 760px) {
		.subjects {
			max-width: 320px;
		}
	}
</style>
