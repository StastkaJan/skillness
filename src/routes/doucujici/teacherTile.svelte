<script>
	import placeholder from '$img/placeholder.png'

	export let name = '',
		bio = '',
		img = '',
		site = '',
		price = 0

	$: price = new Intl.NumberFormat('cs-CZ', {
		style: 'currency',
		currency: 'CZK',
		maximumFractionDigits: 0
	}).format(price)

	let value = 3
</script>

<div class="teacherTile">
	{#if img}
		<img src={img} alt="profile" />
	{:else}
		<img src={placeholder} alt="profile" />
	{/if}
	<div>
		<h3>{name}</h3>
		<input class="rating" max="5" step="0.5" type="range" style="--value: {value}" />
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
	input,
	input::-webkit-slider-thumb {
		-webkit-appearance: none;
	}
	input {
		--star: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 17.25l-6.188 3.75 1.641-7.031-5.438-4.734 7.172-0.609 2.813-6.609 2.813 6.609 7.172 0.609-5.438 4.734 1.641 7.031z"/></svg>');
		block-size: 1.2rem;
		inline-size: 6rem;
		padding: 0;
		border: none;
	}
	input::-webkit-slider-runnable-track {
		background: linear-gradient(
			to right,
			#000 0 calc(100% * var(--value) / 5),
			#64646426 0 calc(100% * var(--value) / 5)
		);
		block-size: 100%;
		mask: repeat left center/6rem var(--star);
		-webkit-mask: repeat left center/1.2rem var(--star);
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
		border-radius: 1em;
	}
	a:hover {
		color: #fff;
		background: #5f1f69;
	}
</style>
