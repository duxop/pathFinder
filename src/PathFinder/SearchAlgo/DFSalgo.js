
export function DFSalgo(grid, startNode, endNode) {

    const stack = []
    const orderOfVisit = []
    startNode.distance = 0;
    startNode.isVisited = true
    stack.push(startNode)

    const dx = [0, 1, 0, -1]
    const dy = [1, 0, -1, 0]
// eslint-disable-next-line
    while(stack.length != 0) {

        const currNode = stack[stack.length-1]
        stack.pop()

        if(currNode === endNode)
            return orderOfVisit
        // console.log(currNode)
        currNode.isVisited = true
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
                stack.push(node)
            }
        }
    }
    return orderOfVisit
}

// function dfs(){

// }





function checkNewNode(newX, newY, grid) {

    if(newX >= 0 && newY >=0
        && newY < grid.length 
        && newX < grid[0].length 
        && grid[newY][newX].isVisited === false
        && grid[newY][newX].isWall === false)
            return true
    return false

}


export function DFSpath(startNode, endNode) {

    const revPath = []
    let newPrev = endNode.prevNode
    // eslint-disable-next-line
    while(newPrev != startNode){

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