import { writeFile } from 'fs/promises';
import simpleGit from 'simple-git';

const git = simpleGit();

const messages = [
  "add input validation to login form",
  "fix session timeout not resetting on activity",
  "update README with setup instructions",
  "refactor user profile fetch logic",
  "add loading state to dashboard charts",
  "fix typo in error message",
  "remove unused variable in auth module",
  "add retry logic for failed API calls",
  "update eslint config",
  "fix broken link in docs",
  "add unit tests for utils",
  "handle edge case in date formatter",
  "improve error messages in API responses",
  "add pagination to user list",
  "clean up console logs",
  "fix alignment issue in mobile nav",
  "update .env.example with new variables",
  "optimize image loading",
  "add debounce to search input",
  "fix race condition in data fetch",
  "improve accessibility on settings page",
  "add missing aria labels",
  "update node version in CI",
  "fix flaky test in user service",
  "extract constants to config file",
];

// Different files to touch so it doesn't always hit the same one
const files = ['data.json', 'config.json', 'settings.json'];

function rand(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Spread commits across realistic working hours (weighted toward 9am–7pm)
function realisticTimestamp() {
  const hourWeights = [
    0, 0, 0, 0, 0, 0, 0,        // 0–6am: nobody coding
    0.2, 0.8,                    // 7–8am: early birds
    2, 3, 3, 2.5,                // 9am–12pm: peak morning
    2, 3, 3, 2.5,                // 1pm–4pm: peak afternoon
    2, 1.5, 1,                   // 5pm–7pm: winding down
    0.8, 0.4, 0.2, 0.1          // 8pm–11pm: late night
  ];
  const total = hourWeights.reduce((a, b) => a + b, 0);
  let r = Math.random() * total;
  let hour = 0;
  for (let i = 0; i < hourWeights.length; i++) {
    r -= hourWeights[i];
    if (r <= 0) { hour = i; break; }
  }
  const d = new Date();
  d.setHours(hour, rand(0, 59), rand(0, 59), 0);
  return d.toISOString();
}

async function makeCommits() {
  const dayOfWeek = new Date().getDay(); // 0=Sun, 6=Sat
  const isWeekend = dayOfWeek === 0 || dayOfWeek === 6;

  // Skip ~50% of weekend days, ~10% of weekdays
  const skipChance = isWeekend ? 0.50 : 0.10;
  if (Math.random() < skipChance) {
    console.log('No commits today.');
    return;
  }

  // Realistic count: mostly 2–4, occasionally 1 or up to 7
  const pool = [1, 2, 2, 3, 3, 3, 4, 4, 4, 5, 5, 6, 7];
  const count = pool[rand(0, pool.length - 1)];
  console.log(`Making ${count} commit(s) today.`);

  for (let i = 0; i < count; i++) {
    const timestamp = realisticTimestamp();
    const file = files[rand(0, files.length - 1)];
    const message = messages[rand(0, messages.length - 1)];
    const content = { updated: timestamp, rev: rand(1000, 9999) };

    await writeFile(`./${file}`, JSON.stringify(content, null, 2));
    await git.add([`./${file}`]);
    // --date sets author date so commits appear on the right day in the graph
    await git.commit(message, [`./${file}`], { '--date': timestamp });
    console.log(`  [${i + 1}/${count}] ${message}`);
  }

  await git.push();
  console.log('Pushed.');
}

makeCommits().catch(console.error);
