export const nameVal = (name = '') => {
	if (name.length < 3) {
		return 'Jméno je příliš krátké'
	}

	return ''
}

export const emailVal = (email = '') => {
	if (!email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})$/)) {
		return 'Špatný formát emailu'
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
	}

	return ''
}

export const bioVal = (bio = '') => {
	if (bio.length < 1) {
		return 'Text nesmí být prázdný'
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
	}

	return ''
}

export const levelVal = (level = '') => {
	if (level.length < 1) {
		return 'Zadaná úroveň je neplatná'
	}

	return ''
}
