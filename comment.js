import { openDB } from 'idb';

// Define a custom element
class Comment extends HTMLElement {
  // Set up the properties we'll want to use later
  constructor() {
    // Whenever calling constructor on an extended class, you need to call super first to run the base class's constructor
    super();
  }

  // Look for changes in the "name" attribute in HTML

  // Do something when an attribute has changed
  /* attributeChangedCallback(property, oldValue, newValue) {
    // If nothing's changed, stop execution
    if (oldValue === newValue) return;

    // If it's the name property, change the correct value
    if (property === "name") {
      // If name exists, set it's textContent to the name
      // It shouldn't exist until connectedCallback is fired, which may happen after this is run for the first time
      if (this.namePlaceholder) {
        this.namePlaceholder.textContent = newValue;
      }
     
    }
    if (property === 'email') {
      // If name exists, set it's textContent to the name
      // It shouldn't exist until connectedCallback is fired, which may happen after this is run for the first time
      if (this.emailPlaceholder) {
        this.emailPlaceholder.textContent = newValue;
      }
    }
    if (property === 'comment') {
      // If name exists, set it's textContent to the name
      // It shouldn't exist until connectedCallback is fired, which may happen after this is run for the first time
      if (this.commentPlaceholder) {
        this.commentPlaceholder.textContent = newValue;
      }
    }
  }
*/

  connectedCallback() {
    // Create a new "open" shadow root so we can manipulate it
    const shadow = this.attachShadow({ mode: 'open' });
    // Get the template we made in our HTML and clone it so we can use it in our component
    const template = document.getElementById('temple').content.cloneNode(true);

    // Add the template to our shadow root
    shadow.append(template);

    // Save the element we want to use for "name" so we can set it later
    this.namePlaceholder = this.shadowRoot.querySelector('#for-name');
    this.emailPlaceholder = this.shadowRoot.querySelector('#for-email');
    this.commentPlaceholder = this.shadowRoot.querySelector('#for-comment');
    // Get initial value
    const email = this.getAttribute('email');
    const name = this.getAttribute('name');
    const comment = this.getAttribute('comment');
    if (name) {
      this.namePlaceholder.textContent = name;
    }
    if (email) {
      this.emailPlaceholder.textContent = email;
    }
    if (comment) {
      this.commentPlaceholder.textContent = comment;
    }
  }
}

customElements.define('my-comment', Comment);

export const makeElement = () => {
  const nameValue = document.getElementById('name').value;
  const emailValue = document.getElementById('email').value;
  const commentValue = document.getElementById('comment').value;

  const components = document.createElement('my-comment');

  components.setAttribute('name', nameValue);
  components.setAttribute('email', emailValue);
  components.setAttribute('comment', commentValue);

  const results = document.querySelector('#results');
  results.append(components);
};
export const removeElement = () => {
  document.removeChild('my-comment');
};

/*function dataBase() {
  'use strict';

  //check for support
  if (!('indexedDB' in window)) {
    console.log("This browser doesn't support IndexedDB");
    return;
  }

  let dbPromise = idb.open('test-db2', 1, function (upgradeDb) {
    console.log('making a new object store');
    if (!upgradeDb.objectStoreNames.contains('comments')) {
      upgradeDb.createObjectStore('comments', { keyPath: 'comments' });
    }
  });
  dbPromise
    .then(function (db) {
      let tx = db.transaction('comments', 'readwrite');
      let store = tx.objectStore('comments');
      let item = document.querySelector('#results');

      store.add(item);
      return tx.complete;
    })
    .then(function () {
      console.log('added item to the comments os!');
    });
}*/

const db = await openDB('comment-store', 1, {
  upgrade(db) {
    db.createObjectStore('comments');
  },
});window.addEventListener('DOMContentLoaded', async () => {
  let item = document.querySelector('#results').value;
  (async () => {
    await db.put ('comments', item,'content');
  });
})