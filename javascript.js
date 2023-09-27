const createPostButton = document.querySelectorAll('.createPost');
const buttonSettings = document.querySelectorAll('.buttonSettingsPicture');
const buttonShare = document.querySelectorAll('.buttonShare');
let numberOfShare = 0




function setButtonSettings (button) {

    button.forEach((button) => {
        button.addEventListener('click', () => {
            const parentPost = button.closest('.post');
                document.body.removeChild(parentPost);
        });
    });
    }

    function setButtonShare(button) {
        button.forEach((button) => {
            button.addEventListener('click', () => {
                const parentPost = button.closest('.post');
                    
                    const sharedPost = parentPost.cloneNode(true);
                    document.body.insertBefore(sharedPost, createPostButton[0].nextSibling);
                    const buttonSetting = sharedPost.querySelectorAll('.buttonSettingsPicture');
                    setButtonSettings(buttonSetting);
                    
                    const parentPostButtonShare = parentPost.querySelector('.buttonShare');

                    if (!parentPostButtonShare.dataset.shareCount) {
                        parentPostButtonShare.dataset.shareCount = 1;
                    } else {
                        parentPostButtonShare.dataset.shareCount = parseInt(parentPostButtonShare.dataset.shareCount) + 1;
                    }
                    
                    parentPostButtonShare.innerHTML = parentPostButtonShare.dataset.shareCount + " Shares";
        

    

            });
    });
    }

setButtonSettings (buttonSettings);
setButtonShare(buttonShare);


createPostButton.forEach((createPostButton) => {
    createPostButton.addEventListener('click', function () {

            const post = document.querySelector('.post');
            const emptyPost = post.cloneNode(true);
            const inputElement = document.createElement('input');
            const inputImageSource = document.createElement('input');
            const buttonSettingNewPost = emptyPost.querySelectorAll('.buttonSettingsPicture');
            const buttonShareNewPost = emptyPost.querySelectorAll('.buttonShare')

            inputElement.type = 'text';
            emptyPost.querySelector('.postContentText').innerHTML = "";
            emptyPost.querySelector('.postContentText').appendChild(inputElement);
            inputElement.placeholder = "Write your text here";
            emptyPost.querySelector('.postContentText').appendChild(inputImageSource);
            inputImageSource.placeholder = "Put your image URL here";
            emptyPost.querySelector('.postContentPicture').src = "";
            emptyPost.querySelector('.postContentPicture').alt = "";  
            const buttonShare = emptyPost.querySelector('.buttonShare');
            const buttonCreate = buttonShare.cloneNode(true);
            const buttonBox = emptyPost.querySelector('.buttonBox');
            buttonBox.appendChild(buttonCreate);
            buttonCreate.innerHTML = "Create"; 
            buttonCreate.classList.remove("buttonShare");
            buttonCreate.classList.add("buttonCreate");
            buttonCreate.classList.add("basicStyleButton");

            

    
            buttonCreate.addEventListener("click", () => {
                const inputValue = inputElement.value;
                const inputImageValue = inputImageSource.value;
                const postContentText = emptyPost.querySelector('.postContentText');
                const postContentPicture = emptyPost.querySelector('.postContentPicture');
    
                postContentText.innerHTML = inputValue;
                postContentPicture.src = inputImageValue;
                buttonCreate.style.display = 'none';
            });

            document.body.insertBefore(emptyPost, createPostButton.nextSibling);

            setButtonSettings(buttonSettingNewPost);
            setButtonShare(buttonShareNewPost);
        });
});

 
