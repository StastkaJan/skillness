<script>
	import { headerBg } from '$store/clientStore.js'
	import { onDestroy } from 'svelte'

	$headerBg = false

	onDestroy(() => {
		$headerBg = true
	})
</script>

<svelte:head>
	<title>Ochrana osobních údajů | Skillnes</title>
	<meta
		name="description"
		content="Ochrana osobních údajů na portálu Skillnes. Seznámte se s důležitými informacemi a zabezpečte si svá práva při využívání našich služeb."
	/>
	<meta name="keywords" content="Skillnes, SKillnes.cz, Ochrana osobních údajů, Osobní údaje" />
</svelte:head>

<div>
	<h1>Ochrana osobních údajů</h1>
	<ol>
		<li>
			Vážený (budoucí) zákazníku,<br />
			velmi si vážíme vaší důvěry v naše produkty a služby a z tohoto důvodu bychom vám rádi předložili
			následující dokument týkající se zásad ochrany vašich osobních údajů. Tento dokument vám poskytuje
			informace týkající se zpracování vašich osobních údajů, které s námi sdílíte. Své osobní údaje
			nám můžete poskytnout prostřednictvím našich webových stránek.
		</li>
	</ol>
	<h2>Kdo je zpracovatelem osobních údajů</h2>
	<ol>
		<li>
			Skillnes.cz je internetová aplikace provozovaná na jméno Tomáš Hampl, se sídlem 533 16, Vápno
			31, IČO 17556481 (dále jen „Provozovatel“).
		</li>
		<li>
			Správcem osobních údajů se rozumí fyzická nebo právnická osoba, orgán veřejné moci, agentura
			nebo jiný subjekt, který sám nebo společně s ostatními určuje účel a prostředky zpracování
			osobních údajů; pokud jsou účely a prostředky tohoto zpracování stanoveny právem Evropské unie
			nebo členského státu, může být správce nebo konkrétní kritéria pro jeho jmenování stanovena
			právem Evropské unie nebo členského státu.
		</li>
		<li>Správcem Vašich osobních údajů je Tomáš Hampl se sídlem 533 16, Vápno 31, IČO 17556481</li>
		<li>Aktuální kontaktní údaj: xxx@xxx.com.</li>
	</ol>
	<h2>Jaké osobní údaje o Vás zpracováváme</h2>
	<ol>
		<li>
			Při využívání našich služeb můžete být požádáni o uvedení některý vašich osobních údajů. V
			rámci našich zásad transparentnosti si myslíme, že je důležité, abyste přesně věděli, jakým
			způsobem zpracováváme vaše osobní údaje a za jakým účelem jsou používány.
		</li>
		<li>
			Pro účely plnění smlouvy je zadání některých osobních údajů povinné, a to jméno a příjmení,
			e-mailová adresa. V případě registrace a vytvoření uživatelského konta na naší webové stránce
			od vás žádáme ještě další nepovinné údaje jako např. fotografie. Pokud se rozhodnete, můžete
			nám poskytnout i nepovinné údaje, jako např. lokalitu, osobní preference.
		</li>
		<li>
			Zpracování vašich osobních údajů pro jiné účely je možné pouze s vaším souhlasem nebo v
			případě oprávněného zájmu. Na základě s Vámi uděleného souhlasu zpracováváme:
			<ol>
				<li>
					Vaší emailovou adresu pro zasílání marketingových emailů za účelem informování o
					produktech, službách, akcích a souvisejícím průzkumu trhu,
				</li>
				<li>ID vašeho zařízení (mobil, počítač nebo tablet) na zasílání tzv. push notifikací.</li>
			</ol>
		</li>
		<li>
			V žádném případě nemáme přístup k údajům o vašich platebních kartách nebo bankovních účtech.
			Všechny platební transakce jsou zpracovány prostřednictvím poskytovatele platební brány a na
			našich serverech nejsou uloženy ani zpracovány.
		</li>
		<li>
			V našem systému zpracováváme následující osobní údaje:
			<ol>
				<li>
					Studenti: titul, jméno, příjmení, e-mail, případně nepovinné údaje jako lokalita, osobní
					preference,
				</li>
				<li>
					Doučovatelé: titul, jméno, příjmení, e-mail, fotografie, informace o vzdělání a praxi,
					lokalita, osobní preference,
				</li>
				<li>Faktury Provize: jméno a příjmení, adresa,</li>
				<li>Marketing: emailová adresa,</li>
				<li>Push notifikace: ID zařízení.</li>
			</ol>
		</li>
	</ol>
	<h2>Proč shromažďujeme a zpracováváme vaše osobní údaje</h2>
	<ol>
		<li>
			Vaše osobní údaje zpracováváme pouze v rozsahu, ve kterém je to nezbytné za účelem poskytování
			našich služeb, nebo za jinými účely níže:
			<ol>
				<li>
					Plnění smlouvy – je jí smlouva o zprostředkování doučování na jejímž základě se těm, kteří
					nabízejí doučování snažíme najít vhodné zájemce o doučování, a těm, kteří doučování
					hledají, zas toho nejlepšího doučovatele.
				</li>
				<li>
					Plnění našich zákonných povinností – při uchování údajů o vás a uzavřené smlouvě v našem
					účetnictví, ale také v případě povinnosti zpřístupnění údajů státním a jiným orgánům,
					které vykonávají dohled nad naší činností nebo které řeší spory, či provádějí rozhodnutí.
				</li>
				<li>
					Náš oprávněný zájem – u některých marketingových činností, při zlepšování našich služeb, v
					rámci personalizace, v souvislosti s bezpečností a ochranou vašich dat. V těchto případech
					vždy pečlivě zvažujeme, zda zpracovávání nebude představovat nepřiměřený zásah do vašich
					práv a zda převažuje náš oprávněný zájem.
				</li>
			</ol>
		</li>
	</ol>
	<h2>S kým sdílíme vaše osobní údaje</h2>
	<ol>
		<li>
			Aby portál Skillnes.com fungoval efektivně je nezbytné, aby byli Doučovatelé a Studenti v
			aktivním spojení. Proto je o dění na portálu a na jejich osobním profilu průběžně informujeme,
			a aby nezapomněli, zasíláme jim upozornění tzv. notifikace. Notifikaci posíláme na Uživatelův
			mail.
		</li>
		<li>
			Doučovatelovi posíláme zejména registrační email (dokončení registrace potvrzením doručení
			našeho registračního mailu), notifikaci o dění na portálu (informace o aktualizacích,
			zlepšeních nebo nových službách) nebo notifikaci o platbě.
		</li>
	</ol>
	<h2>Fungování portálu Skillnes.com</h2>
	<ol>
		<li>
			Údaje, které od vás shromažďujeme, se uchovávají na cloudovém účtu společnosti Heroku.com
			mohou však být přeneseny do zemí v rámci EU a zpracované v ní. Každý podobný přenos osobních
			údajů probíhá v souladu s platnými předpisy. Přenos mimo EU (do třetích zemí) se
			neuskutečňuje.
		</li>
		<li>
			Vaše osobní údaje mohou být také sděleny spolehlivým třetím stranám které nám poskytují
			administrativní nebo technickou podporu, tj. zpracovatelům údajů („zpracovatelem“ se myslí
			fyzická nebo právnická osoba, orgán veřejné moci, agentura nebo jiný subjekt, který zpracovává
			osobní údaje jménem správce.) Vaše osobní údaje můžeme také sdílet s platebními institucemi,
			pokud je to nezbytné pro poskytování našich služeb.
		</li>
		<li>
			Nikdy neposkytujeme, neprodáváme ani nevyměňujeme vaše osobní údaje pro marketingové účely
			třetím stranám. Údaje, které se poskytujeme třetím stranám se používají pouze na poskytnutí
			našich služeb pro vás. Vaše osobní údaje nebudou bez Vašeho souhlasu zveřejněny ani poskytnuty
			třetím osobám kromě partnerů. Partnerům mohou být poskytnuty osobní údaje, a to výlučně na
			účel, který je vámi odsouhlasen a zároveň uvedený ve smlouvě s partnerem. Aktuální seznam
			partnerů:
			<ol>
				<li>Google Analytics – cookies,</li>
				<li>ThePay.cz – platební brána.</li>
			</ol>
		</li>
	</ol>
	<h2>Jak dlouho uchováváme údaje</h2>
	<ol>
		<li>
			Vaše údaje uchováváme jen tak dlouho, dokud je to nutné pro účel, pro který jsme je získali.
			Doby uchování vašich dat se odvíjí od obchodních potřeb a ty údaje, které již nejsou potřebné
			jsou buď nezvratně anonymizovány (anonymizované údaje mohou být uchovány) nebo bezpečně
			zlikvidovány.
		</li>
		<li>
			Vaše osobní údaje archivujeme po dobu 10 let, jak vyžaduje speciální zákon, po dobu trvání
			naší smlouvy, ale také po ukončení smlouvy, pokud to vyžaduje zákone, nebo je to nutné z
			jiných důvodů, ale rozhodně pouze po nezbytnou dobu pro splnění účelu v každém konkrétním
			případě.
		</li>
		<li>
			Pokud zpracováváme vaše osobní údaje na základě vašeho souhlasu, budou tyto osobní údaje
			zpracovány pouze po dobu trvání vašeho souhlasu, který můžete kdykoliv odvolat nebo omezit.
			Pokud tak učiníte, zastavíme zpracování příslušných osobních údajů pro účely, s nimž jste
			souhlasili.
		</li>
	</ol>
	<h2>Jak zaručujeme bezpečnost vašich údajů</h2>
	<ol>
		<li>Používáme pravidelné skenování škodlivého softwaru.</li>
		<li>
			Vaše osobní informace jsou obsaženy za zabezpečenými sítěmi a jsou přístupné pouze omezenému
			počtu osob, které mají zvláštní přístupová práva k takovým systémům a databázím a jsou povinné
			zachovávat důvěrnost informací. Kromě toho jsou všechny citlivé informace šifrované pomocí
			technologie Secure Socket Layer (SSL).
		</li>
	</ol>
	<h2>Jaká máte práva</h2>
	<ol>
		<li>
			Právo na přístup k údajům – získání informací o tom, jaké osobní údaje o vás zpracováváme, za
			jakým účelem, komu údaje poskytujeme, zda byly přeneseny do třetí země a jak dlouho budeme
			vaše osobní údaje uchovávat.
		</li>
		<li>
			Právo na opravu – osobní údaje můžete vždy aktualizovat ve svém uživatelském kontě nebo
			požádat o jejich opravu.
		</li>
		<li>
			Právo na vymazání (právo zapomnění) – můžete požadovat vymazání údajů, které o vaši osobě
			uchováváme. My tak učiníme vždy, pokud to nevylučuje jiný právní základ, pro který údaje
			zpracováváme. V případě, že si u nás zrušíte konto, přistoupíme bezodkladně k vymazání vašich
			údajů, ze všech informačních systému, u nichž je to možné, z technických důvodů (např. z
			důvodu bezpečnosti dat) se však může stát, že některé údaje budou vymazány po delší době.
		</li>
		<li>
			Právo namítání – můžete namítnout zpracování Vašich osobních údajů, které je prováděno na
			základě našeho oprávněného zájmu, zejména profilování nebo pro účely přímého marketingu.
		</li>
	</ol>
	<h2>Co když dojde ke změnám ve zpracování</h2>
	<ol>
		<li>
			Veškeré změny, které mohou být v budoucnu provedeny v rámci ustanovení o ochraně osobních
			údajů, vám budou oznámeny prostřednictvím dohodnutých komunikačních kanálů. Doporučujeme však,
			abyste pravidelně kontrolovali znění tohoto ustanovení o Ochraně osobních údajů.
		</li>
	</ol>
	<h2>Kontaktujte nás</h2>
	<ol>
		<li>
			Pokud se chcete zeptat na cokoli ohledně použití vašich osobních údajů z naší strany,
			kontaktujte nás e-mailem na adrese xxx@xxx.com.
		</li>
	</ol>
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
	li {
		margin: 0.5em;
	}
</style>
