
export function DijkstraAlgo(grid, startNode, endNode) {

    const queue = []
    const orderOfVisit = []
    startNode.distance = 0;
    queue.push(startNode)
    const dx = [0, 1, 0, -1]
    const dy = [1, 0, -1, 0]
// eslint-disable-next-line
    while(queue.length != 0) {

        queue.sort(function(node1, node2){return node1.distance - node2.distance})

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
                if(grid[newY][newX].isVisited === false){
                    node.distance = currNode.distance + currNode.weight
                    node.prevNode = currNode
                    node.isVisited = true
                    queue.push(node)
                }
                else if(node.distance > (currNode.distance + currNode.weight)){
                    node.distance = currNode.distance + currNode.weight
                    node.prevNode = currNode
                }
            }
        }
    }
    return orderOfVisit
}

function checkNewNode(newX, newY, grid) {

    if(newX >= 0 && newY >=0
        && newY < grid.length 
        && newX < grid[0].length 
        && grid[newY][newX].isWall === false)
            return true
    return false

}

export function DijkstraPath(startNode, endNode) {

    const revPath = []
    let newPrev = endNode.prevNode
    // eslint-disable-next-line
    while(newPrev != startNode && newPrev !=null){

        revPath.push(newPrev)
        newPrev = newPrev.prevNode
    }
    const path = []
// eslint-disable-next-line
    while(revPath.length != 0){
        path.push(revPath[revPath.length-1])
        revPath.pop()
    }

    return path


}