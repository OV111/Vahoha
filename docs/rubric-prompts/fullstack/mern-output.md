LAYER: mern-1
```json
{
  "groups": [
    {
      "title": "How browsers parse and render HTML/CSS",
      "question": "A user opens your MERN app on a slow phone and sees a blank screen for two seconds. Walk through what the browser does with your HTML and CSS before anything appears, and how your markup choices affect people who use screen readers.",
      "followUps": {
        "The critical rendering path and render-blocking resources": "Why can a large stylesheet or a script in the head delay the first paint, and what would you change?",
        "Semantic HTML and the accessibility tree": "A screen reader user can't find the navigation on your site built only from divs. Why, and what would fix it?"
      },
      "criteria": {
        "The critical rendering path and render-blocking resources": {
          "id": "critical-rendering-path",
          "evidence": [
            {
              "id": "dom-cssom",
              "text": "The browser builds a DOM from the HTML and a CSSOM from the CSS, and combines them into a render tree before it can lay out and paint."
            },
            {
              "id": "blocking",
              "text": "CSS blocks rendering and a plain script blocks HTML parsing until it is downloaded and run, so both delay the first paint."
            },
            {
              "id": "fix",
              "text": "Putting scripts at the end of the body or marking them defer or async, and keeping critical CSS small, lets the page appear sooner."
            }
          ],
          "notEnough": [
            "Only naming DOM, CSSOM or render-blocking without explaining what blocks what and why."
          ],
          "misconceptions": [
            {
              "id": "css-nonblocking",
              "text": "Says CSS never delays rendering because it only changes how things look after the page appears."
            }
          ]
        },
        "Semantic HTML and the accessibility tree": {
          "id": "semantic-html-a11y",
          "evidence": [
            {
              "id": "roles",
              "text": "Semantic elements like nav, main and button carry built-in roles that end up in the accessibility tree."
            },
            {
              "id": "assistive",
              "text": "Screen readers and keyboard users rely on those roles to jump between regions and operate controls, which plain divs don't provide."
            }
          ],
          "notEnough": [
            "Only saying semantic HTML is better or cleaner without saying who uses the roles and how."
          ],
          "misconceptions": [
            {
              "id": "looks-only",
              "text": "Says semantic elements only change how the page looks."
            }
          ]
        }
      }
    },
    {
      "title": "CSS layout models: flow, flexbox, and grid",
      "question": "You're building the dashboard page of your MERN app: a header, sidebar, main area and footer, with a row of cards in the main area. Explain how you'd lay it out and why element widths often come out bigger than you set them.",
      "followUps": {
        "The box model: content, padding, border, and margin": "You set a card to width 300px with padding and a border, and it overflows its column. Why, and how does box-sizing change that?",
        "When to use flexbox versus CSS grid": "Why would you use grid for the page skeleton but flexbox for the row of cards or buttons?"
      },
      "criteria": {
        "The box model: content, padding, border, and margin": {
          "id": "box-model",
          "evidence": [
            {
              "id": "layers",
              "text": "Every element is a box made of content, padding, border and margin, from the inside out."
            },
            {
              "id": "content-box",
              "text": "By default the width covers only the content, so padding and border are added on top and the box ends up wider."
            },
            {
              "id": "border-box",
              "text": "With box-sizing border-box, padding and border are included in the width, so the box is exactly as wide as you set it."
            }
          ],
          "notEnough": [
            "Only listing content, padding, border and margin without explaining how the width is calculated."
          ],
          "misconceptions": [
            {
              "id": "margin-included",
              "text": "Says border-box also includes the margin in the element's width."
            }
          ]
        },
        "When to use flexbox versus CSS grid": {
          "id": "flex-vs-grid",
          "evidence": [
            {
              "id": "flex-one-d",
              "text": "Flexbox lays items out along one direction, a row or a column, which suits a row of cards or buttons."
            },
            {
              "id": "grid-two-d",
              "text": "Grid controls rows and columns at the same time, which suits a whole-page layout."
            }
          ],
          "notEnough": [
            "Only saying grid is for layouts or more powerful than flexbox."
          ],
          "misconceptions": []
        }
      }
    },
    {
      "title": "Responsive design with media queries and units",
      "question": "Your app's pages look fine on a laptop but break on phones, and you need to find out quickly why. Explain how you'd write the CSS so it works from small to large screens, and how you'd debug the layout in the browser.",
      "followUps": {
        "Mobile-first breakpoints with min-width media queries": "Why write the small-screen styles first and add min-width media queries on top, instead of starting from desktop?",
        "Browser DevTools: inspecting layout, styles, and the network tab": "A card is wider than expected and an API call is slow. What would you look at in DevTools for each problem?"
      },
      "criteria": {
        "Mobile-first breakpoints with min-width media queries": {
          "id": "mobile-first",
          "evidence": [
            {
              "id": "base-small",
              "text": "The base styles target small screens, and min-width media queries add or change styles as the screen gets wider."
            },
            {
              "id": "leaner",
              "text": "Phones then load only the simple base rules, and you avoid writing desktop styles just to undo them for mobile."
            }
          ],
          "notEnough": [
            "Only saying use media queries without explaining the mobile-first order."
          ],
          "misconceptions": []
        },
        "Browser DevTools: inspecting layout, styles, and the network tab": {
          "id": "devtools-debugging",
          "evidence": [
            {
              "id": "elements",
              "text": "The Elements and Styles panels show which CSS rules apply, which are overridden, and the element's box model, and you can edit them live."
            },
            {
              "id": "network",
              "text": "The Network tab lists every request with its status, headers, response and timing, so you see failed or slow calls."
            }
          ],
          "notEnough": [
            "Only saying open DevTools without saying what you look at."
          ],
          "misconceptions": []
        }
      }
    },
    {
      "title": "JavaScript DOM manipulation and events",
      "question": "Your app shows a todo list where each item has a delete button, items are added all the time, and you're doing it in plain JavaScript before learning React. Explain how you'd update the page from JavaScript and how you'd handle clicks on all those buttons.",
      "followUps": {
        "Selecting elements and modifying the DOM at runtime": "Why toggle a class with classList instead of setting styles from JavaScript, and why textContent instead of innerHTML for user text?",
        "Event bubbling, delegation, and removeEventListener": "Why put one click listener on the list instead of one on every button, and when do you need removeEventListener?"
      },
      "criteria": {
        "Selecting elements and modifying the DOM at runtime": {
          "id": "dom-selection",
          "evidence": [
            {
              "id": "select",
              "text": "You find elements with methods like querySelector and then read or change them through the DOM."
            },
            {
              "id": "classlist",
              "text": "Toggling a class with classList keeps the styling in CSS, and JavaScript only switches the state."
            },
            {
              "id": "textcontent",
              "text": "textContent sets plain text, so text from users is not parsed as HTML the way it is with innerHTML."
            }
          ],
          "notEnough": [
            "Only listing querySelector, textContent and classList without saying what each one does."
          ],
          "misconceptions": [
            {
              "id": "innerhtml-safe",
              "text": "Says innerHTML is safe for inserting text that users typed."
            }
          ]
        },
        "Event bubbling, delegation, and removeEventListener": {
          "id": "event-delegation",
          "evidence": [
            {
              "id": "bubbling",
              "text": "An event on an element bubbles up through its parents, so a listener on a parent also sees clicks on its children."
            },
            {
              "id": "delegation",
              "text": "One listener on the list checks event.target to find which item was clicked, so items added later work without new listeners."
            },
            {
              "id": "remove",
              "text": "Listeners added to elements or the window should be removed with removeEventListener when no longer needed, so they don't keep running and holding memory."
            }
          ],
          "notEnough": [
            "Only saying use event delegation without explaining bubbling or event.target."
          ],
          "misconceptions": [
            {
              "id": "no-bubble",
              "text": "Says an event only fires on the exact element that was clicked and never reaches its parents."
            }
          ]
        }
      }
    }
  ]
}
```

