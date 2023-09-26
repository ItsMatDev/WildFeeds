const post = document.querySelector('.post')
const emptyPost = post.cloneNode(true)
const emptyPostContentText = emptyPost.querySelector('.postContentText')
const emptyPostContentPicture = emptyPost.querySelector('.postContentPicture')
const emptyPostShareButton = emptyPost.querySelector('.buttonShare')

const createNewPost = document.querySelector('.createPost')

createNewPost.addEventListener("click", (event) => {
    document.body.insertBefore(emptyPost, createNewPost.nextSibling)

    const inputElement = document.createElement('input');
    const inputImageSource = document.createElement('input')
    inputElement.type = 'text'
    emptyPostContentText.innerHTML = ""
    emptyPostContentText.appendChild(inputElement)
    inputElement.placeholder = "Write your text here"
    emptyPostContentText.appendChild(inputImageSource)
    inputImageSource.placeholder = "Put your url image here"
    emptyPostContentPicture.src = ""
    emptyPostContentPicture.alt = ""
    emptyPostShareButton.innerHTML = "Create"

    emptyPostShareButton.addEventListener("click", (event) => {

        // Récupérez la valeur de l'input
        const inputValue = inputElement.value;
        const inputImageValue = inputImageSource.value

        // Mettez à jour l'innerHTML de .postContentText avec la valeur de l'input
        emptyPostContentText.innerHTML = inputValue;
        emptyPostContentPicture.src = inputImageValue
    })
})






const buttonShare = document.querySelector('.buttonShare3')

buttonShare.addEventListener("click", (event) => {

    const post = document.querySelector('.post3');
    const postShared = post.cloneNode(true);
    document.body.insertBefore(postShared, createNewPost.nextSibling);

})

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
        const commentContainer = currentPost.lastChild;
        const hr = commentContainer.previousSibling;
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

