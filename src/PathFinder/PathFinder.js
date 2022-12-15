import { useState } from "react"
import NavBar from "./Components/Navbar"
import Node from "./Components/Node"
// import { DijkstraAlgo } from './SearchAlgo/DijkstraAlgo'
import BFSalgo from "./SearchAlgo/BFSalgo"
import DFSalgo from "./SearchAlgo/DFSalgo"


export default function PathFinder() {

    const NodeRow = 8
    const startNodeCol = 15
    const endNodeCol = 35


    const [nodes, setNodes] = useState(createGrid())
    const grid = createGrid1()
    const [render, reRender] = useState(0)
    

    
    function createGrid() {

        const node = []
        for(let row=0; row<16; ++row){
            let eachRow = []
            for(let col=0; col<48; ++col){
                eachRow.push({
                    row: row,
                    col: col,
                    isStart: row===8 && col===15,
                    isEnd: row===8 && col===35,
                    isWall: (col===25 || col===24 || col===26) && row!=4 && row!=12,
                    Weight: 1,
                    isVisited: false,
                    distance: Infinity,
                    prevNode: null
                })
            }
            node.push(eachRow)
        }
        return node
    }

    function createGrid1() {

        const node = []
        for(let row=0; row<16; ++row){
            let eachRow = []
            for(let col=0; col<48; ++col){
                eachRow.push({
                    row: row,
                    col: col,
                    isStart: row===8 && col===15,
                    isEnd: row===8 && col===35,
                    isWall: (col===25 || col===24 || col===26) && row!=4 && row!=12,
                    Weight: 1,
                    isVisited: false,
                    distance: Infinity,
                    prevNode: null
                })
            }
            node.push(eachRow)
        }
        return node
    }

    function animateBFS(nodes) {
        const dis = nodes[nodes.length-1].distance+1
        console.log(dis)
        for( let i = 0; i < nodes.length; ++i){
            setTimeout(()=> {
                setNodes(prevNodes => {
                    prevNodes[nodes[i].row][nodes[i].col] = nodes[i]
                    return prevNodes
                })
                // console.log(reRender)
                reRender(render => render+1)

            },200*i)
            
        }
    }

    function visualiseBFS() {
        animateBFS(BFSalgo(grid, grid[NodeRow][startNodeCol], grid[NodeRow][endNodeCol]))
        // console.log(nodes[NodeRow][startNodeCol])

    }
    
    function makeWall(row , col) {
        console.log("clicked")
        nodes[row][col].isWall = !nodes[row][col].isWall;
        reRender(render => render+1)
    }

    
    const gridComponent = nodes.map(row => {
        return (
            <div>
                {row.map(node =>(
                    <Node 
                        col= {node.col}
                        row= {node.row} 
                        isStart= {node.isStart} 
                        isEnd= {node.isEnd}
                        isWall= {node.isWall}
                        isVisited= {node.isVisited}
                        weight= {node.weight}
                        makeWall = {() =>makeWall(node.row, node.col)}
                    />
                ))}
            </div>
    )})   
    
    return(
        <div className="main">
            <NavBar visualise = {visualiseBFS}/>
            <div className="grid">
                {gridComponent}
            </div>
        </div>
    )
}