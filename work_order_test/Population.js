// Shakespeare
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/jv3CgDN9sc
// https://thecodingtrain.com/more/achive/nature-of-code/9-genetic-algorithms/9.4-looking-at-code.html
// https://editor.p5js.org/codingtrain/sketches/PqRSmKLQU

// http://natureofcode.com

// Genetic Algorithm, Evolving Shakespeare

// A class to describe a population of virtual organisms
// In this case, each organism is just an instance of a DNA object

class Population {
  constructor(p, m, num) {
    this.population; // Array to hold the current population
    this.matingPool; // ArrayList which we will use for our "mating pool"
    this.generations = 0; // Number of generations
    this.finished = false; // Are we finished evolving?
    this.target = p; // Target phrase
    this.mutationRate = m; // Mutation rate
    this.perfectScore = 1;

    this.best = "";

    this.population = [];
    for (let i = 0; i < num; i++) {
      // this.population[i] = new DNA(this.target.length);
      if(target.day_off!=undefined){
        this.population[i] = new DNA(this.target);
      }
    }
    this.matingPool = [];
    this.calcFitness();
    // console.log('execute time');
    
  }

  // Fill our fitness array with a value for every member of the population
  calcFitness() {
    for (let i = 0; i < this.population.length; i++) {
      this.population[i].calcFitness(target);  //沒有target 因此忽略
    }
  }

  // Generate a mating pool
  naturalSelection() {
    // Clear the ArrayList
    this.matingPool = [];

    let maxFitness = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > maxFitness) {
        maxFitness = this.population[i].fitness;
      }
    }
    //感覺是要選出好的基因 

    // Based on fitness, each member will get added to the mating pool a certain number of times
    // a higher fitness = more entries to mating pool = more likely to be picked as a parent
    // a lower fitness = fewer entries to mating pool = less likely to be picked as a parent
    for (let i = 0; i < this.population.length; i++) {
      let fitness = map(this.population[i].fitness, 0, maxFitness, 0, 1);
      // console.log('hello:',fitness);
      let n = floor(fitness * 100); // Arbitrary multiplier, we can also use monte carlo method
      // console.log('pp:',n);
      for (let j = 0; j < n; j++) {
        // and pick two random numbers
        this.matingPool.push(this.population[i]);
      }
    }
  }

  // Create a new generation
  generate() {
    // Refill the population with children from the mating pool
    for (let i = 0; i < this.population.length; i++) {
      let a = floor(random(this.matingPool.length));
      let b = floor(random(this.matingPool.length));
      let partnerA = this.matingPool[a];
      let partnerB = this.matingPool[b];
      if(partnerA==undefined){
        console.log('aa');
        
      }
      let child = partnerA.crossover(partnerB);
      child.mutate(this.mutationRate);
      this.population[i] = child;
    }
    this.generations++;
  }

  getBest() {
    return this.best;
  }

  // Compute the current "most fit" member of the population
  evaluate() {
    let worldrecord = 0.0;
    let shift_duplicate_block=0.0; // 同一班次不得重複 必須滿分 0.2
    let human_work_block=0.0;//最低人力配置 必須滿分 0.2
    let vacation_check=0.0;// 排休必須滿分 0.2
    let advance_sheet_block=0.0;//預排班表必須滿分0.2
    let prefer_shift_type_score_block=0.0;// 分數可高可低
    // let work_overtime_block=0.0;
    let best_genes='';
    let index = 0;
    for (let i = 0; i < this.population.length; i++) {
      if (this.population[i].fitness > worldrecord) {
        index = i;
        worldrecord = this.population[i].fitness;
        shift_duplicate_block=this.population[i].shift_duplicate;
        human_work_block=this.population[i].human_work;
        // work_overtime_block=this.population[i].work_overtime
        best_genes=this.population[i].genes;
        vacation_check=this.population[i].vacation_check;
        advance_sheet_block=this.population[i].advance_sheet_score;
        prefer_shift_type_score_block=this.population[i].prefer_shift_type_score
      }
    }
    //這邊也要客製化
    //fitness 數值越大越好
    // worldrecord >2.1 
    // prefer_shift_type_score_block>0.1 && 
    // if (worldrecord >=2.1 ){
    //   return true;
    // }
    if (
      (shift_duplicate_block+human_work_block+vacation_check+advance_sheet_block ==2 && prefer_shift_type_score_block>=0.15)
      || (this.generations>25 && shift_duplicate_block+human_work_block+vacation_check+advance_sheet_block ==2)){
        this.finished = true;
        final_solution.push({'targte':this.target,'genes':best_genes});
    }
    // if (shift_duplicate_block+human_work_block+vacation_check+advance_sheet_block ==2) {
    //   this.finished = true;
    // }
    // if (worldrecord >=0.8 || (this.generations>100 && worldrecord >=0.8)) {
    //   this.finished = true;
    // }
    // if (worldrecord >=0.5 ) {
    //   this.finished = true;
    // }
    this.best = this.population[index].getPhrase();
    this.best_fitness=worldrecord;
    this.shift_duplicate=shift_duplicate_block;
    this.human_work=human_work_block;
    // this.work_overtime=work_overtime_block;
    this.best_genes=best_genes;
    this.vacation_check=vacation_check;
    this.advance_sheet_score=advance_sheet_block;
    this.prefer_shift_type_score=prefer_shift_type_score_block;
    // if (worldrecord === this.perfectScore) {
    //   this.finished = true;
    // }
  }

  isFinished() {
    return this.finished;
  }

  getGenerations() {
    return this.generations;
  }

  // Compute average fitness for the population
  getAverageFitness() {
    let total = 0;
    for (let i = 0; i < this.population.length; i++) {
      total += this.population[i].fitness;
    }
    return total / this.population.length;
  }

  allPhrases() {
    let everything = "";

    let displayLimit = min(this.population.length, 50);

    for (let i = 0; i < displayLimit; i++) {
      // everything += this.population[i].getPhrase() + "<br>";
      everything += this.population[i].getPhrase() + " ";
    }
    return everything;
  }
  currentFitness(){
    return this.best_fitness;
  }
  currentShiftDuplicateFitness(){
    return this.shift_duplicate;
  }
  currentHumanWorkFitness(){
    return this.human_work;
  }
  // currentWorkOvertimeFitness(){
  //   return this.work_overtime;
  // }
  getTarget(){
    return this.target;
  }
  getBestGenes(){
    return this.best_genes;
  }
  getVacationCheck(){
    return this.vacation_check;
  }
  getAdvanceShiftCode(){
    return this.advance_sheet_score
  }
  getPreferShiftTypeScore(){

    return this.prefer_shift_type_score;
  }
}
