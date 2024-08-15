import React, { useEffect, useState } from 'react'

function App() {
  const [posts, setPosts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    setIsLoading(true)
    fetch('http://localhost:3003/posts')
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
        return response.json()
      })
      .then((data) => {
        console.log('Fetched data:', data) // Log the fetched data
        setPosts(data)
        setIsLoading(false)
      })
      .catch((e) => {
        console.error('Fetch error:', e)
        setError(e.message)
        setIsLoading(false)
      })
  }, [])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>

  return (
    <div>
      <h1>Notion Blog</h1>
      {posts.length === 0 ? (
        <p>No posts found.</p>
      ) : (
        <ul>
          {posts.map((post) => (
            <li key={post.id}>
              <h2>
                {post.properties?.Name?.title?.[0]?.text?.content || 'Untitled'}
              </h2>
              <p>
                {post.properties?.Content?.rich_text?.[0]?.text?.content ||
                  'No content'}
              </p>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
