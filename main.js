import { Graph } from './Graph.js' ;

const graph = new Graph() ;

const container = document.querySelector('.graphDisplay') ;
const rect = container.getBoundingClientRect() ;
const y1 = rect.top ;
const x1 = rect.left ;
const width = rect.right - rect.left ;
let selectedNodes = [] ;

const numInput = document.querySelector('.numInput') ;
numInput.addEventListener("input", () => {
    if (numInput.value > 26) return ; 
    graph.updateSize(numInput.value) ;
    container.innerHTML = '' ;
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

document.addEventListener("click", function(e) {
    console.log(e.target.id);
    selectedNodes.push(e.target.id);
    if (selectedNodes.length === 2) {
        graph.addEdge(selectedNodes[0], selectedNodes[1], weightInput.value) ;
        container.innerHTML = '' ;
        graph.displayGraph(container, x1, y1, width);
        selectedNodes = [] ;

    }
})

graph.displayGraph(container, x1, y1, width);

console.log(graph) ;