LAYER: mern-2
```json
{
  "groups": [
    {
      "title": "The JavaScript event loop and async execution model",
      "question": "A teammate's code logs messages in an order they didn't expect, and a list of click handlers created in a loop all use the last value. Explain how JavaScript decides when each piece of code runs, and how functions remember the variables around them.",
      "followUps": {
        "Call stack, task queue, and microtask queue ordering": "In what order do a console.log, a Promise.then callback and a setTimeout with 0 ms run, and why?",
        "How closures capture free variables in the scope chain": "Why might every handler created in a loop use the last value, and how does let fix it?"
      },
      "criteria": {
        "Call stack, task queue, and microtask queue ordering": {
          "id": "event-loop-order",
          "evidence": [
            {
              "id": "stack-first",
              "text": "The current synchronous code on the call stack always runs to the end first."
            },
            {
              "id": "microtasks",
              "text": "Then all microtasks, such as promise callbacks, run before the next task."
            },
            {
              "id": "tasks",
              "text": "Timer callbacks like setTimeout are tasks, so they run after the microtasks, even with a 0 ms delay."
            }
          ],
          "notEnough": [
            "Only naming the call stack and the queues without explaining the order."
          ],
          "misconceptions": [
            {
              "id": "timeout-zero",
              "text": "Says setTimeout with 0 ms runs immediately, before any promise callbacks."
            }
          ]
        },
        "How closures capture free variables in the scope chain": {
          "id": "closures",
          "evidence": [
            {
              "id": "captures",
              "text": "A function keeps access to the variables of the scope it was created in, even after that scope has finished."
            },
            {
              "id": "reference",
              "text": "It holds the variable itself, not a copy of its value, so it sees later changes to it."
            },
            {
              "id": "let-loop",
              "text": "With let, each loop iteration gets its own variable, so each handler remembers its own value; with var they all share one."
            }
          ],
          "notEnough": [
            "Only defining a closure as a function inside a function without explaining what it keeps."
          ],
          "misconceptions": [
            {
              "id": "copies-value",
              "text": "Says a closure stores a copy of the variable's value at the moment it was created."
            }
          ]
        }
      }
    },
    {
      "title": "Promises and the async/await desugaring",
      "question": "Your dashboard loads a user, then their orders, then shows stats from three independent APIs. Explain how you'd write these async calls so they're readable, as fast as possible, and don't lose errors.",
      "followUps": {
        "Promise chaining versus async/await for sequential calls": "How do the same sequential calls look with .then chains versus async/await, and what does await actually do?",
        "Promise.all, Promise.allSettled, and race conditions": "What's the difference between Promise.all and Promise.allSettled when one of the three APIs fails?"
      },
      "criteria": {
        "Promise chaining versus async/await for sequential calls": {
          "id": "promises-vs-await",
          "evidence": [
            {
              "id": "same-thing",
              "text": "async and await are built on promises: an async function returns a promise, and await pauses that function until the promise settles."
            },
            {
              "id": "sequential",
              "text": "Each await waits for the previous call, which is right when a call needs the result of the one before."
            },
            {
              "id": "errors",
              "text": "Errors are caught with try/catch around awaits, or with .catch on a chain; an unhandled rejection is lost."
            }
          ],
          "notEnough": [
            "Only saying async/await is cleaner than .then without explaining what await does."
          ],
          "misconceptions": [
            {
              "id": "await-blocks",
              "text": "Says await blocks the whole program until the promise finishes."
            }
          ]
        },
        "Promise.all, Promise.allSettled, and race conditions": {
          "id": "promise-combinators",
          "evidence": [
            {
              "id": "parallel",
              "text": "Starting independent calls together and waiting for all of them is faster than awaiting them one by one."
            },
            {
              "id": "all-rejects",
              "text": "Promise.all rejects as soon as any promise rejects, so you lose the other results."
            },
            {
              "id": "allsettled",
              "text": "Promise.allSettled waits for every promise and reports each one's success or failure, so the page can show what did load."
            }
          ],
          "notEnough": [
            "Only listing Promise.all and allSettled without saying how they handle a failure."
          ],
          "misconceptions": []
        }
      }
    },
    {
      "title": "Modern ES6+ syntax patterns used in MERN codebases",
      "question": "Your React component receives a user object as props and an array of orders from the API, and needs to show only the paid orders' totals. Explain the modern JavaScript syntax you'd use to unpack, copy and transform this data.",
      "followUps": {
        "Destructuring, spread, and rest in function signatures": "How do destructuring, spread and rest differ, and why do you see spread so often when updating state?",
        "Array methods: map, filter, reduce, and their composition": "How would you get the total of the paid orders using filter, map and reduce, and what does each step return?"
      },
      "criteria": {
        "Destructuring, spread, and rest in function signatures": {
          "id": "destructure-spread",
          "evidence": [
            {
              "id": "destructure",
              "text": "Destructuring pulls properties or array items into variables in one line, for example in a function's parameters."
            },
            {
              "id": "spread",
              "text": "Spread copies the items of an array or the properties of an object into a new one, which is how you make an updated copy without changing the original."
            },
            {
              "id": "rest",
              "text": "Rest collects the remaining items or properties into a new array or object."
            }
          ],
          "notEnough": [
            "Only naming destructuring, spread and rest without explaining what each one does."
          ],
          "misconceptions": [
            {
              "id": "deep-copy",
              "text": "Says spreading an object makes a deep copy of all nested objects."
            }
          ]
        },
        "Array methods: map, filter, reduce, and their composition": {
          "id": "array-methods",
          "evidence": [
            {
              "id": "filter",
              "text": "filter returns a new array with only the items that pass a test, like the paid orders."
            },
            {
              "id": "map",
              "text": "map returns a new array with each item transformed, like each order turned into its amount."
            },
            {
              "id": "reduce",
              "text": "reduce combines all items into one value, like the sum of the amounts."
            }
          ],
          "notEnough": [
            "Only listing the method names without saying what each one returns."
          ],
          "misconceptions": [
            {
              "id": "mutates",
              "text": "Says map and filter change the original array."
            }
          ]
        }
      }
    },
    {
      "title": "Fetch API and error handling patterns",
      "question": "Your frontend calls the API with fetch, and when the server returns a 500 the page silently shows nothing. Your project also mixes require and import. Explain what's going wrong with the fetch, and how the two module systems differ.",
      "followUps": {
        "fetch, Response.ok, and typed error handling": "Why doesn't fetch throw on a 404 or 500, and how do you handle it properly?",
        "ES modules: import/export and the difference from CommonJS": "What's the practical difference between require and import, and why can't you always mix them freely?"
      },
      "criteria": {
        "fetch, Response.ok, and typed error handling": {
          "id": "fetch-errors",
          "evidence": [
            {
              "id": "no-reject",
              "text": "fetch only rejects on network failure; a 404 or 500 still resolves with a response."
            },
            {
              "id": "check-ok",
              "text": "You have to check response.ok or the status and throw or handle the error yourself."
            },
            {
              "id": "parse",
              "text": "The body is read separately, for example with response.json(), which is also async and can fail."
            }
          ],
          "notEnough": [
            "Only saying wrap fetch in try/catch without explaining that HTTP errors don't reject."
          ],
          "misconceptions": [
            {
              "id": "rejects-on-500",
              "text": "Says fetch rejects its promise when the server returns a 500."
            }
          ]
        },
        "ES modules: import/export and the difference from CommonJS": {
          "id": "esm-vs-commonjs",
          "evidence": [
            {
              "id": "static",
              "text": "ES module imports and exports are static, so tools can analyze them before the code runs, which enables things like tree shaking."
            },
            {
              "id": "dynamic",
              "text": "CommonJS require is a normal function call that runs at runtime and loads modules synchronously."
            },
            {
              "id": "boundary",
              "text": "A file is treated as one system or the other, set by package.json type or the .mjs and .cjs extensions, which decides which syntax works in it."
            }
          ],
          "notEnough": [
            "Only saying import is newer than require without explaining the difference."
          ],
          "misconceptions": []
        }
      }
    }
  ]
}
```

