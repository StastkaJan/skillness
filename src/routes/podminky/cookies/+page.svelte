<script>
	import { headerBg } from '$store/clientStore.js'
	import { onDestroy } from 'svelte'

	$headerBg = false

	onDestroy(() => {
		$headerBg = true
	})
</script>

<div>
	<h1>Zásady zpracování cookies</h1>
	<p>
		Tyto zásady zpracování cookies (dále jen „zásady“) popisují různé druhy cookies, které mohou být
		použité na stránkách, ze kterých jste vstoupili na tyto Zásady („stránky“) a jak tyto cookies
		spravovat. Tyto zásady můžeme kdykoliv změnit. Na vrchu těchto zásad naleznete datum poslední
		aktualizace. Veškeré změny těchto zásad vstoupí v platnost v momentě, kdy budou tyto
		aktualizované zásady zveřejněny na stránkách.
	</p>
	<h2>Co jsou to cookies?</h2>
	<p>
		Cookies jsou malé textové soubory, které jsou stahovány do vašeho počítače nebo přenosného
		zařízení během toho, když prohlížíte webové stránky. Mohou být zpracovávány vlastníkem stránky
		nebo třetí stranou. Jsou velmi široce používány proto, aby mohly webové stránky fungovat, nebo
		aby tyto stránky mohly fungovat lépe a efektivněji. Cookies to umožňují, protože webové stránky
		umí přečíst a vytvářet tyto soubory a umožňují jim tak rozpoznat vás a zapamatovat si o vás
		důležité informace tak, aby vaše používání a navigace na webových stránkách byla pohodlnější.
		Některé cookies, známé jako „dočasné cookies / session cookies“, ztratí platnost poté, co
		zavřete váš webový prohlížeč. Další cookies, známé jako „trvalé cookies“, jsou uskladněny ve
		vašem počítači nebo přenosném zařízení i poté, co zavřete webový prohlížeč.
	</p>
	<h2>Jaké cookies používáme?</h2>
	<p>
		Stránka aktuálně používá pouze cookies nezbytně nutné cookies. Tento druh cookies je nezbytný
		pro správné fungování webové stránky; umožňuje vám pohybovat se v prostředí stránky a naplno
		využít služby a prvky stránky. Bez těchto cookies by stránky nemohly fungovat tak hladce, jak
		bychom chtěli, neboť bychom vám nemohli poskytnout části stránky nebo její prvky, které jste si
		výslovně přáli.
	</p>
</div>

<style>
	div {
		max-width: 800px;
		margin: 100px auto;
		padding: 10px;
	}
	h2 {
		margin-top: 2em;
	}
</style>
