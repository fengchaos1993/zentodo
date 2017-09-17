module.exports.homelist = function(req, res){
    res.render('index', {title: "Home List"});
}

module.exports.locationInfo = function(req, res){
    res.render('index', {title: "Location Information"});
}

module.exports.addReview = function(req, res){
    res.render('index', {title: "Add Review"});
}