LAYER: mern-3
```json
{
  "groups": [
    {
      "title": "React's component model and virtual DOM reconciliation",
      "question": "In your MERN app, a parent component holds a list of posts and each child shows a like button. When a user clicks like, explain how the change travels through your components and how React updates the page without rebuilding all of it.",
      "followUps": {
        "How React diffs the virtual DOM and batches DOM updates": "When state changes and a component re-renders, why doesn't React replace the whole page in the real DOM?",
        "Unidirectional data flow: props down, events up": "How does the like button in the child change state that lives in the parent, and why is that easier to debug?"
      },
      "criteria": {
        "How React diffs the virtual DOM and batches DOM updates": {
          "id": "reconciliation",
          "evidence": [
            {
              "id": "new-tree",
              "text": "On each render React produces a new tree of elements and compares it with the previous one."
            },
            {
              "id": "minimal",
              "text": "It then applies only the differences to the real DOM, and groups several state updates into one re-render."
            }
          ],
          "notEnough": [
            "Only saying React uses a virtual DOM so it's fast, without explaining the comparison."
          ],
          "misconceptions": [
            {
              "id": "no-dom",
              "text": "Says React never updates the real DOM, only the virtual DOM."
            }
          ]
        },
        "Unidirectional data flow: props down, events up": {
          "id": "data-flow",
          "evidence": [
            {
              "id": "props-down",
              "text": "Data is passed down from parent to child through props."
            },
            {
              "id": "callbacks-up",
              "text": "A child changes the parent's state by calling a function the parent passed down as a prop."
            },
            {
              "id": "traceable",
              "text": "Because state only changes where it lives, any change can be traced back to one place."
            }
          ],
          "notEnough": [
            "Only saying data flows one way without explaining how a child updates a parent."
          ],
          "misconceptions": [
            {
              "id": "mutate-props",
              "text": "Says a child can change its props directly to update the parent."
            }
          ]
        }
      }
    },
    {
      "title": "useState and useEffect semantics",
      "question": "Your component has a counter, and it also subscribes to live updates when it mounts. A teammate reports that the counter sometimes uses an old value and the subscription keeps firing after leaving the page. Explain why both bugs happen and how you'd fix them.",
      "followUps": {
        "Why state updates are asynchronous and batched": "You call setCount(count + 1) twice in one click handler and the count only goes up by one. Why, and what's the fix?",
        "useEffect dependency array and cleanup functions": "What decides when your effect runs again, and what goes wrong if you don't return a cleanup function?"
      },
      "criteria": {
        "Why state updates are asynchronous and batched": {
          "id": "state-updates",
          "evidence": [
            {
              "id": "next-render",
              "text": "Calling the setter doesn't change the variable right away; React queues the update and the new value is seen on the next render."
            },
            {
              "id": "batched",
              "text": "Updates in the same handler are batched into one re-render, and both calls read the same old count."
            },
            {
              "id": "functional-update",
              "text": "Passing a function, like setCount(c => c + 1), always works from the latest value."
            }
          ],
          "notEnough": [
            "Only saying state is asynchronous without explaining why the old value is read."
          ],
          "misconceptions": [
            {
              "id": "immediate",
              "text": "Says the state variable holds the new value right after the setter is called."
            }
          ]
        },
        "useEffect dependency array and cleanup functions": {
          "id": "effect-cleanup",
          "evidence": [
            {
              "id": "dependencies",
              "text": "The effect runs after render and again whenever a value in its dependency array changes; an empty array means only after the first render."
            },
            {
              "id": "cleanup",
              "text": "The function returned from the effect runs before the effect runs again and when the component unmounts, to cancel subscriptions, timers or requests."
            }
          ],
          "notEnough": [
            "Only naming the dependency array and cleanup without saying when each one runs."
          ],
          "misconceptions": [
            {
              "id": "no-array-once",
              "text": "Says an effect with no dependency array runs only once."
            }
          ]
        }
      }
    },
    {
      "title": "JSX syntax and component composition patterns",
      "question": "You're building a product list that renders a Button component for each product, shows 'No products' when the list is empty, and lets users reorder the items. Explain what your JSX turns into and how React keeps the list correct.",
      "followUps": {
        "JSX compiles to React.createElement calls": "What does <Button color=\"blue\">Click</Button> become after compiling, and why does that explain JSX's rules?",
        "Rendering lists with key props and conditional rendering": "Why is using the array index as the key a problem when the list can be reordered?"
      },
      "criteria": {
        "JSX compiles to React.createElement calls": {
          "id": "jsx-compiles",
          "evidence": [
            {
              "id": "function-calls",
              "text": "JSX is compiled into JavaScript function calls, like React.createElement(Button, { color: 'blue' }, 'Click'), that create element objects."
            },
            {
              "id": "expressions",
              "text": "Because it's JavaScript, you use expressions inside JSX, like a ternary or && for conditions, and a component returns one root element or a Fragment."
            }
          ],
          "notEnough": [
            "Only saying JSX is HTML in JavaScript without saying what it compiles to."
          ],
          "misconceptions": [
            {
              "id": "jsx-is-html",
              "text": "Says the browser reads JSX directly as HTML."
            }
          ]
        },
        "Rendering lists with key props and conditional rendering": {
          "id": "list-keys",
          "evidence": [
            {
              "id": "identity",
              "text": "React uses keys to match each list item with the same item from the previous render."
            },
            {
              "id": "stable-id",
              "text": "Keys should be stable unique ids, like database ids; index keys break when items are reordered, inserted or removed, and state gets mixed up between items."
            }
          ],
          "notEnough": [
            "Only saying every list item needs a key without explaining what React uses it for."
          ],
          "misconceptions": [
            {
              "id": "key-is-prop",
              "text": "Says the key is passed to the component as a normal prop it can read."
            }
          ]
        }
      }
    },
    {
      "title": "Controlled forms and event handling in React",
      "question": "You're building a signup form in React with name, email and password fields, live validation and a reset button. Explain how React should own the input values and how event handling works in React.",
      "followUps": {
        "Controlled inputs: value prop + onChange handler": "What makes an input controlled, and why does that make validation and clearing the form easy?",
        "Synthetic events and event pooling in React": "What is a SyntheticEvent, and can you still read the event's properties inside a setTimeout in modern React?"
      },
      "criteria": {
        "Controlled inputs: value prop + onChange handler": {
          "id": "controlled-inputs",
          "evidence": [
            {
              "id": "value-state",
              "text": "A controlled input gets its value from React state, and onChange updates that state on every keystroke."
            },
            {
              "id": "single-source",
              "text": "React state is then the single source of truth, so validating, transforming or clearing the value is just changing state."
            },
            {
              "id": "needs-handler",
              "text": "Without an onChange handler a controlled input can't change, so every controlled input needs one."
            }
          ],
          "notEnough": [
            "Only saying use value and onChange without explaining that state drives the input."
          ],
          "misconceptions": []
        },
        "Synthetic events and event pooling in React": {
          "id": "synthetic-events",
          "evidence": [
            {
              "id": "wrapper",
              "text": "React passes handlers a SyntheticEvent, a wrapper around the native event with the same interface across browsers."
            },
            {
              "id": "no-pooling",
              "text": "Since React 17 events are no longer pooled, so their properties can be read later, for example in a timeout, without event.persist()."
            }
          ],
          "notEnough": [
            "Only saying React has its own events without saying what they wrap."
          ],
          "misconceptions": [
            {
              "id": "persist-needed",
              "text": "Says modern React still needs event.persist() to read an event asynchronously."
            }
          ]
        }
      }
    }
  ]
}
```

LAYER: mern-4
```json
{
  "groups": [
    {
      "title": "Context API internals and when it causes re-renders",
      "question": "Your app keeps the user, theme and a complex shopping cart in one React Context, and typing in the search box makes the whole app re-render. Explain why that happens and how you'd restructure the state, including the cart's update logic.",
      "followUps": {
        "How Context propagates values and triggers consumer re-renders": "Why does a component that only reads the theme re-render when the cart changes, and how would you fix it?",
        "useReducer for state with multiple related sub-values": "Why would useReducer suit the cart better than several useState calls?"
      },
      "criteria": {
        "How Context propagates values and triggers consumer re-renders": {
          "id": "context-rerenders",
          "evidence": [
            {
              "id": "all-consumers",
              "text": "Every component that uses a context re-renders when the context value changes, even if it only uses part of it."
            },
            {
              "id": "new-object",
              "text": "Passing a new object as the value on every render counts as a change too."
            },
            {
              "id": "split",
              "text": "Splitting contexts by what changes together, or memoizing the value, limits the re-renders to components that need them."
            }
          ],
          "notEnough": [
            "Only saying Context causes re-renders without explaining which components and why."
          ],
          "misconceptions": []
        },
        "useReducer for state with multiple related sub-values": {
          "id": "use-reducer",
          "evidence": [
            {
              "id": "reducer",
              "text": "useReducer keeps related values in one state and computes the next state in a reducer function from the current state and an action."
            },
            {
              "id": "central-logic",
              "text": "All the update rules live in one place, which keeps fields consistent with each other."
            },
            {
              "id": "testable",
              "text": "The reducer is a pure function, so it can be tested without rendering anything."
            }
          ],
          "notEnough": [
            "Only saying useReducer is for complex state without explaining actions and the reducer."
          ],
          "misconceptions": []
        }
      }
    },
    {
      "title": "React Router v6 rendering model",
      "question": "Your dashboard has a shared sidebar layout with several pages, and one page renders a big chart that recalculates on every keystroke elsewhere on the page. Explain how the pages render inside the layout and how you'd decide whether memoization fixes the slow chart.",
      "followUps": {
        "Nested routes and the Outlet component for shared layouts": "How does the dashboard layout know where to render the current child page?",
        "useMemo and useCallback: when memoization helps and when it hurts": "When does useMemo or useCallback actually help, and when does it just add cost?"
      },
      "criteria": {
        "Nested routes and the Outlet component for shared layouts": {
          "id": "nested-routes-outlet",
          "evidence": [
            {
              "id": "parent-layout",
              "text": "A parent route renders the shared layout, and the child routes are defined inside it."
            },
            {
              "id": "outlet",
              "text": "The parent places an Outlet where the matched child route renders, so the layout stays and only the inner page changes."
            }
          ],
          "notEnough": [
            "Only saying use nested routes and Outlet without explaining what renders where."
          ],
          "misconceptions": []
        },
        "useMemo and useCallback: when memoization helps and when it hurts": {
          "id": "memoization",
          "evidence": [
            {
              "id": "what",
              "text": "useMemo keeps a computed value and useCallback keeps a function between renders until their dependencies change."
            },
            {
              "id": "when-helps",
              "text": "They help for expensive calculations, or when a stable reference stops a memoized child or an effect from running again."
            },
            {
              "id": "measure",
              "text": "Elsewhere they add comparison work for no gain, so they're added after a profiler shows a real problem."
            }
          ],
          "notEnough": [
            "Only saying useMemo makes things faster without saying when."
          ],
          "misconceptions": [
            {
              "id": "always-memo",
              "text": "Says every value and function should be wrapped in useMemo or useCallback."
            }
          ]
        }
      }
    },
    {
      "title": "Custom hooks for reusable stateful logic",
      "question": "Three pages in your app repeat the same fetch-with-loading-and-error logic, and the first load downloads the code for every page, including the admin area. Explain how you'd remove the duplication and make the first load smaller.",
      "followUps": {
        "Extracting stateful logic into custom hooks": "What makes a function a custom hook, and does sharing a hook share the state between components?",
        "Code splitting with React.lazy and Suspense": "How do React.lazy and Suspense change when the admin page's code is downloaded, and what does the user see meanwhile?"
      },
      "criteria": {
        "Extracting stateful logic into custom hooks": {
          "id": "custom-hooks",
          "evidence": [
            {
              "id": "definition",
              "text": "A custom hook is a function whose name starts with use and that calls other hooks, so stateful logic can be reused."
            },
            {
              "id": "separate-state",
              "text": "Each component that calls the hook gets its own state; the logic is shared, not the data."
            }
          ],
          "notEnough": [
            "Only saying put it in a custom hook without saying what a hook is or what it shares."
          ],
          "misconceptions": [
            {
              "id": "shared-state",
              "text": "Says components that use the same custom hook share the same state."
            }
          ]
        },
        "Code splitting with React.lazy and Suspense": {
          "id": "code-splitting",
          "evidence": [
            {
              "id": "lazy",
              "text": "React.lazy with a dynamic import puts the component in a separate chunk that downloads only when it is first rendered."
            },
            {
              "id": "suspense",
              "text": "Suspense shows a fallback, like a spinner, while that chunk loads."
            },
            {
              "id": "smaller",
              "text": "The first page load downloads less code, so the app becomes usable sooner."
            }
          ],
          "notEnough": [
            "Only saying use lazy loading without explaining when the code is downloaded."
          ],
          "misconceptions": []
        }
      }
    },
    {
      "title": "React Router navigation APIs",
      "question": "Your app has a post page at /posts/:id with filters in the URL like ?sort=new, and a settings page only logged-in users may open. Explain how the page reads the id and filters, how you send users somewhere after an action, and how you keep logged-out users away from settings.",
      "followUps": {
        "useNavigate, useParams, and useSearchParams": "Why keep the sort filter in the URL with useSearchParams instead of in component state?",
        "Protected routes using wrapper components and redirect": "How would a protected route wrapper decide what to render, and where does it get the auth state from?"
      },
      "criteria": {
        "useNavigate, useParams, and useSearchParams": {
          "id": "router-hooks",
          "evidence": [
            {
              "id": "params",
              "text": "useParams reads dynamic segments of the URL, like the id in /posts/:id."
            },
            {
              "id": "search-params",
              "text": "useSearchParams reads and updates the query string, so filters survive a reload and can be shared as a link."
            },
            {
              "id": "navigate",
              "text": "useNavigate sends the user to another route from code, for example after saving a form."
            }
          ],
          "notEnough": [
            "Only listing the hook names without saying what each one reads or does."
          ],
          "misconceptions": []
        },
        "Protected routes using wrapper components and redirect": {
          "id": "protected-routes",
          "evidence": [
            {
              "id": "check",
              "text": "A wrapper component reads the auth state, for example from context, and renders the protected page only for logged-in users."
            },
            {
              "id": "redirect",
              "text": "Otherwise it redirects to the login page, for example with Navigate."
            },
            {
              "id": "server-too",
              "text": "The API still has to check auth itself, because hiding a route in the browser doesn't protect the data."
            }
          ],
          "notEnough": [
            "Only saying use a protected route without explaining the check and the redirect."
          ],
          "misconceptions": [
            {
              "id": "frontend-secure",
              "text": "Says hiding a route in React is enough to keep the data secure."
            }
          ]
        }
      }
    }
  ]
}
```

