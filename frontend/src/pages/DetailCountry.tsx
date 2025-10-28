import { useEffect, useState } from "react"; 
import { useParams } from "react-router-dom";
import { Country } from "../types";

export function DetailCountry() {
    const { code } = useParams(); 
    const [country, setCountry] = useState<Country>()

    async function fetchData({ code }: {code: string }) {
        const url = "http://localhost:4000/graphql";
        const response = await fetch(url, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, 
            body: JSON.stringify({
                query: `
                    query Country($code: String!) {
                        country(code: $code) {
                            code
                            name
                            emoji
                            continent {
                                name
                            }
                        }
                    }
                `,
                variables: { code: code }
            })
        });

        const data = await response.json(); 
        console.log(data)
        setCountry(data.data.country)
    }

    useEffect(() => {
        if(!code) return
        fetchData({code})
    },[code])

    // if(!country?.continent || country.continent.name === null){
    //     return(
    //         <div className="page-container">
    //             <div className="country-card">
    //                 <h1 className="emoji">{country?.emoji}</h1>
    //                 <p>Name: {country?.name}</p>
    //             </div>
    //         </div>
    //     )
    // } else {
        return(
            <div className="page-container">
                <div className="country-card">
                    <h1 className="emoji">{country?.emoji}</h1>
                    <p>Name: {country?.name}</p>
                    <p>Continent: {country?.continent?.name}</p>
                </div>
            </div>
        )
    // }
}