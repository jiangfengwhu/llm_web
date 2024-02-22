import { useState } from 'react'
import {Button} from "antd-mobile";

function Home() {
    const [count, setCount] = useState(0)

    return (
        <>
            <h1>Vite + React1</h1>
            <div className="card">
                <Button onClick={() => setCount((count) => count + 1)} color={"primary"}>
                    count is {count}
                </Button>
                <p>
                    Edit <code>src/App.jsx</code> and save to test HMR
                </p>
            </div>
        </>
    )
}

export default Home