LAYER: mern-5
```json
{
  "groups": [
    {
      "title": "The Node.js runtime: event loop and the module system",
      "question": "Your Express API runs as a single Node process and serves hundreds of users at once, and the codebase mixes require and import. Explain how one thread can serve so many requests and how Node's two module systems differ.",
      "followUps": {
        "How Node.js handles I/O without blocking using libuv": "What would happen to all users if one handler ran a heavy synchronous loop for five seconds, and why?",
        "CommonJS require versus ES module import in Node": "How does Node decide whether a file uses require or import, and why can't you just mix them anywhere?"
      },
      "criteria": {
        "How Node.js handles I/O without blocking using libuv": {
          "id": "node-nonblocking",
          "evidence": [
            {
              "id": "delegate",
              "text": "Node hands slow I/O like network and file work to the operating system or libuv's thread pool instead of waiting for it."
            },
            {
              "id": "callbacks",
              "text": "The single JavaScript thread keeps handling other requests, and the event loop runs each callback when its I/O completes."
            },
            {
              "id": "cpu-blocks",
              "text": "Long synchronous CPU work blocks the event loop, so every other request has to wait."
            }
          ],
          "notEnough": [
            "Only saying Node is non-blocking or uses an event loop without explaining how waiting is avoided."
          ],
          "misconceptions": [
            {
              "id": "thread-per-request",
              "text": "Says Node creates a new thread for every request."
            }
          ]
        },
        "CommonJS require versus ES module import in Node": {
          "id": "node-modules",
          "evidence": [
            {
              "id": "cjs",
              "text": "CommonJS uses require and module.exports and loads modules synchronously at runtime."
            },
            {
              "id": "esm",
              "text": "ES modules use import and export, are analyzed statically and load asynchronously."
            },
            {
              "id": "choose",
              "text": "The package.json type field or the .mjs and .cjs extensions decide which system a file uses, which decides which syntax works in it."
            }
          ],
          "notEnough": [
            "Only saying import is newer than require without explaining the difference."
          ],
          "misconceptions": []
        }
      }
    },
    {
      "title": "Express middleware chain execution model",
      "question": "You're designing the API for blog posts in your MERN app, and every request passes through logging and auth before its handler. Explain how a request moves through Express and how you'd design the URLs, methods and status codes.",
      "followUps": {
        "How Express routes and middleware compose with next()": "What happens if a middleware neither calls next() nor sends a response, and what does next(err) do?",
        "RESTful API design: resources, verbs, and status codes": "Why /posts/42 with GET and DELETE instead of /getPost, and which status codes would you return for create, delete and invalid input?"
      },
      "criteria": {
        "How Express routes and middleware compose with next()": {
          "id": "middleware-next",
          "evidence": [
            {
              "id": "order",
              "text": "Middleware and routes run in the order they are registered, and each one receives req, res and next."
            },
            {
              "id": "next",
              "text": "Calling next() passes control to the next middleware; if it isn't called and no response is sent, the request hangs."
            },
            {
              "id": "next-err",
              "text": "Calling next(err) skips ahead to the error-handling middleware."
            }
          ],
          "notEnough": [
            "Only saying next() goes to the next middleware without the order or what happens otherwise."
          ],
          "misconceptions": []
        },
        "RESTful API design: resources, verbs, and status codes": {
          "id": "rest-design",
          "evidence": [
            {
              "id": "nouns",
              "text": "URLs name resources, like /posts and /posts/42, and the HTTP method says the action: GET reads, POST creates, PUT or PATCH updates, DELETE removes."
            },
            {
              "id": "status",
              "text": "Status codes tell the client what happened, like 201 after creating, 204 with no body, 404 when not found and 422 for invalid input."
            }
          ],
          "notEnough": [
            "Only listing methods or code numbers without explaining what they mean."
          ],
          "misconceptions": [
            {
              "id": "always-200",
              "text": "Says the API can return 200 for every response and put errors in the body with no downside."
            }
          ]
        }
      }
    },
    {
      "title": "Setting up and structuring an Express application",
      "question": "Your Express app started as one big server.js with every route in it, and the MongoDB password is written directly in the code. Explain how you'd reorganize the code and handle configuration and secrets.",
      "followUps": {
        "Router modules for separating concerns by resource": "Why split routes into one router per resource, and what goes in each router file?",
        "Environment variables with dotenv and the config pattern": "Why must the .env file stay out of git, and how do new developers know which variables they need?"
      },
      "criteria": {
        "Router modules for separating concerns by resource": {
          "id": "router-modules",
          "evidence": [
            {
              "id": "router",
              "text": "express.Router creates a mini-app per resource with its own routes and middleware, mounted on a prefix like /posts or /auth."
            },
            {
              "id": "focused",
              "text": "Each file then handles one resource, so it's easier to find, change and test."
            }
          ],
          "notEnough": [
            "Only saying split it into files without explaining routers or what goes where."
          ],
          "misconceptions": []
        },
        "Environment variables with dotenv and the config pattern": {
          "id": "dotenv-config",
          "evidence": [
            {
              "id": "dotenv",
              "text": "dotenv loads variables from a .env file into process.env at startup, so secrets aren't written in the code."
            },
            {
              "id": "gitignore",
              "text": "The .env file holds secrets, so it's listed in .gitignore and never committed."
            },
            {
              "id": "example",
              "text": "A .env.example file lists the required variable names without real values, so others know what to set."
            }
          ],
          "notEnough": [
            "Only saying use dotenv without explaining why secrets stay out of git."
          ],
          "misconceptions": []
        }
      }
    },
    {
      "title": "Request validation and centralized error handling",
      "question": "A user sends a signup request with an invalid email, and elsewhere a database error crashes a handler and returns an HTML stack trace. Explain how you'd validate input and handle errors so every failure returns a consistent JSON response.",
      "followUps": {
        "Input validation with express-validator or Joi": "Where should validation run, and what should happen when the input is invalid?",
        "Centralized error middleware with four-argument signature": "What makes Express treat a middleware as an error handler, and why does it have to be registered last?"
      },
      "criteria": {
        "Input validation with express-validator or Joi": {
          "id": "input-validation",
          "evidence": [
            {
              "id": "untrusted",
              "text": "req.body comes from the client and can't be trusted, even if the frontend validates it."
            },
            {
              "id": "before-logic",
              "text": "Its shape, types and limits are checked at the route, before any business logic or database call."
            },
            {
              "id": "reject",
              "text": "Invalid input is answered with a 400 or 422 listing the problems."
            }
          ],
          "notEnough": [
            "Only saying validate the input without saying where or what happens when it fails."
          ],
          "misconceptions": [
            {
              "id": "frontend-enough",
              "text": "Says validating in the frontend form is enough."
            }
          ]
        },
        "Centralized error middleware with four-argument signature": {
          "id": "error-middleware",
          "evidence": [
            {
              "id": "four-args",
              "text": "Express recognizes error middleware by its four arguments: err, req, res and next."
            },
            {
              "id": "last",
              "text": "It is registered after all routes, so errors from anywhere end up there."
            },
            {
              "id": "consistent",
              "text": "Handlers pass errors on with next(err), and that one handler returns the same JSON shape and a fitting status for every error."
            }
          ],
          "notEnough": [
            "Only saying use an error handler without explaining how errors reach it."
          ],
          "misconceptions": []
        }
      }
    }
  ]
}
```

