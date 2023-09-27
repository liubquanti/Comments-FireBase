// Ініціалізуємо Firebase
var firebaseConfig = {
    apiKey: "AIzaSyBC6DE1C4XUXpU0JY0w1SVqweQTGtnFNx0",
    authDomain: "lq-cm-tst.firebaseapp.com",
    databaseURL: "https://lq-cm-tst-default-rtdb.firebaseio.com",
    projectId: "lq-cm-tst",
    storageBucket: "lq-cm-tst.appspot.com",
    messagingSenderId: "395966889397",
    appId: "1:395966889397:web:376f7d4e2faaaf8383edfc"
};
firebase.initializeApp(firebaseConfig);

// Посилання на базу даних
var database = firebase.database().ref("comments");

// Функція для надсилання коментаря
function submitComment() {
    var name = document.getElementById("name").value;
    var comment = document.getElementById("comment").value;

    if (name && comment) {
        var newCommentRef = database.push();
        newCommentRef.set({
            name: name,
            comment: comment
        });
    }

    document.getElementById("name").value = "";
    document.getElementById("comment").value = "";
}

// Виведення коментарів
database.on("child_added", function(snapshot) {
    var comment = snapshot.val();
    var commentsDiv = document.getElementById("comments");

    var commentElement = document.createElement("div");
    commentElement.id = snapshot.key;  // Додаємо ідентифікатор для кожного коментаря
    commentElement.innerHTML = "<strong>" + comment.name + ":</strong> " + comment.comment;
    commentsDiv.appendChild(commentElement);
});

// Видалення коментаря
function deleteComment(commentId) {
    var commentElement = document.getElementById(commentId);

    if (commentElement) {
        commentElement.remove();
        database.child(commentId).remove();
    }
}
