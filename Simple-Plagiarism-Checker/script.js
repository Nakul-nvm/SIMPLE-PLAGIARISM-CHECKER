document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("plagiarismForm");
  const queryTextarea = document.getElementById("query");
  const resultSection = document.getElementById("resultSection");
  const progressMessage = document.getElementById("progressMessage");
  const progressText = document.getElementById("progressText");
  const progressCircle = document.querySelector(".progress-ring__circle");
  const circleRadius = progressCircle.r.baseVal.value;
  const circumference = 2 * Math.PI * circleRadius;

  progressCircle.style.strokeDasharray = `${circumference} ${circumference}`;
  progressCircle.style.strokeDashoffset = circumference;
  document.querySelector(".progress-ring__track").style.strokeDasharray = `${circumference} ${circumference}`;
  document.querySelector(".progress-ring__track").style.strokeDashoffset = 0;


  form.addEventListener("submit", async function (event) {
    event.preventDefault();
    const inputText = queryTextarea.value.trim();
    if (!inputText) {
      alert("Please enter some text to check.");
      return;
    }

    try {
      const databaseText = await fetch("database1.txt").then(response => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.text();
      });

      const percentage = calculateCosineSimilarity(inputText, databaseText);

      resultSection.style.display = "block";
      progressMessage.textContent = `Input query text matches ${percentage.toFixed(2)}% with database.`;
      progressText.textContent = `${percentage.toFixed(1)}%`;

      const offset = circumference - (percentage / 100) * circumference;
      progressCircle.style.transition = "stroke-dashoffset 0.6s ease";
      progressCircle.style.strokeDashoffset = offset;

    } catch (error) {
      console.error("Error during plagiarism check:", error);
      progressMessage.textContent = "Error checking plagiarism. Please try again.";
      progressText.textContent = "Error";
      resultSection.style.display = "block";
      progressCircle.style.strokeDashoffset = circumference; // Reset circle
    }
  });

  function calculateCosineSimilarity(query, database) {
    const queryLowerCase = query.toLowerCase();
    const databaseLowerCase = database.toLowerCase();

    const queryWordList = queryLowerCase.match(/\w+/g) || [];
    const databaseWordList = databaseLowerCase.match(/\w+/g) || [];

    const universalSetOfUniqueWords = Array.from(new Set([...queryWordList, ...databaseWordList]));

    const queryTF = universalSetOfUniqueWords.map(word => queryWordList.filter(w => w === word).length);
    const databaseTF = universalSetOfUniqueWords.map(word => databaseWordList.filter(w => w === word).length);

    let dotProduct = 0;
    for (let i = 0; i < universalSetOfUniqueWords.length; i++) {
      dotProduct += queryTF[i] * databaseTF[i];
    }

    let queryMagnitude = 0;
    for (let val of queryTF) {
      queryMagnitude += val * val;
    }
    queryMagnitude = Math.sqrt(queryMagnitude);

    let databaseMagnitude = 0;
    for (let val of databaseTF) {
      databaseMagnitude += val * val;
    }
    databaseMagnitude = Math.sqrt(databaseMagnitude);

    if (queryMagnitude === 0 || databaseMagnitude === 0) {
      return 0.0;
    }

    return (dotProduct / (queryMagnitude * databaseMagnitude)) * 100.0;
  }
});
