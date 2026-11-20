LAYER: pern-1
```json
{
  "groups": [
    {
      "title": "How browsers render HTML, CSS, and JavaScript",
      "question": "A user opens your PERN app's homepage on a slow phone and sees a blank screen for two seconds. Walk through what the browser does with your HTML, CSS and scripts before anything appears, and how your markup choices affect people who use screen readers.",
      "followUps": {
        "The critical rendering path and render-blocking resources": "Why can a script tag in the head or a large stylesheet delay the first paint, and what would you change?",
        "Semantic HTML elements and the accessibility tree": "A screen reader user can't find the navigation on your site built only from divs. Why, and what would fix it?"
      },
      "criteria": {
        "The critical rendering path and render-blocking resources": {
          "id": "critical-rendering-path",
          "evidence": [
            {
              "id": "dom-cssom",
              "text": "The browser builds a DOM from the HTML and a CSSOM from the CSS, and combines them before it can lay out and paint the page."
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
        "Semantic HTML elements and the accessibility tree": {
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
      "title": "CSS layout: the box model, flexbox, and grid",
      "question": "You're building the dashboard page of your PERN app: a header, sidebar, main content and footer, with cards inside the main area. Explain how you'd lay it out, and why widths often come out wrong without one particular CSS setting.",
      "followUps": {
        "box-sizing: border-box and why it simplifies layout math": "You set a box to width 300px with 20px padding and a border, and it overflows its column. Why, and how does border-box change that?",
        "CSS Grid for two-dimensional page layouts": "Why would you use grid for the page skeleton but flexbox for a row of buttons inside a card?"
      },
      "criteria": {
        "box-sizing: border-box and why it simplifies layout math": {
          "id": "box-sizing",
          "evidence": [
            {
              "id": "content-box",
              "text": "By default the width covers only the content, so padding and border are added on top and the element ends up wider than the number you wrote."
            },
            {
              "id": "border-box",
              "text": "With border-box, padding and border are included in the width, so the element is exactly as wide as you set it."
            }
          ],
          "notEnough": [
            "Only saying use border-box or naming the box model parts without explaining how the width is calculated."
          ],
          "misconceptions": [
            {
              "id": "margin-included",
              "text": "Says border-box also includes the margin in the element's width."
            }
          ]
        },
        "CSS Grid for two-dimensional page layouts": {
          "id": "css-grid-layout",
          "evidence": [
            {
              "id": "two-dimensional",
              "text": "Grid controls rows and columns at the same time, which suits a whole-page layout."
            },
            {
              "id": "flex-inside",
              "text": "Flexbox lays items out along one direction, so it fits the components inside a grid area, like a row of buttons."
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
      "title": "JavaScript DOM manipulation and events",
      "question": "Without React, you need a dark mode button that switches the page's theme, and the page must stay readable from a phone to a wide monitor. Explain how you'd make the button work and how you'd make the layout adapt to the screen size.",
      "followUps": {
        "querySelector, textContent, and classList for DOM updates": "Why toggle a CSS class with classList instead of setting styles from JavaScript, and why textContent instead of innerHTML for user text?",
        "Responsive design with media queries and relative units": "Why use rem for font sizes and min-width media queries instead of fixed pixel sizes everywhere?"
      },
      "criteria": {
        "querySelector, textContent, and classList for DOM updates": {
          "id": "dom-updates",
          "evidence": [
            {
              "id": "select",
              "text": "You first find the element, for example with querySelector, and then change it through the DOM."
            },
            {
              "id": "classlist",
              "text": "Toggling a class with classList keeps the styling in CSS, and JavaScript only switches the state."
            },
            {
              "id": "textcontent",
              "text": "textContent sets plain text, so user-provided text is not parsed as HTML the way it is with innerHTML."
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
        "Responsive design with media queries and relative units": {
          "id": "responsive-units",
          "evidence": [
            {
              "id": "relative-units",
              "text": "Relative units like rem scale with the user's font settings, and percentages or vw and vh scale with the container or the screen."
            },
            {
              "id": "media-queries",
              "text": "Media queries apply different styles at breakpoints; with min-width you start from the small-screen layout and add rules as the screen grows."
            }
          ],
          "notEnough": [
            "Only saying use media queries or make it responsive without explaining how the styles change with the screen size."
          ],
          "misconceptions": []
        }
      }
    },
    {
      "title": "Browser DevTools for debugging HTML, CSS, and network",
      "question": "A button on your page has the wrong color, and the list under it loads slowly from your API. Walk through how you'd use the browser's DevTools to find the cause of both problems.",
      "followUps": {
        "Inspecting and live-editing styles in the Styles panel": "Two CSS rules set the button's color. How do you use DevTools to see which one wins, and why?",
        "Network tab: reading request/response headers and timing": "Your API call returns but the list is empty. What would you look at in the Network tab to find out why?"
      },
      "criteria": {
        "Inspecting and live-editing styles in the Styles panel": {
          "id": "devtools-styles",
          "evidence": [
            {
              "id": "cascade",
              "text": "The Styles panel shows every rule that matches the element, with overridden declarations crossed out, so you can see which rule wins the cascade."
            },
            {
              "id": "live-edit",
              "text": "You can toggle or edit declarations live to test a fix before changing the code, and the Computed panel shows the final value."
            }
          ],
          "notEnough": [
            "Only saying open DevTools and inspect without saying what you look at."
          ],
          "misconceptions": [
            {
              "id": "edits-persist",
              "text": "Says changes made in the Styles panel are still there after reloading the page."
            }
          ]
        },
        "Network tab: reading request/response headers and timing": {
          "id": "devtools-network",
          "evidence": [
            {
              "id": "status-headers",
              "text": "Each request shows its status code and its request and response headers, which tell you whether the API failed, refused the request or returned something unexpected."
            },
            {
              "id": "response",
              "text": "You can open the response body to see exactly what data came back."
            },
            {
              "id": "timing",
              "text": "The timing waterfall shows where a slow request spends its time, for example waiting for the server versus downloading."
            }
          ],
          "notEnough": [
            "Only saying check the Network tab without saying what to look at."
          ],
          "misconceptions": []
        }
      }
    }
  ]
}
```

