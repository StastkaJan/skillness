<script>
	import Header from './header.svelte'
	import Footer from './footer.svelte'
	import { navigating } from '$app/stores'
	import Notification from '$lib/notification.svelte'
	import Popup from '$lib/popup.svelte'
	import Loader from '$lib/loader.svelte'
	import { loading } from '$store/clientStore.js'

	let notifText = 'Text',
		notifType = 'success',
		notifVisible = false
</script>

<svelte:head>
	<title>Skillnes</title>
</svelte:head>

<Header />

<Notification />

<Popup />

{#if $navigating || $loading}
	<Loader />
{/if}

<slot />

<Footer />

<style>
	@font-face {
		font-family: 'Red Hat Display';
		font-style: normal;
		font-weight: 400;
		font-display: swap;
		src: url(/font/latin.woff2) format('woff2');
		unicode-range: U+0100-02AF, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1E00-1EFF,
			U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
	}
	@font-face {
		font-family: 'Red Hat Display';
		font-style: normal;
		font-weight: 400;
		font-display: swap;
		src: url(/font/latin_ext.woff2) format('woff2');
		unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
			U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+2000-206F, U+2074, U+20AC, U+2122,
			U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	}
	@font-face {
		font-family: 'Red Hat Display';
		font-style: normal;
		font-weight: 700;
		font-display: swap;
		src: url(/font/latin.woff2) format('woff2');
		unicode-range: U+0100-02AF, U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+1E00-1EFF,
			U+2020, U+20A0-20AB, U+20AD-20CF, U+2113, U+2C60-2C7F, U+A720-A7FF;
	}
	@font-face {
		font-family: 'Red Hat Display';
		font-style: normal;
		font-weight: 700;
		font-display: swap;
		src: url(/font/latin_ext.woff2) format('woff2');
		unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC,
			U+0300-0301, U+0303-0304, U+0308-0309, U+0323, U+0329, U+2000-206F, U+2074, U+20AC, U+2122,
			U+2191, U+2193, U+2212, U+2215, U+FEFF, U+FFFD;
	}
	:global(*) {
		box-sizing: border-box;
	}
	:global(html) {
		font-family: 'Red Hat Display', sans-serif;
		font-size: 16px;
		scroll-behavior: smooth;
	}
	:global(body) {
		margin: 0;
	}
	:global(p),
	:global(details) {
		max-width: 700px;
		margin: 1em auto;
	}
	:global(a),
	:global(a:visited) {
		color: #000;
		text-decoration: none;
		border-bottom: transparent 2px solid;
		transition: 0.2s;
	}
	:global(img) {
		max-width: 100%;
		height: unset;
	}
	:global(button) {
		padding: 0.4em 1em;
		font-size: inherit;
		border: none;
		border-radius: 5px;
		cursor: pointer;
		outline: 0;
	}
	:global(input),
	:global(textarea),
	:global(select) {
		display: block;
		margin: 5px 0;
		width: 100%;
		border: none;
	}
	:global(input),
	:global(select),
	:global(option) {
		padding: 0.4em;
		border-radius: 5px;
	}
	:global(input[type='checkbox']) {
		display: inline;
		width: fit-content;
	}
	:global(input[type='text']),
	:global(input[type='password']),
	:global(textarea),
	:global(select) {
		border-bottom: 2px solid #6537a7;
		border-radius: 0;
		box-shadow: none;
	}
	:global(textarea) {
		padding: 0.4em;
		min-width: 300px;
		max-width: 400px;
		height: 150px;
		resize: none;
	}
	:global(input.error),
	:global(textarea.error) {
		border-color: red;
		outline-color: red;
	}
	:global(form > *) {
		margin: 15px;
	}
	:global(form small),
	:global(form .error) {
		color: red;
	}
	:global(h1) {
		font-size: 2.5rem;
	}
	:global(section) {
		margin: auto;
		padding: 100px 5vw;
		max-width: 1250px;
	}
	:global(section:first-of-type) {
		max-width: unset;
	}
	:global(body > div.content) {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		min-height: 100vh;
	}
	@media (max-width: 800px) {
		:global(section) {
			padding: 50px 5vw;
		}
	}
</style>
