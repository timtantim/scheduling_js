// Shakespeare
// The Nature of Code
// The Coding Train / Daniel Shiffman
// https://youtu.be/jv3CgDN9sc
// https://thecodingtrain.com/more/achive/nature-of-code/9-genetic-algorithms/9.4-looking-at-code.html
// https://editor.p5js.org/codingtrain/sketches/PqRSmKLQU

// http://natureofcode.com

// Genetic Algorithm, Evolving Shakespeare

// A class to describe a pseudo-DNA, i.e. genotype
//   Here, a virtual organism's DNA is an array of character.
//   Functionality:
//      -- convert DNA into a string
//      -- calculate DNA's "fitness"
//      -- mate DNA with another set of DNA
//      -- mutate DNA



function newChar() {
  // let c = floor(random(63, 122));  //A ~ Z 這邊可能要改成工單排序
  // if (c === 63) c = 32;
  // if (c === 64) c = 46;
  // console.log(work_order_code);
  // console.log((JSON.stringify(permute(work_order_code))));
  // let c =random_item(work_order_code)
  let c =random_item(permute(work_order_code));
  // return String.fromCharCode(c);
  return c;
}

// Constructor (makes a random DNA)
class DNA {
  constructor(num) {//num =字串的長度  這邊可能要改成工單數量
    // The genetic sequence
    this.genes = [];
    // this.genes = {};
    this.fitness = 0;

    // for (let i = 0; i < num; i++) {
    //   // this.genes[i] = newChar(); // Pick from range of chars
    //   this.genes[i] =newChar();
    // }
    this.genes =newChar();
    // console.log('執行次數');
  }

  // Converts character array to a String
  getPhrase() {
    // return this.genes.join("");
    return this.genes.map((a)=>a.work_order_code).join(',')
  }

  // Fitness function (returns floating point % of "correct" characters) (計算適應值)
  calcFitness(target) {
    //沒有Target 因此忽略
    let due_date_score = 0;
    let priority_score = 0;
    // for (let i = 0; i < this.genes.length; i++) {
      // if (this.genes[i] == target.charAt(i)) {
      //   score++;
      // }
    // }
    //這邊開始評分
    //按照交期越好
    let due_date_first=work_order_code.sort((a,b)=>a.due_date-b.due_date);
    for (let i = 0; i < this.genes.length; i++) {
      if (this.genes[i] == due_date_first[i]) {
        due_date_score++;
      }
    }
    due_date_score = (due_date_score / work_order_code.length)*0.8;  //比重
    //相同交期，急單優先(3)
    for (let i = 1; i < this.genes.length; i++) {
      if (this.genes[i].due_date == this.genes[i-1].due_date) {
        if(this.genes[i-1].priority>=this.genes[i].priority){
          //proirity 數字越大代表越急
          priority_score++;
        }
      }
    }
    priority_score = (priority_score / work_order_code.length)*0.2;  //比重
    // this.fitness = score / work_order_code.length;
    this.fitness = priority_score+due_date_score;
  }
  // Crossover (交配)
  crossover(partner) {
    // A new child
    let child = new DNA(this.genes.length);

    let midpoint = floor(random(this.genes.length)); // Pick a midpoint

    // Half from one, half from the other
    for (let i = 0; i < this.genes.length; i++) {
      if (i > midpoint) child.genes[i] = this.genes[i];
      else child.genes[i] = partner.genes[i];
    }
    return child;
  }

  // Based on a mutation probability, picks a new random character (突變)
  mutate(mutationRate) {
    for (let i = 0; i < this.genes.length; i++) {
      if (random(1) < mutationRate) {
        this.genes[i] = newChar();
      }
    }
  }
}
