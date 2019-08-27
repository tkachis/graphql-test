const user = {
	_id: '1',
	name: 'Igor',
	email: 'tkachis@mail.ru',
	picture: 'https://cloudinary.com/asdf',
}

module.exports = {
	Query: {
		me: () => user,
	},
}
