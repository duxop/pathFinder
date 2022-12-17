import './navbar.css'

export default function NavBar(prop) {

    return (
        <div className="navbar">
            <h1 className="header">PathFinder</h1>
            <button className="visualize-button" onClick={prop.visualise}> Visualize </button>
        </div>
    )
}