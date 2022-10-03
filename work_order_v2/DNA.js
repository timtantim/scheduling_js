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


function newWork() {
  let full_time_doctor_random= randomNoRepeats(employee.filter((n)=>n.position=='full_time_doctor'));
  let full_time_nurse_random= randomNoRepeats(employee.filter((n)=>n.position=='full_time_nurse'));
  let full_time_pharmacist_random= randomNoRepeats(employee.filter((n)=>n.position=='full_time_pharmacist'));
  let full_time_administration_random= randomNoRepeats(employee.filter((n)=>n.position=='full_time_administration'));
  let part_time_administration_random= randomNoRepeats(employee.filter((n)=>n.position=='part_time_administration'));

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

    // for (let i = 0; i < num; i++) {
    //   // this.genes[i] = newChar(); // Pick from range of chars
    //   this.genes[i] =newChar();
    // }

    this.genes =newWork(target);
    // console.log('執行次數');
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
    let monday=this.genes.map((n)=>n.employee_name+'_'+`${(n.shift_type==1)?'早班 ':(n.shift_type==2)?'午班 ':(n.shift_type==3)?'晚班 ':''}`)
    // let Tuesday=this.genes[1].map((n)=>n.employee_name+'_'+`${(n.shift_type==1)?'早班':(n.shift_type==2)?'午班':(n.shift_type==3)?'晚班':''}`)
    // let Wednesday=this.genes[2].map((n)=>n.employee_name+'_'+`${(n.shift_type==1)?'早班':(n.shift_type==2)?'午班':(n.shift_type==3)?'晚班':''}`)
    // let Thursday=this.genes[3].map((n)=>n.employee_name+'_'+`${(n.shift_type==1)?'早班':(n.shift_type==2)?'午班':(n.shift_type==3)?'晚班':''}`)
    // let Friday=this.genes[4].map((n)=>n.employee_name+'_'+`${(n.shift_type==1)?'早班':(n.shift_type==2)?'午班':(n.shift_type==3)?'晚班':''}`)
    // let Saturday=this.genes[5].map((n)=>n.employee_name+'_'+`${(n.shift_type==1)?'早班':(n.shift_type==2)?'午班':(n.shift_type==3)?'晚班':''}`)
    // let Sunday=this.genes[6].map((n)=>n.employee_name+'_'+`${(n.shift_type==1)?'早班':(n.shift_type==2)?'午班':(n.shift_type==3)?'晚班':''}`)
    return '禮拜一:'+monday+'\n '
    // return '';
  }

  // Fitness function (returns floating point % of "correct" characters) (計算適應值)
  calcFitness(target) {
    //沒有Target 因此忽略
    let due_date_score = 0;
    let priority_score = 0;

    //這邊開始評分
    //按照交期越好

    //取得當天工作的人力配置
    let what_to_do_that_day=target.job_require[0];

    //檢查是否都安排人力
    let human_work_score=0;
    let error_num=0;
    let full_time_doctor_morning_shift=what_to_do_that_day.full_time_doctor_morning_shift;
    if(this.genes.filter((n)=>n.position=='full_time_doctor' && n.shift_type==1).length!=parseInt(full_time_doctor_morning_shift)){error_num+=1} 
    let full_time_nurse_morning_shift=what_to_do_that_day.full_time_nurse_morning_shift;
    if(this.genes.filter((n)=>n.position=='full_time_nurse' && n.shift_type==1).length!=parseInt(full_time_nurse_morning_shift)){error_num+=1}
    let full_time_pharmacist_morning_shift=what_to_do_that_day.full_time_pharmacist_morning_shift;
    if(this.genes.filter((n)=>n.position=='full_time_pharmacist' && n.shift_type==1).length!=parseInt(full_time_pharmacist_morning_shift)){error_num+=1}
    let full_time_administration_staff_morning_shift=what_to_do_that_day.full_time_administration_staff_morning_shift;
    if(this.genes.filter((n)=>n.position=='full_time_administration' && n.shift_type==1).length!=parseInt(full_time_administration_staff_morning_shift)){error_num+=1}
    let part_time_administration_staff_morning_shift=what_to_do_that_day.part_time_administration_staff_morning_shift;
    if(this.genes.filter((n)=>n.position=='part_time_administration' && n.shift_type==1).length!=parseInt(part_time_administration_staff_morning_shift)){error_num+=1}
    
    let full_time_doctor_noon_shift=what_to_do_that_day.full_time_doctor_noon_shift;
    if(this.genes.filter((n)=>n.position=='full_time_doctor' && n.shift_type==2).length!=parseInt(full_time_doctor_noon_shift)){error_num+=1} 
    let full_time_nurse_noon_shift=what_to_do_that_day.full_time_nurse_noon_shift;
    if(this.genes.filter((n)=>n.position=='full_time_nurse' && n.shift_type==2).length!=parseInt(full_time_nurse_noon_shift)){error_num+=1}
    let full_time_pharmacist_noon_shift=what_to_do_that_day.full_time_pharmacist_noon_shift;
    if(this.genes.filter((n)=>n.position=='full_time_pharmacist' && n.shift_type==2).length!=parseInt(full_time_pharmacist_noon_shift)){error_num+=1}
    let full_time_administration_staff_noon_shift=what_to_do_that_day.full_time_administration_staff_noon_shift;
    if(this.genes.filter((n)=>n.position=='full_time_administration' && n.shift_type==2).length!=parseInt(full_time_administration_staff_noon_shift)){error_num+=1}
    let part_time_administration_staff_noon_shift=what_to_do_that_day.part_time_administration_staff_noon_shift;
    if(this.genes.filter((n)=>n.position=='part_time_administration' && n.shift_type==2).length!=parseInt(part_time_administration_staff_noon_shift)){error_num+=1}

    let full_time_doctor_night_shift=what_to_do_that_day.full_time_doctor_night_shift;
    if(this.genes.filter((n)=>n.position=='full_time_doctor' && n.shift_type==3).length!=parseInt(full_time_doctor_night_shift)){error_num+=1} 
    let full_time_nurse_night_shift=what_to_do_that_day.full_time_nurse_night_shift;
    if(this.genes.filter((n)=>n.position=='full_time_nurse' && n.shift_type==3).length!=parseInt(full_time_nurse_night_shift)){error_num+=1}
    let full_time_pharmacist_night_shift=what_to_do_that_day.full_time_pharmacist_night_shift;
    if(this.genes.filter((n)=>n.position=='full_time_pharmacist' && n.shift_type==3).length!=parseInt(full_time_pharmacist_night_shift)){error_num+=1}
    let full_time_administration_staff_night_shift=what_to_do_that_day.full_time_administration_staff_night_shift;
    if(this.genes.filter((n)=>n.position=='full_time_administration' && n.shift_type==3).length!=parseInt(full_time_administration_staff_night_shift)){error_num+=1}
    let part_time_administration_staff_night_shift=what_to_do_that_day.part_time_administration_staff_night_shift;
    if(this.genes.filter((n)=>n.position=='part_time_administration' && n.shift_type==3).length!=parseInt(part_time_administration_staff_night_shift)){error_num+=1}

    console.log('錯誤:'+error_num);
    

      let shift_duplicate_score=0;
      let shift_overtime_score=0;
      let check_duplicate_shift={}; //同一班次不得重複
      let check_duplicate={};//同一天不得輪三班
      for(let a=0;a<this.genes.length;a++){
        if(!check_duplicate.hasOwnProperty(this.genes[a].employee_name)){
          
          check_duplicate[this.genes[a].employee_name]=1;
        }else{
          check_duplicate[this.genes[a].employee_name]+=1;
        }
        if(!check_duplicate_shift.hasOwnProperty(this.genes[a].employee_name+this.genes[a].shift_type)){     
          check_duplicate_shift[this.genes[a].employee_name+this.genes[a].shift_type]=1;
        }else{
          check_duplicate_shift[this.genes[a].employee_name+this.genes[a].shift_type]+=1;
        }
      } 
      //////////////
      let total_work_overtime=0;
      for (var key in check_duplicate) {
        if (check_duplicate.hasOwnProperty(key)) {
            if(check_duplicate[key]>2){
              total_work_overtime+=1
            }
        }
      }
    
      //////////////
      let total_shift=0;
      for (var key in check_duplicate_shift) {
        if (check_duplicate_shift.hasOwnProperty(key)) {
            if(check_duplicate_shift[key]>1){total_shift+=1}
        }
      }
     
      // shift_duplicate_score+=(this.genes[i].length-total_shift)/this.genes[i].length//分數越高越好


      human_work_score=((15-error_num)/15)*0.2;
      shift_overtime_score=((this.genes.length-total_work_overtime)/this.genes.length)*0.4;
      shift_duplicate_score=((this.genes.length-total_shift)/this.genes.length)*0.4;
    this.fitness = human_work_score+shift_duplicate_score+shift_overtime_score;
    this.shift_duplicate=shift_duplicate_score;
    this.human_work=human_work_score;
    this.work_overtime=shift_overtime_score;
  }
  // Crossover (交配)
  crossover(partner) {
    // A new child
    let child = new DNA(this.genes.length);

    let midpoint = floor(customRandom(this.genes.length)); // Pick a midpoint

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
      if (customRandom(1) < mutationRate) {
        // this.genes[i] = newChar();
        // this.genes[i] = newWork();
        this.genes[i] =random_item(newWork());
        // this.genes = newWork();
      }
    }
  }
}
