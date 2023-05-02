<script>
	import { onDestroy, onMount } from 'svelte'
	import placeholder from '$img/placeholder.png'
	import { notification, loading, popup, headerBg } from '$store/clientStore.js'
	import FacultiesList from './facultiesList.svelte'

	export let data = {}

	onMount(() => {
		$headerBg = true
	})

	onDestroy(() => {
		$headerBg = false
	})

	const uniClick = async (uni = '') => {
		if (uni === '') {
			$notification = {
				text: 'Číslo školy není dostupné, zkuste to později.',
				type: 'error'
			}
			return
		}

		$loading = true

		try {
			let res = await fetch(`/schools/faculty?uni=${uni}`)
			let resJson = await res.json()

			if (resJson.result === 'error') {
				$notification = {
					text: 'Došlo k chybě serveru, zkus to později.',
					type: 'error'
				}
			} else if (resJson.result === 'success') {
				$popup = {
					title: 'Zvol si fakultu',
					component: FacultiesList,
					props: {
						faculties: resJson.faculty
					}
				}
			}
		} catch (err) {
			$notification = {
				text: 'Došlo k chybě serveru, zkus to později.',
				type: 'error'
			}
			console.log(err)
		} finally {
			loading.set(false)
		}
	}
</script>

<svelte:head>
	<title>Přehled univerzit | Skillnes</title>
</svelte:head>

<main>
	<section>
		<div>
			<h1>Přehled univerzit<span>Najdi univerzitu, na které studuješ</span></h1>

			<input type="search" placeholder="Univerzita Karlova" />
		</div>
	</section>

	<div class="content">
		{#each data?.unis as uni}
			<div
				on:click={() => {
					uniClick(uni.id)
				}}
				on:keydown={() => {
					uniClick(uni.id)
				}}
			>
				{#if uni.logo}
					<img src={uni.logo} alt="profile" />
				{:else}
					<img src={placeholder} alt="profile" />
				{/if}
				<h2>{uni.name}</h2>
			</div>
		{:else}
			<p>Nic nenalezeno.</p>
		{/each}
	</div>
</main>

<style>
	section:first-of-type {
		position: relative;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		text-align: center;
		background: linear-gradient(120deg, #5f1f69 5%, #341de1 65%, #00d5ff 110%);
	}
	section:first-of-type > div {
		max-width: 400px;
	}
	h1,
	span {
		color: #fff;
	}
	h1 span {
		display: block;
		font-size: 0.5em;
	}
	input {
		padding: 0.7em;
	}
	.content {
		display: flex;
		flex-wrap: wrap;
		gap: 50px;
		max-width: 1200px;
		margin: auto;
	}
	.content > div {
		flex-grow: 1;
		max-width: 250px;
		margin: 50px;
		padding: 10px;
		border-radius: 10px;
		box-shadow: 0 0 20px #ccc;
		transition: 0.2s;
		cursor: pointer;
	}
	.content > div:hover {
		box-shadow: inset 0 0 20px #ccc;
	}
	.content > div img {
		display: block;
		margin: auto;
		padding: 10px 40px;
	}
	.content > div h2 {
		margin-top: 0;
		text-align: center;
	}
</style>
