// start slingin' some d3 here.

var dataEnemies = d3.range(20).map(function() {
  return {r: 10, cx: Math.random()*500, cy: Math.random()*500, fill: 'black', stroke: 'red' }
})

var dataPlayers = [{cx: '60', cy: '60', r: 10, fill: 'red'}];



var svg = d3.select("body").append("svg")
  .attr("width", 500)
  .attr("height", 500)
  .append("g")
  //.attr("transform", "translate(32," + (500 / 2) + ")");


var randNumGen = function() { return Math.floor(Math.random() * 400); }


// create enemies the first time
var enemy = svg.selectAll('.enemy')
  .data(dataEnemies)
  .enter().append('circle')
    .transition()
    .attr('class', 'enemy')
    .attr('cx',     function(d){ return d.cx;     })
    .attr('cy',     function(d){ return d.cy;     })
    .attr('r',      function(d){ return d.r;      })
    .attr('fill',   function(d){ return d.fill;   })
    .attr('stroke', function(d){ return d.stroke; })

//update enemy location
var move = function(element) {
  element
    .transition()
      .duration(2000)
      .attr('cx',randNumGen)
      .attr('cy',randNumGen)
      .each('end', function(){
        move(d3.select(this))
      })
}
move(enemy);

var players = svg.selectAll('.player').data(dataPlayers)

var drag = d3.behavior.drag()
  .on('dragstart', function() { players.style('fill', 'blue'); })
  .on('drag',      function() { players.attr('cx', d3.event.x).attr('cy', d3.event.y);})
  .on('dragend',   function() { players.style('fill', 'black'); });

players
  .enter()
  .append('circle')
  .attr('class', 'player')
  .attr('cx',   function(d){ return d.cx; })
  .attr('cy',   function(d){ return d.cy; })
  .attr('r',    function(d){ return d.r; })
  .attr('fill', function(d){ return d.fill; })
  .call(drag);


var prevCollision = false;

var detectCollisions = function(){

  var collision = false;

  enemy.each(function(){
    var x = this.cx - parseInt(players.attr('cx'));
    var y = this.cy - parseInt(players.attr('cy'));
    if( Math.sqrt(x*x + y*y) < 20 ){
      collision = true;
    }
  });

  if(collision) {
    score = 0;
    svg.style('background-color', 'red');
    if( prevCollision != collision){
      collisionCount = collisionCount + 1;
    }
  } else {
    svg.style('background-color', 'white');
  }
  prevCollision = collision;
};

d3.timer(detectCollisions);
