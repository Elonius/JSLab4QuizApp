window.onload = function () {
    loadDataFromFileAndShowInPage("GeographyQuiz.json");
};

function loadDataFromFileAndShowInPage(fileName) {

    var url = fileName; // file name or server-side process name
    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
            //buildPage(xmlhttp.responseText); // do something when server responds
            parseJson(xmlhttp.responseText);
        }
    };
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
}

function parseJson(t) {
    quiz = JSON.parse(t); // Object
    q = quiz.questions; // Array
    i = 0; // Global variable
    results = [];
    buildPage(q[0]);
}

function buildPage(arr) {
    // Mapping buttons to functions
    document.querySelector("#btnNext").addEventListener("click", nextQuestion);
    document.querySelector("#btnPrevious").addEventListener("click", previousQuestion);
    document.querySelector("#btnSubmit").addEventListener("click", submitQuiz);
    buildQuiz(arr); // Sending array to function

    // // Mapping buttons to functions
    // btnNext = document.querySelector("#btnNext");
    // btnNext.addEventListener("click", nextQuestion);

    // btnPrevious = document.querySelector("#btnPrevious");
    // btnPrevious.addEventListener("click", previousQuestion);
}

function buildQuiz(obj) {
    document.querySelector("#title").innerHTML = quiz.title; // Displaying title from object

    let questionCard = "";

    questionCard += "<div id=question[" + (i + 1) + "] class=card>";
    questionCard += "<div class=questionNum>Question " + (i + 1) + "</div><br>";
    questionCard += "<div class=question>" + obj.questionText + "</div><br>";
    questionCard += "<div class=choices>";
    questionCard += "<input type=radio name=q[" + i + "] value=" + 0 + ">" + obj.choices[0] + "</input>" + "<br>";
    questionCard += "<input type=radio name=q[" + i + "] value=" + 1 + ">" + obj.choices[1] + "</input>" + "<br>";
    questionCard += "<input type=radio name=q[" + i + "] value=" + 2 + ">" + obj.choices[2] + "</input>" + "<br>";
    questionCard += "<input type=radio name=q[" + i + "] value=" + 3 + ">" + obj.choices[3] + "</input>" + "<br>";
    questionCard += "</div><br>";
    //questionCard += "<button type=button id=btnPrevious>Previous</button>"
    //questionCard += "<button type=button class=btnNext>Next</button>"
    questionCard += "</div>";

    checkFirst(obj);
    checkLast(obj);

    document.querySelector("#content").innerHTML = questionCard;
    // checked();
}

function checkFirst(obj) {
    if (obj == q[0]) {
        document.querySelector("#btnPrevious").disabled = true;
        document.querySelector("#btnSubmit").style.visibility = 'hidden';
    } else {
        document.querySelector("#btnPrevious").removeAttribute('disabled');
    }
}

function checkLast(obj) {
    let lastQuestion = q.length - 1;
    if (obj == q[lastQuestion]) {
        document.querySelector("#btnNext").disabled = true;
        document.querySelector("#btnSubmit").style.visibility = 'visible';
    } else {
        document.querySelector("#btnNext").removeAttribute('disabled');
        document.querySelector("#btnSubmit").style.visibility = 'hidden';
    }
}

function nextQuestion() {
    checked();
    i++;
    if (q[i] !== undefined) {
        buildQuiz(q[i]);
    }

}

function previousQuestion() {
    i--;
    if (q[i] !== undefined) {
        buildQuiz(q[i]);
    }
}

function checked() {
    let items = document.querySelectorAll("input[type='radio']:checked");
    for (let i = 0; i < items.length; i++) {
        // console.log(items[i].name);
        // console.log(items[i].value);
        results.push(items[i].value)
    }
}

function submitQuiz() {
    let items = document.querySelectorAll("input[type='radio']:checked");
    // Puts checked radio button values into an array
    for (let i = 0; i < items.length; i++) {
        results.push(items[i].value)
    }
    // Checks if array length is lower than objects arrays length
    if (results.length < q.length) {
        alert("Are you sure you want to submit without answering all questions?");
    } else {
        buildResultsPage();
    }
    console.log(results); // *********Delete*********
}

function buildResultsPage() {
    document.querySelector("#title").innerHTML = quiz.title + " - Results"; // Displaying title from object
    document.querySelector("#content").innerHTML = "";
    let resultsPage = "";
    resultsPage += "<div id=resultsDiv>";

    // Builds results page
    for (let i = 0; i < q.length; i++) {
        const q = quiz.questions[i];

        resultsPage += "<div class=questionNum>Question " + (i + 1) + "</div><br>";
        resultsPage += "<div class=question>" + q.questionText + "</div><br>";
        resultsPage += "<div class=choices>";
        resultsPage += "<input type=radio name=q[" + i + "] value=" + i + ">" + q.choices[0] + "</input>" + "<br>";
        resultsPage += "<input type=radio name=q[" + i + "] value=" + i + ">" + q.choices[1] + "</input>" + "<br>";
        resultsPage += "<input type=radio name=q[" + i + "] value=" + i + ">" + q.choices[2] + "</input>" + "<br>";
        resultsPage += "<input type=radio name=q[" + i + "] value=" + i + ">" + q.choices[3] + "</input>" + "<br>";
        resultsPage += "</div><br>";

        if (results[i] == q.answer) {
            resultsPage += "Your answer is correct.<br><br>";
        } else {
            resultsPage += "Your answer is incorrect. The correct answer is <u>" + q.choices[q.answer] + "</u><br><br><br>";
        }
    }
    resultsPage += "</div>";

    document.querySelector("#content").innerHTML = resultsPage;
    hideBtns();
}

function hideBtns() {
    document.querySelector("#btnNext").style.visibility = 'hidden';
    document.querySelector("#btnPrevious").style.visibility = 'hidden';
    document.querySelector("#btnSubmit").style.visibility = 'hidden';
}

// function buildQuiz(arr) {
//     document.querySelector("#title").innerHTML = quiz.title; // Displaying title from object
//     let questionCard = "";
//     let array = [];

//     // Build a div for every loop
//     for (let i = 0; i < arr.length; i++) {
//         const q = arr[i];

//         questionCard += "<div id=question[" + (i + 1) + "] class=card>";
//         questionCard += "<div class=questionNum>Question " + (i + 1) + "</div><br>";
//         questionCard += "<div class=question>" + q.questionText + "</div><br>";
//         questionCard += "<div class=choices>";
//         questionCard += "<input type=radio name=q[" + i + "] value=" + i + ">" + q.choices[0] + "</input>" + "<br>";
//         questionCard += "<input type=radio name=q[" + i + "] value=" + i + ">" + q.choices[1] + "</input>" + "<br>";
//         questionCard += "<input type=radio name=q[" + i + "] value=" + i + ">" + q.choices[2] + "</input>" + "<br>";
//         questionCard += "<input type=radio name=q[" + i + "] value=" + i + ">" + q.choices[3] + "</input>" + "<br>";
//         questionCard += "</div>";
//         questionCard += "</div>";
//     }

//     document.querySelector("#content").innerHTML = questionCard;
// }