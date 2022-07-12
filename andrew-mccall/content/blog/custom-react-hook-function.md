---
title: 'Custom React Hook Function: Create Custom Reusable React Hooks'
date: 2021-11-21 
Description: If you find yourself rewriting the same logic over and over you may find
  it easier to create a custom react hook
draft: false
image: "/images/blog/react-custom-hooks-120-600.png"
categories:
- Web Development
tags:
- Web Development
- Javascript
- React
---

If you have found yourself re-writing the same boilerplate React code over and over, You may be able to refactor that into a reusable custom React hook function that will save you time and help clean up your code a bit.

## What Is A React Hook

React Hooks are a new feature in React 16.8, which allow us to use state and lifecycle hooks without constructor functions. They enable us to write less code, improve testability of components , and reduce potential side effects .
A few weeks ago I was working on a project that had many nested components with lots of state . It became difficult to manage the state because every component depended on each other. The solution was to create higher-order components (HOC). But this caused the codebase to be bloated and become unmanagable quickly.

## Why Use A Custom React Hook Function

The React Hooks API was introduced in React 16.8 with the goal of making components more reusable and composable. The resulting code is simpler, easier to read, and easier to write.

## How To Create A Custom React Hook

In This example we are going to create a custom react hook for fetching data:

In our react project we are going to need to create a new folder called, _hooks_ inside of the src directory. In order for React to recognize our custom hook, we need to name our custom hook function starting with 'use'. For example, useFetch.js

All a react custom hook is is a function that we can export and use where ever we want. Inside of our simple useFetch function we can write:

```
import { useState, useEffect } from "react";

export const useFetch = (url) => {
  const [data, setData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch(url);
      const json = await response.json();
      setData(json);
    };
    fetchData();
  }, [url]);

  return { data };
};
```

Custom React hooks can use any other React hook inside of them. In this example, I am pulling in useEffect and useState. I am than exporting a function named useFetch with a parameter being passed in called url. This is how we accept a url and make it so that this custom React hook function is reusable anywhere in our project.

Then we pass useEffect so that we can call our function right away when the component loads and also wait for any applicable updates that would require the component to refire. Inside the fuse state we are creating a brand new function. We have to do this because we cannot use async await on the useEffect callback function expressly. Instead, we have to create the async/await function inside of the callback. This is to avoid state pollution by causing volatility in the useEffect callback.

You technically **can** write the function outside of the useEffect callback but it would require you to wrap the function inside of the useCallback hook and also pass the function into the useState dependency array. Writing it inside of useEffect lets you eliminate that extra step which is a bit cleaner.

The function I created inside of useEffect is just a standard fetch function written in async/await syntax. Since we did not write the function outside of the useEffect Hook, we need to call the function inside of useEffect so that it initializes. Finally, we are returned the data which in this custom React hook function I destructured to { data }.

Now, to add our custom React hook function to our project we need to import it into the component we want to use it in.

```
import { useState } from "react";
import { useFetch } from "../hooks/useFetch";

export default function GetData() {
  const [url, setUrl] = useState(`http://localhost:5000/blog`);
  const { data } = useFetch(url);

  return (
    <div className='trip-list'>
      <h2>Trip List</h2>
      <ul>
        {data &&
          data.map((post) => (
            <li key={post.id}>
              <h3>{post.title}</h3>
              <p>{post.summary}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
```

As you can see in this simple example we have url stored inside of some state. We have imported our custom React hook function and, since we have an initial url state, our custom React hook function fires and fetches the data from the URL.

Using custom React hook functions is great for making more manageable and well maintained code. Whenever you find yourself re-writing boilerplate inside of your components, you may find it easier to just use a custom React hook to abstract away some of the boring boilerplate writing.

Still having trouble? Reach out to me on twitter @elkcityhazard.
