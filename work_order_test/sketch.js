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
  {'employee_name':'陳醫師','position':'full_time_doctor','prefer_work_shift':['1','2']},
  {'employee_name':'王醫師','position':'full_time_doctor','prefer_work_shift':['2','3']},
  {'employee_name':'宋醫師','position':'full_time_doctor','prefer_work_shift':['1','3']},
  {'employee_name':'林醫師','position':'full_time_doctor','prefer_work_shift':[]},
  {'employee_name':'陳護士','position':'full_time_nurse','prefer_work_shift':[]},
  {'employee_name':'林護士','position':'full_time_nurse','prefer_work_shift':[]},
  {'employee_name':'方護士','position':'full_time_nurse','prefer_work_shift':[]},
  {'employee_name':'何護士','position':'full_time_nurse','prefer_work_shift':[]},
  {'employee_name':'張護士','position':'full_time_nurse','prefer_work_shift':[]},
  {'employee_name':'周護士','position':'full_time_nurse','prefer_work_shift':[]},
  {'employee_name':'金藥劑師','position':'full_time_pharmacist','prefer_work_shift':[]},
  {'employee_name':'林藥劑師','position':'full_time_pharmacist','prefer_work_shift':[]},
  {'employee_name':'蔡藥劑師','position':'full_time_pharmacist','prefer_work_shift':[]},
  {'employee_name':'陳行政人員','position':'full_time_administration','prefer_work_shift':[]},
  {'employee_name':'王行政人員','position':'full_time_administration','prefer_work_shift':[]},
  {'employee_name':'弓行政人員','position':'full_time_administration','prefer_work_shift':['1']},
  {'employee_name':'毛行政人員','position':'part_time_administration','prefer_work_shift':[]},
  {'employee_name':'鐘行政人員','position':'part_time_administration','prefer_work_shift':[]},
  {'employee_name':'黃行政人員','position':'part_time_administration','prefer_work_shift':[]}

]
let month_job=[
  {
    'order_sequence':'0',
    'day_of_week':'2021-06-01',
    'job_require':[
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
    }],
    'day_off':['陳醫師','弓行政人員'],
    'want_morning_shift':['毛行政人員','王醫師'],
    'want_noon_shift':[],
    'want_night_shift':[],
    'dont_want_morning_shift':['金藥劑師'],
    'dont_want_noon_shift':[''],
    'dont_want_night_shift':['']
  },
  {
    'order_sequence':'1',
    'day_of_week':'2021-06-02',
    'job_require':[
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
    }],
    'day_off':['金藥劑師'],
    'want_morning_shift':['黃行政人員'],
    'want_noon_shift':[],
    'want_night_shift':[],
    'dont_want_morning_shift':[],
    'dont_want_noon_shift':[],
    'dont_want_night_shift':[]
  },
  {
    'order_sequence':'2',
    'day_of_week':'2021-06-03',
    'job_require':[
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
    }],
    'day_off':[],
    'want_morning_shift':[],
    'want_noon_shift':[],
    'want_night_shift':[],
    'dont_want_morning_shift':[],
    'dont_want_noon_shift':[],
    'dont_want_night_shift':[]
  },
  {
    'order_sequence':'3',
    'day_of_week':'2021-06-04',
    'job_require':[
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
    }],
    'day_off':[],
    'want_morning_shift':[],
    'want_noon_shift':[],
    'want_night_shift':[],
    'dont_want_morning_shift':[],
    'dont_want_noon_shift':[],
    'dont_want_night_shift':[]
  },
  {
    'order_sequence':'4',
    'day_of_week':'2021-06-05',
    'job_require':[
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
    }],
    'day_off':[],
    'want_morning_shift':[],
    'want_noon_shift':[],
    'want_night_shift':[],
    'dont_want_morning_shift':[],
    'dont_want_noon_shift':[],
    'dont_want_night_shift':[]
  },
  {
    'order_sequence':'5',
    'day_of_week':'2021-06-06',
    'job_require':[
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
    }],
    'day_off':[],
    'want_morning_shift':[],
    'want_noon_shift':[],
    'want_night_shift':[],
    'dont_want_morning_shift':[],
    'dont_want_noon_shift':[],
    'dont_want_night_shift':[]
  },
  {
    'order_sequence':'6',
    'day_of_week':'2021-06-07',
    'job_require':[
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
    }],
    'day_off':['陳醫師'],
    'want_morning_shift':[],
    'want_noon_shift':[],
    'want_night_shift':[],
    'dont_want_morning_shift':[],
    'dont_want_noon_shift':[],
    'dont_want_night_shift':[]
  },
  {
    'order_sequence':'7',
    'day_of_week':'2021-06-08',
    'job_require':[
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
    }],
    'day_off':['陳醫師','弓行政人員'],
    'want_morning_shift':['毛行政人員'],
    'want_noon_shift':[],
    'want_night_shift':[],
    'dont_want_morning_shift':['金藥劑師'],
    'dont_want_noon_shift':[''],
    'dont_want_night_shift':['']
  },
  {
    'order_sequence':'8',
    'day_of_week':'2021-06-09',
    'job_require':[
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
    }],
    'day_off':['金藥劑師'],
    'want_morning_shift':[],
    'want_noon_shift':[],
    'want_night_shift':[],
    'dont_want_morning_shift':[],
    'dont_want_noon_shift':[],
    'dont_want_night_shift':[]
  },
  {
    'order_sequence':'9',
    'day_of_week':'2021-06-10',
    'job_require':[
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
    }],
    'day_off':[],
    'want_morning_shift':[],
    'want_noon_shift':[],
    'want_night_shift':[],
    'dont_want_morning_shift':[],
    'dont_want_noon_shift':[],
    'dont_want_night_shift':[]
  },
  {
    'order_sequence':'10',
    'day_of_week':'2021-06-11',
    'job_require':[
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
    }],
    'day_off':[],
    'want_morning_shift':[],
    'want_noon_shift':[],
    'want_night_shift':[],
    'dont_want_morning_shift':[],
    'dont_want_noon_shift':[],
    'dont_want_night_shift':[]
  },
  {
    'order_sequence':'11',
    'day_of_week':'2021-06-12',
    'job_require':[
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
    }],
    'day_off':[],
    'want_morning_shift':[],
    'want_noon_shift':[],
    'want_night_shift':[],
    'dont_want_morning_shift':[],
    'dont_want_noon_shift':[],
    'dont_want_night_shift':[]
  },
  {
    'order_sequence':'12',
    'day_of_week':'2021-06-13',
    'job_require':[
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
    }],
    'day_off':[],
    'want_morning_shift':[],
    'want_noon_shift':[],
    'want_night_shift':[],
    'dont_want_morning_shift':[],
    'dont_want_noon_shift':[],
    'dont_want_night_shift':[]
  },
  {
    'order_sequence':'13',
    'day_of_week':'2021-06-14',
    'job_require':[
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
    }],
    'day_off':['陳醫師'],
    'want_morning_shift':[],
    'want_noon_shift':[],
    'want_night_shift':[],
    'dont_want_morning_shift':[],
    'dont_want_noon_shift':[],
    'dont_want_night_shift':[]
  },
  {
    'order_sequence':'14',
    'day_of_week':'2021-06-15',
    'job_require':[
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
    }],
    'day_off':['陳醫師','弓行政人員'],
    'want_morning_shift':['毛行政人員'],
    'want_noon_shift':[],
    'want_night_shift':[],
    'dont_want_morning_shift':['金藥劑師'],
    'dont_want_noon_shift':[''],
    'dont_want_night_shift':['']
  },
  {
    'order_sequence':'15',
    'day_of_week':'2021-06-16',
    'job_require':[
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
    }],
    'day_off':['金藥劑師'],
    'want_morning_shift':[],
    'want_noon_shift':[],
    'want_night_shift':[],
    'dont_want_morning_shift':[],
    'dont_want_noon_shift':[],
    'dont_want_night_shift':[]
  },
  {
    'order_sequence':'16',
    'day_of_week':'2021-06-17',
    'job_require':[
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
    }],
    'day_off':[],
    'want_morning_shift':[],
    'want_noon_shift':[],
    'want_night_shift':[],
    'dont_want_morning_shift':[],
    'dont_want_noon_shift':[],
    'dont_want_night_shift':[]
  },
  {
    'order_sequence':'17',
    'day_of_week':'2021-06-18',
    'job_require':[
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
    }],
    'day_off':[],
    'want_morning_shift':[],
    'want_noon_shift':[],
    'want_night_shift':[],
    'dont_want_morning_shift':[],
    'dont_want_noon_shift':[],
    'dont_want_night_shift':[]
  },
  {
    'order_sequence':'18',
    'day_of_week':'2021-06-19',
    'job_require':[
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
    }],
    'day_off':[],
    'want_morning_shift':[],
    'want_noon_shift':[],
    'want_night_shift':[],
    'dont_want_morning_shift':[],
    'dont_want_noon_shift':[],
    'dont_want_night_shift':[]
  },
  {
    'order_sequence':'19',
    'day_of_week':'2021-06-20',
    'job_require':[
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
    }],
    'day_off':[],
    'want_morning_shift':[],
    'want_noon_shift':[],
    'want_night_shift':[],
    'dont_want_morning_shift':[],
    'dont_want_noon_shift':[],
    'dont_want_night_shift':[]
  },
  {
    'order_sequence':'20',
    'day_of_week':'2021-06-21',
    'job_require':[
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
    }],
    'day_off':['陳醫師'],
    'want_morning_shift':[],
    'want_noon_shift':[],
    'want_night_shift':[],
    'dont_want_morning_shift':[],
    'dont_want_noon_shift':[],
    'dont_want_night_shift':[]
  },
  {
    'order_sequence':'21',
    'day_of_week':'2021-06-22',
    'job_require':[
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
    }],
    'day_off':['陳醫師','弓行政人員'],
    'want_morning_shift':['毛行政人員'],
    'want_noon_shift':[],
    'want_night_shift':[],
    'dont_want_morning_shift':['金藥劑師'],
    'dont_want_noon_shift':[''],
    'dont_want_night_shift':['']
  },
  {
    'order_sequence':'22',
    'day_of_week':'2021-06-23',
    'job_require':[
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
    }],
    'day_off':['金藥劑師'],
    'want_morning_shift':[],
    'want_noon_shift':[],
    'want_night_shift':[],
    'dont_want_morning_shift':[],
    'dont_want_noon_shift':[],
    'dont_want_night_shift':[]
  },
  {
    'order_sequence':'23',
    'day_of_week':'2021-06-24',
    'job_require':[
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
    }],
    'day_off':[],
    'want_morning_shift':[],
    'want_noon_shift':[],
    'want_night_shift':[],
    'dont_want_morning_shift':[],
    'dont_want_noon_shift':[],
    'dont_want_night_shift':[]
  },
  {
    'order_sequence':'24',
    'day_of_week':'2021-06-25',
    'job_require':[
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
    }],
    'day_off':[],
    'want_morning_shift':[],
    'want_noon_shift':[],
    'want_night_shift':[],
    'dont_want_morning_shift':[],
    'dont_want_noon_shift':[],
    'dont_want_night_shift':[]
  },
  {
    'order_sequence':'25',
    'day_of_week':'2021-06-26',
    'job_require':[
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
    }],
    'day_off':[],
    'want_morning_shift':[],
    'want_noon_shift':[],
    'want_night_shift':[],
    'dont_want_morning_shift':[],
    'dont_want_noon_shift':[],
    'dont_want_night_shift':[]
  },
  {
    'order_sequence':'26',
    'day_of_week':'2021-06-27',
    'job_require':[
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
    }],
    'day_off':[],
    'want_morning_shift':[],
    'want_noon_shift':[],
    'want_night_shift':[],
    'dont_want_morning_shift':[],
    'dont_want_noon_shift':[],
    'dont_want_night_shift':[]
  },
  {
    'order_sequence':'27',
    'day_of_week':'2021-06-28',
    'job_require':[
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
    }],
    'day_off':['陳醫師'],
    'want_morning_shift':[],
    'want_noon_shift':[],
    'want_night_shift':[],
    'dont_want_morning_shift':[],
    'dont_want_noon_shift':[],
    'dont_want_night_shift':[]
  },
  {
    'order_sequence':'28',
    'day_of_week':'2021-06-29',
    'job_require':[
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
    }],
    'day_off':[],
    'want_morning_shift':[],
    'want_noon_shift':[],
    'want_night_shift':[],
    'dont_want_morning_shift':[],
    'dont_want_noon_shift':[],
    'dont_want_night_shift':[]
  },
  {
    'order_sequence':'29',
    'day_of_week':'2021-06-30',
    'job_require':[
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
    }],
    'day_off':['陳醫師'],
    'want_morning_shift':[],
    'want_noon_shift':[],
    'want_night_shift':[],
    'dont_want_morning_shift':[],
    'dont_want_noon_shift':[],
    'dont_want_night_shift':[]
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

