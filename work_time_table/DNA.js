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
  // let c =random_item(permute(work_order_code));
  // return String.fromCharCode(c);
  //這邊要根據星期來隨機抓取需要的人員
  //[{星期一},{星期二},{星期三},{星期四},{星期五},{星期六},{星期日}]
  //[[早班員工:{},午班員工:{},晚班員工:{}],[早班員工:{},午班員工:{},晚班員工:{}][早班員工:{},午班員工:{},晚班員工:{}][早班員工:{},午班員工:{},晚班員工:{}][早班員工:{},午班員工:{},晚班員工:{}]]
  let full_time_doctor_random= randomNoRepeats(employee.filter((n)=>n.position=='full_time_doctor'));
  let full_time_nurse_random= randomNoRepeats(employee.filter((n)=>n.position=='full_time_nurse'));
  let full_time_pharmacist_random= randomNoRepeats(employee.filter((n)=>n.position=='full_time_pharmacist'));
  let full_time_administration_random= randomNoRepeats(employee.filter((n)=>n.position=='full_time_administration'));
  let part_time_administration_random= randomNoRepeats(employee.filter((n)=>n.position=='part_time_administration'));
  let gene=[];
  for(let i=0;i<month_job.length;i++){
    let temp_array_v1=[];
    let full_time_doctor_morning_shift=month_job[i].job_require[0].full_time_doctor_morning_shift;
    let full_time_nurse_morning_shift=month_job[i].job_require[0].full_time_nurse_morning_shift;
    let full_time_pharmacist_morning_shift=month_job[i].job_require[0].full_time_pharmacist_morning_shift;
    let full_time_administration_staff_morning_shift=month_job[i].job_require[0].full_time_administration_staff_morning_shift;
    let part_time_administration_staff_morning_shift=month_job[i].job_require[0].part_time_administration_staff_morning_shift;
    for(let a=0;a<full_time_doctor_morning_shift;a++){let temp=JSON.parse(JSON.stringify(full_time_doctor_random()));temp.shift_type='1';temp_array_v1.push(temp);}
    for(let b=0;b<full_time_nurse_morning_shift;b++){let temp=JSON.parse(JSON.stringify(full_time_nurse_random()));temp.shift_type='1';temp_array_v1.push(temp);}
    for(let c=0;c<full_time_pharmacist_morning_shift;c++){let temp=JSON.parse(JSON.stringify(full_time_pharmacist_random()));temp.shift_type='1';temp_array_v1.push(temp);}
    for(let d=0;d<full_time_administration_staff_morning_shift;d++){let temp=JSON.parse(JSON.stringify(full_time_administration_random()));temp.shift_type='1';temp_array_v1.push(temp);}
    for(let e=0;e<part_time_administration_staff_morning_shift;e++){let temp=JSON.parse(JSON.stringify(part_time_administration_random()));temp.shift_type='1';temp_array_v1.push(temp);}

    let full_time_doctor_noon_shift=month_job[i].job_require[0].full_time_doctor_noon_shift;
    let full_time_nurse_noon_shift=month_job[i].job_require[0].full_time_nurse_noon_shift;
    let full_time_pharmacist_noon_shift=month_job[i].job_require[0].full_time_pharmacist_noon_shift;
    let full_time_administration_staff_noon_shift=month_job[i].job_require[0].full_time_administration_staff_noon_shift;
    let part_time_administration_staff_noon_shift=month_job[i].job_require[0].part_time_administration_staff_noon_shift;
    for(let a=0;a<full_time_doctor_noon_shift;a++){let temp=JSON.parse(JSON.stringify(full_time_doctor_random()));temp.shift_type='2';temp_array_v1.push(temp);}
    for(let b=0;b<full_time_nurse_noon_shift;b++){let temp=JSON.parse(JSON.stringify(full_time_nurse_random()));temp.shift_type='2';temp_array_v1.push(temp);}
    for(let c=0;c<full_time_pharmacist_noon_shift;c++){let temp=JSON.parse(JSON.stringify(full_time_pharmacist_random()));temp.shift_type='2';temp_array_v1.push(temp);}
    for(let d=0;d<full_time_administration_staff_noon_shift;d++){let temp=JSON.parse(JSON.stringify(full_time_administration_random()));temp.shift_type='2';temp_array_v1.push(temp);}
    for(let e=0;e<part_time_administration_staff_noon_shift;e++){let temp=JSON.parse(JSON.stringify(part_time_administration_random()));temp.shift_type='2';temp_array_v1.push(temp);}

    let full_time_doctor_night_shift=month_job[i].job_require[0].full_time_doctor_night_shift;
    let full_time_nurse_night_shift=month_job[i].job_require[0].full_time_nurse_night_shift;
    let full_time_pharmacist_night_shift=month_job[i].job_require[0].full_time_pharmacist_night_shift;
    let full_time_administration_staff_night_shift=month_job[i].job_require[0].full_time_administration_staff_night_shift;
    let part_time_administration_staff_night_shift=month_job[i].job_require[0].part_time_administration_staff_night_shift;
    for(let a=0;a<full_time_doctor_night_shift;a++){let temp=JSON.parse(JSON.stringify(full_time_doctor_random()));temp.shift_type='3';temp_array_v1.push(temp);}
    for(let b=0;b<full_time_nurse_night_shift;b++){let temp=JSON.parse(JSON.stringify(full_time_nurse_random()));temp.shift_type='3';temp_array_v1.push(temp);}
    for(let c=0;c<full_time_pharmacist_night_shift;c++){let temp=JSON.parse(JSON.stringify(full_time_pharmacist_random()));temp.shift_type='3';temp_array_v1.push(temp);}
    for(let d=0;d<full_time_administration_staff_night_shift;d++){let temp=JSON.parse(JSON.stringify(full_time_administration_random()));temp.shift_type='3';temp_array_v1.push(temp);}
    for(let e=0;e<part_time_administration_staff_night_shift;e++){let temp=JSON.parse(JSON.stringify(part_time_administration_random()));temp.shift_type='3';temp_array_v1.push(temp);}

    gene.push(temp_array_v1);
  }
  

  return gene;
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
  }

  // Converts character array to a String
  getPhrase() {
    // return this.genes.join("");
    this.genes[0]=this.genes[0].sort((a, b) => parseFloat(a.shift_type) - parseFloat(b.shift_type));
    this.genes[1]=this.genes[1].sort((a, b) => parseFloat(a.shift_type) - parseFloat(b.shift_type));
    this.genes[2]=this.genes[2].sort((a, b) => parseFloat(a.shift_type) - parseFloat(b.shift_type));
    this.genes[3]=this.genes[3].sort((a, b) => parseFloat(a.shift_type) - parseFloat(b.shift_type));
    this.genes[4]=this.genes[4].sort((a, b) => parseFloat(a.shift_type) - parseFloat(b.shift_type));
    this.genes[5]=this.genes[5].sort((a, b) => parseFloat(a.shift_type) - parseFloat(b.shift_type));
    this.genes[6]=this.genes[6].sort((a, b) => parseFloat(a.shift_type) - parseFloat(b.shift_type));
    let monday=this.genes[0].map((n)=>n.employee_name+'_'+`${(n.shift_type==1)?'早班 ':(n.shift_type==2)?'午班 ':(n.shift_type==3)?'晚班 ':''}`)
    let Tuesday=this.genes[1].map((n)=>n.employee_name+'_'+`${(n.shift_type==1)?'早班':(n.shift_type==2)?'午班':(n.shift_type==3)?'晚班':''}`)
    let Wednesday=this.genes[2].map((n)=>n.employee_name+'_'+`${(n.shift_type==1)?'早班':(n.shift_type==2)?'午班':(n.shift_type==3)?'晚班':''}`)
    let Thursday=this.genes[3].map((n)=>n.employee_name+'_'+`${(n.shift_type==1)?'早班':(n.shift_type==2)?'午班':(n.shift_type==3)?'晚班':''}`)
    let Friday=this.genes[4].map((n)=>n.employee_name+'_'+`${(n.shift_type==1)?'早班':(n.shift_type==2)?'午班':(n.shift_type==3)?'晚班':''}`)
    let Saturday=this.genes[5].map((n)=>n.employee_name+'_'+`${(n.shift_type==1)?'早班':(n.shift_type==2)?'午班':(n.shift_type==3)?'晚班':''}`)
    let Sunday=this.genes[6].map((n)=>n.employee_name+'_'+`${(n.shift_type==1)?'早班':(n.shift_type==2)?'午班':(n.shift_type==3)?'晚班':''}`)
  
    return '禮拜一:'+monday+'\n '+'禮拜二:'+Tuesday+' \n'+'禮拜三:'+Wednesday+'\n '+'禮拜四:'+Thursday+'\n '+'禮拜五:'+Friday+'\n '+'禮拜六:'+Saturday+'\n '+'禮拜天:'+Sunday
    // return '';
  }


  reFillGene(position){
    let temp= randomNoRepeats(employee.filter((n)=>n.position==position))();
    return temp;
  }

  // Fitness function (returns floating point % of "correct" characters) (計算適應值)
  calcFitness(target) {
    //沒有Target 因此忽略
    let due_date_score = 0;
    let priority_score = 0;

    let working_hour_score=0; //工作時數檢查 (每日不得超過12小時) 最多輪兩班
    let shift_duplicate_score=0//同班次只能同一人(系統可能會重複安排)
 
    // for (let i = 0; i < this.genes.length; i++) {
      // if (this.genes[i] == target.charAt(i)) {
      //   score++;
      // }
    // }
    //這邊開始評分

  //同班次只能同一人(系統可能會重複安排)

  working_hour_score=(working_hour_score/this.genes.length)*0.3
  shift_duplicate_score=(shift_duplicate_score/this.genes.length)
  //檢查是否超過工作時數  
    for (let i = 0; i < this.genes.length; i++) {
      let check_duplicate={};
      let check_duplicate_shift={};
      for(let a=0;a<this.genes[i].length;a++){
        if(!check_duplicate.hasOwnProperty(this.genes[i][a].employee_name)){
          
          check_duplicate[this.genes[i][a].employee_name]=1;
        }else{
          check_duplicate[this.genes[i][a].employee_name]+=1;
        }
        if(!check_duplicate_shift.hasOwnProperty(this.genes[i][a].employee_name+this.genes[i][a].shift_type)){     
          check_duplicate_shift[this.genes[i][a].employee_name+this.genes[i][a].shift_type]=1;
        }else{
          //只要某人工作班重複直接突變然後重新檢查適應值
  
          
          // while (!check_duplicate_shift.hasOwnProperty(this.genes[i][a].employee_name+this.genes[i][a].shift_type)) {
          //  let temp= this.reFillGene(this.genes[i][a].position);
          //  if(!check_duplicate_shift.hasOwnProperty(temp.employee_name+this.genes[i][a].shift_type)){  
          //   this.genes[i][a].employee_name=temp.employee_name;

          //  }else{
          //  }
          // }

          let temp= this.reFillGene(this.genes[i][a].position);
          if(!check_duplicate_shift.hasOwnProperty(temp.employee_name+this.genes[i][a].shift_type)){  
            this.genes[i][a].employee_name=temp.employee_name;
           }else{
             check_duplicate_shift[this.genes[i][a].employee_name+this.genes[i][a].shift_type]+=1;
           }
        
         
        }
      } 
      //滿分 this.genes[i].morning.length
      let total=0;
      for (var key in check_duplicate) {
        if (check_duplicate.hasOwnProperty(key)) {
            if(check_duplicate[key]>2){
              total+=1
            }
        }
      }
      working_hour_score+=(this.genes[i].length-total)/this.genes[i].length//分數越高越好
      let total_shift=0;
      for (var key in check_duplicate_shift) {
        if (check_duplicate_shift.hasOwnProperty(key)) {
            if(check_duplicate_shift[key]>1){total_shift+=1}
        }
      }
          //  console.log('工作班重複:',total_shift );
      shift_duplicate_score+=(this.genes[i].length-total_shift)/this.genes[i].length//分數越高越好
    }
    working_hour_score=(working_hour_score/this.genes.length)*0.3
    shift_duplicate_score=(shift_duplicate_score/this.genes.length)
    // //按照交期越好
    // let due_date_first=work_order_code.sort((a,b)=>a.due_date-b.due_date);
    // for (let i = 0; i < this.genes.length; i++) {
    //   if (this.genes[i] == due_date_first[i]) {
    //     due_date_score++;
    //   }
    // }
    // due_date_score = (due_date_score / work_order_code.length)*0.8;  //比重
    // //相同交期，急單優先(3)
    // for (let i = 1; i < this.genes.length; i++) {
    //   if (this.genes[i].due_date == this.genes[i-1].due_date) {
    //     if(this.genes[i-1].priority>=this.genes[i].priority){
    //       //proirity 數字越大代表越急
    //       priority_score++;
    //     }
    //   }
    // }
    // priority_score = (priority_score / work_order_code.length)*0.2;  //比重
    // this.fitness = score / work_order_code.length;

    this.shift_duplicate=shift_duplicate_score
    // this.fitness = working_hour_score+shift_duplicate_score;
    this.fitness = shift_duplicate_score;
    // this.fitness = working_hour_score;
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
        this.genes[i] =random_item(newChar());
      }
    }
  }
}
