var i = 0;
var totalQuestions = 5; // Make sure this matches the total number of questions

function updateProgressBar() {
    var progressBarFill = document.querySelector('.progress-bar-fill');
    var progress = (i / totalQuestions) * 100;
    progressBarFill.style.width = progress + '%';
}

function nextQuestion() {
    if (i < totalQuestions) { // Ensure i doesn't exceed total questions
        i++;
        document.getElementById(i).style.display = "block";
        document.getElementById(i - 1).style.display = "none";
        updateProgressBar(); // Update progress bar on next question
    }
}

function previousQuestion() {
    if (i > 0) { // Ensure i doesn't go below 0
        i--;
        document.getElementById(i).style.display = "block";
        document.getElementById(i + 1).style.display = "none";
        updateProgressBar(); // Update progress bar on previous question
    }
}

function ifSo() {
    document.getElementById("ifSoQuestion").style.display = "block";
}

// Function to collect form data and log it
function submitData() {
    // Get form data from all forms
    var form1Data = new FormData(document.getElementById('form1'));
    var form2Data = new FormData(document.getElementById('form2'));
    var form3Data = new FormData(document.getElementById('form3'));

    // Convert form data to an object
    var data = {
        teamName: form1Data.get('teamName'),
        teamNumber: form1Data.get('teamNumber'),
        side: form2Data.getAll('side'),  // Multiple choices (left or right)
        auton: form3Data.get('auton'),
        samplesScored: form3Data.get('samplesScored')
    };

    // Log data to the console (optional)
    console.log(data);

    // Send data to SheetsDB
    fetch('https://sheetdb.io/api/v1/1qoz4ag4t4j7l', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        // You can handle success response here (e.g., show a success message)
    })
    .catch((error) => {
        console.error('Error:', error);
        // You can handle error response here (e.g., show an error message)
    });
}


