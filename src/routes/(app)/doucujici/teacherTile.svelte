<script>
	import placeholder from '$img/placeholder.png'

	export let name = '',
		bio = '',
		img = '',
		site = '',
		price = 0,
		score = 0

	$: price = new Intl.NumberFormat('cs-CZ', {
		style: 'currency',
		currency: 'CZK',
		maximumFractionDigits: 0
	}).format(price)

	let value = String(4.5).replace(/\./, '')
</script>

<div class="teacherTile">
	{#if img}
		<img src={img} alt="profile" />
	{:else}
		<img src={placeholder} alt="profile" />
	{/if}
	<div>
		<h3>{name}</h3>
		<div class="stars">
			{#each { length: score } as _, i}
				<span>&starf;</span>
			{/each}
			{#each { length: 5 - score } as _, i}
				<span>&star;</span>
			{/each}
		</div>
		<p>{price}/hod.</p>
	</div>
	<p>{bio}</p>
	<a href="/doucujici/{site}">Zobrazit více</a>
</div>

<style>
	.teacherTile {
		padding: 15px;
		position: relative;
		width: 300px;
		height: 180px;
		background-color: #fff;
		border-radius: 10px;
		box-shadow: 0 0 10px 2px #ccc;
		transition: 0.2s;
	}
	.teacherTile > div {
		margin-left: 70px;
	}
	h3,
	p {
		overflow: hidden;
		text-overflow: ellipsis;
	}
	.teacherTile > div h3,
	.teacherTile > div p {
		margin: 0;
		max-width: 190px;
		white-space: nowrap;
	}
	.teacherTile > p {
		max-width: 270px;
		height: 2.8rem;
		display: -webkit-box;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;
	}
	img {
		position: absolute;
		top: -10px;
		left: -15px;
		width: 80px;
		border-radius: 50%;
		box-shadow: 0 0 10px 2px #ccc;
		aspect-ratio: 1/1;
	}
	a {
		position: absolute;
		top: 100%;
		left: 50%;
		padding: 0.6em 1.8em;
		translate: -50% -50%;
		background: #f0f0f0;
		box-shadow: 0 0 5px 2px #ccc;
		transition: 0.2s;
		border-radius: 5px;
	}
	a:hover {
		color: #fff;
		background: #000;
	}
	div.stars span {
		font-size: 1.2em;
	}
</style>
