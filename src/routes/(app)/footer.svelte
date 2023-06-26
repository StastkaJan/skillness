<script>
	import Logo from '$icon/logoTransparent.svelte'
	import insta from '$img/insta.png'
	import fb from '$img/fb.png'

	let timestamp = new Date().getFullYear()
</script>

<footer>
	<div class="footer">
		<h2>
			<div>
				<Logo fill={'#fff'} />
				Skillnes
			</div>
			<div>
				<a href="https://www.instagram.com/skillnes.cz/">
					<img src={insta} alt="Instagram" width="48" height="48" />
				</a>
				<a href="#">
					<img src={fb} alt="Facebook" width="48" height="48" />
				</a>
			</div>
		</h2>
		<div>
			<div>
				<h3>Užitečné informace</h3>
				<ul>
					<li>
						<a href="/informace/o-nas">O nás</a>
					</li>
					<li>
						<a href="/informace/sluzba">Jak to funguje?</a>
					</li>
					<li>
						<a href="/informace/kontakt">Kontakt</a>
					</li>
					<li>
						<a href="/informace/otazky">Často kladené otázky</a>
					</li>
				</ul>
			</div>
			<div>
				<h3>Podmínky</h3>
				<ul>
					<li>
						<a href="/podminky/obchodni-podminky">Obchodní podmínky</a>
					</li>
					<li>
						<a href="/podminky/ochrana-udaju">Ochrana osobních údajů</a>
					</li>
					<li>
						<a href="/podminky/recenze">Pravidla recenzí</a>
					</li>
					<li>
						<a href="/podminky/cookies">Používání cookies</a>
					</li>
				</ul>
			</div>
			<div>
				<h3>Partneři</h3>
				<ul>
					<li>
						<a href="https://web.thepay.cz/" target="_blank" rel="noreferrer">
							<img
								src="https://gate.thepay.cz/img/thepay-v2-220209-white-gpay.svg?pid=1561"
								alt=""
								loading="lazy"
								width="226"
								height="23"
							/>
						</a>
					</li>
				</ul>
			</div>
		</div>
		<p>Skillnes &copy;{timestamp} | Vytvořil Jan Šťástka</p>
	</div>
</footer>

<style>
	footer {
		width: 100%;
		margin-top: 50px;
		background: #341de1;
	}
	h2 {
		display: flex;
		align-items: center;
		justify-content: space-between;
		border-bottom: 2px solid;
	}
	h2 > div:first-of-type {
		display: flex;
		align-items: center;
	}
	h2 a {
		display: inline-block;
	}
	.footer {
		padding: 10px;
		width: 100%;
		max-width: 1000px;
		margin: auto;
		color: #fff;
	}
	.footer > div {
		display: flex;
		gap: 100px;
		flex-wrap: wrap;
		justify-content: center;
		margin: 100px auto;
	}
	.footer > div div {
		width: 250px;
	}
	p {
		margin-top: 20px;
		text-align: center;
	}
	a {
		max-width: 250px;
		margin: auto;
		display: block;
	}
	ul {
		margin: 0.5em;
		padding-left: 0.5em;
		list-style-type: none;
	}
	a {
		color: #fff;
	}
	@media (max-width: 800px) {
		.footer div {
			gap: 50px;
		}
	}
</style>
