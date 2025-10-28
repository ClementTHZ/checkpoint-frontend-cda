import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export function NewCountryForm() {
    const navigate = useNavigate(); 
    const [country, setCountry] = useState({
        name: "", 
        code: "", 
        emoji: "", 
    });

    function handleChangeName (e: React.ChangeEvent<HTMLInputElement>) {
        setCountry({...country, name: e.target.value})
    };

    function handleChangeCode (e: React.ChangeEvent<HTMLInputElement>) {
        setCountry({...country, code: e.target.value})

    };

    function handleChangeEmoji (e: React.ChangeEvent<HTMLInputElement>) {
        setCountry({...country, emoji: e.target.value})

    };

    // function handleChangeContinent (e: React.ChangeEvent<HTMLSelectElement>) {
    //     setCountry({...country, continent: e.target.value})
    // };

    async function addCountry(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault()
        const url = "http://localhost:4000/graphql"; 
        const response = await fetch(url, {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json'}, 
            body: JSON.stringify({
                query: `
                    mutation AddCountry($data: NewCountryInput!){
                        addCountry(data: $data) {
                            code
                            name
                            emoji
                        }
                    }
                `, 
                variables: {data: country}
            })
        }); 
        const result = await response.json(); 
        console.log(result)
        navigate("/")
    }

    useEffect(() => {
        console.log(country)
    }, [country])
    return (
        <div className="form-container">
            <form>
                <input type="text" placeholder="Nom" onChange={handleChangeName}/>

                <input type="text" placeholder="Code" onChange={handleChangeCode}/>

                <input type="text" placeholder="Emoji" onChange={handleChangeEmoji}/>

                {/* <select onChange={handleChangeContinent}>
                    <option value="">Sélectionner un continent</option>
                    <option value="Europe">Europe</option>
                    <option value="Asie">Asie</option>
                    <option value="Afrique">Afrique</option>
                    <option value="Amérique du Nord">Amérique du Nord</option>
                    <option value="Amérique du Sud">Amérique du Sud</option>
                    <option value="Océanie">Océanie</option>
                </select> */}

                <button type="submit" className="button-cadet" onClick={(e) => addCountry(e)}>Ajouter</button>
            </form>
        </div>
    )
}