LAYER: pern-2
```json
{
  "groups": [
    {
      "title": "TypeScript's type system under the hood",
      "question": "Your PERN app's API returns either a success object with data or an error object with a message, and you pass plain objects into functions typed with interfaces. Explain how TypeScript decides whether those objects fit the types, and how it knows which result shape you have inside an if statement.",
      "followUps": {
        "Structural typing: why TypeScript matches shapes, not names": "An object literal that was never declared as your User type is still accepted where a User is expected. Why does TypeScript allow that?",
        "Type narrowing with typeof, instanceof, and discriminated unions": "With a result typed as success or error, how does checking result.type let you safely read result.data?"
      },
      "criteria": {
        "Structural typing: why TypeScript matches shapes, not names": {
          "id": "structural-typing",
          "evidence": [
            {
              "id": "shape",
              "text": "TypeScript checks whether a value has the required properties with compatible types; the name it was declared with doesn't matter."
            },
            {
              "id": "vs-nominal",
              "text": "Two types with the same shape are interchangeable, unlike nominal languages such as Java, where the declared class has to match."
            }
          ],
          "notEnough": [
            "Only saying TypeScript uses structural typing without explaining what is compared."
          ],
          "misconceptions": [
            {
              "id": "runtime-check",
              "text": "Says TypeScript checks these types at runtime while the code runs."
            }
          ]
        },
        "Type narrowing with typeof, instanceof, and discriminated unions": {
          "id": "type-narrowing",
          "evidence": [
            {
              "id": "branch",
              "text": "Inside a check like typeof, instanceof or a comparison, TypeScript narrows the variable to the types that check allows."
            },
            {
              "id": "discriminant",
              "text": "A discriminated union shares a literal field, like type being 'success' or 'error', and checking it tells TypeScript exactly which shape you have."
            },
            {
              "id": "safe-access",
              "text": "After narrowing, properties that exist only on that shape, like data on success, can be used without errors."
            }
          ],
          "notEnough": [
            "Only naming typeof or discriminated unions without explaining how a check changes the type."
          ],
          "misconceptions": []
        }
      }
    },
    {
      "title": "The JavaScript event loop and async semantics",
      "question": "Your Express handler awaits a database query and then sends the response, while the server keeps handling other requests. Explain what await actually does here, and what happens if that query's promise rejects and nobody catches it.",
      "followUps": {
        "Promises, async/await, and the microtask queue": "In what order do a console.log after an await, a Promise.then callback and a setTimeout with 0 ms run, and why?"
      },
      "criteria": {
        "Promises, async/await, and the microtask queue": {
          "id": "async-await",
          "evidence": [
            {
              "id": "sugar",
              "text": "async and await are built on promises: an async function returns a promise, and await pauses only that function until the promise settles."
            },
            {
              "id": "non-blocking",
              "text": "While that function is paused, the event loop keeps running other code, so other requests are still served."
            },
            {
              "id": "microtasks",
              "text": "Promise callbacks and code after an await run as microtasks, which run before timer callbacks like setTimeout."
            }
          ],
          "notEnough": [
            "Only saying await waits for the promise without explaining that the rest of the program keeps running."
          ],
          "misconceptions": [
            {
              "id": "await-blocks",
              "text": "Says await blocks the whole server or thread until the promise finishes."
            }
          ]
        }
      }
    },
    {
      "title": "TypeScript syntax patterns in PERN projects",
      "question": "You're typing the frontend's API layer: a User object, a union for request status, and the same paginated response wrapper for posts, users and comments. Explain how you'd define these types and why.",
      "followUps": {
        "Interfaces versus type aliases: when to use each": "When would you choose a type alias over an interface, and what can an interface do that a type alias can't?",
        "Generics for reusable API response and pagination types": "How does a generic PaginatedResult of T save you from writing a separate type for every endpoint, without falling back to any?"
      },
      "criteria": {
        "Interfaces versus type aliases: when to use each": {
          "id": "interface-vs-type",
          "evidence": [
            {
              "id": "type-union",
              "text": "Type aliases can name any type, including unions, primitives and tuples, which interfaces cannot."
            },
            {
              "id": "interface-merge",
              "text": "Interfaces describe object shapes and can be extended or merged by declaring them again, which suits shared object types."
            }
          ],
          "notEnough": [
            "Only saying both define types or that it's personal preference, without naming a difference."
          ],
          "misconceptions": []
        },
        "Generics for reusable API response and pagination types": {
          "id": "generic-types",
          "evidence": [
            {
              "id": "parameter",
              "text": "A generic type takes a type parameter, like T in ApiResponse<T>, that is filled in where the type is used."
            },
            {
              "id": "reuse",
              "text": "One wrapper type then works for every endpoint while keeping the exact item type, instead of copying types or using any."
            }
          ],
          "notEnough": [
            "Only saying generics make code reusable without saying what the type parameter does."
          ],
          "misconceptions": [
            {
              "id": "generic-any",
              "text": "Says a generic type is the same as using any."
            }
          ]
        }
      }
    },
    {
      "title": "tsconfig and TypeScript tooling",
      "question": "You're setting up TypeScript for a new PERN backend, and you need a safe User type for API responses without the password, plus a type for partial updates. Explain the tsconfig settings you'd care about and how you'd build those two types from the existing User type.",
      "followUps": {
        "Key tsconfig options: strict, target, module, and paths": "What does turning on strict actually change, and why would you set paths for imports like @/components?",
        "Utility types: Partial, Required, Pick, Omit, and Record": "How would you create the update type and the safe user type from User without copying fields by hand?"
      },
      "criteria": {
        "Key tsconfig options: strict, target, module, and paths": {
          "id": "tsconfig-options",
          "evidence": [
            {
              "id": "strict",
              "text": "strict turns on the strict checks, including strictNullChecks, so null and undefined have to be handled explicitly."
            },
            {
              "id": "target-module",
              "text": "target sets which JavaScript version is emitted, and module sets the module system of the output."
            },
            {
              "id": "paths",
              "text": "paths maps import aliases like @/ to folders to avoid long relative imports, as long as the runtime or bundler is configured the same way."
            }
          ],
          "notEnough": [
            "Only listing option names without saying what any of them changes."
          ],
          "misconceptions": []
        },
        "Utility types: Partial, Required, Pick, Omit, and Record": {
          "id": "utility-types",
          "evidence": [
            {
              "id": "derive",
              "text": "Utility types build new types from an existing one, so changes to User flow into the derived types automatically."
            },
            {
              "id": "partial-omit",
              "text": "Partial<User> makes every field optional for updates, and Omit<User, 'password'> removes the password for a safe response type."
            }
          ],
          "notEnough": [
            "Only listing Partial, Pick and Omit without saying what any of them produces."
          ],
          "misconceptions": [
            {
              "id": "strips-runtime",
              "text": "Says Omit removes the password field from the actual object at runtime."
            }
          ]
        }
      }
    }
  ]
}
```

