// Shakespeare
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/jv3CgDN9sc
// https://thecodingtrain.com/more/achive/nature-of-code/9-genetic-algorithms/9.4-looking-at-code.html
// https://editor.p5js.org/codingtrain/sketches/PqRSmKLQU

// http://natureofcode.com

// Genetic Algorithm, Evolving Shakespeare

// Demonstration of using a genetic algorithm to perform a search

// setup()
//  # Step 1: The Population
//    # Create an empty population (an array or ArrayList)
//    # Fill it with DNA encoded objects (pick random values to start)

// draw()
//  # Step 1: Selection
//    # Create an empty mating pool (an empty ArrayList)
//    # For every member of the population, evaluate its fitness based on some criteria / function,
//      and add it to the mating pool in a manner consistant with its fitness, i.e. the more fit it
//      is the more times it appears in the mating pool, in order to be more likely picked for reproduction.

//  # Step 2: Reproduction Create a new empty population
//    # Fill the new population by executing the following steps:
//       1. Pick two "parent" objects from the mating pool.
//       2. Crossover -- create a "child" object by mating these two parents.
//       3. Mutation -- mutate the child's DNA based on a given probability.
//       4. Add the child object to the new population.
//    # Replace the old population with the new population
//
//   # Rinse and repeat

let target;
let popmax;
let mutationRate;
let population;

let bestPhrase;
let allPhrases;
let stats;

// let work_order_code=[
//   {'work_order_code':'W202105210001','due_date':'20210630','priority':0},
//   {'work_order_code':'W202105210002','due_date':'20210621','priority':1},
//   {'work_order_code':'W202105210003','due_date':'20210627','priority':2},
//   {'work_order_code':'W202105210004','due_date':'20210528','priority':1},
//   {'work_order_code':'W202105210005','due_date':'20210619','priority':3}
// ]
let work_order_code=[
  {'work_order_code':'W202105210001','due_date':'20210630','priority':0,'process_time':3},
  {'work_order_code':'W202105210002','due_date':'20210621','priority':1,'process_time':6},
  {'work_order_code':'W202105210003','due_date':'20210527','priority':2,'process_time':8},
  {'work_order_code':'W202105210004','due_date':'20210527','priority':1,'process_time':7},
  {'work_order_code':'W202105210005','due_date':'20210619','priority':3,'process_time':8}
]
let permArr = [],
  usedChars = [];

function permute(input) {
  let i, ch;
  for (i = 0; i < input.length; i++) {
    ch = input.splice(i, 1)[0];
    usedChars.push(ch);
    if (input.length == 0) {
      permArr.push(usedChars.slice());
    }
    permute(input);
    input.splice(i, 0, ch);
    usedChars.pop();
  }
  return permArr
};
let permute_work_order=permute(work_order_code);
function random_item(items)
{
  return items[Math.floor(Math.random()*items.length)];    
}

function setup() {
  // bestPhrase = createP("Best phrase:");
  // //bestPhrase.position(10,10);
  // bestPhrase.class("best");

  // allPhrases = createP("All phrases:");
  // allPhrases.position(600, 10);
  // allPhrases.class("all");

  // stats = createP("Stats");
  // //stats.position(10,200);
  // stats.class("stats");

  //createCanvas(640, 360);
  target = "To be or not to be.";
  popmax = 200;
  mutationRate = 0.01;

  // Create a population with a target phrase, mutation rate, and population max
  population = new Population(target, mutationRate, popmax);
 

}

function draw() {
  // Generate mating pool
  population.naturalSelection();
  //Create next generation
  population.generate();
  // Calculate fitness
  population.calcFitness();

  population.evaluate();

  // If we found the target phrase, stop
  if (population.isFinished()) {
    //println(millis()/1000.0);
    noLoop();
  }

  displayInfo();
}

function displayInfo() {
  // Display current status of population
  let answer = population.getBest();

  // bestPhrase.html("Best phrase:<br>" + answer);
$('#best_solution').val(answer+" ");
$('#total_generations').val(population.getGenerations());
$('#total_population').val(popmax);
$('#mutation_rate').val(floor(mutationRate * 100) + "%");
$('#all_record').val(population.allPhrases());

  // let statstext =
  //   "total generations:     " + population.getGenerations() + "<br>";
  // statstext +=
  //   "average fitness:       " + nf(population.getAverageFitness()) + "<br>";
  // statstext += "total population:      " + popmax + "<br>";
  // statstext += "mutation rate:         " + floor(mutationRate * 100) + "%";

  // stats.html(statstext);
  // allPhrases.html("All phrases:<br>" + population.allPhrases());
}
