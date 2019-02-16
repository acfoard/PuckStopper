$(document).ready(function() {

const showLogin = function(event) {
    if (event) {
        event.preventDefault();
    }
    $('section').addClass('hidden');
    $('.loginSection').removeClass('hidden');
};


const showRegister = function(event) {
    event.preventDefault();
    $('section').addClass('hidden');
    $('.registerSection').removeClass('hidden');
};

showLogin();

$('#loginLink').on('click', showLogin);
$('#regLink').on('click', showRegister);

});
