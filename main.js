import { Graph } from './Graph.js' ;

const graph = new Graph() ;

const container = document.querySelector('.graphDisplay') ;
const rect = container.getBoundingClientRect() ;
const y1 = rect.top ;
const x1 = rect.left ;
const width = rect.right - rect.left ;

const numInput = document.querySelector('.numInput') ;
numInput.addEventListener("input", () => {
    if (numInput.value >= 26) return ; 
    graph.updateSize(numInput.value) ;
    container.innerHTML = '' ;
    graph.addEdge("H", "M", 6) ;
    graph.displayGraph(container, x1, y1, width);
})

const startInput = document.querySelector('#startInput') ;
const endInput = document.querySelector('#destInput') ;
const weightInput = document.querySelector('#weightInput') ;
const addEdgeBtn = document.querySelector('.addEdgeBtn');
addEdgeBtn.addEventListener("click", () => {
    if (!startInput.value || !endInput.value || !weightInput.value) return ;
    graph.addEdge(startInput.value, endInput.value, weightInput.value )
    container.innerHTML = '' ;
    graph.displayGraph(container, x1, y1, width);
})

/*graph.addNode("A") ;
graph.addNode("B") ;
graph.addNode("C") ;
graph.addNode("D") ;
graph.addNode("E") ;
graph.addNode("F") ;
graph.addNode("G") ;*/

graph.displayGraph(container, x1, y1, width);

console.log(graph) ;