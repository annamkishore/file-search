"use client"

import {useEffect, useRef, useState} from "react";

export default function Home1() {
    let [query, setQuery] = useState("")
    let [result, setResult] = useState("")

    let runCommand = () => {
        let url = `http://localhost:3000/api/search?q=${query}`
        console.log(url)
        fetch(url).then(response => response.json()).then(response => {
            console.log(response)
            if(response.error) {
                setResult(JSON.stringify(response.error))
            }else {
                let array = response.result
                setResult(array.join("\n"))
            }
        })
    }

    let onEnter = e => {
        if(e.key !== 'Enter') return
        setQuery(e.target.value)
    }

    useEffect(runCommand, [query])

    return <>
        <div>
            Search <br />
            <input style={{marginLeft: "5rem"}} size={70} onKeyDown={onEnter} /> <br/>
            Result: <br/>
            <textarea
              value={result} rows={30} cols={70} spellCheck={"false"}
              onChange={()=>{}}
              style={{lineHeight: "1.5", marginLeft: "5rem"}}>
            </textarea>
        </div>
    </>
}
