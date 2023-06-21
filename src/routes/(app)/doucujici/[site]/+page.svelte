<script>
	import { page } from '$app/stores'
	import placeholder from '$img/placeholder.png'
	import { headerBg, popup, notification, loading } from '$store/clientStore.js'
	import { onDestroy } from 'svelte'
	import Timetable from './timetable.svelte'
	import TeachingTile from './teachingTile.svelte'
	import SetLesson from './setLesson.svelte'

	export let data

	let { teacher, timetable = [], teaching, site, reviews } = data,
		teachingCount = teaching.length

	let subjectsOpen = false

	$: (teacher = data.teacher),
		(timetable = data.timetable),
		(teaching = data.teaching),
		(site = data.site),
		(reviews = data.reviews)

	$headerBg = false

	onDestroy(() => {
		$headerBg = true
	})

	const registerLecture = async () => {
		if (!$page.data.user?.email) {
			$notification = {
				text: 'Pro zapsání hodiny se musíte přihlásit',
				type: 'error'
			}
			return
		} else if ($page.data.user?.email === teacher.email) {
			$notification = {
				text: 'Nelze se přihlásit k vlastní hodině',
				type: 'error'
			}
			return
		} else if (!timetable[0]) {
			$notification = {
				text: 'V nejbližší době neprobíhá žádné vyučování',
				type: 'error'
			}
			return
		}

		$popup = {
			title: 'Zapsat si hodinu',
			component: SetLesson,
			props: { teaching, timetable, site }
		}
	}

	function moreSubjects() {
		subjectsOpen = !subjectsOpen
	}

	function getFirstSentence(text) {
		const endOfSentence = text?.indexOf('.') !== -1 ? text?.indexOf('.') : text?.indexOf('!')
		const firstSentence = text?.substring(0, endOfSentence + 1)
		return firstSentence?.trim()
	}
</script>

<svelte:head>
	<title>Přehled doučujícího | Skillnes</title>
	<meta
		name="description"
		content="Profilová stránka doučujícího {teacher?.name}. {getFirstSentence(teacher?.bio)}"
	/>
	<meta name="keywords" content="Skillnes, SKillnes.cz, Doučující, {teacher?.name}" />
</svelte:head>

<main>
	<h1>Profil doučujícího</h1>
	<div class="container">
		<div class="profile">
			<div>
				{#if teacher?.img}
					<img src={teacher?.img} alt="profile" width="150" height="150" />
				{:else}
					<img src={placeholder} alt="profile" width="150" height="150" />
				{/if}
				<h3>{teacher?.name}</h3>
				<p>
					<span>{teacher?.location}</span><br />
					<!-- <span>Email: {teacher.email}</span> -->
				</p>
			</div>
		</div>
		<div class="data">
			<div>
				<p>{teacher?.bio}</p>
			</div>
			<div class="subjects">
				<h2>Vyučované předměty</h2>
				<div class:open={subjectsOpen}>
					{#each teaching as teach, i}
						<TeachingTile {teach} />
					{/each}
				</div>
				{#if teachingCount > 4}
					<button on:click={moreSubjects}>Zobrazit více</button>
				{/if}
			</div>
			<!-- <Timetable {timetable} title="Volný čas učitele" /> -->
			<div class="reviews">
				<h2>Recenze</h2>
				<div class:open={subjectsOpen}>
					{#each reviews as { score, description, name }}
						<div>
							<h3>
								{name}
								<div class="stars">
									{#each { length: score } as _, i}
										<span>&starf;</span>
									{/each}
									{#each { length: 5 - score } as _, i}
										<span>&star;</span>
									{/each}
								</div>
							</h3>
							<p>{description}</p>
						</div>
					{/each}
				</div>
				{#if reviews.length > 4}
					<button on:click={moreSubjects}>Zobrazit více</button>
				{/if}
			</div>
			{#if $page.data.user?.email !== teacher.email}
				<div>
					<button on:click={registerLecture}>Přihlásit se k hodině</button>
				</div>
			{/if}
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
	.data > div:first-of-type,
	.reviews > div > div {
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
	.reviews > div,
	.subjects > div {
		max-height: 322px;
	}
	.reviews > div.open,
	.subjects > div.open {
		max-height: 644px;
		overflow: auto;
	}
	div.stars {
		display: inline;
		margin-left: 10px;
	}
	div.stars span {
		font-size: 1.2em;
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
