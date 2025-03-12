// commit.js
// This script writes a formatted timestamp to data.json and creates multiple Git commits with unique timestamps.

import moment from 'moment';
import { writeFile } from 'fs/promises';
import simpleGit from 'simple-git';

// Define the path to data.json
const jsonFilePath = './data.json';

// Initialize simple-git
const git = simpleGit();

// Array of realistic commit messages
const messages = [
  "Fix typo in README",
  "Update documentation for setup",
  "Add feature X to module Y",
  "Refactor function Z for better performance",
  "Update dependencies",
  "Add unit tests for component A",
  "Fix issue #123 in user authentication",
  "Improve error handling in API calls",
  "Enhance UI responsiveness",
  "Optimize database queries",
  "Update styling for mobile view",
  "Integrate third-party API for payments",
  "Add logging for debug purposes",
  "Resolve merge conflict in main branch",
  "Update environment configuration",
  "Improve test coverage",
  "Remove deprecated code",
  "Update library versions",
  "Fix alignment issue in footer",
  "Refactor user authentication logic"
];

// Function to create commits across many days
async function makeCommits(days, commitsPerDay) {
  // Loop through the past 'days' days to create commits
  for (let day = 0; day < days; day++) {
    // For each day, loop to create multiple commits
    for (let commit = 0; commit < commitsPerDay; commit++) {
      // Calculate a unique timestamp for each commit
      const commitDate = moment().subtract(day, 'days').subtract(commit, 'minutes').format();
      
      // Create the commit data object with the new timestamp
      const commitData = {
        date: commitDate
      };

      // Write the updated commit data to data.json
      try {
        await writeFile(jsonFilePath, JSON.stringify(commitData, null, 2));
        console.log(`data.json updated for day ${day + 1}, commit ${commit + 1} with date: ${commitDate}`);
      } catch (error) {
        console.error('Error writing to data.json:', error);
        // Optionally continue to the next commit if there's an error
        continue;
      }

      // Select a random commit message from the array
      const commitMessage = messages[Math.floor(Math.random() * messages.length)] + ` on ${commitDate}`;

      // Stage, commit, and log the commit
      try {
        await git.add([jsonFilePath]);
        await git.commit(commitMessage);
        console.log(`Committed: ${commitMessage}`);
      } catch (error) {
        console.error('Error during git commit:', error);
      }
    }
  }

  // Once all commits are made, push them to the remote repository.
  try {
    await git.push();
    console.log('Pushed all commits successfully.');
  } catch (error) {
    console.error('Error pushing commits:', error);
  }
}

// Call the function to create commits for the past 292 days with 5 commits per day.
makeCommits(292, 5);
