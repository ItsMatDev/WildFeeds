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

const buttonShare = document.querySelector('.buttonShare3');
buttonShare.addEventListener("click", (event) => {
    const post = document.querySelector('.post3');
    const postShared = post.cloneNode(true);
    document.body.insertBefore(postShared, createPostButton.nextSibling);
});


const buttonSettings = document.querySelectorAll('.buttonSettingsPicture');

buttonSettings.forEach((buttonSetting) => {
    buttonSetting.addEventListener('click', (event) => {
        const parentPost = event.currentTarget.closest('.post');
        if (parentPost) {
            document.body.removeChild(parentPost);
            console.log("oui");
        }
    });
});
