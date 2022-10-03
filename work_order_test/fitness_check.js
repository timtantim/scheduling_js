function human_reource_set_fitness(genes,target)//人力配置
{
    let what_to_do_that_day=target.job_require[0];
    let error_num=0;
    let full_time_doctor_morning_shift=what_to_do_that_day.full_time_doctor_morning_shift;
    if(genes.filter((n)=>n.position=='full_time_doctor' && n.shift_type==1).length < parseInt(full_time_doctor_morning_shift)){error_num+=1} 
    let full_time_nurse_morning_shift=what_to_do_that_day.full_time_nurse_morning_shift;
    if(genes.filter((n)=>n.position=='full_time_nurse' && n.shift_type==1).length < parseInt(full_time_nurse_morning_shift)){error_num+=1}
    let full_time_pharmacist_morning_shift=what_to_do_that_day.full_time_pharmacist_morning_shift;
    if(genes.filter((n)=>n.position=='full_time_pharmacist' && n.shift_type==1).length < parseInt(full_time_pharmacist_morning_shift)){error_num+=1}
    let full_time_administration_staff_morning_shift=what_to_do_that_day.full_time_administration_staff_morning_shift;
    if(genes.filter((n)=>n.position=='full_time_administration' && n.shift_type==1).length < parseInt(full_time_administration_staff_morning_shift)){error_num+=1}
    let part_time_administration_staff_morning_shift=what_to_do_that_day.part_time_administration_staff_morning_shift;
    if(genes.filter((n)=>n.position=='part_time_administration' && n.shift_type==1).length < parseInt(part_time_administration_staff_morning_shift)){error_num+=1}
    
    let full_time_doctor_noon_shift=what_to_do_that_day.full_time_doctor_noon_shift;
    if(genes.filter((n)=>n.position=='full_time_doctor' && n.shift_type==2).length < parseInt(full_time_doctor_noon_shift)){error_num+=1} 
    let full_time_nurse_noon_shift=what_to_do_that_day.full_time_nurse_noon_shift;
    if(genes.filter((n)=>n.position=='full_time_nurse' && n.shift_type==2).length < parseInt(full_time_nurse_noon_shift)){error_num+=1}
    let full_time_pharmacist_noon_shift=what_to_do_that_day.full_time_pharmacist_noon_shift;
    if(genes.filter((n)=>n.position=='full_time_pharmacist' && n.shift_type==2).length < parseInt(full_time_pharmacist_noon_shift)){error_num+=1}
    let full_time_administration_staff_noon_shift=what_to_do_that_day.full_time_administration_staff_noon_shift;
    if(genes.filter((n)=>n.position=='full_time_administration' && n.shift_type==2).length < parseInt(full_time_administration_staff_noon_shift)){error_num+=1}
    let part_time_administration_staff_noon_shift=what_to_do_that_day.part_time_administration_staff_noon_shift;
    if(genes.filter((n)=>n.position=='part_time_administration' && n.shift_type==2).length < parseInt(part_time_administration_staff_noon_shift)){error_num+=1}

    let full_time_doctor_night_shift=what_to_do_that_day.full_time_doctor_night_shift;
    if(genes.filter((n)=>n.position=='full_time_doctor' && n.shift_type==3).length < parseInt(full_time_doctor_night_shift)){error_num+=1} 
    let full_time_nurse_night_shift=what_to_do_that_day.full_time_nurse_night_shift;
    if(genes.filter((n)=>n.position=='full_time_nurse' && n.shift_type==3).length < parseInt(full_time_nurse_night_shift)){error_num+=1}
    let full_time_pharmacist_night_shift=what_to_do_that_day.full_time_pharmacist_night_shift;
    if(genes.filter((n)=>n.position=='full_time_pharmacist' && n.shift_type==3).length < parseInt(full_time_pharmacist_night_shift)){error_num+=1}
    let full_time_administration_staff_night_shift=what_to_do_that_day.full_time_administration_staff_night_shift;
    if(genes.filter((n)=>n.position=='full_time_administration' && n.shift_type==3).length < parseInt(full_time_administration_staff_night_shift)){error_num+=1}
    let part_time_administration_staff_night_shift=what_to_do_that_day.part_time_administration_staff_night_shift;
    if(genes.filter((n)=>n.position=='part_time_administration' && n.shift_type==3).length < parseInt(part_time_administration_staff_night_shift)){error_num+=1}

    return ((15-error_num)/15);
}

