<script>
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	export let teach = {},
		selectedSubject = {}

	export let editable = false

	function edit() {
		dispatch('editTeaching')
	}

	function remove() {
		dispatch('removeTeaching')
	}

	function click() {
		selectedSubject = teach
		dispatch('click')
	}
</script>

<div
	class="teacherTile"
	class:selected={!editable && selectedSubject?.subject === teach.subject}
	on:click={click}
	on:keypress={click}
>
	<h3>
		{teach.name}
		{#if editable}
			<br />
			<button on:click={edit}>Upravit</button>
			<button on:click={remove}>Odstranit</button>
		{/if}
	</h3>
	<small>{teach.uni} ({teach.faculty})</small>
	<p>Ident: {teach.ident}</p>
	<p>
		Cena: {new Intl.NumberFormat('cs-CZ', {
			style: 'currency',
			currency: 'CZK',
			maximumFractionDigits: 0
		}).format(teach.price)}
	</p>
</div>

<style>
	.teacherTile {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
		width: 320px;
		min-height: 120px;
		padding: 20px;
		border-radius: 10px;
		overflow: hidden;
		box-shadow: 0 0 10px #ccc;
	}
	.teacherTile.selected {
		background: #5f1f69;
		color: #fff;
	}
	h3 {
		width: 100%;
		margin: 0;
	}
	small {
		width: 100%;
	}
</style>
