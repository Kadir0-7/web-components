import './style.css';
import { openDB } from 'idb';

// Creating a new state store (often called a "store")
// Creating a store as a class makes it easy to reuse the functionality, and provides a convenient way to include additional functionality.
class Store {
  // We can choose to create a store with a specific initial state, or we can create a store with no initial state.
  constructor(init = {}) {
    // This will let us reference the store from within functions
    const self = this;

    // This will let hold the subscribers expecting changes to the store
    this.subscribers = [];

    // This is the store's state. It's a Proxy. We use it to intercept changes made to the state, allowing us to both update the state and notify subscribers of the change.
    // It's initialized with the value of init from our constructor, if it's provided.
    this.state = new Proxy(init, {
      // We listen to the set trap, which is called whenever a property is set on the state.
      // The three arguments are the state (the original object), the key being changed, and the value being set.
      //       this.state.hello = 'world';
      // this.state.hello being equal to 'world!';
      set(state, key, value) {
        // Set the value on the state. This won't re-trigger the proxy.
        state[key] = value;

        // Loop over each subscriber, and call it with the new state
        self.subscribers.forEach((subscriber) => subscriber(state));

        // Return true to indicate that the set was successful.
        return true;
      },
    });
  }

  // Let different parts of our application listen for, or "subscribe", to changes in our state
  subscribe(cb) {
    // cb is a common abbreviation for "callback". Subscriptions need to be functions, so we check to see if the provided value is a function.
    if (typeof cb !== 'function') {
      throw new Error('You must subscribe with a function');
    }

    // Add the callback to the list of subscribers
    this.subscribers.push(cb);

    // Call the callback with the current state, because it otherwise may not be updated with the initial state.
    cb(this.state);
  }

  // Provide a way to update a specific property in the state
  set(key, value) {
    this.state[key] = value;
  }

  // Provide a way to get a specific value from the state
  get(key) {
    return this.state[key];
  }

  /* OPTIONAL
   * You can provide specific functions to update state in a specific way, for instance increasing or decreasing the current state's number property by 1. Doing so allows you to create reusable logic for updating state instead of needing to do it yourself every time.
   * These reusable bits of state manipulations are often called MUTATIONS
   * Sometimes, state libraries will provide something called ACTIONS, which are functions meant to take in input, optionally manipulate it, and then call a MUTATION to update the state. Other libraries, like the code we're writing here, combine ACTIONS and MUTATIONS into one.
   */
  // Mutation to increase the current state's number property by 1
  makeElement = () => {
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
  removeElement = () => {
    const rez = document.querySelector('#results');
    rez.remove('my-comment');
  };
}

// With our Store defined, we can create a new instance of it, initializing it with an initial state.
const store = new Store({});

// Listen for click events
document.addEventListener('DOMContentLoaded', () => {
  const add = document.querySelector('#submit');
  const remove = document.querySelector('#remove');

  // Using state and stores can be more convenient than updating elements directly.
  // Here, we're going to set up our buttons to change the state of our store, without having to ensure we are updating all affected elements directly.

  // When the add button is clicked, call the increment function on the store
  add.addEventListener('click', (ev) => {
    ev.preventDefault();
    store.makeElement();
  });
  remove.addEventListener('click', (e) => {
    e.preventDefault();
    store.removeElement();
  });
});

class Comment extends HTMLElement {
  // Set up the properties we'll want to use later
  constructor() {
    // Whenever calling constructor on an extended class, you need to call super first to run the base class's constructor
    super();
  }
  static get observedAttributes() {
    return ['email', 'name', 'comment'];
  }

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

const db = await openDB('comment-store', 1, {
  upgrade(db) {
    db.createObjectStore('comments');
  },
});
window.addEventListener('DOMContentLoaded', async () => {
  let item = document.querySelector('#results').value;
  async () => {
    await db.put('comments', item, 'content');
  };
});