LAYER: mern-6
```json
{
  "groups": [
    {
      "title": "NoSQL document model versus relational tables",
      "question": "You're designing the MongoDB data for a blog: posts, their comments and the authors. Explain how you'd decide what goes inside a post document and what's stored separately, and what the _id values actually are.",
      "followUps": {
        "Embedding versus referencing documents in MongoDB": "When would you embed comments inside the post, and when would you reference them by id instead?",
        "MongoDB BSON types and the ObjectId structure": "What does an ObjectId contain, and why does MongoDB store BSON instead of plain JSON?"
      },
      "criteria": {
        "Embedding versus referencing documents in MongoDB": {
          "id": "embed-vs-reference",
          "evidence": [
            {
              "id": "embed",
              "text": "Embedding puts related data inside the document, which suits data that is always read together and stays small, so one read gets everything."
            },
            {
              "id": "reference",
              "text": "Referencing stores an ObjectId to another document, which suits data that is large, grows without limit or is shared, like authors."
            },
            {
              "id": "doc-limit",
              "text": "A single document has a size limit, so unbounded lists like all comments of a busy post shouldn't be embedded."
            }
          ],
          "notEnough": [
            "Only saying you can embed or reference without explaining when to choose each."
          ],
          "misconceptions": []
        },
        "MongoDB BSON types and the ObjectId structure": {
          "id": "bson-objectid",
          "evidence": [
            {
              "id": "bson",
              "text": "MongoDB stores documents as BSON, a binary format with extra types JSON lacks, like ObjectId, Date and 64-bit integers."
            },
            {
              "id": "objectid",
              "text": "An ObjectId includes a creation timestamp, so ids are unique without a central counter and roughly sort by creation time."
            }
          ],
          "notEnough": [
            "Only saying MongoDB uses BSON and ObjectIds without explaining what they add."
          ],
          "misconceptions": [
            {
              "id": "objectid-random",
              "text": "Says an ObjectId is a completely random string with no meaning."
            }
          ]
        }
      }
    },
    {
      "title": "Mongoose schema validation and middleware hooks",
      "question": "Your User model must always have a valid email, a role that defaults to 'user', and a password that is never saved in plain text. Explain how you'd enforce this with Mongoose.",
      "followUps": {
        "Schema types, validators, and default values in Mongoose": "What does a Mongoose schema check for you before saving, and what does it not protect against?",
        "Mongoose pre/post middleware for cross-cutting logic": "How would a pre('save') hook hash the password, and what trap is there when the password hasn't changed?"
      },
      "criteria": {
        "Schema types, validators, and default values in Mongoose": {
          "id": "schema-validation",
          "evidence": [
            {
              "id": "shape",
              "text": "A schema defines each field's type, whether it's required, defaults and validators like min, max or match."
            },
            {
              "id": "before-save",
              "text": "Mongoose runs these checks before saving and rejects documents that break them."
            },
            {
              "id": "app-level",
              "text": "These checks run in your app, not in MongoDB itself, so data written another way bypasses them."
            }
          ],
          "notEnough": [
            "Only saying Mongoose validates data without saying what or when."
          ],
          "misconceptions": []
        },
        "Mongoose pre/post middleware for cross-cutting logic": {
          "id": "mongoose-hooks",
          "evidence": [
            {
              "id": "pre-post",
              "text": "pre hooks run before an operation like save, and post hooks run after it, for logic that should always happen."
            },
            {
              "id": "hash",
              "text": "A pre('save') hook can hash the password before it is stored."
            },
            {
              "id": "modified",
              "text": "It should check isModified('password'), otherwise it would hash the already-hashed password again on every save."
            }
          ],
          "notEnough": [
            "Only saying use middleware hooks without explaining when they run."
          ],
          "misconceptions": [
            {
              "id": "hooks-everywhere",
              "text": "Says pre('save') hooks also run for updateOne and findByIdAndUpdate calls."
            }
          ]
        }
      }
    },
    {
      "title": "MongoDB Atlas setup and connection management",
      "question": "Your Express API connects to MongoDB Atlas and has endpoints to create, read, update and delete posts. Explain how the connection is set up and handled, and how the CRUD handlers should use the model.",
      "followUps": {
        "Connecting with mongoose.connect and handling connection events": "Why connect once at startup and listen for connection events, instead of connecting in each request?",
        "CRUD operations with Mongoose model methods": "findById returns null for a missing post. Why must your handler check for that, and what should it return?"
      },
      "criteria": {
        "Connecting with mongoose.connect and handling connection events": {
          "id": "mongoose-connection",
          "evidence": [
            {
              "id": "once",
              "text": "mongoose.connect is called once at startup with the connection string from an environment variable, and the connection pool is reused by all requests."
            },
            {
              "id": "events",
              "text": "Listening for events like connected and error lets the app log problems and react, for example by not starting the server without a database."
            }
          ],
          "notEnough": [
            "Only saying call mongoose.connect without explaining when or what happens on failure."
          ],
          "misconceptions": []
        },
        "CRUD operations with Mongoose model methods": {
          "id": "mongoose-crud",
          "evidence": [
            {
              "id": "methods",
              "text": "Model methods like create, find, findById, findByIdAndUpdate and deleteOne do the CRUD work and return promises that must be awaited."
            },
            {
              "id": "null-case",
              "text": "A query for a missing document returns null instead of throwing, so the handler must check and answer 404."
            },
            {
              "id": "update-options",
              "text": "findByIdAndUpdate returns the old document unless you ask for the new one, and needs runValidators to apply schema validation."
            }
          ],
          "notEnough": [
            "Only listing method names without explaining awaiting or the null case."
          ],
          "misconceptions": []
        }
      }
    },
    {
      "title": "Querying and indexing for performance",
      "question": "Users search posts by tag, date range and title text, and the posts collection now has millions of documents and these searches are slow. Explain how you'd write the queries and make them fast.",
      "followUps": {
        "MongoDB query operators: $eq, $in, $gte, $regex": "How would you query posts with any of three tags, created this month, and how do operators like $in and $gte work?",
        "Creating indexes to avoid full collection scans": "What happens on a query without a matching index, and how would you add one?"
      },
      "criteria": {
        "MongoDB query operators: $eq, $in, $gte, $regex": {
          "id": "query-operators",
          "evidence": [
            {
              "id": "operators",
              "text": "Filters use operator objects inside the query, like $in for matching any value in a list and $gte and $lte for ranges."
            },
            {
              "id": "regex-cost",
              "text": "$regex can match text patterns, but a pattern that doesn't start at the beginning of the string can't use an index well and scans many documents."
            }
          ],
          "notEnough": [
            "Only listing operator names without explaining what they match."
          ],
          "misconceptions": []
        },
        "Creating indexes to avoid full collection scans": {
          "id": "mongo-indexes",
          "evidence": [
            {
              "id": "collscan",
              "text": "Without an index on the filtered field, MongoDB has to scan every document in the collection."
            },
            {
              "id": "create",
              "text": "You add indexes on fields you often filter or sort by, with schema.index in Mongoose or createIndex."
            },
            {
              "id": "cost",
              "text": "Indexes take space and slow down writes, so you only add the ones your queries need."
            }
          ],
          "notEnough": [
            "Only saying add an index without explaining what it avoids."
          ],
          "misconceptions": []
        }
      }
    }
  ]
}
```

