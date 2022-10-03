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


function newWork(target) {

  let full_time_doctor_random= randomNoRepeats(employee.filter((n)=>n.position=='full_time_doctor' && !target.day_off.includes(n.employee_name)));
  let full_time_nurse_random= randomNoRepeats(employee.filter((n)=>n.position=='full_time_nurse' && !target.day_off.includes(n.employee_name)));
  let full_time_pharmacist_random= randomNoRepeats(employee.filter((n)=>n.position=='full_time_pharmacist' && !target.day_off.includes(n.employee_name)));
  let full_time_administration_random= randomNoRepeats(employee.filter((n)=>n.position=='full_time_administration' && !target.day_off.includes(n.employee_name)));
  let part_time_administration_random= randomNoRepeats(employee.filter((n)=>n.position=='part_time_administration' && !target.day_off.includes(n.employee_name)));

  let temp_array_v1=[];
  let full_time_doctor_morning_shift=target.job_require[0].full_time_doctor_morning_shift;
  let full_time_nurse_morning_shift=target.job_require[0].full_time_nurse_morning_shift;
  let full_time_pharmacist_morning_shift=target.job_require[0].full_time_pharmacist_morning_shift;
  let full_time_administration_staff_morning_shift=target.job_require[0].full_time_administration_staff_morning_shift;
  let part_time_administration_staff_morning_shift=target.job_require[0].part_time_administration_staff_morning_shift;
  for(let a=0;a<full_time_doctor_morning_shift;a++){let temp=JSON.parse(JSON.stringify(full_time_doctor_random()));temp.shift_type='1';temp_array_v1.push(temp);}
  for(let b=0;b<full_time_nurse_morning_shift;b++){let temp=JSON.parse(JSON.stringify(full_time_nurse_random()));temp.shift_type='1';temp_array_v1.push(temp);}
  for(let c=0;c<full_time_pharmacist_morning_shift;c++){let temp=JSON.parse(JSON.stringify(full_time_pharmacist_random()));temp.shift_type='1';temp_array_v1.push(temp);}
  for(let d=0;d<full_time_administration_staff_morning_shift;d++){let temp=JSON.parse(JSON.stringify(full_time_administration_random()));temp.shift_type='1';temp_array_v1.push(temp);}
  for(let e=0;e<part_time_administration_staff_morning_shift;e++){let temp=JSON.parse(JSON.stringify(part_time_administration_random()));temp.shift_type='1';temp_array_v1.push(temp);}
  let full_time_doctor_noon_shift=target.job_require[0].full_time_doctor_noon_shift;
  let full_time_nurse_noon_shift=target.job_require[0].full_time_nurse_noon_shift;
  let full_time_pharmacist_noon_shift=target.job_require[0].full_time_pharmacist_noon_shift;
  let full_time_administration_staff_noon_shift=target.job_require[0].full_time_administration_staff_noon_shift;
  let part_time_administration_staff_noon_shift=target.job_require[0].part_time_administration_staff_noon_shift;
  for(let a=0;a<full_time_doctor_noon_shift;a++){let temp=JSON.parse(JSON.stringify(full_time_doctor_random()));temp.shift_type='2';temp_array_v1.push(temp);}
  for(let b=0;b<full_time_nurse_noon_shift;b++){let temp=JSON.parse(JSON.stringify(full_time_nurse_random()));temp.shift_type='2';temp_array_v1.push(temp);}
  for(let c=0;c<full_time_pharmacist_noon_shift;c++){let temp=JSON.parse(JSON.stringify(full_time_pharmacist_random()));temp.shift_type='2';temp_array_v1.push(temp);}
  for(let d=0;d<full_time_administration_staff_noon_shift;d++){let temp=JSON.parse(JSON.stringify(full_time_administration_random()));temp.shift_type='2';temp_array_v1.push(temp);}
  for(let e=0;e<part_time_administration_staff_noon_shift;e++){let temp=JSON.parse(JSON.stringify(part_time_administration_random()));temp.shift_type='2';temp_array_v1.push(temp);}

  let full_time_doctor_night_shift=target.job_require[0].full_time_doctor_night_shift;
  let full_time_nurse_night_shift=target.job_require[0].full_time_nurse_night_shift;
  let full_time_pharmacist_night_shift=target.job_require[0].full_time_pharmacist_night_shift;
  let full_time_administration_staff_night_shift=target.job_require[0].full_time_administration_staff_night_shift;
  let part_time_administration_staff_night_shift=target.job_require[0].part_time_administration_staff_night_shift;
  for(let a=0;a<full_time_doctor_night_shift;a++){let temp=JSON.parse(JSON.stringify(full_time_doctor_random()));temp.shift_type='3';temp_array_v1.push(temp);}
  for(let b=0;b<full_time_nurse_night_shift;b++){let temp=JSON.parse(JSON.stringify(full_time_nurse_random()));temp.shift_type='3';temp_array_v1.push(temp);}
  for(let c=0;c<full_time_pharmacist_night_shift;c++){let temp=JSON.parse(JSON.stringify(full_time_pharmacist_random()));temp.shift_type='3';temp_array_v1.push(temp);}
  for(let d=0;d<full_time_administration_staff_night_shift;d++){let temp=JSON.parse(JSON.stringify(full_time_administration_random()));temp.shift_type='3';temp_array_v1.push(temp);}
  for(let e=0;e<part_time_administration_staff_night_shift;e++){let temp=JSON.parse(JSON.stringify(part_time_administration_random()));temp.shift_type='3';temp_array_v1.push(temp);}


  //感覺在這就要把骯髒基因濾掉
  // let c =random_item(employee);

  // return String.fromCharCode(c);
  return temp_array_v1;
}

