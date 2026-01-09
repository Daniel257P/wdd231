const buttons = document.querySelectorAll(".filters button");

buttons.forEach(btn => {
  btn.addEventListener("click", () => {
    // Quita la clase active de todos
    buttons.forEach(b => b.classList.remove("active"));

    // Agrega active al botón clickeado
    btn.classList.add("active");
  });
});

const courses = [
    {
        subject: 'CSE',
        number: 110,
        title: 'Introduction to Programming',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce students to programming. It will introduce the building blocks of programming languages (variables, decisions, calculations, loops, array, and input/output) and use them to solve problems.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 111,
        title: 'Programming with Functions',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'CSE 111 students become more organized, efficient, and powerful computer programmers by learning to research and call functions written by others; to write, call , debug, and test their own functions; and to handle errors within functions. CSE 111 students write programs with functions to solve problems in many disciplines, including business, physical science, human performance, and humanities.',
        technology: [
            'Python'
        ],
        completed: true
    },
    {
        subject: 'CSE',
        number: 210,
        title: 'Programming with Classes',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course will introduce the notion of classes and objects. It will present encapsulation at a conceptual level. It will also work with inheritance and polymorphism.',
        technology: [
            'C#'
        ],
        completed: false
    },
    {
        subject: 'WDD',
        number: 130,
        title: 'Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course introduces students to the World Wide Web and to careers in web site design and development. The course is hands on with students actually participating in simple web designs and programming. It is anticipated that students who complete this course will understand the fields of web design and development and will have a good idea if they want to pursue this degree as a major.',
        technology: [
            'HTML',
            'CSS'
        ],
        completed: true
    },

    {
        subject: 'WDD',
        number: 131,
        title: 'Dynamic Web Fundamentals',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience in Web Fundamentals and programming. Students will learn to create dynamic websites that use JavaScript to respond to events, update content, and create responsive user experiences.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: true
    },
    {
        subject: 'WDD',
        number: 231,
        title: 'Frontend Web Development I',
        credits: 2,
        certificate: 'Web and Computer Programming',
        description: 'This course builds on prior experience with Dynamic Web Fundamentals and programming. Students will focus on user experience, accessibility, compliance, performance optimization, and basic API usage.',
        technology: [
            'HTML',
            'CSS',
            'JavaScript'
        ],
        completed: false
    }
];

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
        totalCredits += course.credits;
        const card = document.createElement('div');
        card.className = 'course-card';
        card.innerHTML = `
            <h3">${course.subject} ${course.number}</h3>
        `;
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



// function createcourseCards(courseArray) {

//     const container = document.getElementById('courseContainer');
//     container.innerHTML = '';
//     let totalCredits = 0;
//     courseArray.forEach(course => {
//         totalCredits += course.credits;
//         const card = document.createElement('div');
//         card.className = 'course-card';
//         card.innerHTML = `
//             <h3>${course.subject} ${course.number}: ${course.title}</h3>
//             <p>${course.description}</p>
//             <p>Credits: ${course.credits}</p>
//             <p>Technology: ${course.technology.join(', ')}</p>
//             <p>Completed: ${course.completed ? 'Yes' : 'No'}</p>
//         `;
//         container.appendChild(card);
//     });
//     document.getElementById('totalCredits').textContent = totalCredits;
// }