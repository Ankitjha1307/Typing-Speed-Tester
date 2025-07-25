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
    const displayText = document.getElementById("displayText");
    const sampleText = document.getElementById("sampleText").innerText;
    const results = document.getElementById("results");
    const initial = document.getElementById("initial");
    const accuracy = document.getElementById("accuracy");
    const wpm = document.getElementById("wpm");
    const mistakes = document.getElementById("mistakes");

    let startTime, endTime;
    let timerInterval;
    let secondsElapsed = 0;
    function startTimer() {
        timerInterval = setInterval(() => {
            secondsElapsed++;
            document.getElementById("timer").innerText = `Time: ${secondsElapsed}s`;
        }, 1000);
    }

    let hasStartedTyping = false;
    userInput.addEventListener("input", () => {
        if (!hasStartedTyping) {
            hasStartedTyping = true;
            startTime = new Date().getTime();
            startTimer();
        }

        const typed = userInput.value;
        const sampleText = document.getElementById("sampleText").innerText;
        let formatted = "";

        for (let i = 0; i < typed.length; i++) {
            const char = typed[i];
            const correctChar = sampleText[i];
            if (char === correctChar) {
                formatted += `<span style="color: green;">${char}</span>`;
            } else {
                formatted += `<span style="color: red;">${char || " "}</span>`;
            }
        }
    
        displayText.innerHTML = formatted;
});

        userInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // Prevent form submission
            showResults();
            }
        })

        
    
    function startTypingTest() {
        initial.style.display = "none";
        userInput.value = "";
        startButton.style.display = "none";
        testStarted.style.display = "block";
        userInput.focus();
        getRandomSentence();
        let hasStartedTyping = false;
    }

    function endTypingTest() {
        userInput.value = "";
        displayText.innerHTML = ""; // Clear the displayed text
        testStarted.style.display = "none";
        results.style.display = "none";
        initial.style.display = "block";
        userInput.value = "";
        startButton.style.display = "block";
        startButton.style.justifySelf= "center";
        secondsElapsed = 0;
        hasStartedTyping = false;
        document.getElementById("timer").innerText = `Time: 0s`;
        clearInterval(timerInterval); 
    }

    function resetTypingTest() {
        userInput.value = "";
        displayText.innerHTML = ""; // Clear the displayed text
        clearInterval(timerInterval);
        secondsElapsed = 0;
        document.getElementById("timer").innerText = `Time: 0s`;
        hasStartedTyping = false;
        testStarted.style.display = "block";
        userInput.focus();
        getRandomSentence();
    }

    function restartTypingTest() {
        initial.style.display = "block";
        results.style.display = "none";
        userInput.value = "";
        hasStartedTyping = false;
        startButton.style.display = "block";
        startButton.style.justifySelf= "center";
        secondsElapsed = 0;
        document.getElementById("timer").innerText = `Time: 0s`;
        clearInterval(timerInterval); 
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
            displayResults();
            restartbutton.style.justifySelf = "center";
            displayText.innerHTML = "";
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

        accuracy.innerText = `Accuracy: ${accuracyValue.toFixed(2)}%`;
        wpm.innerText = `WPM: ${wpmValue.toFixed(2)}`;
        mistakes.innerText = `Mistakes: ${mistakesValue}`;
    }