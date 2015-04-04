// start slingin' some d3 here.
var dataEnemies = [{cx: '60', cy: '60', r: '50', fill: 'red', stroke: 'black'},
                  {cx: '60', cy: '60', r: '50', fill: 'red', stroke: 'black'},
                  {cx: '60', cy: '60', r: '50', fill: 'red', stroke: 'black'},
                  {cx: '60', cy: '60', r: '50', fill: 'red', stroke: 'black'}];


var dataPlayers = [{cx: '60', cy: '60', r: '40', fill: 'black'}];

// for (var i= 0; i < 1; i++){
//   dataEnemies.push(dataEnemies[0]);
// }

var drag = d3.behavior.drag()
  .on('dragstart', function() { players.style('fill', 'blue'); })
  .on('drag',      function() { players.attr('cx', d3.event.x).attr('cy', d3.event.y); console.log(players.attr('cx'))})
  .on('dragend',   function() { players.style('fill', 'black'); });

var svg = d3.select("body").append("svg")
  .attr("width", 500)
  .attr("height", 500)
  .append("g")
  .attr("transform", "translate(32," + (500 / 2) + ")");

var enemies = svg.selectAll('.enemy')
  .data(dataEnemies)
  .enter()
  .append('circle')
  .attr('class', 'enemy')
  .attr('cx',     function(d){ return d.cx;     })
  .attr('cy',     function(d){ return d.cy;     })
  .attr('r',      function(d){ return d.r;      })
  .attr('fill',   function(d){ return d.fill;   })
  .attr('stroke', function(d){ return d.stroke; })

var players = svg.selectAll('.player')
  .data(dataPlayers)
  .enter()
  .append('circle')
  .attr('class', 'player')
  .attr('cx',   function(d){ return d.cx; })
  .attr('cy',   function(d){ return d.cy; })
  .attr('r',    function(d){ return d.r; })
  .attr('fill', function(d){ return d.fill; })
  .call(drag);

var randNumGen = function() { return Math.floor(Math.random() * 400); }


var update = function(data) {
  console.log('update')
  dataEnemies.forEach(function(enemy, i) {
    enemy.cx = randNumGen();
    enemy.cy = randNumGen();
  });

  enemies
    .data(dataEnemies)
    .enter()
    .append('.enemy')
    .attr('cx', function(d){
      return d.cx
    })
    .attr('cy', function(d){
      return d.cy;
    });
}

var distance = function( point1x, point1y, point2x, point2y) {
  var xs = 0;
  var ys = 0;

  xs = point2x - point1x;
  xs = xs * xs;

  ys = point2y - point1y;
  ys = ys * ys;

  return Math.sqrt( xs + ys );
}

var checkCollision = function(enemy) {
  console.log(enemies.attr())
  // var circ = d3.selectAll('.enemy');
  // console.log(circ.each(function(d,i){
  //   return this.attr('cx')}));
  // var r = players.attr('r');
  // var x = players.attr('cx');
  // var y = players.attr('cy');

  // console.log(enemies.attr('cx'))

  // enemies.each(function(d, i) {
  //   console.log(i.attr('cx'))
  //   console.log(i.attr('cy'))
  //   console.log(i.attr('r'))

    // if (distance(x, y, d.cx, d.cy) < (r + d.r)) {
    //   console.log('work')
    // }
  // });
}

setInterval(function() {
  update(dataEnemies)
}, 1000);

setInterval(function() {
  checkCollision();
}, 3000);
