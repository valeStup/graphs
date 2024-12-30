import { Graph } from './Graph.js' ;

const graph = new Graph() ;

const container = document.querySelector('.graphDisplay') ;
const rect = container.getBoundingClientRect() ;
const y1 = rect.top ;
const x1 = rect.left ;
const width = rect.right - rect.left ;

graph.addNode("A") ;
graph.addNode("B") ;
graph.addNode("C") ;
graph.addNode("D") ;
graph.addNode("E") ;
graph.addNode("F") ;
graph.addNode("G") ;

graph.addEdge("A", "B", 3) ;
graph.addEdge("A", "C", 5) ;
graph.addEdge("B", "C", 5) ;
graph.addEdge("A", "E", 10) ;

graph.displayGraph(container, x1, y1, width);

console.log(graph) ;