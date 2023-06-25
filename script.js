//document elems

const users = document.querySelector('.users-grid');

const uiinput = document.querySelector('#useridinput');
const titleinput = document.querySelector('#titleinput');
const texteria = document.querySelector('.add-post').querySelector('textarea');

const postButton = document.querySelector('.add-post').querySelector('button');

const pics = document.querySelector(".photos-cont");

//Pre-requisites
let commentId = 0;
let currentUser;
let currentComment = {
    userId: null,
    id: null,
    title: null,
    body: null
};

//functioncs

async function getJSONData(link) {
    const response = await fetch(link);
    const jsonData = await response.json();
    console.log(jsonData)
    return jsonData;
}

async function generateUsers() {
    const data = await getJSONData("https://jsonplaceholder.typicode.com/users");
    data.forEach((chile) => {
        users.insertAdjacentHTML('beforeend', `
            <div class="user-info-select-cont" data-userid=${chile.id}>
                <h2>${chile.name}</h2>
                    <div class="uinfops">
                        <p>ID: ${chile.id}</p>
                        <p>EMAIL: ${chile.email}</p>
                        <p>PHONE: ${chile.phone}</p>
                    </div>
                <button class="general-btn" data-userid=${chile.id}>Select User</button>
            </div>
        `);
    });
    currentUser = data[0].id;
    uiinput.placeholder = currentUser;
}
async function generatePhotos() {
    const data = await getJSONData("https://jsonplaceholder.typicode.com/photos");
    let limit = 0;
    while (limit < 20) {
        pics.insertAdjacentHTML('beforeend', `
            <img src=${data[limit].url}/>
        `);
        limit++;
    }
}

async function postComment() {
    await fetch("https://jsonplaceholder.typicode.com/posts", {
        method: "POST",
        body: JSON.stringify(currentComment),
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    });
    currentComment = {
        userId: null,
        id: null,
        title: null,
        body: null
    };
    titleinput.value = '';
    texteria.value = '';
}

//Initial calls

generateUsers();

generatePhotos();


//eventListeners

users.addEventListener("click", (e) => {
    const etarget = e.target;
    if (etarget.classList.contains('general-btn')) {
        currentUser = etarget.dataset.userid;
    }
    uiinput.placeholder = currentUser;
});

postButton.addEventListener('click', () => {
    currentComment.userId = uiinput.placeholder;
    currentComment.title = titleinput.value;
    currentComment.commentId = commentId;
    currentComment.body = texteria.value;
    commentId++;
    postComment();
})