LAYER: mern-7
```json
{
  "groups": [
    {
      "title": "Password security and cryptographic hashing",
      "question": "Your MERN app stores user passwords and gives logged-in users a JWT. Explain how passwords should be stored so a stolen database doesn't reveal them, and what a JWT contains and protects.",
      "followUps": {
        "Why bcrypt uses work factor and salting to resist brute force": "Why does bcrypt use a salt and a cost factor, and why not just hash the password with SHA-256?",
        "JWT structure: header, payload, and signature verification": "Anyone can decode a JWT's payload. So what does the signature protect, and how does the server check it?"
      },
      "criteria": {
        "Why bcrypt uses work factor and salting to resist brute force": {
          "id": "bcrypt-hashing",
          "evidence": [
            {
              "id": "salt",
              "text": "bcrypt adds a random salt per password, so identical passwords get different hashes and precomputed tables don't work."
            },
            {
              "id": "cost",
              "text": "Its cost factor makes each hash deliberately slow, so guessing passwords at scale is very expensive, and it can be raised as hardware gets faster."
            },
            {
              "id": "one-way",
              "text": "At login the entered password is hashed and compared; the original password is never stored or decrypted."
            }
          ],
          "notEnough": [
            "Only saying hash passwords with bcrypt without explaining the salt or the slowness."
          ],
          "misconceptions": [
            {
              "id": "encrypt",
              "text": "Says passwords should be encrypted so they can be decrypted later."
            }
          ]
        },
        "JWT structure: header, payload, and signature verification": {
          "id": "jwt-structure",
          "evidence": [
            {
              "id": "parts",
              "text": "A JWT has a header, a payload of claims and a signature, each Base64URL-encoded and joined by dots."
            },
            {
              "id": "not-secret",
              "text": "The payload is only encoded, not encrypted, so anyone can read it; passwords and secrets never go there."
            },
            {
              "id": "verify",
              "text": "The server recomputes the signature from the header and payload with its secret; if it doesn't match, the token was changed and is rejected."
            }
          ],
          "notEnough": [
            "Only saying a JWT has three parts without saying what the signature does."
          ],
          "misconceptions": [
            {
              "id": "payload-encrypted",
              "text": "Says the JWT payload is encrypted and safe for sensitive data."
            }
          ]
        }
      }
    },
    {
      "title": "HTTP-only cookies versus localStorage for token storage",
      "question": "You need to decide where your React app keeps the auth token, knowing that a comment field might let an attacker inject a script, and that other sites might try to make requests to your API. Explain your choice and the attacks it defends against.",
      "followUps": {
        "Why XSS can steal localStorage tokens but not HTTP-only cookies": "Why can an injected script steal a token from localStorage but not from an HTTP-only cookie?",
        "CSRF attacks and SameSite cookie attribute as defense": "Cookies are sent automatically, so what is CSRF, and how does SameSite help?"
      },
      "criteria": {
        "Why XSS can steal localStorage tokens but not HTTP-only cookies": {
          "id": "token-storage-xss",
          "evidence": [
            {
              "id": "localstorage",
              "text": "Any script running on the page, including an injected one, can read localStorage and send the token away."
            },
            {
              "id": "httponly",
              "text": "JavaScript can't read an HTTP-only cookie, so the token is sent with requests but can't be stolen by the script."
            }
          ],
          "notEnough": [
            "Only saying cookies are safer than localStorage without explaining why."
          ],
          "misconceptions": [
            {
              "id": "stops-xss",
              "text": "Says HTTP-only cookies stop XSS attacks from happening at all."
            }
          ]
        },
        "CSRF attacks and SameSite cookie attribute as defense": {
          "id": "csrf-samesite",
          "evidence": [
            {
              "id": "csrf",
              "text": "CSRF makes a logged-in user's browser send a request to your API from another site, and the browser attaches the cookie automatically."
            },
            {
              "id": "samesite",
              "text": "The SameSite attribute stops the cookie from being sent on cross-site requests (Strict) or most of them (Lax), which blocks that attack."
            }
          ],
          "notEnough": [
            "Only saying use SameSite without explaining what CSRF is."
          ],
          "misconceptions": []
        }
      }
    },
    {
      "title": "Implementing JWT auth in Express",
      "question": "Users log in to your Express API and then call protected endpoints like creating a post. Explain how the server issues tokens at login, how long they last, and how each protected request is checked.",
      "followUps": {
        "Signing and verifying JWTs with jsonwebtoken": "Why always set expiresIn, and how does a refresh token keep the user logged in?",
        "Auth middleware: extracting and verifying the Bearer token": "Walk through what the auth middleware does with the Authorization header, and what happens if the token has expired."
      },
      "criteria": {
        "Signing and verifying JWTs with jsonwebtoken": {
          "id": "jwt-signing",
          "evidence": [
            {
              "id": "sign",
              "text": "At login the server signs a token with a secret, containing claims like the user id, plus an expiry."
            },
            {
              "id": "expiry",
              "text": "A short expiry limits how long a stolen token can be used."
            },
            {
              "id": "refresh",
              "text": "A longer-lived refresh token, kept in an HTTP-only cookie, is used to get new access tokens without logging in again."
            }
          ],
          "notEnough": [
            "Only saying sign a token with jsonwebtoken without explaining expiry or refresh."
          ],
          "misconceptions": []
        },
        "Auth middleware: extracting and verifying the Bearer token": {
          "id": "auth-middleware",
          "evidence": [
            {
              "id": "read-header",
              "text": "The middleware reads the Bearer token from the Authorization header."
            },
            {
              "id": "verify",
              "text": "It verifies the signature and the expiry with the secret, and rejects the request with 401 if that fails."
            },
            {
              "id": "attach",
              "text": "On success it attaches the decoded user to req and calls next(), and it's applied only to the routes that need auth."
            }
          ],
          "notEnough": [
            "Only saying check the token in a middleware without the steps."
          ],
          "misconceptions": [
            {
              "id": "decode-enough",
              "text": "Says decoding the token is enough without verifying its signature."
            }
          ]
        }
      }
    },
    {
      "title": "CORS and input sanitization",
      "question": "Your React app on one domain calls your API on another, and a security review found that users can open other users' orders by changing the id in the URL. Explain how you'd configure cross-origin access and fix the most common security holes.",
      "followUps": {
        "Configuring cors middleware with an origin allowlist": "Why restrict the cors origin to your frontend's URL, and why can't you use '*' with cookies?",
        "OWASP Top 10 essentials: injection, broken auth, and IDOR": "What is IDOR, and how would you fix the orders endpoint? Name another OWASP risk relevant to MongoDB."
      },
      "criteria": {
        "Configuring cors middleware with an origin allowlist": {
          "id": "cors-allowlist",
          "evidence": [
            {
              "id": "browser-rule",
              "text": "Browsers block a page from reading responses from another origin unless the API allows that origin in its CORS headers."
            },
            {
              "id": "allowlist",
              "text": "The API should allow only its own frontend's origins, not every site."
            },
            {
              "id": "credentials",
              "text": "When requests carry cookies, the allowed origin must be named exactly; a wildcard isn't allowed with credentials."
            }
          ],
          "notEnough": [
            "Only saying enable cors without explaining what it controls."
          ],
          "misconceptions": [
            {
              "id": "cors-security",
              "text": "Says CORS protects the API from requests made by scripts or tools like curl."
            }
          ]
        },
        "OWASP Top 10 essentials: injection, broken auth, and IDOR": {
          "id": "owasp-basics",
          "evidence": [
            {
              "id": "idor",
              "text": "IDOR means the API returns or changes an object just because its id was given, without checking that it belongs to the user."
            },
            {
              "id": "ownership",
              "text": "The fix is to check on the server that the logged-in user owns or may access that object."
            },
            {
              "id": "nosql-injection",
              "text": "Injection also applies to MongoDB: passing raw request objects into queries lets attackers add operators like $ne, so input must be validated."
            }
          ],
          "notEnough": [
            "Only naming OWASP Top 10 items without explaining any of them."
          ],
          "misconceptions": []
        }
      }
    }
  ]
}
```

