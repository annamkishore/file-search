"use client"

import {useEffect, useRef, useState} from "react";

export default function Home1() {
    let [query, setQuery] = useState("")
    let [result, setResult] = useState("")

    let runCommand = () => {
        let url = `http://localhost:3000/api/search?q=${query}`
        console.log(url)
        fetch(url).then(val => val.json()).then(setResult)
    }

    let onEnter = e => {
        if(e.key !== 'Enter') return
        setQuery(e.target.value)
    }

    useEffect(runCommand, [query])

    return <>
        <div>
            Search/Command <input onKeyDown={onEnter}/> <br/>
            Entered: {query} <br/>
            Result: {result.name}
        </div>
    </>
}
