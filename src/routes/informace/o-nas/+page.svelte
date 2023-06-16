<script>
	import { headerBg } from '$store/clientStore.js'
	import { onDestroy } from 'svelte'

	$headerBg = false

	onDestroy(() => {
		$headerBg = true
	})
</script>

<svelte:head>
	<title>Základní údaje | Profil | Skillnes</title>
	<meta
		name="description"
		content="Skillnes je moderní platforma, která nabízí nový způsob doučování pro studenty vysokých škol.
		Tato platforma je navržena tak, aby studenti mohli najít doučovatele."
	/>
	<meta name="keywords" content="Skillnes, SKillnes.cz, Společnost" />
</svelte:head>

<div>
	<h1>O Skillnes.cz</h1>
	<p>
		Skillnes je moderní platforma, která nabízí nový způsob doučování pro studenty vysokých škol.
		Tato platforma je navržena tak, aby studenti mohli najít doučovatele, kteří jim pomohou zlepšit
		své znalosti a dovednosti v různých předmětech. Učitelé, kteří se zaregistrují na Skillnes, jsou
		povětšinou také ještě studenti, a proto dokáží nejlépe pochopit, jakými výzvami a obtížemi se
		studenti setkávají při studiu.
	</p>
	<p>
		Jedinečnost Skillnes spočívá v tom, že jsou studenti doučovány jinými studenty, kteří se chtějí
		podělit o své vědomosti. Studenti si mohou najít doučovatele, kteří jim nejen poskytnou potřebné
		vědomosti a dovednosti, ale také jim poskytnou podporu a tipy v daných předmětech se kterými
		mohou mít už zkušenosti.
	</p>
	<p>
		Doučovatelé, kteří se na Skillnes registrovali, mohou využít tuto činnost jako brigádu při
		studiu. Platforma umožňuje doučovatelům prezentovat své zkušenosti a znalosti a najít studenty,
		kteří chtějí své znalosti zdokonalit.
	</p>
	<p>
		Skillnes nabízí přístup k vzdělání a doučování na jiné úrovni. Studenti a doučovatelé mohou
		spolupracovat buď přímo někde na smluveném místě, nebo online prostřednictvím videochatu.
		Skillnes poskytuje jednoduchou a efektivní cestu, jak zlepšit své znalosti a dovednosti a
		posunout se na další úroveň v učení.
	</p>
</div>

<style>
	div {
		max-width: 800px;
		margin: 100px auto;
		padding: 10px;
	}
</style>