// Constructor (makes a random DNA)
class DNA {
  constructor(target) {//num =字串的長度  這邊可能要改成工單數量
    // The genetic sequence
    this.genes = [];
    // this.genes = {};
    this.fitness = 0;
    this.target=target;

    // for (let i = 0; i < num; i++) {
    //   // this.genes[i] = newChar(); // Pick from range of chars
    //   this.genes[i] =newChar();
    // }
      this.genes =newWork(target);
    // console.log('執行次數');
  }

  getGenes(){
    return this.genes;
  }
  // Converts character array to a String
  getPhrase() {
    // return this.genes.join("");
    // return this.genes.map((a)=>a.work_order_code).join(',')
    this.genes=this.genes.sort((a, b) => parseFloat(a.shift_type) - parseFloat(b.shift_type));
    // this.genes[1]=this.genes[1].sort((a, b) => parseFloat(a.shift_type) - parseFloat(b.shift_type));
    // this.genes[2]=this.genes[2].sort((a, b) => parseFloat(a.shift_type) - parseFloat(b.shift_type));
    // this.genes[3]=this.genes[3].sort((a, b) => parseFloat(a.shift_type) - parseFloat(b.shift_type));
    // this.genes[4]=this.genes[4].sort((a, b) => parseFloat(a.shift_type) - parseFloat(b.shift_type));
    // this.genes[5]=this.genes[5].sort((a, b) => parseFloat(a.shift_type) - parseFloat(b.shift_type));
    // this.genes[6]=this.genes[6].sort((a, b) => parseFloat(a.shift_type) - parseFloat(b.shift_type));
    let day=this.genes.map((n)=>n.employee_name+'_'+`${(n.shift_type==1)?'早班 ':(n.shift_type==2)?'午班 ':(n.shift_type==3)?'晚班 ':''}`)
    // let Tuesday=this.genes[1].map((n)=>n.employee_name+'_'+`${(n.shift_type==1)?'早班':(n.shift_type==2)?'午班':(n.shift_type==3)?'晚班':''}`)
    // let Wednesday=this.genes[2].map((n)=>n.employee_name+'_'+`${(n.shift_type==1)?'早班':(n.shift_type==2)?'午班':(n.shift_type==3)?'晚班':''}`)
    // let Thursday=this.genes[3].map((n)=>n.employee_name+'_'+`${(n.shift_type==1)?'早班':(n.shift_type==2)?'午班':(n.shift_type==3)?'晚班':''}`)
    // let Friday=this.genes[4].map((n)=>n.employee_name+'_'+`${(n.shift_type==1)?'早班':(n.shift_type==2)?'午班':(n.shift_type==3)?'晚班':''}`)
    // let Saturday=this.genes[5].map((n)=>n.employee_name+'_'+`${(n.shift_type==1)?'早班':(n.shift_type==2)?'午班':(n.shift_type==3)?'晚班':''}`)
    // let Sunday=this.genes[6].map((n)=>n.employee_name+'_'+`${(n.shift_type==1)?'早班':(n.shift_type==2)?'午班':(n.shift_type==3)?'晚班':''}`)
    // return '禮拜一:'+day+'\n '
    return day+'\n '
    // return '';
  }