function day_off_fitness(genes,target)//排假
{
    let total_vacation=0;
    let who_is_in_day_off=target.day_off;
    for(let a=0;a<genes.length;a++){
        if(who_is_in_day_off.includes(genes[a].employee_name)){
          total_vacation+=1
        }
    } 
    return ((genes.length-total_vacation)/genes.length);

}
function advance_shift_fitness(genes,target){
    let advance_shift_error_num=0;
    let want_morning_shift=target.want_morning_shift;
    let want_noon_shift=target.want_noon_shift;
    let want_night_shift=target.want_night_shift;
    let dont_want_morning_shift=target.dont_want_morning_shift;
    let dont_want_noon_shift=target.dont_want_noon_shift;
    let dont_want_night_shift=target.dont_want_night_shift;
    let total_request=want_morning_shift.length+want_noon_shift.length+want_night_shift.length+dont_want_morning_shift.length+dont_want_noon_shift.length+dont_want_night_shift.length;

    for(let i=0;i<want_morning_shift.length;i++){
      if(genes.filter((n)=>n.employee_name==want_morning_shift[i] && n.shift_type=='1').length==0){
        advance_shift_error_num+=1;
      }
    }
    for(let i=0;i<want_noon_shift.length;i++){
      if(genes.filter((n)=>n.employee_name==want_noon_shift[i] && n.shift_type=='2').length==0){
        advance_shift_error_num+=1;
      }
    }
    for(let i=0;i<want_night_shift.length;i++){
      if(genes.filter((n)=>n.employee_name==want_night_shift[i] && n.shift_type=='3').length==0){
        advance_shift_error_num+=1;
      }
    }

    for(let i=0;i<dont_want_morning_shift.length;i++){
      if(genes.filter((n)=>n.employee_name==dont_want_morning_shift[i] && n.shift_type=='1').length > 0){
        advance_shift_error_num+=1;
      }
    }
    for(let i=0;i<dont_want_noon_shift.length;i++){
      if(genes.filter((n)=>n.employee_name==dont_want_noon_shift[i] && n.shift_type=='2').length > 0){
        advance_shift_error_num+=1;
      }
    }
    for(let i=0;i<dont_want_night_shift.length;i++){
      if(genes.filter((n)=>n.employee_name==dont_want_night_shift[i] && n.shift_type=='3').length > 0){
        advance_shift_error_num+=1;
      }
    }

    advance_sheet_score=((total_request-advance_shift_error_num)/total_request);
    if(isNaN(advance_sheet_score)){
      advance_sheet_score=1;
    }
    return advance_sheet_score;
}

function check_duplicate_in_one_shift(genes){
    let check_duplicate_shift={}; //同一班次不得重複
    let total_shift=0;
    for(let a=0;a<genes.length;a++){

        if(!check_duplicate_shift.hasOwnProperty(genes[a].employee_name+genes[a].shift_type)){     
          check_duplicate_shift[genes[a].employee_name+genes[a].shift_type]=1;
        }else{
          check_duplicate_shift[genes[a].employee_name+genes[a].shift_type]+=1;
        }
    } 
    
    for (var key in check_duplicate_shift) {
      if (check_duplicate_shift.hasOwnProperty(key)) {
          if(check_duplicate_shift[key]>1){total_shift+=1}
      }
    }
    return ((genes.length-total_shift)/genes.length);
}
function prefer_shift_fitness(genes,employee){
    let prefer_shift_type_correct=0;
    let employee_prefer_work_shift=employee.filter(n=>n.prefer_work_shift.length!=0).map(n=>n.employee_name);
    let qualify_employee = genes.filter(function(employee) {
      return employee_prefer_work_shift.includes(employee.employee_name);
    });
    let total_prefer_work_shift=qualify_employee.length;
    
    for(let i=0;i<total_prefer_work_shift;i++){
      let prefer_shift_array=employee.filter(n=>n.employee_name==qualify_employee[i].employee_name)[0].prefer_work_shift
      if(prefer_shift_array.includes(qualify_employee[i].shift_type)){
        prefer_shift_type_correct+=1;
      }
    }
    return ((total_prefer_work_shift-(total_prefer_work_shift-prefer_shift_type_correct))/total_prefer_work_shift);
}