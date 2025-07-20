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
    
    function startTypingTest() {
        initial.style.display = "none";
        userInput.value = "";
        startButton.style.display = "none";
        testStarted.style.display = "block";
        userInput.focus();
        startTime= new Date().getTime();
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
    }

    function restartTypingTest() {
        initial.style.display = "block";
        results.style.display = "none";
        userInput.value = "";
        startButton.style.display = "block";
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