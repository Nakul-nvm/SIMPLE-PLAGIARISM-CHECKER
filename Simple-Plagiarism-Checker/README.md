# Simple Plagiarism Checker

A lightweight Flask-based web application that calculates a basic cosine-similarity percentage between user-submitted text and a reference database text. This project demonstrates how to build a minimal “plagiarism detector” using pure Python (no external machine-learning libraries) alongside Flask for the web interface and Jinja2 templating for rendering.

---

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Folder Structure](#folder-structure)
- [Usage](#usage)
- [How It Works](#how-it-works)
- [Customizing / Extending](#customizing--extending)

---

## Features

- Simple web form to paste or type input text.
- Computes cosine-similarity (%) against a single reference file (`database1.txt`).
- Returns a “match percentage” with a dynamic circular progress bar and result card that appears only after checking.
- Responsive, minimal CSS styling (gradient background, centered card).
- Uses only Python’s standard library (no external NLP/ML dependencies beyond Flask).

---

## Prerequisites

- Python 3.7+
- `pip` (Python package manager)

You’ll also need to install Flask:

```bash
pip install Flask
```

---

## Installation

1. **Clone (or create) the repository**:

   ```bash
   git clone <your-repo-URL>
   cd <repo-name>
   ```

2. **Set up a virtual environment (recommended)**:

   ```bash
   python3 -m venv venv
   source venv/bin/activate   # macOS/Linux
   venv\Scripts\activate      # Windows
   ```

3. **Install Flask** (if you haven’t already):

   ```bash
   pip install Flask
   ```

4. **Verify that your folder structure looks like this**:

   ```
   Simple-Plagiarism-Checker/
   ├── database1.txt
   ├── plag.py
   ├── requirements.txt  # (optional) if you pin Flask version
   ├── static/
   │   └── style.css
   └── templates/
       └── index.html
   ```

---

## Folder Structure

```
Simple-Plagiarism-Checker/
│
├── static/                # CSS, JS, images (served at /static/…)
│   └── style.css          # Main stylesheet for layout & colors
│
├── templates/             # Flask/Jinja2 templates
│   └── index.html         # HTML form + result display
│
├── database1.txt          # Reference text file for “database” comparison
│
├── plag.py                # Flask application & cosine-similarity logic
│
└── requirements.txt       # Contains all required Python packages (Flask and dependencies)
```

- **`plag.py`**

  - Implements two Flask routes:

    - `GET /` → renders `index.html` with empty fields.
    - `POST /` → reads `query` from the form, tokenizes and lowercases it, reads `database1.txt`, builds word counts, computes cosine similarity, and re-renders `index.html` with `query` and `output`.

- **`templates/index.html`**

  - Contains Jinja2 placeholders (`{{ query }}`, `{{ output }}`) and a link to `{{ url_for('static', filename='style.css') }}`.

- **`static/style.css`**

  - Defines a gradient background, fonts, button styles, container styling, and result formatting.

---

## Usage

1. **Run the Flask app**:

   ```bash
   python plag.py
   ```

2. **Open a web browser** and go to:

   ```
   http://127.0.0.1:5000
   ```

3. **Paste or type your text** into the “Input Text” textarea.

4. Click **“Check Plagiarism”**.

5. The page will reload (styled exactly the same), displaying:

   - Your original text (still in the textarea).
   - Below, a line like:

     ```
     Input query text matches 42.37% with database.
     ```

---

## How It Works

1. **Tokenization**

   - Both the user’s input and the contents of `database1.txt` are converted to lowercase and run through a simple regex (`re.sub(r"[^\w]", " ", text).split()`) that removes punctuation and splits on whitespace.
   - The result is two Python lists of “words” (strings).

2. **Vocabulary Building**

   - A combined list called `universalSetOfUniqueWords` is assembled by iterating over every word in both token lists and appending it only if it’s not already included. This yields one flat list of unique tokens.

3. **Term-Frequency Vectors**

   - For each unique token, we count how many times it appears in the user’s word list (`queryTF`) and how many times it appears in the database’s word list (`databaseTF`).
   - That produces two equal-length integer vectors, each of length = “number of unique words.”

4. **Cosine-Similarity Calculation**

   - **Dot product** = sum of element-wise products (e.g., `sum(queryTF[i] * databaseTF[i] for i in range(n))`).
   - **Magnitude** of each vector = square root of the sum of squares of its elements (e.g., `math.sqrt(sum(q*q for q in queryTF))`).
   - **Cosine similarity** = `(dot_product) / (||queryTF|| * ||databaseTF||)`. Multiplying by 100 yields a percentage. If either vector has magnitude 0 (i.e., empty input or empty database), we output `0.00%` to avoid division by zero.

5. **Rendering the Result**

   - We build a string, e.g.

     ```
     Input query text matches 73.45% with database.
     ```

   - Then we call:

     ```python
     return render_template("index.html", query=inputQuery, output=output)
     ```

     so that Jinja2 injects the user’s original text back into the `<textarea>` and displays the `output` inside an `<h3>`.

---

## Customizing / Extending

- **Multiple Reference Files**

  - Instead of reading a single `database1.txt`, you could loop through a folder of reference texts, compute similarity against each, and display the top matches.

- **TF-IDF Weighting**

  - Replace raw term-frequency counts with TF-IDF weights. You could use `scikit-learn`’s `TfidfVectorizer` to generate sparse vectors, then calculate cosine similarity using `sklearn.metrics.pairwise.cosine_similarity`.

- **Stopword Removal & Stemming/Lemmatization**

  - For more accurate results, integrate NLTK or SpaCy to remove common stopwords (“the,” “and,” “of,” etc.) and reduce words to their stems or lemmas.

- **AJAX / Single-Page Updates**

  - Use JavaScript (Fetch/XHR) to send the user’s text to a `/check` endpoint and update the match percentage dynamically without reloading the whole page.

- **File Upload**

  - Add a second form input (`<input type="file" …>`) so users can upload a `.txt` or `.docx` file, then read and process its contents server-side.

- **Better CSS / UI Framework**

  - Swap out the custom `style.css` for a framework like Bootstrap or Tailwind for responsive grids, modals, and more polished UI components.

---

<!-- ## License

This project is offered under the [MIT License](LICENSE). Feel free to copy, modify, and distribute. -->

---

Built with ❤️ by \[NAKUL KUMAR] — a simple demonstration of Flask + cosine‐similarity for basic plagiarism detection.
