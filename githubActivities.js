// githubActivities.js
// This script automates the creation of GitHub issues using the GitHub API.

import axios from 'axios';

const token = process.env.GITHUB_TOKEN; // Use the token from GitHub Actions environment
const repo = 'moqaddasQA/commit-art';
const authHeader = { headers: { Authorization: `token ${token}` } };

// Function to create a GitHub issue
const createIssue = async (title, body) => {
  if (!token) {
    console.log('No GITHUB_TOKEN found — skipping issue creation.');
    return;
  }
  try {
    const response = await axios.post(
      `https://api.github.com/repos/${repo}/issues`,
      { title, body },
      authHeader
    );
    console.log('Issue created:', response.data.html_url);
  } catch (error) {
    console.error('Error creating issue:', error.message);
  }
};

createIssue("Automated Issue Title", "This issue was created programmatically.");
