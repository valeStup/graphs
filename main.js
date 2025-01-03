import { Graph } from './Graph.js' ;

const graph = new Graph() ;

const container = document.querySelector('.graphDisplay') ;
const rect = container.getBoundingClientRect() ;
const y1 = rect.top ;
const x1 = rect.left ;
const width = rect.right - rect.left ;
let selectedNodes = [] ;
let randomCount = 0 ;
let listOfEdges = [] ;  

function getRandomInt(max) {
    return Math.floor(Math.random() * max) ;
}

const numInput = document.querySelector('.numInput') ;
numInput.addEventListener("input", () => {
    if (numInput.value > 26) return ; 
    graph.updateSize(numInput.value) ;
    container.innerHTML = '' ;
    graph.displayGraph(container, x1, y1, width);
    markTheMarked();
})

const startInput = document.querySelector('#startInput') ;
const endInput = document.querySelector('#destInput') ;
const weightInput = document.querySelector('#weightInput') ;
const addEdgeBtn = document.querySelector('.addEdgeBtn');
addEdgeBtn.addEventListener("click", () => {
    if (!startInput.value || !endInput.value || !weightInput.value) return ;
    graph.addEdge(startInput.value, endInput.value, weightInput.value );
    listOfEdges.push({start: startInput.value, end: endInput.value, marked: false});
    container.innerHTML = '' ;
    graph.displayGraph(container, x1, y1, width);
    markTheMarked();
})

document.addEventListener("click", function(e) {
    selectedNodes.push(e.target.id);
    if (selectedNodes.length === 2) {
        graph.addEdge((selectedNodes[0]), selectedNodes[1], Number(weightInput.value)) ;
        listOfEdges.push({start: selectedNodes[0], end: selectedNodes[1], marked: false});
        container.innerHTML = '' ;
        graph.displayGraph(container, x1, y1, width);
        markTheMarked();
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
        listOfEdges.push({start: char, end: char2, marked: false});
    }
    container.innerHTML = '' ;
    graph.displayGraph(container, x1, y1, width);
    markTheMarked();
})

function edgeToList(start, end) {
    let edgeIX = listOfEdges.findIndex((p) => p.start === start && p.end === end) ;
    if (edgeIX === -1){
        edgeIX = listOfEdges.findIndex((p) => p.start === end && p.end === start) ;
    }

    if (edgeIX === -1 ) {
        return;
    }
    listOfEdges[edgeIX].marked = true ;

    markTheMarked();
}

function markTheMarked() {
    listOfEdges.forEach((edge) => {
        if (edge.marked == true) {
            let marko ;
            let markoTxt ;
            if (document.querySelector(`#${edge.start}-${edge.end}`)) {
                marko = document.querySelector(`#${edge.start}-${edge.end}`) ;
                markoTxt = document.querySelector(`#wTxt-${edge.start}-${edge.end}`)
            } else {
                marko = document.querySelector(`#${edge.end}-${edge.start}`);
                markoTxt = document.querySelector(`#wTxt-${edge.end}-${edge.start}`);
            }
            marko.style.backgroundColor = 'red';
            marko.style.border = '1px solid red' ;
            markoTxt.style.color = 'red' ;
            markoTxt.style.fontWeight = 'bold' ;
            markoTxt.style.fontSize = '1.2rem' ;
        }
    })
}

const displayText = document.querySelector('.distanceDisplayTxt');
const dijkstraStartInput = document.querySelector('#dijkstraStartInput') ;
const dijkstraDestInput = document.querySelector('#dijkstraDestInput') ;
const impDijkstraBtn = document.querySelector('.impDijkstraBtn');
impDijkstraBtn.addEventListener("click", () => {
    if (!dijkstraStartInput.value || !dijkstraDestInput.value) return ;
    const result = graph.dijkstra(dijkstraStartInput.value, dijkstraDestInput.value) ;
    const distance = result.pop();
    const path = Array.from(result[0]) ;
    displayText.innerText = `${distance}`;

    for (let i = 0; i < path.length ; i++) {
        edgeToList(path[i], path[i+1]) ;
        
    }
});

const clearDijkstraBtn = document.querySelector('.clearDijkstraBtn') ;
clearDijkstraBtn.addEventListener("click", () => {
    clearDijkstra();
})

function clearDijkstra() {
    listOfEdges.forEach((edge) => {
        edge.marked = false ;
        container.innerHTML = '' ;
        graph.displayGraph(container, x1, y1, width);
        markTheMarked();
        displayText.innerText = "";
    })
}

const clearEdgeBtn = document.querySelector('.clearEdgeBtn') ;
clearEdgeBtn.addEventListener("click", () => {
    clearEdge();
})

function clearEdge() {
    listOfEdges = [] ;
    graph.clearEdges() ;
    randomCount = 0 ;
    container.innerHTML = '' ;
    graph.displayGraph(container, x1, y1, width);
    markTheMarked();
}

const impPrimBtn = document.querySelector('.impPrimBtn');
impPrimBtn.addEventListener("click", () => {
    graph.prim();
})