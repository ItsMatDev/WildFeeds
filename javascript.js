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

            // Done

            // Create the button to share post

            const buttonShare = document.createElement('button');
            
            
            buttonShare.classList.add("buttonShare");
            buttonShare.classList.add("basicStyleButton");
            buttonShare.innerHTML = " Share!"

            

            // Done
            
            buttonBox.appendChild(buttonCreate);


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
    const buttonSubmit = document.querySelectorAll('.buttonSubmit');
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
        const commentInput = document.createElement('input');
        commentInput.classList.add('commentInput');
        commentInput.placeholder = "write a new comment";
        input.appendChild(commentInput);
        const submitButton = document.createElement('button');
        submitButton.classList.add('buttonSubmit');
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


    buttonSubmit.forEach(button => {
        button.addEventListener('click', function () {
            const commentContainer = button.closest('.commentContainer');
        })
    })


    // Ajouter un nouveau commentaire saisi par l'utilisateur
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

