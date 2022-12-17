import './Node.css'


export default function Node(prop) {

    let moreClasses = prop.isStart ? "start"
     : prop.isEnd ? "end" 
     : prop.isPath ? "path"
     : prop.isWall ? "wall"
     : prop.isVisited ? "visited"
     : prop.weight === 2 ? "weight"
     : ""

    return (
        <div className={`node ${moreClasses}`} 
            onMouseDown={prop.mouseDown} 
            onMouseEnter={prop.mouseEnter}
            onMouseUp={prop.mouseUp}
            onMouseLeave={prop.mouseLeave}>
                <p>{prop.weight}</p>
        </div>
    )
}