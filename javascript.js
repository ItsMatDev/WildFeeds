const createPostButton = document.querySelectorAll(".createPost");
const buttonSettings = document.querySelectorAll(".buttonSettingsPicture");
const buttonShare = document.querySelectorAll(".buttonShare");
const elementContainerOfPosts = document.body.querySelector(".columnOfPosts");

function createElementHTML(elementHTML, className, text = "") {
  const element = document.createElement(`${elementHTML}`);
  element.classList.add(`${className}`);
  element.innerHTML = `${text}`;
  return element;
}

function setButtonSettings(button) {
  button.forEach((button) => {
    button.addEventListener("click", () => {
      const parentPost = button.closest(".post");
      elementContainerOfPosts.removeChild(parentPost);
    });
  });
}

function setButtonShare(button) {
  button.forEach((button) => {
    button.addEventListener("click", () => {
      const parentPost = button.closest(".post");

      const sharedPost = parentPost.cloneNode(true);

      const sharedPostContainer = createElementHTML(
        "div",
        "sharedPostContainer"
      );
      const postLogoName = parentPost
        .querySelector(".postHead")
        .cloneNode(true);
      sharedPostContainer.appendChild(postLogoName);
      sharedPostContainer.appendChild(sharedPost);
      document.body.insertBefore(sharedPostContainer, sharedPost.nextSibling);
      const currentUserNamePostShared =
        sharedPostContainer.querySelector(".userName");
      currentUserNamePostShared.innerHTML = "Shared By Pierre Adrien";

      elementContainerOfPosts.insertBefore(
        sharedPostContainer,
        createPostButton[0].nextSibling
      );
      const buttonSetting = sharedPostContainer.querySelectorAll(
        ".buttonSettingsPicture"
      );

      buttonSetting.forEach((button) => {
        button.addEventListener("click", () => {
          const sharedPostContainer = button.closest(".sharedPostContainer");
          elementContainerOfPosts.removeChild(sharedPostContainer);
        });
      });

      const sharePostChild = sharedPostContainer.querySelector(".post");
      sharePostChild.style.margin = "0px";

      const parentPostButtonShare = parentPost.querySelector(".buttonShare");

      if (!parentPostButtonShare.dataset.shareCount) {
        parentPostButtonShare.dataset.shareCount = 1;
        parentPostButtonShare.innerHTML =
          parentPostButtonShare.dataset.shareCount + " Share";
      } else {
        parentPostButtonShare.dataset.shareCount =
          parseInt(parentPostButtonShare.dataset.shareCount) + 1;
        parentPostButtonShare.innerHTML =
          parentPostButtonShare.dataset.shareCount + " Shares";
      }

      const buttonComs = sharedPostContainer.querySelector(".buttonComments");
      buttonComs.style.display = "none";
      const buttonShare = sharedPostContainer.querySelector(".buttonShare");
      buttonShare.style.display = "none";
      const buttonSettingsParent = sharedPostContainer.querySelector(
        ".post .buttonSettings"
      );
      console.log(buttonSettingsParent);
      buttonSettingsParent.style.display = "none";
    });
  });
}
setButtonSettings(buttonSettings);
setButtonShare(buttonShare);

createPostButton.forEach((createPostButton) => {
  createPostButton.addEventListener("click", function () {
    const template = document.body.querySelector(".postTemplate");
    const cloneTemplate = template.content.cloneNode(true);
    const newPost = cloneTemplate.querySelector("section");
    createPostButton.insertAdjacentElement("afterend", newPost);

    const userName = document.querySelector(".userName");
    userName.innerHTML = "Pierre Adrien";
    const inputText = document.createElement("input");
    const inputImage = document.createElement("input");
    inputText.classList.add("commentInput");
    inputImage.classList.add("commentInput");
    inputText.style.marginBlock = "1rem";
    inputImage.style.marginBottom = "1rem";

    newPost.querySelector(".postContentTextPicture").appendChild(inputText);
    inputText.placeholder = "Write your text here";
    newPost.querySelector(".postContentTextPicture").appendChild(inputImage);
    inputImage.placeholder = "Put your image URL here";

    // Create the button to write a new post

    const buttonBox = document.querySelector(".buttonBox");
    const buttonCreate = document.createElement("button");

    buttonCreate.classList.add("buttonCreate");
    buttonCreate.classList.add("basicStyleButton");
    buttonCreate.innerHTML = "Create";

    // Create the button to share post

    const buttonShare = document.createElement("button");

    buttonShare.classList.add("buttonShare");
    buttonShare.classList.add("basicStyleButton");
    buttonShare.innerHTML = " Share!";

    buttonBox.appendChild(buttonCreate);

    // Button Create function on click

    buttonCreate.addEventListener("click", () => {
      const inputTextValue = inputText.value;
      const inputImageValue = inputImage.value;
      const postContentText = document.createElement("p");
      postContentText.classList.add("postContentText");
      const postContentTextPicture = newPost.querySelector(
        ".postContentTextPicture"
      );
      postContentTextPicture.appendChild(postContentText);
      const postContentPicture = document.createElement("img");
      postContentTextPicture.appendChild(postContentPicture);
      postContentPicture.classList.add("postContentPicture");

      postContentText.innerHTML = inputTextValue;
      postContentPicture.src = inputImageValue;
      postContentPicture.alt = "";
      buttonCreate.style.display = "none";
      // buttonBox.appendChild(buttonShare);
      postContentTextPicture.removeChild(inputText);
      postContentTextPicture.removeChild(inputImage);

      const newbuttonShare = newPost.querySelectorAll(".buttonShare");

      setButtonShare(newbuttonShare);
    });

    elementContainerOfPosts.insertBefore(newPost, createPostButton.nextSibling);

    const buttonSettings = newPost.querySelectorAll(".buttonSettingsPicture");
    setButtonSettings(buttonSettings);
  });
});

