<script>
	import { popup } from '$store/clientStore.js'

	export let faculties = [
			{
				name: '',
				id: ''
			}
		],
		uni = ''

	const destroy = () => {
		popup.set({
			title: '',
			component: null,
			props: {}
		})
	}
</script>

<div>
	{#each faculties as { id, name }}
		<a href="/predmety?uni={uni}&faculty={id}" on:click={destroy}>{name}</a>
	{/each}
</div>

<style>
	div {
		max-width: 800px;
	}
	a {
		display: inline-block;
		margin: 5px 10px;
		padding: 0.5em 1.2em;
		color: #aaa;
		font-weight: bold;
		transition: 0.2s;
	}
	a:hover {
		color: #5f1f69;
	}
</style>