  // Fitness function (returns floating point % of "correct" characters) (計算適應值)
  calcFitness(target) {

    let advance_sheet_score=advance_shift_fitness(this.genes,this.target)*0.5;
    let vacation_check_score=day_off_fitness(this.genes,target)*0.5;
    let human_work_score=human_reource_set_fitness(this.genes,this.target)*0.5;
    let shift_duplicate_score=check_duplicate_in_one_shift(this.genes)*0.5;
    let prefer_shift_type_score=prefer_shift_fitness(this.genes,employee)*0.2;
 
    this.fitness = human_work_score+shift_duplicate_score+vacation_check_score+advance_sheet_score+prefer_shift_type_score;
    this.shift_duplicate=shift_duplicate_score;
    this.human_work=human_work_score;
    this.vacation_check=vacation_check_score;
    this.advance_sheet_score=advance_sheet_score;
    this.prefer_shift_type_score=prefer_shift_type_score

  }
  // Crossover (交配)
  crossover(partner) {
    // A new child
    let child = new DNA(this.target);

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
        // this.genes[i] = newChar();
        // this.genes[i] = newWork();
        // this.genes[i] =random_item(newWork(this.target));

        this.genes[i].employee_name =random_item(employee.filter((n)=>n.position==this.genes[i].position && n.employee_name !=this.genes[i].employee_name  && !this.target.day_off.includes(n.employee_name))).employee_name
        // this.genes = newWork();

    
      
      }
    }
        if(random(1)<0.5){
          let full_time_doctor=this.genes.filter(n=>n.position=='full_time_doctor');
          let full_time_nurse=this.genes.filter(n=>n.position=='full_time_nurse');
          let full_time_pharmacist=this.genes.filter(n=>n.position=='full_time_pharmacist');
          let full_time_administration=this.genes.filter(n=>n.position=='full_time_administration');
          let part_time_administration=this.genes.filter(n=>n.position=='part_time_administration');

          if(full_time_doctor.length>1){
            let select_one= randomNoRepeats(full_time_doctor);
            let select_two= randomNoRepeats(full_time_doctor);
            let temp_shift_type=select_one.shift_type;
            select_one.shift_type=select_two.shift_type
            select_two.shift_type=temp_shift_type;
          }
          if(full_time_nurse.length>1){
            let select_one= randomNoRepeats(full_time_nurse);
            let select_two= randomNoRepeats(full_time_nurse);
            let temp_shift_type=select_one.shift_type;
            select_one.shift_type=select_two.shift_type
            select_two.shift_type=temp_shift_type;
          }
          if(full_time_pharmacist.length>1){
            let select_one= randomNoRepeats(full_time_pharmacist);
            let select_two= randomNoRepeats(full_time_pharmacist);
            let temp_shift_type=select_one.shift_type;
            select_one.shift_type=select_two.shift_type
            select_two.shift_type=temp_shift_type;
          }
          if(full_time_administration.length>1){
            let select_one= randomNoRepeats(full_time_administration);
            let select_two= randomNoRepeats(full_time_administration);
            let temp_shift_type=select_one.shift_type;
            select_one.shift_type=select_two.shift_type
            select_two.shift_type=temp_shift_type;
          }
          if(part_time_administration.length>1){
            let select_one= randomNoRepeats(part_time_administration);
            let select_two= randomNoRepeats(part_time_administration);
            let temp_shift_type=select_one.shift_type;
            select_one.shift_type=select_two.shift_type
            select_two.shift_type=temp_shift_type;
          }
   
        }
  }
}
