function setup() {
  createCanvas(800, 800);
  reset();
}

var timeDelta = 1.0 / 60.0;
var stars = [];
var numStars = 20;
var gravity =new p5.Vector(0, 200);

function reset()
{
  stars = [];
  var x = random(0, width);
  var y = random(0, width);
  var r = random(0, 255);
  var g = random(0, 255);
  var b = random(0, 255);
  for(var i = 0 ; i < numStars; i ++)
  {
    var star = new Star(x, y, random(10, 20), int(random(3, 8)), r,g,b, random(2, 5), 200);
    stars.push(star);
  }
}

var last = 0;

function draw() {
  background(0);
  for(var i = 0 ; i < stars.length; i ++)
  {
    stars[i].update();
    stars[i].render();
    if (stars[i].alive > stars[i].timeToLive)
    {
      reset();
    }
  }
  var now = millis();
  timeDelta = (now - last) / 1000.0;
  last = now;
  /*
  stars.forEach(function(star)
    {
      print(star.radius + "\n");
      //star.update();
      star.render();
    }
    );
    */
}

function Star(cx,cy,radius,points,r,g,b, timeToLive, maxSpeed) {
  var pos = new p5.Vector(cx, cy);
  var velocity = new p5.Vector(random(-maxSpeed, maxSpeed), random(-maxSpeed * 2, 0));
  this.radius = radius;
  this.points = points;
  this.r = r + random(-50, 50);
  this.g = g + random(-50, 50);
  this.b = b + random(-50, 50);
  
  this.rot = 0;
  this.rotSpeed = random(-20, 20);
  this.timeToLive = timeToLive;
  this.alive = 0;
  
  this.update = function() {
    velocity.add(p5.Vector.mult(gravity, timeDelta));
    pos.add(p5.Vector.mult(velocity, timeDelta));
    this.rot += this.rotSpeed * timeDelta;
    this.alive += timeDelta;
  };

  this.render = function() {
    var thetaInc = TWO_PI / (points * 2);
    var lastX;
    var lastY;
    lastX = 0;
    lastY = -radius; 
    
    push();
    translate(pos.x, pos.y);
    rotate(this.rot);
    var trans = (1.0 - (this.alive / this.timeToLive)) * 300.0;
    stroke(this.r, this.g, this.b, trans);

    for (var i = 1 ; i <= (points * 2) ; i ++)
    {
      var theta = i * thetaInc;
      var x, y;
      var r;
      if (i % 2 == 1)
      {
        r = radius * 0.5;
      }
      else
      {
        r = radius;        
      }

      x = sin(theta) * r;
      y = -cos(theta) * r;
      line(lastX, lastY, x, y);
      lastX = x;
      lastY = y;      
    }
    pop();
  };
}