
export default function BFSalgo(grid, startNode, endNode) {

    const queue = []
    const orderOfVisit = []
    startNode.distance = 0;
    queue.push(startNode)
    const dx = [0, 1, 0, -1]
    const dy = [1, 0, -1, 0]

    while(queue.length != 0) {

        const currNode = queue.shift()

        if(currNode === endNode)
            return orderOfVisit
        // console.log(currNode)
        // currNode.isVisited = true
        orderOfVisit.push(currNode)

        const currX = currNode.col
        const currY = currNode.row

        for(let i=0; i<4; ++i){
            const newX = currX + dx[i]
            const newY = currY + dy[i]
            
            if(checkNewNode(newX, newY, grid)){
                const node = grid[newY][newX]
                node.distance = currNode.distance+1
                node.prevNode = currNode
                node.isVisited = true
                queue.push(node)
            }
        }
    }
    return orderOfVisit
}

function checkNewNode(newX, newY, grid) {

    if(newX >= 0 && newY >=0
        && newY < grid.length 
        && newX < grid[0].length 
        && grid[newY][newX].isVisited === false
        && grid[newY][newX].isWall === false)
            return true
    return false

}