import './style.css'
import {makeElement} from './comment.js'
import { removeElement } from './comment.js';
/*let nameHeading = document.createElement('h4');
let emailHeading = document.createElement('h4')
let commentPara = document.createElement('p');
const results = document.getElementById('results')
 
function formdata(names, emails, comments){


results.appendChild(nameHeading)
results.appendChild(emailHeading);
results.appendChild(commentPara);
nameHeading.innerText = `Name: ${names} `;
emailHeading.innerText = `email: ${emails}`; 
commentPara.innerText = `comment: ${comments}`; 
 }
const btn = document.getElementById('btn');


btn.addEventListener("click", (e) =>{
  e.preventDefault();
  let name= document.getElementById('name').value;
let email =document.getElementById('email').value;

let comment = document.getElementById('comment').value;
formdata(name, email, comment)

})*/

document.getElementById('main-app').innerHTML =`<form id="form">
      <div>
        <label for="name">Name</label>
        <input type="text" id="name"  placeholder="whats your name" required>
     </div>
      <div class="email">
        <label for="email">Email</label>
        <input type="email" id="email"  required>
      </div>
      <div class="comment">
        <label for="comment">Comment </label>
        <Textarea id="comment" required></Textarea>
      </div>
      <div>
        <label for="checkbox">Post Comment?</label>
        <input type="checkbox" id="checkbox" required>
      </div>
      <div>
      <button id="submit">Submit</button>
    <button type="reset">Reset</button>
    <button id="remove">Remove</button>
    </div>
      </form> 

      
<div id="results"></div>
      
        
 <template id="temple">
        <style>
          p {
      font-weight: bold;
    }

    span {
      color: red;
    }
        </style>
          <p>Name: <span id="for-name"></span></p>
          <p>Eamil: <span id="for-email"></span></p>
          <p>Comment: <span id="for-comment"></span></p>
          
 </template>`;


/*document.addEventListener("DOMContentLoaded", () => {
  const user = document.querySelector("#user");
  const nameInput = document.querySelector("#name");
  const emailInput = document.querySelector("#email");
  const commentInput = document.querySelector("#comment");

  nameInput.addEventListener("input", (e) => {
    user.setAttribute("name", e.target.value);
  });
  emailInput.addEventListener('input', (e) => {
    user.setAttribute("email", e.target.value);
  });
  commentInput.addEventListener('input', (e) => {
    user.setAttribute("comment", e.target.value);
  });
});*/


document.querySelector("#submit").addEventListener("click",(ev) =>{
  ev.preventDefault();
  makeElement();
})
document.querySelector('remove').addEventListener('click', (e) => {
  e.preventDefault();
  removeElement();
});
   
    
  



/*const template = document.createElement('template')
template.innerHTML = ` 


<div class="my-comments">
<h1></h1>
<h2></h2>
<h3></h3>
</div>
`;

class MyComments extends HTMLElement{
  constructor(){
super();
this.attachShadow({mode: 'open'});
this.shadowRoot.appendChild(template.content.cloneNode(true));
this.shadowRoot.querySelector('h1').innerText= this.getAttribute('name');
this.shadowRoot.querySelector('h2').innerText = this.getAttribute('email');
this.shadowRoot.querySelector('h3').innerText = this.getAttribute('comment');

  
  
  }
}
window.customElements.define('my-comments', MyComments)*/
