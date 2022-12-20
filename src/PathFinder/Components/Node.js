import './Node.css'


export default function Node(prop) {

    let moreClasses = prop.isStart ? "start"
     : prop.isEnd ? "end" 
     : prop.isMid ? "mid"
     : prop.isPath ? "path"
     : prop.isWall ? "wall"
     : prop.isVisited ? "visited"
     : ""
    const showImage = prop.weight===5 
                        && !prop.isEnd 
                        && !prop.isStart 
                        && !prop.isMid 
                        && !prop.isWall
    return (
        <div className={`node ${moreClasses}`} 
            onMouseDown={prop.mouseDown} 
            onMouseEnter={prop.mouseEnter}
            onMouseUp={prop.mouseUp}
            onMouseLeave={prop.mouseLeave}>
                {showImage && <img className='image' src={require('../../illust58-5797-01-removebg-preview.png')}></img>}
        </div>
    )
}