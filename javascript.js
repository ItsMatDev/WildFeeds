const createPostButton = document.querySelectorAll('.createPost');

createPostButton.forEach((button) => {
    button.addEventListener('click', () => {
        const post = document.querySelector('.post');
        const emptyPost = post.cloneNode(true);

        const inputElement = document.createElement('input');
        const inputImageSource = document.createElement('input');
        inputElement.type = 'text';
        emptyPost.querySelector('.postContentText').innerHTML = "";
        emptyPost.querySelector('.postContentText').appendChild(inputElement);
        inputElement.placeholder = "Write your text here";
        emptyPost.querySelector('.postContentText').appendChild(inputImageSource);
        inputImageSource.placeholder = "Put your image URL here";
        emptyPost.querySelector('.postContentPicture').src = "";
        emptyPost.querySelector('.postContentPicture').alt = ""
        emptyPost.querySelector('.buttonShare').innerHTML = "Create";

        const createPostButton = button;
        document.body.insertBefore(emptyPost, createPostButton.nextSibling);

        emptyPost.querySelector('.buttonShare').addEventListener("click", (event) => {
            const inputValue = inputElement.value;
            const inputImageValue = inputImageSource.value;
            const postContentText = emptyPost.querySelector('.postContentText');
            const postContentPicture = emptyPost.querySelector('.postContentPicture');

            postContentText.innerHTML = inputValue;
            postContentPicture.src = inputImageValue;
        });
        
        const buttonSetting = emptyPost.querySelector('.buttonSettingsPicture');
        buttonSetting.addEventListener('click', (event) => {
            const parentPost = event.currentTarget.closest('.post');
            if (parentPost) {
                document.body.removeChild(parentPost);
                console.log("oui");
            }
        });
    });
});

    const createPost = document.querySelector('.createPost')

    const shareButtons = document.querySelectorAll('.buttonShare');

    shareButtons.forEach((shareButton) => {
        shareButton.addEventListener('click', (event) => {
            const parentArticle = event.currentTarget.closest('.post');

            if (parentArticle) {
                const clonedArticle = parentArticle.cloneNode(true);
                document.body.insertBefore(clonedArticle, createPost.nextSibling);
            }

            const buttonSettings = document.querySelectorAll('.buttonSettingsPicture');

            buttonSettings.forEach((buttonSetting) => {
                buttonSetting.addEventListener('click', (event) => {
                    const parentPost = event.currentTarget.closest('.post');
                    if (parentPost) {
                        document.body.removeChild(parentPost);
                    }
                });
            });
        });
});


const buttonSettings = document.querySelectorAll('.buttonSettingsPicture');

buttonSettings.forEach((buttonSetting) => {
    buttonSetting.addEventListener('click', (event) => {
        const parentPost = event.currentTarget.closest('.post');
        if (parentPost) {
            document.body.removeChild(parentPost);
        }
    });
});
