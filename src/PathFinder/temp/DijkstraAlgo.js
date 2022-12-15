
export function DijkstraAlgo(grid, startNode, endNode) {

    // initalising priority queue to iterator
    const reachedEnd = false
    let priorityQ = []
    let orderOfVisit = []
    // pushing starting node in queue
    startNode.distance = 0
    priorityQ.push(startNode)

    while(priorityQ.length !== 0) {

        //sorting the priority queue
        priorityQ.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance)

        //taking first element and poping from PQ
        const currNode = priorityQ.shift()

        orderOfVisit.push(currNode)

        // visit neigh
        visitNeighbours(currNode, endNode, grid, reachedEnd)

        if(reachedEnd)
            return orderOfVisit

    }
    return orderOfVisit

}

function visitNeighbours(currNode, endNode, grid, reachedEnd) {

    const [row, col, distance] = currNode
    if( row > 0){
        const node = addNode(row-1, col, currNode, grid, endNode)
        if(node == null){
            reachedEnd = true
        }
    }
    if( col > 0){
        addNode(row, col-1, currNode, grid, endNode)
    }
    if( row < grid.length - 1){
        
        addNode(row+1, col, currNode, grid, endNode)
    }
    if( col < grid[0].length - 1){
        
        addNode(row, col+1, currNode, grid, endNode)

    }
}

function addNode(row, col, currNode, grid, endNode){
    
    if(checkEnd(row, col, endNode))
        return null 
    const node = grid[row][col]
    if(node.distance > currNode.distance + 1){
        node.distance = currNode.distance + 1
        node.prevNode = currNode
        return grid[row][col]
    }
    return null
    
}

function checkEnd(currNode, endNode) {

    if(currNode === endNode)
        return true
    return false

}