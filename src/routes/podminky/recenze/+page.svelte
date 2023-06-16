<script>
	import { headerBg } from '$store/clientStore.js'
	import { onDestroy } from 'svelte'

	$headerBg = false

	onDestroy(() => {
		$headerBg = true
	})
</script>

<svelte:head>
	<title>Pravidla recenzí | Skillnes</title>
	<meta
		name="description"
		content="Přehled pravidel recenzí a odpovědnosti na portálu Skillnes. Seznámte se s důležitými informacemi a zabezpečte si svá práva při využívání našich služeb."
	/>
	<meta name="keywords" content="Skillnes, SKillnes.cz, Recenze, Pravidla recenzí" />
</svelte:head>

<div>
	<h1>Pravidla pro psaní uživatelských recenzí</h1>
	<ol>
		<li>
			Víme, že uživatelské recenze jsou pro ostatní zákazníky důležité a často jsou pro ně vodítkem
			při rozhodování. Proto by pravidla sběru recenzí měla být transparentní.
		</li>
		<li>
			Níže uvádíme informace o tom, jakým způsobem sbíráme recenze výrobků na Skillnes.cz.
			<ol>
				<li>Recenzi může přidat poze uživatel, který v minulosti absolvoval hodinu doučování.</li>
				<li>
					Ze služby zveřejňování recenzí lze kdykoli odstoupit. K tomu je nutné, aby uživatel
					přestal psát recenze na stránkách Skillnes.cz.
				</li>
				<li>
					Recenze je prohlášení zveřejněné uživatelem na internetových stránkách, které obsahuje
					subjektivní názor na její předmět („recenze“).
				</li>
				<li>
					Abychom zajistili, že spotřebitelé služeb budou mít jistotu, zda recenze, které si
					přečtou, jsou pravdivé, podnikli jsme další aktivity k ověření uživatelů, které jsou
					uvedeny níže.
				</li>
				<li>
					Odesláním recenze na internetové stránky uživatel souhlasí s dodržováním těchto pravidel.
				</li>
				<li>
					Rozlišujeme jendu kategorie uživatelů - recenzentů:
					<ol>
						<li>
							Ověřený recenzent: po skončení hodiny doučování se uživateli otevře možnost hodinu a
							doučujícího ohodnotit.
						</li>
					</ol>
				</li>
				<li>
					Zpravidla zveřejňujeme všechny Uživatelské recenze na internetových stránkách s tím, že
					nesmíme zveřejnit uživatelské recenze, které porušují zákon nebo dobré mravy. Ty, které
					zejména porušují podmínky používání (podmínek používání, nebo obsahují osobní údaje,
					e-mailové a jiné adresy, obsahují odkazy na jiné internetové stránky, obsahují reklamní
					obsah nebo jiný komerční obsah, nevztahují se zcela nebo zčásti k hodnocení služby,
					obsahují spam, jsou přidávány opakovaně stejným uživatelem a/nebo mají totožný obsah, jsou
					zveřejňovány stroji, tzv. roboty nebo jiné recenze z důležitých důvodů).
				</li>
				<li>
					Pro zveřejnění recenze by měl uživatel uvést správné údaje, tj.:
					<ol>
						<li>hodnocení na stupnici od 1 do 5 hvězdiček,</li>
						<li>obsah recenze.</li>
					</ol>
				</li>
				<li>
					Uživatel prohlašuje, že jeho prohlášení neporušuje platné právní předpisy ani práva
					třetích osob. Uživatel je plně odpovědný za jím zveřejněná prohlášení na internetových
					stránkách.
				</li>
				<li>Uživatel zveřejněním recenze prohlašuje, že skutečně absolvoval hodnocenou službu.</li>
				<li>
					Uživatelské hodnocení doučujícho je průměrem vypočteným na základě jednotlivých hodnocení,
					průměrné hodnocení však nezohledňuje nezveřejněné recenze (např. ty, které byly shledány
					nezákonnými nebo porušujícími tato pravidla).
				</li>
				<li>
					Možnost zanechat recenzi je omezena na prostý text, tj. uživatel nesmí přidávat mimo jiné
					grafické nebo multimediální soubory.
				</li>
				<li>
					Uživatel uděluje webu Skillnes.cz licenci k bezplatnému používání, šíření, zveřejňování,
					kopírování a distribuci jím zveřejněných názorů na internetových stránkách za podmínek
					uvedených v pravidlech používání internetových stránek pro ostatní obsah.
				</li>
				<li>
					Web Skillnes.cz může kontaktovat uživatele, který zveřejnil názor, na uvedené e-mailové
					adrese. Osobní údaje uživatele jsou zpracovávány v souladu s Prohlášením o ochraně
					osobních údajů.
				</li>
				<li>
					Web Skillnes.cz si vyhrazuje právo zavést nová pravidla pro zveřejňování recenzí, přičemž
					upravená pravidla se budou vztahovat pouze na smlouvy o poskytování služby přidávání
					recenzí na internetové stránky uzavřené po jejich zavedení. Všechny smlouvy o poskytování
					služby přidávání recenzí na internetové stránky uzavřené před zavedením nových pravidel se
					provádějí na základě pravidel, která byla platná ke dni uzavření smlouvy o poskytování
					služby přidávání recenzí na internetové stránky. O změně pravidel bude Avon informovat
					prostřednictvím internetových stránek.
				</li>
				<li>
					Uživatel by měl nahlásit jakékoli problémy nebo pochybnosti týkající se bezpečnosti našim
					zákaznickým službám. To nám umožní reagovat na Vaše oznámení co nejrychleji, protože
					recenze nemusí být pravidelně monitorovány.
				</li>
				<li>
					Uživatel nebude moci recenzi upravit po jejím zveřejnění. Pokud si uživatel přeje recenzi
					odstranit, může nás o to požádat prostřednictvím e-mailu.
				</li>
				<li>
					Pravidla nabývají účinnosti dnem jejich zveřejnění na internetových stránkách Skillnes.cz.
				</li>
			</ol>
		</li>
	</ol>
</div>

<style>
	div {
		max-width: 800px;
		margin: 100px auto;
		padding: 10px;
	}
	li {
		margin: 0.5em;
	}
</style>
