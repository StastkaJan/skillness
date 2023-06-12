<script>
	import { createEventDispatcher } from 'svelte'

	const dispatch = createEventDispatcher()

	export let teach = {},
		selectedSubject = {}

	function click() {
		selectedSubject = teach
		dispatch('click')
	}
</script>

<div
	class="teacherTile"
	class:selected={selectedSubject?.subjectid === teach.subjectid}
	on:click={click}
	on:keypress={click}
>
	<h3>
		{teach.name}
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
		cursor: pointer;
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
