$(document).ready(function () {
    const getUser = function () {
        $.ajax({
            type: 'post',
            beforeSend: function (req) {
                req.setRequestHeader('authorization', sessionStorage.getItem('authorization'))
            },
            url: '/api/users'
        }).then(function (res) {
            res.json(res);
        });
    };

    getUser();

})