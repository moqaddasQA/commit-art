// githubActivities.js
// This script automates the creation of GitHub issues using the GitHub API.

import axios from 'axios';

const token = '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'; // Replace with your actual GitHub token
const repo = 'moqaddasQA/commit-art'; // Replace with your GitHub username/repository
const authHeader = { headers: { Authorization: `token ${token}` } };

// Function to create a GitHub issue
const createIssue = async (title, body) => {
  try {
    const response = await axios.post(
      `https://api.github.com/repos/${repo}/issues`,
      { title, body },
      authHeader
    );
    console.log('Issue created:', response.data.html_url);
  } catch (error) {
    console.error('Error creating issue:', error);
  }
};

// Example usage: Create an issue
createIssue("Automated Issue Title", "This issue was created programmatically.");