LAYER: pern-3
```json
{
  "groups": [
    {
      "title": "React's rendering model and reconciliation",
      "question": "In your PERN app, a parent component holds a list of posts and each child shows a like button. When a user clicks like, explain how the change travels through your components and how React updates the page without rebuilding all of it.",
      "followUps": {
        "How React diffs the virtual DOM to minimize real DOM changes": "When state changes and a component re-renders, why doesn't React replace the whole page in the real DOM?",
        "Unidirectional data flow and why it simplifies debugging": "How does the like button in the child change state that lives in the parent, and why is that easier to debug?"
      },
      "criteria": {
        "How React diffs the virtual DOM to minimize real DOM changes": {
          "id": "reconciliation",
          "evidence": [
            {
              "id": "new-tree",
              "text": "On each render React produces a new tree of elements and compares it with the previous one."
            },
            {
              "id": "minimal",
              "text": "It then applies only the differences to the real DOM, which is the slow part to touch."
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
        "Unidirectional data flow and why it simplifies debugging": {
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
      "title": "useState and useEffect internals",
      "question": "Your component has a counter, and it also opens a live-updates subscription when it mounts. A teammate reports that the counter sometimes uses an old value and the subscription keeps firing after leaving the page. Explain why both bugs happen and how you'd fix them.",
      "followUps": {
        "Why state updates are asynchronous and stale closures occur": "You call setCount(count + 1) twice in one click handler and the count only goes up by one. Why, and what's the fix?",
        "useEffect dependencies and the cleanup pattern": "What decides when your effect runs again, and what goes wrong if you don't return a cleanup function?"
      },
      "criteria": {
        "Why state updates are asynchronous and stale closures occur": {
          "id": "state-updates",
          "evidence": [
            {
              "id": "next-render",
              "text": "Calling the setter doesn't change the variable right away; the new value is only seen on the next render."
            },
            {
              "id": "stale-closure",
              "text": "Handlers and effects capture the value from the render they were created in, so they can use an old value."
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
        "useEffect dependencies and the cleanup pattern": {
          "id": "effect-cleanup",
          "evidence": [
            {
              "id": "dependencies",
              "text": "The effect runs after render and again whenever a value in its dependency array changes, and every value it uses should be listed."
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
              "id": "empty-array-never",
              "text": "Says an effect with an empty dependency array never runs."
            }
          ]
        }
      }
    },
    {
      "title": "JSX, props, and component composition",
      "question": "You're building a search page where a SearchBox and a ResultsList both need the current search text. Explain how you'd share that value between them, and what JSX actually turns into that explains its rules.",
      "followUps": {
        "JSX compiles to React.createElement — implications for JSX rules": "Why must a component return a single root element, and how do Fragments help?",
        "Lifting state up to the nearest common ancestor": "Where should the search text live so both components can use it, and how does each one get it?"
      },
      "criteria": {
        "JSX compiles to React.createElement — implications for JSX rules": {
          "id": "jsx-compiles",
          "evidence": [
            {
              "id": "function-calls",
              "text": "JSX is compiled into JavaScript function calls that create element objects, such as React.createElement or the newer JSX runtime."
            },
            {
              "id": "single-root",
              "text": "Because a component returns one value, JSX needs a single root, and a Fragment groups children without adding an extra DOM element."
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
        "Lifting state up to the nearest common ancestor": {
          "id": "lifting-state",
          "evidence": [
            {
              "id": "common-parent",
              "text": "Shared state moves up to the closest common parent of the components that need it."
            },
            {
              "id": "pass-down",
              "text": "The parent passes the value down as props and passes a setter function to the component that changes it."
            }
          ],
          "notEnough": [
            "Only saying lift state up without explaining where it goes and how the children use it."
          ],
          "misconceptions": []
        }
      }
    },
    {
      "title": "Fetching data from APIs in React",
      "question": "Your Posts page loads posts from your Express API and lets users reorder them. Explain how you'd fetch the data in a component, what the user sees while it loads or fails, and how React keeps the list correct when the order changes.",
      "followUps": {
        "Data fetching in useEffect: loading, data, and error states": "The user leaves the page before the fetch finishes. What can go wrong, and how do you prevent it?",
        "Rendering lists with key props derived from stable IDs": "Why is using the array index as the key a problem when the list can be reordered?"
      },
      "criteria": {
        "Data fetching in useEffect: loading, data, and error states": {
          "id": "fetch-in-effect",
          "evidence": [
            {
              "id": "effect",
              "text": "The request is started inside useEffect, not during render, so it doesn't run on every render."
            },
            {
              "id": "states",
              "text": "Loading, error and data are kept in state, so the component shows a spinner, an error message or the list."
            },
            {
              "id": "abort",
              "text": "The effect's cleanup aborts the request, for example with AbortController, so a component that is gone doesn't get updated."
            }
          ],
          "notEnough": [
            "Only saying fetch in useEffect without the loading and error states or the cleanup."
          ],
          "misconceptions": []
        },
        "Rendering lists with key props derived from stable IDs": {
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
    }
  ]
}
```

LAYER: pern-4
```json
{
  "groups": [
    {
      "title": "How React Router v6 renders nested route trees",
      "question": "Your dashboard has a shared sidebar layout with several pages inside it, and each page shows server data that should stay fresh without refetching on every visit. Explain how the routes render inside the layout and how the cached server data is kept up to date.",
      "followUps": {
        "Nested routes and the Outlet component for shared layouts": "How does the dashboard layout know where to render the current child page?",
        "TanStack Query cache model: staleTime, cacheTime, and invalidation": "After a user creates a post, how do you make the posts list show it, and what does staleTime control?"
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
        "TanStack Query cache model: staleTime, cacheTime, and invalidation": {
          "id": "query-cache",
          "evidence": [
            {
              "id": "stale-time",
              "text": "staleTime is how long cached data counts as fresh; while it's fresh, it is used without refetching."
            },
            {
              "id": "background-refetch",
              "text": "Once stale, the cached data is still shown but refetched in the background, for example on mount or when the window regains focus."
            },
            {
              "id": "invalidate",
              "text": "After a change, invalidating the matching query marks it stale and triggers a refetch, so the list shows the new item."
            }
          ],
          "notEnough": [
            "Only saying TanStack Query caches data without explaining when it refetches."
          ],
          "misconceptions": [
            {
              "id": "cachetime-fresh",
              "text": "Says cacheTime (gcTime) controls how long the data counts as fresh."
            }
          ]
        }
      }
    },
    {
      "title": "Zustand's subscription model versus React Context",
      "question": "Your app's global state (user, theme, cart) lives in one React Context, and typing in the search box makes the whole app feel slow. Explain why, how Zustand would behave differently, and whether wrapping things in useMemo and useCallback is the right fix.",
      "followUps": {
        "How Zustand avoids Context's re-render problem with selectors": "With Zustand, why doesn't a component that only reads the cart count re-render when the theme changes?",
        "useMemo and useCallback: when memoization helps versus hurts": "When does useMemo or useCallback actually help, and when does it just add cost?"
      },
      "criteria": {
        "How Zustand avoids Context's re-render problem with selectors": {
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
        },
        "useMemo and useCallback: when memoization helps versus hurts": {
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
              "id": "cost",
              "text": "Elsewhere they add comparison work and complexity for no gain, so they're added after measuring a real problem."
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
      "title": "React Router navigation APIs and protected routes",
      "question": "Your app has a post page at /posts/:id with filters in the URL like ?sort=new, and a settings page only logged-in users may open. Explain how the page reads the id and the filters, how you send users somewhere after an action, and how you keep logged-out users away from settings.",
      "followUps": {
        "useNavigate, useParams, and useSearchParams": "Why keep the sort filter in the URL with useSearchParams instead of in component state?",
        "Building protected routes with an auth-checking wrapper": "How would a protected route wrapper decide what to render, and where does it get the auth state from?"
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
        "Building protected routes with an auth-checking wrapper": {
          "id": "protected-routes",
          "evidence": [
            {
              "id": "check",
              "text": "A wrapper component reads the auth state and renders the protected page only for logged-in users."
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
    },
    {
      "title": "Custom hooks and code splitting",
      "question": "Three pages in your app repeat the same fetch-with-loading-and-error logic, and the first page load downloads the code for every page, including the admin area. Explain how you'd remove the duplication and make the first load smaller.",
      "followUps": {
        "Extracting shared logic into custom hooks": "What makes a function a custom hook, and does sharing a hook share the state between components?",
        "React.lazy and Suspense for route-level code splitting": "How do React.lazy and Suspense change when the admin page's code is downloaded, and what does the user see meanwhile?"
      },
      "criteria": {
        "Extracting shared logic into custom hooks": {
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
        "React.lazy and Suspense for route-level code splitting": {
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
    }
  ]
}
```

