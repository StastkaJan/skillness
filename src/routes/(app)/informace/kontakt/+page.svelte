<script>
	import { headerBg } from '$store/clientStore.js'
	import Report from './report.svelte'
	import { onDestroy } from 'svelte'
	import insta from '$img/insta.png'
	import fb from '$img/fb.png'

	$headerBg = false

	onDestroy(() => {
		$headerBg = true
	})
</script>

<svelte:head>
	<title>Základní údaje | Profil | Skillnes</title>
	<meta
		name="description"
		content="Kontaktujte nás na sociálních sítích, emailem nebo prostřednictvím formuláře. Rádi ti pomůžeme s každým problémem."
	/>
	<meta name="keywords" content="Skillnes, SKillnes.cz, Společnost" />
</svelte:head>

<div class="container">
	<h1>Kontaktuj nás</h1>
	<div>
		<div>
			<h2>Sociální sítě</h2>
			<p>
				<a href="https://www.instagram.com/skillnes.cz/">
					<img src={insta} alt="Instagram" width="48" height="48" />
				</a>
				<a href="#">
					<img src={fb} alt="Facebook" width="48" height="48" />
				</a>
			</p>
		</div>
		<div>
			<h2>Email</h2>
			<p>
				<a href="mailto:email@gmail.com">email@gmail.com</a>
			</p>
		</div>
	</div>
	<Report />
</div>

<style>
	div.container {
		display: flex;
		gap: 50px 100px;
		flex-wrap: wrap;
		justify-content: center;
		max-width: 800px;
		margin: 100px auto 50px;
	}
	h1 {
		width: 100%;
		text-align: center;
	}
	div.container > div {
		max-width: 400px;
	}
	div.container > div p {
		margin-left: 15px;
	}
</style>