LAYER: mern-8
```json
{
  "groups": [
    {
      "title": "Server state versus client state: why the distinction matters",
      "question": "Your React app shows a list of orders from the API that other users and admins can also change. Explain why that data needs different handling from local UI state like an open menu, and how a library like React Query keeps it fresh.",
      "followUps": {
        "Why server state is async, shared, and can go stale": "Why can the orders you fetched be wrong a minute later, even if nobody touched them in your browser?",
        "React Query cache: staleTime, cacheTime, and invalidation": "After a user creates an order, how do you make the list show it, and what's the difference between staleTime and gcTime (formerly cacheTime)?"
      },
      "criteria": {
        "Why server state is async, shared, and can go stale": {
          "id": "server-state",
          "evidence": [
            {
              "id": "owned-by-server",
              "text": "Server state lives on the server and is shared, so others can change it; your copy is only a snapshot."
            },
            {
              "id": "stale",
              "text": "That copy can go out of date at any time, so it needs refetching, caching and loading and error states."
            },
            {
              "id": "vs-client",
              "text": "Client state, like an open menu, belongs only to this browser and can't go stale."
            }
          ],
          "notEnough": [
            "Only saying server state comes from the server without explaining why it goes stale."
          ],
          "misconceptions": []
        },
        "React Query cache: staleTime, cacheTime, and invalidation": {
          "id": "query-cache",
          "evidence": [
            {
              "id": "stale-time",
              "text": "staleTime is how long cached data counts as fresh; while fresh it's used without refetching."
            },
            {
              "id": "gc-time",
              "text": "gcTime, formerly cacheTime, is how long unused cached data stays in memory before it's removed."
            },
            {
              "id": "invalidate",
              "text": "After a change, invalidating the matching query marks it stale and triggers a refetch, so the list shows the new item."
            }
          ],
          "notEnough": [
            "Only saying React Query caches data without explaining when it refetches."
          ],
          "misconceptions": [
            {
              "id": "cachetime-fresh",
              "text": "Says cacheTime (gcTime) controls how long data counts as fresh."
            }
          ]
        }
      }
    },
    {
      "title": "Zustand's subscription model versus Context re-renders",
      "question": "Your app keeps the user, theme and cart in one React Context, and every change to the cart re-renders the whole page. Explain why, and how Zustand would avoid it.",
      "followUps": {
        "How Zustand avoids the Context re-render problem with selectors": "With Zustand, why doesn't a component that only reads the theme re-render when the cart changes?"
      },
      "criteria": {
        "How Zustand avoids the Context re-render problem with selectors": {
          "id": "zustand-selectors",
          "evidence": [
            {
              "id": "context-rerender",
              "text": "When a Context value changes, every component that uses that context re-renders, even if the part it uses didn't change."
            },
            {
              "id": "selector",
              "text": "A Zustand component subscribes with a selector and re-renders only when the selected slice changes."
            }
          ],
          "notEnough": [
            "Only saying Zustand is faster than Context without explaining the re-render difference."
          ],
          "misconceptions": []
        }
      }
    },
    {
      "title": "Axios setup and interceptors for auth headers",
      "question": "Every API call in your React app repeats the base URL and the auth header, and when a user likes a post they wait a second before the heart turns red. Explain how you'd centralize the API calls and make the like feel instant.",
      "followUps": {
        "Creating an Axios instance with baseURL and interceptors": "What would you put in a shared Axios instance and its interceptors?",
        "useMutation and optimistic updates in React Query": "How does an optimistic update work with useMutation, and what happens if the request fails?"
      },
      "criteria": {
        "Creating an Axios instance with baseURL and interceptors": {
          "id": "axios-instance",
          "evidence": [
            {
              "id": "instance",
              "text": "One Axios instance holds the API's base URL and shared settings, so calls don't repeat them."
            },
            {
              "id": "request-interceptor",
              "text": "A request interceptor adds the Authorization header to every request."
            },
            {
              "id": "response-interceptor",
              "text": "A response interceptor handles errors in one place, for example refreshing the token or logging out on 401."
            }
          ],
          "notEnough": [
            "Only saying use Axios interceptors without saying what they do."
          ],
          "misconceptions": []
        },
        "useMutation and optimistic updates in React Query": {
          "id": "optimistic-updates",
          "evidence": [
            {
              "id": "apply-early",
              "text": "The UI is updated in the cache right away, before the server answers, so it feels instant."
            },
            {
              "id": "snapshot",
              "text": "Before that, in onMutate, running queries are cancelled and the old data is saved."
            },
            {
              "id": "rollback",
              "text": "If the request fails, the saved data is put back, and afterwards the query is refetched to match the server."
            }
          ],
          "notEnough": [
            "Only saying optimistic updates show the change early without explaining the rollback."
          ],
          "misconceptions": []
        }
      }
    },
    {
      "title": "Connecting React to Express in development and production",
      "question": "In development your React app on Vite and your Express API run on different ports, and in production you need the user to stay logged in safely across page reloads. Explain how you'd connect the two and handle the tokens on the client.",
      "followUps": {
        "Vite proxy configuration for local development": "What does the Vite proxy do, and why does it avoid CORS problems in development?",
        "Handling auth tokens: storing and refreshing on the client": "Where would you keep the access token and the refresh token, and how does the app stay logged in after a reload?"
      },
      "criteria": {
        "Vite proxy configuration for local development": {
          "id": "vite-proxy",
          "evidence": [
            {
              "id": "forward",
              "text": "The Vite dev server forwards requests like /api to the Express server."
            },
            {
              "id": "same-origin",
              "text": "The browser only talks to the Vite origin, so the requests count as same-origin and no CORS setup is needed in development."
            },
            {
              "id": "mirrors-prod",
              "text": "It mirrors production setups where a reverse proxy serves the app and the API from one domain."
            }
          ],
          "notEnough": [
            "Only saying configure a proxy without explaining what it forwards."
          ],
          "misconceptions": []
        },
        "Handling auth tokens: storing and refreshing on the client": {
          "id": "client-tokens",
          "evidence": [
            {
              "id": "memory",
              "text": "The access token is kept in memory, not localStorage, so injected scripts can't easily read it."
            },
            {
              "id": "refresh-cookie",
              "text": "The refresh token is in an HTTP-only cookie that JavaScript can't read."
            },
            {
              "id": "reload",
              "text": "After a reload or when the access token expires, the app calls a refresh endpoint, and the cookie gets it a new access token."
            }
          ],
          "notEnough": [
            "Only saying store tokens securely without saying where or how refresh works."
          ],
          "misconceptions": []
        }
      }
    }
  ]
}
```

LAYER: mern-9
```json
{
  "groups": [
    {
      "title": "Testing philosophy: unit, integration, and end-to-end",
      "question": "Your MERN app has no tests yet, and you want confidence before each deploy without a slow, flaky suite. Explain which kinds of tests you'd write, how many of each, and what you'd fake in them.",
      "followUps": {
        "The testing pyramid and where to invest testing effort": "Why have many unit tests, fewer integration tests and only a few end-to-end tests?",
        "What to mock and what not to mock in unit tests": "What should you mock in a unit test, and what goes wrong if you mock too much?"
      },
      "criteria": {
        "The testing pyramid and where to invest testing effort": {
          "id": "testing-pyramid",
          "evidence": [
            {
              "id": "levels",
              "text": "Unit tests check small pieces alone, integration tests check pieces together with real dependencies like the database, and end-to-end tests drive the real app in a browser."
            },
            {
              "id": "tradeoff",
              "text": "Lower levels are fast and cheap, while higher levels give more confidence but are slower and flakier, so there are fewer of them."
            }
          ],
          "notEnough": [
            "Only naming unit, integration and end-to-end tests without explaining the trade-off."
          ],
          "misconceptions": []
        },
        "What to mock and what not to mock in unit tests": {
          "id": "mocking",
          "evidence": [
            {
              "id": "mock-external",
              "text": "Unit tests mock external dependencies like HTTP calls and databases, so they're fast and only test your logic."
            },
            {
              "id": "real-in-integration",
              "text": "Those dependencies are tested for real in integration tests."
            },
            {
              "id": "over-mocking",
              "text": "Mocking too much makes tests pass even when the real pieces don't work together."
            }
          ],
          "notEnough": [
            "Only saying mock dependencies without saying which ones or why."
          ],
          "misconceptions": []
        }
      }
    },
    {
      "title": "React Testing Library's guiding principle",
      "question": "You're testing a React login form with React Testing Library. Explain how your tests should find the email field and the submit button, and why.",
      "followUps": {
        "Query hierarchy: getByRole first, test IDs as last resort": "Why prefer getByRole over a test id, and what does that give you for free?"
      },
      "criteria": {
        "Query hierarchy: getByRole first, test IDs as last resort": {
          "id": "rtl-queries",
          "evidence": [
            {
              "id": "like-users",
              "text": "Queries mirror how users find things: by role, label or text first, with test ids as a last resort."
            },
            {
              "id": "accessibility",
              "text": "getByRole only finds elements with the right accessible role and name, so it also catches accessibility problems."
            },
            {
              "id": "refactor-safe",
              "text": "Tests tied to what users see don't break when the internal markup changes."
            }
          ],
          "notEnough": [
            "Only saying use getByRole without explaining why it's preferred."
          ],
          "misconceptions": []
        }
      }
    },
    {
      "title": "Writing Jest unit and integration tests",
      "question": "You need tests for a price calculation helper, and for the POST /api/posts endpoint of your Express app, which requires auth. Explain how you'd write both with Jest.",
      "followUps": {
        "describe/it blocks, beforeEach setup, and assertion matchers": "How would you organize the helper's tests, and what do beforeEach and matchers like toEqual and toThrow do?",
        "Supertest for testing Express endpoints without a running server": "How does Supertest call your Express app without starting a server, and what would you check for POST /api/posts?"
      },
      "criteria": {
        "describe/it blocks, beforeEach setup, and assertion matchers": {
          "id": "jest-basics",
          "evidence": [
            {
              "id": "describe-it",
              "text": "describe groups related tests and it or test defines each case."
            },
            {
              "id": "before-each",
              "text": "beforeEach runs setup before every test, so each one starts from a clean state."
            },
            {
              "id": "matchers",
              "text": "Matchers check results, for example toEqual for deep equality, toThrow for errors and toHaveBeenCalledWith for mocks."
            }
          ],
          "notEnough": [
            "Only listing Jest functions without saying what they do."
          ],
          "misconceptions": [
            {
              "id": "tobe-objects",
              "text": "Says toBe compares two objects by their contents."
            }
          ]
        },
        "Supertest for testing Express endpoints without a running server": {
          "id": "supertest",
          "evidence": [
            {
              "id": "in-process",
              "text": "Supertest takes the Express app and sends real HTTP requests to it inside the test process, without starting a server on a port."
            },
            {
              "id": "full-cycle",
              "text": "The request goes through routing, middleware like auth and validation, and the handler."
            },
            {
              "id": "assert",
              "text": "The test checks status codes and response bodies, for example 401 without a token and 201 with valid input."
            }
          ],
          "notEnough": [
            "Only saying use Supertest without saying what is checked."
          ],
          "misconceptions": []
        }
      }
    },
    {
      "title": "Async testing and CI integration",
      "question": "Your React component loads data and shows it after a moment, and your tests sometimes fail randomly. You also want tests to run on every push. Explain how you'd test async UI reliably and set up the CI run.",
      "followUps": {
        "Testing async components with waitFor and findBy queries": "Why use findBy queries or waitFor instead of waiting a fixed number of milliseconds?",
        "Running jest with --coverage and integrating into GitHub Actions": "What does --coverage report, and how would a GitHub Actions workflow stop a broken pull request?"
      },
      "criteria": {
        "Testing async components with waitFor and findBy queries": {
          "id": "async-tests",
          "evidence": [
            {
              "id": "findby",
              "text": "findBy queries return a promise that keeps retrying until the element appears or a timeout passes."
            },
            {
              "id": "waitfor",
              "text": "waitFor retries an assertion until it passes, for state that changes asynchronously."
            },
            {
              "id": "no-sleep",
              "text": "Fixed waits are either too short, causing random failures, or too long, slowing the suite."
            }
          ],
          "notEnough": [
            "Only saying await the test without explaining retrying queries."
          ],
          "misconceptions": []
        },
        "Running jest with --coverage and integrating into GitHub Actions": {
          "id": "coverage-ci",
          "evidence": [
            {
              "id": "coverage",
              "text": "jest --coverage reports which lines and branches the tests ran, showing untested code."
            },
            {
              "id": "ci-run",
              "text": "A GitHub Actions workflow runs the tests on every push or pull request."
            },
            {
              "id": "fail",
              "text": "A failing test, or coverage below a set threshold, fails the check so the pull request can't be merged."
            }
          ],
          "notEnough": [
            "Only saying run tests in CI without explaining what makes it fail."
          ],
          "misconceptions": [
            {
              "id": "coverage-correct",
              "text": "Says high test coverage proves the code is correct."
            }
          ]
        }
      }
    }
  ]
}
```

