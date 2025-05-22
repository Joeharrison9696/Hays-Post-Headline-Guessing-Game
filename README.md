Eagle Media - Headline Challenge Game
🚀 Description
The "Headline Challenge Game" is a fun, interactive quiz designed for local news readers of Eagle Media's "Post" websites (e.g., Hays Post, Hutch Post, etc.). Players are presented with the beginning of a recent local headline and must choose the correct ending from four multiple-choice options.

The game aims to:

Increase reader engagement with local news content.

Drive traffic back to the news articles by providing a direct link to the story after each question.

Offer a fresh, weekly challenge by using current headlines.

Promote media literacy and awareness of local happenings.

This project is built as a static web application using HTML, CSS, and vanilla JavaScript, making it easy to deploy on platforms like GitHub Pages.

✨ Features
Multiple-Choice Quiz: Engaging and easy-to-understand gameplay.

Weekly Headline Updates: Game content is designed to be updated weekly with fresh headlines from the specific "Post" site.

Direct Story Links: After answering a question, players get a link to read the full news story on the respective "Post" website.

Score Tracking: Players see their score at the end of the game.

Shareable Results: A pre-formatted text with emoji results (🟩 for correct, 🟥 for incorrect) can be easily copied and shared on social media.

Modern & Responsive Design: Clean, appealing interface that works well on desktop and mobile devices.

Site-Specific Versions: The game is designed to be deployed as a separate instance for each "Post" site, with its own unique set of headlines.

🎮 How to Play
Start the Game: Click the "Start Game" button.

Answer Questions:

Read the beginning of the headline.

Choose what you believe is the correct ending from the four options provided.

Get Feedback: See if your answer was correct or incorrect.

Read the Story (Optional): After answering, a link to the full news article will appear. Click it to learn more!

Next Question: Click "Next Question" to proceed.

View Score: Once all questions are answered, your final score will be displayed.

Share Results: Copy your emoji-based score summary and share it with friends!

🛠️ Technical Setup
The game consists of three main files and one data file per site:

index.html: The main structure of the game page.

style.css: Contains all the styling for the game's appearance and animations.

game.js: Holds all the JavaScript logic for game functionality, including fetching data, displaying questions, handling answers, and calculating scores.

[sitename]_headlines.json (e.g., hayspost_headlines.json): A JSON file containing the questions for a specific "Post" site. This file needs to be updated weekly.

JSON Data Structure ([sitename]_headlines.json)
Each JSON file must follow this structure:

{
  "siteName": "Name of the Post Site (e.g., Hays Post)",
  "gameTitle": "Game Title for this Site (e.g., Hays Post Headline Challenge!)",
  "lastUpdated": "YYYY-MM-DD (Date of last headline update)",
  "questions": [
    {
      "headlineStart": "The beginning part of the headline...",
      "options": [
        "Incorrect option 1",
        "Correct option",
        "Incorrect option 2",
        "Incorrect option 3"
      ],
      "correctAnswer": "The exact text of the correct option",
      "storyURL": "[https://www.yourpostsite.com/link-to-the-full-story](https://www.yourpostsite.com/link-to-the-full-story)"
    }
    // ... more question objects (ideally 10 per week)
  ]
}

Important:

Ensure the storyURL links directly to the relevant article on the news website.

The correctAnswer must exactly match one of the strings in the options array.

🔄 Weekly Content Update Process
To keep the game fresh and relevant, the [sitename]_headlines.json file for each "Post" site needs to be updated weekly (e.g., every Monday).

Gather Headlines: Collect the top 5-10 prominent local headlines from the specific "Post" website for the past week.

Formulate Questions: For each headline:

Write the headlineStart (the portion shown to the player).

Create one correctAnswer (the actual ending of the headline).

Create three plausible but incorrect options (distractors).

Find the storyURL for the full article.

Update JSON: Edit the corresponding [sitename]_headlines.json file with the new questions, ensuring the structure above is maintained. Update the lastUpdated date.

Commit and Push:

Commit the changes to the updated JSON file in your local Git repository.

Push the commit to the GitHub repository.

If using GitHub Pages, the site will automatically rebuild and deploy with the new headlines.

🌐 Deployment
This game is ideal for deployment as a static site using GitHub Pages.

Create a Repository: If you haven't already, create a GitHub repository for the game. You might have one main repository with branches/folders for each "Post" site, or separate repositories for each.

Upload Files: Add index.html, style.css, game.js, and the site-specific [sitename]_headlines.json to the repository.

Configure GitHub Pages:

Go to your repository on GitHub.

Click on "Settings."

Scroll down to the "GitHub Pages" section.

Choose the branch to deploy from (usually main or master).

Select the folder (usually /root or /docs if your files are in a docs folder).

Click "Save."

GitHub will provide you with the URL where your game is live (e.g., https://yourusername.github.io/repository-name/).

🎨 Customization for Different "Post" Sites
To create a version of the game for a different "Post" site (e.g., Hutch Post, Salina Post):

Duplicate Files: Copy the index.html, style.css, and game.js files.

Create New JSON: Create a new JSON data file specific to that site (e.g., hutchpost_headlines.json). Populate it with headlines, questions, and story URLs relevant to Hutch Post.

Update game.js:

Open the game.js file for this new site version.

Locate the line: const JSON_FILE_NAME = 'localpost_headlines.json';

Change 'localpost_headlines.json' to the name of your new JSON file (e.g., 'hutchpost_headlines.json').

Update JSON Content:

In your new [sitename]_headlines.json file, update the siteName and gameTitle fields to reflect the new site (e.g., "siteName": "Hutch Post", "gameTitle": "Hutch Post Headline Challenge!").

Deploy: Deploy this new set of files as a separate static site or in a subfolder of your existing GitHub Pages site.

This README should provide a good overview for anyone looking to understand, use, or contribute to the Headline Challenge Game project.
