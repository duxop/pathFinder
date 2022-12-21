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
    const defaultMidR = 8
    const defaultMidC = 25


    const [startNodeRow, changeStartNodeRow] = useState(defaultStartR)
    const [endNodeRow, changeEndNodeRow]= useState(defaultEndR)
    const [startNodeCol, changeStartNodeCol] = useState(defaultStartC)
    const [endNodeCol, changeEndNodeCol] = useState(defaultEndC)
    const [midNodeRow, changeMidNodeRow] = useState(defaultMidR)
    const [midNodeCol, changeMidNodeCol] = useState(defaultMidR)


    const [animating,setAnimation] = useState(false)
    const [nodes, setNodes] = useState(createGrid())
    const [mouseClicked, setMouseClicked] = useState(0)
    const [selectAlgo, setAlgo] = useState("BFS")
    const [wallOrWeight, changeWallOrWeight] = useState("wall")
    const [errorVis, setErrorVis] = useState("hidden")
    const [nodeErrorVis, setNodeErrorVis] = useState(false)
    const [considerMid, changeConsiderMid] = useState(false)

    

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
                    isMid: false,
                    isWall: false,
                    isPath: false,
                    isPath2: false,
                    weight: 1,
                    isVisited: false,
                    isVisited2: false,
                    distance: Infinity,
                    prevNode: null
                })
            }
            node.push(eachRow)
        }
        return node
    }

    function animate(visitedNodes1, path1, visitedNodes2, path2) {

        setAnimation(true)
        for( let i = 0; i < visitedNodes1.length; ++i){
            setTimeout(()=> {
                
                nodes[visitedNodes1[i].row][visitedNodes1[i].col] = visitedNodes1[i]
                setNodes(cloneDeep(nodes))

            },15*i)
            
        } 
        for( let j = 0; j < visitedNodes2.length; ++j){
            setTimeout(()=> {
                
                nodes[visitedNodes2[j].row][visitedNodes2[j].col] = visitedNodes2[j]
                nodes[visitedNodes2[j].row][visitedNodes2[j].col].isVisited2 = true
                setNodes(cloneDeep(nodes))

            },15*(visitedNodes1.length + j))
            
        }
        for( let k = 0; k < path1.length; ++k){
            setTimeout(()=> {

                nodes[path1[k].row][path1[k].col].isPath = true
                console.log(nodes[path1[k].row][path1[k].col].distance)
                setNodes(cloneDeep(nodes))

            },15*(visitedNodes1.length + visitedNodes2.length) + 45*k)
            
        } 
        for( let l = 0; l < path2.length; ++l){
            setTimeout(()=> {

                nodes[path2[l].row][path2[l].col].isPath2 = true
                console.log(nodes[path2[l].row][path2[l].col].distance)
                setNodes(cloneDeep(nodes))

            },15*(visitedNodes1.length + visitedNodes2.length) + 45*(path1.length + l))
            
        } 
        setTimeout(()=> {
            setAnimation(false)
        }, 15*(visitedNodes1.length + visitedNodes2.length + path1.length + path2.length))

    }


    function visualiseBFS() {
        
        if(!animating){

            if(mouseClicked>=2){
                setNodeErrorVis(true)
                return
            }
            setNodeErrorVis(false)
            setMouseClicked(0)    //if you go out of grid on mouseDown and start animating. The grid will make wall on entering the grid
            resetNodes(nodes)
            let grid1 = cloneDeep(nodes)
            let grid2 = cloneDeep(nodes)


            const start = grid1[startNodeRow][startNodeCol]
            let mid = considerMid ? grid1[midNodeRow][midNodeCol] : grid1[endNodeRow][endNodeCol]
            const end = grid2[endNodeRow][endNodeCol]

            var visitedNodes1
            var path1
            var visitedNodes2
            var path2

            

            if(selectAlgo==="BFS"){

                visitedNodes1 = BFSalgo(grid1, start, mid,)
                path1 = BFSpath( start, mid)
                mid = considerMid ? grid2[midNodeRow][midNodeCol] : grid2[endNodeRow][endNodeCol]
                visitedNodes2 = BFSalgo(grid2, mid , end)
                path2 = BFSpath( mid, end)
                
            }
            else if(selectAlgo==="DFS"){

                visitedNodes1 = DFSalgo(grid1, start, mid,)
                path1 = DFSpath( start, mid)
                mid = considerMid ? grid2[midNodeRow][midNodeCol] : grid2[endNodeRow][endNodeCol]
                visitedNodes2 = DFSalgo(grid2, mid , end)
                path2 = DFSpath( mid, end)
            }
            else {

                visitedNodes1 = DijkstraAlgo(grid1, start, mid,)
                path1 = DijkstraPath( start, mid)
                mid = considerMid ? grid2[midNodeRow][midNodeCol] : grid2[endNodeRow][endNodeCol]
                visitedNodes2 = DijkstraAlgo(grid2, mid , end)
                path2 = DijkstraPath( mid, end)
            }
            animate(visitedNodes1, path1, visitedNodes2, path2)

        }

    }
    
    // setting walls and wights

    // mouse clicked----
    // 0- not clicked 
    // 1- clicked on wall/weight 
    // 2- clicked on startnode 
    // 3- clicked on endNode
    // 4- mid node

    function mouseDown(row , col) {

        if(!animating){

            resetNodes(nodes)
            if(nodes[row][col].isStart || nodes[row][col].isEnd || nodes[row][col].isMid){
                moveStartMidEndNodes(row, col)
            }
            else {
                setMouseClicked(1)  
                // console.log("clicked")
                if(wallOrWeight === "wall")
                    nodes[row][col].isWall = !nodes[row][col].isWall;
                else if(wallOrWeight === "weight" && selectAlgo === "Dijkstra"){
                    nodes[row][col].weight = nodes[row][col].weight === 5 ? 1:5;
                }
                setNodes(cloneDeep(nodes))
            }
            
        }

    }

    function moveStartMidEndNodes( row , col){

        if(nodes[row][col].isStart){
            setMouseClicked(2)
            nodes[row][col].isStart = false
        }
            
        else if(nodes[row][col].isEnd){
            setMouseClicked(3)
            nodes[row][col].isEnd = false
        }   

        else {
            setMouseClicked(4)
            nodes[row][col].isMid = false
        }
            
    }

    function mouseEnter(row , col) {

        if(!animating){
            
            console.log("clicked")
            if(mouseClicked===1){
                resetNodes(nodes)
                if(!nodes[row][col].isStart && !nodes[row][col].isEnd && !nodes[row][col].isMid){  //only make wall if is not start or end   
                    if(wallOrWeight === "wall")
                        nodes[row][col].isWall = !nodes[row][col].isWall;
                    else if(wallOrWeight === "weight" && selectAlgo === "Dijkstra")
                        nodes[row][col].weight = nodes[row][col].weight === 5 ? 1:5;
                }
            }
            else if(mouseClicked===2 && nodes[row][col].weight===1){
                resetNodes(nodes)
                nodes[row][col].isStart = true
            }
            else if(mouseClicked===3 && nodes[row][col].weight===1){
                resetNodes(nodes)
                nodes[row][col].isEnd = true
            }
            else if(mouseClicked===4 && nodes[row][col].weight===1){
                resetNodes(nodes)
                nodes[row][col].isMid = true
            }
            setNodes(cloneDeep(nodes))

        }        
    }

    function mouseLeave(row, col){
        if(mouseClicked===2)
            nodes[row][col].isStart = false
        
        else if(mouseClicked===3)
            nodes[row][col].isEnd = false
        
        else if(mouseClicked===4)
        nodes[row][col].isMid = false
        
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
            if(mouseClicked===4){
                nodes[row][col].isMid = true
                changeMidNodeRow(row)
                changeMidNodeCol(col)
            }
            setNodes(cloneDeep(nodes))
            setMouseClicked(0)
        }

    }

    function mouseClick(row, col){

        if(!animating){
            if(wallOrWeight === "weight" && selectAlgo === "Dijkstra")
                nodes[row][col].weight = nodes[row][col].weight === 5 ? 1:5;
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
                nodes[row][col].isVisited2 = false
                nodes[row][col].isPath = false
                nodes[row][col].isPath2 = false
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

    function addRemoveMidNode(){

        if(nodes[midNodeRow][midNodeCol].isMid){
            nodes[midNodeRow][midNodeCol].isMid = false
            changeConsiderMid(false)
            console.log("remove")

        }
        else {

            if(nodes[defaultMidR][defaultMidC].isStart || nodes[defaultMidR][defaultMidC].isEnd){

                if( nodes[defaultMidR][defaultMidC+1].isStart || nodes[defaultMidR][defaultMidC+1].isEnd){
                    nodes[defaultMidR+1][defaultMidC].isMid = true
                    changeMidNodeRow(defaultMidR+1)
                    changeMidNodeCol(defaultMidC)
                }
                else {
                    nodes[defaultMidR][defaultMidC+1].isMid = true
                    changeMidNodeRow(defaultMidR)
                    changeMidNodeCol(defaultMidC+1)
                }
                
            }      
            else {
                nodes[defaultMidR][defaultMidC].isMid = true
                changeMidNodeRow(defaultMidR)
                changeMidNodeCol(defaultMidC)
            }
            
            changeConsiderMid(true)
            console.log("add")
        }
        setNodes(cloneDeep(nodes))

    }

    useEffect(()=> {
        console.log(wallOrWeight)
        if(selectAlgo!=='Dijkstra' && wallOrWeight==="weight")
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
                        isMid= {node.isMid}
                        isWall= {node.isWall}
                        isVisited= {node.isVisited}
                        isVisited2= {node.isVisited2}
                        isPath= {node.isPath}
                        isPath2= {node.isPath2}
                        weight= {node.weight}
                        mouseDown = {() =>mouseDown(node.row, node.col)}
                        mouseUp = {() =>mouseUp(node.row, node.col)}
                        mouseEnter = {() =>mouseEnter(node.row, node.col)}
                        mouseLeave = {() =>mouseLeave(node.row, node.col)}
                        mouseClick= {() => mouseClick(node.row, node.col)}
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
                addNode = {addRemoveMidNode}
                addNodeButton = {considerMid}
            />
            {!nodeErrorVis && <p className="errorMess" style={{visibility: errorVis }}>{selectAlgo} does not consider weights</p>}
            {nodeErrorVis && <p>First place the node on grid</p>}

            <div className="grid">
                {gridComponent}
            </div>
        </div>
    )
}