// Gestion de l'espace commentaires

const buttonComments = document.querySelectorAll(".buttonComments");
const post1 = document.querySelector(".post1");
const commentsPost1 = [
    { name: "Name Lastname", picture: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png", comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit." },
    { name: "Name Lastname", picture: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png", comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt autem iusto sequi eius exercitationem, nihil aliquam consequatur repudiandae, nulla cupiditate expedita explicabo praesentium." },
    { name: "Pierre Adrien", picture: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png", comment: "Lorem ipsum3" }
]
const commentsPost2 = [
    { name: "Name Lastname", picture: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png", comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Testing post 2" },
    { name: "Name Lastname", picture: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png", comment: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt autem iusto sequi eius exercitationem, nihil aliquam consequatur repudiandae, nulla cupiditate expedita explicabo praesentium." },
    { name: "Pierre Adrien", picture: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png", comment: "Lorem ipsum3" },
    { name: "Name Lastname", picture: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png", comment: "Lorem ipsum3" },
    { name: "Name Lastname", picture: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png", comment: "Lorem ipsum3" }

]
const commentsPost3 = [
  {
    name: "Name Lastname",
    picture:
      "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Testing post 3",
  },
  {
    name: "Name Lastname",
    picture:
      "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png",
    comment:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Nesciunt autem iusto sequi eius exercitationem, nihil aliquam consequatur repudiandae, nulla cupiditate expedita explicabo praesentium.",
  },
];
const currentUser = [
    { username: "Pierre Adrien", profilePicture: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png" }
]
const deleteButtons = [];

// Appel de la fonction qui créée la section commentaire
createCommentsSection();
// Initialisation des boutons commentaires
setExistingCommentsButtons(buttonComments);
setDeleteButtons(deleteButtons);

// Initialisation des boutons submit
const buttonSubmit = document.querySelectorAll(".buttonSubmit");
setSubmitButtons(buttonSubmit);

// Créée les sections commentaires pour chaque post
function createCommentsSection() {
  const posts = document.querySelectorAll(".post");
  posts.forEach((post, index) => {
    const commentsContainer = createElementHTML("section", "commentsContainer");
    post.appendChild(commentsContainer);
    const comments = commentsSelection(index);
    // Création du champ de saisie d'un nouveau commentaire
    createCommentsSectionHeader(commentsContainer);
    // Insertion des commentaires déjà existants sur chaque post
    insertComments(commentsContainer, comments);
    // Affichage du compteur de commentaires
    commentsCount(commentsContainer);
  });
}

// Créée les éléments nécessaires à l'ajout d'un nouveau commentaire
function createCommentsSectionHeader(commentsContainer) {
    const commentsSectionHeader = createElementHTML('div', 'commentsSectionHeader');
    commentsContainer.appendChild(commentsSectionHeader);
    const commentInput = createElementHTML('input', 'commentInput');
    commentInput.placeholder = "write a new comment";
    commentsSectionHeader.appendChild(commentInput);
    const submitButton = document.createElement('button');
    submitButton.classList.add('buttonSubmit', 'basicStyleButton');
    submitButton.innerText = "Submit";
    commentsSectionHeader.appendChild(submitButton);
    //setDeleteButton(deleteButtons)
}

// Insère les commentaires existants dans leur post respectif
function insertComments(commentContainer, comments) {
  comments.forEach((comment) => {
    // Création des éléments pour chaque commentaire à afficher
    commentContainer.appendChild(
      createCommentElements(comment.name, comment.comment, comment.picture)
    );
  });
}


// Créée l'ensemble des éléments composant un commentaire
function createCommentElements(username, comment, picture) {
    const commentBox = createElementHTML('article', 'commentBox');
    const commentProfile = createElementHTML('div', 'commentProfile');
    commentBox.appendChild(commentProfile);
    const profilePicture = createElementHTML('img', 'commentPicture');
    profilePicture.src = picture;
    commentProfile.appendChild(profilePicture);
    const commentBody = createElementHTML('div', 'commentBody');
    commentBox.appendChild(commentBody);
    const commentHeader = createElementHTML('div', 'commentHeader');
    commentBody.appendChild(commentHeader);
    const profileName = createElementHTML('h3', 'commentName', username);
    commentHeader.appendChild(profileName);
    const deleteButton = createElementHTML('button', 'deleteButton');
    commentHeader.appendChild(deleteButton);
    if (username === "Pierre Adrien"){
        deleteButtons.push(deleteButton);
    }
    const commentText = createElementHTML('p', 'commentText', comment);
    commentBody.appendChild(commentText);
    return commentBox;
}

// Initialise un ensemble de boutons supprimer
function setDeleteButtons(buttons){
    buttons.forEach(button => {
        button.style.display = "block";
        const commentsContainer = button.closest('.commentsContainer');
        const commentBox = button.closest('.commentBox');
        setDeleteButton(button, commentsContainer, commentBox);
    });
}

// Initialise un bouton supprimer unique
function setDeleteButton(button, commentsContainer, comment) {
    button.addEventListener('click', function () {
        commentsContainer.removeChild(comment);
        commentsCount(commentsContainer);
    })
}

// Fonction permettant la création des éléments composant le nouveau commentaire
function addNewComment(commentsContainer, comment, firstComment) {
  const commentBox = createCommentElements(
    currentUser[0].username,
    comment,
    currentUser[0].profilePicture
  );
  const deleteButton = commentBox.querySelector(".deleteButton");
  deleteButton.style.display = "block";
  setDeleteButton(deleteButton, commentsContainer, commentBox);
  commentsContainer.insertBefore(commentBox, firstComment);
}

// Ajoute ou retire la classe visible aux éléments visés
function visible(commentsContainer) {
  commentsContainer.classList.toggle("visible");
}

// Permet de déclencher l'affichage de la section commentaire
// correspondant au post lors d'un clic sur le bouton commentaire
function initialiseCommentsButtons(buttonComments) {
  buttonComments.forEach((button) => {
    button.addEventListener("click", function () {
      const currentPost = button.closest(".post");
      const commentContainer = currentPost.querySelector(".commentsContainer");
      visible(commentContainer);
    });
  });
}

// Initialise l'ensemble des boutons commentaires
function setExistingCommentsButtons(buttonsComments) {
  buttonsComments.forEach((button) => {
    setCommentButton(button);
  });
}

// Initialise un bouton commentaire
function setCommentButton(button) {
  button.addEventListener("click", function () {
    const currentPost = button.closest(".post");
    const commentContainer = currentPost.querySelector(".commentsContainer");
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
  buttons.forEach((button) => {
    button.addEventListener("click", function () {
      const commentsContainer = button.closest(".commentsContainer");
      const comment = commentsContainer.querySelector("input").value;
      if (!(comment === "")) {
        button.previousSibling.value = "";
        firstComment = commentsContainer.querySelector(".commentBox");
        addNewComment(commentsContainer, comment, firstComment);
        commentsCount(commentsContainer);
      }
    });
  });
}

// Permet de calculer le nombre de commentaires et l'affichage sur le bouton
function commentsCount(commentsContainer) {
  const currentPost = commentsContainer.closest(".post");
  const commentCount = currentPost.querySelectorAll(".commentBox").length;
  const buttonComment = currentPost.querySelector(".buttonComments");
  buttonComment.innerText = `${commentCount} Commentaires`;
}

//Like button
const likeButton = document.querySelector(".buttonLike");
const likePic = document.querySelector(".likePicture");

likePic.addEventListener("click", function (e) {
  e.preventDefault();

  if (
    likePic.src ===
    "http://127.0.0.1:5500/assets/thumbs-up-solid-yellowWild.svg"
  ) {
    likePic.src = "http://127.0.0.1:5500/assets/thumbs-up-solid-green.svg";
    likePic.alt = "Green thumbs up you liked this post";
    console.log("Premier if");
  } else if (
    likePic.src === "http://127.0.0.1:5500/assets/thumbs-up-solid-green.svg"
  ) {
    likePic.src = "http://127.0.0.1:5500/assets/thumbs-up-solid-red.svg";
    likePic.alt = "Red thumbs up you unliked this post";
    console.log("Second If");
  } else {
    likePic.src = "http://127.0.0.1:5500/assets/thumbs-up-solid-green.svg";
    likePic.alt = "Green thumbs up you liked this post";
    console.log("In the else");
  }
});
