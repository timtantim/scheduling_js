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

let work_order_code=[
  {'work_order_code':'W202105210001','due_date':'20210630','priority':0},
  {'work_order_code':'W202105210002','due_date':'20210621','priority':1},
  {'work_order_code':'W202105210003','due_date':'20210627','priority':2},
  {'work_order_code':'W202105210004','due_date':'20210528','priority':1},
  {'work_order_code':'W202105210005','due_date':'20210619','priority':3}
]

let employee=[
  {'employee_name':'陳醫師','position':'full_time_doctor'},
  {'employee_name':'王醫師','position':'full_time_doctor'},
  {'employee_name':'宋醫師','position':'full_time_doctor'},
  {'employee_name':'林醫師','position':'full_time_doctor'},
  {'employee_name':'陳護士','position':'full_time_nurse'},
  {'employee_name':'林護士','position':'full_time_nurse'},
  {'employee_name':'方護士','position':'full_time_nurse'},
  {'employee_name':'何護士','position':'full_time_nurse'},
  {'employee_name':'張護士','position':'full_time_nurse'},
  {'employee_name':'周護士','position':'full_time_nurse'},
  {'employee_name':'金藥劑師','position':'full_time_pharmacist'},
  {'employee_name':'林藥劑師','position':'full_time_pharmacist'},
  {'employee_name':'蔡藥劑師','position':'full_time_pharmacist'},
  {'employee_name':'陳行政人員','position':'full_time_administration'},
  {'employee_name':'王行政人員','position':'full_time_administration'},
  {'employee_name':'弓行政人員','position':'full_time_administration'},
  {'employee_name':'毛行政人員','position':'part_time_administration'},
  {'employee_name':'鐘行政人員','position':'part_time_administration'}

]
let month_job=[
  {'day_of_week':'1','job_require':[
    {
      'full_time_doctor_morning_shift':1,
      'full_time_nurse_morning_shift':3,
      'full_time_pharmacist_morning_shift':2,
      'full_time_administration_staff_morning_shift':2,
      'part_time_administration_staff_morning_shift':1,
      'full_time_doctor_noon_shift':2,
      'full_time_nurse_noon_shift':3,
      'full_time_pharmacist_noon_shift':2,
      'full_time_administration_staff_noon_shift':2,
      'part_time_administration_staff_noon_shift':1,
      'full_time_doctor_night_shift':3,
      'full_time_nurse_night_shift':4,
      'full_time_pharmacist_night_shift':2,
      'full_time_administration_staff_night_shift':2,
      'part_time_administration_staff_night_shift':1
    }]
  },
  {'day_of_week':'2','job_require':[
    {
      'full_time_doctor_morning_shift':1,
      'full_time_nurse_morning_shift':3,
      'full_time_pharmacist_morning_shift':2,
      'full_time_administration_staff_morning_shift':2,
      'part_time_administration_staff_morning_shift':1,
      'full_time_doctor_noon_shift':2,
      'full_time_nurse_noon_shift':3,
      'full_time_pharmacist_noon_shift':2,
      'full_time_administration_staff_noon_shift':2,
      'part_time_administration_staff_noon_shift':1,
      'full_time_doctor_night_shift':3,
      'full_time_nurse_night_shift':4,
      'full_time_pharmacist_night_shift':2,
      'full_time_administration_staff_night_shift':2,
      'part_time_administration_staff_night_shift':1
    }]
  },
  {'day_of_week':'3','job_require':[
    {
      'full_time_doctor_morning_shift':1,
      'full_time_nurse_morning_shift':3,
      'full_time_pharmacist_morning_shift':2,
      'full_time_administration_staff_morning_shift':2,
      'part_time_administration_staff_morning_shift':1,
      'full_time_doctor_noon_shift':2,
      'full_time_nurse_noon_shift':3,
      'full_time_pharmacist_noon_shift':2,
      'full_time_administration_staff_noon_shift':2,
      'part_time_administration_staff_noon_shift':1,
      'full_time_doctor_night_shift':3,
      'full_time_nurse_night_shift':4,
      'full_time_pharmacist_night_shift':2,
      'full_time_administration_staff_night_shift':2,
      'part_time_administration_staff_night_shift':1
    }]
  },
  {'day_of_week':'4','job_require':[
    {
      'full_time_doctor_morning_shift':1,
      'full_time_nurse_morning_shift':3,
      'full_time_pharmacist_morning_shift':2,
      'full_time_administration_staff_morning_shift':2,
      'part_time_administration_staff_morning_shift':1,
      'full_time_doctor_noon_shift':2,
      'full_time_nurse_noon_shift':3,
      'full_time_pharmacist_noon_shift':2,
      'full_time_administration_staff_noon_shift':2,
      'part_time_administration_staff_noon_shift':1,
      'full_time_doctor_night_shift':3,
      'full_time_nurse_night_shift':4,
      'full_time_pharmacist_night_shift':2,
      'full_time_administration_staff_night_shift':2,
      'part_time_administration_staff_night_shift':1
    }]
  },
  {'day_of_week':'5','job_require':[
    {
      'full_time_doctor_morning_shift':1,
      'full_time_nurse_morning_shift':3,
      'full_time_pharmacist_morning_shift':2,
      'full_time_administration_staff_morning_shift':2,
      'part_time_administration_staff_morning_shift':1,
      'full_time_doctor_noon_shift':2,
      'full_time_nurse_noon_shift':3,
      'full_time_pharmacist_noon_shift':2,
      'full_time_administration_staff_noon_shift':2,
      'part_time_administration_staff_noon_shift':1,
      'full_time_doctor_night_shift':3,
      'full_time_nurse_night_shift':4,
      'full_time_pharmacist_night_shift':2,
      'full_time_administration_staff_night_shift':2,
      'part_time_administration_staff_night_shift':1
    }]
  },
  {'day_of_week':'6','job_require':[
    {
      'full_time_doctor_morning_shift':2,
      'full_time_nurse_morning_shift':3,
      'full_time_pharmacist_morning_shift':1,
      'full_time_administration_staff_morning_shift':1,
      'part_time_administration_staff_morning_shift':2,
      'full_time_doctor_noon_shift':2,
      'full_time_nurse_noon_shift':3,
      'full_time_pharmacist_noon_shift':1,
      'full_time_administration_staff_noon_shift':1,
      'part_time_administration_staff_noon_shift':2,
      'full_time_doctor_night_shift':2,
      'full_time_nurse_night_shift':3,
      'full_time_pharmacist_night_shift':1,
      'full_time_administration_staff_night_shift':1,
      'part_time_administration_staff_night_shift':2
    }]
  },
  {'day_of_week':'7','job_require':[
    {
      'full_time_doctor_morning_shift':2,
      'full_time_nurse_morning_shift':3,
      'full_time_pharmacist_morning_shift':1,
      'full_time_administration_staff_morning_shift':1,
      'part_time_administration_staff_morning_shift':2,
      'full_time_doctor_noon_shift':2,
      'full_time_nurse_noon_shift':3,
      'full_time_pharmacist_noon_shift':1,
      'full_time_administration_staff_noon_shift':1,
      'part_time_administration_staff_noon_shift':2,
      'full_time_doctor_night_shift':2,
      'full_time_nurse_night_shift':3,
      'full_time_pharmacist_night_shift':1,
      'full_time_administration_staff_night_shift':1,
      'part_time_administration_staff_night_shift':2
    }]
  }
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
function randomNoRepeats(array) {
  var copy = array.slice(0);
  return function() {
    if (copy.length < 1) { copy = array.slice(0); }
    var index = Math.floor(Math.random() * copy.length);
    var item = copy[index];
    copy.splice(index, 1);
    return item;
  };
}
let permute_work_order=permute(work_order_code);
function random_item(items)
{
  return items[Math.floor(Math.random()*items.length)];    
}

function setup() {
  //queue_num
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
  // target = "To be or not to be.";
  target = month_job[0];
  // target = queue_num;
  popmax = 300;
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
    // alert('結束')
  }

  displayInfo();
}

function displayInfo() {
  //這個地方Dom 元素要JS 創建
  // Display current status of population
  let answer = population.getBest();

  // bestPhrase.html("Best phrase:<br>" + answer);
  $('#best_solution').val(answer+" ");
  $('#total_generations').val(population.getGenerations());
  $('#total_population').val(popmax);
  $('#mutation_rate').val(floor(mutationRate * 100) + "%");
  $('#all_record').val(population.allPhrases());
  $('#current_fitness').val(population.currentFitness());
  $('#shift_duplicate_fitness').val(population.currentShiftDuplicateFitness());
  $('#human_work_fitness').val(population.currentHumanWorkFitness());
  $('#work_overtime_fitness').val(population.currentWorkOvertimeFitness());
  
  

  // let statstext =
  //   "total generations:     " + population.getGenerations() + "<br>";
  // statstext +=
  //   "average fitness:       " + nf(population.getAverageFitness()) + "<br>";
  // statstext += "total population:      " + popmax + "<br>";
  // statstext += "mutation rate:         " + floor(mutationRate * 100) + "%";

  // stats.html(statstext);
  // allPhrases.html("All phrases:<br>" + population.allPhrases());
}
