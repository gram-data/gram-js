import * as d3 from "d3";

import {gramParse, GramNodeDatum, GramLinkDatum, isGramNodeDatum} from '../src';

// a trick enabled by parcel. `miserables` will  be a URL
const miserables = require('./miserables.gram'); 

const shapeSize = 1200;

var svg = d3.select("svg"),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    center = {x:width/2, y:height/2}

const shapeDomain = new Map([
  ["Person", "square"],
  ["Triangle", "triangle"],
  ["Movie", "star"],
  ["Event", "wye"]
]);

const symbolPathData = new Map([
  ["circle",d3.symbol().type(d3.symbolCircle).size(shapeSize)()],
  ["square",d3.symbol().type(d3.symbolSquare).size(shapeSize)()],
  ["triangle",d3.symbol().type(d3.symbolTriangle).size(shapeSize)()],
  ["cross",d3.symbol().type(d3.symbolCross).size(shapeSize)()],
  ["diamond",d3.symbol().type(d3.symbolDiamond).size(shapeSize)()],
  ["star", d3.symbol().type(d3.symbolStar).size(shapeSize)()],
  ["wye", d3.symbol().type(d3.symbolWye).size(shapeSize)()]
]);

const shapeFor = (node:GramNodeDatum) => {
  const shape = (node.labels !== undefined) ? (shapeDomain.get(node.labels[0]) || 'circle') : 'circle';
  return symbolPathData.get(shape) || '';
}


const color = d3.scaleOrdinal(d3.schemeCategory10);  
color.domain(["Default", "Person", "Movie", "Event"]);

const colorFor = (node:GramNodeDatum) => {
  const label = (node.labels !== undefined) ? node.labels[0] : 'Default';
  return color(label) || 'gray';
}
  
var simulation = d3.forceSimulation()
    .force("charge", d3.forceManyBody().strength(-1000))
    .force("center", d3.forceCenter(center.x, center.y));
    
const drag = (simulation:any) => {
  
  function dragstarted(d:any) {
    if (!d3.event.active) simulation.alphaTarget(0.3).restart();
    // simulation.stop();
    d.fx = d.x;
    d.fy = d.y;
  }
  
  function dragged(d:any) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
  }
  
  function dragended(d:any) {
    if (!d3.event.active) simulation.alphaTarget(0).restart();
    d.fx = null;
    d.fy = null;
  }
  
  return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
}

const drawLinks = (links:any) => {
  links
  .attr("x1", (d:GramLinkDatum) => (isGramNodeDatum(d.source) ? d.source.x : center.x))
  .attr("y1", (d:GramLinkDatum) => (isGramNodeDatum(d.source) ? d.source.y : center.y))
  .attr("x2", (d:GramLinkDatum) => (isGramNodeDatum(d.target) ? d.target.x : center.x))
  .attr("y2", (d:GramLinkDatum) => (isGramNodeDatum(d.target) ? d.target.y : center.y));

}

const drawNodes = (nodes:any) => {
  nodes
  .attr("transform", function(d:any) {
    return "translate(" + d.x + "," + d.y + ")";
  })
}

window.onload = () => {

  d3.text(miserables).then( gramSource => {
    const altGramSource = "(a:Person {born:date`1969-01-01`})-->(b:Event)<--(c:Movie)"

    let graph = gramParse(gramSource);

    console.log("D3 Graph Loaded:");
    console.dir(graph);
    
    simulation.nodes(graph.nodes);
    simulation.force("link", d3.forceLink(graph.links).id((d:any) => d.id))
  
    const link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(graph.links)
      .join("line")
        .attr("stroke-width", 2);
        // .attr("stroke-width", d => Math.sqrt(d.value));
  
    var node = svg.append("g")
      .attr("class", "nodes")
      .selectAll("g")
      .data(graph.nodes)
      .enter().append("g")
      .call(drag(simulation));
  
  // node.append("circle")
  //   .attr("r", 25)
  //   .attr("fill", "black")
  
  node.append('path')
    .attr('fill', colorFor)
    .attr('stroke', (d) => (d3.color(colorFor(d)) || d3.rgb(0x33, 0x33, 0x33)).darker().hex())
    .attr('stroke-width', 4)
    .attr('d', shapeFor)
  
  node.append("text")
        .text(function(d) {
          return d.id;
        })
        .attr("text-anchor", "middle")
        .attr("fill", "white")
        .attr('x', 0)
        .attr('y', 4)
        .attr('pointer-events', 'none');
  
    node.append("title")
        .text(function(d) { return d.id; });
  
    simulation.on("tick", () => {
      drawLinks(link);
      drawNodes(node);
    });
  
  })


};