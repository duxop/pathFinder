import './Node.css'


export default function Node(prop) {

    let moreClasses = prop.isStart ? "start"
     : prop.isEnd ? "end" 
     : prop.isMid ? "mid"
     : prop.isPath2 ? "path2"
     : prop.isPath ? "path"
     : prop.isWall ? "wall"
     : prop.isVisited2 ? "visited2"
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
            onMouseLeave={prop.mouseLeave}
            onClick={prop.mouseClick}>
                {showImage && <img className='image' src={require('../../illust58-5797-01-removebg-preview.png')}></img>}
        </div>
    )
}