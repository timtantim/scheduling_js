let customRandom= function(min, max) {
    var rand= Math.random();
 
    if (typeof min === 'undefined') {
      return rand;
    } else if (typeof max === 'undefined') {
      if (min instanceof Array) {
        return min[Math.floor(rand * min.length)];
      } else {
        return rand * min;
      }
    } else {
      if (min > max) {
        var tmp = min;
        min = max;
        max = tmp;
      }

      return rand * (max - min) + min;
    }
  };

let customMap= function( n,start1,stop1,start2,stop2,withinBounds) {
    let newval = (n - start1) / (stop1 - start1) * (stop2 - start2) + start2;
    return newval;
  };