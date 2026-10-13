
const API_URL = 'https://jsonplaceholder.typicode.com/posts';

export async function fetchPosts(signal) {
  const response = await fetch(API_URL, { signal });

  // fetch does not reject automatically for HTTP 404 or 500.
  if (!response.ok) {
    throw new Error(`Request failed with status ${response.status}`);
  }

  const data = await response.json();

  if (!Array.isArray(data)) {
    throw new Error('The API returned an unexpected response.');
  }

  return data;
}
