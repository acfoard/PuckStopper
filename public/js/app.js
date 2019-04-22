$(document).ready(function () {

    //SPA show/hide functions
    const showLogin = function (event) {
        if (event) {
            event.preventDefault();
        }
        $('section').addClass('hidden');
        $('.loginSection').removeClass('hidden');
    };

    const showRegister = function (event) {
        event.preventDefault();
        $('section').addClass('hidden');
        $('.registerSection').removeClass('hidden');
    };

    //Retrieve and populate Team List for Registration
    const addTeamToList = function (array, i) {
        const team = $(`<option value=${array[i].id}>${array[i].teamName}</option>`)
        $('#teamSelect').append(team);
    };

    $.ajax({
        url: '/api/team',
        method: 'GET'
    }).then(function (response) {
        for (i = 0; i < response.length; i++) {
            addTeamToList(response, i);
        }
    });

    //Validation for Login
    const validateLogin = function () {
        let valid = true
        const name = $('#loginEmail').val();
        const pass = $('#loginPW').val();
        if (!name || !pass) {
            valid = false;
        };
        return valid
    }

    //Validation for registration
    const validate = function () {
        const PW1 = $('#regPW').val();
        const PW2 = $('#confirmPW').val();
        let validPW = true;
        let valid = true;
        if (PW1 !== PW2) {
            validPW = false;
        };
        if (!$('#regFirstName').val() || !$('#regLastName').val() || !$('#regEmail').val() || !$('#regPhone').val() || !$('#regPW').val() || !$('#confirmPW').val() || !$('#teamSelect').val()) {
            valid = false;
        };
        return [valid, validPW];
    };

    //Create User
    const createUser = function (e) {
        e.preventDefault();
        valid = validate();
        if (valid[0]) {
            if (valid[1]) {
                const fName = $('#regFirstName').val();
                const lName = $('#regLastName').val();
                const email = $('#regEmail').val();
                const phone = $('#regPhone').val();
                const pass = $('#regPW').val();
                const team = $('#teamSelect').val();
                const goal = $('#isGoalie').val();
                const newUser = {
                    firstName: fName,
                    lastName: lName,
                    email: email,
                    cellNumber: phone,
                    password: pass,
                    isGoalie: goal,
                    teamId: team
                };
                $.ajax({
                    url: '/api/user',
                    method: 'POST',
                    data: newUser
                }).then(function() {
                });
            } else {
                $('#invalidPW').addClass('d-block');
            }
        } else {
            $('#invalid').addClass('d-block');
        };
    };

    //Login
    const logIn = function (e) {
        e.preventDefault();
        const valid = validateLogin();
        if (valid) {
            const email = $('#loginEmail').val();
            const password = $('#loginPW').val();
            const login = {
                email: email,
                password: password
            }
            $.post('/api/login', login).then(function(res) {
                console.log(res);
                sessionStorage.setItem('authorization', res.token);
                window.location.href = "/myschedule";
            })
        }
    }

    showLogin();

    $('#loginLink').on('click', showLogin);
    $('#regLink').on('click', showRegister);

    $('#regButton').on('click', createUser);
    $('#loginButton').on('click', logIn);

});
