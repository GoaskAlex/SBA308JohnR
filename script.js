import {CourseInfo,AssignmentGroup,LearnerSubmissions} from './data.js';

function getLearnerData(course, ag, submissions) {
    let results = [];
    const courseValues = Object.values(CourseInfo);
    const courseId = courseValues[0];
    const courseName = courseValues[1];
    
    if(courseName !== course){
        throw new Error('Course Does not Exist');
    }else {
        course = courseId;
    }

    const agValues = Object.values(AssignmentGroup);
    const agCourseId = agValues[2];
    const agName = agValues[1];


    
    if(agName !== ag){
        throw new Error('Entered Wrong Assignment Group Name');
    }else {
        ag = agCourseId;
    }

    let assignments = {}

    if (course !== ag){
        throw new Error('Course and Assignment Group do not match');
    }else {
        assignments =AssignmentGroup.assignments.map((assignment, index) =>{
           return{
            id:index + 1,
            due_at: assignment.due_at,
            points_possible: assignment.points_possible,
           };
        });    
    }

    submissions = LearnerSubmissions;
    let subKeys= Object.values(submissions);
    let learnerIds=[]
    let learnerSubs = [];
        for (let subKey of subKeys){
              learnerIds.push(subKey)
              }

        for (let subKey of learnerIds){
        learnerSubs.push(subKey.submission)
        }
  

  if (learnerIds.assignment_id === assignments.id){
        for (let i = 0; i < learnerIds.length; i++) {
            const assignmentId = learnerIds[i].assignment_id;
            const assignment = assignments.find(a => a.id === assignmentId);
            const submission = learnerSubs[i];
            if (assignment && new Date(assignment.due_at) >= new Date(submission.submitted_at)) {
              console.log("This is not late for learner " + learnerIds[i].learner_id);
                if(assignment.id === assignmentId){
                  const courseTotal = 150;
                  submission.score = submission.score/assignment.points_possible

                  results.push({
                    learner_id: learnerIds[i].learner_id,
                    assignmentId: assignmentId,
                    score: submission.score
                  });
                }

            } else {
              console.log("This is late for learner " + learnerIds[i].learner_id);
              submission.score = (submission.score-assignment.points_possible*.10)/assignment.points_possible
              results.push({
                learner_id: learnerIds[i].learner_id,
                assignmentId: assignmentId,
                score: submission.score
              });
              }
            }
  }else{
    console.log('Assignment does not exist');
  }
  results = results.filter(result => result.assignmentId !== 3);
  console.log(results);

}   
getLearnerData("Introduction to JavaScript", "Fundamentals of JavaScript", LearnerSubmissions);















//     let newAss =Object.values(assignments)
//     let newAssId =[]
//     for (let i = 0; i < newAss.length; i++) {
//         newAssId.push(newAss[i].id)
//     }
    
//     const newAssDue = newAss.map(item => item.due_at);
//     console.log(newAssDue);
//     const newAssPoints= newAss.map(item => item.points_possible);
//     console.log(newAssId);
   
    
//     submissions = LearnerSubmissions;
//     let subKeys= Object.values(submissions)
//     let studentAssIds = [];
    
//     const studentAssId = subKeys.map(item => item.assignment_id);
    
// for (let id of newAssId){
//     if (studentAssId.includes(id)){
//         studentAssIds.push(id);
//     }
// }
//     const studentSubDate = subKeys.map(item => item.submission.submitted_at);
//     const studentScore = subKeys.map(item => item.submission.score);
    
//     if (studentAssIds.length === newAssId.length && studentAssIds.every((id, index) => newAssId.includes(id))) {
//         if (studentSubDate.every((String) =>newAssDue.includes(String))){
//             console.log('true)')
//     }
// }


    // here, we would process this data to achieve the desired result.
//     const result = [
//       {
//         id: 125,
//         avg: 0.985, // (47 + 150) / (50 + 150)
//         1: 0.94, // 47 / 50
//         2: 1.0 // 150 / 150
//       },
//       {
//         id: 132,
//         avg: 0.82, // (39 + 125) / (50 + 150)
//         1: 0.78, // 39 / 50
//         2: 0.833 // late: (140 - 15) / 150
//       }
//     ];
  
//     return result;
//   }
  
//   const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
  
// //   console.log(result);