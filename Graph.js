export class Graph {
    adjacencyList ;
    adjaObjList ;

    constructor() {
        this.adjacencyList = new Map();
        this.adjaObjList = [] ;
    }

    addNode(node) {
        if (!this.adjacencyList.has(node)) {
            this.adjacencyList.set(node, new Map());
            this.adjaObjList.push({name: node, neighbours: '', styleY: 0 , styleX: 0 }) ;
        }
        console.log(this.adjaObjList);
    }

    deleteNode(node) {
        if (this.adjacencyList.has(node)) {
            const ind = this.adjaObjList.findIndex((p) => p.name === node) ;
            this.adjaObjList.slice(ind) ;
            this.adjacencyList.delete(node) ;
        }
    }

    clearGraph() {
        this.adjacencyList.forEach((node) => {
            this.deleteNode(node) ;
            this.adjaObjList = [] ;
        })
    }

    updateSize(newSize) {
        const l = this.adjacencyList.size ;
        console.log("l = " + l);
        let lastC = 'A' ;
        let asc = 64 ;
        if(l > 0) {
            lastC = this.adjaObjList[l - 1].name ;
            asc = lastC.charCodeAt(0);
        }
        if (newSize > l) {
            const over = newSize-l ;
            for (let i = 1; i <= over; i++) {
                let c = asc + i ;
                let cC = String.fromCharCode(c) ;
                this.addNode(cC) ;
            }
        } else if (newSize < l) {
            const undies = l-newSize ;
            for (let i = 0; i < undies; i++) {
                let c = asc - i ;
                let cC = String.fromCharCode(c) ;
                console.log("removed " + cC)
                this.deleteNode(cC) ;
            }
        } else {
            return;
        }
    }

    addEdge(node1, node2, weight) { 
        if (this.adjacencyList.has(node1) && this.adjacencyList.has(node2)) {
            this.adjacencyList.get(node1).set(node2, weight) ; 
            this.adjacencyList.get(node2).set(node1, weight) ;

            let ind1 = this.adjaObjList.findIndex((p) => p.name === node1);
            this.adjaObjList[ind1].neighbours += `${node2}(${weight}), ` ;

            let ind2 = this.adjaObjList.findIndex((p) => p.name === node2) ;
            this.adjaObjList[ind2].neighbours += `${node1}(${weight}), `
        } else {
            console.log("One or two of the nodes weren't found") ;
        }
        console.log(this.adjaObjList);
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
        for (let node of this.adjacencyList.keys()) {
            c++ ;
            const nodeDiv = document.createElement("div");
            nodeDiv.classList.add("nodeDiv");
            nodeDiv.id = `${node}` ;
            nodeDiv.innerHTML += `<p class="nodeDivText">${node}</p>`

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

            let index = this.adjaObjList.findIndex((p) => p.name === node) ;
            this.adjaObjList[index].styleY = styleY ;
            this.adjaObjList[index].styleX = styleX ;
        }

        for (let [vertex, edges] of this.adjacencyList.entries()) {
            let ind = this.adjaObjList.findIndex((p) => p.name === vertex);
            let verY = this.adjaObjList[ind].styleY ;
            let verX = this.adjaObjList[ind].styleX ;

            for (let key of this.adjacencyList.keys()) {
                if (this.hasEdge(vertex, key) && !document.getElementById(`${key}-${vertex}`)) {
                    let myWeight = this.adjacencyList.get(vertex).get(key) ;
                    console.log("from " + vertex + " to " + key + ": "+ myWeight);

                    let indo = this.adjaObjList.findIndex((p) => p.name === key);
                    let keyY = this.adjaObjList[indo].styleY ;
                    let keyX = this.adjaObjList[indo].styleX ;

                    let lineY = keyY - ((keyY - verY).toFixed(2))*0.5 ;
                    let lineX = keyX - ((keyX - verX).toFixed(2))*0.5 ;

                    let vorZeichen = 1 ;
                    let adja = Math.abs(keyX - verX).toFixed(2) ;
                    let oppc = Math.abs(keyY - verY).toFixed(2) ;
                    let hypo = Math.pow(adja, 2) + Math.pow(oppc, 2) ;
                    let lineW = Math.sqrt(hypo);

                    if (!((keyX - verX).toFixed(2) > 0 && (keyY - verY).toFixed(2) > 0 || (keyX - verX).toFixed(2) < 0 && (keyY - verY).toFixed(2) < 0)) {
                        vorZeichen = -1 ;
                    }

                    let betaInRadians = Math.atan( oppc / adja ) ;
                    let betaInDegrees = betaInRadians * (180 / Math.PI) * vorZeichen ;
                    console.log("opp: " + oppc + " addj: " + adja);
                    console.log(betaInDegrees);


                    const line = document.createElement("span");
                    line.classList.add("edge");
                    line.id = `${vertex}-${key}`;
                    line.innerHTML += `<p class="weightTxt">${myWeight}</p>` ;

                    line.style.top = `${keyY + 25}px` ;
                    line.style.left = `${keyX + 25}px`;
                    line.style.width = `${lineW}px` ;
                    line.style.transform = `rotate(${betaInDegrees}deg)`;
                    container.appendChild(line);

                    console.log("x: " + lineX + " y: " + lineY );
                }
            }
        }
    }

    
}
