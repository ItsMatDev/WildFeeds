    const createPostButton = document.querySelectorAll('.createPost');
    const buttonSettings = document.querySelectorAll('.buttonSettingsPicture');
    const buttonShare = document.querySelectorAll('.buttonShare');

    function createElementHTML(elementHTML, className, text = null) {
        const element = document.createElement(`${elementHTML}`)
        element.classList.add(`${className}`)
        element.innerHTML = `${text}`
        return element;
    }

    function setButtonSettings(button) {

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

                
                const sharedPostContainer = createElementHTML('div','sharedPostContainer');
                console.log(sharedPost);
                const postLogoName = parentPost.querySelector(".postHead");
                console.log(postLogoName)
                sharedPostContainer.appendChild(postLogoName);
                sharedPostContainer.appendChild(sharedPost);
                document.body.insertBefore(sharedPostContainer, sharedPost.nextSibling);
                

                document.body.insertBefore(sharedPostContainer, createPostButton[0].nextSibling);
                const buttonSetting = sharedPostContainer.querySelectorAll('.buttonSettingsPicture');
                setButtonSettings(buttonSetting);
                 // button.style.display = "none";

                const parentPostButtonShare = parentPost.querySelector('.buttonShare');

                if (!parentPostButtonShare.dataset.shareCount) {
                    parentPostButtonShare.dataset.shareCount = 1;
                    parentPostButtonShare.innerHTML = parentPostButtonShare.dataset.shareCount + " Share";
                } else {
                    parentPostButtonShare.dataset.shareCount = parseInt(parentPostButtonShare.dataset.shareCount) + 1;
                    parentPostButtonShare.innerHTML = parentPostButtonShare.dataset.shareCount + " Shares";
                }
            

            

            });
        });
    }
    setButtonSettings(buttonSettings);
    setButtonShare(buttonShare);



    createPostButton.forEach((createPostButton) => {
        createPostButton.addEventListener('click', function () {

            const template = document.body.querySelector('.postTemplate');
            const cloneTemplate = template.content.cloneNode(true)
            const newPost = cloneTemplate.querySelector('section')
            createPostButton.insertAdjacentElement('afterend', newPost);


            const inputText = document.createElement('input');
            const inputImage = document.createElement('input');

            newPost.querySelector('.postContentTextPicture').appendChild(inputText);
            inputText.placeholder = "Write your text here";
            newPost.querySelector('.postContentTextPicture').appendChild(inputImage);
            inputImage.placeholder = "Put your image URL here";

            // Create the button to write a new post 

            const buttonBox = document.querySelector('.buttonBox');
            const buttonCreate = document.createElement('button');

            buttonCreate.classList.add("buttonCreate");
            buttonCreate.classList.add("basicStyleButton");
            buttonCreate.innerHTML = "Create";  


            // Create the button to share post

            const buttonShare = document.createElement('button');
            
            
            buttonShare.classList.add("buttonShare");
            buttonShare.classList.add("basicStyleButton");
            buttonShare.innerHTML = " Share!"
            
            buttonBox.appendChild(buttonCreate);

            // Button Create function on click


            buttonCreate.addEventListener("click", () => {
                const inputTextValue = inputText.value;
                const inputImageValue = inputImage.value;
                const postContentText = document.createElement('p');
                postContentText.classList.add("postContentText")
                const postContentTextPicture = newPost.querySelector('.postContentTextPicture')
                postContentTextPicture.appendChild(postContentText)
                const postContentPicture = document.createElement('img');
                postContentTextPicture.appendChild(postContentPicture)
                postContentPicture.classList.add("postContentPicture")
                

                postContentText.innerHTML = inputTextValue;
                postContentPicture.src = inputImageValue;
                postContentPicture.alt = "";
                buttonCreate.style.display = 'none';
                buttonBox.appendChild(buttonShare);  
                postContentTextPicture.removeChild(inputText);
                postContentTextPicture.removeChild(inputImage);
                
                const newbuttonShare = newPost.querySelectorAll('.buttonShare');
                
                setButtonShare(newbuttonShare);

            });

            document.body.insertBefore(newPost, createPostButton.nextSibling);
            
            const buttonSettings = newPost.querySelectorAll('.buttonSettingsPicture')
             setButtonSettings(buttonSettings); 
        });
    });




// Gestion de l'espace commentaires

