---
title: "React State Array: Updating An Array That Is Stored Inside Of State"
date: 2021-11-20 
Description: Updating state in React can be tricky if you have multiple handlers updating
  the same component.  Find out how to safely update state in a react application
image: "/images/blog/react-update-previous-state.png"
categories:
- Web Development
tags:
- Web Development
- Javascript
- React
draft: false
---

State is one of the most important concepts in React. It's what allows us to build components that manage and maintain their own data, and it also enables us to create reusable components that can be shared across projects without duplicating code. But what exactly is State, and how do we use it?
A component's state is simply a JavaScript object with properties and values. The values of these properties can be changed over time (hence the name "state") by invoking setState().

## React Update State Array Of Objects

Many new React developers will struggle with this concept. In the beginning, updating state is simple because often times we do not have multiple components updating state concurrently. Since state is asynchronous in React, it can be updated by several different events concurrently. This creates an issue when you start to wonder which state you are currently updating? It can have the unintended effect of updating the component state at the wrong state of the lifecycle.

Take this simple example:

```
import React, { useState } from "react";
import "./styles.css";

export default function App() {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Go To The Grocery Store"
    },
    {
      id: 2,
      title: "Play Volleyball With Friends"
    },
    {
      id: 3,
      title: "Play Super Nintendo"
    }
  ]);

  const handleClick = (id) => {
    setEvents(events.filter((event) => {
        return id !== event.id
    }))
  };

  return (
    <div className="App">
      <h1>List Update</h1>
      {events.map((event) => {
        return (
          <div key={event.id}>
            <h2>{event.title}</h2>
            <button onClick={() => handleClick(event.id)}>Remove Event</button>
          </div>
        );
      })}
    </div>
  );
}
```

Yes, it seems to work, but unfortunately, it does not work the way we hope. Again, setState is asynchronous, In this example it works because it is the **only** event changing the state. But since state can be updated concurrently, setState will update whatever the state is at the time it decides to fire its event.

## A Better Way To Update State (Use Previous State)

We can tell setState which iteration of state to update specifically. Since setState is asynchronous, this value will be used for any other state update management that needs to be done. How can this be achieved? We can pass in the current state into the callback for setState. This way we aren't directly updating the current state, but rather a copy of the state that will then reflect in any other state changes in the application. To achieve this, we simply need to pass a callback function into the setState hook. The name of the variable we pass in is arbitrary, it is just telling setState, "hey, use this previous value of state" as the value to update against. In the given example, since we are just filtering an array of objects we can return the filtered result like so:

```

const handleClick = (id) => {
    setEvents((previousEvent) => {
      return previousEvent.filter((event) => {
        return id !== event.id;
      });
    });
  };

```

<iframe src="https://codesandbox.io/embed/black-bush-jjdqf?fontsize=14&hidenavigation=1&theme=dark"
     style="width:100%; height:500px; border:0; border-radius: 4px; overflow:hidden;"
     title="black-bush-jjdqf"
     allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
     sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
   ></iframe>

## React Lifecycle: Component Lifecycle In React

React Lifecycle is the process of how React components are constructed, rendered, and eventually destroyed.
A component's constructor is executed only once when it is first created.

The component lifecycle is important when you are using React. Components in React are rendered in the same order every time, and this order can be directly controlled by defining lifecycle methods.

There are two phases of a component’s lifecycle: mounting and unmounting. Mounting occurs when a component is first created. Unmounting occurs when a component is removed from the DOM or otherwise destroyed.

A class component defines three methods: constructor, getInitialState and componentWillMount. The constructor method is called when the class is defined and instantiated.

In general, you can override a lifecycle at anytime in the process. This helps make React versatile.

## Callback Function Example

A callback function is a function that is passed to another function, usually to be executed at a later time. It's commonly used when dealing with asynchronous operations or events.

The callback function is invoked by the other function, and the work it performs is dependent on the parameters passed to it. Callbacks are used for many reasons, including separating the different stages of an asynchronous operation. The intent of using callbacks will determine how they are defined, but there are some common patterns that can be observed in JavaScript programming.

an example of a callback function in Javascript:

```
// The Callback Function To Be Called

const outputText = (name) => {
    return console.log(name)
}

// The Primary Function - notice we are passing in the callback after the name

const getName = (name, callback) => {
    const formatted = name.charAt().toUpperCase() + name.slice(1)
    callback(formatted)
}

// calling the getName function, passing in the result to the callback function specified
// Notice, we do not add () at the end of the callback as to no call it immediately on load

getName('sonic', outputText)

```

## React State Updates: A Final Thought

Keeping your app in sync with the current state is essential for making changes to your application. In this article, we've provided you with a few tips that will help keep your React app running smoothly. We hope these tips have been helpful! If there is anything else we can do for you, please let us know by following our Twitter, Instagram, or Mastodon page.
