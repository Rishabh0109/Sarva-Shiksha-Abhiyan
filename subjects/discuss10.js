const submit = document.getElementById("submit");
const newQues = document.getElementById("newQues");
const questionDisplayed = document.getElementById("questionDisplayed");
const searchQues = document.getElementById("searchQues");
const subject = document.getElementById("subject");
const question = document.getElementById("question");
const addedQues = document.getElementById("addedQues");
const right = document.getElementById("right");
const upperDiv = document.getElementById("upperDiv");
const middleDiv = document.getElementById("middleDiv");
const lowerDiv = document.getElementById("lowerDiv");
const resolveBtnDiv = document.getElementById("resolveBtnDiv");
const commBtnDiv = document.getElementById("commBtnDiv");
const firstRight = document.getElementById("firstRight");
const commentArea = document.getElementById("commentArea");
const inputName = document.getElementById("inputName");
const resDiv = document.getElementById("resDiv");

const QUESTION = "questions";
var quesList = [];
let stringyData = localStorage.getItem(QUESTION);
if (stringyData) {
  quesList = JSON.parse(stringyData);
}

function pushToUI(quesList) {
  addedQues.innerHTML = "";
  // console.log(addedQues);
  quesList.forEach(function (value) {
    addToUI(value);
  });
}
pushToUI(quesList);

submit.addEventListener("click", function () {
  let subjectName = subject.value;
  let questionValue = question.value;
  if (subjectName!="" && questionValue!="") {
    let quesObj = {
      id: Date.now(),
      type: subjectName,
      desc: questionValue,
      comments: [],
    };
    quesList.push(quesObj);
    // console.log(quesList);
    addInLocalStorage(quesList);
     pushToUI(quesList);
    
  }
});

function addInLocalStorage(quesList) {
  let stringForm = JSON.stringify(quesList);
  localStorage.setItem(QUESTION, stringForm);
 
}

function addToUI(value) {
  var ulDiv = document.createElement("div");
  ulDiv.setAttribute("id", "ulDiv");
  var subLi = document.createElement("li");
  subLi.setAttribute("id", "subLi");
  var quesLi = document.createElement("li");
  quesLi.setAttribute("id", "quesLi");
  subLi.innerHTML = value.type;
  quesLi.innerHTML = value.desc;
  ulDiv.appendChild(subLi);
  ulDiv.appendChild(quesLi);
  addedQues.appendChild(ulDiv);
  ulDiv.addEventListener("click", function () {
    showResponses(value.id, ulDiv);
    // console.log(value);
  });
  subject.value = "";
  question.value = "";
}

function showResponses(id, ulDiv) {
 // console.log(quesList)
  quesList.forEach(function (value) {
    if (value.id === id) {
      // console.log(value.id);
      firstRight.style.display = "none";
      upperDiv.style.display = "flex";
      middleDiv.style.display = "flex";
      lowerDiv.style.display = "flex";
      questionDisplayed.innerHTML = "";
      commBtnDiv.innerHTML = "";
      resolveBtnDiv.innerHTML = "";
      let upperSubLi = document.createElement("li");
      upperSubLi.setAttribute("id", "upperSubLi");
      let upperQuesLi = document.createElement("li");
      upperQuesLi.setAttribute("id", "upperQuesLi");
      upperSubLi.innerHTML = value.type;
      upperQuesLi.innerHTML = value.desc;
      questionDisplayed.appendChild(upperSubLi);
      questionDisplayed.appendChild(upperQuesLi);
      resDiv.innerHTML = "";
      right.style.height = "38vw";
      // searchQues.value = "";

      value.comments.forEach(function (value) {
        resDiv.style.display = "block";
        let responseDiv = document.createElement("div");
        responseDiv.setAttribute("id", "responseDiv");
        let nameLi = document.createElement("li");
        nameLi.setAttribute("id", "nameLi");
        let commLi = document.createElement("li");
        commLi.setAttribute("id", "commLi");
        nameLi.innerHTML = value.author;
        commLi.innerHTML = value.comment;
        responseDiv.appendChild(nameLi);
        responseDiv.appendChild(commLi);
        resDiv.appendChild(responseDiv);
      });
      let submitComment = document.createElement("input");
      submitComment.setAttribute("id", "submitComment");
      submitComment.type = "button";
      submitComment.value = "Submit";
      commBtnDiv.appendChild(submitComment);
      submitComment.addEventListener("click", function () {
        showComments(value);
      });
      let resolve = document.createElement("input");
      resolve.setAttribute("id", "resolve");
      resolve.type = "button";
      resolve.value = "Resolve";
      resolveBtnDiv.appendChild(resolve);
      resolve.addEventListener("click", function () {
        right.style.height = "33vw";
        upperDiv.style.display = "none";
        middleDiv.style.display = "none";
        lowerDiv.style.display = "none";
        firstRight.style.display = "";
        addedQues.removeChild(ulDiv);
        console.log(value);
        resolvefromlocal(value);
      });
    }
  });
}

function showComments(value) {
  // console.log(value);
  resDiv.style.display = "block";
  let commentObj = {
    author: inputName.value,
    comment: commentArea.value,
  };
  value.comments.push(commentObj);
  addInLocalStorage(quesList);
  let responseDiv = document.createElement("div");
  responseDiv.setAttribute("id", "responseDiv");
  let nameLi = document.createElement("li");
  nameLi.setAttribute("id", "nameLi");
  let commLi = document.createElement("li");
  commLi.setAttribute("id", "commLi");
  nameLi.innerHTML = inputName.value;
  commLi.innerHTML = commentArea.value;
  responseDiv.appendChild(nameLi);
  responseDiv.appendChild(commLi);
  resDiv.appendChild(responseDiv);
  inputName.value = "";
  commentArea.value = "";
}

function resolvefromlocal(removeobject) {
  quesList = quesList.filter(function (value) {
    if (value != removeobject) return true;
  });
  addInLocalStorage(quesList);
}

newQues.addEventListener("click", function () {
  right.style.height = "33vw";
  firstRight.style.display = "flex";
  upperDiv.style.display = "none";
  middleDiv.style.display = "none";
  lowerDiv.style.display = "none";
});

searchQues.addEventListener("keyup", function() {
  const word  = searchQues.value;
  let searchResult = quesList.filter(function (object) {
      if(object.type.toLowerCase().includes(word.toLowerCase()) || object.desc.toLowerCase().includes(word.toLowerCase()))
          return true;
  })
  if(word.length && !searchResult.length && addedQues.innerHTML.length)
   {
       addedQues.innerHTML ="";
       let message = document.createElement("h3");
       message.style.padding = "2vw 2vw 0vw 2vw";
       message.innerHTML = "no matches found...";
     addedQues.appendChild(message);
  }
  else
      pushToUI(searchResult);
})