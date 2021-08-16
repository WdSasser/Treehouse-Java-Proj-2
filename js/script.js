/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/



///// Global Variables /////
const header = document.querySelector('.header');
const searchDiv = document.createElement('div');
const studentList = 'ul';


searchDiv.id = 'searchBarDiv';
searchDiv.innerHTML = `
   <label for='search' class='student-search'>
      <input id='search' placeholder='Search by name...'>
      <button type='button'><img src='img/icn-search.svg' alt='Search icon'></button>
   </label>
`;

header.appendChild(searchDiv);
const button = header.querySelector('#searchBarDiv button');
const input = header.querySelector('#search');

/////   'UL' of 'Student-list' used for multiple functions   /////
let ulOfStudents = document.querySelector('.student-list');

const itemsPerPage = 9;

////   ShowPage function used to insert the elements to display a page of '9' students   ////
function showPage(list, page) {
   const startIndex = (page * itemsPerPage ) - itemsPerPage; 
   const endIndex = page * itemsPerPage;
   ulOfStudents.innerHTML = '';
   for (let i = 0; i < list.length; i++) {
      if (i >= startIndex && i < endIndex) {
         let li = `
            <li class='student-item cf'>
               <div class='student-details'>
                  <img class='avatar' src='${list[i].picture.medium}' alt='Profile Picture'>
                  <h3>${list[i].name.first} ${list[i].name.last}</h3>
                  <span class='email'>${list[i].email}</span>
               </div>
               <div class='joined-details'>
                  <span class='date'>Joined ${list[i].registered.date}</span>
               </div>
            </li>
         `;
            ulOfStudents.insertAdjacentHTML('beforeend', li);
      }    
   }
}


//////   This is used to generate the number of buttons for the pages of students   //////
function addPagination(list) {
   const numOfButtons = Math.ceil( list.length / itemsPerPage );           
   let ulPagination = document.querySelector('.link-list');
   ulPagination.innerHTML = '';

   
   for (let i = 0; i < numOfButtons; i++) {
      let li = `
         <li>
            <button type='button'>${i + 1}</button>
         </li>
      `;
      ulPagination.insertAdjacentHTML('beforeend', li);  
   }
   
   if (list.length > 0) {
      let firstLi = ulPagination.firstElementChild;
      let firstButton = firstLi.firstElementChild;
      firstButton.className = 'active';
   } else {         //// If the user input is invalid it will display a 'no results' to the page  //////
      ulOfStudents.innerHTML = '<h1 class="no-results">No Results... &#128373 Try Another Name</h1>'; 
   }
      
    
   ulPagination.addEventListener('click', (e) => {
      if (e.target.tagName === 'BUTTON') {
         let clickedButton = e.target;
         let buttonList = ulPagination.children;
         for (let i = 0; i < buttonList.length; i++) {
            let button = ulPagination.children[i].firstElementChild;
            button.classList.remove('active');
         }
         clickedButton.className = 'active';
         showPage(list, clickedButton.textContent);
         }
   });
}


//////   SEARCH Function - Collects user input to output details of the students to the page  //////
function performSearch(inputValue, names) {
   let arrayAccept = [];
   for (let i = 0; i < names.length; i++) {
      let fullName = `${names[i].name.first.toLowerCase()} ${names[i].name.last.toLowerCase()}`;
      if (fullName.includes(inputValue) ) {
         arrayAccept.push(names[i]);
      }
   }
   showPage(arrayAccept, 1);
   addPagination(arrayAccept);
}


/////    EVENT LISTENERS    /////
input.addEventListener('keyup', () => {
   performSearch(input.value.toLowerCase(), data);
});

button.addEventListener('submit', (e) => {
   performSearch(e.input.value.toLowerCase(), data);
});


/////    Call functions to load the page(s)    /////
showPage(data, 1);
addPagination(data);