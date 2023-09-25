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

    emptyPostShareButton.addEventListener("click", (event) =>{
        
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
