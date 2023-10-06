const createPostButton = document.querySelector(".createPost");
const buttonRemoves = document.querySelectorAll(".buttonRemovesPicture");
const buttonShare = document.querySelectorAll(".buttonShare");
const buttonModify = document.querySelectorAll(".buttonModifyPicture");
const elementContainerOfPosts = document.body.querySelector(".columnOfPosts");

// Fonction qui crée un élement HTML, avec une/des class css associé et du texte à l'intérieur

function createElementHTML(elementHTML, className, text = "", src = "", alt = "") {
  const element = document.createElement(elementHTML);
  element.className = className;
  element.innerHTML = text;
  element.src = src;
  element.alt = alt;
  return element;
}

// Fonction qui donne une action au bouton Removes

function setButtonRemoves(buttonArray) {
  buttonArray.forEach((button) => {
    const parentPost = button.closest(".post");
    const currentUserName = parentPost.querySelector(".userName");
    if (currentUserName.innerHTML === "Pierre Adrien") {
      button.addEventListener("click", () => {
        elementContainerOfPosts.removeChild(parentPost);
      });
    } else {
      button.style.display = "none";
    }
  });
}

// Fonction qui supprime des noeuds d'un parent
function removeChilds(parentNode, firstNode, secondNode = "") {
  parentNode.removeChild(firstNode);
  parentNode.removeChild(secondNode);
}

// Fonction qui ajoute des noeuds à un parent
function appendChilds(parentNode, firstNode, secondNode) {
  parentNode.appendChild(firstNode);
  parentNode.appendChild(secondNode);
}

// Fonction qui donne une action au bouton Modify

function setButtonModify(buttonArray) {
  buttonArray.forEach((button) => {
    const parentPost = button.closest(".post");
    const currentUserName = parentPost.querySelector(".userName");
    if (currentUserName.innerHTML === "Pierre Adrien") {
      button.addEventListener("click", () => {
        const currentPostContentTextPicture = parentPost.querySelector(".postContentTextPicture");
        const currentPostContentText = parentPost.querySelector(".postContentText");
        const currentPostContentPicture = parentPost.querySelector(".postContentPicture");
        const inputText = parentPost.querySelector(".postContentText");
        const inputImage = parentPost.querySelector(".postContentPicture");
        parentPost.querySelector(".postContentPicture");

        removeChilds(currentPostContentTextPicture, currentPostContentText, currentPostContentPicture);

        const modifyContentInputText = createElementHTML("input", "commentInput");
        modifyContentInputText.value = inputText.innerHTML;
        const modifyContentInputImage = createElementHTML("input", "commentInput");
        modifyContentInputImage.value = inputImage.src;
        const postParentContent = parentPost.querySelector(".postContentTextPicture");
        appendChilds(postParentContent, modifyContentInputText, modifyContentInputImage);
        const buttonConfirm = createElementHTML("button", "buttonConfirm basicStyleButton", "Modify");
        const buttonComments = parentPost.querySelector(".buttonComments");
        const buttonBox = parentPost.querySelector(".buttonBox");
        buttonBox.appendChild(buttonConfirm);

        buttonComments.style.display = "none";
        buttonConfirm.addEventListener("click", () => {
          buttonComments.style.display = "initial";
          buttonConfirm.style.display = "none";
          const postContentText = createElementHTML("p", "postContentText");
          const postContentTextPicture = parentPost.querySelector(".postContentTextPicture");
          const postContentPicture = createElementHTML("img", "postContentPicture");
          appendChilds(postContentTextPicture, postContentText, postContentPicture);

          postContentText.innerHTML = modifyContentInputText.value;
          postContentPicture.src = modifyContentInputImage.value;
          postContentPicture.alt = "";

          removeChilds(postParentContent, modifyContentInputText, modifyContentInputImage);
        });
      });
    } else {
      button.style.display = "none";
    }
  });
}

// Fonction qui donne une action au bouton share

