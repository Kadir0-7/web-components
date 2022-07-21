import './style.css'
const template = document.createElement('template')
template.innerHTML = ` 
<style>
h1{
  color: brown;
  padding-left:55px;
  font-family: "Times New Roman", Georgia, Serif;
}
h2{
  color: coral;
   padding-left:55px;
    font-family: "Times New Roman", Georgia, Serif;
}
h3{
  color: grey;
   padding-left:55px;
   font-family: arial;
    font-family: "Times New Roman", Georgia, Serif;
}
.my-comments{
  display: flex ;
background-color: black;
font-family: arial;

}
</style>
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
window.customElements.define('my-comments', MyComments)
  


