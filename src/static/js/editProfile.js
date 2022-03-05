const editProfile = document.querySelector('.profile__edit');

if (editProfile) {
    const profile = document.querySelector('.p-profile');
    const saveChanges = document.querySelector('.profile__save');
    const editButton = document.querySelector('.profile__edit');

    editProfile.addEventListener('click', () => {
        if (profile.classList.contains('p-profile__edit')) {
            profile.classList.remove('p-profile__edit');
            saveChanges.classList.remove('save-button');
            editButton.classList.remove('edit-active');
        } else {
            profile.classList.add('p-profile__edit');
            saveChanges.classList.add('save-button');
            editButton.classList.add('edit-active');
        }
    });

    const tagContainer = document.querySelector('.tag-container');
    const input = document.querySelector('.tag-container input');
    const excistingTags = document.querySelectorAll('.tag span');
    const button = document.querySelector('.tag-button');

    let tags = [];

    excistingTags.forEach((tag) => {
        tags.push(tag.innerHTML);
    });

    const createTag = (label) => {
        const div = document.createElement('div');
        div.setAttribute('class', 'tag');
        const span = document.createElement('span');
        span.innerHTML = label;
        span.setAttribute('class', 'interestitem');
        const closeIcon = document.createElement('p');
        closeIcon.innerHTML = 'x';
        closeIcon.setAttribute('data-item', label);
        closeIcon.setAttribute('class', 'close-button');
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

    button.addEventListener('click', () => {
        if (input.value.replace(/\s/g, '') != '') {
            input.value.split(',').forEach(tag => {
                tags.push(tag);
            });

            addTags();
            input.value = '';
        }
    });

    input.addEventListener('keyup', (e) => {
        if (e.keyCode === 13 && input.value.replace(/\s/g, '') != '' || e.keyCode === 32 && input.value.replace(/\s/g, '') != '') {
            e.target.value.split(',').forEach(tag => {
                tags.push(tag);
            });

            addTags();
            input.value = '';
        }
    });
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('close-button')) {
            const tagLabel = e.target.getAttribute('data-item');
            const index = tags.indexOf(tagLabel);
            tags = [...tags.slice(0, index), ...tags.slice(index + 1)];
            addTags();
        }
    });

    document.querySelector('#edit_profile').addEventListener('submit', (event) => {
        event.preventDefault();

        var userInterests = [];

        document.querySelectorAll('.interestitem').forEach((interest) => {
            userInterests.push(interest.innerHTML.replace(/\s/g, ''));
        });

        document.getElementById('editInterests').value = userInterests;

        document.querySelector('#edit_profile').submit();
    });
}