const buttonComments = document.querySelectorAll('.buttonComments');
const post1 = document.querySelector('.post1');
const commentsPost1 = [
    { name: "Name Lastname", picture: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png", comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
    { name: "Name Lastname", picture: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png", comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt autem iusto sequi eius exercitationem, nihil aliquam consequatur repudiandae, nulla cupiditate expedita explicabo praesentium." },
    { name: "Name Lastname", picture: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png", comment: "Lorem ipsum3" }
]
const commentsPost2 = [
    { name: "Name Lastname", picture: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png", comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Testing post 2" },
    { name: "Name Lastname", picture: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png", comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt autem iusto sequi eius exercitationem, nihil aliquam consequatur repudiandae, nulla cupiditate expedita explicabo praesentium." },
    { name: "Name Lastname", picture: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png", comment: "Lorem ipsum3" },
    { name: "Name Lastname", picture: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png", comment: "Lorem ipsum3" },
    { name: "Name Lastname", picture: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png", comment: "Lorem ipsum3" }

]
const commentsPost3 = [
    { name: "Name Lastname", picture: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png", comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Testing post 3" },
    { name: "Name Lastname", picture: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png", comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt autem iusto sequi eius exercitationem, nihil aliquam consequatur repudiandae, nulla cupiditate expedita explicabo praesentium." }
]
const currentUser = [
    { username: "Current User", profilePicture: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png" }
]

// Appel de la fonction qui créée la section commentaire
createCommentsSection();
// Initialisation des boutons commentaires
setExistingCommentsButtons(buttonComments);

// Initialisation des boutons submit
const buttonSubmit = document.querySelectorAll('.buttonSubmit');
setSubmitButtons(buttonSubmit);

// Créée les sections commentaires pour chaque post
function createCommentsSection() {
    const posts = document.querySelectorAll('.post');
    posts.forEach((post, index) => {
        const commentsContainer = document.createElement('section');
        commentsContainer.classList.add('commentsContainer');
        post.appendChild(commentsContainer);
        const comments = commentsSelection(index);
        // Création du champ de saisie d'un nouveau commentaire
        createCommentsSectionHeader(commentsContainer);
        // Insertion des commentaires déjà existants sur chaque post
        insertComments(commentsContainer, comments);
        // Affichage du compteur de commentaires
        commentsCount(commentsContainer);
    })
}

// Créée les éléments nécessaires à l'ajout d'un nouveau commentaire
function createCommentsSectionHeader(commentsContainer) {
    const commentsSectionHeader = document.createElement('div');
    commentsSectionHeader.classList.add('commentsHeader');
    commentsContainer.appendChild(commentsSectionHeader);
    const commentInput = document.createElement('input');
    commentInput.classList.add('commentInput');
    commentInput.placeholder = "write a new comment";
    commentsSectionHeader.appendChild(commentInput);
    const submitButton = document.createElement('button');
    submitButton.classList.add('buttonSubmit', 'basicStyleButton');
    submitButton.innerText = "Submit";
    commentsSectionHeader.appendChild(submitButton);
}

/* Tests
// Créée les éléments nécessaires à l'ajout d'un nouveau commentaire | Test
function createCommentsSectionHeader(commentsContainer) {
    const commentsSectionForm = document.createElement('form');
    commentsSectionForm.classList.add('commentsHeader');
    commentsContainer.appendChild(commentsSectionForm);
    const commentLabel = document.createElement('label');
    //commentInput.classList.add('commentInput');
    //commentInput.placeholder = "write a new comment";
    commentsSectionForm.appendChild(commentLabel);
    const userInput = document.createElement('input');
    userInput.setAttribute('type', 'text');
    userInput.classList.add('commentInput');
    userInput.placeholder = "write a new comment";
    commentLabel.appendChild(userInput);
    const submitButton = document.createElement('input');
    submitButton.setAttribute('type', 'submit');
    submitButton.setAttribute('value', 'Comment');
    submitButton.classList.add('buttonSubmit', 'basicStyleButton');
    commentsSectionForm.appendChild(submitButton);
}

function submitTest() {
    const commentsContainer = button.closest('.commentsContainer');
    const comment = commentsContainer.querySelector('textarea').value;
    button.previousSibling.value = "";
    firstComment = commentsContainer.querySelector('.commentBox');
    addNewComment(commentsContainer, comment, firstComment);
    commentsCount(commentsContainer);
}
*/

// Insère les commentaires existants dans leur post respectif
function insertComments(commentsContainer, comments) {
    comments.forEach(comment => {
        // Création des éléments pour chaque commentaire à afficher
        const commentBox = document.createElement('article');
        commentBox.classList.add('commentBox');
        commentsContainer.appendChild(commentBox);
        const commentProfile = document.createElement('div');
        commentProfile.classList.add('commentProfile');
        commentBox.appendChild(commentProfile);
        const profilePicture = document.createElement('img');
        profilePicture.src = comment.picture;
        profilePicture.classList.add('commentPicture');
        commentProfile.appendChild(profilePicture);
        const commentBody = document.createElement('div');
        commentBody.classList.add('commentBody');
        commentBox.appendChild(commentBody);
        const profileName = document.createElement('h3');
        profileName.classList.add('commentName');
        profileName.innerText = comment.name;
        commentBody.appendChild(profileName);
        const commentText = document.createElement('p');
        commentText.classList.add('commentText');
        commentText.innerText = comment.comment;
        commentBody.appendChild(commentText);
    })
}

// Ajoute ou retire la classe visible aux éléments visés
function visible(commentsContainer) {
    commentsContainer.classList.toggle('visible');
}

// Permet de déclencher l'affichage de la section commentaire
// correspondant au post lors d'un clic sur le bouton commentaire
function initialiseCommentsButtons(buttonComments) {
    buttonComments.forEach(button => {
        button.addEventListener('click', function () {
            const currentPost = button.closest('.post');
            const commentContainer = currentPost.querySelector('.commentsContainer');
            visible(commentContainer);
        });
    })
}

// Initialise l'ensemble des boutons commentaires
function setExistingCommentsButtons(buttonsComments) {
    buttonsComments.forEach(button => {
        setCommentButton(button);
    })
}

// Initialise un bouton commentaire
function setCommentButton(button) {
    button.addEventListener('click', function () {
        const currentPost = button.closest('.post');
        const commentContainer = currentPost.querySelector('.commentsContainer');
        visible(commentContainer);
    });
}


// Renvoie le tableau d'objets commentaires en fonction de l'index
function commentsSelection(index) {
    switch (index) {
        case 0:
            return commentsPost1;
        case 1:
            return commentsPost2;
        case 2:
            return commentsPost3;
    }
}

// Initialise l'ensemble des boutons submit 
function setSubmitButtons(buttons) {
    // Evênement clic sur le bouton submit, créée un nouveau commentaire
    buttons.forEach(button => {
        button.addEventListener('click', function () {
            const commentsContainer = button.closest('.commentsContainer');
            const comment = commentsContainer.querySelector('input').value;
            button.previousSibling.value = "";
            firstComment = commentsContainer.querySelector('.commentBox');
            addNewComment(commentsContainer, comment, firstComment);
            commentsCount(commentsContainer);
        })
    })
}

// Fonction permettant la création des éléments composant le nouveau commentaire
function addNewComment(commentsContainer, comment, firstComment) {
    const commentBox = document.createElement('div');
    commentBox.classList.add('commentBox');
    commentsContainer.insertBefore(commentBox, firstComment);
    const commentProfile = document.createElement('div');
    commentProfile.classList.add('commentProfile');
    commentBox.appendChild(commentProfile);
    const profilePicture = document.createElement('img');
    profilePicture.src = currentUser[0].profilePicture;
    profilePicture.classList.add('commentPicture');
    commentProfile.appendChild(profilePicture);
    const commentBody = document.createElement('div');
    commentBody.classList.add('commentBody');
    commentBox.appendChild(commentBody);
    const profileName = document.createElement('h3');
    profileName.classList.add('commentName');
    profileName.innerText = currentUser[0].username;
    commentBody.appendChild(profileName);
    const commentText = document.createElement('p');
    commentText.classList.add('commentText');
    commentText.innerText = comment;
    commentBody.appendChild(commentText);
}

// Permet de calculer le nombre de commentaires et l'affichage sur le bouton
function commentsCount(commentsContainer) {
    const currentPost = commentsContainer.closest('.post');
    const commentCount = currentPost.querySelectorAll('.commentBox').length;
    const buttonComment = currentPost.querySelector('.buttonComments');
    buttonComment.innerText = `${commentCount} Commentaires`;
}



//Like button
const likeButton = document.querySelector(".buttonLike");
const likePic = document.querySelector(".likePicture");

likePic.addEventListener('click', function (e) {
    e.preventDefault();

    if (likePic.src === "http://127.0.0.1:5500/assets/thumbs-up-solid-yellowWild.svg") {
        likePic.src = "http://127.0.0.1:5500/assets/thumbs-up-solid-green.svg";
        likePic.alt = "Green thumbs up you liked this post";
        console.log('Premier if');
    }
    else if (likePic.src === "http://127.0.0.1:5500/assets/thumbs-up-solid-green.svg") {
        likePic.src = "http://127.0.0.1:5500/assets/thumbs-up-solid-red.svg";
        likePic.alt = "Red thumbs up you unliked this post";
        console.log('Second If');
    }
    else {
        likePic.src = "http://127.0.0.1:5500/assets/thumbs-up-solid-green.svg";
        likePic.alt = "Green thumbs up you liked this post";
        console.log('In the else');
    }
});

