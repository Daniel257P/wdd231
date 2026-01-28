import { courses } from "./datacourse.js";
console.log (courses)


const buttons = document.querySelectorAll(".filters button");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {

    buttons.forEach(b => b.classList.remove("active"));

    btn.classList.add("active");
  });
});

const courseDetails = document.querySelector('#course-details')
const courseSubject = document.querySelector('#course-subject')
const courseClose = document.querySelector('#course-close')
const courseTitle = document.querySelector('#course-title')
const courseCredits = document.querySelector('#course-credits')
const courseCertificate = document.querySelector('#course-certificate')
const courseinfo = document.querySelector('#course-info')
const courseTechnology = document.querySelector('#course-technology')
courseClose.addEventListener('click',  () => courseDetails.close())





createcourseCards(courses);
const allcourseslinks = document.querySelector('#all');
const wddcourseslinks = document.querySelector('#wdd');
const csecourseslinks = document.querySelector('#cse');

allcourseslinks.addEventListener('click', () => {   
    createcourseCards(courses);
});

wddcourseslinks.addEventListener('click', () => {
    const wddCourses = courses.filter(course => course.subject === 'WDD');
    createcourseCards(wddCourses);
});

csecourseslinks.addEventListener('click', () => {
    const cseCourses = courses.filter(course => course.subject === 'CSE');
    createcourseCards(cseCourses);
});

function createcourseCards(courseArray) {   
    const container = document.getElementById('courseContainer');
    container.innerHTML = '';
    let totalCredits = 0;
    courseArray.forEach(course => {
         console.log(course) //for testing 
        totalCredits += course.credits;
        const card = document.createElement('div');
        card.className = 'course-card';
        card.innerHTML = `
            <button class="openButton">${course.subject} ${course.number}</button>
        `;
        const btn = card.querySelector(".openButton");
        btn.addEventListener("click", () => showstuff(course));
        

        if (course.completed) {
            card.classList.add("completed");
        } else {
            card.classList.add("incomplete");
        }
        container.appendChild(card);
    });
    document.getElementById('totalCredits').textContent = totalCredits;
    document.getElementById('completedCourses').textContent = courseArray.filter(course => course.completed).length;
}



function showstuff(course) {
    courseTitle.innerHTML = `${course.subject} ${course.number}`;
    courseCredits.innerHTML = `${course.credits} Credits`;
    courseCertificate.innerHTML = `${course.certificate}`;
    courseinfo.innerHTML = `${course.description}`;
    courseTechnology.innerHTML= `${course.technology}`;
    courseDetails.showModal()
}
