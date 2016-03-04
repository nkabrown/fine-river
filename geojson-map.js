d3.json('watershed.geojson', function(data) {
  createMap(data);
});

function createMap(contours) {
  const width = 805;
  const height = 562;

  const projection = d3.geo.mercator()
      .scale(1)
      .translate([0, 0])
      .precision(0);
   
  const path = d3.geo.path().projection(projection);

  const bounds = path.bounds(contours);

  // from Mike Bostock's Project to Bounding Box example http://bl.ocks.org/mbostock/4707858 
  const scale = .95 / Math.max((bounds[1][0] - bounds[0][0]) / width, (bounds[1][1] - bounds[0][1]) / height);
  const translate = [(width - scale * (bounds[1][0] + bounds[0][0])) / 2, (height - scale * (bounds[1][1] + bounds[0][1])) / 2];

  projection.scale(scale).translate(translate);

  const svg = d3.select('.map')
      .append('svg')
      .attr('width', width)
      .attr('height', height);

  svg.selectAll('path')
      .data(contours.features)
      .enter().append('path')
      .attr('d', path)
      .style('fill', 'none')
      .style('stroke', '#dedede');
}
