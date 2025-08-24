// Sample dataset (users.json)
const users = [
  { id: 1, name: "Alice", email: "alice@email.com" },
  { id: 2, name: "Bob", email: null },
  { id: 3, name: "Alice", email: "alice@email.com" },
];

// Mock API to fetch missing data
async function fetchUserData(id) {
  return { email: `user${id}@email.com` };
}

// Optimize this function:
async function processUsers(users) {
  let results = new Map();
  
  for (let i = 0; i < users.length; i++) {
    let user = users[i];
    
    // Keep the existing if block that looks up the email address if it is null
    if (!user.email) {
      let enriched = await fetchUserData(user.id);
      user.email = enriched.email;
    }
    
    // Check if the email address exists in the results map using has()
    if (results.has(user.email)) {
      // If the email address already exists as a key in the map, continue to the next entry
      continue;
    }
    
    // If the email address does not exist as a key in the map, add an entry
    // with the current email address as the key and the current entry of users as the value
    results.set(user.email, user);
  }
  
  // After the loop finishes, return the values of the map as an array
  return Array.from(results.values());
}

module.exports = processUsers;