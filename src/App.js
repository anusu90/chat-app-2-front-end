import { BrowserRouter as Router, Route, } from 'react-router-dom';



import Join from "./components/join/join"
import Chat from "./components/chat/chat"



export default function App() {

    const data = { "a": 1, "b": 2 }

    return (
        <Router>
            <Route path="/" exact component={Join}></Route>
            <Route path="/chat" render={(routeProps) => <Chat routeProps={routeProps} {...data} />}></Route>
        </Router>
    )

}