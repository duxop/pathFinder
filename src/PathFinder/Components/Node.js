import './Node.css'


export default function Node(prop) {

    let moreClasses = prop.isStart ? "start"
     : prop.isEnd ? "end" 
     : prop.isWall ? "wall"
     : prop.isVisited ? "visited"
     : ""

    return (
        <div className={`node ${moreClasses}`} onClick={prop.makeWall}></div>
    )
}