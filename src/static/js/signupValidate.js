const loadValidateSignup = document.querySelector('#sign-up_form');

if (loadValidateSignup) {
    const inputElement = document.getElementById('signupAvatar');

    inputElement.addEventListener('change', function () {
        const fileList = this.files;
        document.getElementById('fileInfoText').innerHTML = 'Your upload: ' + fileList[0].name;
    }, false);

    const tagContainer = document.querySelector('.tag-container');
    const input = document.querySelector('.tag-container input');
    const button = document.querySelector('.tag-button');

    let tags = [];

    const createTag = (label) => {
        const div = document.createElement('div');
        div.setAttribute('class', 'tag');
        const span = document.createElement('span');
        span.innerHTML = label;
        span.setAttribute('class', 'interestitem');
        const closeIcon = document.createElement('p');
        closeIcon.innerHTML = 'x';
        closeIcon.setAttribute('data-item', label);
        div.appendChild(span);
        div.appendChild(closeIcon);
        return div;
    };

    const clearTags = () => {
        document.querySelectorAll('.tag').forEach(tag => {
            tag.parentElement.removeChild(tag);
        });
    };

    const addTags = () => {
        clearTags();
        tags.slice().reverse().forEach(tag => {
            tagContainer.prepend(createTag(tag));
        });
    };

    input.addEventListener('keyup', (e) => {
        if (e.keyCode === 13 && input.value.replace(/\s/g, '') != '' || e.keyCode === 32 && input.value.replace(/\s/g, '') != '') {
            e.target.value.split(',').forEach(tag => {
                tags.push(tag);
            });

            addTags();
            input.value = '';
        }
    });

    button.addEventListener('click', () => {
        if (input.value.replace(/\s/g, '') != '') {
            input.value.split(',').forEach(tag => {
                tags.push(tag);
            });

            addTags();
            input.value = '';
        }
    });
    document.addEventListener('click', (e) => {
        if (e.target.tagName === 'P') {
            const tagLabel = e.target.getAttribute('data-item');
            const index = tags.indexOf(tagLabel);
            tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
            addTags();
        }
    });

    const failedMessage = document.querySelector('.sign-up--failed');

    if (document.querySelector('.takenUsername').innerHTML) {
        failedMessage.classList.add('form-error-message');
    } else {
        failedMessage.classList.remove('form-error-message');
    }

    const validateForm = (e) => {
        if (e.target) {
            var target = e.target;
        } else {
            // eslint-disable-next-line no-redeclare
            var target = e;
        }

        const password = document.querySelector('#signupPassword');
        const emailValidator = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const userValidator = /^[a-zA-Z0-9_.-]*$/;
        const dobValidator = /\d{1,2}[-/]\d{1,2}[-/]\d{2,4}/;
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

        const checkUser = () => {
            if (!target.value.match(userValidator)) {
                const err = 'A username may only contain letters, numbers and dashes.';
                createError(err);
            } else if (target.value.length == 0) {
                createError(defaultErr);
            } else {
                removeError();
            }
        };

        const checkDob = () => {
            if (!target.value.match(dobValidator)) {
                const err = 'Please fill in your date of birth in the format shown above.';
                createError(err);
            } else if (target.value.length == 0) {
                createError(defaultErr);
            } else {
                removeError();
            }
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

        const checkPassword = () => {
            if (target.value != password.value) {
                const err = 'The passwords do not match.';
                createError(err);
            } else if (target.value.length == 0) {
                createError(defaultErr);
            } else {
                removeError();
            }
        };

        const checkAvatar = () => {
            if (target.value === '') {
                const err = 'Please upload an avatar.';
                createError(err);
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
            if (target.id === 'signupUser') {
                checkUser();
            } else if (target.id === 'signupAge') {
                checkDob();
            } else if (target.id === 'signupEmail') {
                checkEmail();
            } else if (target.id === 'signupPasswordRepeat') {
                checkPassword();
            } else if (target.id === 'signupAvatar') {
                checkAvatar();
            } else if (target.id != 'signupInterestsInput' && target.id != 'signupInterests') {
                checkDefault();
            }
        };

        checkTarget();
    };

    var inputs = document.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');

    inputs.forEach((input) => {
        input.addEventListener('blur', validateForm);
    });

    document.querySelector('#sign-up_form').addEventListener('submit', (event) => {
        event.preventDefault();

        var errors = false;

        document.querySelectorAll('input').forEach((input) => {
            if (input.id != 'signupInterestsTags' && input.id != 'signupInterestsInput') {
                validateForm(input);

                if (input.classList.contains('no-error') || input.classList.contains('error') || parseInt(window.formTotal) === 0) {
                    errors = true;
                }
            }
        });

        var userInterests = [];

        document.querySelectorAll('.interestitem').forEach((interest) => {
            userInterests.push(interest.innerHTML.replace(/\s/g, ''));
        });

        document.getElementById('signupInterests').value = userInterests;

        if (errors === true) {
            document.querySelector('#form-error-message').classList.replace('no-error-message', 'form-error-message');
        } else {
            document.querySelector('#form-error-message').classList.replace('form-error-message', 'no-error-message');
            document.querySelector('#sign-up_form').submit();
        }
    });
}