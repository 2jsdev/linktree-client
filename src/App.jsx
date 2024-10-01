import { useEffect, useState } from "react"

function App() {

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  async function getAllLinks() {
    try {
      setIsLoading(true)
      const reponse = await fetch("http://localhost:4000/api/links", {
        method: "GET",
        headers: {
          'Content-Type': 'application/json'
        }
      })
  
      const result = await reponse.json()
      console.log(result)
      setData(result)
      setIsLoading(false)
    } catch (error) {
      setError(error)
      console.log(error)
    }
  }

  useEffect(() => {
   getAllLinks()
  }, [])

  if (isLoading) return <h1>esta cargando</h1>
  if (error) return <h1>{error}</h1>


  return (
    <div>
      {data && data.map(item =>{
        return <div>
            <h1>{item.name}</h1>
            <p>{item.url}</p>
            <p>{item.visible}</p>
          </div>
        })
      }
    </div>
  )
}

export default App