function setup(job) {
  //queue_num
  // bestPhrase = createP("Best phrase:");
  // //bestPhrase.position(10,10);
  // bestPhrase.class("best");
  if(job==31){
    console.log(13);
    
  }
  // allPhrases = createP("All phrases:");
  // allPhrases.position(600, 10);
  // allPhrases.class("all");

  // stats = createP("Stats");
  // //stats.position(10,200);
  // stats.class("stats");

  //createCanvas(640, 360);
  // target = "To be or not to be.";
  // target = month_job[0];
  target = job;
  popmax = 300;
  // mutationRate = 0.01;
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

    // my_p5._start(month_job[population.getTarget().day_of_week]); //51639行
    // my_p5._start(month_job[1]); //51639行
    // var p1=new p5;
    // p1._start(month_job[1]); //51639行

  }

  displayInfo();
}

function displayInfo() {


  //這個地方Dom 元素要JS 創建
  // Display current status of population
  let answer = population.getBest();
  let best_genes=population.getBestGenes();

  //先清空
  for(let i=1;i<=3;i++){
    $(`#full_time_doctor_${i}_${population.getTarget().day_of_week}`).text('');
    $(`#full_time_pharmacist_${i}_${population.getTarget().day_of_week}`).text('');
    $(`#full_time_administration_${i}_${population.getTarget().day_of_week}`).text('');
    $(`#full_time_nurse_${i}_${population.getTarget().day_of_week}`).text('');
    $(`#full_time_administration_${i}_${population.getTarget().day_of_week}`).text('');
    $(`#part_time_administration_${i}_${population.getTarget().day_of_week}`).text('');
  }

  
  $(`#full_time_doctor_1_${population.getTarget().day_of_week}`).text(best_genes.filter((n)=>n.position=='full_time_doctor' && n.shift_type=='1').map((n)=>n.employee_name).join(' / '));
  $(`#full_time_doctor_2_${population.getTarget().day_of_week}`).text(best_genes.filter((n)=>n.position=='full_time_doctor' && n.shift_type=='2').map((n)=>n.employee_name).join(' / '));
  $(`#full_time_doctor_3_${population.getTarget().day_of_week}`).text(best_genes.filter((n)=>n.position=='full_time_doctor' && n.shift_type=='3').map((n)=>n.employee_name).join(' / '));

  $(`#full_time_pharmacist_1_${population.getTarget().day_of_week}`).text(best_genes.filter((n)=>n.position=='full_time_pharmacist' && n.shift_type=='1').map((n)=>n.employee_name).join(' / '));
  $(`#full_time_pharmacist_2_${population.getTarget().day_of_week}`).text(best_genes.filter((n)=>n.position=='full_time_pharmacist' && n.shift_type=='2').map((n)=>n.employee_name).join(' / '));
  $(`#full_time_pharmacist_3_${population.getTarget().day_of_week}`).text(best_genes.filter((n)=>n.position=='full_time_pharmacist' && n.shift_type=='3').map((n)=>n.employee_name).join(' / '));
  
  $(`#full_time_nurse_1_${population.getTarget().day_of_week}`).text(best_genes.filter((n)=>n.position=='full_time_nurse' && n.shift_type=='1').map((n)=>n.employee_name).join(' / '));
  $(`#full_time_nurse_2_${population.getTarget().day_of_week}`).text(best_genes.filter((n)=>n.position=='full_time_nurse' && n.shift_type=='2').map((n)=>n.employee_name).join(' / '));
  $(`#full_time_nurse_3_${population.getTarget().day_of_week}`).text(best_genes.filter((n)=>n.position=='full_time_nurse' && n.shift_type=='3').map((n)=>n.employee_name).join(' / '));

  $(`#full_time_administration_1_${population.getTarget().day_of_week}`).text(best_genes.filter((n)=>n.position=='full_time_administration' && n.shift_type=='1').map((n)=>n.employee_name).join(' / '));
  $(`#full_time_administration_2_${population.getTarget().day_of_week}`).text(best_genes.filter((n)=>n.position=='full_time_administration' && n.shift_type=='2').map((n)=>n.employee_name).join(' / '));
  $(`#full_time_administration_3_${population.getTarget().day_of_week}`).text(best_genes.filter((n)=>n.position=='full_time_administration' && n.shift_type=='3').map((n)=>n.employee_name).join(' / '));

  $(`#part_time_administration_1_${population.getTarget().day_of_week}`).text(best_genes.filter((n)=>n.position=='part_time_administration' && n.shift_type=='1').map((n)=>n.employee_name).join(' / '));
  $(`#part_time_administration_2_${population.getTarget().day_of_week}`).text(best_genes.filter((n)=>n.position=='part_time_administration' && n.shift_type=='2').map((n)=>n.employee_name).join(' / '));
  $(`#part_time_administration_3_${population.getTarget().day_of_week}`).text(best_genes.filter((n)=>n.position=='part_time_administration' && n.shift_type=='3').map((n)=>n.employee_name).join(' / '));


  
  
  $(`#full_time_doctor_day_off_${population.getTarget().day_of_week}`).text(population.getTarget().day_off.join(' / '));

  $('#week_num_'+population.getTarget().day_of_week).val(population.getTarget().day_of_week);
  $('#best_solution_'+population.getTarget().day_of_week).val(answer+" ");
  $('#total_generations_'+population.getTarget().day_of_week).val(population.getGenerations());
  $('#total_population_'+population.getTarget().day_of_week).val(popmax);
  $('#mutation_rate_'+population.getTarget().day_of_week).val(floor(mutationRate * 100) + "%");
  $('#all_record_'+population.getTarget().day_of_week).val(population.allPhrases());
  $('#current_fitness_'+population.getTarget().day_of_week).val(population.currentFitness());
  $('#shift_duplicate_fitness_'+population.getTarget().day_of_week).val(population.currentShiftDuplicateFitness());
  $('#human_work_fitness_'+population.getTarget().day_of_week).val(population.currentHumanWorkFitness());
  // $('#work_overtime_fitness_'+population.getTarget().day_of_week).val(population.currentWorkOvertimeFitness());
  
  $('#vacation_check_fitness_'+population.getTarget().day_of_week).val(population.getVacationCheck());
  $('#advance_shift_fitness_'+population.getTarget().day_of_week).val(population.getAdvanceShiftCode());

  let current_employee_name=[];
  let employee_array=[];
  employee.map((n)=>employee_array.push(n.employee_name));
  best_genes.map((n)=>current_employee_name.push(n.employee_name));
  population.getTarget().day_off.map((n)=>current_employee_name.push(n));

  let no_work = employee_array.filter(function(employee) {
    return !current_employee_name.includes(employee);
  });
  $(`#not_yet_asign_work_${population.getTarget().day_of_week}`).text(no_work.join(' / '));

  $('#prefer_shift_fitness_'+population.getTarget().day_of_week).val(population.getPreferShiftTypeScore());
}