function setButtonShare(buttonArray) {
  buttonArray.forEach((button) => {
    button.addEventListener("click", () => {
      const parentPost = button.closest(".post");
      const sharedPost = parentPost.cloneNode(true);
      const sharedPostContainer = createElementHTML("div", "sharedPostContainer");
      const postLogoName = parentPost.querySelector(".postHead").cloneNode(true);
      appendChilds(sharedPostContainer, postLogoName, sharedPost);
      document.body.insertBefore(sharedPostContainer, sharedPost.nextSibling);
      const currentUserNamePostShared = sharedPostContainer.querySelector(".userName");
      currentUserNamePostShared.innerHTML = "Shared By Pierre Adrien";

      elementContainerOfPosts.insertBefore(sharedPostContainer, createPostButton.nextSibling);
      const buttonRemove = sharedPostContainer.querySelectorAll(".buttonRemovesPicture");
      buttonRemove[0].style.display = "initial";
      buttonRemove.forEach((button) => {
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
        parentPostButtonShare.innerHTML = parentPostButtonShare.dataset.shareCount + " Share";
      } else {
        parentPostButtonShare.dataset.shareCount = parseInt(parentPostButtonShare.dataset.shareCount) + 1;
        parentPostButtonShare.innerHTML = parentPostButtonShare.dataset.shareCount + " Shares";
      }

      const buttonComs = sharedPostContainer.querySelector(".buttonComments");
      buttonComs.style.display = "none";
      const buttonShare = sharedPostContainer.querySelector(".buttonShare");
      buttonShare.style.display = "none";
      const buttonLike = sharedPostContainer.querySelector(".buttonLike");
      buttonLike.style.display = "none";
      const buttonRemovesParent = sharedPostContainer.querySelector(".post .buttonRemoves");
      buttonRemovesParent.style.display = "none";
    });
  });
}

setButtonModify(buttonModify);
setButtonRemoves(buttonRemoves);
setButtonShare(buttonShare);

// Donne une action au bouton crée un nouveau post

createPostButton.addEventListener("click", () => {
  const template = document.body.querySelector(".postTemplate");
  const cloneTemplate = template.content.cloneNode(true);
  const newPost = cloneTemplate.querySelector("article");
  createPostButton.insertAdjacentElement("afterend", newPost);

  const userName = document.querySelector(".userName");
  userName.innerHTML = "Pierre Adrien";
  const inputText = createElementHTML("input", "commentInput");
  const inputImage = createElementHTML("input", "commentInput");
  inputText.style.marginBlock = "1rem";
  inputImage.style.marginBottom = "1rem";

  newPost.querySelector(".postContentTextPicture").appendChild(inputText);
  inputText.placeholder = "Écris ton texte ici";
  newPost.querySelector(".postContentTextPicture").appendChild(inputImage);
  inputImage.placeholder = "Place l'URL de ton image ici";

  // Crée le bouton qui crée un nouveau post

  const buttonBox = document.querySelector(".buttonBox");
  const buttonCreate = createElementHTML("button", "buttonCreate basicStyleButton", "Create");

  buttonBox.appendChild(buttonCreate);

  // Donne une action au bouton crée

  buttonCreate.addEventListener("click", () => {
    const inputTextValue = inputText.value;
    const inputImageValue = inputImage.value;
    const postContentText = createElementHTML("p", "postContentText");
    const postContentTextPicture = newPost.querySelector(".postContentTextPicture");
    const postContentPicture = createElementHTML("img", "postContentPicture", "", inputImageValue, "");
    appendChilds(postContentTextPicture, postContentText, postContentPicture);
    postContentText.innerHTML = inputTextValue;
    buttonCreate.style.display = "none";

    // Création de la section commentaire du nouveau post

    const newCommentsContainer = createElementHTML("section", "commentsContainer");
    newPost.appendChild(newCommentsContainer);
    createCommentsSectionHeader(newCommentsContainer);
    const newSubmitButton = newPost.querySelectorAll(".buttonSubmit");
    setSubmitButtons(newSubmitButton);

    // Création du bouton commentaires du nouveau post

    const buttonComment = createElementHTML("button", "buttonComments basicStyleButton", "Commentaires");
    buttonBox.appendChild(buttonComment);
    setCommentButton(buttonComment);
    commentsCount(newCommentsContainer);
    removeChilds(postContentTextPicture, inputText, inputImage);
  });

  elementContainerOfPosts.insertBefore(newPost, createPostButton.nextSibling);

  const buttonRemoves = newPost.querySelectorAll(".buttonRemovesPicture");
  setButtonRemoves(buttonRemoves);
  const buttonModifys = newPost.querySelectorAll(".buttonModifyPicture");
  setButtonModify(buttonModifys);
});

// Gestion de l'espace commentaires

const buttonComments = document.querySelectorAll(".buttonComments");
const deleteButtons = [];

const comments = [
  [
    {
      name: "Emmanuel Macron",
      picture: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png",
      comment: "Bonne chance à tous pour vos présentations!",
    },
    {
      name: "Lucas",
      picture: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png",
      comment: "This is my moment of glory!!!",
    },
    {
      name: "Pierre Adrien",
      picture: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png",
      comment: "Merci Manu!",
    },
  ],
  [
    {
      name: "Lucas",
      picture: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png",
      comment: "Il manque les formateurs",
    },
    {
      name: "Pierre Adrien",
      picture: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png",
      comment: "Super promo!",
    },
  ],
  [
    {
      name: "Matthieu",
      picture: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png",
      comment: "Miam!",
    },
    {
      name: "Pierre Adrien",
      picture: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png",
      comment: "Je cherche toujours les restos dans le coin",
    },
  ],
  [
    {
      name: "Pierre Adrien",
      picture: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png",
      comment: "Click!",
    },
    {
      name: "Matthieu",
      picture: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png",
      comment: "J'ai déjà terminé le jeu :)",
    },
  ],

  [
    {
      name: "Hélène",
      picture: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png",
      comment: "Il ressemble pas à ça!",
    },
    {
      name: "Matthieu",
      picture: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png",
      comment: "Le projet fil rouge de la promo!",
    },
  ],
];

const currentUser = [
  {
    username: "Pierre Adrien",
    profilePicture: "https://cdn.pixabay.com/photo/2014/04/02/10/25/man-303792_640.png",
  },
];

// Appel de la fonction qui créée la section commentaire
createCommentsSection();
// Initialisation des boutons commentaires
setExistingCommentsButtons(buttonComments);
setDeleteButtons(deleteButtons);

// Initialisation des boutons submit
const buttonsSubmit = document.querySelectorAll(".buttonSubmit");
setSubmitButtons(buttonsSubmit);

// Créée les sections commentaires pour chaque post
function createCommentsSection() {
  const posts = document.querySelectorAll(".post");
  posts.forEach((post, index) => {
    const commentsContainer = createElementHTML("section", "commentsContainer");
    post.appendChild(commentsContainer);
    const postComments = comments[index];
    // Création du champ de saisie d'un nouveau commentaire
    createCommentsSectionHeader(commentsContainer);
    // Insertion des commentaires déjà existants sur chaque post
    insertComments(commentsContainer, postComments);
    // Affichage du compteur de commentaires
    commentsCount(commentsContainer);
  });
}

// Créée les éléments nécessaires à l'ajout d'un nouveau commentaire
function createCommentsSectionHeader(commentsContainer) {
  const commentsSectionHeader = createElementHTML("div", "commentsSectionHeader");
  commentsContainer.appendChild(commentsSectionHeader);
  const commentInput = createElementHTML("input", "commentInput");
  const submitButton = createElementHTML("button", "buttonSubmit basicStyleButton", "Submit");
  commentInput.placeholder = "Écris ton commentaire ici";
  appendChilds(commentsSectionHeader, commentInput, submitButton);
}

// Insère les commentaires existants dans leur post respectif
function insertComments(commentContainer, comments) {
  comments.forEach((comment) => {
    // Création des éléments pour chaque commentaire à afficher
    commentContainer.appendChild(createCommentElements(comment.name, comment.comment, comment.picture));
  });
}

// Créée l'ensemble des éléments composant un commentaire
function createCommentElements(username, comment, picture) {
  const commentBox = createElementHTML("article", "commentBox");
  const profilePicture = createElementHTML("img", "commentPicture", "", picture, "user profile picture");
  commentBox.appendChild(profilePicture);
  const commentBody = createElementHTML("div", "commentBody");
  commentBox.appendChild(commentBody);
  const commentHeader = createElementHTML("div", "commentHeader");
  commentBody.appendChild(commentHeader);
  const profileName = createElementHTML("h3", "commentName", username);
  commentHeader.appendChild(profileName);
  if (username === "Pierre Adrien") {
    const deleteButton = createElementHTML("button", "deleteButton");
    commentHeader.appendChild(deleteButton);
    deleteButtons.push(deleteButton);
  }
  const commentText = createElementHTML("p", "commentText", comment);
  commentBody.appendChild(commentText);
  return commentBox;
}

// Initialise un ensemble de boutons supprimer
function setDeleteButtons(buttons) {
  buttons.forEach((button) => {
    const commentsContainer = button.closest(".commentsContainer");
    const commentBox = button.closest(".commentBox");
    setDeleteButton(button, commentsContainer, commentBox);
  });
}

// Initialise un bouton supprimer unique
function setDeleteButton(button, commentsContainer, comment) {
  button.style.display = "block";
  button.addEventListener("click", function () {
    commentsContainer.removeChild(comment);
    commentsCount(commentsContainer);
  });
}

// Fonction permettant la création des éléments composant le nouveau commentaire
function addNewComment(commentsContainer, comment, firstComment) {
  const commentBox = createCommentElements(currentUser[0].username, comment, currentUser[0].profilePicture);
  const deleteButton = commentBox.querySelector(".deleteButton");
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
  if (commentCount > 0) {
    if (commentCount > 1) {
      buttonComment.innerText = `${commentCount} Comments`;
    } else {
      buttonComment.innerText = `${commentCount} Comment`;
    }
    buttonComment.style.padding = "10px 20px";
  } else {
    buttonComment.innerText = `Be the first to comment`;
    buttonComment.style.padding = "10px";
  }
}

//Bouton like avec compteur de like
const likeButton = document.querySelectorAll(".buttonLike");
let likeCount = 0;

function setlikeButton(buttons) {
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const parentPost = button.closest(".post");
      const likePic = parentPost.querySelector(".likePicture");
      const likeCountElement = parentPost.querySelector(".likeCount");

      if (likePic.src === "http://127.0.0.1:5500/assets/like-empty.svg") {
        likePic.src = "http://127.0.0.1:5500/assets/like-full.svg";
        likePic.alt = "thumbs up full you liked this post";
        likeCount += 1;
        likeCountElement.textContent = likeCount;
      } else if (likePic.src === "http://127.0.0.1:5500/assets/like-full.svg") {
        likePic.src = "http://127.0.0.1:5500/assets/like-empty.svg";
        likePic.alt = "thumbs up empty you unliked this post";
        likeCount -= 1;
        likeCountElement.textContent = likeCount;
      }
    });
  });
}

setlikeButton(likeButton);
