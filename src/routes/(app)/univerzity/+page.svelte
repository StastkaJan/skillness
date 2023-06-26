<script>
	import { enhance } from '$app/forms'
	import { onDestroy } from 'svelte'
	import placeholder from '$img/placeholder.png'
	import { notification, loading, popup, headerBg } from '$store/clientStore.js'
	import FacultiesList from './facultiesList.svelte'

	export let data = {}

	$headerBg = true

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
			let res = await fetch(`/univerzity?uni=${uni}`)
			let resJson = await res.json()

			if (resJson.result === 'error') {
				$notification = {
					text: resJson.text,
					type: resJson.result
				}
			} else if (resJson.result === 'success') {
				$popup = {
					title: 'Zvol si fakultu',
					component: FacultiesList,
					props: {
						faculties: resJson.faculty,
						uni
					}
				}
			}
		} catch (err) {
			console.log(err)
			$notification = {
				text: resJson.text,
				type: resJson.result
			}
		} finally {
			$loading = false
		}
	}

	function handleResult(result) {
		$loading = false
		if (result.result === 'error') {
			$notification = {
				text: result.text,
				type: result.result
			}
		} else if (result.result === 'success') {
			data.unis = data.unis.concat(result.data)
			data.offset = result.offset
		}
	}
</script>

<svelte:head>
	<title>Přehled univerzit | Skillnes</title>
	<meta
		name="description"
		content="Přehled všech univerzit na platformě Skillnes. Najdi univerzitu, na které studuješ. Následně stačí najít předmět z fakulty a můžeš se začít vzdělávat."
	/>
	<meta name="keywords" content="Skillnes, SKillnes.cz, Předměty" />
</svelte:head>

<main>
	<section>
		<div>
			<h1>Přehled univerzit<span>Najdi univerzitu, na které studuješ</span></h1>

			<form action="?/searchUnis" method="GET">
				<input type="search" name="search" placeholder="Univerzita Karlova" value={data?.search} />
			</form>
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
			<p class="notfound">Nic nenalezeno.</p>
		{/each}
	</div>

	{#if data.unis[0]?.rows > 20 * (data.offset + 1)}
		<form
			action="?/loadMore"
			method="POST"
			use:enhance={() => {
				$loading = true
				return async ({ result }) => {
					handleResult(result.data)
				}
			}}
		>
			<input type="hidden" name="offset" value={data.offset + 1} />
			<button class="button">Zobrazit další</button>
		</form>
	{/if}
</main>

<style>
	section:first-of-type {
		position: relative;
		display: flex;
		justify-content: center;
		flex-wrap: wrap;
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
		justify-content: center;
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
	.notfound {
		margin: 50px;
		font-size: 2em;
	}
	form {
		width: fit-content;
		margin: auto;
	}
	button {
		height: 40px;
		color: #fff;
		font-weight: bold;
		background: #000;
		border: none;
		border-radius: 5px;
		outline: none;
	}
</style>
