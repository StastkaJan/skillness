import { writable } from 'svelte/store'

export const notification = writable({
	text: '',
	type: ''
})

export const popup = writable({
	title: '',
	component: null,
	props: {}
})

export const loading = writable(false)

export const headerBg = writable(false)
