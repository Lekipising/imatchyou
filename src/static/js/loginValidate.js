const loadValidateLogin = document.querySelector('#login_form');

if (loadValidateLogin) {

    const loginFailedMessage = document.querySelector('.login-failed');

    if (document.getElementById('loginEmail').value != '') {
        loginFailedMessage.classList.add('form-error-message');
    } else {
        loginFailedMessage.classList.remove('form-error-message');
    }

    const validateForm = (e) => {
        if (e.target) {
            var target = e.target;
        } else {
            // eslint-disable-next-line no-redeclare
            var target = e;
        }

        const emailValidator = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const defaultErr = 'Please fill in this field.';

        const createError = (msg) => {
            target.nextElementSibling.classList.replace('no-error-message', 'error-message');
            target.nextElementSibling.innerHTML = msg;
            target.classList.add('error');
            target.classList.remove('no-error');
        };

        const removeError = () => {
            target.classList.remove('no-error');
            target.classList.remove('error');
            target.nextElementSibling.classList.replace('error-message', 'no-error-message');
        };

        const checkEmail = () => {
            if (!target.value.match(emailValidator)) {
                const err = 'Please fill in a valid e-mail adress.';
                createError(err);
            } else if (target.value.length == 0) {
                createError(defaultErr);
            } else {
                removeError();
            }
        };

        const checkDefault = () => {
            if (target.value.length == 0) {
                createError(defaultErr);
            } else {
                removeError();
            }
        };

        const checkTarget = () => {
            if (target.id === 'loginEmail') {
                checkEmail();
            } else if (target.id === 'loginPassword') {
                checkDefault();
            } 
        };

        checkTarget();
    };

    var inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');

    inputs.forEach((input) => {
        input.addEventListener('blur', validateForm);
    });

    document.querySelector('#login_form').addEventListener('submit', (event) => {
        event.preventDefault();

        var errors = false;

        document.querySelectorAll('input').forEach((input) => {
            validateForm(input);

            if (input.classList.contains('no-error') || input.classList.contains('error') || parseInt(window.formTotal) === 0) {
                errors = true;
            }
        });

        if (errors === true) {
            document.querySelector('#login-error-message').classList.replace('no-error-message', 'form-error-message');
        } else {
            document.querySelector('#login-error-message').classList.replace('form-error-message', 'no-error-message');
            document.querySelector('#login_form').submit();
        }
    });
}