   const sampleSentences = [
     "The quick brown fox jumps over the lazy dog.",
     "Typing is a skill that improves with practice.",
     "JavaScript is a powerful language for web development.",
     "She sells seashells by the seashore.",
     "The rain in Spain stays mainly in the plain.",
     "Every expert was once a beginner.",
     "Keep calm and code on.",
     "Practice makes perfect in everything you do.",
     "Success is the sum of small efforts repeated daily.",
     "A journey of a thousand miles begins with a single step."
];

function getRandomSentence() {
    const randomIndex = Math.floor(Math.random()*sampleSentences.length);
    let randomSentence = sampleSentences[randomIndex];
    document.getElementById("sampleText").innerText = randomSentence;
}
    
    const startButton = document.getElementById("startButton");
    const testStarted = document.getElementById("testStarted");
    const restartbutton = document.getElementById("restartButton");
    const userInput = document.getElementById("userInput");
    const results = document.getElementById("results");
    const initial = document.getElementById("initial");
    const accuracy = document.getElementById("accuracy");
    const wpm = document.getElementById("wpm");
    const mistakes = document.getElementById("mistakes");

    let startTime, endTime;
    let timerInterval;
    let secondsElapsed = 0;

    
    function startTypingTest() {
        initial.style.display = "none";
        userInput.value = "";
        startButton.style.display = "none";
        testStarted.style.display = "block";
        userInput.focus();
        startTime= new Date().getTime();
        getRandomSentence();

        timerInterval = setInterval(() => {
        secondsElapsed++;
        document.getElementById("timer").innerText = `Time: ${secondsElapsed}s`;
        }, 1000);
    }

    function endTypingTest() {
        testStarted.style.display = "none";
        results.style.display = "none";
        initial.style.display = "block";
        startButton.style.display = "block";
    }

    function resetTypingTest() {
        userInput.value = "";
        testStarted.style.display = "block";
        userInput.focus();
        startTime= new Date().getTime();

        clearInterval(timerInterval); 
        secondsElapsed = 0; 
        document.getElementById("timer").innerText = `Time: 0s`;
        timerInterval = setInterval(() => {
        secondsElapsed++;
        document.getElementById("timer").innerText = `Time: ${secondsElapsed}s`;
        }, 1000);
    }

    function restartTypingTest() {
        initial.style.display = "block";
        results.style.display = "none";
        userInput.value = "";
        startButton.style.display = "block";
        startButton.style.justifySelf= "center";
    }

    function showResults() {
        if (userInput.value.trim() == "") {
            alert("Please type something before submitting.");
        }
        else{
            results.style.display = "block";
            testStarted.style.display = "none";
            restartbutton.style.display = "block";
            endTime = new Date().getTime();
            clearInterval(timerInterval);
            displayResults();
            restartbutton.style.justifySelf = "center";
        }
    }

    function displayResults(){
        userInput.value = userInput.value.trim();
        const sampleTextValue = document.getElementById("sampleText").innerText;
        let totalChars = sampleTextValue.length;
        let correctChars = 0;
        let mistakesValue = 0;
        for (let i = 0; i < userInput.value.length && i < sampleTextValue.length; i++) {
            if (userInput.value[i] === sampleTextValue[i]) {
                correctChars++;
            }
            else{
                mistakesValue++;
            }
        }

        let accuracyValue = (correctChars / totalChars) * 100;
        let timeTaken = (endTime - startTime) / 1000; // in seconds
        let wpmValue = (correctChars / 5) / (timeTaken / 60); // words per minute

        accuracy.innerText = `Accuracy: ${accuracyValue}`;
        wpm.innerText = `WPM: ${wpmValue}`;
        mistakes.innerText = `Mistakes: ${mistakesValue}`;
    }