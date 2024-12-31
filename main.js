import { Graph } from './Graph.js' ;

const graph = new Graph() ;

const container = document.querySelector('.graphDisplay') ;
const rect = container.getBoundingClientRect() ;
const y1 = rect.top ;
const x1 = rect.left ;
const width = rect.right - rect.left ;
let selectedNodes = [] ;
let randomCount = 0 ;

function getRandomInt(max) {
    return Math.floor(Math.random() * max) ;
}

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
    selectedNodes.push(e.target.id);
    console.log(e.target);
    if (selectedNodes.length === 2) {
        graph.addEdge(selectedNodes[0], selectedNodes[1], weightInput.value) ;
        container.innerHTML = '' ;
        graph.displayGraph(container, x1, y1, width);
        selectedNodes = [] ;

    }
})

const genRandomBtn = document.querySelector('.genRandomBtn');
genRandomBtn.addEventListener("click", () => {
    randomCount++ ;
    if(randomCount >= 5) return ;
    let amount = 10 +  getRandomInt(20) ;
    let lle = graph.getLength() ;
    /*for (let i = 0; i < lle; i++) {
        let c1 = String.fromCharCode(65 + i);
        let c2 = String.fromCharCode(66 + i)
        let randW = 1 + getRandomInt(19) ;
        graph.addEdge(c1, c2, randW) ;
    }*/
    for (let i = 0; i < amount; i++) {
        let cINt = 65 + getRandomInt(lle) ;
        let char = String.fromCharCode(cINt);

        let cINt2 = 65 + getRandomInt(lle) ;
        let char2 = String.fromCharCode(cINt2);

        let randW = 1 + getRandomInt(19) ;
        graph.addEdge(char, char2, randW) ;
    }
    container.innerHTML = '' ;
    graph.displayGraph(container, x1, y1, width);
})
const dijkstraStartInput = document.querySelector('#dijkstraStartInput') ;
const dijkstraDestInput = document.querySelector('#dijkstraDestInput') ;
const impDijkstraBtn = document.querySelector('.impDijkstraBtn');
impDijkstraBtn.addEventListener("click", () => {
    if (!dijkstraStartInput.value || !dijkstraDestInput.value) return ;
    console.log("dijkstra: " + graph.dijkstra(dijkstraStartInput.value, dijkstraDestInput.value)) ;
});

graph.displayGraph(container, x1, y1, width);
