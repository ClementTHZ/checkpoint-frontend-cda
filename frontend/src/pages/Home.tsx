import { useEffect, useState } from "react"
import { Country } from "../types";
import { Link } from "react-router-dom";

export function HomePage() {
  const [countries, setCountries] = useState<Country[]>()

  async function fetchCountries () {
    const url = "http://localhost:4000/graphql";

    const response = await fetch(url, {
      method: 'POST', 
      headers: {'Content-Type': 'application/json' },
      body: JSON.stringify({
        query: `
          query {
            countries {
              id
              code
              name
              emoji
            }
          }
        `
      })
    })
    const data = await response.json();
    setCountries(data.data.countries);
  }; 

  useEffect(() => {
    fetchCountries()
  }, []);

  return (
    <div className="container">
      <div className="card-container">
        {countries?.map((country) => (
          <Link to={`/${country.code}`}>
            <div className="carte">
              <p>{country.name}</p>
              <p>{country.code}</p>
              <p>{country.emoji}</p>
            </div>
          </Link>
        ))}
      </div>
      <Link to={"/addCountryForm"}>
        <button className="button">Ajouter un pays</button>
      </Link>
    </div>
  )
}
