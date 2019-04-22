const path =  require('path');

module.exports = function(app) {
    app.get("/myschedule", function(req, res) {
        res.sendFile(path.join(__dirname, "../public/schedule.html"));
    });

    app.get("*", function(req, res){
        res.sendFile(path.join(__dirname, '../public/index.html'));
    });
}