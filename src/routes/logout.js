const logout = (req, res) => {
    req.session.destroy((err) => {
		if (err) {
			res.redirect('/profile');
		}
		res.redirect('/login');
	});
};

module.exports = logout;