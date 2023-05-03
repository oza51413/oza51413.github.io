const nodes = [
  { id: "main", label: "Main Node", link: "main.html" },
  { id: "sub1", label: "Subnode 1", link: "sub1.html" },
  { id: "sub2", label: "Subnode 2", link: "sub2.html" },
  { id: "sub3", label: "Subnode 3", link: "sub3.html" },
  { id: "sub4", label: "Subnode 4", link: "sub4.html" },
  { id: "sub5", label: "Subnode 5", link: "sub5.html" },
  { id: "center", label: "Central Node", link: "center.html" },
];

const links = [
  { source: "main", target: "sub1" },
  { source: "main", target: "sub2" },
  { source: "main", target: "sub3" },
  { source: "main", target: "sub4" },
  { source: "main", target: "sub5" },
  { source: "sub1", target: "center" },
  { source: "sub2", target: "center" },
  { source: "sub3", target: "center" },
  { source: "sub4", target: "center" },
  { source: "sub5", target: "center" },
];


const svg = d3.select("#mindmap");

const simulation = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id))
    .force("charge", d3.forceManyBody().strength(-100))
    .force("center", d3.forceCenter(svg.attr("width") / 2, svg.attr("height") / 2));

const link = svg.selectAll(".link")
    .data(links)
    .enter().append("line")
    .attr("class", "link");

const node = svg.selectAll(".node")
    .data(nodes)
    .enter().append("g")
    .attr("class", "node");

node.append("circle")
    .attr("r", 20)
    .attr("fill", "#ccc")
    .attr("stroke", "#333")
    .attr("stroke-width", 2)
    .on("click", function(d) { window.location.href = d.link; });

node.append("text")
    .attr("text-anchor", "middle")
    .attr("dy", ".35em")
    .text(d => d.label);

simulation.on("tick", () => {
  link
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.target.x)
