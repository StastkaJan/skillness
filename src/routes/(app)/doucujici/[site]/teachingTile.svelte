<script>
	export let teach = {}
</script>

<div class="teacherTile">
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
	}
	h3 {
		width: 100%;
		margin: 0;
	}
	small {
		width: 100%;
	}
</style>
