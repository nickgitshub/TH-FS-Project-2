/******************************************
Treehouse Techdegree:
FSJS project 2 - List Filter and Pagination
******************************************/


/*** 
   GLOBAL VARIABLES
   -Will be used at the bottom to initialize main functions
***/

const li_list = document.querySelector('.student-list').getElementsByTagName("LI")
const input_box = document.querySelector('input')



/*** 
    HELPER FUNCTIONS
    -Created to assist the Main Functions
***/

//allows elements display states to easily be toggled between 'None' and ''
function displayChange(element, display_state){
  element.style.display = display_state;
}

//shows a page of 10 elements by turning the display to 'None' for all
//elements that are not supposed to be on the current_page
function showPage(current_page, list, list_length){
  const end_point = current_page*10
  const start_point = end_point-10

  for(let i = 0; i<list_length; i ++){
    if(i < start_point){
      displayChange(list[i], 'None');
    }
    else if (i >= end_point) {
      displayChange(list[i], 'None');
    }
    else{
      displayChange(list[i], '');
    } 
  } 
}

/*** 
   MAIN FUNCTIONS
***/

/*** 
  appendPages()

   The appendPages function is responsible for transforming the list of LI elements a series
   of pages of 10 elements.

   It achieves this by creating a new div of page numbers that can be clicked to navigate between
   pages.

   The page numbers utilize the showPage function to hide all elements that aren't on that page.
***/

function appendPages(list){

  const list_length = list.length
  const num_pages = Math.ceil(list_length/10)

  //helper function for creating an element and assigning it a class
  function element_creator(elementType, className){
    const elementName = document.createElement(elementType)
    elementName.className = className
    return elementName;
  }

  //creating a div, new ul, and li elements prior to appending them together
  const page = document.getElementsByClassName("page")[0]
  const div = element_creator("DIV", 'paginated-div')
  const ul =  element_creator("UL", 'pagination');

  for (let i=0; i<num_pages; i++){
    const li =  element_creator("LI", 'page-number');
    const page_num = i+1
    li.innerHTML = '<a>' + page_num + "</a>"
    ul.appendChild(li)
  }

  div.appendChild(ul)
  page.appendChild(div)

  //page numbers listening for what page number they should show
  ul.addEventListener('click', (e)=>{
    new_page = parseInt(e.target.innerText)
    showPage(new_page, list, list_length)
    })

  //initiates the execution on the first page of listed elements
  showPage(1, list, list_length)
}


/*** 

  searchStudents()

  Listens to the input of search inobox to initiate a search for matching
  student names.

  Returns those

***/
function searchStudents(event){

  //grabs input from the search box
  input = event.target.value

  //collects a search_list of all student names matching the input
  search_list = []
  for(let i = 0; i<li_list.length; i++){
    student_name = li_list[i].querySelector('h3').innerText
    string_search = student_name.search(input)
    if(string_search > -1){
      search_list.push(li_list[i])
    } 
    else {
      displayChange(li_list[i], 'None')
    }
  }

  //toggles the message that displays when there are no results
  not_found = document.querySelector(".not-found")
  if(search_list.length>0){
    displayChange(not_found, 'None')
  }
  else{
    displayChange(not_found, '')
  }

  //removes the the div containing page numbers at the bottom
  document.getElementsByClassName("paginated-div")[0].remove()

  //recreates the div around the search_list
  appendPages(search_list)
}


/*** 
   INITIALIZERS
   -Initializing the main functions when the page loads
***/

//the student li elements are paginated
appendPages(li_list)

//search box is listening for something to be typed
input_box.addEventListener('keyup', (e) => {searchStudents(e)})
