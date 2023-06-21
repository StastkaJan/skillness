export const nameVal = (name = '') => {
	if (name.length < 3) {
		return 'Jméno je příliš krátké'
	} else if (name.length > 50) {
		return 'Jméno je příliš dlouhé'
	}

	return ''
}

export const shortnameVal = (shortname = '') => {
	if (shortname.length < 2) {
		return 'Zkratka je příliš krátká'
	} else if (shortname.length > 30) {
		return 'Zkratka je příliš dlouhá'
	}

	return ''
}

export const emailVal = (email = '') => {
	if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$/)) {
		return 'Špatný formát emailu'
	} else if (email.length > 50) {
		return 'Email je příliš dlouhý'
	}

	return ''
}

export const passwordVal = (password = '') => {
	if (password.length < 8) {
		return 'Heslo musí mít alespoň 8 znaků'
	} else if (!password.match(/\d/)) {
		return 'Heslo musí obsahovat číslici'
	} else if (!password.match(/[a-z]/)) {
		return 'Heslo musí obsahovat malé písmeno'
	} else if (!password.match(/[A-Z]/)) {
		return 'Heslo musí obsahovat velké písmeno'
	} else if (password.match(/\s/)) {
		return 'Heslo nesmí obsahovat mezeru'
	} else if (password.length > 50) {
		return 'Heslo je příliš dlouhé'
	}

	return ''
}

export const consentVal = (consent = false) => {
	if (!consent) {
		return 'Pro registraci musíš souhlasit s podmínkami'
	}

	return ''
}

export const activeVal = (active = '') => {
	if (active !== 'T' && active !== 'F') {
		return 'Neplatná hodnota viditelnosti stránky'
	}

	return ''
}

export const siteVal = (site = '') => {
	if (site.length < 1) {
		return 'Adresa stránky nesmí být prázdná'
	} else if (site.match(/\s/)) {
		return 'Adresa stránky nesmí obsahovat mezeru'
	} else if (!site.match(/^[a-z]+$/)) {
		return 'Adresa stránky musí obsahovat pouze malá písmena bez diakritiky'
	} else if (site.length > 50) {
		return 'Adresa je příliš dlouhá'
	}

	return ''
}

export const bioVal = (bio = '') => {
	if (bio.length < 1) {
		return 'Text nesmí být prázdný'
	} else if (bio.length > 500) {
		return 'Text je příliš dlouhý'
	}

	return ''
}

export const subjectVal = (sbj = '') => {
	if (sbj.length < 1) {
		return 'Předmět nesmí být prázdný'
	}

	return ''
}

export const priceVal = (price = '') => {
	if (!price.match(/\d+(,\d{2})?/)) {
		return 'Zadaná cena je neplatná'
	} else if (Number(price) < 50) {
		return 'Zadaná cena je příliš nízká'
	} else if (Number(price) > 1000) {
		return 'Zadaná cena je příliš vysoká'
	}

	return ''
}

export const urlVal = (url = '') => {
	if (url.length < 1) {
		return 'Zadaná URL je příliš krátká'
	} else if (!url.match(/^https:\/\//)) {
		return 'URL adresa musí začínat https://'
	} else if (url.length > 500) {
		return 'URL adresa je příliš dlouhá'
	}

	return ''
}

export const identVal = (ident = '') => {
	if (ident.length < 3) {
		return 'Ident je příliš krátký'
	} else if (ident.length > 30) {
		return 'Ident je příliš dlouhý'
	}

	return ''
}

export const descriptionVal = (description = '') => {
	if (description.length < 10) {
		return 'Popis je příliš krátký'
	} else if (description.length > 500) {
		return 'Popis je příliš dlouhý'
	}

	return ''
}

export const activeUserVal = (active = '') => {
	if (active !== 'T' && active !== 'F' && active !== 'W') {
		return 'Neplatná hodnota stavu uživatele'
	}

	return ''
}

export const scoreVal = (score = 0) => {
	if (score < 0 || score > 5) {
		return 'Neplatné číselné hodnocení'
	}

	return ''
}
