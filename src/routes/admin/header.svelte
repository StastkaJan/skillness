<script>
	import { goto, invalidateAll } from '$app/navigation'
	import { page } from '$app/stores'
	import { notification, headerBg, loading } from '$store/clientStore.js'
	import Logo from '$icon/logoTransparent.svelte'
	import Menu from '$icon/menu.svelte'
	import Cross from '$icon/cross.svelte'

	let width = 0,
		open = false,
		admin = $page?.data?.admin || {}

	$: admin = $page?.data?.admin

	async function logout() {
		$loading = true
		try {
			goto('/admin')

			let res = await fetch('/admin/logout', {
				method: 'DELETE'
			})
			let resJson = await res.json()

			$notification = {
				text: resJson.text,
				type: resJson.result
			}
		} catch (err) {
			console.log(err)
		}
		invalidateAll()
		$loading = false
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
		{#if admin?.admin}
			<a href="/admin">Admin</a>
			<a href="/admin/univerzity">Univerzity</a>
			<a href="/admin/fakulty">Fakulty</a>
			<a href="/admin/predmety">Předměty</a>
			<a href="/admin/uzivatele">Uživatelé</a>
			<a href="/admin/otazky">Dotazy</a>
			<a href="/admin/vyber">Výběry</a>
			<button on:click={logout}>Odhlásit se</button>
		{:else}
			<a href="/">Domů</a>
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
