const jwt = require('jsonwebtoken')

module.exports = {

     ensureUser: function (req, res, next) {
        const token = localStorage.getItem('loginToken');
        if(token==null)return res.redirect('/login');
        jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
            if (err) {
                console.log(err);
                return res.redirect('/login');
            }
            else {
                // console.log(user);
                req.user = user;
                next()
            }
        });
    },

    forwardUser: function (req, res, next) {
        const token = localStorage.getItem('loginToken');
        if(token==null){
            next();
        }else{
            jwt.verify(token, process.env.JWT_ACCESS_KEY, (err, user) => {
                if (err) {
                    console.log(err);
                    next();
                }
                else {
                    console.log(user);
                    req.user = user;
                    res.redirect('/');
                }
            });
        } 
    }
}