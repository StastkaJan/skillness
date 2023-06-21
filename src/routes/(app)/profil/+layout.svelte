<script>
	import { page } from '$app/stores'
	import { headerBg } from '$store/clientStore.js'
	import { onDestroy } from 'svelte'

	$headerBg = false

	onDestroy(() => {
		$headerBg = true
	})
</script>

<svelte:head>
	<meta name="robots" content="noindex,nofollow" />
</svelte:head>

<main>
	<nav>
		<a href="/profil">Základní údaje</a>
		<a href="/profil/stav">Stav účtu</a>
		<a href="/profil/uceni">Přihlášení k hodinám</a>
		<a href="/profil/doucujici">Profil doučujícího</a>
		{#if $page?.data?.user?.isTeacher == true}
			<a href="/profil/predmety">Doučované předměty</a>
			<a href="/profil/rozvrh">Čas doučování</a>
			<a href="/profil/doucovani">Doučované hodiny</a>
		{/if}
	</nav>
	<slot />
</main>

<style>
	main {
		display: flex;
		flex-wrap: wrap;
		width: 100%;
		max-width: 1000px;
		margin: 100px auto 0;
	}
	nav {
		position: relative;
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		padding: 10px;
		width: 250px;
		font-weight: bold;
	}
	nav > a {
		padding: 5px 10px;
	}
</style>
