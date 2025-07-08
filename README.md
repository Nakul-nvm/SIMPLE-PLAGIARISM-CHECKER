# Simple Plagiarism Checker (Client-Side JavaScript Version)

A lightweight, client-side web application that calculates a basic cosine-similarity percentage between user-submitted text and a reference database text (`database1.txt`). This project demonstrates how to build a minimal “plagiarism detector” using pure JavaScript, HTML, and CSS, running entirely in the browser.

---

## Table of Contents

- [Features](#features)
- [Folder Structure](#folder-structure)
- [Usage](#usage)
- [How It Works](#how-it-works)
- [Customizing / Extending](#customizing--extending)

---

## Features

- Simple web form to paste or type input text.
- Computes cosine-similarity (%) against a single reference file (`database1.txt`) fetched by the client.
- Returns a “match percentage” with a dynamic circular progress bar and result card that appears only after checking.
- Responsive, minimal CSS styling (gradient background, centered card).
- Runs entirely in the browser; no server-side processing or Python/Flask dependencies.

---

## Folder Structure

```
Simple-Plagiarism-Checker/
│
├── index.html             # Main HTML file with the form and result display
├── script.js              # JavaScript logic for plagiarism checking and UI updates
├── style.css              # Main stylesheet for layout & colors
└── database1.txt          # Reference text file for "database" comparison
```

- **`index.html`**
  - Contains the HTML structure for the input form, result display area, and progress circle.
  - Links to `style.css` for styling and `script.js` for functionality.

- **`script.js`**
  - Handles form submission.
  - Fetches `database1.txt` from the same directory.
  - Implements the cosine similarity algorithm (tokenization, vocabulary building, term-frequency vectors, calculation).
  - Updates the DOM to display the plagiarism percentage and animate the progress circle.

- **`style.css`**
  - Defines a gradient background, fonts, button styles, container styling, progress circle, and result formatting.

- **`database1.txt`**
  - A plain text file used as the reference document for comparison.

---

## Usage

1. **Open `Simple-Plagiarism-Checker/index.html`** directly in any modern web browser (e.g., Chrome, Firefox, Safari, Edge).
   - No installation or server setup is required.
2. **Paste or type your text** into the “Input Text” textarea.
3. Click **“Check Plagiarism”**.
4. The result will be displayed below the button, showing:
   - A textual message with the match percentage.
   - A circular progress bar visually representing the percentage.

---

## How It Works (Client-Side JavaScript)

1.  **User Input**: The user enters text into the textarea in `index.html`.
2.  **Event Listener**: `script.js` listens for the form submission.
3.  **Fetch Database**: Upon submission, `script.js` uses the `fetch` API to asynchronously retrieve the content of `database1.txt`.
4.  **Tokenization**:
    - Both the user’s input and the fetched database text are converted to lowercase.
    - A simple regex (`match(/\w+/g)`) is used to extract words (tokens), removing punctuation and splitting by non-word characters.
    - This results in two arrays of words.
5.  **Vocabulary Building**:
    - A combined list of unique words (`universalSetOfUniqueWords`) is created using a `Set` from all words in both the input and database texts.
6.  **Term-Frequency (TF) Vectors**:
    - For each word in the universal vocabulary, the script counts its occurrences in the user's input (creating `queryTF` vector) and in the database text (creating `databaseTF` vector).
    - This produces two equal-length numerical vectors.
7.  **Cosine Similarity Calculation**:
    - **Dot Product**: Calculated by summing the element-wise products of the TF vectors.
    - **Magnitudes**: The magnitude (or length) of each TF vector is calculated as the square root of the sum of the squares of its elements.
    - **Similarity**: Cosine similarity is `(dot_product) / (magnitude_query * magnitude_database)`. This value is then multiplied by 100 to get a percentage.
    - If either vector has a magnitude of 0 (e.g., empty input or empty database file), the similarity is 0%.
8.  **Displaying Results**:
    - The calculated percentage and a descriptive message are injected into the appropriate HTML elements (`#progressMessage`, `#progressText`).
    - The stroke-dashoffset of an SVG circle element is animated to visually represent the percentage in the progress ring.

---

## Customizing / Extending

- **Multiple Reference Files**:
  - Modify `script.js` to fetch and process multiple database files. You could then display an average similarity or the highest match.
- **TF-IDF Weighting**:
  - For more sophisticated analysis, implement TF-IDF (Term Frequency-Inverse Document Frequency) weighting. This would require a broader corpus to calculate IDF values effectively.
- **Stopword Removal & Stemming/Lemmatization**:
  - Integrate a client-side natural language processing library (e.g., a JavaScript port of a stemming algorithm or a lightweight NLP library) to remove common stopwords and reduce words to their root forms for more accurate comparisons.
- **File Upload for Input/Database**:
  - Enhance `index.html` and `script.js` to allow users to upload their own text files for checking or to use as a custom database, using the File API.
- **Improved UI/UX**:
  - Use a more comprehensive CSS framework (like Bootstrap or Tailwind CSS, though this adds to the project size) or refine the existing CSS for a more polished user interface and experience.
- **Web Workers for Performance**:
  - For very large texts or more complex calculations, consider using Web Workers to offload the processing from the main browser thread, preventing UI freezes.

---

This project was converted from a Flask-based application to a pure client-side JavaScript application.
The original Flask version was built by NAKUL KUMAR.
