const createPostButton = document.querySelectorAll('.createPost');
const buttonSettings = document.querySelectorAll('.buttonSettingsPicture');
const buttonShare = document.querySelectorAll('.buttonShare');
let numberOfShare = 0





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

setButtonSettings(buttonSettings);
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
        buttonShare.style.display = 'none'




        buttonCreate.addEventListener("click", () => {
            const inputValue = inputElement.value;
            const inputImageValue = inputImageSource.value;
            const postContentText = emptyPost.querySelector('.postContentText');
            const postContentPicture = emptyPost.querySelector('.postContentPicture');

            postContentText.innerHTML = inputValue;
            postContentPicture.src = inputImageValue;
            buttonCreate.style.display = 'none';
            buttonShare.style.display = 'initial'
        });

        document.body.insertBefore(emptyPost, createPostButton.nextSibling);

        setButtonSettings(buttonSettingNewPost);
        setButtonShare(buttonShareNewPost);
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

// Ajoute ou retire la classe visible aux éléments visés
function visible(hr, commentsContainer) {
    commentsContainer.classList.toggle('visible');
    hr.classList.toggle('visible');
}


// Création de chaque espace commentaire
const posts = document.querySelectorAll('.post');
posts.forEach((post, index) => {
    const hr = document.createElement('hr');
    hr.classList.add('commentHr');
    post.appendChild(hr);
    const commentsContainer = document.createElement('div');
    commentsContainer.classList.add('commentsContainer');
    post.appendChild(commentsContainer);
    const comments = commentsSelection(index);
    // Affichage du compteur de commentaires
    buttonComments[index].innerHTML = `${comments.length} Commentaires`;
    // Création du champ de saisie d'un nouveau commentaire
    const input = document.createElement('div');
    input.classList.add('inputDiv');
    commentsContainer.appendChild(input);
    const commentInput = document.createElement('textarea');
    commentInput.classList.add('commentInput');
    commentInput.placeholder = "write a new comment";
    input.appendChild(commentInput);
    const submitButton = document.createElement('button');
    submitButton.classList.add('buttonSubmit', 'basicStyleButton');
    submitButton.innerText = "Submit";
    input.appendChild(submitButton);
    // Selectionne les commentaires à afficher en fonction de l'index du post
    comments.forEach(comment => {
        // Création des éléments pour chaque commentaire à afficher
        const commentBox = document.createElement('div');
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
})

// Permet de déclencher l'affichage de la section commentaire
// correspondant au post lors d'un clic sur le bouton commentaire
buttonComments.forEach(button => {
    button.addEventListener('click', function () {
        const currentPost = button.closest('.post');
        const commentContainer = currentPost.querySelector('.commentsContainer');
        const hr = currentPost.querySelector('hr');
        visible(hr, commentContainer);
    });
})

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

// Création d'un nouveau commentaire
const buttonSubmit = document.querySelectorAll('.buttonSubmit');
const currentUser = [
    { username: "Current User", profilePicture: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png" }
]

// Evênement clic sur le bouton submit, créée un nouveau commentaire
buttonSubmit.forEach(button => {
    button.addEventListener('click', function () {
        const commentsContainer = button.closest('.commentsContainer');
        const comment = commentsContainer.querySelector('textarea').value;
        button.previousSibling.value = "";
        firstComment = commentsContainer.querySelector('.commentBox');
        createComment(commentsContainer, comment, firstComment);
    })
})

// Fonction permettant la création des éléments composant le nouveau commentaire
function createComment(commentsContainer, comment, firstComment) {
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
