<script>
	import { headerBg } from '$store/clientStore.js'
	import { onDestroy } from 'svelte'

	$headerBg = false

	onDestroy(() => {
		$headerBg = true
	})
</script>

<svelte:head>
	<title>Často kladené otázky | Skillnes</title>
	<meta
		name="description"
		content="Máš otázku ohledně webového portálu Skillnes? Je velká šance, že tady najdeš odpověď a ani se nemusíš nikoho ptát!"
	/>
	<meta name="keywords" content="Skillnes, SKillnes.cz, Společnost" />
</svelte:head>

<div>
	<h1>Často kladené otázky</h1>
	<p>Seznam nejčastějších otázek a odpovědí. Najdi odpověď dřív než se zeptáš!</p>
	<details>
		<summary>Nenašel jsem předmět, ve kterém se chci nechat doučit.</summary>
		Napiš nám o jaký předmět se jedná a my ho buď přidáme nebo tě kontaktujeme s dalšími informacemi.
	</details>
	<details>
		<summary>Doučování je online nebo prezenční?</summary>
		Zcale záleží na doučujícím, jaké nabízí doučování. Na profilu doučujícho hledej informaci online
		nebo název města, kde doučuje (najdeš to pod fotkou a jménem).
	</details>
	<details>
		<summary>Jak poznám kvalitního doučujícího?</summary>
		Samozřejmě je nejjednodušší se řídit podle zpětné vazby od ostatních uživatelů. Ale většina doučujících
		na platformě je důvěryhodná. Pokud některý z doučujících poruší podmínky, okamžitě mu zablokujeme
		účet, aby žádný další uživatel nemusel absolvovat stejně špatnou zkušenost.
	</details>
	<details>
		<summary>Jaké jsou poplatky?</summary>
		Poplatky jsou 5 % z ceny hodiny, kde částka jde ze strany doučujícího, takže jako doučovaný nic neplatíš.
		Př. cena hodiny je 200 Kč, jako doučovaný zaplatíš 200 Kč, z toho doučující získá 190 Kč a 10 Kč
		jde na správu a rozvoj aplikace.
	</details>
	<details>
		<summary>Kdo může na této platformě doučovat?</summary>
		Pro doučování na platformě je vhodné absolvovat předměty, které následně budeš doučovat. Jinak není
		omezen přístup, samozřejmě musíš celou dobu dodržovat naše podmínky.
	</details>
	<details>
		<summary>Neznám obsah vysokoškolských předmětů, jak poznám, že ho dokážu doučovat?</summary>
		V tom případě není vhodné jej zařadit do svých vyučovaných předmětů. Samozřejmě ho zařadit lze, ale
		mohou z toho vzniknout negativní recenze a další potíže.
	</details>
	<details>
		<summary>Jak můžu peníze vybrat?</summary>
		Na profilu přejdi do sekce stav účtu, klikni na tlačítko "Vybrat kredity" a vyplň žádost.
	</details>
	<details>
		<summary>Můžu později odstoupit od webu?</summary>
		Kdykoliv můžeš od webu odstoupit bez jakýchkoliv poplatků či jiných komplikací.
	</details>
</div>

<style>
	div {
		width: 700px;
		margin: 100px auto;
		padding: 10px;
	}
	summary {
		font-weight: bold;
	}
</style>
