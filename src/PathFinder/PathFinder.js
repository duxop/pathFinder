import { useEffect, useState } from "react"
import NavBar from "./Components/Navbar"
import Node from "./Components/Node"
import { BFSalgo, BFSpath} from "./SearchAlgo/BFSalgo"
import {DFSalgo, DFSpath} from "./SearchAlgo/DFSalgo"
import { DijkstraAlgo, DijkstraPath } from "./SearchAlgo/DijkstraAlgo"
import cloneDeep from "lodash.clonedeep"


export default function PathFinder() {

    const defaultStartR = 8
    const defaultStartC = 15
    const defaultEndR = 8
    const defaultEndC = 35

    const [startNodeRow, changeStartNodeRow] = useState(defaultStartR)
    const [endNodeRow, changeEndNodeRow]= useState(defaultEndR)
    const [startNodeCol, changeStartNodeCol] = useState(defaultStartC)
    const [endNodeCol, changeEndNodeCol] = useState(defaultEndC)

    const [animating,setAnimation] = useState(false)
    const [nodes, setNodes] = useState(createGrid())
    const [mouseClicked, setMouseClicked] = useState(0)
    const [selectAlgo, setAlgo] = useState("BFS")
    const [wallOrWeight, changeWallOrWeight] = useState("wall")
    const [errorVis, setErrorVis] = useState("hidden")

    

    function createGrid() {

        const node = []
        for(let row=0; row<20; ++row){
            let eachRow = []
            for(let col=0; col<48; ++col){
                eachRow.push({
                    row: row,
                    col: col,
                    isStart: row===startNodeRow && col===startNodeCol,
                    isEnd: row===endNodeRow && col===endNodeCol,
                    isWall: false,
                    isPath: false,
                    weight: 1,
                    isVisited: false,
                    distance: Infinity,
                    prevNode: null
                })
            }
            node.push(eachRow)
        }
        return node
    }

    function animateBFS(visitedNodes, path) {
        // const dis = nodes[nodes.length-1].distance+1
        // console.log(dis)

        
        setAnimation(true)
        for( let i = 0; i < visitedNodes.length; ++i){
            setTimeout(()=> {
                
                nodes[visitedNodes[i].row][visitedNodes[i].col] = visitedNodes[i]
                setNodes(cloneDeep(nodes))
                // reRender(render => render+1)

            },15*i)
            
        } 
        for( let j = 0; j < path.length; ++j){
            setTimeout(()=> {

                nodes[path[j].row][path[j].col].isPath = true
                console.log(nodes[path[j].row][path[j].col].distance)
                setNodes(cloneDeep(nodes))
                // reRender(render => render+1)

            },15*(visitedNodes.length) + 15*j)
            
        } 
        setTimeout(()=> {
            setAnimation(false)
        }, 15*(visitedNodes.length) + 15*(path.length))

    }


    function visualiseBFS() {
        
        if(!animating){

            setMouseClicked(0)    //if you go out of grid on mouseDown and start animating. The grid will make wall on entering the grid
            resetNodes(nodes)
            const grid = cloneDeep(nodes)

            var visitedNodes
            var path

            if(selectAlgo==="BFS"){

                visitedNodes = BFSalgo(grid, grid[startNodeRow][startNodeCol], grid[endNodeRow][endNodeCol])
                path = BFSpath( grid[startNodeRow][startNodeCol], grid[endNodeRow][endNodeCol])
                
            }
            else if(selectAlgo==="DFS"){

                visitedNodes = DFSalgo(grid, grid[startNodeRow][startNodeCol], grid[endNodeRow][endNodeCol])
                path = DFSpath( grid[startNodeRow][startNodeCol], grid[endNodeRow][endNodeCol])
            }
            else {
                visitedNodes = DijkstraAlgo(grid, grid[startNodeRow][startNodeCol], grid[endNodeRow][endNodeCol])
                path = DijkstraPath( grid[startNodeRow][startNodeCol], grid[endNodeRow][endNodeCol])
            }
            animateBFS(visitedNodes, path)

        }

    }
    
    // setting walls and wights

    // mouse clicked----
    // 0- not clicked 
    // 1- clicked on wall/weight 
    // 2- clicked on startnode 
    // 3- clicked on endNode

    function mouseDown(row , col) {

        if(!animating){

            resetNodes(nodes)
            if(nodes[row][col].isStart || nodes[row][col].isEnd){
                moveStartEndNodes(row, col)
            }
            else {
                setMouseClicked(1)  
                // console.log("clicked")
                if(wallOrWeight === "wall")
                    nodes[row][col].isWall = !nodes[row][col].isWall;
                else if(wallOrWeight === "weight" && selectAlgo === "Dijkstra"){
                    nodes[row][col].weight = nodes[row][col].weight === 3 ? 1:3;
                }
                setNodes(cloneDeep(nodes))
            }
            
        }

    }

    function moveStartEndNodes( row , col){

        if(nodes[row][col].isStart){
            setMouseClicked(2)
            nodes[row][col].isStart = false
        }
            
        else {
            setMouseClicked(3)
            nodes[row][col].isEnd = false
        }   
            
    }

    function mouseEnter(row , col) {

        if(!animating){
            
            console.log("clicked")
            if(mouseClicked===1){
                resetNodes(nodes)
                if(!nodes[row][col].isStart && !nodes[row][col].isEnd){  //only make wall if is not start or end   
                    if(wallOrWeight === "wall")
                        nodes[row][col].isWall = !nodes[row][col].isWall;
                    else if(wallOrWeight === "weight" && selectAlgo === "Dijkstra")
                        nodes[row][col].weight = nodes[row][col].weight === 3 ? 1:3;
                }
            }
            else if(mouseClicked===2){
                resetNodes(nodes)
                nodes[row][col].isStart = true
            }
            else if(mouseClicked===3){
                resetNodes(nodes)
                nodes[row][col].isEnd = true
            }
            setNodes(cloneDeep(nodes))

        }        
    }

    function mouseLeave(row, col){
        if(mouseClicked===2)
            nodes[row][col].isStart = false
        
        else if(mouseClicked===3)
            nodes[row][col].isEnd = false
        
        setNodes(cloneDeep(nodes))

    }

    function mouseUp(row, col) {

        if(!animating){
            if(mouseClicked===2){
                nodes[row][col].isStart = true
                changeStartNodeRow(row)
                changeStartNodeCol(col)
            }
            if(mouseClicked===3){
                nodes[row][col].isEnd = true
                changeEndNodeRow(row)
                changeEndNodeCol(col)
            }
            setNodes(cloneDeep(nodes))
            setMouseClicked(0)
        }

    }

    // to reset(visited and path nodes)before animating again

    
    function handleChangesAlgo(event){
        
        if(!animating){
            setAlgo(event.target.value)
            resetNodes(nodes)
            resetWeights()
            
        }
        
    }

    function handleChangesWalls(event){

        if(!animating){

            changeWallOrWeight(event.target.checked ? "weight" : "wall")

            resetNodes(nodes)
        }

    }


    function resetNodes(nodes) {

        for(let row=0; row<20; ++row){   
            for(let col=0; col<48; ++col){
                nodes[row][col].isVisited = false
                nodes[row][col].isPath = false
            }
        }

    }

    function resetWallsAndWeight() {

        resetWalls()
        resetWeights()

    }
    
    function resetWalls() {

        for(let row=0; row<20; ++row){   
            for(let col=0; col<48; ++col){
                nodes[row][col].isWall = false
            }
        }
        setNodes(cloneDeep(nodes))
        
    }

    function resetWeights() {

        for(let row=0; row<20; ++row){   
            for(let col=0; col<48; ++col){
                nodes[row][col].weight = 1
            }
        }
        setNodes(cloneDeep(nodes))
        
    }

    useEffect(()=> {
        console.log(wallOrWeight)
        if(selectAlgo!='Dijkstra' && wallOrWeight==="weight")
            setErrorVis('visible')
        else    
            setErrorVis('hidden')

    },[selectAlgo, wallOrWeight])


    // jsx grid elements(20 rows and 48 columns)
    
    const gridComponent = nodes.map(row => {
        return (
            <div className="row">
                {row.map(node =>(
                    <Node 
                        col= {node.col}
                        row= {node.row} 
                        isStart= {node.isStart} 
                        isEnd= {node.isEnd}
                        isWall= {node.isWall}
                        isVisited= {node.isVisited}
                        isPath= {node.isPath}
                        weight= {node.weight}
                        mouseDown = {() =>mouseDown(node.row, node.col)}
                        mouseUp = {() =>mouseUp(node.row, node.col)}
                        mouseEnter = {() =>mouseEnter(node.row, node.col)}
                        mouseLeave = {() =>mouseLeave(node.row, node.col)}
                    />
                ))}
            </div>
    )})   
    

    return(
        <div className="main">
            <NavBar 
                visualise = {visualiseBFS}
                handleChangesAlgo = {handleChangesAlgo}
                resetWallsAndWeight = {resetWallsAndWeight}
                handleChangesWalls = {handleChangesWalls}
            />
            <p className="errorMess" style={{visibility: errorVis }}>{selectAlgo} does not consider weights</p>
            <div className="grid">
                {gridComponent}
            </div>
        </div>
    )
}