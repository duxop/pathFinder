import './navbar.css'

export default function NavBar(prop) {

    return (
        <div>
            <div className="navbar">
                    <h1 className="header">PathFinder</h1>
                    <div className='form'>
                        <label htmlFor='algo'>Select an Algorithm</label>
                        <select name="algo" id="cars" onChange={prop.handleChangesAlgo}>
                            <option value="BFS">BFS</option>
                            <option value="DFS">DFS</option>
                            <option value="Dijkstra" >Dijkstra</option>
                        </select>
                    </div>
                    <div className='form'>
                    
                        <p>Add Wall</p>
                        <label className="switch">
                                <input type={'checkbox'} onChange={prop.handleChangesWalls}/>
                                <span className="slider round"></span>
                        </label>
                        <p>Add Weight</p>
                    </div>
                    <button className="add-button" onClick={prop.addNode}>Add a Node</button>
                    <button className="visualize-button" onClick={prop.visualise}> Visualize </button>
                    <button className="reset-button" onClick={prop.resetWallsAndWeight}> Reset </button>
                    
            </div>
            <></>
        </div>
    )
}