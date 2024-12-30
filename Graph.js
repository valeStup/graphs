export class Graph {
    adjacencyList ;

    constructor() {
        this.adjacencyList = new Map();
    }

    addNode(node) {
        if (!this.adjacencyList.has(node)) {
            this.adjacencyList.set(node, new Map());
        }
    }

    addEdge(node1, node2, weight) { 
        if (this.adjacencyList.has(node1) && this.adjacencyList.has(node2)) {
            this.adjacencyList.get(node1).set(node2, weight) ; 
            this.adjacencyList.get(node2).set(node1, weight) ;
        } else {
            console.log("One or two of the nodes weren't found") ;
        }
    }

    getNeighbours(node) {
        return this.adjacencyList.get(node) ;
    }

    hasEdge(node1, node2) {
        return this.adjacencyList.get(node1).has(node2) ;
    }

    displayGraph(container, x1, y1, w) {
        let c = 0 ;
        const k = this.adjacencyList.size ;
        let styleX = x1 ;
        let styleY = y1 ;
        this.adjacencyList.forEach((node) => {

            c++ ;
            const nodeDiv = document.createElement("div");
            nodeDiv.classList.add("nodeDiv");
            nodeDiv.id = `${node}` ;
            nodeDiv.innerHTML += `<p class="nodeDivText">${c}</p>`

            let alpha = 360 * (c/k) * (Math.PI / 180) ;
            let sin = Math.sin(alpha) ;
            let cos = Math.cos(alpha) ;

            if (alpha >= 0 && alpha <= 90) {
                styleY = y1 + (w/2)*(1 - sin) ;
                styleX = x1 + (w/2)*(1 + cos) ;
            } else if (alpha > 90 && alpha <= 180) {
                styleY = y1 + (w/2)*(1 - sin) ;
                styleX = x1 + (w/2)*(1 - cos) ;
            }else if (alpha > 180 && alpha <= 270) {
                styleY = y1 + (w/2)*(1 + sin) ;
                styleX = x1 + (w/2)*(1 - cos) ;
            }else if (alpha > 270 && alpha <= 360) {
                styleY = y1 + (w/2)*(1 + sin) ;
                styleX = x1 + (w/2)*(1 + cos) ;
            }else if (alpha > 360 || alpha < 0) {
                console.log("error") ;
            };
            nodeDiv.style.top = `${styleY}px` ;
            nodeDiv.style.left = `${styleX}px`;

            container.appendChild(nodeDiv) ;
        })
    }
}
