// commit.js
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

// Function to create 20 commits per day for a specified number of days
async function makeCommits(days) {
  const commitsPerDay = 20; // Fixed to 20 commits per day

  for (let day = 0; day < days; day++) {
    for (let commit = 0; commit < commitsPerDay; commit++) {
      // Calculate a unique timestamp for each commit
      const commitDate = moment().subtract(day, 'days').subtract(commit, 'minutes').format();
      const commitData = {
        date: commitDate
      };

      try {
        await writeFile(jsonFilePath, JSON.stringify(commitData, null, 2));
        console.log(`data.json updated for day ${day + 1}, commit ${commit + 1} with date: ${commitDate}`);
      } catch (error) {
        console.error('Error writing to data.json:', error);
        continue;
      }

      const commitMessage = messages[Math.floor(Math.random() * messages.length)] + ` on ${commitDate}`;

      try {
        await git.add([jsonFilePath]);
        await git.commit(commitMessage);
        console.log(`Committed: ${commitMessage}`);
      } catch (error) {
        console.error('Error during git commit:', error);
      }
    }
  }

  try {
    await git.push();
    console.log('Pushed all commits successfully.');
  } catch (error) {
    console.error('Error pushing commits:', error);
  }
}

// Call the function to create commits for a specific number of days
makeCommits(10); // Adjust the number of days as needed