LAYER: pern-5
```json
{
  "groups": [
    {
      "title": "The Node.js event loop and non-blocking I/O model",
      "question": "Your Express API runs as a single Node process and serves hundreds of users at once, and every request passes through logging, auth and body parsing before reaching its handler. Explain how one thread can serve so many requests, and how a request moves through those steps.",
      "followUps": {
        "How libuv delegates I/O so Node can handle concurrent connections": "What would happen to all users if one handler ran a heavy synchronous loop for five seconds, and why?",
        "Express middleware chain: how next() passes control": "What happens if a middleware neither calls next() nor sends a response, and what does next(err) do?"
      },
      "criteria": {
        "How libuv delegates I/O so Node can handle concurrent connections": {
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
        "Express middleware chain: how next() passes control": {
          "id": "middleware-next",
          "evidence": [
            {
              "id": "order",
              "text": "Middleware runs in the order it is registered, and each one receives req, res and next."
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
        }
      }
    },
    {
      "title": "RESTful API design principles",
      "question": "You're designing the blog posts API of your PERN app: listing, reading one, creating, editing and deleting. Explain how you'd name the URLs, which HTTP methods you'd use and which status codes each outcome returns.",
      "followUps": {
        "Resource-based URLs and correct HTTP verb semantics": "Why /posts/42 with GET and DELETE instead of /getPost and /deletePost, and what's the difference between PUT and PATCH?",
        "HTTP status codes: 2xx success, 4xx client error, 5xx server error": "What should the API return when the user isn't logged in, versus logged in but not allowed to edit this post?"
      },
      "criteria": {
        "Resource-based URLs and correct HTTP verb semantics": {
          "id": "rest-resources",
          "evidence": [
            {
              "id": "nouns",
              "text": "URLs name resources, like /posts and /posts/42, and the HTTP method says what to do with them."
            },
            {
              "id": "verbs",
              "text": "GET reads, POST creates, PUT replaces, PATCH changes part of a resource, and DELETE removes it."
            },
            {
              "id": "predictable",
              "text": "Using the methods correctly lets clients and caches rely on their behavior, for example GET being safe to repeat."
            }
          ],
          "notEnough": [
            "Only listing the HTTP methods without explaining how URLs and methods divide the work."
          ],
          "misconceptions": [
            {
              "id": "put-patch-same",
              "text": "Says PUT and PATCH do the same thing."
            }
          ]
        },
        "HTTP status codes: 2xx success, 4xx client error, 5xx server error": {
          "id": "status-codes",
          "evidence": [
            {
              "id": "classes",
              "text": "2xx means success, 4xx means the client sent something wrong, and 5xx means the server failed."
            },
            {
              "id": "specific",
              "text": "Specific codes tell the client what happened, like 201 after creating, 204 with no body, and 400 or 422 for invalid input."
            },
            {
              "id": "401-403",
              "text": "401 means the client is not authenticated, while 403 means it is authenticated but not allowed."
            }
          ],
          "notEnough": [
            "Only listing code numbers without saying what they mean."
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
      "title": "Structuring an Express application for a PERN project",
      "question": "Your Express app started as one big index.js with every route in it, and it crashes later at runtime when an environment variable is missing. Explain how you'd reorganize the code and how you'd handle configuration.",
      "followUps": {
        "Router modules and controller separation by resource": "Why split routes into one router per resource and move the logic into controllers, and what does each part do?",
        "Environment configuration with dotenv and config validation": "Why validate environment variables at startup instead of reading them when they're needed?"
      },
      "criteria": {
        "Router modules and controller separation by resource": {
          "id": "router-controllers",
          "evidence": [
            {
              "id": "router",
              "text": "express.Router creates a separate router per resource, mounted on a prefix like /posts or /users."
            },
            {
              "id": "thin-routes",
              "text": "Route files only map paths to handlers, while controllers or services hold the logic, so each part is easier to find and test."
            }
          ],
          "notEnough": [
            "Only saying split it into files without explaining what goes where."
          ],
          "misconceptions": []
        },
        "Environment configuration with dotenv and config validation": {
          "id": "env-config",
          "evidence": [
            {
              "id": "dotenv",
              "text": "dotenv loads variables from a .env file into process.env before the rest of the app reads them."
            },
            {
              "id": "fail-fast",
              "text": "Validating the required variables at startup with a schema stops the app right away with a clear error instead of failing later."
            },
            {
              "id": "secrets",
              "text": "The .env file holds secrets, so it stays out of git."
            }
          ],
          "notEnough": [
            "Only saying use dotenv without explaining validation or why it matters."
          ],
          "misconceptions": []
        }
      }
    },
    {
      "title": "Input validation and centralized error handling",
      "question": "A user sends a signup request with an invalid email, and somewhere else a database error crashes a handler and returns an HTML stack trace. Explain how you'd validate input and handle errors so every failure returns a consistent JSON response.",
      "followUps": {
        "Request body validation with express-validator": "Where do the validation rules run, and what should the handler do when they fail?",
        "Four-argument error middleware registered last in app.use()": "What makes Express treat a middleware as an error handler, and why does it have to be registered last?"
      },
      "criteria": {
        "Request body validation with express-validator": {
          "id": "request-validation",
          "evidence": [
            {
              "id": "rules-on-route",
              "text": "Validation rules are attached to the route and check the request body before the handler logic runs."
            },
            {
              "id": "reject",
              "text": "When the input is invalid, the handler returns 400 or 422 with the errors and doesn't touch the database."
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
        "Four-argument error middleware registered last in app.use()": {
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

LAYER: pern-6
```json
{
  "groups": [
    {
      "title": "How relational databases model data",
      "question": "You're designing the tables for users, posts and comments in your PERN app. Explain how you'd split the data into tables, how they're linked, and what stops a comment from pointing to a post that doesn't exist.",
      "followUps": {
        "Normalization: eliminating redundancy across 1NF, 2NF, 3NF": "Why not just store the author's name and email on every post row?",
        "Primary keys, foreign keys, and referential integrity": "What happens if you insert a comment with a post_id that doesn't exist, and why is that useful?"
      },
      "criteria": {
        "Normalization: eliminating redundancy across 1NF, 2NF, 3NF": {
          "id": "normalization",
          "evidence": [
            {
              "id": "no-duplicates",
              "text": "Normalization splits data so each fact is stored once, for example the author's details only in the users table."
            },
            {
              "id": "anomalies",
              "text": "Duplicated data gets out of sync, because an update has to change every copy."
            },
            {
              "id": "tradeoff",
              "text": "Going too far adds many joins, so some duplication is sometimes accepted for faster reads."
            }
          ],
          "notEnough": [
            "Only listing 1NF, 2NF and 3NF without explaining what problem they solve."
          ],
          "misconceptions": []
        },
        "Primary keys, foreign keys, and referential integrity": {
          "id": "keys-integrity",
          "evidence": [
            {
              "id": "primary",
              "text": "A primary key uniquely identifies each row."
            },
            {
              "id": "foreign",
              "text": "A foreign key column must hold a value that exists in the referenced table's key, or NULL."
            },
            {
              "id": "enforced",
              "text": "The database rejects inserts and deletes that would break that link."
            }
          ],
          "notEnough": [
            "Only defining primary and foreign keys without saying what the database enforces."
          ],
          "misconceptions": []
        }
      }
    },
    {
      "title": "SQL query execution model",
      "question": "You need a report of each user's name and how many posts they've written, including users with zero posts, showing only users with more than five. Explain how you'd write it and how the database combines and groups the rows.",
      "followUps": {
        "How the query planner executes JOIN operations": "Why does an INNER JOIN drop users who have no posts, and which join keeps them?",
        "GROUP BY with aggregate functions: COUNT, SUM, AVG": "Why can't you filter on COUNT(*) in WHERE, and where does that condition go?"
      },
      "criteria": {
        "How the query planner executes JOIN operations": {
          "id": "joins",
          "evidence": [
            {
              "id": "inner",
              "text": "An INNER JOIN keeps only rows that have a match in both tables."
            },
            {
              "id": "left",
              "text": "A LEFT JOIN keeps every row from the left table and fills the right side with NULLs where there's no match."
            }
          ],
          "notEnough": [
            "Only naming join types without saying which rows each one returns."
          ],
          "misconceptions": []
        },
        "GROUP BY with aggregate functions: COUNT, SUM, AVG": {
          "id": "group-by",
          "evidence": [
            {
              "id": "groups",
              "text": "GROUP BY collapses rows with the same value into one row per group."
            },
            {
              "id": "aggregates",
              "text": "Aggregate functions like COUNT and SUM compute one value per group."
            },
            {
              "id": "having",
              "text": "WHERE filters rows before grouping, and HAVING filters groups after aggregation."
            }
          ],
          "notEnough": [
            "Only saying GROUP BY groups data without explaining aggregates or HAVING."
          ],
          "misconceptions": [
            {
              "id": "count-null",
              "text": "Says COUNT(column) also counts rows where that column is NULL."
            }
          ]
        }
      }
    },
    {
      "title": "Writing SQL queries from scratch",
      "question": "On your blog's admin page you need the ten newest published posts, page by page, and an action that deletes all of one user's draft posts. Explain the queries you'd write and what could go badly wrong with the delete.",
      "followUps": {
        "SELECT, WHERE, ORDER BY, LIMIT: the core query structure": "In what order does the database logically process FROM, WHERE, SELECT and ORDER BY, and why does it matter?",
        "INSERT, UPDATE, DELETE with WHERE clauses": "What happens if you run that DELETE without a WHERE clause, and how would you protect yourself?"
      },
      "criteria": {
        "SELECT, WHERE, ORDER BY, LIMIT: the core query structure": {
          "id": "select-structure",
          "evidence": [
            {
              "id": "clauses",
              "text": "SELECT picks the columns, WHERE filters rows, ORDER BY sorts, and LIMIT with OFFSET returns one page."
            },
            {
              "id": "logical-order",
              "text": "FROM and WHERE are processed before SELECT and ORDER BY, so for example an alias from SELECT can't be used in WHERE."
            }
          ],
          "notEnough": [
            "Only listing the keywords without saying what each one does."
          ],
          "misconceptions": []
        },
        "INSERT, UPDATE, DELETE with WHERE clauses": {
          "id": "write-queries",
          "evidence": [
            {
              "id": "where-scope",
              "text": "The WHERE clause decides which rows an UPDATE or DELETE touches; without it every row in the table is changed or deleted."
            },
            {
              "id": "transaction",
              "text": "Running risky changes inside a transaction lets you check the result and roll back."
            }
          ],
          "notEnough": [
            "Only saying be careful with DELETE without explaining what the WHERE clause does."
          ],
          "misconceptions": []
        }
      }
    },
    {
      "title": "Designing the blog schema for the PERN challenge",
      "question": "Your blog posts can have many tags, and each tag can be on many posts. Explain how you'd store that in PostgreSQL, and how you'd check your tables from the command line while building it.",
      "followUps": {
        "Junction tables for many-to-many: posts_tags example": "Why not store the tags as a comma-separated text column on posts?",
        "psql CLI basics: connecting, listing tables, and running queries": "Which psql commands would you use to connect to your database, list its tables and see a table's columns?"
      },
      "criteria": {
        "Junction tables for many-to-many: posts_tags example": {
          "id": "junction-table",
          "evidence": [
            {
              "id": "junction",
              "text": "A posts_tags table holds one row per post and tag pair, with foreign keys to both posts and tags."
            },
            {
              "id": "why-not-csv",
              "text": "Comma-separated ids can't be enforced with foreign keys, indexed well or joined cleanly."
            }
          ],
          "notEnough": [
            "Only saying use a junction table without explaining what its rows contain."
          ],
          "misconceptions": []
        },
        "psql CLI basics: connecting, listing tables, and running queries": {
          "id": "psql-basics",
          "evidence": [
            {
              "id": "connect",
              "text": "psql connects to a database from the terminal, and \\c switches to another database."
            },
            {
              "id": "inspect",
              "text": "\\dt lists the tables and \\d with a table name shows its columns and constraints, and SQL can be run directly."
            }
          ],
          "notEnough": [
            "Only saying use psql without saying what you'd do with it."
          ],
          "misconceptions": []
        }
      }
    }
  ]
}
```

LAYER: pern-7
```json
{
  "groups": [
    {
      "title": "PostgreSQL internals: indexes and the query planner",
      "question": "Your posts query that filters by author and sorts by date has become slow as the table grew to millions of rows. Explain how you'd find out why, and how an index would change the way PostgreSQL runs it.",
      "followUps": {
        "How B-tree indexes speed up equality and range queries": "How does a B-tree index find rows faster than scanning the table, and what does it cost you?",
        "EXPLAIN ANALYZE: reading cost estimates and actual timings": "What's the difference between EXPLAIN and EXPLAIN ANALYZE, and what in the output tells you an index is missing?"
      },
      "criteria": {
        "How B-tree indexes speed up equality and range queries": {
          "id": "btree-index",
          "evidence": [
            {
              "id": "sorted-tree",
              "text": "A B-tree index keeps column values in a sorted tree, so equality and range lookups take a few steps instead of reading every row."
            },
            {
              "id": "cost",
              "text": "Indexes take space and slow down inserts and updates, because every index has to be updated too."
            }
          ],
          "notEnough": [
            "Only saying indexes make queries faster without explaining how."
          ],
          "misconceptions": [
            {
              "id": "index-everything",
              "text": "Says adding an index on every column has no downside."
            }
          ]
        },
        "EXPLAIN ANALYZE: reading cost estimates and actual timings": {
          "id": "explain-analyze",
          "evidence": [
            {
              "id": "plan",
              "text": "EXPLAIN shows the plan the planner chose, with estimated costs, without running the query."
            },
            {
              "id": "analyze",
              "text": "EXPLAIN ANALYZE runs the query and shows the actual row counts and times next to the estimates."
            },
            {
              "id": "seq-scan",
              "text": "A sequential scan over a large table for a selective filter is a sign that an index is missing."
            }
          ],
          "notEnough": [
            "Only saying use EXPLAIN without saying what you look for."
          ],
          "misconceptions": []
        }
      }
    },
    {
      "title": "ACID transactions and isolation levels",
      "question": "When a user places an order, you insert the order and its items and reduce the stock, and each product also has flexible attributes like size or color that differ by category. Explain how you'd keep the order data consistent if something fails halfway, and how you'd store those attributes.",
      "followUps": {
        "ACID properties: why atomicity and isolation matter for data integrity": "If the stock update fails after the order row is inserted, what happens inside a transaction, and what does isolation protect you from?",
        "JSONB columns for flexible semi-structured data": "Why use a JSONB column for product attributes instead of a column for each one, and when would that be a bad idea?"
      },
      "criteria": {
        "ACID properties: why atomicity and isolation matter for data integrity": {
          "id": "acid-transactions",
          "evidence": [
            {
              "id": "atomic",
              "text": "Inside a transaction all statements succeed together or are all rolled back, so no half-finished order is left behind."
            },
            {
              "id": "isolation",
              "text": "Isolation controls what concurrent transactions see of each other's unfinished changes, preventing problems like two orders taking the same stock."
            }
          ],
          "notEnough": [
            "Only spelling out what A, C, I and D stand for without explaining them."
          ],
          "misconceptions": [
            {
              "id": "autocommit-safe",
              "text": "Says separate queries without a transaction are rolled back automatically when a later one fails."
            }
          ]
        },
        "JSONB columns for flexible semi-structured data": {
          "id": "jsonb",
          "evidence": [
            {
              "id": "flexible",
              "text": "JSONB stores structured JSON in one column, so each row can have different attributes without schema changes."
            },
            {
              "id": "queryable",
              "text": "It is stored in a binary form that can be queried and indexed, for example with a GIN index."
            },
            {
              "id": "limits",
              "text": "Data you filter, join or constrain on all the time is better as regular columns."
            }
          ],
          "notEnough": [
            "Only saying JSONB stores JSON without explaining when to use it."
          ],
          "misconceptions": []
        }
      }
    },
    {
      "title": "PostgreSQL administration with psql",
      "question": "Your app connects to PostgreSQL as the superuser, and several endpoints repeat the same long join between posts, users and tags. Explain how you'd set up a safer database user for the app, and how you'd stop repeating that query logic.",
      "followUps": {
        "Creating roles, databases, and granting privileges": "Why should the app's database role have only the privileges it needs, and what could go wrong otherwise?",
        "Views and CTEs for reusable query logic": "What's the difference between a view and a CTE, and when would you use each?"
      },
      "criteria": {
        "Creating roles, databases, and granting privileges": {
          "id": "roles-privileges",
          "evidence": [
            {
              "id": "role",
              "text": "You create a separate login role for the app and grant it only the privileges it needs on specific databases, schemas and tables."
            },
            {
              "id": "least-privilege",
              "text": "If the app is compromised, the attacker is limited to those privileges instead of controlling the whole database."
            }
          ],
          "notEnough": [
            "Only saying create a user without explaining least privilege."
          ],
          "misconceptions": []
        },
        "Views and CTEs for reusable query logic": {
          "id": "views-ctes",
          "evidence": [
            {
              "id": "view",
              "text": "A view stores a named query in the database that can be selected from like a table and reused across queries."
            },
            {
              "id": "cte",
              "text": "A CTE, written with WITH, names a subquery for one statement only and makes that query easier to read."
            }
          ],
          "notEnough": [
            "Only saying both simplify queries without saying how they differ."
          ],
          "misconceptions": [
            {
              "id": "view-copies",
              "text": "Says a regular view stores its own copy of the data."
            }
          ]
        }
      }
    },
    {
      "title": "Window functions and query tuning",
      "question": "You need each user's most recent post and the time gap between their consecutive posts, and the posts query filters by user_id and status. Explain how you'd write those queries and which index you'd add.",
      "followUps": {
        "Window functions: ROW_NUMBER, RANK, and LAG over partitions": "How is ROW_NUMBER() OVER (PARTITION BY ...) different from GROUP BY?",
        "Index selection: composite versus partial indexes": "With an index on (user_id, status), which filters can use it, and when would a partial index be better?"
      },
      "criteria": {
        "Window functions: ROW_NUMBER, RANK, and LAG over partitions": {
          "id": "window-functions",
          "evidence": [
            {
              "id": "keep-rows",
              "text": "A window function computes a value over related rows while keeping every row, unlike GROUP BY, which collapses them."
            },
            {
              "id": "partition",
              "text": "PARTITION BY splits the rows into groups and ORDER BY orders them inside each group, so ROW_NUMBER can pick each user's latest post."
            },
            {
              "id": "lag",
              "text": "LAG reads a value from the previous row in that order, such as the previous post's date."
            }
          ],
          "notEnough": [
            "Only naming ROW_NUMBER, RANK or LAG without explaining what they compute."
          ],
          "misconceptions": []
        },
        "Index selection: composite versus partial indexes": {
          "id": "index-selection",
          "evidence": [
            {
              "id": "leftmost",
              "text": "A composite index on (a, b) helps queries that filter on a, or on a and b, but not on b alone."
            },
            {
              "id": "partial",
              "text": "A partial index covers only rows that match a condition, like status = 'published', so it is smaller and faster for queries with that condition."
            }
          ],
          "notEnough": [
            "Only saying add an index without explaining which queries it serves."
          ],
          "misconceptions": []
        }
      }
    }
  ]
}
```

LAYER: pern-8
```json
{
  "groups": [
    {
      "title": "How Prisma generates type-safe queries from your schema",
      "question": "Your PERN backend uses Prisma for data access and runs on a server handling many requests at once. Explain how Prisma knows your types and your database structure, and why opening a new database connection for every request would hurt.",
      "followUps": {
        "Prisma schema as the single source of truth for types and migrations": "You add a field to a model in schema.prisma. What do you get from Prisma, and what do you no longer write by hand?",
        "Connection pooling with node-postgres and why it matters": "What does a connection pool do, and what happens when all its connections are busy?"
      },
      "criteria": {
        "Prisma schema as the single source of truth for types and migrations": {
          "id": "prisma-schema",
          "evidence": [
            {
              "id": "single-source",
              "text": "schema.prisma describes the models once, and Prisma generates both the typed client and the migrations from it."
            },
            {
              "id": "typed-client",
              "text": "The generated client knows every model and field, so a wrong field name is caught while writing code."
            },
            {
              "id": "migration",
              "text": "Changing the schema produces a migration with the SQL needed to update the database."
            }
          ],
          "notEnough": [
            "Only saying Prisma is type-safe without explaining where the types come from."
          ],
          "misconceptions": []
        },
        "Connection pooling with node-postgres and why it matters": {
          "id": "connection-pooling",
          "evidence": [
            {
              "id": "expensive",
              "text": "Opening a database connection is slow, and the database allows only a limited number of them."
            },
            {
              "id": "reuse",
              "text": "A pool keeps a set of open connections, lends one to each query and takes it back afterwards."
            },
            {
              "id": "queue",
              "text": "When all connections are in use, new queries wait in a queue until one is free."
            }
          ],
          "notEnough": [
            "Only saying pooling is faster without explaining what is reused."
          ],
          "misconceptions": []
        }
      }
    },
    {
      "title": "SQL injection and parameterized queries",
      "question": "A search endpoint builds its SQL by inserting the user's search text straight into the query string. Explain what an attacker could do with that, and how you'd fix it in a PERN app.",
      "followUps": {
        "Why string interpolation in SQL is a critical security vulnerability": "Why does sending the value as a parameter like $1 stop the attack, even if the text contains quotes or SQL?"
      },
      "criteria": {
        "Why string interpolation in SQL is a critical security vulnerability": {
          "id": "sql-injection",
          "evidence": [
            {
              "id": "injection",
              "text": "If user input is pasted into the SQL text, crafted input can change the query itself, for example to read or delete other data."
            },
            {
              "id": "parameters",
              "text": "Parameterized queries send the SQL and the values separately, so values are always treated as data, never as SQL."
            },
            {
              "id": "orm",
              "text": "Prisma's query methods and pg placeholders like $1 do this for you, while building raw SQL strings by hand brings the risk back."
            }
          ],
          "notEnough": [
            "Only saying use parameterized queries without explaining why they're safe."
          ],
          "misconceptions": [
            {
              "id": "escape-enough",
              "text": "Says removing quote characters from the input is enough to prevent SQL injection."
            }
          ]
        }
      }
    },
    {
      "title": "Using Prisma in a Node/Express project",
      "question": "In your blog API you need to list published posts newest first, and to create a post together with its tags in one request. Explain how you'd do both with Prisma, and what happens if creating one of the tags fails.",
      "followUps": {
        "Prisma CRUD: findMany, create, update, delete with filters": "How do where and orderBy in findMany turn into SQL, and what does Prisma check for you there?",
        "Nested writes: creating related records in one operation": "Why is a nested write safer than creating the post and then the tags in separate calls?"
      },
      "criteria": {
        "Prisma CRUD: findMany, create, update, delete with filters": {
          "id": "prisma-crud",
          "evidence": [
            {
              "id": "methods",
              "text": "Model methods like findMany, create, update and delete take objects like where and orderBy that Prisma turns into SQL."
            },
            {
              "id": "typed",
              "text": "Field names and filter options are checked against the schema, so mistakes are caught while writing code."
            }
          ],
          "notEnough": [
            "Only listing method names without explaining how filtering works."
          ],
          "misconceptions": []
        },
        "Nested writes: creating related records in one operation": {
          "id": "nested-writes",
          "evidence": [
            {
              "id": "one-call",
              "text": "A nested write creates the post and its related records in one Prisma call."
            },
            {
              "id": "transaction",
              "text": "It runs as one transaction, so if any part fails nothing is saved."
            }
          ],
          "notEnough": [
            "Only saying you can create related records without saying what happens on failure."
          ],
          "misconceptions": []
        }
      }
    },
    {
      "title": "Migrations and seeding in a PERN project",
      "question": "You changed your Prisma schema locally, and the change needs to reach your teammates' machines and production, plus you want sample data for development. Explain the steps and commands you'd use in each environment.",
      "followUps": {
        "prisma migrate dev versus prisma migrate deploy": "Why use migrate dev locally but migrate deploy in production?",
        "Seeding the database with prisma/seed.ts": "Why use upsert in a seed script instead of create?"
      },
      "criteria": {
        "prisma migrate dev versus prisma migrate deploy": {
          "id": "migrate-dev-deploy",
          "evidence": [
            {
              "id": "dev",
              "text": "migrate dev creates a new migration from the schema changes, applies it to the local database and regenerates the client."
            },
            {
              "id": "deploy",
              "text": "migrate deploy only applies existing, committed migrations, which is what production needs."
            },
            {
              "id": "committed",
              "text": "Migration files are committed to git, so every environment applies the same changes in the same order."
            }
          ],
          "notEnough": [
            "Only naming the two commands without explaining the difference."
          ],
          "misconceptions": [
            {
              "id": "dev-in-prod",
              "text": "Says migrate dev is fine to run against the production database."
            }
          ]
        },
        "Seeding the database with prisma/seed.ts": {
          "id": "seeding",
          "evidence": [
            {
              "id": "script",
              "text": "A seed script, run with prisma db seed, fills the database with development data."
            },
            {
              "id": "idempotent",
              "text": "Using upsert lets the seed run many times without creating duplicates or failing."
            }
          ],
          "notEnough": [
            "Only saying seed the database without saying how, or why upsert."
          ],
          "misconceptions": []
        }
      }
    }
  ]
}
```

LAYER: pern-9
```json
{
  "groups": [
    {
      "title": "Password hashing and JWT security internals",
      "question": "Your PERN app stores user passwords and gives logged-in users a JWT. Explain how passwords should be stored so a stolen database doesn't reveal them, and what a JWT contains and protects.",
      "followUps": {
        "bcrypt's adaptive work factor and per-password salting": "Why does bcrypt use a salt and a cost factor, and why not just hash the password with SHA-256?",
        "JWT structure: header.payload.signature and what to put in each": "Anyone can decode a JWT's payload. So what does the signature protect, and what must never go in the payload?"
      },
      "criteria": {
        "bcrypt's adaptive work factor and per-password salting": {
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
        "JWT structure: header.payload.signature and what to put in each": {
          "id": "jwt-structure",
          "evidence": [
            {
              "id": "parts",
              "text": "A JWT has a header, a payload of claims and a signature, each base64url-encoded."
            },
            {
              "id": "not-secret",
              "text": "The payload is only encoded, not encrypted, so anyone can read it; passwords and secrets never go there."
            },
            {
              "id": "signature",
              "text": "The signature, made with the server's secret, lets the server detect any change to the header or the payload."
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
      "title": "Web security: XSS, CSRF, and secure cookies",
      "question": "Your app needs to store the auth token in the browser, and a comment field might let an attacker inject a script into other users' pages. Explain where you'd keep the token so that script can't steal it, and how you'd make sure only valid data reaches your API.",
      "followUps": {
        "HTTP-only cookies prevent XSS from stealing auth tokens": "How does an HTTP-only cookie stop an injected script from taking the token, and what do Secure and SameSite add?",
        "Zod schema validation: parsing untrusted input at the boundary": "Why validate with a schema on the server even if the React form already checks the input?"
      },
      "criteria": {
        "HTTP-only cookies prevent XSS from stealing auth tokens": {
          "id": "httponly-cookies",
          "evidence": [
            {
              "id": "httponly",
              "text": "JavaScript can't read an HTTP-only cookie, so an injected script can't steal a token kept there, unlike one in localStorage."
            },
            {
              "id": "secure-samesite",
              "text": "Secure sends the cookie only over HTTPS, and SameSite limits sending it on cross-site requests, which helps against CSRF."
            }
          ],
          "notEnough": [
            "Only saying use HTTP-only cookies without explaining what they block."
          ],
          "misconceptions": [
            {
              "id": "stops-xss",
              "text": "Says HTTP-only cookies stop XSS attacks from happening at all."
            }
          ]
        },
        "Zod schema validation: parsing untrusted input at the boundary": {
          "id": "schema-validation",
          "evidence": [
            {
              "id": "boundary",
              "text": "All input from outside is untrusted, so it is parsed against a schema on the server before it is used."
            },
            {
              "id": "parse",
              "text": "Invalid input is rejected with a clear error, and valid input comes out with the expected shape and types."
            },
            {
              "id": "shared",
              "text": "The same schema can be shared by the frontend and the backend, so the rules live in one place."
            }
          ],
          "notEnough": [
            "Only saying validate with Zod without explaining why on the server."
          ],
          "misconceptions": []
        }
      }
    },
    {
      "title": "Implementing JWT auth in a PERN Express API",
      "question": "Users log in to your Express API and then call protected endpoints like creating a post. Explain how the server issues tokens at login, how long they last, and how each protected request is checked.",
      "followUps": {
        "Signing JWTs with jsonwebtoken and setting expiry": "Why keep the access token short-lived, and how does a refresh token keep the user logged in?",
        "Auth middleware: verify Bearer token and attach user to req": "Walk through what the auth middleware does with the Authorization header, and what happens if the token has expired."
      },
      "criteria": {
        "Signing JWTs with jsonwebtoken and setting expiry": {
          "id": "jwt-signing",
          "evidence": [
            {
              "id": "sign",
              "text": "At login the server signs a token with a secret, containing claims like the user id and role, plus an expiry."
            },
            {
              "id": "short-lived",
              "text": "A short expiry limits how long a stolen access token can be used."
            },
            {
              "id": "refresh",
              "text": "A longer-lived refresh token, kept in an HTTP-only cookie, is used to get new access tokens."
            }
          ],
          "notEnough": [
            "Only saying sign a token with jsonwebtoken without explaining expiry or refresh."
          ],
          "misconceptions": []
        },
        "Auth middleware: verify Bearer token and attach user to req": {
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
              "text": "On success it attaches the decoded user to req, so the handlers know who is calling."
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
      "title": "Security hardening with Zod, Helmet, and rate limiting",
      "question": "Before launching your PERN app, you want to harden the API against common browser attacks, and against attackers guessing passwords on the login endpoint. Explain what you'd add and why.",
      "followUps": {
        "helmet middleware for secure HTTP response headers": "What do the headers that helmet sets protect against, for example X-Frame-Options or Content-Security-Policy?",
        "express-rate-limit to prevent brute-force on auth endpoints": "Why put a strict rate limit on /login specifically, and what should the client get when it's exceeded?"
      },
      "criteria": {
        "helmet middleware for secure HTTP response headers": {
          "id": "helmet-headers",
          "evidence": [
            {
              "id": "headers",
              "text": "helmet sets security-related HTTP response headers on every response."
            },
            {
              "id": "examples",
              "text": "They tell the browser to block things like showing your page in a frame (clickjacking), guessing content types, or running scripts from untrusted sources."
            }
          ],
          "notEnough": [
            "Only saying use helmet for security without saying what the headers do."
          ],
          "misconceptions": []
        },
        "express-rate-limit to prevent brute-force on auth endpoints": {
          "id": "rate-limiting",
          "evidence": [
            {
              "id": "limit",
              "text": "Rate limiting caps how many requests one client can make in a time window."
            },
            {
              "id": "brute-force",
              "text": "On login and register, it stops attackers from trying many passwords quickly."
            },
            {
              "id": "status-429",
              "text": "Over the limit, the server answers 429 Too Many Requests, ideally saying when to retry."
            }
          ],
          "notEnough": [
            "Only saying add rate limiting without explaining what it stops."
          ],
          "misconceptions": []
        }
      }
    }
  ]
}
```

LAYER: pern-10
```json
{
  "groups": [
    {
      "title": "Testing strategy for a full-stack PERN application",
      "question": "Your PERN app has no tests yet, and you want confidence before each deploy without a slow, flaky suite. Explain which kinds of tests you'd write, how many of each, and how every developer would run them against the same database setup.",
      "followUps": {
        "Testing pyramid: unit tests fast, integration tests real, E2E minimal": "Why have many unit tests, fewer integration tests and only a few end-to-end tests?",
        "Docker Compose for reproducible test environments": "How does Docker Compose make the integration tests behave the same on every machine?"
      },
      "criteria": {
        "Testing pyramid: unit tests fast, integration tests real, E2E minimal": {
          "id": "testing-pyramid",
          "evidence": [
            {
              "id": "levels",
              "text": "Unit tests check small pieces alone, integration tests check pieces together with real dependencies like the database, and end-to-end tests drive the real app in a browser."
            },
            {
              "id": "tradeoff",
              "text": "Lower levels are fast and stable, while higher levels give more confidence but are slower and flakier, so there are fewer of them."
            }
          ],
          "notEnough": [
            "Only naming unit, integration and end-to-end tests without explaining the trade-off."
          ],
          "misconceptions": []
        },
        "Docker Compose for reproducible test environments": {
          "id": "docker-compose-tests",
          "evidence": [
            {
              "id": "services",
              "text": "A compose file defines services like Node and PostgreSQL with fixed versions and settings."
            },
            {
              "id": "reproducible",
              "text": "Everyone starts the same environment with one command, so the tests don't depend on what is installed locally."
            }
          ],
          "notEnough": [
            "Only saying use Docker without explaining what it makes reproducible."
          ],
          "misconceptions": []
        }
      }
    },
    {
      "title": "Container and CI/CD concepts",
      "question": "You want every merge to main to test, build and deploy your API automatically as a small Docker image. Explain how the Dockerfile and the CI pipeline would be set up.",
      "followUps": {
        "Multi-stage Dockerfiles for lean Node production images": "How does a multi-stage Dockerfile make the final image smaller, and what gets left behind?",
        "GitHub Actions workflow: test, build, and deploy on merge": "In GitHub Actions, what triggers the workflow, in what order do the steps run, and where do the secrets come from?"
      },
      "criteria": {
        "Multi-stage Dockerfiles for lean Node production images": {
          "id": "multi-stage-docker",
          "evidence": [
            {
              "id": "stages",
              "text": "A build stage installs all dependencies and compiles the code."
            },
            {
              "id": "final",
              "text": "The final stage copies only the built output and the production dependencies, leaving build tools and dev dependencies behind."
            },
            {
              "id": "smaller",
              "text": "The result is a smaller image that deploys faster and has less in it to attack."
            }
          ],
          "notEnough": [
            "Only saying use multi-stage builds without saying what is copied."
          ],
          "misconceptions": []
        },
        "GitHub Actions workflow: test, build, and deploy on merge": {
          "id": "github-actions",
          "evidence": [
            {
              "id": "trigger",
              "text": "A workflow runs on an event, such as a push to main."
            },
            {
              "id": "steps",
              "text": "Its steps run in order with tests first, so a failing test stops the build and the deploy."
            },
            {
              "id": "secrets",
              "text": "Secrets are stored in the repository settings and passed to the steps as environment variables, never written in the workflow file."
            }
          ],
          "notEnough": [
            "Only saying use GitHub Actions for CI/CD without describing the steps."
          ],
          "misconceptions": []
        }
      }
    },
    {
      "title": "Writing tests for the PERN stack",
      "question": "You need tests for a date formatting helper, a Zod signup schema and the POST /posts endpoint that requires auth. Explain how you'd test each of them.",
      "followUps": {
        "Vitest unit tests for utility functions and Zod schemas": "What edge cases would you test for the signup schema, and why are these tests so fast?",
        "Supertest integration tests for Express endpoints": "How does Supertest call your Express app in a test, and what would you check for the POST /posts endpoint?"
      },
      "criteria": {
        "Vitest unit tests for utility functions and Zod schemas": {
          "id": "unit-tests",
          "evidence": [
            {
              "id": "pure",
              "text": "Pure functions and schemas are tested by giving inputs and checking outputs, with no server or database."
            },
            {
              "id": "edge-cases",
              "text": "Good tests cover edge cases, like an invalid email or a missing field being rejected by the schema."
            }
          ],
          "notEnough": [
            "Only saying write unit tests with Vitest without saying what is checked."
          ],
          "misconceptions": []
        },
        "Supertest integration tests for Express endpoints": {
          "id": "integration-tests",
          "evidence": [
            {
              "id": "in-process",
              "text": "Supertest sends real HTTP requests to the Express app inside the test process, without deploying it."
            },
            {
              "id": "full-cycle",
              "text": "The test covers the whole path: validation, auth middleware, handler and database."
            },
            {
              "id": "assert",
              "text": "It checks status codes and response bodies, for example 401 without a token and 201 with valid input."
            }
          ],
          "notEnough": [
            "Only saying test the endpoints with Supertest without saying what is checked."
          ],
          "misconceptions": []
        }
      }
    },
    {
      "title": "Deployment: React to Vercel, API to Railway, Postgres to managed host",
      "question": "You're deploying your PERN app: the React frontend to Vercel, the Express API to Railway and PostgreSQL to a managed host. Explain the settings you'd configure, and how database changes are applied safely on each deploy.",
      "followUps": {
        "Vercel project settings, build output, and environment variables": "Vite environment variables are set in the Vercel dashboard. When do they take effect, and why must secrets never go there?",
        "Running Prisma migrations in production deployments": "Why run prisma migrate deploy as part of the release, before the new API version starts?"
      },
      "criteria": {
        "Vercel project settings, build output, and environment variables": {
          "id": "vercel-settings",
          "evidence": [
            {
              "id": "build",
              "text": "Vercel needs the frontend's root folder, build command and output folder, like dist for Vite."
            },
            {
              "id": "build-time-env",
              "text": "Frontend environment variables are baked into the bundle at build time, so changing one needs a redeploy."
            },
            {
              "id": "public",
              "text": "Anything in the frontend bundle is visible to users, so it must not contain secrets."
            }
          ],
          "notEnough": [
            "Only saying set the env vars in Vercel without explaining when they apply."
          ],
          "misconceptions": [
            {
              "id": "runtime-env",
              "text": "Says frontend environment variables can be changed at runtime without rebuilding."
            }
          ]
        },
        "Running Prisma migrations in production deployments": {
          "id": "prod-migrations",
          "evidence": [
            {
              "id": "release-step",
              "text": "Pending migrations are applied with prisma migrate deploy as a release step, before the new server starts."
            },
            {
              "id": "why",
              "text": "That way the new code never runs against a database that is missing the tables or columns it expects."
            }
          ],
          "notEnough": [
            "Only saying run the migrations in production without saying when or why."
          ],
          "misconceptions": []
        }
      }
    }
  ]
}
```

