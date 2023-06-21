<script>
	import { onDestroy, onMount } from 'svelte'
	import { headerBg } from '$store/clientStore.js'
	import Hat from '$icon/hat.svelte'
	import Profile from '$icon/profile.svelte'
	import Book from '$icon/book.svelte'
	import placeholder from '$img/placeholder.png'
	import placeholderWebp from '$img/placeholder.webp'
	import mainImg from '$img/main.png'
	import mainImgWebp from '$img/main.webp'
	import mainImgMobile from '$img/mainMobile.webp'
	import mainImgMobileWebp from '$img/mainMobile.webp'
	import asideImg from '$img/aside1.png'
	import asideImgWebp from '$img/aside1.webp'
	import aside2Img from '$img/aside2.png'
	import aside2ImgWebp from '$img/aside2.webp'

	onMount(() => {
		$headerBg = true
	})

	onDestroy(() => {
		$headerBg = false
	})
</script>

<svelte:head>
	<title>Skillnes</title>
	<meta
		name="description"
		content="Skillnes nabízí platformu pro doučování od studentů pro studenty. Student si tak může najít
		doučujícího, který přesně ví, jak studenta na předmět připravit a jaké znalosti mu předat."
	/>
	<meta name="keywords" content="Skillnes, SKillnes.cz, Doučování, Vysoká škola" />
</svelte:head>

<main>
	<section class="intro">
		<div>
			<h1>Doučování od studentů<br />pro studenty</h1>
			<p>Objev první platformu vytvořenou na míru studentům vysokých škol.</p>
			<div>
				<a href="/doucujici">Najít doučujícího</a>
				<a href="/univerzity">Zobrazit univerzity</a>
			</div>
		</div>
		<div>
			<picture>
				<source media="(max-width: 500px)" srcset={mainImgMobileWebp} type="image/webp" />
				<source media="(max-width: 500px)" srcset={mainImgMobile} type="image/png" />
				<source srcset={mainImgWebp} type="image/webp" />
				<img src={mainImg} alt="" width="700" height="345" />
			</picture>
		</div>
	</section>
	<section class="cubes">
		<h2>Co platforma nabízí?</h2>
		<div>
			<Book />
			<h3>Vyber si předmět</h3>
			<p>V menu si zvol předměty a vyber si z nich ten, ve kterém se chceš zlepšit.</p>
		</div>
		<div>
			<Profile />
			<h3>Zvol si doučujícího</h3>
			<p>
				Kliknutím na předmět nebo tlačítka v menu se dostaneš na seznam doučujících, kde si můžeš
				vybrat pravého parťáka pro pomoc.
			</p>
		</div>
		<div>
			<Hat />
			<h3>Vzdělávej se</h3>
			<p>Přihlaš se u doučujícího k hodině a zlepši se ve vybraném předmětu.</p>
		</div>
	</section>
	<section class="info">
		<div>
			<picture>
				<source srcset={asideImgWebp} type="image/webp" />
				<img src={asideImg} alt="" loading="lazy" width="400" height="267" />
			</picture>
		</div>
		<div>
			<h2>Jak to funguje?</h2>
			<p>
				Přes platformu Skillnes si můžeš najít fakultu, na které studuješ problémový předmět a
				následně si vybrat doučujícího podle svého vkusu. Poté si vybereš termín a můžeš se domluvit
				s doučujícím na průběhu doučování. Nakonec stačí za hodinu zaplatit.
			</p>
			<div>
				<a href="/doucujici">Najít doučujícího</a>
				<a href="/informace/sluzba">Dovědět se víc</a>
			</div>
		</div>
		<div>
			<picture>
				<source srcset={aside2ImgWebp} type="image/webp" />
				<img src={aside2Img} alt="" loading="lazy" width="400" height="267" />
			</picture>
		</div>
		<div>
			<h2>O službě</h2>
			<p>
				Skillnes nabízí platformu pro doučování od studentů pro studenty. Student si tak může najít
				doučujícího, který přesně ví, jak studenta na předmět připravit a jaké znalosti mu předat.
				Doučující si naopak přes tuto platformu může zajistit práci ke studiu či získat kredity pro
				získání doučování v jiném předmětu.
			</p>
			<div>
				<a href="/informace/sluzba">Dovědět se víc</a>
			</div>
		</div>
	</section>
</main>

<style>
	section {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 100px;
		margin: auto;
		padding: 100px 5vw;
		max-width: 1250px;
	}
	h1 {
		color: #fff;
		line-height: 1.2em;
	}
	h2 {
		width: 100%;
		text-align: center;
	}
	img {
		border-radius: 20px;
	}
	a {
		display: inline-block;
		padding: 0.4em 1em;
		font-size: 1.1em;
		font-weight: bold;
		border-radius: 5px;
	}
	section:first-of-type {
		width: 100%;
		max-width: unset;
		height: 100%;
		min-height: 70vh;
		padding-top: 100px;
		background: linear-gradient(130deg, #5f1f69 10%, #341de1 70%, #00d5ff 115%);
		content: '';
		z-index: -1;
	}
	section:first-of-type > div:first-of-type {
		max-width: 500px;
	}
	section:first-of-type > div:last-of-type {
		width: 40%;
		min-width: 300px;
		max-width: 700px;
	}
	section:first-of-type div img {
		filter: drop-shadow(20px 20px 50px rgba(0, 0, 0, 0.5));
	}
	.intro p {
		max-width: 500px;
		color: #fff;
		font-size: 1.2em;
	}
	.intro a:nth-of-type(1) {
		margin: 0 20px 20px 0;
		background: #fff;
	}
	.intro a:nth-of-type(2) {
		color: #fff;
		border: 2px solid #fff;
	}
	section.info > div {
		max-width: 400px;
	}
	section.info > div:nth-of-type(3) {
		order: 3;
	}
	section.info a:nth-of-type(1) {
		margin: 0 20px 20px 0;
		color: #fff;
		background-color: #000;
	}
	section.cubes > div {
		justify-self: center;
		width: 250px;
		height: 100%;
		text-align: center;
		border-radius: 20px;
	}
	section.cubes h3 {
		width: 100%;
		margin-bottom: 0;
	}
	@media (max-width: 800px) {
		section {
			gap: 50px;
		}
		section.info > div:nth-of-type(3) {
			order: unset;
		}
	}
</style>
