// import * as d3 from "d3";

// import {d3Gram, GramNodeDatum, GramLinkDatum, isGramNodeDatum} from '../src';


const shapeRadius = 20;
const shapeSize = Math.PI * shapeRadius * shapeRadius; // the area of the shape

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

const shapeFor = (node) => {
  const shape = (node.labels !== undefined) ? (shapeDomain.get(node.labels[0]) || 'circle') : 'circle';
  return symbolPathData.get(shape) || '';
}

const labelsFrom = (graph) => {
  return Array.from(graph.nodes.reduce((foundLabels, node) => {
    node.labels.forEach(label => foundLabels.add(label));
    return foundLabels;
  }, new Set()).values());
}

const interpolatedColorScheme = (size, interpolator) => {
  var interpolatedColors = [];
  for (i=1; i<=size; i++) {
    interpolatedColors.push(interpolator(i/size));
  }
  return interpolatedColors;
}


const colorsFor = (labels) => {
  // const scale = d3.scaleOrdinal(d3.schemeCategory10);
  const scale = d3.scaleOrdinal(interpolatedColorScheme(labels ? labels.length+1 : 1, d3.interpolateTurbo));
  return d => scale(labels.indexOf(d.labels[0]));
}
  
const drag = (simulation) => {
  
  function dragstarted(event) {
    if (!event.active) simulation.alphaTarget(0.3).restart();
    event.subject.fx = event.subject.x;
    event.subject.fy = event.subject.y;
  }
  
  function dragged(event) {
    event.subject.fx = event.x;
    event.subject.fy = event.y;
  }
  
  function dragended(event) {
    if (!event.active) simulation.alphaTarget(0);
    event.subject.fx = null;
    event.subject.fy = null;
  }

  return d3.drag()
      .on("start", dragstarted)
      .on("drag", dragged)
      .on("end", dragended);
}

const drawLinks = (links) => {
  links
    .attr("x1", (d) => d.source.x)
    .attr("y1", (d) => d.source.y)
    .attr("x2", (d) => d.target.x)
    .attr("y2", (d) => d.target.y);
}

const drawNodes = (nodes) => {
  nodes
  .attr("transform", function(d) {
    return "translate(" + d.x + "," + d.y + ")";
  })
}

const drawGraph = (gramSrc, svgElement) => {

  let graph = gram.d3.d3Gram(gramSrc);

  const labels = labelsFrom(graph);
  const color = colorsFor(labels);

  var svg = d3.select(svgElement),
    width = +svg.attr("width"),
    height = +svg.attr("height"),
    center = {x:width/2, y:height/2}
    
  console.log("D3 Graph Loaded:");
  console.log(width,height,center);
  console.dir(graph);
  
  var simulation = d3.forceSimulation()
  .force("charge", d3.forceManyBody().strength(-30))
  .force("center", d3.forceCenter(center.x, center.y))
  .force('collision', d3.forceCollide().radius(30))
  ;
  simulation.nodes(graph.nodes);
  simulation.force("link", d3.forceLink(graph.links).id((d) => d.id))

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
  
  node.append('path')
    .attr('fill', color)
    .attr('stroke', (d) => (d3.color(color(d)) || d3.rgb(0x33, 0x33, 0x33)).darker().hex())
    .attr('stroke-width', 4)
    .attr('d', shapeFor)
  
  node.append("title")
    .text(function(d) { return d.id; });
  
  simulation.on("tick", () => {
    drawLinks(link);
    drawNodes(node);
  });
  
}
