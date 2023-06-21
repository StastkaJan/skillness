<script>
	import { headerBg } from '$store/clientStore.js'
	import { onDestroy } from 'svelte'

	$headerBg = false

	onDestroy(() => {
		$headerBg = true
	})
</script>

<svelte:head>
	<title>Obchodní podmínky | Skillnes</title>
	<meta
		name="description"
		content="Obchodní podmínky na portálu Skillnes. Seznámte se s důležitými informacemi a zabezpečte si svá práva při využívání našich služeb."
	/>
	<meta name="keywords" content="Skillnes, SKillnes.cz, Obchodní podmínky" />
</svelte:head>

<div>
	<h1>Obchodní podmínky</h1>
	<h2>Úvodní ustanovení</h2>
	<ol>
		<li>
			Skillnes.cz je internetová aplikace provozovaná na jméno Tomáš Hampl, se sídlem 533 16, Vápno
			31, IČO 17556481 (dále jen „Provozovatel“).
		</li>
		<li>
			Skillnes.cz je prostor pro zprostředkování doučování mezi Doučovatelem a Studentem (dále jen
			„skillnes.cz“ nebo „webová stránka“).
		</li>
		<li>
			Provozovatel vydává tyto Všeobecné podmínky použití (dále jen „Podmínky“), které upravují
			práva a povinnosti Uživatelů při využívání Služeb poskytovaných na Doučuji.eu a také právní
			vztahy mezi Provozovatelem, Studenty a Doučovateli vyplívající se Smlouvy o zprostředkování
			doučování.
		</li>
		<li>
			Poskytování a využívání Služeb ze strany Uživatelů na Skillnes.cz se řídí především těmito
			Podmínkami. Podmínky jsou závazné pro všechny Uživatele a vztahují se na každý smluvní vztah
			mezi Studenty, Doučovateli a Provozovatelem. Veškeré smluvní vztahy jsou uzavřeny v souladu s
			právním řádem České republiky. V případě, že je smluvní stranou spotřebitel, řídí se vztahy
			neupravené těmito Podmínkami zákonem č. 89/2012 Sb., Občanského zákoníku v platném znění,
			zákonem č. 634/1992 Sb., O ochraně spotřebitele. V případě, že je smluvní stranou podnikatel,
			řídí se vztahy neupravené těmito Podmínkami zákonem č. 513/1991 Sb., Obchodního zákoníku v
			platném znění.
		</li>
		<li>
			Pro účely těchto Podmínek jsou zde uvedeny významy použitých pojmů:
			<ul>
				<li>
					Student – fyzická osoba bez ohledu na věk, která má zájem o doučování a hledá Doučovatele
					přes portál Skillnes.cz.
				</li>
				<li>
					Doučovatel – fyzická osoba bez ohledu na věk, která má zájem doučovat jiné osoby v určitém
					předmětu a nabízí služby doučování za předem dohodnutou odměnu.
				</li>
				<li>
					Uživatelé – jednotné označení pro Studenty, Doučovatele i nezaregistrované návštěvníky
					portálu Skillnes.cz.
				</li>
				<li>
					Spotřebitel – fyzická osoba, která využívá služeb portálu pro osobní potřebu a která při
					uzavírání a plnění smlouvy nejedná v rámci své obchodní nebo jiné podnikatelské činnosti.
				</li>
				<li>
					Uživatel, který není spotřebitel – fyzická osoba, která při využívání služeb portálu
					Skillnes.cz koná v rámci předmětu své podnikatelské činnosti.
				</li>
				<li>
					Služby – služby které jsou poskytovány Provozovatelem prostřednictvím portálu Skillnes.cz.
				</li>
				<li>
					Smlouva o zprostředkování doučování – dohoda uzavřená mezi Provozovatelem a Studentem,
					jejímž předmětem je závazek Provozovatele najít pro Studenta vhodného Doučovatele a
					obstarat pro Studenta uzavření dohody s tímto Doučovatelem. Je to také dohoda uzavřená
					mezi Provozovatelem a Doučovatelem, jejímž předmětem je závazek Provozovatele najít pro
					Doučovatele studenta, který bude mít zájem o doučování, a obstarat pro Doučovatele
					uzavření dohody o doučování s takovým Studentem. Smlouva o zprostředkování je úplatná,
					přičemž Provozovateli vznikne nárok na odměnu (provizi) pouze v případě, že mezi Studentem
					a Doučovatelem došlo k uzavření dohody o doučování a k zaplacení sjednané ceny za
					doučování.
				</li>
			</ul>
		</li>
	</ol>
	<h2>Podmínky pro Doučovatele</h2>
	<ol>
		<li>
			Vytvoření profilu a registrace Doučovatele:
			<ol>
				<li>
					Vytvoření profilu a registrace Doučovatele je podmínkou pro využívání služeb portálu
					Skillnes.cz.
				</li>
				<li>Vytvoření profilu a registrace jsou bezplatné.</li>
				<li>
					Doučovatel je povinen vystupovat na portálu pouze pod jednou identitou (jméno, příjmení) a
					používat pouze jeden uživatelský účet.
				</li>
				<li>
					Vyplněním registračních údajů a udělením výslovného souhlasu (zaškrtnutím políčka)
					"Přečetl/a jsem si Obchodní podmínky a Prohlášení o ochraně osobních údajů a souhlasím s
					nimi." a kliknutím na tlačítko "Registrovat" dává doučovatel bezvýhradný souhlas s těmito
					Podmínkami a potvrzuje, že je starší 16 let. V případě, že doučovatel souhlas podle
					předchozí věty neudělí, není oprávněn portál využívat a nebude mu povolena registrace
					(vytvoření profilu).
				</li>
				<li>
					Pro vytvoření profilu a registraci požadujeme od Doučovatele následující:<br />
					Povinné údaje:
					<ul>
						<li>jméno a příjmení,</li>
						<li>e-mailová adresa,</li>
						<li>fotografie obličeje,</li>
						<li>stručný sebe prezentující text včetně informací o vzdělání, získané praxi,</li>
						<li>vysvědčení a certifikáty</li>
						<li>určení předmětů, ve kterých nabízí doučovatel doučování,</li>
						<li>určení lokality, pokud doučovatel poskytuje doučování osobně nebo online.</li>
					</ul>
					Nepovinné údaje:
					<ul>
						<li>titul,</li>
						<li>zda doučovatel dochází za studenty,</li>
						<li>preferované časy výuky,</li>
						<li>cenu a místo doučování.</li>
					</ul>
				</li>
				<li>
					Doučovatel bere na vědomí, že vytvoření profilu a registrace na portálu Skillnes.cz je
					podmíněna umístěním profilové fotografie. Musí jít o fotografii obličeje, která umožňuje
					určit identitu osoby. Doučovatel se zavazuje použít pouze fotografie, ke kterým má
					autorská práva, resp. souhlas autora. Doučovatel nesmí na server přidávat fotografie,
					které jsou v rozporu s dobrými mravy a se všeobecně závaznými právními předpisy České
					republiky, včetně erotických a pornografických fotografií. Fotografie nesmí obsahovat
					logo, vodoznak nebo identifikaci hodnocení. Nevhodnou fotografii, fotografii špatné
					kvality či fotografii, která nesplňuje požadovaná kritéria, je Provozovatel oprávněn
					odmítnout. Výše uvedená pravidla pro přidávání profilových fotografií se vztahují i na
					jakékoliv další fotografie a video vizitky, které doučovatel přidává na server, a to
					zejména do profilu.
				</li>
				<li>
					Provozovatel si vyhrazuje právo zasáhnout a upravit profil Doučovatele, zablokovat ho nebo
					zrušit, a to i bez udání důvodu, zejména pokud je v rozporu s těmito Podmínkami.
				</li>
				<li>
					Na žádost Doučovatele adresovanou na info@skillnes.cz bude profil neprodleně zrušen. Tím
					není vyloučena možnost opětovné registrace.
				</li>
			</ol>
		</li>
		<li>
			Podmínky využívání služeb portálu Doučovateli
			<ol>
				<li>Využívání služeb portálu Skillnes.cz Doučovateli je zdarma.</li>
				<li>
					V případě, že doučovatel není aktivní a neodpovídá na dotazy Studentů, Provozovatel je
					oprávněn profil Doučovatele deaktivovat (profil není viditelný pro veřejnost, ale je možné
					jej obnovit) nebo profil zrušit, jelikož našim zájmem je, aby si Studenti uměli efektivně
					najít Doučovatele, a to je možné, jen pokud budeme mít v portfoliu jen aktivních
					Doučovatele.
				</li>
				<li>
					Doučovatel může ovlivnit to, na jakém místě bude zařazen v seznamu všech Doučovatelů. Máme
					nastavená kritéria, podle nichž každému Doučovatelovi přidělíme určitý koeficient, a ten
					rozhoduje o tom, na jaké pozici se doučovatel umístí. Zvýhodněnou pozici získá doučovatel
					podle toho:
					<ul>
						<li>
							zda je nově registrovaný nebo ne (noví Doučovatelé mají vždy zvýhodněnou pozici, aby
							je Studenti našli);
						</li>
						<li>na kolik procent má vyplněný profil;</li>
						<li>zda má reference od Studentů;</li>
						<li>
							jak má nastavený status (doučovatel může ovlivnit viditelnost své profilové stránky);
						</li>
						<li>
							jaký je zájem ze strany Studentů, tj počet Studentů, kteří v relevantním období
							oslovili Doučovatele.
						</li>
					</ul>
				</li>
			</ol>
		</li>
	</ol>
	<h2>Podmínky pro Studenty</h2>
	<ol>
		<li>
			Vytvoření profilu a registrace Studentů
			<ol>
				<li>Registrace a využívání služeb portálu Skillnes.cz student jsou bezplatné.</li>
				<li>
					Studenti mají povinnost registrace. Registrace probíhá prostřednictvím odeslání
					kontaktního formuláře. Před odesláním formuláře vyžadujeme od Studenta, aby se seznámil s
					těmito Podmínkami a naší politikou ochrany osobních údajů podle platné legislativy, a
					uvedené potvrdil zaškrtnutím políčka "Přečetl/a jsem si Obchodní podmínky a Prohlášení o
					ochraně osobních údajů a souhlasím s nimi." a kliknutím na tlačítko "Registrovat" dává
					doučovatel bezvýhradný souhlas s těmito Podmínkami a potvrzuje, že je starší 16 let. Tím
					nám Student uděluje svůj souhlas s těmito Podmínkami a zpracováním osobních údajů. V
					případě, že Student souhlas podle neudělí, není oprávněn portál využívat a nebude mu
					povoleno odeslání kontaktního formuláře. V případě pozdější registrace Studenta již
					opakované udělení souhlasů nevyžadujeme.
				</li>
				<li>
					Při registraci vyžadujeme od Studenta vyplnění registračních údajů a potvrzení zaškrtnutím
					políčka "Přečetl/a jsem si Obchodní podmínky a Prohlášení o ochraně osobních údajů a
					souhlasím s nimi." a kliknutím na tlačítko "Registrovat" dává doučovatel bezvýhradný
					souhlas s těmito Podmínkami a potvrzuje, že je starší 16 let. Tím nám Student uděluje svůj
					bezvýhradný souhlas s těmito Podmínkami a zpracováním osobních údajů. V případě, že
					Student souhlas podle předchozí věty neudělí, není oprávněn portál využívat a nebude mu
					povolena registrace. Po registraci zašleme Studentovi aktivační email, který musí Student
					potvrdit, čímž je registrace úspěšně dokončena.
				</li>
				<li>
					Pro vytvoření profilu a registraci požadujeme od Studenta následující:<br />
					povinné údaje:
					<ul>
						<li>jméno a příjmení,</li>
						<li>e-mailová adresa.</li>
					</ul>
				</li>
				<li>
					Student může svůj profil kdykoli upravovat, na svém profilu může zadávat, měnit a
					deaktivovat požadavky.
				</li>
				<li>
					Provozovatel si vyhrazuje právo zasáhnout do profilu studenta, upravit profil Studenta,
					zablokovat ho nebo zrušit, a to i bez udání důvodu, zejména pokud je v rozporu s těmito
					Podmínkami.
				</li>
				<li>
					Na žádost Studenta adresovanou na xxx@xxx.com bude profil neprodleně zrušen. Tím není
					vyloučena možnost opětovné registrace.
				</li>
			</ol>
		</li>
		<!-- <li>
			Podmínky využívání portálu Studenty
			<ol>
				<li>
					Student při hledání doučování může prohledávat profily Doučovatelů a poté kontaktovat
					konkrétního Doučovatele.
				</li>
				<li>Kontaktovat Doučovatele může Student pomocí chatu přes platformu Skillnes.cz</li>
			</ol>
		</li> -->
	</ol>
	<h2>Notifikace</h2>
	<ol>
		<li>
			Aby portál Skillnes.cz fungoval efektivně je nezbytné, aby byli Doučovatelé a Studenti v
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
	<h2>Fungování portálu Skillnes.cz</h2>
	<ol>
		<li>
			Provozovatel si vyhrazuje oprávnění ke kontrole a přístupu ke vší komunikaci probíhající mezi
			Uživateli, která probíhá přes skillnes.cz a tuto je oprávněn kdykoliv odstranit (deaktivovat),
			pokud je v rozporu s dobrými mravy a se zásadami a principy, na kterých je portál skillnes.cz
			postaven.
		</li>
		<li>
			Komunikace mezi Doučovateli a Studenty probíhá výhradně přes portál skillnes.cz, není však
			dovoleno, aby si Uživatelé přes platformu vyměňovali jiné kontaktní údaje za účelem obcházení
			Provozovatele na odměnu za zprostředkovatelské služby.
		</li>
		<li>
			Provozovatel si vyhrazuje právo blokovat jakékoliv požadavky na doučování v případě, že jde o
			velký počet požadavků od téže osoby (spam).
		</li>
	</ol>
	<h2>Platby za doučování a provize zprostředkovateli</h2>
	<ol>
		<li>
			Student si s Doučovatelem dohodne výši odměny za doučování, zpravidla je odměna určena sazbou
			za jednu hodinu doučování.
		</li>
		<li>
			Student si zvolí jednu z platebních metod čímž zároveň Provozovateli uděluje souhlas k
			odepsání peněz z účtu.
		</li>
		<li>
			Odměna za doučování se vyplací 7 dní po začátku doučovací hodiny, resp. v souladu se storno
			podmínkami dohodnutými mezi Doučovatelem a Studentem.
		</li>
		<li>
			Platba za odučenou hodinu probíhá předem. Po zaplacení bude příslušná částka odepsána z účtu
			Studenta a Student obdrží notifikaci o platbě. Tím že student provede platbu, potvrzuje, že s
			úhradou souhlasí a na hodinu se dostaví. V opačném případě musí Student uplatnit námitku do 48
			hodin od provedené platby.
		</li>
		<li>
			Storno podmínky mohou být dle dohody Studenta a Doučovatel:
			<ul>
				<li>
					přísné – pokud Student zruší hodinu méně než 24 hod. před jejím začátkem nebo se student
					nedostaví na hodinu, doučovatel má nárok na 100% dohodnuté odměny
				</li>
				<li>
					mírné – pokud Student zruší hodinu méně než 24 hod. před jejím začátkem nebo se student
					nedostaví na hodinu, doučovatel má nárok na 50% dohodnuté odměny
				</li>
				<li>flexibilní – hodinu může Student zrušit kdykoliv a budou mu navráceny peníze zpět</li>
			</ul>
		</li>
		<li>
			Odměna za doučování bude Doučovatelovi uhrazena prostřednictvím Provozovatele. Provozovatel
			účtuje Doučovatelovi za zprostředkování doučování provizi ve výši 5 % z odměny Doučovatele.
			Provozovatel vystaví a doručí Doučovatelovi elektronickou fakturu neprodleně po uplatnění
			nároku na provizi.
		</li>
		<li>
			Po zaplacení Studentem za hodinu převede Provozovatel odměnu na účet Doučovatele vedený na
			Skillnes.cz. Doučovatel si může nechat vyplatit odměnu po každé odučené hodině nebo kdykoliv
			na požádání. Upozorňujeme, že na zpracování platby potřebujeme min. 48 hodin.
		</li>
		<li>
			Provozovatel nenese odpovědnost za splnění daňových povinností a jiných zákonných povinností
			Doučovatelů, především získání příslušných povolení k podnikání daňových přiznání a odvedení
			daně, vystavení faktur apod.
		</li>
		<li>
			Doučovatel tímto uděluje souhlas s elektronickým zasíláním dokladů (faktur) Provozovatele, o
			které si doučovatel může zažádat emailem.
		</li>
	</ol>
	<h2>Oprávnění Provozovatele</h2>
	<ol>
		<li>
			Provozovatel prohlašuje, že se poskytování Služeb na portálu Skillnes.cz věnuje a bude věnovat
			s vynaložením maximálního úsilí a s odbornou péčí, tak aby minimalizoval veškerá případná
			rizika, která by při využívání Skillnes.cz mohly vzniknout Uživatelem. Provozovatel si
			vyhrazuje právo, a to i bez předchozího oznámení, upravovat, měnit nebo inovovat Služby
			portálu Skillnes.cz Provozovatel má právo kdykoliv provést technickou odstávku portálu
			Skillnes.cz, a to i bez jakéhokoliv předchozího upozornění.
		</li>
		<li>
			Doučovatelé i Studenti udělují Provozovateli souhlas ve smyslu zákona o elektronickém obchodu
			na zasílání e-mailových zpráv obsahujících informace o novinkách, které portál skillnes.cz
			nabízí (newsletter). Tento souhlas může uživatel kdykoliv odvolat.
		</li>
		<li>
			Provozovatel neodpovídá za obsah příspěvků a aktivity Uživatelů. Provozovatel ve vlastním
			zájmu dbá na kvalitu a pravdivost referencí. Nenese však zodpovědnost za případné chyby nebo
			nepravdivé údaje uvedené Uživateli.
		</li>
		<li>
			Uživatelé portálu skillnes.cz mají zakázáno:
			<ul>
				<li>
					používat vulgarismy, slovní spojení nebo jiné slovní nebo znakové výrazy, jejichž přímý či
					nepřímý význam je v rozporu s obecně akceptovatelnou společenskou morálkou a etikou;
				</li>
				<li>uvádět nepravdivé, zavádějící, urážlivé nebo klamavé informace o jiné osobě;</li>
				<li>
					propagovat násilí a otevřeně nebo skrytou formou podněcovat k nenávisti na základě
					pohlaví, rasy, barvy pleti, jazyka, víry a náboženství, politického či jiného smýšlení,
					národního nebo sociálního původu, příslušnosti k národnosti nebo k etnické skupině;
				</li>
				<li>
					propagovat válku nebo popisovat kruté nebo jinak nelidské jednání způsobem, který je
					jejich nevhodným zlehčováním, omlouváním nebo schvalováním;
				</li>
				<li>
					otevřeně nebo skrytou formou propagovat alkohol, alkoholismus, kouření, užívání omamných
					látek, jedů a výbušnin nebo zlehčovat následky užívání uvedených látek;
				</li>
				<li>
					ohrožovat fyzický, psychický nebo morální vývoj nezletilých, nebo narušovat jejich duševní
					zdraví a emocionální stav;
				</li>
				<li>šířit nebo propagovat dětskou pornografii;</li>
				<li>otevřeně nebo skrytou formou propagovat politickou stranu nebo její představitele;</li>
				<li>
					propagovat vlastní webovou stránku a kontaktní údaje v detailech profilu, fotografiích
					nebo zadaných referencích;
				</li>
				<li>
					používat Skillnes.cz způsobem, který by ho mohl poškodit, měnit vizuální podobu, zasahovat
					do kódu stránky nebo přetížit tento web
				</li>
			</ul>
		</li>
		<li>
			Provozovatel si vyhrazuje právo zařadit uživatele na černou listinu portálu s informací o tom,
			že porušil některou z podmínek použití, takové jednání může být zohledněno v pozicích
			vyhledávání na doučuji.eu nebo zrušením/zablokováním profilu.
		</li>
		<li>
			Provozovatel si vyhrazuje právo na změnu těchto Podmínek, pokud tyto změny budou vyžádány
			změnou právních předpisů, technickými možnostmi Provozovatele nebo jinými okolnostmi, které
			vyplynou z potřeb Provozovatele. V případě, že dojde ke změně Podmínek, Uživatel bere na
			vědomí a souhlasí s tím, že platná a účinná je vždy poslední verze Podmínek. Oznámení o změně
			Podmínek a odkaz na aktuální znění Podmínek zveřejnění Provozovatel na portálu Skillnes.cz.
			Uživatel je oprávněn se kdykoli seznámit s aktuálním zněním Podmínek na web stránce odkaz.
			Pokud Uživatel pokračuje v užívání služeb portálu po nabytí účinnosti těchto změn, má se za
			to, že se změnami Podmínek bez výhrad souhlasí.
		</li>
	</ol>
	<h2>Naše zodpovědnost</h2>
	<ol>
		<li>
			Provozovatel negarantuje Uživatelovi nalezení vhodné osoby na doučování a ani nepřebírá v
			žádném ohledu záruku či odpovědnost za výsledek, kvalitu a úroveň doučování. V případě, že má
			Student výhrady ke kvalitě poskytnuté služby (doučování), musí je adresovat Doučovateli a
			Provozovatel nenese odpovědnost za vady poskytnuté služby. Provozovatel neodpovídá za
			správnost a úplnost informací uvedených na webové stránce a neposkytuje žádnou záruku při
			používání takových informací na příslušný účel.
		</li>
		<li>
			Odpovědnost Provozovatele se vztahuje výlučně na škodu způsobenou porušením povinností
			vyplívajících z těchto Podmínek. Provozovatel nese odpovědnost zejména za řádné a včasné
			plnění odměny
		</li>
		<li>
			Nejvyšší hranice naší odpovědnosti vůči uživateli za škody vzniklé v souvislosti s porušením
			naší povinnosti Provozovatele je vymezena do výše celkové ceny Služby.
		</li>
		<li>
			Uživatel je oprávněn vady poskytnuté Služby, resp. nárok na náhradu škody uplatnit u
			Provozovatele.
		</li>
	</ol>
	<h2>Řešení sporů</h2>
	<ol>
		<li>Všechny spory budou přednostně řešeny vzájemnou dohodou.</li>
		<li>
			V případě, že spotřebitel není spokojen se způsobem, kterým Provozovatel vyřídil jeho
			reklamaci nebo se domnívá, že Provozovatel porušil jeho práva, má Spotřebitel právo na
			mimosoudní řešení v souladu se zákonem č. 634/1992 Sb., o ochraně spotřebitele, v platném
			znění, právo na mimosoudní řešení sporu. Mimosoudní řešení sporu se zahajuje na návrh
			Spotřebitele podaný u České obchodní inspekce, podrobnější informace jsou uvedeny na
			internetových stránkách www.coi.cz.
		</li>
	</ol>
	<h2>Cookies</h2>
	<ol>
		<li>
			Soubory „cookies“ jsou malé textové soubory, které se ukládají do koncového zařízení
			Uživatele, nebo jeho paměti. Tyto soubory umožňují našemu webu zaznamenat informace o vaší
			návštěvě, nastavení vašeho prohlížeče, jazyku, který preferujete a další informace. Vaše
			příští návštěva našeho webu tak může být mnohem rychlejší a více odpovídající vašim potřebám.
			Bez souborů cookies by prohlížen našeho webu bylo mnohem složitější. Soubory „cookies“ nám
			mimo jiné pomáhají přizpůsobit naši nabídku právě vašim potřebám.
		</li>
		<li>
			Při navštívení naší webové stránky se Vám zobrazí informace, že v rámci poskytování Služeb
			používáme cookies a že pokračováním v návštěvě webu udělujete souhlas s jejich používáním.
			Pokud souhlas neudělíte, je možné, že se vám některé části naší webové stránky nebudou
			zobrazovat správně, jejich prohlížení pro vás bude složitější a nebude se vám zobrazovat
			nabídka Služeb odpovídající právě vašim potřebám.
		</li>
		<li>
			Poskytování cookies nutně neznamená, že nám poskytujete vaše osobní údaje, avšak v případě,
			kdy nám své osobní údaje poskytnete, může dojít k propojení vašich osobních údajů s
			informacemi obsaženými v souborech cookies, avšak pouze za účelem zkvalitnění našich Služeb,
			které tak budou více odpovídat vašim individuálním požadavkům a potřebám. Vaše osobní údaje
			chráníme v souladu s Podmínkami ochrany osobních údajů, které najdete zde odkaz na podmínky
		</li>
	</ol>
	<h2>Závěrečná ustanovení</h2>
	<ol>
		<li>
			Provozovatel si vyhrazuje právo kdykoliv změnit tyto Podmínky, přičemž veškeré takové změny
			jsou pro Uživatele závazné dnem jejich účinnosti Veškeré změny těchto Podmínek nabývají
			účinnosti dnem jejich zveřejnění na internetové stránce www.Skillnes.cz. Provozovatel je
			povinen změnu podmínek vhodným způsobem zveřejnit před nabytím účinnosti změn Podmínek. Tyto
			Podmínky nabývají účinnosti dne 14. 02. 2023.
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