LAYER: mern-10
```json
{
  "groups": [
    {
      "title": "Docker containers and the image layer model",
      "question": "Your API's Docker image is 1 GB and rebuilds from scratch every time you change one line of code. Explain how Docker builds images and how you'd make the builds faster and the image smaller.",
      "followUps": {
        "How Docker images are built from layered filesystem snapshots": "Why does changing one line of code reinstall all npm packages, and how would you reorder the Dockerfile?",
        "Multi-stage builds for lean production images": "How does a multi-stage build shrink the final image, and what gets left behind?"
      },
      "criteria": {
        "How Docker images are built from layered filesystem snapshots": {
          "id": "image-layers",
          "evidence": [
            {
              "id": "layers",
              "text": "Each Dockerfile instruction creates a layer on top of the previous one."
            },
            {
              "id": "cache",
              "text": "Layers are cached, but changing one invalidates it and every layer after it."
            },
            {
              "id": "order",
              "text": "Copying package.json and installing dependencies before copying the source code lets the install layer stay cached when only code changes."
            }
          ],
          "notEnough": [
            "Only saying Docker uses layers without explaining caching."
          ],
          "misconceptions": []
        },
        "Multi-stage builds for lean production images": {
          "id": "multi-stage-builds",
          "evidence": [
            {
              "id": "build-stage",
              "text": "A build stage installs all dependencies and builds the app."
            },
            {
              "id": "run-stage",
              "text": "The final stage copies only the built output and production dependencies, leaving build tools and dev dependencies behind."
            }
          ],
          "notEnough": [
            "Only saying use multi-stage builds without saying what is copied."
          ],
          "misconceptions": []
        }
      }
    },
    {
      "title": "CI/CD pipeline concepts",
      "question": "Your team merges to main several times a day, and someone asks whether you do CI, CD or both. Explain the difference and what each one gives you.",
      "followUps": {
        "Continuous integration versus continuous deployment distinctions": "What's the difference between continuous integration and continuous deployment, and what does each one need to be safe?"
      },
      "criteria": {
        "Continuous integration versus continuous deployment distinctions": {
          "id": "ci-vs-cd",
          "evidence": [
            {
              "id": "ci",
              "text": "Continuous integration runs the build and tests automatically on every change, so problems are caught early and main stays working."
            },
            {
              "id": "cd",
              "text": "Continuous deployment goes further and automatically releases every change that passes."
            },
            {
              "id": "trust",
              "text": "Automatic deploys are only safe when the tests are trustworthy, because nothing else stops a bad change."
            }
          ],
          "notEnough": [
            "Only saying CI/CD automates things without separating the two."
          ],
          "misconceptions": [
            {
              "id": "ci-deploys",
              "text": "Says continuous integration means every commit is deployed to production."
            }
          ]
        }
      }
    },
    {
      "title": "Deploying MERN apps to cloud platforms",
      "question": "You're deploying your MERN app: the React frontend to Vercel and the Express API to Railway, with MongoDB on Atlas. Explain how each part is configured and where the environment variables live.",
      "followUps": {
        "Vercel deployment: project settings, env vars, and preview URLs": "What happens on Vercel when you push or open a pull request, and why must secrets never be in frontend env vars?",
        "Railway for deploying Express APIs with managed env vars": "How does your Express app on Railway know which port to listen on and how to reach Atlas?"
      },
      "criteria": {
        "Vercel deployment: project settings, env vars, and preview URLs": {
          "id": "vercel-deploy",
          "evidence": [
            {
              "id": "git-deploys",
              "text": "Vercel deploys on every push to the connected repo and creates a preview URL for each pull request."
            },
            {
              "id": "build-time-env",
              "text": "Frontend environment variables are set in the dashboard and baked into the bundle at build time, so changing one needs a redeploy."
            },
            {
              "id": "public",
              "text": "Anything in the frontend bundle is visible to users, so it must not contain secrets."
            }
          ],
          "notEnough": [
            "Only saying deploy to Vercel without explaining previews or environment variables."
          ],
          "misconceptions": []
        },
        "Railway for deploying Express APIs with managed env vars": {
          "id": "railway-api",
          "evidence": [
            {
              "id": "port",
              "text": "The platform sets a PORT environment variable, and the app must listen on process.env.PORT."
            },
            {
              "id": "env-vars",
              "text": "Secrets like the database connection string are set as environment variables in the platform, not in the code."
            },
            {
              "id": "atlas-access",
              "text": "Atlas must allow connections from the hosting platform, for example through its network access list."
            }
          ],
          "notEnough": [
            "Only saying deploy to Railway without explaining the port or the variables."
          ],
          "misconceptions": [
            {
              "id": "hardcode-port",
              "text": "Says the app should always listen on a fixed port like 3000 in production."
            }
          ]
        }
      }
    },
    {
      "title": "GitHub Actions workflow for a MERN project",
      "question": "You want every merge to main to run the tests and deploy your MERN app automatically, using API keys that must stay secret. Explain how you'd write the workflow and handle the secrets.",
      "followUps": {
        "Writing a workflow that tests and deploys on merge to main": "What triggers the workflow, what are the jobs and steps, and what stops a deploy when tests fail?",
        "Production environment variables and secret management": "Where are the secrets stored, how does the workflow use them, and what must you never do with them?"
      },
      "criteria": {
        "Writing a workflow that tests and deploys on merge to main": {
          "id": "workflow-yaml",
          "evidence": [
            {
              "id": "trigger",
              "text": "The workflow file defines a trigger, such as a push to main."
            },
            {
              "id": "jobs-steps",
              "text": "Jobs contain steps that check out the code, set up Node, install dependencies and run the tests."
            },
            {
              "id": "gate",
              "text": "The deploy job depends on the test job, so it only runs if the tests pass."
            }
          ],
          "notEnough": [
            "Only saying use GitHub Actions without describing the steps."
          ],
          "misconceptions": []
        },
        "Production environment variables and secret management": {
          "id": "secrets-management",
          "evidence": [
            {
              "id": "store",
              "text": "Secrets are stored in the repository's Actions secrets, not in the code or the workflow file."
            },
            {
              "id": "reference",
              "text": "The workflow reads them with the secrets context, for example passing them to steps as environment variables."
            },
            {
              "id": "never-print",
              "text": "They must never be printed in logs or committed; GitHub masks them in logs, but echoing them is still a risk."
            }
          ],
          "notEnough": [
            "Only saying keep secrets secret without saying where they live or how they're used."
          ],
          "misconceptions": []
        }
      }
    }
  ]
}
```

