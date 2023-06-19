<script>
	import { goto, invalidateAll } from '$app/navigation'
	import Login from '$lib/login.svelte'
	import Register from '$lib/register.svelte'
	import { page } from '$app/stores'
	import { notification, popup, headerBg, loading } from '$store/clientStore.js'
	import Logo from '$icon/logoTransparent.svelte'
	import Menu from '$icon/menu.svelte'
	import Cross from '$icon/cross.svelte'
	import Person from '$icon/person.svelte'

	let width = 0,
		open = false,
		user = $page?.data?.user || {}

	$: user = $page?.data?.user

	function popupLogin() {
		popup.set({
			title: 'Přihlášení',
			component: Login,
			props: {}
		})
	}

	function popupRagister() {
		popup.set({
			title: 'Registrace',
			component: Register,
			props: {}
		})
	}

	async function logout() {
		$loading = true
		try {
			let res = await fetch('/api/logout', {
				method: 'DELETE'
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
		invalidateAll()
	}
</script>

<svelte:window bind:innerWidth={width} />

<header class:background={!$headerBg}>
	<a href="/">
		<Logo fill={'#fff'} />
		Skillnes
	</a>

	{#if width <= 800}
		<div
			class="mobileMenu"
			on:click={() => {
				open = !open
			}}
			on:keypress={() => {
				open = !open
			}}
		>
			{#if !open}
				<Menu />
			{:else}
				<Cross />
			{/if}
		</div>
	{/if}

	<nav
		class:open
		on:click={() => {
			open = false
		}}
		on:keypress={() => {
			open = false
		}}
	>
		<a href="/">Domů</a>
		<a href="/doucujici">Doučující</a>
		<a href="/univerzity">Univerzity</a>
		<a href="/predmety">Předměty</a>
		{#if user?.email}
			<div>
				<Person />
				<a href="/profil">Profil</a>
			</div>
			<button on:click={logout}>Odhlásit se</button>
		{:else}
			<button on:click={popupLogin}> Přihlásit se </button>
			<button on:click={popupRagister}> Registrovat se </button>
		{/if}
	</nav>
</header>

<style>
	header {
		position: absolute;
		top: 0;
		left: 0;
		display: flex;
		justify-content: space-between;
		width: 100%;
		padding: 10px 20px;
		z-index: 10;
	}

	header.background {
		background: linear-gradient(130deg, #5f1f69 10%, #341de1 70%, #00d5ff 115%);
	}

	header a {
		color: #fff;
		font-size: 1.2em;
	}

	header > a {
		display: flex;
		align-items: center;
		font-size: 1.6em;
		font-weight: bold;
	}

	.mobileMenu {
		display: none;
	}

	nav {
		display: flex;
		align-items: center;
		gap: 20px;
	}

	button {
		background: #ffffff25;
		color: #fff;
	}
	div {
		display: flex;
		position: relative;
	}

	@media (max-width: 800px) {
		.mobileMenu {
			display: unset;
		}
		nav {
			flex-direction: column;
			gap: 20px;
			position: fixed;
			top: 68px;
			right: -100%;
			bottom: 0;
			left: 100%;
			padding: 20px;
			background: rgba(0, 0, 0, 0.9);
			transition: 0.5s;
		}
		nav.open {
			transform: translateX(-100%);
		}
		nav > * {
			max-width: 200px;
			margin: 0 auto;
		}
	}
</style>
