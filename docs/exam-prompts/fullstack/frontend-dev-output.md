LAYER: frontend-dev-1

```json
[
  {
    "stem": "What does DNS do when you type a domain name into the browser?",
    "topic": "Browsers, URLs, DNS and HTTP requests",
    "choices": [
      "Encrypts the traffic between the browser and the server using a certificate chain",
      "Compresses the page and its assets so that they transfer faster on slow connections",
      "Resolves the domain name to an IP address that the browser can then connect to",
      "Downloads the HTML document from the nearest cached copy on a delivery network"
    ],
    "answerIdx": 2
  },
  {
    "stem": "In the URL https://shop.example.com:8443/cart?id=7#top, which part is the query string?",
    "topic": "Browsers, URLs, DNS and HTTP requests",
    "choices": [
      "/cart",
      ":8443",
      "#top",
      "?id=7"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does an HTTP status code of 404 mean?",
    "topic": "Browsers, URLs, DNS and HTTP requests",
    "choices": [
      "The server crashed while processing the request",
      "The request succeeded but returned no content",
      "The request was blocked because the user is not logged in",
      "The server could not find the requested resource"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which HTTP method is meant for retrieving a resource without changing anything on the server?",
    "topic": "Browsers, URLs, DNS and HTTP requests",
    "choices": [
      "POST",
      "PUT",
      "GET",
      "DELETE"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the main difference between HTTP and HTTPS?",
    "topic": "Browsers, URLs, DNS and HTTP requests",
    "choices": [
      "HTTPS stores pages permanently in the browser cache so they work without a connection",
      "HTTPS compresses every response so pages arrive in fewer round trips than plain HTTP",
      "HTTPS hides the visitor's IP address from the server hosting the website",
      "HTTPS encrypts the traffic between browser and server using TLS"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is contained in an HTTP response besides the body?",
    "topic": "Browsers, URLs, DNS and HTTP requests",
    "choices": [
      "A status line and headers describing the response",
      "The DNS records for the requested domain",
      "A copy of the original request headers sent by the client",
      "Only the HTML document with no extra metadata"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A server answers a request with status 301. What should the browser do?",
    "topic": "Browsers, URLs, DNS and HTTP requests",
    "choices": [
      "Follow the new URL given in the Location header",
      "Retry the same request after waiting several seconds",
      "Show the user an error page about a missing file",
      "Ask the user to log in before continuing"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which status code range indicates a server-side error?",
    "topic": "Browsers, URLs, DNS and HTTP requests",
    "choices": [
      "500 to 599",
      "300 to 399",
      "400 to 499",
      "200 to 299"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the role of the TCP handshake before an HTTPS request?",
    "topic": "Browsers, URLs, DNS and HTTP requests",
    "choices": [
      "Looks up the server's address from the domain name through a chain of resolvers",
      "Verifies that the website's content has not been modified since it was last published",
      "It sets up a reliable connection between client and server before any data is sent",
      "Decides which HTML elements and attributes the downloaded document is allowed to contain"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which header tells the server which kind of content the browser prefers to receive, such as text/html?",
    "topic": "Browsers, URLs, DNS and HTTP requests",
    "choices": [
      "Accept",
      "Content-Type",
      "Host",
      "Referer"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which declaration at the top of an HTML file tells the browser to use standards mode?",
    "topic": "Document structure and the HTML element model",
    "choices": [
      "<!DOCTYPE html>",
      "<html mode='standards'>",
      "<meta mode='standards'>",
      "<?html version='5'?>"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where does the text that appears in the browser tab belong?",
    "topic": "Document structure and the HTML element model",
    "choices": [
      "In a header element before the main content",
      "In a meta element with a name of tab",
      "In a title element inside the head",
      "In an h1 element placed at the top of the body"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the purpose of the lang attribute on the html element?",
    "topic": "Document structure and the HTML element model",
    "choices": [
      "Loads the matching translation file automatically before scripts start running",
      "Sets the language that the server uses when it sends back its error responses",
      "It declares the page language for screen readers, translation and spell checking",
      "Chooses the font family used to render the page text for that language and region"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens when you write overlapping tags such as <b><i>text</b></i>?",
    "topic": "Document structure and the HTML element model",
    "choices": [
      "The text displays exactly as written, with the overlap preserved in the final DOM tree",
      "The browser logs an error and renders only the outer element while dropping the inner one",
      "The page refuses to render anything until the nesting error is fixed by the author",
      "The browser repairs the markup, sometimes producing a structure you did not intend"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which tag is a void element, meaning it has no closing tag or content?",
    "topic": "Document structure and the HTML element model",
    "choices": [
      "<img>",
      "<li>",
      "<span>",
      "<p>"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the HTML parser build from the markup it reads?",
    "topic": "Document structure and the HTML element model",
    "choices": [
      "A flat array of text strings",
      "A tree of nodes called the DOM",
      "A list of CSS rules ordered by specificity",
      "A compiled bytecode version of the page"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which meta tag is needed so a page scales correctly on a phone?",
    "topic": "Document structure and the HTML element model",
    "choices": [
      "<meta name='viewport' content='width=device-width, initial-scale=1'>",
      "<meta http-equiv='X-Responsive' content='device-width'>",
      "<meta name='mobile-friendly' content='true' scale='auto'>",
      "<meta charset='responsive' viewport='mobile'>"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between an id and a class attribute?",
    "topic": "Document structure and the HTML element model",
    "choices": [
      "An id can be reused on many elements in the page, while a class must be unique to one element",
      "An id must be unique in the page, while a class can be shared by many elements",
      "An id only works on div elements, while a class can be applied to every kind of element",
      "An id is meant for styling only, while a class is meant for JavaScript hooks only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should you declare <meta charset='utf-8'> near the top of the head?",
    "topic": "Document structure and the HTML element model",
    "choices": [
      "So the browser decodes characters such as accents and emoji correctly",
      "So search engines rank the page higher for that language",
      "So scripts are allowed to run before the body loads",
      "So the browser downloads the page using a faster protocol"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between a block element and an inline element?",
    "topic": "Document structure and the HTML element model",
    "choices": [
      "A block element can only contain plain text, while an inline element can contain any other element",
      "A block element is loaded before scripts run, while an inline element loads afterwards",
      "A block element is hidden until it is activated, while an inline element is always shown",
      "A block element starts on a new line and fills the width, an inline element flows within text"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which element should wrap the primary, unique content of a page?",
    "topic": "Semantic elements: header, nav, main, article, section, footer",
    "choices": [
      "div",
      "section",
      "aside",
      "main"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why prefer a nav element over a generic div for site links?",
    "topic": "Semantic elements: header, nav, main, article, section, footer",
    "choices": [
      "Search engines only follow and index the links that are placed inside a nav element",
      "Assistive technology can expose it as a navigation landmark that users jump to",
      "Browsers automatically lay its links out as a horizontal menu with sensible spacing",
      "It makes the links in it load faster than the links placed inside a generic div"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is an article element meant for?",
    "topic": "Semantic elements: header, nav, main, article, section, footer",
    "choices": [
      "A container that applies default newspaper-style column styling to its children",
      "A self-contained piece of content that makes sense on its own, such as a blog post",
      "A group of links placed at the top of the page for moving around the site",
      "Any block of body text that is longer than a single paragraph on the page"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the aside element represent?",
    "topic": "Semantic elements: header, nav, main, article, section, footer",
    "choices": [
      "The main call-to-action area that the page wants visitors to notice first",
      "Content that has to be shown at the very end of the document after the footer",
      "Content that is tangentially related to the surrounding content, such as a sidebar",
      "A hidden section whose text is only available to screen readers and search engines"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A page has the structure <div class='header'>...</div>. What is the semantic improvement?",
    "topic": "Semantic elements: header, nav, main, article, section, footer",
    "choices": [
      "Add an id of header so browsers recognise it as the page header",
      "Use a span element so it displays inline with no wrapper",
      "Replace it with an h1 so it counts as a heading",
      "Use a header element so the region has a built-in meaning"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How many visible main elements should a page normally have?",
    "topic": "Semantic elements: header, nav, main, article, section, footer",
    "choices": [
      "One",
      "Two, one for content and one for sidebars",
      "One for every section element on the page",
      "One for each column in the layout"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When is a section element appropriate?",
    "topic": "Semantic elements: header, nav, main, article, section, footer",
    "choices": [
      "For the page footer containing copyright text",
      "For wrapping every paragraph of text separately",
      "For a thematic group of content that normally has its own heading",
      "For any container where you need to add styling"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What benefit do landmark elements give screen reader users?",
    "topic": "Semantic elements: header, nav, main, article, section, footer",
    "choices": [
      "The font size grows so that the text stays readable at larger zoom levels",
      "The page text is read aloud in a more natural and expressive voice automatically",
      "Content is translated into the user's preferred language before it is announced",
      "They can jump directly between regions such as navigation and main content"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When is a div the right choice?",
    "topic": "Semantic elements: header, nav, main, article, section, footer",
    "choices": [
      "When no semantic element fits and you only need a generic container for styling",
      "When you need search engines to index the block as a standalone article",
      "When you want screen readers to treat the content as the main region of the page",
      "When you want the browser to include the block in landmark keyboard navigation"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which element is intended for the information at the end of a page or section, such as copyright and contact links?",
    "topic": "Semantic elements: header, nav, main, article, section, footer",
    "choices": [
      "address",
      "footer",
      "aside",
      "small"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should a page usually have only one h1?",
    "topic": "Headings, lists, links, images and media",
    "choices": [
      "Search engines apply a ranking penalty to every page that contains several h1 elements",
      "CSS only allows one h1 per page to receive a custom style rule at a time",
      "Browsers refuse to render a document that contains more than one h1 element inside the body",
      "It identifies the main topic and anchors the heading outline used by assistive technology"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which choice is a problem for heading structure?",
    "topic": "Headings, lists, links, images and media",
    "choices": [
      "Using the same heading level for sibling sections",
      "Jumping from h2 to h4 to get a smaller font size",
      "Using h2 for each major section under the h1",
      "Placing an h3 under an h2 for a subsection"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the correct way to mark up a list of steps that must be followed in order?",
    "topic": "Headings, lists, links, images and media",
    "choices": [
      "A ul element with li children",
      "A p element with numbers typed in the text",
      "An ol element with li children",
      "A div with a br after each step"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should the alt attribute contain for an informative image such as a chart?",
    "topic": "Headings, lists, links, images and media",
    "choices": [
      "The file name of the image together with its dimensions, as exported by the design tool",
      "An empty string, so that screen readers skip it and read the surrounding text",
      "The phrase 'image of' followed by the file type so that users know it is a picture",
      "A text alternative that conveys the same information the image shows"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should alt be for a purely decorative image?",
    "topic": "Headings, lists, links, images and media",
    "choices": [
      "No alt attribute at all",
      "The image's file name",
      "An empty string, alt=''",
      "The word 'decorative'"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is 'click here' poor link text?",
    "topic": "Headings, lists, links, images and media",
    "choices": [
      "It gives no meaning when links are read out of context by a screen reader",
      "It causes the browser to treat the link as a button and changes how it receives focus",
      "It prevents the link from being reachable by keyboard users who press the Tab key",
      "It stops search engines from following the link to the page it points toward"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does target='_blank' on a link do?",
    "topic": "Headings, lists, links, images and media",
    "choices": [
      "Opens the destination in a new browsing context",
      "Opens the link inside an iframe on the same page",
      "Downloads the destination file instead of showing it",
      "Blocks the link from loading any content"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What problem does the srcset attribute on img solve?",
    "topic": "Headings, lists, links, images and media",
    "choices": [
      "It compresses the image on the server automatically",
      "It lets the browser pick an appropriately sized image for the device",
      "It loads every listed image at the same time for a slideshow",
      "It adds a caption that screen readers read aloud"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which element pairs an image with a visible caption?",
    "topic": "Headings, lists, links, images and media",
    "choices": [
      "caption inside the img element",
      "span with an alt attribute",
      "figure with a figcaption",
      "div with a title attribute"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which attribute defers loading of an off-screen image until it is near the viewport?",
    "topic": "Headings, lists, links, images and media",
    "choices": [
      "async",
      "loading='lazy'",
      "defer",
      "preload='none'"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you connect a label to its input so clicking the label focuses the field?",
    "topic": "Forms and native input types",
    "choices": [
      "Wrap both of them in a div and give that div a role of group",
      "Set the input's name attribute to the exact visible text of the label element",
      "Give the input an id and set the label's for attribute to the same value",
      "Place the label directly after the input in the markup and give both the same class"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why use input type='email' instead of type='text' for an email field?",
    "topic": "Forms and native input types",
    "choices": [
      "It gives built-in validation and an email-friendly keyboard on mobile devices",
      "It checks against the mail server that the typed address really exists and can receive mail",
      "It encrypts the typed value before it leaves the browser and is sent to the server",
      "It stops the browser from offering saved values through its autofill feature"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which attribute stops a form from being submitted when a field is left empty?",
    "topic": "Forms and native input types",
    "choices": [
      "novalidate",
      "required",
      "minlength='0'",
      "mandatory"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the name attribute on an input control?",
    "topic": "Forms and native input types",
    "choices": [
      "The key used for the value when the form is submitted",
      "The element's id for CSS selectors",
      "The text shown inside the field before the user types",
      "The label announced by screen readers"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A button inside a form has no type attribute. What happens when it is clicked?",
    "topic": "Forms and native input types",
    "choices": [
      "It resets all fields to their initial values",
      "Nothing happens until a script handles the click",
      "It only validates the form without submitting",
      "It submits the form, because the default type is submit"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the purpose of the placeholder attribute?",
    "topic": "Forms and native input types",
    "choices": [
      "The accessible name that screen readers announce when the field receives focus",
      "A short hint shown while the field is empty, which does not replace a label",
      "A default value that is submitted automatically if the user leaves the field empty",
      "A rule limiting which characters a user is allowed to type into the field"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which element should group related radio buttons and give the group a name?",
    "topic": "Forms and native input types",
    "choices": [
      "div with an aria-label",
      "ul with li elements",
      "section with a heading",
      "fieldset with a legend"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which input type gives a date picker without any JavaScript?",
    "topic": "Forms and native input types",
    "choices": [
      "time-range",
      "datetime-text",
      "calendar",
      "date"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the autocomplete attribute do?",
    "topic": "Forms and native input types",
    "choices": [
      "Locks the field so that it cannot be edited again after the first entry is made",
      "It tells the browser what kind of data the field expects so it can suggest saved values",
      "Finishes the word the user is typing by looking it up in a built-in dictionary",
      "Submits the form automatically as soon as every field has been filled in"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the effect of method='post' compared with method='get' on a form?",
    "topic": "Forms and native input types",
    "choices": [
      "The data is encrypted before it is sent",
      "The browser stores the submission in its history as a bookmark",
      "The data is sent in the request body instead of the URL",
      "The form can only be submitted once per page load"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which DevTools panel shows every request a page makes along with timing and status codes?",
    "topic": "Browser DevTools: Elements and Network panels",
    "choices": [
      "Application",
      "Sources",
      "Network",
      "Elements"
    ],
    "answerIdx": 2
  },
  {
    "stem": "In the Elements panel, what does editing a node's text do?",
    "topic": "Browser DevTools: Elements and Network panels",
    "choices": [
      "Saves the change into the project's HTML file on disk so that it is permanent",
      "It changes the live DOM only until you reload, not the source file on disk",
      "Updates every other open tab that is currently showing the same page",
      "Sends the change to the server, which stores it for every visitor to the website"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A request in the Network panel shows a status of 304. What does that tell you?",
    "topic": "Browser DevTools: Elements and Network panels",
    "choices": [
      "The request was blocked by the browser because of a cross-origin policy violation",
      "The server failed while processing the request and returned no usable response",
      "The browser's cached copy is still valid, so the server sent no new body",
      "The server has moved the resource permanently and is sending the browser a new address"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can the Network panel help diagnose a slow page?",
    "topic": "Browser DevTools: Elements and Network panels",
    "choices": [
      "It lists all CSS rules that are unused",
      "It measures how much memory the page script uses",
      "It rewrites the HTML so the page loads faster",
      "It shows which requests are large or slow in a timing waterfall"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why might a page look different with the cache disabled in DevTools?",
    "topic": "Browser DevTools: Elements and Network panels",
    "choices": [
      "The browser fetches every resource again instead of reusing stored copies",
      "The browser downloads images at a lower quality to keep the requests fast",
      "The browser blocks third-party cookies, which removes any embedded widgets",
      "The browser stops running JavaScript so that only the static HTML is displayed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A resource appears in red in the Network panel. What is the most likely reason?",
    "topic": "Browser DevTools: Elements and Network panels",
    "choices": [
      "The resource is larger than one megabyte and has been flagged as too heavy",
      "The resource is an image, and images are always highlighted separately",
      "The resource was served from the browser cache instead of from the network",
      "The request failed, for example with a 404 status or a network error"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the computed styles view in the Elements panel show?",
    "topic": "Browser DevTools: Elements and Network panels",
    "choices": [
      "The CSS exactly as it is written in the source stylesheet, rule by rule",
      "The final values of each property after the cascade has been applied",
      "Only the properties set by inline style attributes on the selected element",
      "The rules that the browser ignored because of a syntax error"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does 'Inspect' reveal when you right-click an element on a page?",
    "topic": "Browser DevTools: Elements and Network panels",
    "choices": [
      "The element's position in the source file on disk",
      "The element's current node in the live DOM tree",
      "The list of users who have viewed the element",
      "The original server-side template that produced it"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which information is available by clicking a request in the Network panel?",
    "topic": "Browser DevTools: Elements and Network panels",
    "choices": [
      "The DNS records for the domain",
      "Request and response headers, payload and response body",
      "The source code of the server that handled it",
      "The user's browser history for that site"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is it useful to throttle the network speed in DevTools?",
    "topic": "Browser DevTools: Elements and Network panels",
    "choices": [
      "To make the server respond with smaller files that fit the available bandwidth",
      "To reduce the amount of data that the page stores locally in the browser",
      "To see how the page behaves for users on slow connections",
      "To check whether the page still works when JavaScript is turned off"
    ],
    "answerIdx": 2
  }
]
```

LAYER: frontend-dev-2

```json
[
  {
    "stem": "A paragraph has the class 'note'. The stylesheet has 'p { color: blue }' and '.note { color: red }'. What colour is the text?",
    "topic": "Selectors, specificity and the cascade",
    "choices": [
      "Red, because rules written later always beat rules written earlier",
      "Blue, because the p rule targets the element's tag directly",
      "Blue, because type selectors are applied after class selectors",
      "Red, because a class selector is more specific than a type selector"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which list orders selector types from lowest to highest specificity?",
    "topic": "Selectors, specificity and the cascade",
    "choices": [
      "ID selector, type selector, inline style, class selector",
      "Inline style, ID selector, class selector, type selector",
      "Class selector, type selector, inline style, ID selector",
      "Type selector, class selector, ID selector, inline style"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is overusing !important considered a maintenance problem?",
    "topic": "Selectors, specificity and the cascade",
    "choices": [
      "It makes the browser skip the cascade and ignore every other stylesheet on the page",
      "Overriding it later needs another !important or a more specific rule, so overrides escalate",
      "It forces the declaration to be applied to child elements as well as to the target",
      "It disables the rule in older browsers, so the layout behaves differently across them"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Two rules have identical specificity and both set the same property. Which one wins?",
    "topic": "Selectors, specificity and the cascade",
    "choices": [
      "The one that appears earlier in the source order",
      "The one that is defined in the file loaded first",
      "The one whose selector is longer in characters",
      "The one that appears later in the source order"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What specificity does a selector wrapped in :where() contribute?",
    "topic": "Selectors, specificity and the cascade",
    "choices": [
      "The same as the most specific selector inside the brackets",
      "None, it always adds zero specificity",
      "The same as a single class selector",
      "Only the specificity of the first selector in the list"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which selector has the highest specificity?",
    "topic": "Selectors, specificity and the cascade",
    "choices": [
      "ul li:first-child a",
      "#nav a",
      "nav ul li a",
      ".menu .item .link"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does a later cascade layer relate to an earlier one when normal rules conflict?",
    "topic": "Selectors, specificity and the cascade",
    "choices": [
      "The earlier layer wins, because it was parsed first by the browser",
      "The later layer wins, regardless of selector specificity",
      "Layers are ignored and only source order inside each file matters",
      "The layer containing the most specific selector wins"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does the child combinator 'div > p' differ from the descendant selector 'div p'?",
    "topic": "Selectors, specificity and the cascade",
    "choices": [
      "It only matches paragraphs that are direct children of a div",
      "It matches paragraphs at any depth but only inside the first div",
      "It matches the paragraph that comes immediately after a div",
      "It matches both the div and every paragraph it contains"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How much specificity does the universal selector * add?",
    "topic": "Selectors, specificity and the cascade",
    "choices": [
      "More than a type selector but less than a class selector",
      "The same as a type selector",
      "None, it contributes zero",
      "The same as a class selector"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why are ID selectors a poor choice for styling reusable components?",
    "topic": "Selectors, specificity and the cascade",
    "choices": [
      "They cannot be combined with pseudo-classes such as :hover or with attribute selectors",
      "Their high specificity makes overrides hard, and an id can only appear once per page",
      "Only the first element with that id is ever matched by the rules in the stylesheet",
      "Browsers apply ID styles more slowly than class styles when the page contains many nodes"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which property is inherited from a parent element by default?",
    "topic": "Inheritance and the computed value",
    "choices": [
      "margin",
      "background-color",
      "color",
      "border"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which property is NOT inherited by default?",
    "topic": "Inheritance and the computed value",
    "choices": [
      "font-family",
      "visibility",
      "border",
      "line-height"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the keyword 'inherit' do when used as a value?",
    "topic": "Inheritance and the computed value",
    "choices": [
      "Takes the value from the previous sibling element",
      "Takes the computed value of that property from the parent element",
      "Takes the initial value defined in the CSS specification",
      "Takes the value from the browser's default stylesheet"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the keyword 'initial' do?",
    "topic": "Inheritance and the computed value",
    "choices": [
      "Sets the property to the value the parent element uses",
      "Sets the property to the value from the first matching rule in the file",
      "Removes the declaration so the cascade picks another rule",
      "Sets the property to the default value defined by the CSS specification"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does 'unset' behave on a property such as color, which is inherited by default?",
    "topic": "Inheritance and the computed value",
    "choices": [
      "It acts like inherit for inherited properties and like initial for the others",
      "It removes the element from the document flow while keeping its box in the tree",
      "It always acts like initial, even for properties that inherit from the parent element",
      "It acts like inherit for every property regardless of whether the property inherits"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the 'computed value' of a property?",
    "topic": "Inheritance and the computed value",
    "choices": [
      "The value the browser would use for the property if no stylesheets were loaded",
      "The value after the cascade is resolved and relative units such as em become absolute",
      "The value written in the author stylesheet before any resolution takes place at all",
      "The final pixel size after the browser has completed the layout of the whole page"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why does a button often not use the page font even when body sets font-family?",
    "topic": "Inheritance and the computed value",
    "choices": [
      "Buttons only accept font settings written as inline styles",
      "Form controls get their own font from the browser's default stylesheet",
      "font-family is not an inherited property in standard mode",
      "Inheritance is turned off for any element that can receive focus"
    ],
    "answerIdx": 1
  },
  {
    "stem": "The body has 'line-height: 1.5' with no unit. A child sets 'font-size: 2rem'. How is the child's line height calculated?",
    "topic": "Inheritance and the computed value",
    "choices": [
      "As 1.5 times the child's own font size, because the unitless number is inherited",
      "It is ignored, because child elements cannot change the inherited line height",
      "As 1.5 pixels, because unitless values default to pixels",
      "As 1.5 times the body's font size, because the computed length is inherited"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which stylesheet origin wins over the browser's default styles when rules conflict normally?",
    "topic": "Inheritance and the computed value",
    "choices": [
      "Styles stored in the user's operating system",
      "Styles from the first extension installed in the browser",
      "User agent styles shipped with the browser",
      "Author styles written by the site developer"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the purpose of a CSS reset or normalize stylesheet?",
    "topic": "Inheritance and the computed value",
    "choices": [
      "To speed up rendering by caching the cascade result",
      "To remove all styles so elements cannot be styled again",
      "To reduce differences in the default styles that browsers apply",
      "To translate modern CSS into syntax older browsers understand"
    ],
    "answerIdx": 2
  },
  {
    "stem": "With box-sizing: content-box, an element has width: 200px, padding: 20px and a 5px border on each side. What is its rendered width?",
    "topic": "The box model: content, padding, border, margin",
    "choices": [
      "200px",
      "240px",
      "250px",
      "225px"
    ],
    "answerIdx": 2
  },
  {
    "stem": "With box-sizing: border-box, the same element has width: 200px, padding: 20px and a 5px border. What is its rendered width?",
    "topic": "The box model: content, padding, border, margin",
    "choices": [
      "200px",
      "170px",
      "225px",
      "250px"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between margin and padding?",
    "topic": "The box model: content, padding, border, margin",
    "choices": [
      "Margin affects only inline elements, padding affects only block elements",
      "Margin is clipped by overflow, padding is not part of the box",
      "Margin is space outside the border, padding is space inside it",
      "Margin is space inside the border, padding is space outside it"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Two block siblings have a bottom margin of 20px and a top margin of 30px. How large is the gap between them?",
    "topic": "The box model: content, padding, border, margin",
    "choices": [
      "30px, because adjoining vertical margins collapse to the larger one",
      "50px, because the margins of the two siblings are added together by the browser",
      "25px, because the browser averages the two margins to keep the spacing balanced",
      "20px, because the first element's margin always takes priority over the second"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What prevents a parent's top margin from collapsing with its first child's top margin?",
    "topic": "The box model: content, padding, border, margin",
    "choices": [
      "Setting the child's display to inline",
      "Giving the child a larger width than the parent",
      "Giving the parent padding or a border",
      "Giving the parent a background colour"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does 'margin: 0 auto' do on a block element that has a fixed width?",
    "topic": "The box model: content, padding, border, margin",
    "choices": [
      "Stretches it to the full width of the viewport",
      "Centres it horizontally inside its container",
      "Centres it vertically inside its container",
      "Removes all spacing around the element"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why does vertical margin have no effect on an inline element such as a span?",
    "topic": "The box model: content, padding, border, margin",
    "choices": [
      "Inline elements do not support margin of any kind",
      "Vertical margin only works when the element has a border",
      "The margin is applied but the browser hides it",
      "Inline boxes ignore top and bottom margins in the layout of lines"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does outline differ from border?",
    "topic": "The box model: content, padding, border, margin",
    "choices": [
      "An outline is drawn outside the box and does not take up layout space",
      "An outline is part of the box and increases the element's width",
      "An outline can only be set on form controls",
      "An outline is always rendered below the content layer"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do display: none and visibility: hidden differ?",
    "topic": "The box model: content, padding, border, margin",
    "choices": [
      "display: none only works on block elements, visibility works on all elements",
      "display: none removes the element from layout, visibility: hidden keeps its space",
      "Both remove the element, but only display: none hides it from screen readers",
      "visibility: hidden removes the element from layout, display: none keeps its space"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the overflow: hidden property do on a container?",
    "topic": "The box model: content, padding, border, margin",
    "choices": [
      "Hides the container whenever its content is too large",
      "Scales the content down until it fits inside the container",
      "Moves the overflowing content to a new line below",
      "Clips content that extends beyond the container's padding box"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does 1rem equal?",
    "topic": "Units: px, rem, em, %, vw and the clamp function",
    "choices": [
      "One sixteenth of the viewport width",
      "The font size of the parent element",
      "The width of the letter 'm' in the current font",
      "The font size of the root html element"
    ],
    "answerIdx": 3
  },
  {
    "stem": "An element has font-size: 20px and padding: 2em. How large is its padding?",
    "topic": "Units: px, rem, em, %, vw and the clamp function",
    "choices": [
      "40px, because em in padding refers to the element's own font size",
      "20px, because padding does not respond to em units",
      "32px, because em is always based on the 16px browser default",
      "40px, because em in padding refers to the parent's font size"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does 1vw equal?",
    "topic": "Units: px, rem, em, %, vw and the clamp function",
    "choices": [
      "One pixel at the current zoom level",
      "One percent of the viewport height",
      "One percent of the viewport width",
      "One percent of the parent element's width"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does font-size: clamp(1rem, 2.5vw, 2rem) do?",
    "topic": "Units: px, rem, em, %, vw and the clamp function",
    "choices": [
      "Scales with the viewport width but stays between 1rem and 2rem",
      "Chooses randomly between the three values on each render",
      "Uses 1rem on mobile screens and 2rem on desktop screens only",
      "Always uses 2.5vw and falls back to 1rem on old browsers"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is rem generally preferred over px for font sizes?",
    "topic": "Units: px, rem, em, %, vw and the clamp function",
    "choices": [
      "It respects the font size the user chose in their browser settings",
      "It renders text sharper on high-density screens",
      "It prevents text from changing size when the page is zoomed",
      "It loads faster because the browser skips unit conversion"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A child has 'width: 50%'. What is that percentage relative to?",
    "topic": "Units: px, rem, em, %, vw and the clamp function",
    "choices": [
      "The width of its containing block",
      "The width of its own content",
      "The font size of the parent element",
      "The width of the viewport"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does the dvh unit differ from vh on mobile browsers?",
    "topic": "Units: px, rem, em, %, vw and the clamp function",
    "choices": [
      "dvh is based on the device's physical screen height in pixels",
      "dvh only measures the area above the on-screen keyboard",
      "dvh adjusts as browser toolbars show and hide, vh uses a fixed size",
      "dvh includes the browser toolbars permanently, vh excludes them"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the ch unit measure?",
    "topic": "Units: px, rem, em, %, vw and the clamp function",
    "choices": [
      "The width of the zero character in the element's font",
      "The height of one line of text",
      "A character count that the browser rounds up",
      "A fraction of the container's width"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the min() function return when given several lengths?",
    "topic": "Units: px, rem, em, %, vw and the clamp function",
    "choices": [
      "The smallest of the values after they are resolved",
      "The average of all the values in the list, rounded to the nearest pixel",
      "The value that is closest to the current width of the viewport",
      "The first value in the list that the browser considers to be a valid length"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the drawback of setting body text in fixed px units?",
    "topic": "Units: px, rem, em, %, vw and the clamp function",
    "choices": [
      "It may not scale when a user changes their preferred browser font size",
      "It prevents the text from being selected or copied from the page by the visitor",
      "It stops the text from wrapping properly inside narrow containers on small screens",
      "It makes the text blurry at standard zoom levels on screens with a high pixel density"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What line length is generally considered comfortable for reading body text?",
    "topic": "Typography, web fonts and line length",
    "choices": [
      "The full width of the screen on every device",
      "About 100 to 140 characters per line",
      "About 20 to 30 characters per line",
      "About 45 to 75 characters per line"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does font-display: swap do while a web font is loading?",
    "topic": "Typography, web fonts and line length",
    "choices": [
      "Loads the web font in the background and never replaces the fallback text on screen",
      "Keeps the fallback font permanently if the web font download takes too long to finish",
      "Hides the text completely until the web font has finished loading from the network",
      "Shows text in a fallback font immediately, then swaps when the web font arrives"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which line-height is a sensible default for body text?",
    "topic": "Typography, web fonts and line length",
    "choices": [
      "A value of 3 so that text is easy to scan",
      "Exactly 1, so lines sit tightly together",
      "A unitless value around 1.4 to 1.6",
      "A fixed 12px value for every font size"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the stack 'font-family: Inter, system-ui, sans-serif' mean?",
    "topic": "Typography, web fonts and line length",
    "choices": [
      "Use Inter if available, otherwise system-ui, otherwise any sans-serif font",
      "Use sans-serif for headings and Inter for body text, with system-ui for buttons only",
      "Blend the three fonts together so that each line uses a mix of their letter shapes",
      "Load all three fonts and let the visitor choose between them from a browser menu"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is an advantage of a variable font over several static font files?",
    "topic": "Typography, web fonts and line length",
    "choices": [
      "It always renders faster than any static font file",
      "It works without the browser downloading anything",
      "One file can provide a continuous range of weights or widths",
      "It contains every language's characters in a smaller size"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is text-wrap: balance intended to improve?",
    "topic": "Typography, web fonts and line length",
    "choices": [
      "The spacing between letters in justified text so that rivers of white space disappear",
      "The vertical alignment of text inside buttons and other single-line controls",
      "The reading speed of long paragraphs by shortening the lines near the end of the text",
      "The evenness of line lengths in short blocks such as headings"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does an @font-face rule do?",
    "topic": "Typography, web fonts and line length",
    "choices": [
      "Declares a custom font family and where to load its files from",
      "Sets the default font used for form controls",
      "Converts a system font into a downloadable web font",
      "Applies a font to every element on the page automatically"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does letter-spacing control?",
    "topic": "Typography, web fonts and line length",
    "choices": [
      "The space between lines of text",
      "The space between words only",
      "The space between characters in text",
      "The indentation of the first line in a paragraph"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why might you preload a critical web font?",
    "topic": "Typography, web fonts and line length",
    "choices": [
      "To make the browser keep it cached permanently across every other website visited",
      "To convert it into a system font that the user is already likely to have installed",
      "To start downloading it earlier so text does not shift when it arrives",
      "To avoid needing a fallback font stack in the CSS for browsers that load it slowly"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why can very long lines of text be a readability problem?",
    "topic": "Typography, web fonts and line length",
    "choices": [
      "Long lines cannot be selected with the mouse unless the user zooms in first",
      "Readers lose their place when moving from the end of one line to the next",
      "They force the browser to download larger font files than shorter lines would need",
      "Browsers cannot render lines longer than about eighty characters without errors"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which declaration correctly defines a custom property?",
    "topic": "Custom properties (CSS variables) and color",
    "choices": [
      "$brand: #6d28d9;",
      "@brand: #6d28d9;",
      "var(brand): #6d28d9;",
      "--brand: #6d28d9;"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you read a custom property named --brand in a declaration?",
    "topic": "Custom properties (CSS variables) and color",
    "choices": [
      "color: $(--brand);",
      "color: --brand;",
      "color: get(--brand);",
      "color: var(--brand);"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does var(--accent, black) do when --accent is not defined?",
    "topic": "Custom properties (CSS variables) and color",
    "choices": [
      "Leaves the property unset so the browser default applies",
      "Uses the value of the nearest parent's --accent",
      "Throws an error and ignores the whole rule",
      "Uses black as the fallback value"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why are custom properties commonly declared on :root?",
    "topic": "Custom properties (CSS variables) and color",
    "choices": [
      "Browsers cache values declared on :root for faster rendering",
      "They inherit, so every element in the document can use them",
      "Custom properties only work when declared on the html element",
      "The :root selector gives them higher specificity than class selectors"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A component uses 'background: var(--bg)'. What happens if a parent sets a different --bg value?",
    "topic": "Custom properties (CSS variables) and color",
    "choices": [
      "The browser reports an error because the variable is redefined",
      "Nothing changes, because the variable was resolved when the stylesheet loaded",
      "Only elements with the same class as the parent change",
      "The component picks up the new value because custom properties cascade and inherit"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What minimum contrast ratio does WCAG level AA require for normal-size body text?",
    "topic": "Custom properties (CSS variables) and color",
    "choices": [
      "3 to 1",
      "2 to 1",
      "4.5 to 1",
      "7 to 1"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does rgb(0 0 0 / 50%) represent?",
    "topic": "Custom properties (CSS variables) and color",
    "choices": [
      "A colour with 50 percent less red",
      "Black at 50 percent opacity",
      "A mid-grey at full opacity",
      "Black shown on a 50 percent grey background"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the prefers-color-scheme media feature detect?",
    "topic": "Custom properties (CSS variables) and color",
    "choices": [
      "Which colour the user chose as their accent in the browser",
      "Whether the user's system is set to a light or dark theme",
      "Whether the page uses dark colours in its stylesheet",
      "Whether the display can show more than 256 colours"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the purpose of 'color-scheme: light dark' on :root?",
    "topic": "Custom properties (CSS variables) and color",
    "choices": [
      "It converts every colour written in the stylesheet to its dark equivalent when needed",
      "It lets built-in UI such as form controls and scrollbars match either theme",
      "It forces the whole page to use the dark theme on every device and browser setting",
      "It removes the need to define any custom colour values for a dark mode stylesheet"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What advantage does the oklch() colour function have over hsl()?",
    "topic": "Custom properties (CSS variables) and color",
    "choices": [
      "It supports a longer list of named colours than hsl() offers to the stylesheet author",
      "It is faster for the browser to calculate than hsl() on pages with many colour values",
      "Lightness is perceptually uniform, so equal steps look equally bright",
      "It prevents colours from being altered by the visitor's operating system theme settings"
    ],
    "answerIdx": 2
  }
]
```

LAYER: frontend-dev-3

```json
[
  {
    "stem": "In normal flow, how are block-level elements laid out?",
    "topic": "Normal flow, display and positioning",
    "choices": [
      "Side by side in a row, wrapping when they run out of space",
      "In the order of their z-index values from lowest to highest",
      "Layered on top of each other at the top-left corner",
      "Stacked vertically, each starting on a new line"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does position: relative do to an element by itself?",
    "topic": "Normal flow, display and positioning",
    "choices": [
      "Removes it from normal flow and places it relative to the viewport edges",
      "Moves it to the top-left corner of its parent as soon as the page renders",
      "Keeps it in flow and makes it the reference for offsets and absolute children",
      "Makes it stay fixed on the screen while the rest of the page is scrolled"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Relative to what is an element with position: absolute positioned?",
    "topic": "Normal flow, display and positioning",
    "choices": [
      "The nearest ancestor with a position value other than static",
      "The browser viewport at all times, even when an ancestor is positioned",
      "The element's previous sibling in the document, wherever that sibling is placed",
      "The body element, regardless of how the ancestors are positioned"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does position: sticky do?",
    "topic": "Normal flow, display and positioning",
    "choices": [
      "Pins the element to the bottom of the page after the document finishes loading",
      "Behaves normally until a scroll threshold is reached, then sticks inside its container",
      "Locks the element to its parent so that it can no longer be moved by scrolling",
      "Fixes the element permanently to the viewport starting from the very first render"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What effect does position: absolute have on the element's space in the layout?",
    "topic": "Normal flow, display and positioning",
    "choices": [
      "It keeps its space, and siblings flow around its original position",
      "It collapses its margins into those of its siblings",
      "It is placed on a separate layer but still pushes content down",
      "It is removed from normal flow, so siblings behave as if it were not there"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does display: inline-block allow?",
    "topic": "Normal flow, display and positioning",
    "choices": [
      "Flowing with text like an inline element while accepting width and height",
      "Taking the full width of the container like a block element, with line breaks",
      "Laying out its children as flex items automatically without any extra property",
      "Ignoring width and height like a regular inline element, but allowing margins"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When does z-index apply to an element?",
    "topic": "Normal flow, display and positioning",
    "choices": [
      "To every element on the page, regardless of its position value or its display type",
      "When it is positioned or is a flex or grid item, which forms a stacking context",
      "Only to elements using position: fixed, since other positions ignore the property",
      "Only to elements that have a background colour set by the stylesheet author"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is it risky to build a whole page layout with floats today?",
    "topic": "Normal flow, display and positioning",
    "choices": [
      "Floated elements are invisible to screen readers and assistive technologies",
      "Floats were designed for wrapping text around images and need clearing hacks",
      "Browsers no longer support the float property at all in standards mode pages",
      "Floats cannot be combined with media queries, so responsive layouts break down"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a stacking context?",
    "topic": "Normal flow, display and positioning",
    "choices": [
      "A group of elements painted together, ordered as a unit against other contexts",
      "A list of elements ordered by the time at which each was added to the DOM tree",
      "A layout mode that places the elements of a container in layers down the page",
      "A container that limits the width of its children to the size of the viewport"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the display: contents value do?",
    "topic": "Normal flow, display and positioning",
    "choices": [
      "Removes the element's own box but keeps its children in the layout",
      "Forces the element's children to be displayed as inline elements",
      "Hides the element's content but keeps its box and its size in the layout",
      "Displays only the text content and strips out the child elements"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does display: flex on a container do?",
    "topic": "Flexbox: axes, alignment, wrapping and sizing",
    "choices": [
      "Turns the container itself into an inline element that sits in a line of text",
      "Makes its direct children flex items arranged along a main axis",
      "Stacks its children on top of each other at the container's top-left corner",
      "Makes all of its descendants flex items at every depth of the element tree"
    ],
    "answerIdx": 1
  },
  {
    "stem": "In a row flex container, which property aligns items along the main axis?",
    "topic": "Flexbox: axes, alignment, wrapping and sizing",
    "choices": [
      "align-content",
      "place-items",
      "align-items",
      "justify-content"
    ],
    "answerIdx": 3
  },
  {
    "stem": "In a row flex container, which property aligns items along the cross axis?",
    "topic": "Flexbox: axes, alignment, wrapping and sizing",
    "choices": [
      "justify-content",
      "gap",
      "flex-direction",
      "align-items"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does changing flex-direction from row to column affect justify-content?",
    "topic": "Flexbox: axes, alignment, wrapping and sizing",
    "choices": [
      "It stops working until the container has been given a fixed pixel height",
      "It starts to control the cross axis instead of the main axis of the container",
      "It aligns along the vertical direction, because the main axis changed",
      "It keeps aligning horizontally, regardless of the direction of the container"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does flex: 1 on an item usually mean?",
    "topic": "Flexbox: axes, alignment, wrapping and sizing",
    "choices": [
      "The item shrinks to its minimum content size and never takes extra space",
      "The item is limited to a single pixel of width whatever its content might be",
      "The item grows to share free space equally with other flex: 1 items",
      "The item is placed first in the container, before any items with a higher order"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does flex-wrap: wrap allow?",
    "topic": "Flexbox: axes, alignment, wrapping and sizing",
    "choices": [
      "Text inside items to wrap around floated images",
      "Items to move onto new lines when they do not fit",
      "The container to grow wider than its parent",
      "Items to shrink below their minimum content size"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is flex-basis?",
    "topic": "Flexbox: axes, alignment, wrapping and sizing",
    "choices": [
      "The starting main-axis size of an item before free space is shared out",
      "The spacing between items along the cross axis of the flex container",
      "The order in which the items are painted when they overlap on the screen",
      "The maximum size an item can grow to once all of the free space is distributed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A flex item with long unbroken text overflows its container. Which fix usually works?",
    "topic": "Flexbox: axes, alignment, wrapping and sizing",
    "choices": [
      "Setting display: block on the flex container",
      "Setting min-width: 0 on the flex item so it can shrink",
      "Increasing the flex-grow value of the item",
      "Adding position: relative to the flex item"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the gap property do in a flex container?",
    "topic": "Flexbox: axes, alignment, wrapping and sizing",
    "choices": [
      "Sets the gap between the lines of text that are inside the individual items",
      "Sets the space between the container and the element that is its parent",
      "Adds space between items without adding space at the outer edges",
      "Adds a margin around the whole container, including its outer edges"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which layout problem is flexbox best suited to?",
    "topic": "Flexbox: axes, alignment, wrapping and sizing",
    "choices": [
      "Creating a layered stacking order between elements",
      "Wrapping text around an image",
      "Placing items precisely in both rows and columns of a page template",
      "Arranging items in a single row or column and distributing space"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does display: grid combined with grid-template-columns define?",
    "topic": "CSS Grid: tracks, areas, auto-fit and minmax",
    "choices": [
      "Explicit column tracks into which children are placed",
      "The number of children the container may hold",
      "A flex row that wraps at a breakpoint",
      "A single column of equally tall rows"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the fr unit represent in grid-template-columns?",
    "topic": "CSS Grid: tracks, areas, auto-fit and minmax",
    "choices": [
      "A fraction of the root element's font size, like a scaled version of rem",
      "A fraction of the free space in the grid container",
      "A fraction of the viewport width, no matter how wide the container is",
      "A fixed number of pixels set by the browser's default font size and zoom"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does 'repeat(auto-fit, minmax(240px, 1fr))' create?",
    "topic": "CSS Grid: tracks, areas, auto-fit and minmax",
    "choices": [
      "A fixed number of columns that never wrap, whatever the container width is",
      "Columns that all have exactly the same width of 240px on every screen size",
      "As many columns of at least 240px as fit, stretching to fill the row",
      "Exactly one column that is at least 240px wide and grows with the viewport"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does grid-template-areas let you do?",
    "topic": "CSS Grid: tracks, areas, auto-fit and minmax",
    "choices": [
      "Automatically assign items to the biggest free cell",
      "Name regions of the grid and place items into them by name",
      "Set the area in square pixels for each cell",
      "Define media queries for each region of the grid"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between an implicit and an explicit grid track?",
    "topic": "CSS Grid: tracks, areas, auto-fit and minmax",
    "choices": [
      "Explicit tracks are only used for rows, while implicit tracks are only used for columns",
      "Explicit tracks are declared by the author, implicit ones are added when items overflow them",
      "Implicit tracks are declared in CSS, while explicit tracks are added by JavaScript",
      "Implicit tracks are hidden from the layout until the browser decides they are needed"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which property sets the gap between both rows and columns in a grid?",
    "topic": "CSS Grid: tracks, areas, auto-fit and minmax",
    "choices": [
      "grid-padding",
      "grid-margin",
      "gap",
      "track-spacing"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When is grid usually a better choice than flexbox?",
    "topic": "CSS Grid: tracks, areas, auto-fit and minmax",
    "choices": [
      "When you need a single row of items that wraps onto new lines when space runs out",
      "When items must overlap each other only by changing their z-index values",
      "When you need to centre the text that sits inside a button or a navigation link",
      "When you control layout in rows and columns together, such as a page template"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does 'grid-column: 1 / -1' do to an item?",
    "topic": "CSS Grid: tracks, areas, auto-fit and minmax",
    "choices": [
      "Reverses the order of the columns for that item",
      "Spans the item from the first to the last column line",
      "Sets the item's width to one pixel",
      "Places the item in the first column and removes it from the last"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does minmax(0, 1fr) fix compared with plain 1fr?",
    "topic": "CSS Grid: tracks, areas, auto-fit and minmax",
    "choices": [
      "Stops the track from ever growing larger than the content that it contains",
      "Aligns the content of the track to the start of its cell on the cross axis",
      "Lets tracks shrink below their content's minimum width instead of overflowing",
      "Makes each track exactly one pixel wide at its smallest size on a narrow screen"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does subgrid allow a nested grid to do?",
    "topic": "CSS Grid: tracks, areas, auto-fit and minmax",
    "choices": [
      "Create a grid that is smaller than its parent and positioned anywhere inside it",
      "Use the parent grid's tracks so that nested items line up with the outer layout",
      "Place its items outside the bounds of the parent grid without clipping them",
      "Inherit all of the parent grid element's styles, including fonts and colours"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a mobile-first approach mean for the base CSS?",
    "topic": "Mobile-first design and media queries",
    "choices": [
      "Write the desktop styles first and then hide the extra elements on phone screens",
      "Use only max-width queries so that phones never receive any additional rules",
      "Write styles for small screens first and add wider layouts with min-width queries",
      "Serve a separate stylesheet to every phone model, detected from the user agent"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does '@media (min-width: 768px)' match?",
    "topic": "Mobile-first design and media queries",
    "choices": [
      "Viewports whose height is at least 768 pixels",
      "Viewports at least 768 pixels wide",
      "Viewports no wider than 768 pixels",
      "Devices whose screen is exactly 768 pixels wide"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How should you choose breakpoint values?",
    "topic": "Mobile-first design and media queries",
    "choices": [
      "At the widths where your content layout starts to break",
      "At the sizes defined by the CSS specification",
      "At multiples of 100 pixels for consistency",
      "At the screen widths of the most popular devices"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the media feature 'prefers-reduced-motion: reduce' indicate?",
    "topic": "Mobile-first design and media queries",
    "choices": [
      "The device has a slow processor and cannot animate",
      "The page should lower the frame rate of videos",
      "The user asked their system to minimise animation",
      "The user wants smaller image files"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does '@media (hover: hover)' help with?",
    "topic": "Mobile-first design and media queries",
    "choices": [
      "Applying hover styles only on devices whose primary input can really hover",
      "Making links highlight when keyboard focus lands on them from the Tab key",
      "Disabling hover effects for every pointing device including mice and trackpads",
      "Detecting whether the mouse moved at any point during the last second"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does '@media print' let you do?",
    "topic": "Mobile-first design and media queries",
    "choices": [
      "Preview the page at the size of a printer's paper in the browser",
      "Apply styles only when the page is printed or saved as a PDF",
      "Convert the layout into a fixed width of 800 pixels",
      "Block the page from being printed by the user"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a common problem with using max-width queries to style desktop-first?",
    "topic": "Mobile-first design and media queries",
    "choices": [
      "They are not supported on touch devices, so phones ignore the whole stylesheet",
      "They make the stylesheet load after the page content, so the layout flashes",
      "They disable browser zoom on phones, which fails accessibility checks for low vision",
      "Small screens must undo many desktop rules, which adds overrides and complexity"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which unit is safest for breakpoints so they respect users who increase their font size?",
    "topic": "Mobile-first design and media queries",
    "choices": [
      "em",
      "px",
      "vh",
      "%"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is it a mistake to hide content with display: none just on small screens to fit them?",
    "topic": "Mobile-first design and media queries",
    "choices": [
      "Mobile browsers ignore display: none in media queries",
      "Users on phones lose information or features that they may need",
      "It makes the page fail accessibility checks on all desktops",
      "It increases the number of HTTP requests the page makes"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does 'orientation: landscape' in a media query test?",
    "topic": "Mobile-first design and media queries",
    "choices": [
      "Whether the page is displayed inside an iframe",
      "Whether the device is a tablet rather than a phone",
      "Whether the user has rotated the page with CSS",
      "Whether the viewport is wider than it is tall"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What do container queries let a component do?",
    "topic": "Container queries and intrinsic layouts",
    "choices": [
      "Change its styles based on its container's size, not the viewport's",
      "Query the size of every ancestor element at once and merge the results into one",
      "Detect which element the user is hovering over and react to that element",
      "Resize the browser window so that it fits the component's content exactly"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What must be set on an element before its descendants can query it with @container?",
    "topic": "Container queries and intrinsic layouts",
    "choices": [
      "display: container",
      "position: relative",
      "overflow: hidden and a fixed width",
      "container-type, for example inline-size"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why are container queries useful for reusable components?",
    "topic": "Container queries and intrinsic layouts",
    "choices": [
      "They apply styles only when the user scrolls to the component",
      "They remove the need for any breakpoints in the entire site",
      "The same component adapts in a sidebar and in a wide main column",
      "They make components load without CSS files"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is an intrinsic layout?",
    "topic": "Container queries and intrinsic layouts",
    "choices": [
      "One where content and available space decide sizes, rather than fixed breakpoints",
      "One that cannot be changed by the visitor's zoom settings or font size preferences",
      "One that uses only pixel values for every size so the result never changes between screens",
      "One that the browser generates without any author CSS when the stylesheet is missing"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What do the keywords min-content and max-content represent?",
    "topic": "Container queries and intrinsic layouts",
    "choices": [
      "The smallest size without overflow and the preferred size without wrapping",
      "The minimum and the maximum width of the viewport at which the page may display",
      "The smallest and the largest font sizes that the browser supports on the device",
      "The sizes of the first and the last child element inside the container"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does aspect-ratio: 16 / 9 help layouts?",
    "topic": "Container queries and intrinsic layouts",
    "choices": [
      "The element keeps that shape as its width changes, which avoids layout shift for media",
      "It rotates the element automatically whenever the screen orientation changes on a phone",
      "It forces the whole screen into a widescreen format whenever the element is visible",
      "It crops the element's content to sixteen by nine pixels regardless of its real size"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does 'flex: 1 1 300px' with wrapping commonly achieve?",
    "topic": "Container queries and intrinsic layouts",
    "choices": [
      "Items that never wrap onto a new line but shrink until they are invisible",
      "Items that are exactly 300px wide on every screen without ever growing or shrinking",
      "Items about 300px wide that wrap onto new lines as space runs out",
      "Items that are limited to three hundred percent of the width of the container"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the :has() selector often used for in responsive components?",
    "topic": "Container queries and intrinsic layouts",
    "choices": [
      "Hiding elements that contain no text",
      "Selecting the element that has focus within the page",
      "Checking whether the browser supports a feature",
      "Styling a parent based on what its children contain"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does 'width: min(100%, 60ch)' do?",
    "topic": "Container queries and intrinsic layouts",
    "choices": [
      "Fills the container but never grows beyond about sixty characters",
      "Limits the element to sixty percent of the viewport width on every device",
      "Makes the element exactly sixty characters wide whatever the container size is",
      "Makes the element at least one hundred percent wide and no wider than the viewport"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why prefer logical properties such as margin-inline over margin-left?",
    "topic": "Container queries and intrinsic layouts",
    "choices": [
      "They apply to both inline and block elements without needing a display value",
      "They load faster than physical properties because browsers cache them differently",
      "They always add the same margin on both sides of the element in every layout",
      "They adapt automatically to writing direction, such as right-to-left languages"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the srcset attribute with width descriptors let the browser do?",
    "topic": "Responsive images and the viewport",
    "choices": [
      "Resize the image on the server for each request",
      "Load every listed image and show them in sequence",
      "Display a different image each time the page is refreshed",
      "Choose the most suitable image file for the device and layout size"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the purpose of the sizes attribute together with srcset?",
    "topic": "Responsive images and the viewport",
    "choices": [
      "It lists the screen sizes on which the image is not allowed to load at all",
      "It sets the exact height and width of the image in pixels for the layout engine",
      "It tells the browser how wide the image will be shown so it can pick a file",
      "It defines the size of the download buffer that the browser uses for the file"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When should you use the picture element instead of a plain img with srcset?",
    "topic": "Responsive images and the viewport",
    "choices": [
      "When you need different formats or art-directed crops for different conditions",
      "When the image must not be cached by the browser under any circumstances",
      "When you want the image to load faster than any img element could ever do",
      "When the page contains more than one image that has the same pixel dimensions"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why set width and height attributes on an img element?",
    "topic": "Responsive images and the viewport",
    "choices": [
      "It makes the image focusable with the keyboard for users of assistive technology",
      "It lets the image ignore any CSS sizing rules that are applied to the page",
      "It forces the browser to download the image at exactly that size from the server",
      "The browser can reserve space and avoid layout shift while the image loads"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does 'max-width: 100%; height: auto' on an image achieve?",
    "topic": "Responsive images and the viewport",
    "choices": [
      "The image stretches to the full height and width of its container and distorts",
      "The image is cropped to a perfect square whatever its original proportions are",
      "The image shrinks to fit its container while keeping its aspect ratio",
      "The image is never displayed larger than its own natural pixel size"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which image format is typically smaller than JPEG for photos with similar quality?",
    "topic": "Responsive images and the viewport",
    "choices": [
      "Uncompressed TIFF",
      "GIF",
      "AVIF or WebP",
      "BMP"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does loading='lazy' do on an image below the fold?",
    "topic": "Responsive images and the viewport",
    "choices": [
      "Loads the image only after the user clicks it",
      "Loads the image at a lower resolution permanently",
      "Skips the image when the connection is slow",
      "Delays loading until the image is near the viewport"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens on a mobile browser if the page has no viewport meta tag?",
    "topic": "Responsive images and the viewport",
    "choices": [
      "The page displays at double its normal size with a horizontal scrollbar",
      "The page renders at a desktop width and is then shrunk to fit the screen",
      "The page refuses to load until the viewport tag has been added to the head",
      "Media queries stop working and all of the stylesheet is ignored by the browser"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does 'object-fit: cover' do on an image in a fixed-size box?",
    "topic": "Responsive images and the viewport",
    "choices": [
      "Shrinks the image so it fits fully inside the box with empty space",
      "Stretches the image to fit the box exactly, distorting it",
      "Repeats the image until the box is full",
      "Scales and crops the image to fill the box while keeping its aspect ratio"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why shouldn't you lazy-load the main hero image at the top of the page?",
    "topic": "Responsive images and the viewport",
    "choices": [
      "Lazy loading is not allowed for images larger than one hundred kilobytes in size",
      "It causes the image to be blocked by the content security policy of the page",
      "It is likely the largest contentful paint, so delaying it makes the page feel slower",
      "Browsers ignore lazy loading on the first image of the page, so it has no effect"
    ],
    "answerIdx": 2
  }
]
```

LAYER: frontend-dev-4

```json
[
  {
    "stem": "What is the difference between let and var regarding scope?",
    "topic": "Variables, scope, closures and this",
    "choices": [
      "let is block-scoped, while var is function-scoped",
      "let can be redeclared in the same scope, while var cannot",
      "let is global, while var is local to its file",
      "let is function-scoped, while var is block-scoped"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens when you try to reassign a variable declared with const?",
    "topic": "Variables, scope, closures and this",
    "choices": [
      "A TypeError is thrown",
      "The assignment is ignored without any error",
      "The variable is converted to var",
      "The new value silently replaces the old one"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a closure?",
    "topic": "Variables, scope, closures and this",
    "choices": [
      "A variable that is private to the global object and hidden from every script",
      "A block of code that can no longer be modified once it has been executed",
      "A function that keeps access to the variables of the scope where it was created",
      "A function that closes the browser tab automatically when it has finished"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does this refer to inside a regular function called as obj.method()?",
    "topic": "Variables, scope, closures and this",
    "choices": [
      "The function itself",
      "The global object, always",
      "The parent function that defined it",
      "The object before the dot, obj"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do arrow functions treat this?",
    "topic": "Variables, scope, closures and this",
    "choices": [
      "They bind this to whichever object happens to call them at run time",
      "They always set this to undefined, even when called as a method",
      "They create a brand new this for every single call that is made",
      "They take this from the surrounding scope"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the temporal dead zone?",
    "topic": "Variables, scope, closures and this",
    "choices": [
      "The part of memory that stores variables the program no longer needs",
      "The time between a timer being set and the callback finally being fired",
      "The delay before a pending promise settles into a fulfilled or rejected state",
      "The span before a let or const line runs, where reading the variable throws"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does hoisting mean for function declarations?",
    "topic": "Variables, scope, closures and this",
    "choices": [
      "They run automatically when the script starts, before any other code",
      "They are only available after the page has completely finished loading",
      "They can be called before the line where they are written in the same scope",
      "They are moved into a separate file before the script starts to run"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A loop creates 3 buttons with 'for (var i = 0; i < 3; i++) { btn.onclick = () => console.log(i) }'. What do the handlers log after the loop?",
    "topic": "Variables, scope, closures and this",
    "choices": [
      "3 for every button, because they share one function-scoped variable",
      "An error, because i is out of scope",
      "undefined for every button",
      "0, 1 and 2 respectively, as each handler captures its own copy"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does 'use strict' change?",
    "topic": "Variables, scope, closures and this",
    "choices": [
      "It forces every variable to carry a type annotation before it can be used",
      "It turns some silent mistakes into errors, such as assigning to an undeclared variable",
      "It prevents the script from accessing the DOM or making any network requests",
      "It makes the script run faster by skipping the type checks that the engine does"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a function return when it has no return statement?",
    "topic": "Variables, scope, closures and this",
    "choices": [
      "0",
      "null",
      "an empty object",
      "undefined"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why do frontend frameworks prefer updating state by creating new objects instead of mutating them?",
    "topic": "Objects, arrays and immutable update patterns",
    "choices": [
      "The browser forbids changing objects after they are rendered",
      "Changes are detected cheaply by comparing references",
      "New objects use less memory than modified ones",
      "Mutating objects is a syntax error in modern JavaScript"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which expression creates a copy of object user with the name changed, leaving user unchanged?",
    "topic": "Objects, arrays and immutable update patterns",
    "choices": [
      "user.name = 'Ana'",
      "Object.assign(user, { name: 'Ana' })",
      "{ ...user, name: 'Ana' }",
      "user['name'] = 'Ana'"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the spread copy of an object do for nested objects?",
    "topic": "Objects, arrays and immutable update patterns",
    "choices": [
      "It copies only the top level, so nested objects are still shared by reference",
      "It throws an error whenever the object contains any other nested objects",
      "It converts the nested objects into strings before placing them in the copy",
      "It deep-copies every nested level automatically, including arrays and dates"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which method adds an item to an array without mutating the original?",
    "topic": "Objects, arrays and immutable update patterns",
    "choices": [
      "items[items.length] = newItem",
      "[...items, newItem]",
      "items.push(newItem)",
      "items.splice(items.length, 0, newItem)"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the result of 'const { a, ...rest } = { a: 1, b: 2, c: 3 }' for rest?",
    "topic": "Objects, arrays and immutable update patterns",
    "choices": [
      "{ a: 1, b: 2, c: 3 }",
      "{ b: 2, c: 3 }",
      "undefined",
      "[2, 3]"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does optional chaining 'user?.address?.city' return when address is undefined?",
    "topic": "Objects, arrays and immutable update patterns",
    "choices": [
      "null, since the missing address object is treated as an empty reference",
      "undefined, without throwing an error",
      "An empty string, so that the result can be displayed in the page directly",
      "A TypeError, because the city property cannot be read from a missing object"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the nullish coalescing operator 'a ?? b' return when a is 0?",
    "topic": "Objects, arrays and immutable update patterns",
    "choices": [
      "NaN, because the operator tries to combine the two operands numerically",
      "undefined, because the left side is a number rather than an object value",
      "0, because only null and undefined trigger the fallback",
      "b, because the value 0 counts as falsy and so the fallback value is used"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does Object.freeze(obj) do?",
    "topic": "Objects, arrays and immutable update patterns",
    "choices": [
      "Makes the object and all nested objects permanently read-only",
      "Prevents adding, removing or changing the object's own properties, shallowly",
      "Copies the object so the original stays editable",
      "Removes the object from memory"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you check that a value is an array?",
    "topic": "Objects, arrays and immutable update patterns",
    "choices": [
      "Array.isArray(value)",
      "value.type === 'array'",
      "value instanceof Object",
      "typeof value === 'array'"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why use structuredClone(obj) instead of a spread copy for a nested object?",
    "topic": "Objects, arrays and immutable update patterns",
    "choices": [
      "It copies functions and class instances perfectly, keeping their methods and prototypes",
      "It always runs faster than a spread copy, whatever the size of the object is",
      "It deep-copies nested data, so editing the copy does not touch the original",
      "It is the only way to copy an array in modern JavaScript without using a loop"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does 'items.map(x => x * 2)' return?",
    "topic": "Array methods: map, filter, reduce and destructuring",
    "choices": [
      "undefined",
      "A new array with each element doubled",
      "The original array with each element doubled in place",
      "The sum of all the doubled elements"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does 'items.filter(x => x > 2)' return?",
    "topic": "Array methods: map, filter, reduce and destructuring",
    "choices": [
      "The count of elements greater than 2",
      "The first element greater than 2",
      "A boolean telling whether any element is greater than 2",
      "A new array with only the elements greater than 2"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does 'items.reduce((sum, x) => sum + x, 0)' compute?",
    "topic": "Array methods: map, filter, reduce and destructuring",
    "choices": [
      "The number of elements in the array",
      "A new array of cumulative values",
      "The largest element in the array",
      "The sum of all elements, starting from 0"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which method returns the first element matching a condition?",
    "topic": "Array methods: map, filter, reduce and destructuring",
    "choices": [
      "some",
      "filter",
      "find",
      "includes"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does 'items.some(x => x < 0)' return?",
    "topic": "Array methods: map, filter, reduce and destructuring",
    "choices": [
      "The first negative element",
      "A new array of the negative elements",
      "true only if all elements are negative",
      "true if at least one element is negative"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does 'const [first, , third] = list' assign?",
    "topic": "Array methods: map, filter, reduce and destructuring",
    "choices": [
      "The first element and the remaining elements as an array",
      "The first and third elements, skipping the second",
      "The first and last elements",
      "The first, second and third elements to three variables"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does 'const { title = 'Untitled' } = post' do when post.title is undefined?",
    "topic": "Array methods: map, filter, reduce and destructuring",
    "choices": [
      "Uses the default value 'Untitled'",
      "Throws an error because title is missing",
      "Sets title to null",
      "Leaves title undeclared"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which array method changes the original array in place?",
    "topic": "Array methods: map, filter, reduce and destructuring",
    "choices": [
      "concat",
      "map",
      "slice",
      "sort"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does 'items.slice(1, 3)' return?",
    "topic": "Array methods: map, filter, reduce and destructuring",
    "choices": [
      "The elements at indexes 1, 2 and 3, removed from the original",
      "A string joining the elements",
      "The elements at indexes 1 and 3 only",
      "A new array with the elements at indexes 1 and 2"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is forEach not suitable when you want a new transformed array?",
    "topic": "Array methods: map, filter, reduce and destructuring",
    "choices": [
      "It returns undefined instead of building a new array",
      "It cannot be used on arrays larger than 100 items",
      "It only works on arrays of strings",
      "It changes the array order randomly"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the event loop do?",
    "topic": "The event loop, promises and async/await",
    "choices": [
      "Checks the code for syntax errors before any of it is allowed to run",
      "Runs JavaScript code on several threads at the same time inside the tab",
      "Pauses the script until every pending promise in the program is resolved",
      "Takes queued callbacks and runs them on the call stack once it is empty"
    ],
    "answerIdx": 3
  },
  {
    "stem": "In what order do these log? console.log(1); setTimeout(() => console.log(2), 0); Promise.resolve().then(() => console.log(3)); console.log(4);",
    "topic": "The event loop, promises and async/await",
    "choices": [
      "1, 4, 3, 2",
      "1, 3, 4, 2",
      "1, 4, 2, 3",
      "1, 2, 3, 4"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why does a long synchronous loop freeze the page?",
    "topic": "The event loop, promises and async/await",
    "choices": [
      "Browsers disable rendering for the whole tab while any loop is running in it",
      "Loops are always executed on the graphics processor, which then stops drawing",
      "JavaScript runs on one main thread, so rendering and events wait until it ends",
      "The loop sends too many requests to the server, which blocks the connection"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does an async function always return?",
    "topic": "The event loop, promises and async/await",
    "choices": [
      "The value written in its return statement",
      "A promise",
      "A callback function",
      "undefined"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does await do inside an async function?",
    "topic": "The event loop, promises and async/await",
    "choices": [
      "Runs the promise on a separate thread so that it finishes sooner",
      "Cancels the promise automatically if it takes longer than a few seconds",
      "Pauses that function until the promise settles, without blocking the main thread",
      "Blocks the whole page and every other script until the promise settles"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens if a promise in an await expression rejects and there is no try/catch?",
    "topic": "The event loop, promises and async/await",
    "choices": [
      "The page reloads automatically so that the user can try the action again",
      "The async function's returned promise rejects with that error",
      "The await expression returns undefined and the error goes to the console",
      "The error is ignored and the function carries on with the next statement"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does Promise.all([a, b, c]) do?",
    "topic": "The event loop, promises and async/await",
    "choices": [
      "Resolves with all results once every promise resolves, or rejects if any one rejects",
      "Resolves as soon as the first promise in the list has resolved successfully",
      "Resolves with only the successful results and quietly ignores any failures",
      "Runs the promises one after another in the order they appear in the array"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does Promise.allSettled differ from Promise.all?",
    "topic": "The event loop, promises and async/await",
    "choices": [
      "It runs the promises in sequence instead of running them in parallel",
      "It retries every rejected promise automatically before it reports a result",
      "It waits for every promise and reports each outcome, even rejections",
      "It resolves as soon as the first promise in the list has settled either way"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is wrong with 'await' inside a for loop when the requests are independent?",
    "topic": "The event loop, promises and async/await",
    "choices": [
      "The loop will never finish, because await blocks the event loop completely",
      "Await is not allowed inside any loop, so the code throws a syntax error",
      "The results come back in a random order that cannot be controlled",
      "Requests run one after another instead of in parallel, which is slower"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the difference between a microtask and a macrotask queue?",
    "topic": "The event loop, promises and async/await",
    "choices": [
      "Both queues run at the same time on separate threads inside the browser",
      "Microtasks only run when the page is idle and nothing else is waiting to run",
      "Microtasks are the queue for timers and macrotasks are the queue for promises",
      "Promise callbacks run as microtasks, before the next timer or event task"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When does fetch() reject its promise?",
    "topic": "Fetching data and handling errors",
    "choices": [
      "On network failure, not on an HTTP error status like 404",
      "On any HTTP status of 400 or higher",
      "Only when the server returns invalid JSON",
      "Whenever the response takes longer than 5 seconds"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you detect an HTTP error response after fetch()?",
    "topic": "Fetching data and handling errors",
    "choices": [
      "Read the console for a warning",
      "Call response.error()",
      "Check response.ok or response.status",
      "Wrap the fetch call in a try/catch only"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which call reads a JSON body from a fetch response?",
    "topic": "Fetching data and handling errors",
    "choices": [
      "JSON.parse(response)",
      "response.data",
      "await response.json()",
      "response.body.parse()"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can you cancel a fetch request that is no longer needed?",
    "topic": "Fetching data and handling errors",
    "choices": [
      "Set the request's timeout to 0",
      "Pass an AbortController signal and call abort()",
      "Call fetch.cancel() on the promise",
      "Delete the promise variable"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the purpose of the Content-Type header when sending JSON in a POST request?",
    "topic": "Fetching data and handling errors",
    "choices": [
      "It sets the maximum body size",
      "It encrypts the body before sending",
      "It tells the server how to interpret the body",
      "It chooses which server will handle the request"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should you handle a loading state and an error state when fetching data for the UI?",
    "topic": "Fetching data and handling errors",
    "choices": [
      "Fetch automatically retries failed requests so errors are rare",
      "Browsers hide pages while a request is pending",
      "The request can be slow or fail, and users need feedback for both",
      "Errors are only possible on mobile networks"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the JSON.parse function throw when the text is not valid JSON?",
    "topic": "Fetching data and handling errors",
    "choices": [
      "It returns an empty object",
      "A TypeError",
      "It returns null",
      "A SyntaxError"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A race condition occurs when a slow earlier request resolves after a newer one. How do you prevent stale data from being shown?",
    "topic": "Fetching data and handling errors",
    "choices": [
      "Abort the older request or ignore its result",
      "Wait for the older request to finish before sending any others",
      "Use synchronous requests",
      "Send requests only once per page load"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the CORS error 'blocked by CORS policy' mean?",
    "topic": "Fetching data and handling errors",
    "choices": [
      "The request used the wrong HTTP method for the address you called",
      "The server did not allow requests from your page's origin",
      "The response was too large for the browser to keep in memory",
      "Your internet connection is down, so the request could not reach the server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which fetch option is needed to send cookies with a cross-origin request?",
    "topic": "Fetching data and handling errors",
    "choices": [
      "credentials: 'include'",
      "mode: 'cookies'",
      "cache: 'no-store'",
      "headers: { Cookie: 'all' }"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does an ES module file expose a function to other files?",
    "topic": "ES modules: import, export and dynamic import",
    "choices": [
      "With the export keyword",
      "By assigning it to window",
      "By returning it at the end of the file",
      "By naming the file index.js"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does 'import { add } from './math.js'' do?",
    "topic": "ES modules: import, export and dynamic import",
    "choices": [
      "Imports the default export under the name add",
      "Imports the named export add from math.js",
      "Imports every export from math.js",
      "Runs math.js without importing anything"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How many default exports can a module have?",
    "topic": "ES modules: import, export and dynamic import",
    "choices": [
      "As many as needed",
      "One",
      "Two",
      "None, default exports are not allowed"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does dynamic import() return?",
    "topic": "ES modules: import, export and dynamic import",
    "choices": [
      "A callback",
      "The module object immediately",
      "undefined",
      "A promise for the module"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why use dynamic import for a rarely used page or feature?",
    "topic": "ES modules: import, export and dynamic import",
    "choices": [
      "It makes the module run faster once loaded",
      "It lets the module access private variables of the importer",
      "The code is only downloaded when it is needed, reducing the initial bundle",
      "It prevents the module from being cached"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do ES modules differ from classic scripts regarding scope?",
    "topic": "ES modules: import, export and dynamic import",
    "choices": [
      "Each module has its own scope, so top-level variables are not global",
      "Modules cannot declare top-level variables, only functions and classes",
      "Modules run in a separate thread, so they cannot see the page's variables",
      "All modules share a single global scope, just like classic scripts do"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How is a module script included in HTML?",
    "topic": "ES modules: import, export and dynamic import",
    "choices": [
      "<script module='true' src='main.js'></script>",
      "<script src='main.js' import></script>",
      "<module src='main.js'></module>",
      "<script type='module' src='main.js'></script>"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is tree shaking?",
    "topic": "ES modules: import, export and dynamic import",
    "choices": [
      "Sorting imports alphabetically",
      "Removing exports that are never imported when bundling",
      "Splitting a file into smaller files at build time",
      "Detecting circular imports at runtime"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What problem can circular imports cause?",
    "topic": "ES modules: import, export and dynamic import",
    "choices": [
      "A module may be used before it has finished initialising",
      "Both modules run twice",
      "The imports are silently converted to dynamic imports",
      "The browser refuses to download either file"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Does a module run again each time another file imports it?",
    "topic": "ES modules: import, export and dynamic import",
    "choices": [
      "Yes, once per import statement",
      "Only when it has a default export",
      "No, it is evaluated once and the result is shared",
      "Yes, but only in development builds"
    ],
    "answerIdx": 2
  }
]
```

LAYER: frontend-dev-5

```json
[
  {
    "stem": "Which method returns the first element in the document that matches a CSS selector?",
    "topic": "Selecting, creating and updating DOM nodes",
    "choices": [
      "document.findElement(selector)",
      "document.selectFirst(selector)",
      "document.querySelector(selector)",
      "document.getElementByCss(selector)"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does document.querySelectorAll('li') return?",
    "topic": "Selecting, creating and updating DOM nodes",
    "choices": [
      "A live HTMLCollection that updates automatically as list items are added",
      "A static NodeList of every matching element at the time of the call",
      "A plain JavaScript array of element copies detached from the page",
      "Only the first matching element, wrapped in an array"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is textContent safer than innerHTML for inserting text typed by a user?",
    "topic": "Selecting, creating and updating DOM nodes",
    "choices": [
      "textContent automatically strips all characters that are not letters or digits",
      "innerHTML escapes angle brackets, but textContent leaves them untouched",
      "textContent inserts the string as plain text, so it cannot inject markup or scripts",
      "innerHTML is slower to parse but otherwise equally safe for any untrusted string"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you create a list item and add it to an existing list element?",
    "topic": "Selecting, creating and updating DOM nodes",
    "choices": [
      "Assign the element object to list.innerHTML so the browser inserts it",
      "Call document.createElement('li'), then list.append(item)",
      "Call item.appendTo(list) on the new element object",
      "Call document.write(item) after the page has finished loading"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does element.classList.toggle('open') do?",
    "topic": "Selecting, creating and updating DOM nodes",
    "choices": [
      "Adds the class and removes it again after one animation frame",
      "Adds the class when it is missing and removes it when it is present",
      "Replaces every class on the element with the single class open",
      "Returns true if any class exists on the element without changing it"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does element.dataset.userId read?",
    "topic": "Selecting, creating and updating DOM nodes",
    "choices": [
      "The value stored in localStorage under the key userId",
      "The value of a property named userId defined by HTML for every element",
      "The id attribute of the element converted into camel case",
      "The value of the data-user-id attribute on the element"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why can reading element.offsetHeight right after changing a style be slow?",
    "topic": "Selecting, creating and updating DOM nodes",
    "choices": [
      "It forces the browser to recalculate layout immediately, which is called a reflow",
      "It pauses JavaScript until the user next interacts with the page",
      "It copies the entire DOM subtree before it returns the number",
      "It makes the browser download the element's image again from the network"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does element.remove() differ from parent.removeChild(element)?",
    "topic": "Selecting, creating and updating DOM nodes",
    "choices": [
      "removeChild() works on text nodes but not on elements",
      "remove() does not need a reference to the parent",
      "remove() only hides the element, while removeChild() deletes it from memory",
      "They are different names for exactly the same call with no differences"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does node.cloneNode(true) do?",
    "topic": "Selecting, creating and updating DOM nodes",
    "choices": [
      "Copies the node and its descendants, but not listeners added with addEventListener",
      "Copies the node together with every event listener that is attached to it",
      "Moves the node to a new parent so that nothing remains in the old place",
      "Copies only the node itself, leaving its children out of the copy entirely"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which technique reduces layout work when inserting many new elements?",
    "topic": "Selecting, creating and updating DOM nodes",
    "choices": [
      "Append each new element to the page separately inside a setTimeout loop",
      "Build them in a DocumentFragment and append that fragment once",
      "Call document.write once for each element as it is created",
      "Reassign innerHTML on the container repeatedly in a loop"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is event bubbling?",
    "topic": "Events, bubbling and event delegation",
    "choices": [
      "The event is copied and delivered to every element on the page at once",
      "The event travels from the document down to the target before it fires",
      "The event travels from the target element up through its ancestors",
      "The event repeats until a handler returns false"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is event delegation?",
    "topic": "Events, bubbling and event delegation",
    "choices": [
      "Copying the same handler onto each of the child elements when the page loads",
      "Attaching one listener to a parent and handling its children via event.target",
      "Replacing addEventListener calls with inline onclick attributes in the markup",
      "Passing every event to a web worker so that the main thread stays free"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does event.preventDefault() do for a submit event on a form?",
    "topic": "Events, bubbling and event delegation",
    "choices": [
      "Stops the event from bubbling up to the parent elements of the form",
      "Stops other listeners on the same element from running afterwards",
      "Removes the event listener once it has finished running",
      "Stops the browser's default action, which would be to send the form"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does event.stopPropagation() do?",
    "topic": "Events, bubbling and event delegation",
    "choices": [
      "Delays the event until the next animation frame has been drawn",
      "Removes all of the listeners from the element that is the target",
      "Cancels the browser's default action that belongs to the event",
      "Stops the event from reaching other elements along its path"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the difference between event.target and event.currentTarget?",
    "topic": "Events, bubbling and event delegation",
    "choices": [
      "They always refer to the same element in every event",
      "target is a copy of currentTarget created for each listener",
      "target is the element that fired the event, currentTarget is the one the running listener is attached to",
      "target is the element the listener is attached to, currentTarget is the element that fired the event"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why mark a scroll or touch listener as passive: true?",
    "topic": "Events, bubbling and event delegation",
    "choices": [
      "It stops the event from bubbling up to the parent elements of the target",
      "It promises not to call preventDefault, so scrolling can stay smooth",
      "It lets the handler keep running after the page has already been unloaded",
      "It makes the handler run on a background thread that the browser manages"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you remove a listener added with addEventListener?",
    "topic": "Events, bubbling and event delegation",
    "choices": [
      "Call removeEventListener with the same type and the same function reference",
      "Call removeEventListener with an equivalent new inline arrow function",
      "Set the element's onclick property to null",
      "Call stopPropagation inside the handler itself"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the option { once: true } do in addEventListener?",
    "topic": "Events, bubbling and event delegation",
    "choices": [
      "Runs the listener only for the first matching element on the page",
      "Stops the event from firing more than once per second",
      "Makes the listener run before any other listeners on the element",
      "Removes the listener automatically after it has run one time"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which event fires on every change to a text input's value as the user types?",
    "topic": "Events, bubbling and event delegation",
    "choices": [
      "blur",
      "input",
      "keypress",
      "change"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the capture phase of event dispatch do?",
    "topic": "Events, bubbling and event delegation",
    "choices": [
      "The event is delivered only to the element that was actually clicked on",
      "The event is recorded in a log so that it can be replayed at a later time",
      "The event travels from the root down to the target before bubbling back",
      "The event is cancelled whenever any of the ancestors has a listener"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you read every named field of a form as key-value pairs?",
    "topic": "Forms, validation and the FormData API",
    "choices": [
      "formElement.getValues()",
      "Object.entries(formElement)",
      "document.formData(formElement)",
      "new FormData(formElement)"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does checkValidity() return on a form control?",
    "topic": "Forms, validation and the FormData API",
    "choices": [
      "true when the control satisfies all of its validation constraints",
      "The text of the first validation error message for the control",
      "The number of constraints that the control currently fails",
      "A promise that resolves once the server has validated the value"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you set a custom validation message on an input?",
    "topic": "Forms, validation and the FormData API",
    "choices": [
      "input.invalidMessage('message')",
      "input.setCustomValidity('message')",
      "input.setError('message')",
      "input.validationMessage = 'message'"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should a submit handler that uses fetch call event.preventDefault()?",
    "topic": "Forms, validation and the FormData API",
    "choices": [
      "Otherwise fetch is not able to read any of the values from the form fields",
      "Otherwise the request gets sent two times with exactly the same headers",
      "Otherwise the browser also does a full-page form submission and navigates",
      "Otherwise the validation attributes on the individual fields stop working"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which event fires when a form is submitted, including by pressing Enter inside a field?",
    "topic": "Forms, validation and the FormData API",
    "choices": [
      "submit",
      "keydown on the form",
      "click on the form",
      "change on the form"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the novalidate attribute on a form do?",
    "topic": "Forms, validation and the FormData API",
    "choices": [
      "Turns off built-in browser validation on submit so your code can handle it",
      "Prevents the form from being submitted at all until the attribute is removed",
      "Marks every field as optional for the server that receives the form data",
      "Disables autofill suggestions for each of the fields in the form"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the :invalid pseudo-class match?",
    "topic": "Forms, validation and the FormData API",
    "choices": [
      "Elements that contain a syntax error in one of their attributes",
      "Controls whose data the server has rejected after submission",
      "Controls that the user has focused after an error was shown",
      "Form controls whose value fails their validation constraints"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you send a file chosen in an input of type file using fetch?",
    "topic": "Forms, validation and the FormData API",
    "choices": [
      "Convert the file to JSON with JSON.stringify and send the result",
      "Put the file's name in the URL as a query parameter",
      "Send it in a request header named File",
      "Append it to a FormData object and send that as the body"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why must the server validate input even if the client already does?",
    "topic": "Forms, validation and the FormData API",
    "choices": [
      "Browsers remove client-side validation when the form is posted",
      "The HTML specification requires every server to repeat the checks",
      "Client checks can be bypassed, so the server must not trust them",
      "Client validation runs only after the request has been sent"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the name attribute of an input determine for FormData?",
    "topic": "Forms, validation and the FormData API",
    "choices": [
      "The order in which the fields are sent to the server",
      "The id that a label's for attribute points to",
      "The label that screen readers announce for the field",
      "The key under which the field's value is stored"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How long does data in localStorage persist?",
    "topic": "Web Storage, cookies and IndexedDB",
    "choices": [
      "Until the user or the site clears it",
      "Until the page is reloaded for the next time",
      "Until the browser tab is closed by the user",
      "For twenty-four hours, then the browser clears it automatically"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How long does data in sessionStorage persist?",
    "topic": "Web Storage, cookies and IndexedDB",
    "choices": [
      "For the lifetime of the browser tab",
      "For seven days by default unless the user clears it",
      "Across every tab until the whole browser is closed",
      "Until the session on the server expires from inactivity"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What kind of values can localStorage store?",
    "topic": "Web Storage, cookies and IndexedDB",
    "choices": [
      "Binary data only, encoded as array buffers",
      "Any JavaScript value, including functions and objects",
      "Strings and numbers, but not booleans or null",
      "Strings only, so objects must be converted with JSON.stringify"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is localStorage a poor place to keep an authentication token?",
    "topic": "Web Storage, cookies and IndexedDB",
    "choices": [
      "It can only hold numbers, so tokens would not fit",
      "The browser deletes it automatically after one hour of inactivity",
      "It is sent with every request to every website the user visits",
      "Any script running on the page can read it, so an XSS bug could steal it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the HttpOnly cookie attribute do?",
    "topic": "Web Storage, cookies and IndexedDB",
    "choices": [
      "Allows the cookie to be shared between a site and its subdomains",
      "Hides the cookie from JavaScript running on the page",
      "Makes the cookie travel only over HTTP and never over HTTPS",
      "Deletes the cookie as soon as the browser tab is closed"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the Secure cookie attribute do?",
    "topic": "Web Storage, cookies and IndexedDB",
    "choices": [
      "It stops the cookie from being sent to other websites",
      "The cookie is only sent over HTTPS connections",
      "It encrypts the cookie value inside the browser's storage",
      "It prevents JavaScript from reading the cookie value"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does SameSite=Lax help protect against?",
    "topic": "Web Storage, cookies and IndexedDB",
    "choices": [
      "Sharing cookies between a site and its own subdomains in the same browser",
      "Cross-site request forgery, by limiting cookies on cross-site requests",
      "Cookies expiring while the user is still actively using the site in a tab",
      "Cookie theft by scripts that have been injected into the page by an attacker"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When is IndexedDB a better choice than localStorage?",
    "topic": "Web Storage, cookies and IndexedDB",
    "choices": [
      "For values that must never be reachable from JavaScript",
      "For data that must be sent automatically with every request",
      "For large or structured data that should be accessed asynchronously",
      "For tiny strings that must be read synchronously while rendering"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which event notifies other tabs when localStorage changes?",
    "topic": "Web Storage, cookies and IndexedDB",
    "choices": [
      "message",
      "change",
      "storage",
      "sync"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens when localStorage.setItem exceeds the storage quota?",
    "topic": "Web Storage, cookies and IndexedDB",
    "choices": [
      "It compresses the data so that it fits within the quota",
      "It silently deletes the oldest key to make room",
      "It throws an error that your code should handle",
      "It writes the value to sessionStorage instead"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is an IntersectionObserver used for?",
    "topic": "Intersection and Resize observers",
    "choices": [
      "Tracking changes to the text content that is inside an element over time",
      "Detecting when an element enters or leaves the viewport",
      "Measuring how long a user has been staying on the current page",
      "Observing the network requests that are made by the scripts on the page"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is IntersectionObserver preferred over a scroll listener for lazy loading?",
    "topic": "Intersection and Resize observers",
    "choices": [
      "It forces images to be downloaded at a lower resolution than they normally are",
      "It works only for images and cannot be used to watch any other kind of element",
      "It removes the need to set the width and height on every image element",
      "It reports visibility asynchronously, without code running on every scroll event"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a ResizeObserver report?",
    "topic": "Intersection and Resize observers",
    "choices": [
      "Changes to the zoom level of the page and nothing else",
      "Changes to the number of child elements in the container",
      "Changes to the position of the browser window on the screen",
      "Changes to the size of an observed element"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a MutationObserver watch?",
    "topic": "Intersection and Resize observers",
    "choices": [
      "Changes to the DOM tree, such as added nodes or changed attributes",
      "Changes to the network connection of the device",
      "Changes to the values of JavaScript variables in the page",
      "Changes to the URL and to the browser history entries"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the threshold option of an IntersectionObserver control?",
    "topic": "Intersection and Resize observers",
    "choices": [
      "How much of the target must be visible before the callback runs",
      "How many milliseconds the target must remain visible",
      "The largest number of targets that can be observed at once",
      "The distance in pixels that the page must be scrolled first"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does rootMargin do in an IntersectionObserver?",
    "topic": "Intersection and Resize observers",
    "choices": [
      "Limits the observer so that it only watches a specific part of the page",
      "Sets the margin of the body element at the moment that the observer starts",
      "Adds visible spacing around the observed element in the layout of the page",
      "Grows or shrinks the root's box, so callbacks trigger sooner or later"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you stop an observer from watching one element?",
    "topic": "Intersection and Resize observers",
    "choices": [
      "element.unobserve()",
      "observer.remove(element)",
      "observer.stop(element)",
      "observer.unobserve(element)"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How is infinite scroll typically built with IntersectionObserver?",
    "topic": "Intersection and Resize observers",
    "choices": [
      "Observe a sentinel element after the last item and load more when it becomes visible",
      "Load all of the items at once and hide the ones that are off screen",
      "Poll the server every second to check whether the user is near the end",
      "Attach a scroll listener that measures the page height on every pixel"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which API runs code just before the next repaint, which suits smooth animation?",
    "topic": "Intersection and Resize observers",
    "choices": [
      "setInterval with sixteen milliseconds",
      "setTimeout with zero delay",
      "requestAnimationFrame",
      "requestIdleCallback"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does requestIdleCallback do?",
    "topic": "Intersection and Resize observers",
    "choices": [
      "Runs a function after a fixed delay that you choose",
      "Runs a function in a separate web worker thread",
      "Runs a function immediately before the next frame is painted",
      "Runs a function when the browser has spare time, for low-priority work"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does history.pushState do?",
    "topic": "History API and client-side navigation",
    "choices": [
      "Replaces the current entry without adding a new one",
      "Reloads the page using the new URL that is passed to it",
      "Adds a history entry and changes the URL without reloading the page",
      "Sends the new URL to the server for it to be logged"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does history.replaceState differ from pushState?",
    "topic": "History API and client-side navigation",
    "choices": [
      "It changes the current entry rather than adding a new entry",
      "It can only change the hash portion of the URL and nothing else",
      "It deletes the complete history of the current tab when it is called",
      "It reloads the page from the server, while pushState does not reload it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which event fires when the user navigates back to an entry created with pushState?",
    "topic": "History API and client-side navigation",
    "choices": [
      "hashchange",
      "popstate",
      "pagehide",
      "beforeunload"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Does calling history.pushState fire a popstate event?",
    "topic": "History API and client-side navigation",
    "choices": [
      "Yes, it fires immediately after the call completes",
      "No, popstate fires only when the user navigates to an entry",
      "Only when the state object passed to it is not null",
      "Yes, but only in browsers that have no back button"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What must the server do for a single-page app that uses clean URLs with the History API?",
    "topic": "History API and client-side navigation",
    "choices": [
      "Return index.html for unknown paths so deep links and refreshes work",
      "Redirect every single path to the home page using a 301 status code",
      "Reject requests for paths that do not match real files on the disk",
      "Serve a different JavaScript bundle for each of the routes of the app"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens to the hash part of a URL, such as #section, when the browser requests a page?",
    "topic": "History API and client-side navigation",
    "choices": [
      "It is sent to the server as a query string",
      "It selects which route the server should run",
      "It is never sent to the server",
      "It is sent only for POST requests"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which link behaviour must a client-side router preserve to feel like normal navigation?",
    "topic": "History API and client-side navigation",
    "choices": [
      "Reloading the full page on every click",
      "Disabling the browser's back button inside the app",
      "Opening in a new tab with a modifier key or middle click",
      "Hiding the destination URL from the user"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should a single-page app update the document title and move focus after a route change?",
    "topic": "History API and client-side navigation",
    "choices": [
      "So assistive technology users can tell that the page has changed",
      "Because browsers refuse to change the URL without a new title",
      "To stop the router from firing popstate twice",
      "To force the browser to clear its HTTP cache"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does URLSearchParams do?",
    "topic": "History API and client-side navigation",
    "choices": [
      "Parses and builds the query string of a URL",
      "Searches the page for text matching the URL",
      "Encodes a form's fields as multipart data",
      "Validates that the domain name of a URL exists"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the state object passed to pushState used for?",
    "topic": "History API and client-side navigation",
    "choices": [
      "A list of scripts that run whenever the user navigates",
      "A snapshot of the DOM at the moment the entry was added",
      "Data tied to the history entry that is returned when popstate fires",
      "Data sent to the server with the next request that the page makes"
    ],
    "answerIdx": 2
  }
]
```

LAYER: frontend-dev-6

```json
[
  {
    "stem": "What type does TypeScript infer for 'const count = 5'?",
    "topic": "Primitive, object and array types; type inference",
    "choices": [
      "The literal type 5, because a const cannot change",
      "unknown, until the value is checked",
      "any, because no annotation was written",
      "number, because every numeric literal widens to number"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What type does TypeScript infer for 'let count = 5'?",
    "topic": "Primitive, object and array types; type inference",
    "choices": [
      "Number, the wrapper object type",
      "The literal type 5, which can never be reassigned",
      "number",
      "any, because let allows reassignment of other types"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which annotation correctly describes an array of strings?",
    "topic": "Primitive, object and array types; type inference",
    "choices": [
      "array<string>",
      "string{}",
      "[string]",
      "string[]"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the difference between 'string' and 'String' in TypeScript?",
    "topic": "Primitive, object and array types; type inference",
    "choices": [
      "string holds text, while String holds a single character",
      "They are identical and can be swapped freely in annotations",
      "string is the primitive type to use, while String is the wrapper object type",
      "String is the primitive type to use, while string is the wrapper object type"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where should you usually add explicit type annotations?",
    "topic": "Primitive, object and array types; type inference",
    "choices": [
      "Only on classes, since functions are always inferred by the compiler",
      "On every local variable, because type inference is not reliable enough",
      "Nowhere in the code, because annotations are ignored at runtime",
      "On function parameters and exported values, letting inference cover locals"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the type of a function that returns nothing look like?",
    "topic": "Primitive, object and array types; type inference",
    "choices": [
      "() => empty",
      "() => null",
      "() => void",
      "() => undefined | never"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does an optional property 'age?: number' in an object type mean?",
    "topic": "Primitive, object and array types; type inference",
    "choices": [
      "The property is present but cannot be read",
      "The property must be present but may hold null",
      "The property is a number only when the object is frozen",
      "The property may be missing, so its type is number | undefined"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How is a tuple type like [string, number] different from (string | number)[]?",
    "topic": "Primitive, object and array types; type inference",
    "choices": [
      "A tuple fixes length and the type at each position",
      "A tuple can only be used for function arguments",
      "A tuple is a readonly copy of the array type",
      "A tuple allows any length, but only strings and numbers in any order"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the 'readonly' modifier on a property do?",
    "topic": "Primitive, object and array types; type inference",
    "choices": [
      "Stops assignments to the property in type-checked code",
      "Freezes the value at runtime with Object.freeze",
      "Makes the property invisible to JSON.stringify",
      "Prevents the property from being deleted at runtime"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between 'type' aliases and 'interface' for object shapes?",
    "topic": "Primitive, object and array types; type inference",
    "choices": [
      "Interfaces merge when declared twice, while type aliases cannot",
      "Type aliases exist at runtime, while interfaces are erased by the compiler",
      "Interfaces can describe unions of types, while type aliases cannot",
      "Type aliases can only describe primitive types and never object shapes"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does 'string | number' mean?",
    "topic": "Unions, intersections and literal types",
    "choices": [
      "A value that is both a string and a number at once",
      "A value that can be converted into either type automatically",
      "A value that is either a string or a number",
      "A value that must be a string unless it is empty"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the intersection type 'A & B' describe?",
    "topic": "Unions, intersections and literal types",
    "choices": [
      "Only the properties that A and B have in common",
      "A value that is either A or B",
      "A value that can be converted between A and B",
      "A value with all the members of both A and B"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which type restricts a variable to exactly three allowed strings?",
    "topic": "Unions, intersections and literal types",
    "choices": [
      "enum string",
      "string[3]",
      "'idle' | 'loading' | 'error'",
      "Exclude<string, 'other'>"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does 'as const' do to an object literal?",
    "topic": "Unions, intersections and literal types",
    "choices": [
      "Converts the object to a class instance",
      "Widens every property type to its general primitive",
      "Freezes the object at runtime so changes throw errors",
      "Makes properties readonly with literal types"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does 'typeof user' mean in a type position?",
    "topic": "Unions, intersections and literal types",
    "choices": [
      "The string 'object' or 'string' at runtime",
      "The static type of the value user",
      "A check that runs when the program executes",
      "The class that user was created from"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does 'keyof Person' produce for the type { name: string; age: number }?",
    "topic": "Unions, intersections and literal types",
    "choices": [
      "The union 'name' | 'age'",
      "The tuple ['name', 'age']",
      "The type of the first property",
      "The union string | number"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why are string literal unions often preferred to enums for small sets of values?",
    "topic": "Unions, intersections and literal types",
    "choices": [
      "They always run faster than enums in loops",
      "They are required by the JavaScript specification",
      "They are erased at compile time and need no runtime object",
      "They allow values to be added at runtime"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does 'T | undefined' force the caller to do before using the value?",
    "topic": "Unions, intersections and literal types",
    "choices": [
      "Handle the undefined case first",
      "Assert the value with a double bang",
      "Wrap the call in try/catch",
      "Convert the value to a string"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the 'never' type represent?",
    "topic": "Unions, intersections and literal types",
    "choices": [
      "A value that is optional and may be left out when an object is created",
      "A value that cannot occur, such as the result of a function that always throws",
      "Any value at all, which makes it a synonym for the unknown type",
      "A value that has not been assigned yet but will be set before it is first read"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the 'satisfies' operator do?",
    "topic": "Unions, intersections and literal types",
    "choices": [
      "Makes a type compatible with each of the subtypes it has",
      "Adds runtime validation for the type that is named after it",
      "Casts a value to the given type without checking it at all",
      "Checks a value against a type without widening its inferred type"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is narrowing in TypeScript?",
    "topic": "Narrowing and discriminated unions",
    "choices": [
      "Refining a broad type into a narrower one using checks in code",
      "Removing the unused properties from an object type to make it smaller",
      "Reducing the size of the compiled JavaScript that is sent to users",
      "Converting a value into a smaller numeric type such as an int"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which check narrows 'value: string | number' to string?",
    "topic": "Narrowing and discriminated unions",
    "choices": [
      "Boolean(value) === true",
      "value instanceof string",
      "value.type === 'string'",
      "typeof value === 'string'"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does TypeScript narrow with 'if (user)' when user is User | null?",
    "topic": "Narrowing and discriminated unions",
    "choices": [
      "Inside the block, user becomes never",
      "Inside the block, user has type User",
      "Inside the block, user stays User | null",
      "TypeScript reports an error because null cannot be tested"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a discriminated union?",
    "topic": "Narrowing and discriminated unions",
    "choices": [
      "A union of object types that share a literal property used to tell them apart",
      "A union of types that have no properties in common with each other",
      "A union that is only allowed to contain exactly two member types in total",
      "A union that the in operator creates when the program is running"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Given type Result = { kind: 'ok'; data: string } | { kind: 'err'; error: Error }, what does 'if (r.kind === 'ok')' do?",
    "topic": "Narrowing and discriminated unions",
    "choices": [
      "Narrows r to the ok variant, so r.data is available",
      "Converts r into a string",
      "Leaves r unchanged, so r.data is a type error",
      "Throws if r.kind is not 'ok'"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can a switch over a discriminated union catch a missing case at compile time?",
    "topic": "Narrowing and discriminated unions",
    "choices": [
      "Use the any type for the default branch so every case is accepted",
      "Assign the value to a never-typed variable in the default branch",
      "Enable the noEmit option in tsconfig so the build stops on a gap",
      "Wrap the switch in a try/catch so that a missing case is reported"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the 'in' operator do for narrowing?",
    "topic": "Narrowing and discriminated unions",
    "choices": [
      "Checks whether a property exists on an object and narrows the type to match",
      "Converts an object into a union of its keys and narrows to that union",
      "Iterates over the keys of an object and narrows each key to its value type",
      "Checks whether a value is contained in an array and narrows it to the item type"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a user-defined type guard?",
    "topic": "Narrowing and discriminated unions",
    "choices": [
      "A function with a return type like 'x is Cat' that narrows the type when it returns true",
      "A check that runs only in development builds and is stripped in production",
      "A comment directive that switches off type checking for the following line",
      "A class decorator that checks the type of each property when an object is made"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the risk of a type assertion such as 'data as User'?",
    "topic": "Narrowing and discriminated unions",
    "choices": [
      "It marks the variable as immutable for the rest of the function",
      "It converts the data into a User at runtime, which may throw errors",
      "The compiler trusts you, so a wrong assertion goes unnoticed",
      "It adds extra runtime checks that slow down the program slightly"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is 'unknown' safer than 'any' for data you do not control?",
    "topic": "Narrowing and discriminated unions",
    "choices": [
      "any is rejected by strict mode, while unknown is allowed in every setting",
      "unknown runs faster than any because the engine can skip the type tags",
      "You must narrow unknown before use, while any switches the checks off",
      "unknown validates the value at runtime, while any only checks it at compile time"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the purpose of a generic function such as 'function first<T>(items: T[]): T'?",
    "topic": "Generics and utility types",
    "choices": [
      "It makes the function accept any value without checks",
      "It converts values to type T at runtime",
      "It lets the function be called with a variable number of arguments",
      "It keeps the relationship between the input and output types"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How is a generic type argument usually supplied when calling a function?",
    "topic": "Generics and utility types",
    "choices": [
      "Passed as the first runtime argument and read inside the function body",
      "Declared once in the tsconfig file and applied to every call in the project",
      "Always written explicitly before the function name, with no inference at all",
      "Inferred from the arguments, or written explicitly like fetchJson<User>(url)"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does 'T extends object' do in a generic constraint?",
    "topic": "Generics and utility types",
    "choices": [
      "Makes T inherit methods from the global Object",
      "Makes T optional",
      "Creates a class hierarchy at runtime",
      "Restricts T to types assignable to object"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does Partial<User> produce?",
    "topic": "Generics and utility types",
    "choices": [
      "A type where every property is readonly",
      "A type where every property of User is optional",
      "A type where every property is required and non-null",
      "A type with only the first half of User's properties"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does Pick<User, 'id' | 'name'> produce?",
    "topic": "Generics and utility types",
    "choices": [
      "A type containing only the id and name properties",
      "A function that picks fields at runtime",
      "A type containing every property except id and name",
      "A union of the types of id and name"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Omit<User, 'password'> produce?",
    "topic": "Generics and utility types",
    "choices": [
      "A type that removes password at runtime",
      "A type like User without the password property",
      "A type where password is optional",
      "A type containing only password"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does Record<string, number> describe?",
    "topic": "Generics and utility types",
    "choices": [
      "An object whose keys are strings and values are numbers",
      "An array that holds pairs made of one string and one number",
      "A function that takes a string and returns a number or undefined",
      "A class that has one string field and one number field"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does ReturnType<typeof fn> give you?",
    "topic": "Generics and utility types",
    "choices": [
      "The type of the parameters of fn",
      "The value that fn returns when called",
      "The name of the function as a string",
      "The type that the function fn returns"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why are utility types useful in a growing codebase?",
    "topic": "Generics and utility types",
    "choices": [
      "They generate runtime code that validates every object passed to a function",
      "They speed up the compilation of large projects by caching type results",
      "They derive new types from existing ones, so one change flows everywhere",
      "They replace the need to declare interfaces for any object in the program"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does 'Awaited<Promise<string>>' evaluate to?",
    "topic": "Generics and utility types",
    "choices": [
      "undefined",
      "string",
      "unknown",
      "Promise<string>"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why can't a TypeScript type alone make an API response safe?",
    "topic": "Typing API responses and runtime validation with Zod",
    "choices": [
      "JSON cannot contain objects, only strings",
      "Types are erased at runtime, so the actual data is never checked",
      "Types only work for data stored in local variables",
      "TypeScript refuses to compile any code that calls fetch"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does response.json() return in a typed fetch helper by default?",
    "topic": "Typing API responses and runtime validation with Zod",
    "choices": [
      "A promise of a validated and frozen object",
      "A promise of any, which should be validated before use",
      "A promise of a string containing the raw body",
      "A promise of the exact type declared by the API"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does Zod help with API data?",
    "topic": "Typing API responses and runtime validation with Zod",
    "choices": [
      "It makes fetch calls faster by caching every response in the browser",
      "It converts JSON responses into XML before the compiler sees the data",
      "It generates a server for the API automatically from the schema definition",
      "It validates data at runtime against a schema and can derive the matching type"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you get the TypeScript type from a Zod schema called UserSchema?",
    "topic": "Typing API responses and runtime validation with Zod",
    "choices": [
      "type User = z.type(UserSchema)",
      "type User = z.infer<typeof UserSchema>",
      "type User = UserSchema.type",
      "type User = typeof z.User"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does schema.safeParse(data) return when the data is invalid?",
    "topic": "Typing API responses and runtime validation with Zod",
    "choices": [
      "It returns undefined without any information",
      "It throws a ZodError immediately",
      "An object with success: false and an error",
      "It returns the data with invalid fields removed"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When is schema.parse(data) preferable to safeParse?",
    "topic": "Typing API responses and runtime validation with Zod",
    "choices": [
      "When you need execution to continue running after a validation failure",
      "When invalid data should throw so that a boundary handles it",
      "When you need the validation result delivered as a promise",
      "When the data is already guaranteed to be valid by the server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where should API response validation happen in a frontend app?",
    "topic": "Typing API responses and runtime validation with Zod",
    "choices": [
      "After the data has been stored in state",
      "At the boundary where data enters, such as the fetch helper",
      "Only in the server, because clients can't validate",
      "In every component that displays the data"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can a Zod schema express an optional field with a default?",
    "topic": "Typing API responses and runtime validation with Zod",
    "choices": [
      "z.string().maybe('n/a')",
      "z.string().fallback('n/a')",
      "z.string().optional().default('n/a')",
      "z.optional('n/a')"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What advantage does a single Zod schema give a form?",
    "topic": "Typing API responses and runtime validation with Zod",
    "choices": [
      "The same rules can validate input and type the form values",
      "It removes the need for any HTML input elements",
      "It validates the form only on the server",
      "It sends the form data to the server automatically"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should you do when API data fails validation?",
    "topic": "Typing API responses and runtime validation with Zod",
    "choices": [
      "Render the data anyway and let each component cope with missing fields",
      "Show a clear error state and log the details instead of rendering bad data",
      "Silently replace the whole response with an empty object and carry on",
      "Reload the page repeatedly until the response finally passes validation"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the 'strict' option in tsconfig do?",
    "topic": "tsconfig strict mode and type-only imports",
    "choices": [
      "Makes the compiler stop at the first error it finds in a project",
      "Turns on a family of stricter type-checking options together",
      "Removes all comments from the JavaScript output files",
      "Forces every file in the project to use the .ts file extension"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does strictNullChecks change?",
    "topic": "tsconfig strict mode and type-only imports",
    "choices": [
      "Optional chaining stops working",
      "null is removed from the language",
      "null and undefined are converted to empty strings",
      "null and undefined are no longer assignable to every type"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does noImplicitAny do?",
    "topic": "tsconfig strict mode and type-only imports",
    "choices": [
      "Converts every any to unknown automatically",
      "Allows any only inside test files",
      "Reports an error when a type would be inferred as any",
      "Removes the any type from the standard library"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does 'import type { User } from './types'' do?",
    "topic": "tsconfig strict mode and type-only imports",
    "choices": [
      "Loads the file after the page has rendered to avoid blocking",
      "Imports the module lazily, only once the type is first used at runtime",
      "Imports the name for type checking only and erases it from the output",
      "Creates a brand new type that has the same shape as User"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the compiler option noEmit do?",
    "topic": "tsconfig strict mode and type-only imports",
    "choices": [
      "Skips the type check and only writes the output files",
      "Removes unused code from the JavaScript that is produced",
      "Suppresses every error message so that the build always succeeds",
      "Type-checks the code without writing any JavaScript files"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why does a Vite project usually run tsc --noEmit separately from the build?",
    "topic": "tsconfig strict mode and type-only imports",
    "choices": [
      "The bundler strips types without checking them, so tsc does the type check",
      "The bundler cannot read tsconfig files, so tsc must produce the output files",
      "tsc is needed to produce the final bundled JavaScript for the browser",
      "Vite refuses to compile any TypeScript file that has a type error in it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does skipLibCheck: true do?",
    "topic": "tsconfig strict mode and type-only imports",
    "choices": [
      "Prevents libraries from being included in the final bundle",
      "Skips the type checking of your own source files during compilation",
      "Skips type checks of declaration files, like those in node_modules",
      "Ignores all imports of third-party libraries when building the project"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the 'paths' option in tsconfig provide?",
    "topic": "tsconfig strict mode and type-only imports",
    "choices": [
      "Directories where the compiled output is written",
      "A way to rename files at runtime",
      "Aliases such as '@/' that map to folders for the type checker",
      "A list of files that the compiler is allowed to read"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why does a path alias also need configuration in the bundler?",
    "topic": "tsconfig strict mode and type-only imports",
    "choices": [
      "The browser itself needs the alias to find the module when the page loads",
      "tsconfig only affects type checking, while the bundler resolves imports",
      "Bundlers copy aliases out of tsconfig automatically, so extra setup is only a habit",
      "Aliases are only valid inside declaration files, so the bundler never sees them"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does 'noUncheckedIndexedAccess' add to array indexing?",
    "topic": "tsconfig strict mode and type-only imports",
    "choices": [
      "Checks the length of the array at runtime before reading an item",
      "Makes every array immutable once it has been created in the code",
      "Prevents any array in the project from being indexed with a number",
      "Makes items[i] possibly undefined, so you must check before using it"
    ],
    "answerIdx": 3
  }
]
```

LAYER: frontend-dev-7

```json
[
  {
    "stem": "What is JSX?",
    "topic": "Components, JSX and props",
    "choices": [
      "A stylesheet format used to style React components",
      "A JSON format for describing component state",
      "A syntax extension that lets you write markup-like code inside JavaScript",
      "A separate template language that the browser executes directly"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What must a React component name start with?",
    "topic": "Components, JSX and props",
    "choices": [
      "A lowercase letter",
      "A capital letter",
      "An underscore",
      "The word Component"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does a parent pass data to a child component?",
    "topic": "Components, JSX and props",
    "choices": [
      "By storing the values in a global variable the child reads",
      "By assigning values to the child's state directly",
      "By calling the child's render method with arguments",
      "Through props, written like attributes on the child element"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should a component never modify its own props?",
    "topic": "Components, JSX and props",
    "choices": [
      "Props are read-only inputs that belong to the parent",
      "Modifying props causes a syntax error in JSX",
      "Props are frozen only in production builds",
      "Props are stored on the server so changes are lost"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the special children prop contain?",
    "topic": "Components, JSX and props",
    "choices": [
      "The components that the parent's own parent rendered above it in the component tree",
      "A list of the state variables that the child component declares for its own use",
      "The names of every prop that was passed to the component, stored as an array of strings",
      "Whatever content is placed between the opening and closing tags of the component"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you write a JavaScript expression inside JSX?",
    "topic": "Components, JSX and props",
    "choices": [
      "Wrap it in curly braces",
      "Put it inside a template tag",
      "Wrap it in double quotes",
      "Wrap it in double square brackets"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which JSX attribute name is used instead of the HTML class attribute?",
    "topic": "Components, JSX and props",
    "choices": [
      "cssClass",
      "class",
      "htmlClass",
      "className"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why must a component return a single root element, or a fragment?",
    "topic": "Components, JSX and props",
    "choices": [
      "JSX allows one element per file",
      "Fragments are required in every component by the React compiler",
      "A function can return only one value, so siblings need a wrapper",
      "The browser can render only one element per script"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the <></> syntax create?",
    "topic": "Components, JSX and props",
    "choices": [
      "An empty component that renders nothing and blocks children",
      "A fragment that groups elements without adding a node to the DOM",
      "A comment that is stripped from the output",
      "A wrapper div with no styles"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you give a prop a default value in a function component?",
    "topic": "Components, JSX and props",
    "choices": [
      "By exporting a defaultProps object, which every React version requires",
      "With a default value in the parameter destructuring, such as { size = 'md' }",
      "By declaring the default in the parent's state",
      "By calling setDefault inside the component body"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does useState return?",
    "topic": "State with useState and re-rendering",
    "choices": [
      "An object with get and set methods that read and write the stored value",
      "The current state value only, with updates made by assigning to that value",
      "A promise that resolves with the state once the component has rendered",
      "An array with the current state value and a function to update it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens when you call a state setter with a new value?",
    "topic": "State with useState and re-rendering",
    "choices": [
      "React schedules a re-render of the component with the new value",
      "The old value is cached and shown until the next route change",
      "The component's variable is changed immediately in the current render",
      "The page reloads so the value can update"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why does 'count' still show the old value right after 'setCount(count + 1)' in the same handler?",
    "topic": "State with useState and re-rendering",
    "choices": [
      "setCount is asynchronous and runs on a separate thread inside of the browser",
      "React ignores any setCount call that happens inside of an event handler",
      "State is a snapshot, so the current render keeps the value it started with",
      "The browser delays variable updates until the page has been idle for a while"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the safe way to update state based on its previous value?",
    "topic": "State with useState and re-rendering",
    "choices": [
      "Call setCount twice in a row with the same number",
      "Read the variable and assign it directly, then call setCount",
      "Store the previous value in a global variable",
      "Pass an updater function such as setCount(c => c + 1)"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should you not mutate an array in state with push?",
    "topic": "State with useState and re-rendering",
    "choices": [
      "React compares references, so a mutated array is seen as unchanged",
      "Calling push deletes the whole array from state before the item is added",
      "Arrays that are held in state are frozen by React and throw when you push",
      "The push method is not available to code that runs inside of a component"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which update correctly adds an item to an array held in state?",
    "topic": "State with useState and re-rendering",
    "choices": [
      "items[items.length] = newItem",
      "setItems([...items, newItem])",
      "setItems(items.push(newItem))",
      "items.push(newItem)"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which update correctly changes one field of an object held in state?",
    "topic": "State with useState and re-rendering",
    "choices": [
      "user = { name: 'Ana' }",
      "user.name = 'Ana'",
      "setUser(user.name = 'Ana')",
      "setUser({ ...user, name: 'Ana' })"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When is a lazy initial state function, such as useState(() => compute()), useful?",
    "topic": "State with useState and re-rendering",
    "choices": [
      "When the initial value is expensive, so it should run only on the first render",
      "When the state needs to be shared with other components further down the tree",
      "When the state should be reset to its starting value after each update happens",
      "When the value has to be recomputed again on every single render of the component"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What causes a React component to re-render?",
    "topic": "State with useState and re-rendering",
    "choices": [
      "A timer set by the browser every few milliseconds",
      "A change to the URL hash only",
      "Any change to a variable declared inside the component",
      "A change to its state or props, or a re-render of its parent"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why must hooks such as useState be called at the top level of a component?",
    "topic": "State with useState and re-rendering",
    "choices": [
      "Hooks cannot read variables that have been declared inside of blocks of code",
      "Hooks become very slow whenever they are called inside of loops or branches",
      "The compiler quietly moves every hook to the top of the component for you",
      "React relies on the call order to match each hook with its stored state"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does it mean to lift state up?",
    "topic": "Lifting state up and one-way data flow",
    "choices": [
      "Moving state to the closest common parent so siblings can share it",
      "Converting state into props inside the same component to avoid re-renders",
      "Moving state to a global store that is used by every part of the whole app",
      "Copying the state into each child component so that they can edit it freely"
    ],
    "answerIdx": 0
  },
  {
    "stem": "In React's one-way data flow, how does a child tell its parent that something changed?",
    "topic": "Lifting state up and one-way data flow",
    "choices": [
      "It calls a function the parent passed down as a prop",
      "It updates the parent's state variable directly",
      "It emits a global event that every component handles",
      "It rewrites the parent's props"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Two sibling components both need the same piece of state. Where should it live?",
    "topic": "Lifting state up and one-way data flow",
    "choices": [
      "In their closest common parent component",
      "In a copy inside each sibling that stays in sync",
      "In whichever sibling renders first",
      "In a variable defined outside every component"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a drawback of keeping duplicated copies of the same data in several components' state?",
    "topic": "Lifting state up and one-way data flow",
    "choices": [
      "It makes the components render in the wrong order",
      "It disables hooks inside those components",
      "React refuses to render components with duplicate state",
      "The copies can drift apart and show inconsistent information"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is prop drilling?",
    "topic": "Lifting state up and one-way data flow",
    "choices": [
      "Passing props into a component using a special drill function from React",
      "Passing props through many intermediate components that do not use them",
      "Reading props straight from the global window object inside a component",
      "Removing the props that a component never uses to make it render faster"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should you do with data that can be calculated from existing props or state?",
    "topic": "Lifting state up and one-way data flow",
    "choices": [
      "Store it in its own state and update it in an effect",
      "Compute it during render instead of storing it in extra state",
      "Save it in a ref so it never changes",
      "Send it to the server and read it back"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a controlled parent-child setup for a text field?",
    "topic": "Lifting state up and one-way data flow",
    "choices": [
      "The child holds the value and the parent reads it from the DOM",
      "The parent holds the value and passes it down with an onChange function",
      "The value lives only in the URL",
      "Both hold separate values and compare them on submit"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which principle helps decide where state belongs?",
    "topic": "Lifting state up and one-way data flow",
    "choices": [
      "Keep state out of components entirely and store it in the URL or in cookies",
      "Keep all of the state at the very top of the app to avoid passing any props down",
      "Keep state as low as possible, but high enough that all users of it share a parent",
      "Keep each piece of state inside the first component in the tree that reads it"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the key point of the 'single source of truth' idea for state?",
    "topic": "Lifting state up and one-way data flow",
    "choices": [
      "Data must always be written to localStorage so that every component reads it",
      "State may be copied into several components, but only one of the copies may be edited",
      "Each piece of data is owned by one component, and others receive it from there",
      "All data in the application must be kept together in one single global object"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does it mean that data flows down in React?",
    "topic": "Lifting state up and one-way data flow",
    "choices": [
      "Props move from parents to children, never the other way",
      "Children can read the parent's local variables",
      "State is copied automatically between siblings",
      "Data flows from the DOM to the components"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you render an array of items as list elements in JSX?",
    "topic": "Rendering lists with keys and conditional rendering",
    "choices": [
      "Use items.forEach to return elements",
      "Use a for loop directly inside the JSX braces",
      "Use items.map(item => <li key={item.id}>...</li>)",
      "Use a v-for attribute on the li"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the purpose of the key prop on list items?",
    "topic": "Rendering lists with keys and conditional rendering",
    "choices": [
      "It fixes the order in which the items appear on screen after each render happens",
      "It lets React match items between renders, so it can update, move or remove the right ones",
      "It gives each item a unique CSS class that the stylesheet can use to target it later",
      "It makes every item focusable with the keyboard so that users can tab through the list"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is using the array index as a key a problem when the list can be reordered?",
    "topic": "Rendering lists with keys and conditional rendering",
    "choices": [
      "React throws a runtime error whenever it sees an index used as a key in a list",
      "State and DOM nodes can stick to the wrong item when positions change",
      "Indexes make the list render twice because React compares them against item ids",
      "The index is a number, and React only accepts strings as keys for list items"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What makes a good key?",
    "topic": "Rendering lists with keys and conditional rendering",
    "choices": [
      "A stable, unique value from the data, such as a database id",
      "A random number that is generated again on every single render",
      "The position of the item in the array, as given by the map callback",
      "The display text of the item, even when two items repeat the same text"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where must the key be placed when mapping to a component?",
    "topic": "Rendering lists with keys and conditional rendering",
    "choices": [
      "Inside the child component's root element",
      "In the child's props only, under the name key",
      "On the outermost element returned by the map callback",
      "On the parent element that contains the list"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you conditionally render a message only when isError is true?",
    "topic": "Rendering lists with keys and conditional rendering",
    "choices": [
      "{isError && <p>Something went wrong</p>}",
      "<p if={isError}>Something went wrong</p>",
      "if (isError) <p>Something went wrong</p>",
      "{isError ? <p>Something went wrong</p>}"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a pitfall of '{count && <Badge />}' when count can be 0?",
    "topic": "Rendering lists with keys and conditional rendering",
    "choices": [
      "The Badge is rendered for 0, because the number 0 counts as truthy in JSX",
      "React throws an error for falsy numbers that are used inside of curly braces",
      "The expression returns undefined, which breaks the layout of the whole parent",
      "React renders the number 0 on screen, since 0 is a valid renderable value"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which values render nothing in JSX?",
    "topic": "Rendering lists with keys and conditional rendering",
    "choices": [
      "0 and empty strings",
      "Only undefined",
      "null, undefined, true and false",
      "NaN and arrays with one item"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can a component return nothing for a certain condition?",
    "topic": "Rendering lists with keys and conditional rendering",
    "choices": [
      "Return null",
      "Return false from the render method",
      "Return an empty object",
      "Throw an exception that React ignores"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a clear way to choose between two blocks of JSX?",
    "topic": "Rendering lists with keys and conditional rendering",
    "choices": [
      "Use an if statement inside the JSX braces",
      "Use a ternary expression such as cond ? <A /> : <B />",
      "Use two separate return statements inside the JSX",
      "Use a switch tag"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you attach a click handler to a button in JSX?",
    "topic": "Handling events and controlled inputs",
    "choices": [
      "<button on-click={handleClick}>",
      "<button onclick='handleClick()'>",
      "<button click={handleClick()}>",
      "<button onClick={handleClick}>"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the bug in <button onClick={handleClick()}>?",
    "topic": "Handling events and controlled inputs",
    "choices": [
      "handleClick runs during render and its result is passed as the handler",
      "The button becomes disabled because the call returns a value that is not a function",
      "The handler is attached twice, so the click runs the function two times in a row",
      "The click event bubbles incorrectly to the parent, which then runs the handler again"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a controlled input?",
    "topic": "Handling events and controlled inputs",
    "choices": [
      "An input whose value is held in React state and updated with onChange",
      "An input that is protected by a set of validation attributes on the element",
      "An input whose value is read straight from the DOM at the moment of submit",
      "An input that is disabled until the user has logged in to the application"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens if you set value on an input but provide no onChange?",
    "topic": "Handling events and controlled inputs",
    "choices": [
      "React converts it into an uncontrolled input and drops the value prop quietly",
      "The input works normally and still updates its own value as the user types",
      "The input becomes read-only for the user, and React warns about it",
      "The input shows only the placeholder and ignores the value that was passed"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you read the text typed in a controlled input?",
    "topic": "Handling events and controlled inputs",
    "choices": [
      "By calling document.getElementById again on every single key press",
      "From event.target.value inside onChange, saved into state",
      "From the component's props, which React updates as the user types",
      "From localStorage, which the browser writes after every change to the field"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which call stops a form from reloading the page in a React submit handler?",
    "topic": "Handling events and controlled inputs",
    "choices": [
      "event.stopPropagation()",
      "return false from the render",
      "event.preventDefault()",
      "form.reload(false)"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the difference between a controlled and an uncontrolled input?",
    "topic": "Handling events and controlled inputs",
    "choices": [
      "A controlled input is disabled for the user, while an uncontrolled input can still be edited",
      "A controlled input is read through refs, while an uncontrolled input is stored in state",
      "A controlled input can't be part of a submitted form, while an uncontrolled one always is",
      "A controlled input's value lives in state, while an uncontrolled input's value lives in the DOM"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why does a React event handler receive a synthetic event object?",
    "topic": "Handling events and controlled inputs",
    "choices": [
      "It copies the entire DOM at the time of the event so handlers can inspect it",
      "It cancels the browser's default behaviour automatically for every event",
      "It wraps the browser event so it behaves the same across browsers",
      "It runs the handler on the server before the browser draws the next frame"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you handle a checkbox as a controlled input?",
    "topic": "Handling events and controlled inputs",
    "choices": [
      "Use a ref to read the checkbox and avoid keeping any state for it at all",
      "Use the checked prop with onChange and read event.target.checked",
      "Use defaultValue and read the checkbox state only when the form submits",
      "Use the value prop with onChange and then read event.target.value for it"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can one onChange handler manage several text fields?",
    "topic": "Handling events and controlled inputs",
    "choices": [
      "Give each field a name and update state with [event.target.name]: event.target.value",
      "Use a single global variable for all of the fields and copy it into state on submit",
      "Give each field the same id and read the value from the document with that shared id",
      "Attach one handler to the window object and compare the event targets by position"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the first step in the 'Thinking in React' process?",
    "topic": "Thinking in React: breaking a UI into components",
    "choices": [
      "Connect the app to the server",
      "Write the state for every component",
      "Break the UI into a hierarchy of components",
      "Add the event handlers"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you decide where a component boundary should be?",
    "topic": "Thinking in React: breaking a UI into components",
    "choices": [
      "Make one separate component for each HTML tag that appears in the design",
      "Make each component do one thing, mirroring a piece of the design or data",
      "Make a new component for every line of JSX that is returned from a function",
      "Put everything in a single App component and split it up later on if needed"
    ],
    "answerIdx": 1
  },
  {
    "stem": "After building a static version, what does 'Thinking in React' suggest finding next?",
    "topic": "Thinking in React: breaking a UI into components",
    "choices": [
      "The tests for each prop",
      "The CSS for each component",
      "Every value that appears on screen",
      "The minimal set of state the UI needs"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which of these is NOT a good candidate for state?",
    "topic": "Thinking in React: breaking a UI into components",
    "choices": [
      "The text a user has typed into a search field on the page",
      "A value that can be calculated from other state or props",
      "The list of items the user has added to their shopping cart so far",
      "Whether a dropdown menu is currently open or closed on screen"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the benefit of building a static version first?",
    "topic": "Thinking in React: breaking a UI into components",
    "choices": [
      "It lets you skip the step of deciding which data should be stored as state",
      "It avoids the need for components because markup can simply be copied across",
      "It separates the typing-heavy rendering work from the thinking-heavy interactive work",
      "It guarantees that the finished app will need no props or shared state at all"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A search box filters a product table. Where should the filter text state live?",
    "topic": "Thinking in React: breaking a UI into components",
    "choices": [
      "In the URL, never in components",
      "Inside the search box only, with the table reading the DOM",
      "In a common parent of the search box and the table",
      "In each table row"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a reusable component?",
    "topic": "Thinking in React: breaking a UI into components",
    "choices": [
      "One that is copied into each file that needs it and edited slightly there",
      "One that gets what it needs through props and has no hidden dependencies",
      "One that reads global variables to decide what it should show on the screen",
      "One that stores its data on the window object so other parts can find it"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why are small focused components easier to test and change?",
    "topic": "Thinking in React: breaking a UI into components",
    "choices": [
      "They never use state, so there is nothing that could change under a test",
      "They are exempt from the rules of hooks that apply to larger components",
      "Each one has a narrow responsibility and clear inputs",
      "They always render faster than any larger component in the application"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When should you split a component into smaller ones?",
    "topic": "Thinking in React: breaking a UI into components",
    "choices": [
      "As soon as the function has more than five lines of code inside its body",
      "Only when the file size grows past a megabyte and slows down the editor",
      "Never, because splitting components always hurts the speed of rendering",
      "When it does several unrelated things or is hard to read and test"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the declarative style of React mean for UI code?",
    "topic": "Thinking in React: breaking a UI into components",
    "choices": [
      "You write each step needed to change individual DOM nodes when something happens",
      "You avoid state altogether and let the browser decide how the layout should change",
      "You write the instructions that the browser's layout engine runs for each frame",
      "You describe what the UI should look like for a given state, and React updates the DOM"
    ],
    "answerIdx": 3
  }
]
```

LAYER: frontend-dev-8

```json
[
  {
    "stem": "What is the main purpose of useEffect?",
    "topic": "useEffect: synchronization and cleanup",
    "choices": [
      "To synchronize the component with something outside React",
      "To replace event handlers for user interactions",
      "To store data between renders without causing a re-render",
      "To compute values that depend on props during render"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When does an effect with an empty dependency array [] run?",
    "topic": "useEffect: synchronization and cleanup",
    "choices": [
      "Before the component renders for the first time, in the middle of the render",
      "After the first render, and its cleanup runs when the component unmounts",
      "Only when the browser tab becomes visible again after being in the background",
      "After every render of the component, and its cleanup runs before each of them"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the cleanup function returned from an effect used for?",
    "topic": "useEffect: synchronization and cleanup",
    "choices": [
      "Undoing the effect, such as removing a listener or cancelling a subscription",
      "Clearing the component's state when it unmounts so the next mount starts fresh",
      "Forcing the effect to run again immediately after the render has been painted",
      "Resetting the dependency array so that the effect can run again on the next render"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When does an effect's cleanup run, other than on unmount?",
    "topic": "useEffect: synchronization and cleanup",
    "choices": [
      "Before the effect runs again because a dependency changed",
      "After the effect finishes its first run",
      "Never, since cleanup runs on unmount only",
      "Only when the component throws an error"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens if you omit the dependency array from useEffect?",
    "topic": "useEffect: synchronization and cleanup",
    "choices": [
      "The effect runs once, after the first render",
      "The effect runs after every render",
      "The effect never runs",
      "React reports a syntax error"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should the dependency array contain?",
    "topic": "useEffect: synchronization and cleanup",
    "choices": [
      "Only props, never state",
      "Only the values that you want to trigger the effect",
      "Every reactive value from the component that the effect reads",
      "The names of the functions defined in the component"
    ],
    "answerIdx": 2
  },
  {
    "stem": "In development with StrictMode, why does an effect appear to run twice on mount?",
    "topic": "useEffect: synchronization and cleanup",
    "choices": [
      "Effects always run twice in production as well",
      "React mounts, unmounts and remounts to reveal missing cleanup bugs",
      "The browser calls the effect once for each loaded script",
      "React has a bug in development mode"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you avoid a race condition when an effect fetches data for a changing id?",
    "topic": "useEffect: synchronization and cleanup",
    "choices": [
      "Remove the dependency array so the request restarts",
      "Wait for the previous request to finish before starting another",
      "Store the id in a global variable",
      "Ignore or abort the older request in the cleanup function"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is an async function not passed directly to useEffect?",
    "topic": "useEffect: synchronization and cleanup",
    "choices": [
      "The effect would run only on the first render, because promises disable the dependency array",
      "Effects must return nothing or a cleanup function, and an async function returns a promise",
      "Async functions cannot read state or props, so an effect could never use them safely",
      "Effects are always synchronous in React, and the scheduler rejects any function marked async"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which of these belongs in an effect rather than in an event handler?",
    "topic": "useEffect: synchronization and cleanup",
    "choices": [
      "Subscribing to a WebSocket connection while the component is on screen",
      "Showing a confirmation toast right after the user clicks the delete button",
      "Sending a form to the server at the moment when the user clicks Submit",
      "Updating a counter by one when the user presses the plus button"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A component needs a full name made from firstName and lastName props. What is the best approach?",
    "topic": "You might not need an effect",
    "choices": [
      "Calculate it on the server for every render",
      "Calculate it during render",
      "Store it in a ref and update it in an effect",
      "Store it in state and update it in an effect"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is setting state inside an effect based on props often a mistake?",
    "topic": "You might not need an effect",
    "choices": [
      "React forbids calling a state setter inside an effect and throws an error",
      "It causes an extra render, and the value could be calculated during render",
      "It makes the effect run only once, because the setter resets the dependency array",
      "It updates the parent's state by accident, since effects share the parent scope"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where should logic run that happens because the user clicked a button?",
    "topic": "You might not need an effect",
    "choices": [
      "In the component body during render",
      "In a cleanup function",
      "In an effect that watches a click flag in state",
      "In the click event handler"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you reset all state in a component when a prop such as userId changes?",
    "topic": "You might not need an effect",
    "choices": [
      "Unmount the parent from an event handler",
      "Add an effect that calls every setter with an initial value",
      "Give the component a key based on userId",
      "Re-create the component with a new name"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which is a good use of useMemo?",
    "topic": "You might not need an effect",
    "choices": [
      "Subscribing to browser events and removing the listeners on unmount",
      "Running some code after the component has mounted on the page",
      "Storing a piece of state that survives re-renders and triggers new renders",
      "Skipping an expensive calculation when its inputs have not changed"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should you do before adding useMemo or useCallback for performance?",
    "topic": "You might not need an effect",
    "choices": [
      "Wrap every function and value in them",
      "Remove the dependency arrays",
      "Replace them with useEffect",
      "Measure whether the render is actually slow"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which scenario genuinely needs an effect?",
    "topic": "You might not need an effect",
    "choices": [
      "Fetching data when a component appears, because it syncs with an external system",
      "Calculating the total price of the items in a cart from the quantities and prices",
      "Formatting a date string for display from a timestamp that arrives in the props",
      "Filtering a list of products by a search string that is held in the component's state"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a problem with chains of effects that update state to trigger each other?",
    "topic": "You might not need an effect",
    "choices": [
      "They are not allowed by the rules of hooks",
      "They only work in production",
      "They run in random order",
      "They cause extra renders and are hard to follow and debug"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How should you share logic that runs when an external event happens, such as a form submission?",
    "topic": "You might not need an effect",
    "choices": [
      "Put it in the event handler, and extract a shared function if needed",
      "Put it in the render body, so that it runs again each time the component renders",
      "Put it in a useMemo callback, which runs when the dependencies change",
      "Put it in an effect that watches a flag in state and runs when that flag changes"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does it mean to treat the effect as 'synchronization'?",
    "topic": "You might not need an effect",
    "choices": [
      "The effect blocks rendering until the whole function has finished running",
      "The effect makes two components render at exactly the same time as each other",
      "The effect keeps an external system matching the current props and state",
      "The effect runs only on the server and sends the result to the client later"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a ref created by useRef hold?",
    "topic": "useRef, useMemo and useCallback",
    "choices": [
      "A mutable value in ref.current that persists between renders without causing re-renders",
      "A copy of the component's state that React refreshes automatically on every render",
      "A cached copy of the component's output that is reused when the props stay the same",
      "A reference to the parent component that lets a child call the parent's methods"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you get access to a DOM element with a ref?",
    "topic": "useRef, useMemo and useCallback",
    "choices": [
      "Pass the element in as a prop from the parent, which creates it for you",
      "Call document.getElementById inside render and keep the element in a variable",
      "Use the element's name as a variable, which React defines for each tag",
      "Attach the ref to the element's ref attribute and read ref.current"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Does changing ref.current trigger a re-render?",
    "topic": "useRef, useMemo and useCallback",
    "choices": [
      "Yes, always",
      "No",
      "Only when the new value is an object",
      "Only in development"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does useCallback return?",
    "topic": "useRef, useMemo and useCallback",
    "choices": [
      "A copy of the function that always receives extra arguments from React",
      "A memoized function that keeps the same identity until its dependencies change",
      "A promise that resolves when the callback has finished running its work",
      "A function that is guaranteed to run only once for the lifetime of the component"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why might you wrap a function in useCallback?",
    "topic": "useRef, useMemo and useCallback",
    "choices": [
      "To make the wrapped function execute faster, because React compiles memoized functions",
      "To stop the wrapped function from ever throwing an error during a user interaction",
      "To turn the wrapped function into an asynchronous one that runs after the render",
      "To keep a stable function reference for a memoized child or an effect dependency"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does React.memo do for a component?",
    "topic": "useRef, useMemo and useCallback",
    "choices": [
      "Moves the component's rendering work to a web worker to keep the page smooth",
      "Caches the component's state between page loads so it is restored on return",
      "Prevents the component from ever re-rendering, even when its state changes",
      "Skips re-rendering when its props are shallowly equal to the previous ones"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why can a new object literal passed as a prop defeat React.memo?",
    "topic": "useRef, useMemo and useCallback",
    "choices": [
      "Objects cannot be passed as props to memoized components, so React reports an error",
      "React.memo only compares the first prop of the component and ignores the others",
      "Memoized components reject all objects because they cannot be copied by value",
      "A new object has a different reference every render, so the props look changed"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When is useRef a good place to keep a value?",
    "topic": "useRef, useMemo and useCallback",
    "choices": [
      "When the value must update the screen immediately each time that it is changed",
      "When the value must trigger an effect each time that someone writes to it",
      "When the value must be shared with every component in the whole application tree",
      "When the value should persist across renders without affecting what is displayed"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a risk of reading or writing ref.current during render?",
    "topic": "useRef, useMemo and useCallback",
    "choices": [
      "It throws an error in every case, since refs are frozen while rendering",
      "It makes rendering impure and results can become unpredictable",
      "It forces an extra render each time the value is read inside the component",
      "It disables the ref permanently until the component unmounts and mounts again"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the dependency array of useMemo control?",
    "topic": "useRef, useMemo and useCallback",
    "choices": [
      "When the cached value is recalculated",
      "When the component unmounts",
      "Which props the component accepts",
      "How often the component renders"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a custom hook?",
    "topic": "Custom hooks for reusable logic",
    "choices": [
      "A component that renders nothing but is mounted once at the root of the application",
      "A class that extends React.Component and registers lifecycle methods for reuse",
      "A function whose name starts with 'use' that calls other hooks to share stateful logic",
      "A function that replaces useState globally for every component in the whole application"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why must a custom hook's name start with 'use'?",
    "topic": "Custom hooks for reusable logic",
    "choices": [
      "So tools and linters can check the rules of hooks inside it",
      "Because the browser requires it",
      "So it can be imported from the react package",
      "Because React runs only functions with that prefix"
    ],
    "answerIdx": 0
  },
  {
    "stem": "If two components call the same custom hook, do they share state?",
    "topic": "Custom hooks for reusable logic",
    "choices": [
      "Yes, the state is shared between all callers",
      "No, each call gets its own independent state",
      "Only if they are siblings",
      "Only if the hook uses useRef"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a good candidate for a custom hook?",
    "topic": "Custom hooks for reusable logic",
    "choices": [
      "A pure function that adds two numbers together and has no side effects",
      "A CSS class name that is shared between several different components",
      "Debouncing a value, which combines state and an effect",
      "A constant value that is used in only one component of the app"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should a custom hook return?",
    "topic": "Custom hooks for reusable logic",
    "choices": [
      "Nothing at all, because hooks may only run effects and cannot give values back",
      "Always a JSX element, because hooks are components that React renders for you",
      "Whatever the component needs, such as a value, an array or an object of values and setters",
      "Always an array of exactly two items, with the value first and the setter second"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the benefit of extracting logic into a custom hook?",
    "topic": "Custom hooks for reusable logic",
    "choices": [
      "It makes the logic exempt from the rules of hooks",
      "It makes the logic run on the server",
      "It makes the logic run faster",
      "It removes duplication and keeps components focused on rendering"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where can you call hooks?",
    "topic": "Custom hooks for reusable logic",
    "choices": [
      "Inside event handlers",
      "Inside loops and conditions in components",
      "At the top level of components and custom hooks",
      "In any plain JavaScript function"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can a custom hook receive configuration from the component?",
    "topic": "Custom hooks for reusable logic",
    "choices": [
      "By reading the component's local variables",
      "Through its parameters",
      "Through a global registry",
      "By editing the component's props"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a useDebouncedValue(value, 300) hook typically do?",
    "topic": "Custom hooks for reusable logic",
    "choices": [
      "Rounds the value to the nearest multiple of 300 before the component uses it",
      "Returns the value 300 times in a row, once for each of the renders that follow",
      "Delays the first render of the component by exactly 300 milliseconds each time",
      "Returns the value only after it has stopped changing for 300 milliseconds"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a downside of putting too much logic in one custom hook?",
    "topic": "Custom hooks for reusable logic",
    "choices": [
      "It has to be rewritten as a class once it grows beyond a few state values",
      "It cannot call other hooks, so the logic has to be written in one place",
      "It becomes hard to understand and reuse, like any large function",
      "React refuses to run hooks that are longer than about a hundred lines"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is useReducer best suited for?",
    "topic": "useReducer and context for shared state",
    "choices": [
      "State with several related values or complex update rules",
      "Caching the result of an expensive calculation between two renders",
      "Running a piece of code exactly once when the component first mounts",
      "Reading the current values from DOM nodes after each render of the page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a reducer function receive and return?",
    "topic": "useReducer and context for shared state",
    "choices": [
      "A component and its props, and it returns JSX",
      "An event and a handler, and it returns void",
      "The current state and an action, and it returns the next state",
      "The next state and the previous state, and it returns an action"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why must a reducer be a pure function?",
    "topic": "useReducer and context for shared state",
    "choices": [
      "The same state and action must always produce the same result, without side effects",
      "Reducers are called in a worker thread, where outside variables and the DOM are not available",
      "React caches the result of the reducer forever, so impure code would be skipped",
      "Reducers run only on the server, and the server cannot call functions with side effects"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does dispatch do?",
    "topic": "useReducer and context for shared state",
    "choices": [
      "Subscribes the component to an external store and returns the latest value",
      "Renders a component immediately, without waiting for the next scheduled update",
      "Sends an action to the reducer, which triggers a state update",
      "Mutates the state object directly, bypassing the reducer function entirely"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What problem does React context solve?",
    "topic": "useReducer and context for shared state",
    "choices": [
      "Making state persist after a page refresh",
      "Passing data deep into the tree without prop drilling",
      "Speeding up all re-renders",
      "Sharing state between separate browser tabs"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens to components that read a context when its value changes?",
    "topic": "useReducer and context for shared state",
    "choices": [
      "They re-render",
      "They unmount and remount",
      "Only the nearest parent re-renders",
      "Nothing, until the page is refreshed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is putting frequently changing state in a single context a performance risk?",
    "topic": "useReducer and context for shared state",
    "choices": [
      "Every consumer re-renders on each change, even if it uses only part of the value",
      "Context cannot hold more than one value, so extra state would be dropped silently",
      "Consumers cannot read the value while an update is in flight, so they show nothing",
      "Context values are copied to localStorage each time, which blocks the main thread"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which data is a good fit for context?",
    "topic": "useReducer and context for shared state",
    "choices": [
      "A fast-changing mouse position",
      "The text of a search input updated on every keystroke",
      "Slow-changing values such as the current theme or the signed-in user",
      "Large lists updated every second"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you provide a context value to a subtree?",
    "topic": "useReducer and context for shared state",
    "choices": [
      "Attach the value to the window object",
      "Call createContext inside the child",
      "Wrap it in the context's Provider and pass a value",
      "Export the value from the parent file"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What do useReducer and context together approximate?",
    "topic": "useReducer and context for shared state",
    "choices": [
      "A router that maps the URL to the components shown on screen",
      "A server-side session object that React keeps in sync with the backend",
      "A database that lives inside the browser and survives clearing the cache",
      "A small global store with actions, without an external library"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does Zustand store state?",
    "topic": "State libraries: Zustand and when to use them",
    "choices": [
      "Inside a context provider at the root of the app",
      "In cookies on the browser",
      "In a store created outside React, which components subscribe to",
      "In the URL's query string"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do components select only the part of a Zustand store they need?",
    "topic": "State libraries: Zustand and when to use them",
    "choices": [
      "Wrap the component in a Provider and pass the field names through a prop",
      "Destructure the whole store in every component and ignore the fields you skip",
      "Pass a selector function to the store hook, such as useStore(s => s.count)",
      "Call the store as a plain function and read the field from the return value"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why can a selector reduce re-renders compared with context?",
    "topic": "State libraries: Zustand and when to use them",
    "choices": [
      "The component re-renders only when the selected value changes",
      "Selectors skip React's rendering and write straight to the DOM instead",
      "Selectors cache the entire page so the browser never has to render it twice",
      "The store sends updates only once per second, however often the state changes"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you update state in a Zustand store?",
    "topic": "State libraries: Zustand and when to use them",
    "choices": [
      "Mutate the state object directly from any component, and the store notices it",
      "Call a function defined in the store that uses set to produce new state",
      "Assign a new value to the variable that the hook returned for that field",
      "Dispatch actions to a reducer that lives in a Provider at the top of the tree"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When is a state library worth adding to an app?",
    "topic": "State libraries: Zustand and when to use them",
    "choices": [
      "Only when the project has a backend, because libraries need a server to talk to",
      "When many distant components share state that props and context handle awkwardly",
      "As soon as a project has a second component, since props stop working after that",
      "Never, because React already provides everything an application could possibly need"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a sign that data should NOT go in a client state store?",
    "topic": "State libraries: Zustand and when to use them",
    "choices": [
      "It is the tab that is currently selected within a settings panel",
      "It is the colour theme that the user picked from the preferences menu",
      "It is the open or closed state of a modal window in the interface",
      "It is server data that needs caching, refetching and invalidation"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the main difference between server state and client state?",
    "topic": "State libraries: Zustand and when to use them",
    "choices": [
      "Server state is always much smaller than client state, so it can be cached forever without checks",
      "Server state lives remotely and may become stale, while client state exists only in the browser",
      "There is no practical difference between the two, because both are stored in React's memory",
      "Client state is persisted to the database automatically, while server state is lost on reload"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does persisting a store to localStorage require you to remember?",
    "topic": "State libraries: Zustand and when to use them",
    "choices": [
      "To store functions and class instances as well, because JSON can represent them",
      "To save secrets such as access tokens there, so that logins load faster on return",
      "To store only serializable, non-sensitive data and handle version changes",
      "To avoid reading the saved data on startup, because the store always begins empty"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why keep store logic, such as actions, close to the store definition?",
    "topic": "State libraries: Zustand and when to use them",
    "choices": [
      "State and the rules for changing it stay together and are easier to test",
      "It avoids exporting the store, which would otherwise break the module system",
      "React requires actions to be defined inside the components that call them",
      "It makes selectors unnecessary, because components can read the actions directly"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you test components that depend on a store?",
    "topic": "State libraries: Zustand and when to use them",
    "choices": [
      "Skip testing them, because stores cannot be tested",
      "Mock the browser",
      "Use the production store data",
      "Reset or provide a known store state before each test"
    ],
    "answerIdx": 3
  }
]
```

LAYER: frontend-dev-9

```json
[
  {
    "stem": "What does a client-side router do when a link is clicked?",
    "topic": "Client-side routing, nested routes and URL state",
    "choices": [
      "Opens the link in a new window and keeps the old one open in the background",
      "Reloads the browser tab and resets all of the JavaScript state in the process",
      "Requests a brand new HTML page from the server for every single route change",
      "Updates the URL and renders the matching component without a full page reload"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a nested route allow?",
    "topic": "Client-side routing, nested routes and URL state",
    "choices": [
      "Routes to be loaded in parallel by the server before the page is sent out",
      "A parent layout to stay mounted while the child route's content changes inside it",
      "A single route to answer for more than one URL at the same time",
      "Child routes to share the parent's state automatically without any props"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which component renders the matched child route inside a parent layout in React Router?",
    "topic": "Client-side routing, nested routes and URL state",
    "choices": [
      "Outlet",
      "Children",
      "Slot",
      "RouteView"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you read a dynamic segment such as /users/:id?",
    "topic": "Client-side routing, nested routes and URL state",
    "choices": [
      "With the useParams hook",
      "With document.params",
      "With the useState hook",
      "With window.location.id"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why store filters and pagination in the URL query string?",
    "topic": "Client-side routing, nested routes and URL state",
    "choices": [
      "Pages become shareable, bookmarkable and survive a refresh",
      "Browsers require every filter to appear in the URL before they render a list",
      "Query strings are always faster to read than values that are kept in state",
      "It removes the need for components because the URL describes the screen"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between Link and a plain anchor tag in a router app?",
    "topic": "Client-side routing, nested routes and URL state",
    "choices": [
      "Link navigates in the client without a full reload",
      "Link only works with external sites",
      "Link opens a new tab by default",
      "Link disables the browser's back button"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the navigate function from useNavigate let you do?",
    "topic": "Client-side routing, nested routes and URL state",
    "choices": [
      "Change the route from code, for example after a form submit",
      "Fetch the data that the next route needs before the user moves to it",
      "Reload the page from the server and discard the current JavaScript state",
      "Open the browser's developer tools at the current route for debugging"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a catch-all route such as path='*' commonly render?",
    "topic": "Client-side routing, nested routes and URL state",
    "choices": [
      "The home page for all visitors",
      "The previous route",
      "A loading spinner",
      "A not-found page"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which hook gives access to the query string in React Router?",
    "topic": "Client-side routing, nested routes and URL state",
    "choices": [
      "useLocationData",
      "useQuery",
      "useSearchParams",
      "useUrl"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should navigation after a successful form submit often use replace?",
    "topic": "Client-side routing, nested routes and URL state",
    "choices": [
      "Because replace clears all of the state held by the components on the page",
      "Because replace lets the router avoid loading the next page from the server",
      "So the back button does not return the user to the form that was submitted",
      "Because replace makes the navigation faster than a normal push by skipping render"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does a protected route usually work?",
    "topic": "Protected routes and lazy-loaded pages",
    "choices": [
      "The page loads, then the user is asked to refresh",
      "The route is deleted from the router when the user logs out",
      "The server hides the route from unauthenticated users automatically",
      "A wrapper checks authentication and renders the page or redirects to login"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is a client-side route guard not enough to secure data?",
    "topic": "Protected routes and lazy-loaded pages",
    "choices": [
      "Guards run too slowly to protect data, so the server has to repeat them in a loop",
      "Guards work only in development builds and are removed from production bundles",
      "Browsers ignore route guards when the page is opened in a new tab by the user",
      "The user can bypass the guard, so the API must enforce authorization"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does React.lazy do?",
    "topic": "Protected routes and lazy-loaded pages",
    "choices": [
      "Loads a component's code only when it is first rendered",
      "Delays the component's state updates until the browser is idle again",
      "Renders the component after a timer that is set by the developer",
      "Renders the component on the server and sends only HTML to the client"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What must wrap a lazy component so something is shown while it loads?",
    "topic": "Protected routes and lazy-loaded pages",
    "choices": [
      "Suspense with a fallback",
      "ErrorBoundary only",
      "Fragment",
      "StrictMode"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the benefit of lazy-loading each route?",
    "topic": "Protected routes and lazy-loaded pages",
    "choices": [
      "Routes render faster after they load, since lazy code skips the first render",
      "The initial bundle is smaller, so the first page loads faster",
      "State is shared between routes automatically once the code is split into chunks",
      "It removes the need for a router, because chunks are picked by the browser"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where should the post-login redirect send a user who was blocked from a protected page?",
    "topic": "Protected routes and lazy-loaded pages",
    "choices": [
      "Always to the home page, whichever page the user was trying to reach",
      "To a random page of the application chosen by the router at login time",
      "Back to the page that they originally tried to open before the redirect",
      "To the previous browser tab that the user had open before logging in"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does an error boundary catch?",
    "topic": "Protected routes and lazy-loaded pages",
    "choices": [
      "Network errors from fetch",
      "Errors in event handlers and async code",
      "Errors thrown while rendering its child components",
      "Syntax errors in the build"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What problem can occur if a protected route checks auth before the session is restored?",
    "topic": "Protected routes and lazy-loaded pages",
    "choices": [
      "The router crashes with an error because the auth state is undefined",
      "Logged-in users are briefly redirected to login before the session loads",
      "The page never loads at all, even after the session has been restored",
      "Cookies are deleted by the browser because the check ran too early"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can you prefetch a lazy route's code before the user clicks?",
    "topic": "Protected routes and lazy-loaded pages",
    "choices": [
      "Add a long timeout",
      "Import it at the top of the file",
      "Call the dynamic import on hover or focus of the link",
      "Render the route in a hidden iframe"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which loading state fits a route change that is waiting on its code?",
    "topic": "Protected routes and lazy-loaded pages",
    "choices": [
      "A full-page browser alert",
      "A Suspense fallback such as a skeleton",
      "An empty page",
      "A hard refresh"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why validate on both client and server?",
    "topic": "Controlled forms, validation and error messages",
    "choices": [
      "Client validation replaces server validation, which only repeats the same work",
      "Browsers always run the server's validation code, so repeating it is just a habit",
      "Client checks give fast feedback, while server checks protect against bypass",
      "Servers cannot validate form data, since they never see the original form fields"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When should a field's error usually be shown?",
    "topic": "Controlled forms, validation and error messages",
    "choices": [
      "Only after the page reloads",
      "After the user has left the field or tried to submit",
      "On every keystroke from the first character",
      "Before the user types anything"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you connect an error message to its input for screen readers?",
    "topic": "Controlled forms, validation and error messages",
    "choices": [
      "Give the message an id and reference it with aria-describedby on the input",
      "Place the message directly above the input and add no attributes to either",
      "Put the error text in a title attribute on the input so it appears on hover",
      "Set a tabindex on the message so that it receives focus before the input"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should focus do after a failed submit?",
    "topic": "Controlled forms, validation and error messages",
    "choices": [
      "Jump to the footer of the page where the contact details are listed",
      "Reset to the top of the page and wait for the user to scroll back",
      "Stay on the submit button so that the user can press it one more time",
      "Move to the first invalid field or an error summary"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should a good error message include?",
    "topic": "Controlled forms, validation and error messages",
    "choices": [
      "A numeric error code only, which the support team can look up in a table",
      "What went wrong and how to fix it, in plain language",
      "The single word invalid, shown in red next to the field in question",
      "The full stack trace so that developers can find the failing line quickly"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you avoid double submission of a form?",
    "topic": "Controlled forms, validation and error messages",
    "choices": [
      "Remove the whole form from the page after the very first click of the user",
      "Reload the page after submission so that the browser forgets the first click",
      "Disable the submit button or ignore repeats while the request is pending",
      "Add a long artificial delay before the data is sent to the server on submit"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which input attributes provide cheap built-in validation?",
    "topic": "Controlled forms, validation and error messages",
    "choices": [
      "src, href and alt",
      "name, title and lang",
      "id, class and style",
      "required, type, min, max and pattern"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a form need to handle when the server rejects it?",
    "topic": "Controlled forms, validation and error messages",
    "choices": [
      "Redirect to the home page and discard everything that the user has entered",
      "Show the server's field errors next to the right inputs so users can fix them",
      "Silently ignore the response and let the user try submitting the form again",
      "Clear all of the fields so that the user starts over from the first one"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why preserve user input after a validation error?",
    "topic": "Controlled forms, validation and error messages",
    "choices": [
      "Validation requires old values",
      "Users should not have to retype everything",
      "Browsers clear fields otherwise",
      "It speeds up the server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a risk of showing a red error state with colour alone?",
    "topic": "Controlled forms, validation and error messages",
    "choices": [
      "Users who cannot distinguish colours may miss it",
      "It slows down rendering because colour changes need a full page repaint",
      "Screen readers read the word red aloud twice before the message",
      "Browsers block red text on pages that have not set a content policy"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a main advantage of React Hook Form?",
    "topic": "React Hook Form with Zod",
    "choices": [
      "It generates the server API for the form from the fields that are declared",
      "It stores the form values in the URL so that the page can be shared easily",
      "It uses uncontrolled inputs and refs to minimise re-renders while typing",
      "It replaces the HTML inputs with canvas elements that the library draws itself"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does register('email') return?",
    "topic": "React Hook Form with Zod",
    "choices": [
      "A promise that resolves with the email value once the form has been submitted",
      "The current value of the email field, updated every time the user types",
      "A validation error object for the field, or null when the value is valid",
      "Props that connect an input to the form, such as name, ref and handlers"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you use a Zod schema with React Hook Form?",
    "topic": "React Hook Form with Zod",
    "choices": [
      "Wrap the schema in a useEffect",
      "Convert the schema to HTML attributes",
      "Import the schema into each input",
      "Pass zodResolver(schema) as the resolver option"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where do validation errors appear in React Hook Form?",
    "topic": "React Hook Form with Zod",
    "choices": [
      "In localStorage, where they stay until the form is submitted again",
      "In formState.errors, keyed by the name of each registered field",
      "In the browser console only, where the library logs every failed rule",
      "In the URL as query parameters, one for each field that failed"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does handleSubmit do?",
    "topic": "React Hook Form with Zod",
    "choices": [
      "Runs validation, then calls your function with the values if they are valid",
      "Resets all of the form fields to their defaults before the next render happens",
      "Sends the form to the server directly, then shows a success message to the user",
      "Reads the DOM for each input and prints the values in the browser console only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the benefit of deriving the form's TypeScript type from the Zod schema?",
    "topic": "React Hook Form with Zod",
    "choices": [
      "The schema is sent to the server",
      "The compiler validates inputs at runtime",
      "Rules and types stay in sync from one definition",
      "Forms no longer need HTML"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can you set initial values in React Hook Form?",
    "topic": "React Hook Form with Zod",
    "choices": [
      "By editing the DOM",
      "With the defaultValues option",
      "With the value attribute on each input",
      "With a global variable"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does reset() do?",
    "topic": "React Hook Form with Zod",
    "choices": [
      "Reloads the whole page, which clears the form and all of the other state",
      "Restores the form to its default values and clears errors",
      "Deletes the form from the DOM until the next time the user navigates to it",
      "Submits the form with empty values so the server can clear its own record"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can a schema check that password and confirmPassword match?",
    "topic": "React Hook Form with Zod",
    "choices": [
      "Compare the two values in the browser console while the user types into the form",
      "Skip it on the client, since the server will check the passwords in any case",
      "Use two separate forms and compare their values after both are submitted",
      "Use a refine on the object schema and attach the error to a field path"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When might a controlled component still be needed inside React Hook Form?",
    "topic": "React Hook Form with Zod",
    "choices": [
      "For every plain text input, because the library never supports uncontrolled ones",
      "For HTML checkboxes, which are not supported by the register function at all",
      "For custom inputs that cannot expose a ref, using Controller",
      "Never, since Controller was removed from the library in the latest version"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What problem does TanStack Query solve?",
    "topic": "Server state with TanStack Query: caching, refetching",
    "choices": [
      "Fetching, caching and updating server data without hand-written loading and error state",
      "Styling components consistently across a whole application using design tokens",
      "Managing local interface state such as open modals and selected tabs in one store",
      "Bundling and minifying JavaScript so that pages load faster for visitors"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a query key?",
    "topic": "Server state with TanStack Query: caching, refetching",
    "choices": [
      "An array that uniquely identifies cached data and its parameters",
      "A secret password that the client sends so the API can identify the caller",
      "The key prop of the component that displays the data that was fetched",
      "A database index that speeds up the lookup of rows on the server side"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does staleTime control?",
    "topic": "Server state with TanStack Query: caching, refetching",
    "choices": [
      "How long fetched data is considered fresh before a background refetch is allowed",
      "How long the component can stay mounted before React removes it from the screen",
      "How long it takes until the cache is deleted from the browser's memory entirely",
      "How long a request may take before the library stops waiting and reports a timeout"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens when two components use the same query key at the same time?",
    "topic": "Server state with TanStack Query: caching, refetching",
    "choices": [
      "The first component is unmounted so that the second one can use the key",
      "Two separate requests are always sent, one for each of the components",
      "The second component receives an error because the key is already taken",
      "The request is deduplicated and they share the cached result"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the isPending state of a query tell you?",
    "topic": "Server state with TanStack Query: caching, refetching",
    "choices": [
      "The cached data is stale and a background refetch has been scheduled",
      "The query failed and the library is waiting before it retries the request",
      "There is no data yet while the first request is running",
      "The component unmounted before the request had time to finish loading"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does TanStack Query keep data fresh?",
    "topic": "Server state with TanStack Query: caching, refetching",
    "choices": [
      "It polls the server every ten milliseconds by default, whatever the data is",
      "It never refetches by itself, and the user has to reload the whole page",
      "It asks the user to confirm each refresh in a dialog before it fetches data",
      "It refetches in the background on events such as window focus or reconnect"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the correct way to avoid fetching until a value such as userId exists?",
    "topic": "Server state with TanStack Query: caching, refetching",
    "choices": [
      "Use the enabled option set to a boolean based on that value",
      "Throw an error whenever userId is empty, so that the query never starts",
      "Wrap the hook call in an if statement that checks whether the value exists",
      "Call the hook after an effect has finished setting the value in the state"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is gcTime (formerly cacheTime)?",
    "topic": "Server state with TanStack Query: caching, refetching",
    "choices": [
      "How long a single request may run before the library gives up and cancels it",
      "The time between two automatic refetches of the same query in the background",
      "The time that has to pass before a mutation is marked as successful",
      "How long unused cache entries are kept before being garbage collected"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why separate server state from client UI state?",
    "topic": "Server state with TanStack Query: caching, refetching",
    "choices": [
      "Server state is always a smaller amount of data, so it must be stored apart",
      "UI state is stored in the database, so it needs separate handling from the cache",
      "Server data is a cache that can go stale, while UI state is owned by the app",
      "The two kinds of state are written in different languages and cannot share a store"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What do infinite queries support?",
    "topic": "Server state with TanStack Query: caching, refetching",
    "choices": [
      "Queries that can never fail, because the library retries them without any limit",
      "Loading pages of data that are appended as the user scrolls or clicks load more",
      "Keeping cached data for an unlimited time so it never needs to be fetched again",
      "Running the same request over and over in a loop until the component unmounts"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a mutation in TanStack Query?",
    "topic": "Mutations, optimistic updates and error handling",
    "choices": [
      "A read-only request that fetches a list of records from the server and caches it",
      "A direct update to a DOM node that bypasses the virtual DOM of the library",
      "An operation that changes data on the server, such as create, update or delete",
      "A change to a CSS class that React applies to the element after rendering finishes"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should you usually do after a successful mutation to refresh related lists?",
    "topic": "Mutations, optimistic updates and error handling",
    "choices": [
      "Wait until the stale time has passed and let the lists update themselves",
      "Reload the browser tab so that every query fetches its data again",
      "Delete the whole cache, including the data that was not affected by it",
      "Invalidate the affected query keys so they refetch"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is an optimistic update?",
    "topic": "Mutations, optimistic updates and error handling",
    "choices": [
      "Waiting for the server before changing anything",
      "Updating the UI immediately, assuming the request will succeed",
      "Retrying a request until it works",
      "Hiding errors from the user"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What must an optimistic update provide in case the request fails?",
    "topic": "Mutations, optimistic updates and error handling",
    "choices": [
      "A second mutation that always succeeds",
      "A new server",
      "A rollback to the previous data",
      "A larger cache"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which callback of useMutation is a typical place to snapshot the cache before an optimistic change?",
    "topic": "Mutations, optimistic updates and error handling",
    "choices": [
      "onSettled",
      "onSuccess",
      "onUnmount",
      "onMutate"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why cancel in-flight queries before applying an optimistic update?",
    "topic": "Mutations, optimistic updates and error handling",
    "choices": [
      "It saves bandwidth, and that is the only effect that cancelling has",
      "A late response could overwrite the optimistic data that you just applied",
      "React requires every query to be cancelled before any mutation runs",
      "It resets the component so that the mutation can start from scratch"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What are the four states every data view should design for?",
    "topic": "Mutations, optimistic updates and error handling",
    "choices": [
      "Open, closed, hidden and visible",
      "Loading, empty, error and success",
      "Create, read, update and delete",
      "Mounted, updated, unmounted and failed"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is an empty state different from a loading state?",
    "topic": "Mutations, optimistic updates and error handling",
    "choices": [
      "Both mean the same thing, so one shared spinner is enough for every data view",
      "Loading states exist only for images, while empty states are used for all text",
      "The request finished and there is nothing to show, so the UI should explain what to do next",
      "Empty states appear before the request starts, while loading states appear after"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How should a failed mutation be communicated?",
    "topic": "Mutations, optimistic updates and error handling",
    "choices": [
      "Show a clear message, keep the user's input and offer a retry",
      "Show the raw HTTP status code on its own and nothing else to the user",
      "Ignore the failure silently and assume that the server will fix it later",
      "Reload the page so that the user starts again from a clean and empty form"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What makes a retry safe for a mutation like creating an order?",
    "topic": "Mutations, optimistic updates and error handling",
    "choices": [
      "A longer timeout on the request, so that the server has time to answer once",
      "Disabling the cache for that request, so that the response is never reused",
      "A faster server that responds before the user has time to click a second time",
      "An idempotency key, so repeating the request does not create duplicates"
    ],
    "answerIdx": 3
  }
]
```

LAYER: frontend-dev-10

```json
[
  {
    "stem": "What is the core idea of utility-first CSS?",
    "topic": "Utility-first CSS with Tailwind",
    "choices": [
      "Style elements by composing small single-purpose classes directly in the markup",
      "Generate inline style attributes at runtime from JavaScript objects for each element",
      "Write one large semantic class for every component and style it in a separate file",
      "Use only element selectors so that no class names appear in the markup"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does Tailwind keep the final CSS file small?",
    "topic": "Utility-first CSS with Tailwind",
    "choices": [
      "It downloads the CSS for each utility from a CDN when the page requests it",
      "It minifies the class names so that every utility is shortened to one letter",
      "It scans your source files and generates only the classes that are actually used",
      "It removes all the styles that the browser already applies by default"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the class 'md:flex' do in Tailwind?",
    "topic": "Utility-first CSS with Tailwind",
    "choices": [
      "Applies display: flex only on medium-sized monitors and never on phones or tablets",
      "Applies display: flex to every element that is a child of an element with md",
      "Applies display: flex when the user hovers over the element on a medium screen",
      "Applies display: flex only at the medium breakpoint and above"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How is a state such as hover written in Tailwind?",
    "topic": "Utility-first CSS with Tailwind",
    "choices": [
      "With a data attribute such as data-hover set on the element by JavaScript",
      "With a variant prefix such as hover:bg-purple-600",
      "With a pseudo-element suffix such as bg-purple-600:hover written after the class",
      "With a separate stylesheet that targets the element's id on mouseover"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where should repeated groups of utility classes usually be extracted to?",
    "topic": "Utility-first CSS with Tailwind",
    "choices": [
      "A global stylesheet with a long selector that matches every similar element",
      "A component, so the markup is reused instead of copying the class list",
      "A comment at the top of the file that developers copy when they need it",
      "A JSON file that the build step inlines into every page at compile time"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a common drawback of utility-first styling that teams accept?",
    "topic": "Utility-first CSS with Tailwind",
    "choices": [
      "Styles cannot be changed without editing the stylesheet and rebuilding",
      "The CSS file grows with every new page that is added to the application",
      "Markup contains long class lists, which can be harder to read",
      "Utilities only work for colours and cannot control layout or spacing"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can a design value that is not in the default theme be used for a single element?",
    "topic": "Utility-first CSS with Tailwind",
    "choices": [
      "By defining the value in a separate JavaScript file and importing it into the class",
      "With an arbitrary value such as w-[137px]",
      "By editing the framework's source files inside the node_modules folder",
      "By adding an inline style attribute, because utilities cannot take custom values"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should class names in Tailwind never be built by joining strings at runtime?",
    "topic": "Utility-first CSS with Tailwind",
    "choices": [
      "String concatenation is slower than literal class names in every browser",
      "The build scanner finds only complete class names that appear in the source",
      "Tailwind throws an error when it sees a template literal in a className",
      "Browsers reject class names that are created by JavaScript after the page loads"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the 'gap-4' utility apply?",
    "topic": "Utility-first CSS with Tailwind",
    "choices": [
      "A gap in the page layout where the element is hidden from view",
      "A border of four pixels between the element and its siblings",
      "A four pixel margin around the element on all four sides",
      "Spacing between children of a flex or grid container"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is responsive design in Tailwind described as mobile-first?",
    "topic": "Utility-first CSS with Tailwind",
    "choices": [
      "Prefixed utilities apply below a breakpoint and unprefixed ones apply above it",
      "Unprefixed utilities apply to all sizes, and prefixes add styles from a breakpoint upward",
      "Unprefixed utilities apply only to phones and prefixes switch to desktop styles",
      "The framework detects the device type and loads a different stylesheet for phones"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do CSS Modules avoid class name collisions?",
    "topic": "CSS Modules and scoped styles",
    "choices": [
      "The browser isolates each stylesheet in a separate shadow root automatically",
      "The framework adds an ID selector in front of every rule in the file",
      "The build turns each local class name into a unique generated name",
      "Class names are checked at runtime and renamed when two files use the same one"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you use a class from a CSS Module file in a React component?",
    "topic": "CSS Modules and scoped styles",
    "choices": [
      "Call a function that registers the file and returns the class as a string",
      "Write the file name in the component's props and let React resolve it",
      "Add a link tag for the module file and write className='button' as usual",
      "Import the styles object and use styles.button as the className"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What are class names in a CSS Module scoped to by default?",
    "topic": "CSS Modules and scoped styles",
    "choices": [
      "The element in the HTML that has the same id as the module file name",
      "The whole application, as with a normal stylesheet loaded by a link tag",
      "The page that is currently open, and they are removed when the user navigates",
      "The module file that defines them, local to the importing component"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you write a selector that should not be renamed in a CSS Module?",
    "topic": "CSS Modules and scoped styles",
    "choices": [
      "Wrap it in :global(...)",
      "Declare it with the @keep at-rule at the top of the stylesheet",
      "Put an exclamation mark after the class name in the file",
      "Place it in a file whose name does not end with .module.css"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a benefit of CSS Modules over writing one global stylesheet?",
    "topic": "CSS Modules and scoped styles",
    "choices": [
      "Styles live next to a component and cannot leak into other components",
      "No build step is required to deploy the application",
      "The CSS is applied faster by the browser because rules are compressed",
      "Selectors can use JavaScript variables directly inside the stylesheet"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you combine two module classes on one element?",
    "topic": "CSS Modules and scoped styles",
    "choices": [
      "Write both names in a single class attribute and separate them with a comma",
      "Declare an @extends rule in the second class so that it inherits the first one",
      "Import both of them as one object using the spread operator in the stylesheet file",
      "Join them in the className, using a template string or clsx"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the effect of the 'composes' keyword in CSS Modules?",
    "topic": "CSS Modules and scoped styles",
    "choices": [
      "It groups several selectors in one rule to reduce the file size",
      "One class reuses another class's styles and both are applied",
      "It imports a whole stylesheet from a remote URL at runtime",
      "It marks a class as private so that other files cannot use it"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why might a team prefer CSS Modules to CSS-in-JS libraries that inject styles at runtime?",
    "topic": "CSS Modules and scoped styles",
    "choices": [
      "Styles are extracted at build time, so there is no runtime cost for generating them",
      "CSS-in-JS libraries do not support media queries or pseudo-classes",
      "CSS Modules automatically include a design system and a component library",
      "CSS Modules can use JavaScript values in the stylesheet while CSS-in-JS cannot"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens to unused classes in a CSS Module file?",
    "topic": "CSS Modules and scoped styles",
    "choices": [
      "They are converted into inline styles on the nearest component",
      "They cause the build to fail with a warning about dead code",
      "They stay in the output unless a tool removes unused CSS",
      "They are removed from the output by the browser when the page loads"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can a CSS Module class be styled differently based on a prop?",
    "topic": "CSS Modules and scoped styles",
    "choices": [
      "Pass the prop to the CSS file as an argument in the import statement",
      "Choose the class in JavaScript, or use a data attribute selector",
      "Rename the stylesheet to match the value of the prop",
      "Write a JavaScript expression inside the stylesheet that reads the prop"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a design token?",
    "topic": "Design tokens and theming with custom properties",
    "choices": [
      "A browser feature that stores a user's favourite colours",
      "A named value for a design decision, such as colour or spacing",
      "A secret string that authorizes a designer to publish changes to the site",
      "A component in a UI library that renders a coloured badge"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why define colours as CSS custom properties rather than hard-coding hex values everywhere?",
    "topic": "Design tokens and theming with custom properties",
    "choices": [
      "Hex values are not supported in modern browsers inside component files",
      "Changing a value in one place restyles every use, which also enables themes",
      "Custom properties remove the need for a stylesheet in the application",
      "Custom properties are cached by the browser and render faster than hex values"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can a theme be switched at runtime with custom properties?",
    "topic": "Design tokens and theming with custom properties",
    "choices": [
      "Rewrite every colour in the DOM with JavaScript when the user clicks",
      "Reload the page with a different stylesheet for each theme",
      "Change the variables on a parent element, such as a data-theme attribute",
      "Generate a new CSS file on the server for each user's choice"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What are semantic tokens such as --color-surface or --color-text-muted?",
    "topic": "Design tokens and theming with custom properties",
    "choices": [
      "Tokens that are only used by screen readers to describe a page",
      "Tokens that the browser creates automatically from the page content",
      "Names of the colours with their hex values written in the token name",
      "Names that describe the role of a value, which map to raw palette values"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why separate a raw palette from semantic tokens?",
    "topic": "Design tokens and theming with custom properties",
    "choices": [
      "The raw palette can be loaded faster than the semantic tokens by the browser",
      "It prevents designers from changing the colours in the design tool",
      "Semantic tokens are required by the HTML specification for colour usage",
      "Themes can remap roles to different palette values without changing component code"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What problem do spacing and type scales solve?",
    "topic": "Design tokens and theming with custom properties",
    "choices": [
      "They keep sizes consistent by limiting them to a small set of values",
      "They let designers use any pixel value without checking it",
      "They stop the browser from zooming the page on mobile devices",
      "They make images load at the right size for each screen"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where should tokens for a design system be defined so every component can read them?",
    "topic": "Design tokens and theming with custom properties",
    "choices": [
      "In localStorage, where scripts can read them when the page loads",
      "On :root, so that they inherit down to every element",
      "In an HTML comment at the top of the document that tools can parse",
      "Inside each component's own file, repeated with the same names"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the benefit of exporting tokens in a neutral format such as JSON?",
    "topic": "Design tokens and theming with custom properties",
    "choices": [
      "It prevents the tokens from ever being changed after the build",
      "The browser can apply a JSON file as a stylesheet with a link tag",
      "The same values can generate CSS, native app styles and design tool libraries",
      "JSON files render faster in the browser than the equivalent stylesheet"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a token naming convention like --space-4 help with?",
    "topic": "Design tokens and theming with custom properties",
    "choices": [
      "The browser can optimise the spacing by sorting the names alphabetically",
      "The tokens are applied automatically to the elements with the same name",
      "Developers and designers can refer to the same step on a shared scale",
      "The names are used as the keys for the HTTP caching layer"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does a fallback in var(--brand, #6d28d9) help?",
    "topic": "Design tokens and theming with custom properties",
    "choices": [
      "If --brand is undefined, the second value is used",
      "It lets the variable be assigned a new value from JavaScript",
      "The browser downloads the colour from the network if the variable is missing",
      "It validates that the colour meets contrast requirements automatically"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a component variant, such as a Button's size or intent?",
    "topic": "Component variants and accessible primitives",
    "choices": [
      "A runtime error state that a component enters after a failed request",
      "A way to inject arbitrary CSS into a component from its parent",
      "A named option that selects a predefined set of styles for the component",
      "A copy of the component stored in another repository for testing"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why expose a small set of variants instead of accepting arbitrary style props?",
    "topic": "Component variants and accessible primitives",
    "choices": [
      "The browser refuses to render components with too many props",
      "Variants are required by the React specification for reusable components",
      "It keeps the interface consistent and stops one-off styles drifting",
      "It makes the component render faster because there are fewer props"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What do helpers like class-variance-authority do?",
    "topic": "Component variants and accessible primitives",
    "choices": [
      "Download variants from a shared registry on every page load",
      "Generate CSS files from the design tool automatically at build time",
      "Check the contrast ratio of colours used in the variants",
      "Map variant props to the right class names in a typed, readable way"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a headless UI primitive?",
    "topic": "Component variants and accessible primitives",
    "choices": [
      "A component library that ships with its own complete theme",
      "A component that has no props and cannot be configured",
      "A component that renders without a document on the server only",
      "A component that gives behaviour but leaves styling to you"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why use a primitive library for a dialog or dropdown instead of building from scratch?",
    "topic": "Component variants and accessible primitives",
    "choices": [
      "Building a dialog from scratch is not allowed by the accessibility guidelines",
      "Focus management, keyboard handling and ARIA are hard to get right and are already tested",
      "Dialogs that are written by hand always fail in modern browsers because of security rules",
      "Primitive libraries are faster than the native HTML elements in all of the cases"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the 'asChild' pattern, found in some primitive libraries, allow?",
    "topic": "Component variants and accessible primitives",
    "choices": [
      "Rendering the primitive's behaviour onto your own element",
      "Rendering a component as a child of the document body",
      "Making a component inherit all the props of its parent component",
      "Hiding the component from assistive technology"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How should a Button component expose a disabled state?",
    "topic": "Component variants and accessible primitives",
    "choices": [
      "Pass the native disabled attribute through to the browser",
      "Hide the button with display: none whenever it should be disabled",
      "Remove the button from the DOM and show plain text in its place",
      "Add a grey class to the button and leave its click handler working"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should components forward refs and extra props to the underlying element?",
    "topic": "Component variants and accessible primitives",
    "choices": [
      "Consumers can attach handlers, aria attributes and measure the element",
      "It prevents consumers from changing the component's styles",
      "The browser requires refs to be forwarded for every custom element",
      "It lets the component run faster by skipping the render phase"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is composition in component design?",
    "topic": "Component variants and accessible primitives",
    "choices": [
      "Merging several components into one large component with many flags",
      "Building complex UI by combining smaller components such as Card and CardBody",
      "Replacing components with plain functions that return strings of HTML",
      "Copying the markup of a component into each page that needs it"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the advantage of a compound component API like <Tabs><Tabs.List/><Tabs.Panel/></Tabs>?",
    "topic": "Component variants and accessible primitives",
    "choices": [
      "Related parts share state through context while consumers control the layout",
      "The parts are bundled as one function call that takes several arguments at once",
      "Only a single set of tabs can be created on each page when you use this pattern",
      "The tabs render in a separate process, which makes them noticeably faster"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the prefers-color-scheme media feature report?",
    "topic": "Dark mode and prefers-color-scheme",
    "choices": [
      "The brightness level that the user's screen is set to",
      "Whether the user's system is set to a light or dark appearance",
      "Which colours are most used by the page's stylesheet",
      "The number of colours that the display is able to show"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a good default for the theme on a first visit?",
    "topic": "Dark mode and prefers-color-scheme",
    "choices": [
      "Pick randomly so users see both themes",
      "Always dark, because it saves energy on every device",
      "Always light, because most websites use light themes by default",
      "Follow the system preference, and let the user override it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can a user's explicit theme choice be remembered?",
    "topic": "Dark mode and prefers-color-scheme",
    "choices": [
      "Add it to the page title so that the browser restores it later",
      "Store it, for example in localStorage, and apply it before first paint",
      "Keep it in a variable that exists only in the current tab",
      "Send it to the server with every request as a custom header"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What causes a flash of the wrong theme when a page loads?",
    "topic": "Dark mode and prefers-color-scheme",
    "choices": [
      "The server renders both of the themes and then hides one using display: none",
      "The browser downloads both of the themes and shows the larger one first",
      "Dark mode requires a full page reload because of the way the browser is designed",
      "The theme is applied by JavaScript after the first paint instead of before"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How is dark mode usually implemented with custom properties?",
    "topic": "Dark mode and prefers-color-scheme",
    "choices": [
      "Duplicate every component and give the copies dark colours",
      "Apply a CSS filter that inverts the whole page",
      "Redefine the colour variables under a dark selector or media query",
      "Ship a second website at a dark subdomain"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is wrong with simply inverting colours using filter: invert(1) for dark mode?",
    "topic": "Dark mode and prefers-color-scheme",
    "choices": [
      "It makes the page load slower than a normal theme",
      "Images and brand colours look wrong and contrast may fail",
      "It works only on text and has no effect on backgrounds",
      "The filter is not supported by any browser except one"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does 'color-scheme: dark light' on the root element change?",
    "topic": "Dark mode and prefers-color-scheme",
    "choices": [
      "The user's operating system theme is switched to dark",
      "All of the images on the page are darkened",
      "The page's custom properties are renamed for the dark theme",
      "Built-in controls and scrollbars match the theme the page is using"
    ],
    "answerIdx": 3
  },
  {
    "stem": "In dark themes, why avoid pure white text on pure black backgrounds for long text?",
    "topic": "Dark mode and prefers-color-scheme",
    "choices": [
      "Extreme contrast can cause glare, so softer values are easier to read",
      "It always violates the contrast requirements of the accessibility guidelines",
      "Pure black is not a valid colour for backgrounds in CSS stylesheets",
      "Pure white cannot be displayed correctly on screens in dark mode"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you apply a dark colour only when the system is dark and the user has not overridden it?",
    "topic": "Dark mode and prefers-color-scheme",
    "choices": [
      "Use a media query and exclude pages where a manual theme attribute is set",
      "Duplicate the page and redirect dark mode users to a different URL",
      "Read the theme from the user agent string sent with the request",
      "Use JavaScript to read the system theme on every scroll event"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How should images and illustrations be handled in a dark theme?",
    "topic": "Dark mode and prefers-color-scheme",
    "choices": [
      "Provide variants or check they stay legible on the dark background",
      "Convert them to black and white automatically",
      "Remove them from the page when the theme is dark",
      "Leave them unchanged since images are not affected by themes"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is Storybook?",
    "topic": "Documenting components with Storybook",
    "choices": [
      "A server framework for rendering pages with templates",
      "A database for storing design files",
      "A tool for translating websites into several languages",
      "A tool for building and documenting UI components in isolation"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a story?",
    "topic": "Documenting components with Storybook",
    "choices": [
      "A test that checks the response codes returned by a server endpoint",
      "A written specification of the requirements for the whole project",
      "A saved example of a component rendered with chosen props and state",
      "A log of the changes made to a component over its lifetime"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why are stories useful for developing components?",
    "topic": "Documenting components with Storybook",
    "choices": [
      "They make the component load faster for users",
      "They replace the need for any types and tests in the project",
      "Each state can be viewed without navigating the whole application",
      "They automatically deploy the component to production"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does an 'args' object in a story do?",
    "topic": "Documenting components with Storybook",
    "choices": [
      "Defines the props passed to the component, editable in Controls",
      "Lists the command line options used when starting the Storybook server",
      "Stores a history of the stories that reviewers have opened recently",
      "Describes the server settings that the story uses to fetch its data"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can Storybook help with accessibility?",
    "topic": "Documenting components with Storybook",
    "choices": [
      "It sets the focus order for components automatically",
      "It makes every component accessible without any markup",
      "An addon can run automated checks, such as axe, on each story",
      "It blocks inaccessible components from being committed"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the purpose of interaction tests in Storybook?",
    "topic": "Documenting components with Storybook",
    "choices": [
      "To test the internet connection of the build server that runs the checks",
      "To measure how long a story takes to download over a slow network connection",
      "To translate user clicks into keyboard shortcuts that the story can handle",
      "To simulate user actions in a story and assert on the result"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do visual regression tests work with stories?",
    "topic": "Documenting components with Storybook",
    "choices": [
      "A screenshot of each story is compared with a stored baseline image",
      "The browser compares the page's HTML with a template",
      "The stylesheet is compared line by line with the previous commit",
      "A human reviewer approves each deployment by email"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why document components with usage guidelines next to the stories?",
    "topic": "Documenting components with Storybook",
    "choices": [
      "It is required for the stories to be displayed in Storybook",
      "It removes the need for design reviews",
      "Teams learn when to use a component and how, which prevents misuse",
      "Documentation makes the component bundle smaller"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where does Storybook decorator code usually go?",
    "topic": "Documenting components with Storybook",
    "choices": [
      "Inside the component source to change its behaviour in production",
      "In the package.json scripts section to start the app",
      "Wrapping stories with context such as theme providers or layout",
      "In the server configuration to set up HTTPS"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the main benefit of publishing a Storybook for a design system?",
    "topic": "Documenting components with Storybook",
    "choices": [
      "It replaces the source code of the components that it documents",
      "It enforces the use of the design system by failing builds that differ",
      "It hosts the production application that the end users visit daily",
      "Designers and developers share a living reference of real components"
    ],
    "answerIdx": 3
  }
]
```

LAYER: frontend-dev-11

```json
[
  {
    "stem": "What are the four principles of WCAG?",
    "topic": "WCAG principles: perceivable, operable, understandable, robust",
    "choices": [
      "Fast, Secure, Responsive and Searchable",
      "Visible, Clickable, Readable and Printable",
      "Simple, Consistent, Compatible and Tested",
      "Perceivable, Operable, Understandable and Robust"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which WCAG conformance level is the common target for legal and professional requirements?",
    "topic": "WCAG principles: perceivable, operable, understandable, robust",
    "choices": [
      "Level AAA for every page",
      "Level AA",
      "Level B",
      "Level A only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A video has no captions. Which WCAG principle is mostly violated?",
    "topic": "WCAG principles: perceivable, operable, understandable, robust",
    "choices": [
      "Robust, because the video file format is not supported by all browsers",
      "Understandable, because the video language is not declared",
      "Perceivable, because deaf users cannot access the audio information",
      "Operable, because the video controls cannot be reached with a keyboard"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which problem is most clearly an Operable failure?",
    "topic": "WCAG principles: perceivable, operable, understandable, robust",
    "choices": [
      "A menu that can be opened only with a mouse hover",
      "A page that is marked up with invalid HTML",
      "An image of a chart with no text alternative",
      "A form error that is written in confusing language"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the Understandable principle ask for?",
    "topic": "WCAG principles: perceivable, operable, understandable, robust",
    "choices": [
      "Content that all users can see without any assistance",
      "Content that works with future browsers and assistive tools",
      "Content and interface behaviour that are readable and predictable",
      "Content that loads within two seconds on any network"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the Robust principle mean in practice?",
    "topic": "WCAG principles: perceivable, operable, understandable, robust",
    "choices": [
      "Content works across browsers and assistive tools through standard markup",
      "The site passes penetration testing with no known vulnerabilities",
      "The page remains online even when the server receives too much traffic",
      "Every image on the page is stored in more than one format"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is accessibility mostly achieved with semantic HTML instead of extra ARIA?",
    "topic": "WCAG principles: perceivable, operable, understandable, robust",
    "choices": [
      "Native elements are always faster to render than ARIA widgets",
      "Semantic HTML is required by search engines but not by assistive tools",
      "ARIA is deprecated and no longer works in modern browsers",
      "Native elements already carry roles, names and keyboard behaviour"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Who benefits from accessible design besides people with permanent disabilities?",
    "topic": "WCAG principles: perceivable, operable, understandable, robust",
    "choices": [
      "Only developers who write the accessibility tests for the project",
      "People with temporary or situational limits, such as a broken arm or bright sunlight",
      "Only users who browse on slow connections",
      "Nobody else, since accessibility features target specific conditions only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the purpose of a skip link at the top of a page?",
    "topic": "WCAG principles: perceivable, operable, understandable, robust",
    "choices": [
      "It hides the navigation from search engines",
      "It lets keyboard users jump past repeated navigation to the main content",
      "It skips the loading screen for returning visitors",
      "It lets mouse users skip an advertisement at the start of a video"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does it mean that WCAG success criteria are testable?",
    "topic": "WCAG principles: perceivable, operable, understandable, robust",
    "choices": [
      "Each criterion can be checked with a clear pass or fail result",
      "The criteria are automatically verified by every browser on load",
      "The criteria can only be tested by the original authors of the standard",
      "The criteria apply only to pages that include a test attribute"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which key moves focus to the next interactive element?",
    "topic": "Keyboard navigation and focus management",
    "choices": [
      "Space",
      "Enter",
      "Tab",
      "Escape"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the problem with the CSS rule 'outline: none' on focusable elements?",
    "topic": "Keyboard navigation and focus management",
    "choices": [
      "The element can no longer receive clicks from a mouse",
      "Keyboard users can no longer see where the focus is",
      "The browser stops sending focus events to the element",
      "The element is removed from the accessibility tree"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which element should you use for something that triggers an action on click?",
    "topic": "Keyboard navigation and focus management",
    "choices": [
      "An anchor without an href",
      "A span with a pointer cursor",
      "A button element",
      "A div with an onclick handler"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does tabindex='0' do?",
    "topic": "Keyboard navigation and focus management",
    "choices": [
      "Removes the element from the tab order so keyboard users skip it",
      "Moves the element to the very start of the tab order on the page",
      "Makes a non-interactive element focusable in the natural tab order",
      "Makes the element ignore all of the keyboard events that it receives"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should you avoid positive tabindex values such as tabindex='3'?",
    "topic": "Keyboard navigation and focus management",
    "choices": [
      "They override the natural order and make focus hard to follow or maintain",
      "They are only valid on form elements, and are invalid on links",
      "They make the element focusable only for users of screen readers",
      "Browsers ignore positive values in every case, so they do nothing at all"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does tabindex='-1' allow?",
    "topic": "Keyboard navigation and focus management",
    "choices": [
      "The element becomes the last item in the tab order of the whole page",
      "The element can no longer be clicked with a mouse or a touch screen",
      "The element can be focused from script but is not in the tab order",
      "The element is hidden from assistive technology and from keyboard users"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When a modal dialog opens, where should focus go?",
    "topic": "Keyboard navigation and focus management",
    "choices": [
      "Nowhere in particular, because the dialog is announced automatically",
      "Into the dialog, usually to its first focusable element or its heading",
      "To the page footer, so that the dialog is out of the way of the rest",
      "To the element that was focused before, which should stay focused there"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When a modal dialog closes, where should focus return?",
    "topic": "Keyboard navigation and focus management",
    "choices": [
      "To the element that opened the dialog",
      "To the first link on the page",
      "To the browser address bar",
      "To the top of the document"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a focus trap in a modal do?",
    "topic": "Keyboard navigation and focus management",
    "choices": [
      "Moves focus away whenever the user presses Escape",
      "Keeps Tab and Shift+Tab cycling inside the dialog while it is open",
      "Traps mouse clicks outside the dialog so nothing happens",
      "Prevents the user from closing the dialog with the keyboard"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can keyboard users close most dialogs?",
    "topic": "Keyboard navigation and focus management",
    "choices": [
      "By pressing the F1 key",
      "By pressing Escape",
      "By pressing the Delete key",
      "By pressing Alt and F4 together"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the first rule of ARIA?",
    "topic": "ARIA roles, states and when not to use them",
    "choices": [
      "Add an aria-label to every element so that all of them have a name",
      "Never use ARIA in any circumstance, because native elements replace it",
      "Use role='button' on all clickable elements, whatever their tag is",
      "Use a native HTML element with the right semantics when one exists"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does aria-expanded='true' on a button communicate?",
    "topic": "ARIA roles, states and when not to use them",
    "choices": [
      "The controlled region is currently open",
      "The button has been clicked at least once",
      "The region is hidden from assistive technology",
      "The button is wider than its container"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does aria-label do?",
    "topic": "ARIA roles, states and when not to use them",
    "choices": [
      "Gives an element an accessible name that assistive tools announce",
      "Adds visible text beside the element for sighted users to read",
      "Shows a tooltip to mouse users when they hover over the element",
      "Sets the id that a label element uses to refer to this element"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When is aria-hidden='true' appropriate?",
    "topic": "ARIA roles, states and when not to use them",
    "choices": [
      "On decorative content that assistive technology should ignore",
      "On the main content to reduce the amount read aloud",
      "On any element that is visually hidden with CSS",
      "On buttons that are temporarily not needed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is a wrong ARIA attribute worse than none?",
    "topic": "ARIA roles, states and when not to use them",
    "choices": [
      "It can give assistive technology false information about the element",
      "Browsers show a warning to every visitor on the page",
      "It causes the page to fail HTML validation and stop rendering",
      "It disables the element's keyboard behaviour permanently"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does role='button' on a div NOT provide by itself?",
    "topic": "ARIA roles, states and when not to use them",
    "choices": [
      "A name derived from the content",
      "Keyboard operability such as focus and activation by Enter and Space",
      "A role in the accessibility tree",
      "The announcement of the element as a button by a screen reader"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is aria-describedby used for?",
    "topic": "ARIA roles, states and when not to use them",
    "choices": [
      "Hiding an element from the visual layout while keeping it in the tree",
      "Giving the element a unique id that scripts are able to look up",
      "Pointing to other text that describes this element, such as an error",
      "Moving keyboard focus to another element as soon as this one changes"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does a screen reader know that a custom tab list works as tabs?",
    "topic": "ARIA roles, states and when not to use them",
    "choices": [
      "From CSS class names that happen to contain the word tab in them",
      "From the colour that is used for the currently active tab",
      "From the order in which the elements appear in the DOM alone",
      "From roles like tablist, tab and tabpanel plus states like aria-selected"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does aria-current='page' mark?",
    "topic": "ARIA roles, states and when not to use them",
    "choices": [
      "The most recently visited page in the browser history",
      "A link that opens in the current tab",
      "The page that is currently loading",
      "The link that points to the page the user is currently on"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where can you find recommended keyboard interaction and ARIA patterns for custom widgets?",
    "topic": "ARIA roles, states and when not to use them",
    "choices": [
      "The WAI-ARIA Authoring Practices Guide",
      "The browser's developer console documentation",
      "The HTML living standard's section on media elements",
      "The CSS specification for pseudo-classes"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How should every form control get an accessible name?",
    "topic": "Accessible forms, dialogs and live regions",
    "choices": [
      "With a heading placed above the whole form that describes its purpose",
      "With a title attribute on the form element that wraps all of the controls",
      "With a visible label tied to the control through for and id",
      "With placeholder text only, since screen readers announce it every time"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is placeholder text not a substitute for a label?",
    "topic": "Accessible forms, dialogs and live regions",
    "choices": [
      "Placeholders are not allowed in HTML5 inputs",
      "Placeholders cannot be read by any assistive technology",
      "It disappears when typing and often has poor contrast",
      "Browsers remove placeholders when the form validates"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can required fields be communicated accessibly?",
    "topic": "Accessible forms, dialogs and live regions",
    "choices": [
      "By making the required fields a little bigger than the optional ones",
      "By adding an asterisk to the page title and not to the fields",
      "With a red border around the field and no other kind of indication",
      "With the required attribute and a visible cue that is not colour alone"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should happen when a form submission fails with errors?",
    "topic": "Accessible forms, dialogs and live regions",
    "choices": [
      "The page reloads and shows the form in its original state",
      "Errors are tied to their fields and focus moves to the first error",
      "A red banner is displayed at the top for sighted users only",
      "A browser alert reports the number of errors and nothing else"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is an ARIA live region used for?",
    "topic": "Accessible forms, dialogs and live regions",
    "choices": [
      "Updating the page title in the browser tab as content changes",
      "Showing a loading spinner for sighted users while data is fetched",
      "Announcing dynamic changes, like status messages, without moving focus",
      "Streaming video or audio content to assistive technology in real time"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which live region setting is appropriate for a non-urgent status message like 'Saved'?",
    "topic": "Accessible forms, dialogs and live regions",
    "choices": [
      "aria-live='assertive'",
      "aria-live='polite'",
      "aria-live='urgent'",
      "aria-live='off'"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What attributes make a native dialog accessible when used with showModal()?",
    "topic": "Accessible forms, dialogs and live regions",
    "choices": [
      "The browser handles focus and makes the background inert for you",
      "A tabindex of 0 on every single element that is inside of the dialog",
      "None, since dialog elements are never accessible without extra scripts",
      "A hidden attribute on the main content while the dialog is open"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should a dialog have for screen reader users?",
    "topic": "Accessible forms, dialogs and live regions",
    "choices": [
      "A background colour with 4.5:1 contrast against the rest of the page",
      "A visible countdown timer that closes the dialog after a few seconds",
      "An accessible name, such as aria-labelledby pointing to its heading",
      "An autoplaying sound that tells the user when the dialog opens"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why group radio buttons in a fieldset with a legend?",
    "topic": "Accessible forms, dialogs and live regions",
    "choices": [
      "It hides the radio inputs from sighted users",
      "The fieldset makes the radio buttons load faster",
      "The legend names the group and is announced with each option",
      "It prevents the user from selecting more than one"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How should an icon-only button be made accessible?",
    "topic": "Accessible forms, dialogs and live regions",
    "choices": [
      "Give it an accessible name, such as visually hidden text or aria-label",
      "Rely on the colour of the icon to explain what the button does",
      "Add a title attribute only and leave out any other accessible name",
      "Make the icon larger than 48 pixels so that it is easy to recognise"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What contrast ratio does WCAG AA require for normal-size body text?",
    "topic": "Color contrast, motion and reduced-motion preferences",
    "choices": [
      "At least 3 to 1 for all text",
      "At least 10 to 1",
      "At least 2 to 1",
      "At least 4.5 to 1"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What contrast ratio does WCAG AA require for large text?",
    "topic": "Color contrast, motion and reduced-motion preferences",
    "choices": [
      "At least 4.5 to 1",
      "At least 7 to 1",
      "At least 1.5 to 1",
      "At least 3 to 1"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why must information not be conveyed by colour alone?",
    "topic": "Color contrast, motion and reduced-motion preferences",
    "choices": [
      "Colour changes cannot be read by search engines that index the page",
      "Users with colour blindness may be unable to tell the colours apart",
      "Screens at low brightness remove all of the colour from the content",
      "Browsers cannot display more than a small number of colours at once"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the prefers-reduced-motion media query allow you to do?",
    "topic": "Color contrast, motion and reduced-motion preferences",
    "choices": [
      "Disable all JavaScript timers on the page",
      "Make animations run faster on slow devices",
      "Detect whether the user's device has a motion sensor",
      "Reduce or remove animation for users who asked for less motion"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which kind of motion is most likely to cause problems for users with vestibular disorders?",
    "topic": "Color contrast, motion and reduced-motion preferences",
    "choices": [
      "A small colour change on hover",
      "A text cursor blinking in an input",
      "A fade of a tooltip lasting a fraction of a second",
      "Large parallax scrolling or zooming effects"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How should auto-playing content that lasts more than five seconds be handled?",
    "topic": "Color contrast, motion and reduced-motion preferences",
    "choices": [
      "Let it run since users can turn off their screens",
      "Start it again each time the user scrolls",
      "Provide a way to pause, stop or hide it",
      "Make it louder so users notice the controls"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the minimum size recommended for touch targets under WCAG 2.2 Level AA?",
    "topic": "Color contrast, motion and reduced-motion preferences",
    "choices": [
      "At least 24 by 24 CSS pixels, though larger targets are better",
      "At least 4 by 4 CSS pixels, because smaller targets cannot be rendered",
      "At least 100 by 100 CSS pixels, so that every target covers a thumb",
      "There is no size requirement for targets in the current guidelines"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why must a layout still work at 200 percent browser zoom?",
    "topic": "Color contrast, motion and reduced-motion preferences",
    "choices": [
      "Users with low vision enlarge content and it has to stay readable",
      "Zooming is disabled for pages that fail the contrast checks",
      "Browsers limit all pages to 200 percent zoom",
      "Zoom changes the language of the page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can a focus indicator meet accessibility guidance?",
    "topic": "Color contrast, motion and reduced-motion preferences",
    "choices": [
      "It is invisible until the user presses a mouse button on the page",
      "It uses only a subtle change in the font weight of the text",
      "It has enough contrast with the background and is clearly visible",
      "It appears after a delay of two seconds so that it does not distract"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the :focus-visible pseudo-class help with?",
    "topic": "Color contrast, motion and reduced-motion preferences",
    "choices": [
      "Making hidden elements visible when a script gives them keyboard focus",
      "Preventing elements from receiving focus when the page first loads",
      "Hiding the focus ring from assistive technology and screen readers",
      "Showing focus styles mainly for keyboard interaction, not on every mouse click"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What can automated tools such as axe reliably detect?",
    "topic": "Testing with axe, Lighthouse and a screen reader",
    "choices": [
      "Whether keyboard focus order makes sense to a human",
      "Whether the page is pleasant for screen reader users",
      "Every accessibility problem on a page",
      "A subset of issues, such as missing alt text and low contrast"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is manual testing still necessary?",
    "topic": "Testing with axe, Lighthouse and a screen reader",
    "choices": [
      "Manual testing is faster than running automated tools on a large site",
      "Issues such as focus order and meaningful alt text need human judgement",
      "Automated tools are always wrong, so every finding must be re-checked",
      "Only manual testing is able to check whether the HTML is valid"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which test checks that all functionality works without a mouse?",
    "topic": "Testing with axe, Lighthouse and a screen reader",
    "choices": [
      "Running Lighthouse performance audits",
      "Checking the page in a high-resolution display",
      "Using the page with only the keyboard",
      "Validating the CSS file"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which of these is a screen reader?",
    "topic": "Testing with axe, Lighthouse and a screen reader",
    "choices": [
      "Webpack",
      "NVDA",
      "Lighthouse",
      "Prettier"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a Lighthouse accessibility score of 100 guarantee?",
    "topic": "Testing with axe, Lighthouse and a screen reader",
    "choices": [
      "That the page meets every success criterion of WCAG level AAA",
      "Only that the automated checks passed, not that the page is accessible",
      "That no manual review is needed before the page is released",
      "That blind users can complete every task on the page without help"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a good place in the workflow to catch accessibility problems early?",
    "topic": "Testing with axe, Lighthouse and a screen reader",
    "choices": [
      "A single audit that is carried out just before the product launch",
      "Editor linting plus automated checks in continuous integration",
      "During the design review only, because code cannot cause issues",
      "After users report the problems that they find in production"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should you listen for when testing a page with a screen reader?",
    "topic": "Testing with axe, Lighthouse and a screen reader",
    "choices": [
      "Whether the page makes a sound at the moment that it finishes loading",
      "Whether the synthetic voice sounds natural and pleasant to the ear",
      "Whether the screen reader speaks the colour value of every pixel",
      "Whether names, roles and reading order make sense without the screen"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the accessibility tree represent?",
    "topic": "Testing with axe, Lighthouse and a screen reader",
    "choices": [
      "The roles, names and states the browser exposes to assistive technology",
      "The layout of the files in a project that follows accessibility rules",
      "A list of the keyboard shortcuts that are available on the page",
      "A diagram of how the CSS cascade resolved each declared property"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which tool shows the accessibility tree and computed names in the browser?",
    "topic": "Testing with axe, Lighthouse and a screen reader",
    "choices": [
      "The Application panel, which lists storage, cookies and service workers",
      "The Network panel, which lists every request made by the current page",
      "The Performance panel, which records frames and long tasks in a timeline",
      "The Accessibility panel in the browser's developer tools"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the benefit of including people with disabilities in usability testing?",
    "topic": "Testing with axe, Lighthouse and a screen reader",
    "choices": [
      "They replace the need for any automated tests",
      "They are required to sign off every release",
      "They test only the visual design",
      "They find real barriers that checklists and tools miss"
    ],
    "answerIdx": 3
  }
]
```

LAYER: frontend-dev-12

```json
[
  {
    "stem": "In client-side rendering, what does the server send for the initial page?",
    "topic": "CSR, SSR, SSG and ISR trade-offs",
    "choices": [
      "A near-empty HTML shell and a bundle that builds the page",
      "A static HTML file for every URL, created ahead of time at build",
      "A fully rendered HTML page that was generated for this exact request",
      "A PDF version of the page that the browser then turns into HTML"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a main advantage of server-side rendering over client-side rendering?",
    "topic": "CSR, SSR, SSG and ISR trade-offs",
    "choices": [
      "The browser needs no JavaScript for any interactivity on the page",
      "It removes the need for hydration and keeps bundles identical",
      "The first view arrives as HTML, which helps first paint and search engines",
      "The server never has to do any work for repeat visitors"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does static site generation (SSG) do?",
    "topic": "CSR, SSR, SSG and ISR trade-offs",
    "choices": [
      "Stores pages in local storage for offline use",
      "Builds HTML pages ahead of time so they can be served from a CDN",
      "Renders the page in the browser after the data loads",
      "Generates a new HTML page for every request on the server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does incremental static regeneration (ISR) add to static generation?",
    "topic": "CSR, SSR, SSG and ISR trade-offs",
    "choices": [
      "Pages are removed from the CDN when they are older than a day",
      "Pages are rebuilt in the background without a full redeploy",
      "Pages are compiled into native mobile applications",
      "Pages are rendered on the client when they become visible"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which page is a good fit for static generation?",
    "topic": "CSR, SSR, SSG and ISR trade-offs",
    "choices": [
      "A page that must display live stock prices on every single view",
      "A dashboard that shows data that is unique to each signed-in user",
      "A shopping cart that changes with every click that the user makes",
      "A marketing page that rarely changes and looks the same for all"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which page is a good fit for server-side rendering?",
    "topic": "CSR, SSR, SSG and ISR trade-offs",
    "choices": [
      "A page that is built entirely on the client by using local data",
      "A page whose content depends on each request, such as a personalised view",
      "A page that consists only of a few large pictures and no text",
      "A page that is identical for everyone and is updated once a year"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a drawback of server-side rendering compared to static generation?",
    "topic": "CSR, SSR, SSG and ISR trade-offs",
    "choices": [
      "The HTML cannot be read by search engines",
      "The page cannot include any interactivity",
      "The page must be rebuilt by hand after every change",
      "Each request needs server work, which adds latency and cost"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does Time to First Byte (TTFB) measure?",
    "topic": "CSR, SSR, SSG and ISR trade-offs",
    "choices": [
      "How long the browser waits for the first byte of the response",
      "How long it takes for the page to be hydrated after the HTML arrives",
      "How long the visitor stays on the page before moving on to another",
      "How long the largest image on the page needs to finish loading"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why can client-side rendering hurt the Largest Contentful Paint?",
    "topic": "CSR, SSR, SSG and ISR trade-offs",
    "choices": [
      "Content appears only after the JavaScript downloads, runs and fetches data",
      "The server compresses the content too much and slows down parsing",
      "The browser blocks all of the images until the stylesheet finishes",
      "Client rendering disables the browser cache for the page's files"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does streaming SSR let a server do?",
    "topic": "CSR, SSR, SSG and ISR trade-offs",
    "choices": [
      "Compress the HTML into a single stream of characters for speed",
      "Keep the connection open to push updates after the page has loaded",
      "Send parts of the HTML as they become ready instead of waiting for all data",
      "Stream video from the server to the page as the visitor scrolls"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is hydration?",
    "topic": "Hydration and why it can fail",
    "choices": [
      "Converting HTML back into a template on the server for later reuse",
      "Adding styles to an unstyled page after the stylesheet has loaded",
      "Attaching handlers and state to server-rendered HTML to make it interactive",
      "Loading images from the CDN after the rest of the page is visible"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a hydration mismatch?",
    "topic": "Hydration and why it can fail",
    "choices": [
      "A hydration step that finishes before the page has become visible",
      "A bundle that turns out larger than the sum of its source files",
      "A server that sends two different responses for the same single request",
      "Server HTML differs from what the client renders on its first pass"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which code commonly causes a hydration mismatch?",
    "topic": "Hydration and why it can fail",
    "choices": [
      "Importing a module at the top of a component file in the project",
      "Using a CSS class on a div element inside of a component",
      "Rendering values like Date.now() or Math.random() during render",
      "Passing a prop from a parent component down to a child component"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can a component safely render browser-only information such as window width?",
    "topic": "Hydration and why it can fail",
    "choices": [
      "Read window directly during the render on the server",
      "Use document.write in the render function",
      "Hard-code a default value and never update it",
      "Read it in an effect after mount and update state"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why can the page look interactive but not respond to clicks right after loading?",
    "topic": "Hydration and why it can fail",
    "choices": [
      "The browser disables clicks until the CSS has been cached locally",
      "The server blocks clicks for the first few seconds after loading",
      "The HTML is visible before the JavaScript has downloaded and hydrated it",
      "Clicks only start working after the user has scrolled the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does selective hydration, used with Suspense, improve responsiveness?",
    "topic": "Hydration and why it can fail",
    "choices": [
      "React hydrates parts separately and prioritises what the user touches",
      "It hydrates the page twice in order to avoid any mismatch errors",
      "It skips hydration for the whole page and makes it permanent",
      "It sends the same JavaScript to every user, so there is nothing to choose"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does 'use client' mark in Next.js App Router?",
    "topic": "Hydration and why it can fail",
    "choices": [
      "A file that must never be included in any bundle that is shipped",
      "A module and its imports that run and hydrate on the client",
      "A route that is reserved for fetching data on the client side",
      "A component that is rendered only once, at build time, on the server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why does shipping less JavaScript help hydration?",
    "topic": "Hydration and why it can fail",
    "choices": [
      "There is less code to download, parse and run before it responds",
      "Less JavaScript makes the HTML larger, so the page has more to show",
      "Hydration is skipped completely when the bundle is under one megabyte",
      "Smaller bundles are always served over HTTP/3, which hydrates faster"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the effect of browser extensions that modify the DOM on hydration?",
    "topic": "Hydration and why it can fail",
    "choices": [
      "They have no effect on a page, because extensions cannot touch HTML",
      "They can alter the HTML before hydration and cause warnings",
      "They disable server rendering for pages that the visitor opens",
      "They speed up hydration by keeping a cached copy of the DOM"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the purpose of the suppressHydrationWarning prop?",
    "topic": "Hydration and why it can fail",
    "choices": [
      "Skips hydration for the whole application to avoid any mismatch",
      "Prevents the server from sending any HTML for that element",
      "Silences the warning for one element whose text is expected to differ",
      "Makes the page render only on the client and never on the server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How are routes defined in the Next.js App Router?",
    "topic": "Next.js App Router, layouts and file-based routing",
    "choices": [
      "By a central routes array exported from the root file",
      "By folders inside the app directory with a page file in each route",
      "By decorators placed on component classes",
      "By a configuration file listing URL patterns and components"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a layout.js file do?",
    "topic": "Next.js App Router, layouts and file-based routing",
    "choices": [
      "Wraps its child routes with shared UI that persists across navigation",
      "Stores the CSS for the whole application in a separate file",
      "Defines the HTML head for one single page of the application only",
      "Runs only when the page first loads and never again after that"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a folder named [id] represent?",
    "topic": "Next.js App Router, layouts and file-based routing",
    "choices": [
      "A folder that is ignored by the router when it builds the routes",
      "A route that matches only the literal text id in the URL",
      "A dynamic route segment whose value is available as a parameter",
      "A folder that is reserved for code which only runs on the server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a loading.js file provide?",
    "topic": "Next.js App Router, layouts and file-based routing",
    "choices": [
      "A fallback that is used when JavaScript is turned off in the browser",
      "A progress bar that shows the download of the page's images",
      "An instant loading UI shown while the route's content streams in",
      "A script that runs before any of the routes are rendered"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does error.js do in a route segment?",
    "topic": "Next.js App Router, layouts and file-based routing",
    "choices": [
      "Logs the errors to a file on the server's disk for later reading",
      "Reports the error in the address bar of the visitor's browser",
      "Blocks the route from loading in production when an error occurs",
      "Shows a fallback UI if rendering that segment throws an error"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the role of the Link component from next/link?",
    "topic": "Next.js App Router, layouts and file-based routing",
    "choices": [
      "Sends a request to the server for each click and reloads the page",
      "Navigates on the client and can prefetch the destination route",
      "Opens every link in a new browser window",
      "Replaces the anchor element and disables the URL"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a route group written as (marketing) in the app folder do?",
    "topic": "Next.js App Router, layouts and file-based routing",
    "choices": [
      "Adds the word marketing to the beginning of every URL in the group",
      "Organises routes and layouts without adding to the URL path",
      "Hides the routes in the group from the sitemap of the website",
      "Marks the routes in the group as private pages for staff only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the purpose of the not-found.js file?",
    "topic": "Next.js App Router, layouts and file-based routing",
    "choices": [
      "Defines the UI shown when notFound() is called or nothing matches",
      "Lists the routes that are not yet implemented by the developers",
      "Redirects all unknown URLs to the home page of the application",
      "Disables 404 responses so that every route returns a 200 status"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does middleware in Next.js run before?",
    "topic": "Next.js App Router, layouts and file-based routing",
    "choices": [
      "The state of a component is updated by the next render pass",
      "A request completes, so it can redirect or rewrite it",
      "The CSS for the page is applied to the elements that are shown",
      "The browser downloads the HTML document that the server has sent"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the main benefit of nested layouts?",
    "topic": "Next.js App Router, layouts and file-based routing",
    "choices": [
      "Pages are loaded in parallel on the server, but only there",
      "Every page is compiled into one very large file at build time",
      "Shared UI stays mounted and keeps its state while child pages change",
      "Child pages inherit the CSS rules of their sibling pages"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a React Server Component?",
    "topic": "React Server Components versus client components",
    "choices": [
      "A component that is written in a backend language",
      "A component that calls a server by default on every state change",
      "A component that renders only after the user scrolls",
      "A component that renders only on the server and ships none of its code"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which of these can a Server Component do that a Client Component cannot?",
    "topic": "React Server Components versus client components",
    "choices": [
      "Access the browser's window object to read the width of the screen",
      "Use useState and useEffect to keep track of values over time",
      "Read from a database or the file system directly while rendering",
      "Attach onClick handlers to buttons and other interactive elements"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which of these requires a Client Component?",
    "topic": "React Server Components versus client components",
    "choices": [
      "Fetching data on the server during render",
      "Rendering static text",
      "Importing a stylesheet",
      "Using state, effects or browser event handlers"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How much JavaScript does a Server Component add to the client bundle?",
    "topic": "React Server Components versus client components",
    "choices": [
      "None for the component's own code",
      "A copy of the framework per component",
      "The full code of the component",
      "Only its CSS"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Can a Client Component import a Server Component?",
    "topic": "React Server Components versus client components",
    "choices": [
      "Not directly, but it can receive one as children from a server parent",
      "Yes, and the Server Component will then run on the server inside the client",
      "Yes, but only while the application is running in development mode",
      "No, and Server Components cannot be passed to it in any other way"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where should 'use client' be placed to keep the client bundle small?",
    "topic": "React Server Components versus client components",
    "choices": [
      "At the top of every file in the project, to be on the safe side",
      "In the root layout of the application, so that everything is covered",
      "On the smallest interactive component, not on the whole page",
      "Only in files that import a stylesheet, because those need a browser"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What can be passed as props from a Server Component to a Client Component?",
    "topic": "React Server Components versus client components",
    "choices": [
      "Serializable values such as strings, numbers and plain objects",
      "Class instances with methods that stay attached when sent over",
      "Functions that read from the database on the server when called",
      "Open database connections that the client can use to run queries"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why can a Server Component safely use a secret API key?",
    "topic": "React Server Components versus client components",
    "choices": [
      "Server Components run inside a sandbox with no network",
      "Its code never reaches the browser",
      "Secrets are encrypted by React automatically",
      "The browser ignores the key"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens when a Server Component's data changes?",
    "topic": "React Server Components versus client components",
    "choices": [
      "The browser re-runs the component code locally",
      "It renders again after the next request or revalidation, then updates",
      "Nothing, because Server Components are static forever",
      "The component updates itself through a WebSocket automatically"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a good pattern for an interactive widget inside mostly static content?",
    "topic": "React Server Components versus client components",
    "choices": [
      "Rewrite the static content of the page as a widget of its own",
      "Keep the page a Server Component and make only the widget a client one",
      "Load the widget inside an iframe so it stays apart from the page",
      "Make the whole page a Client Component so the widget can use state"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where does data fetching usually happen in the App Router?",
    "topic": "Data fetching, caching and revalidation",
    "choices": [
      "In the middleware, which runs for every request that is made",
      "Only inside useEffect in Client Components, after they have mounted",
      "In async Server Components, with await directly in the component",
      "In the browser's local storage, which the pages read directly"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does revalidating cached data mean?",
    "topic": "Data fetching, caching and revalidation",
    "choices": [
      "Deleting the cache and deciding never to cache that data again",
      "Asking the user to confirm that the cached data is still correct",
      "Refreshing cached data after a set time or on demand so it stays current",
      "Checking that the cached data matches a JSON schema before use"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is time-based revalidation?",
    "topic": "Data fetching, caching and revalidation",
    "choices": [
      "Cached data stays fresh for set seconds, then refreshes",
      "The database rewrites its records on a timer that you configure",
      "The server restarts at a fixed time every day to clear the cache",
      "Data is refreshed every time that a visitor moves the mouse"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does on-demand revalidation (for example revalidateTag) allow?",
    "topic": "Data fetching, caching and revalidation",
    "choices": [
      "Refreshing specific cached data right after a change, like a content edit",
      "Skipping the cache completely for each of the visitors of the site",
      "Refreshing the cache of the whole site again on every request",
      "Reloading the visitor's browser tab from the server after a change"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why fetch independent data in parallel in a Server Component?",
    "topic": "Data fetching, caching and revalidation",
    "choices": [
      "Sequential requests are not allowed on the server",
      "Parallel requests are required by the fetch API",
      "It reduces the amount of data sent",
      "Awaiting each request in sequence adds up the latency"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does Suspense with streaming let a page do?",
    "topic": "Data fetching, caching and revalidation",
    "choices": [
      "Cancel the slow requests automatically after a short time",
      "Hide the whole page until all of its data has finished loading",
      "Cache the generated HTML for one year without checking it",
      "Show the shell and fallback at once while slower data loads"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why avoid fetching data in a Client Component on mount when it could be fetched on the server?",
    "topic": "Data fetching, caching and revalidation",
    "choices": [
      "Client Components cannot call the fetch function at all in the browser",
      "The request starts only after the JavaScript loads, delaying the first view",
      "Client fetches are not allowed in production builds of the application",
      "Data from a server is always more secure than data from other APIs"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a request waterfall?",
    "topic": "Data fetching, caching and revalidation",
    "choices": [
      "Requests that are all sent to a CDN in parallel at the same moment",
      "Requests that wait on each other in a chain, slowing the page",
      "Requests that fail and are then retried several times in a row",
      "A tool that draws the network requests of a page as flowing water"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the purpose of server actions?",
    "topic": "Data fetching, caching and revalidation",
    "choices": [
      "Hooks that fetch data on the client when a component mounts",
      "Functions that style the page on the server before it is sent",
      "Scripts that deploy the application to the hosting provider",
      "Server functions that forms or handlers call to change data"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should you do after a server action changes data that a page displays?",
    "topic": "Data fetching, caching and revalidation",
    "choices": [
      "Wait for the cache to expire on its own, however long it takes",
      "Revalidate the affected path or tag so the page shows new data",
      "Reload the browser tab with a script after the action completes",
      "Delete the page's file from the server so it gets generated again"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why does server rendering usually help SEO?",
    "topic": "Metadata, SEO and Open Graph",
    "choices": [
      "Crawlers receive meaningful HTML content and metadata without running JavaScript",
      "It hides the content from users while keeping it visible to crawlers",
      "It removes the need for titles and descriptions on each of the pages",
      "Search engines give extra ranking to any page that is served by a server"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the title tag influence?",
    "topic": "Metadata, SEO and Open Graph",
    "choices": [
      "The order in which components appear in the document tree",
      "The speed at which the page loads on a slow mobile connection",
      "Only the colour that is used for the text of the whole page",
      "The text in browser tabs, bookmarks and search results"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a canonical URL used for?",
    "topic": "Metadata, SEO and Open Graph",
    "choices": [
      "Pointing to the page that the visitor had open before this one",
      "Redirecting visitors to a login page when they are not signed in",
      "Setting the address and the port that the server will run on",
      "Telling search engines which URL is the preferred version"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What do Open Graph tags control?",
    "topic": "Metadata, SEO and Open Graph",
    "choices": [
      "Which cookies are sent along with each request to the server",
      "How the page is cached by the browser on the visitor's device",
      "How a shared link appears: title, description and image",
      "How search engines rank the page against other pages on the web"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you set per-page metadata in the Next.js App Router?",
    "topic": "Metadata, SEO and Open Graph",
    "choices": [
      "Export a metadata object or a generateMetadata function from the page",
      "Add meta tags with document.write inside of a script in the page",
      "Put the tags in a file that is stored in the public folder",
      "Edit the address bar of the browser to include the new title"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a sitemap for?",
    "topic": "Metadata, SEO and Open Graph",
    "choices": [
      "Defining the CSS grid areas that make up the layout of the page",
      "Compressing the images on the server before they are delivered",
      "Showing visitors a map of the building where the company is located",
      "Listing the URLs of a site so crawlers can find all pages"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does robots.txt do?",
    "topic": "Metadata, SEO and Open Graph",
    "choices": [
      "Blocks malicious users from the site by their IP address range",
      "Describes the keyboard shortcuts that the site supports for visitors",
      "Tells crawlers which paths they may or may not request",
      "Stores the secret API keys that the site needs in order to run"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is structured data (for example JSON-LD) used for?",
    "topic": "Metadata, SEO and Open Graph",
    "choices": [
      "Machine-readable descriptions of content that enable rich results",
      "Defining the database schema that the application stores its data in",
      "Compressing the JSON responses that the page's API sends back",
      "Storing the preferences of the user in a format that can be shared"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should each page have a unique, descriptive title and meta description?",
    "topic": "Metadata, SEO and Open Graph",
    "choices": [
      "Search engines refuse to index pages with duplicate titles",
      "Browsers show errors for missing descriptions",
      "The description controls the page's loading order",
      "They help users and search engines tell the pages apart"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the effect of marking a page with a noindex robots meta tag?",
    "topic": "Metadata, SEO and Open Graph",
    "choices": [
      "The page is removed from the server once a crawler has visited it",
      "The page is hidden from users who are logged in to the application",
      "The page can no longer be opened by visitors who know its address",
      "Search engines are asked to leave the page out of their results"
    ],
    "answerIdx": 3
  }
]
```

LAYER: frontend-dev-13

```json
[
  {
    "stem": "What does Largest Contentful Paint (LCP) measure?",
    "topic": "Core Web Vitals: LCP, INP and CLS",
    "choices": [
      "How long the browser takes to finish downloading every resource on the page",
      "How long the main content takes to become visible",
      "How quickly the page responds to the first click made by a visitor",
      "How much the visible content moves around while the page is loading"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does Cumulative Layout Shift (CLS) measure?",
    "topic": "Core Web Vitals: LCP, INP and CLS",
    "choices": [
      "How much visible content moves unexpectedly while the page loads",
      "How many pixels the user scrolls before the content finishes loading",
      "How long the server needs to send the first byte of the response",
      "How long the largest image takes to decode on the visitor's device"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Interaction to Next Paint (INP) measure?",
    "topic": "Core Web Vitals: LCP, INP and CLS",
    "choices": [
      "How long the browser takes to parse the stylesheets of the page",
      "How long the page takes to show its first piece of content on screen",
      "How quickly the page responds visually after user interactions",
      "How many requests the page makes before it becomes interactive"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which LCP value is generally considered good?",
    "topic": "Core Web Vitals: LCP, INP and CLS",
    "choices": [
      "5 seconds or less",
      "Under 100 milliseconds",
      "2.5 seconds or less",
      "Under 10 seconds on a fast network"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which CLS score is generally considered good?",
    "topic": "Core Web Vitals: LCP, INP and CLS",
    "choices": [
      "10 or less",
      "1 or less",
      "Exactly zero on every page load",
      "0.1 or less"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which INP value is generally considered good?",
    "topic": "Core Web Vitals: LCP, INP and CLS",
    "choices": [
      "1 second or less on desktop devices",
      "50 microseconds or less",
      "200 milliseconds or less",
      "2 seconds or less"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which element is most often the LCP element on a content page?",
    "topic": "Core Web Vitals: LCP, INP and CLS",
    "choices": [
      "A large hero image or a block of heading text",
      "The footer links at the bottom of the document",
      "The cookie banner that appears after the page loads",
      "A small icon in the navigation bar of the site"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which change usually reduces layout shift from images?",
    "topic": "Core Web Vitals: LCP, INP and CLS",
    "choices": [
      "Placing every image inside an iframe on the document",
      "Loading every image from a different server on the page",
      "Setting width and height so space is reserved before loading",
      "Using only images that have been converted to the PNG format"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why do Core Web Vitals focus on user experience rather than raw load time?",
    "topic": "Core Web Vitals: LCP, INP and CLS",
    "choices": [
      "Search engines ignore the load time of pages entirely when ranking",
      "Raw load time cannot be measured by any of the browser's tools",
      "A page can finish loading yet still feel slow, unstable or unresponsive",
      "Users only care about the size of the download and nothing else"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where are Core Web Vitals thresholds usually assessed for ranking and reporting?",
    "topic": "Core Web Vitals: LCP, INP and CLS",
    "choices": [
      "At the average of all visits including bots",
      "At the 75th percentile of real user visits",
      "At the single fastest visit recorded for the page",
      "At the slowest visit recorded in a month"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is lab data?",
    "topic": "Lighthouse and the Chrome Performance panel",
    "choices": [
      "Metrics that are estimated from the size of the JavaScript bundle",
      "Metrics that a server produces in its own logging system",
      "Metrics collected in a controlled, repeatable environment such as a Lighthouse run",
      "Metrics collected from real visitors to the site over a period of weeks"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is field data?",
    "topic": "Lighthouse and the Chrome Performance panel",
    "choices": [
      "Metrics produced by a synthetic monitor in one single location",
      "Metrics collected from real users visiting the site in many conditions",
      "Metrics from a single test run on the developer's own laptop",
      "Metrics that are measured only while the page is sitting idle"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why can a Lighthouse score differ from what real users experience?",
    "topic": "Lighthouse and the Chrome Performance panel",
    "choices": [
      "Lighthouse measures only the size of the HTML file",
      "It simulates one device and network, but users vary widely",
      "Lighthouse uses data collected from the previous year",
      "Real users always have faster connections than the simulation"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a 'long task' in the Performance panel indicate?",
    "topic": "Lighthouse and the Chrome Performance panel",
    "choices": [
      "A network request that takes more than 50 seconds",
      "A script that is stored in the cache for a long period",
      "A function that is called more than 50 times",
      "Work that blocks the main thread for more than 50 milliseconds"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which Performance panel view helps you see what the main thread was doing?",
    "topic": "Lighthouse and the Chrome Performance panel",
    "choices": [
      "The list of cookies stored for the site",
      "The colour picker used for the page",
      "The flame chart of the Main track",
      "The list of the CSS selectors in use"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a good practice before optimising a page?",
    "topic": "Lighthouse and the Chrome Performance panel",
    "choices": [
      "Rewrite the whole page in a different framework",
      "Add caching to every resource without checking them",
      "Remove all images from the page to be safe",
      "Measure a baseline so you can prove that a change helped"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does throttling CPU in DevTools simulate?",
    "topic": "Lighthouse and the Chrome Performance panel",
    "choices": [
      "A browser with no JavaScript support",
      "A larger screen with more pixels",
      "A faster connection to the server",
      "A slower processor, such as a mid-range phone"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the main reason to test on a throttled network and CPU?",
    "topic": "Lighthouse and the Chrome Performance panel",
    "choices": [
      "Developer machines are usually much faster than many users' devices",
      "Browsers only report metrics when throttling is turned on",
      "Throttling makes every page load faster for the final users",
      "Slow devices cannot run JavaScript at all"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the Lighthouse 'opportunities' list provide?",
    "topic": "Lighthouse and the Chrome Performance panel",
    "choices": [
      "A set of ideas for new features that users may want to see",
      "A list of the pages that have the greatest number of visitors",
      "A list of the websites of your competitors to compare against",
      "Suggested changes with estimated savings, such as unused JavaScript"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is it useful to record a performance trace of an interaction like a click?",
    "topic": "Lighthouse and the Chrome Performance panel",
    "choices": [
      "It shows which tasks delay the next paint and affect INP",
      "It measures the time spent by the server rendering the page",
      "It automatically fixes the slow handlers in the code",
      "It records the user's name and the pages they visited"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why are images a common cause of slow pages?",
    "topic": "Image formats, lazy loading and responsive sizes",
    "choices": [
      "Images require a separate connection for each pixel",
      "They are often the largest files, so heavy ones delay loading",
      "Browsers refuse to cache images for more than a minute",
      "Images block the parsing of the HTML document entirely"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which format usually gives smaller files than JPEG at similar quality?",
    "topic": "Image formats, lazy loading and responsive sizes",
    "choices": [
      "BMP",
      "Animated GIF",
      "Uncompressed TIFF",
      "AVIF or WebP"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the srcset attribute allow?",
    "topic": "Image formats, lazy loading and responsive sizes",
    "choices": [
      "Loading every listed image at the same time in a slideshow",
      "Resizing the image on the server for every request",
      "Showing a different image each time the page is refreshed",
      "Offering several image files so the browser can choose a suitable one"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does loading='lazy' do?",
    "topic": "Image formats, lazy loading and responsive sizes",
    "choices": [
      "Loads the image at a lower resolution for the whole of its lifetime",
      "Skips the image completely when the connection is detected as slow",
      "Loads the image only after the user has clicked on its place",
      "Delays loading an off-screen image until it is near the viewport"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which image should NOT be lazy-loaded?",
    "topic": "Image formats, lazy loading and responsive sizes",
    "choices": [
      "An image in the footer of a long article",
      "The hero image that is the LCP element at the top",
      "An illustration that appears after several screens of text",
      "A thumbnail far down a product list"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does fetchpriority='high' on an image signal to the browser?",
    "topic": "Image formats, lazy loading and responsive sizes",
    "choices": [
      "That the image is important and should be fetched early",
      "That the image should be cached by the browser forever",
      "That the image has a very high resolution and is large in size",
      "That the image should be downloaded last, after everything else"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do width and height attributes help performance?",
    "topic": "Image formats, lazy loading and responsive sizes",
    "choices": [
      "They make the file smaller by cropping it on the server before sending",
      "The browser reserves space, preventing layout shift as it loads",
      "They force the browser to download the image twice at two sizes",
      "They disable lazy loading for every image that is on the page"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a benefit of serving images from a CDN?",
    "topic": "Image formats, lazy loading and responsive sizes",
    "choices": [
      "The browser no longer needs to decode them",
      "The images are compressed into the HTML file",
      "Images are automatically converted into text for faster loading",
      "Files come from a location near the visitor, reducing latency"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does an image CDN or build step commonly do beyond hosting?",
    "topic": "Image formats, lazy loading and responsive sizes",
    "choices": [
      "Rewrite the alt text so it matches the page title",
      "Resize and convert images to modern formats",
      "Convert every image into a vector graphic",
      "Remove images that were not viewed in the past week"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a problem with using a large desktop image for a small mobile slot?",
    "topic": "Image formats, lazy loading and responsive sizes",
    "choices": [
      "The image is automatically distorted by the browser",
      "The browser cannot show images larger than the screen",
      "The device downloads far more bytes than it needs to display",
      "The CSS refuses to apply to large images"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is code splitting?",
    "topic": "Code splitting, tree shaking and bundle analysis",
    "choices": [
      "Removing comments from the source code before shipping",
      "Dividing the bundle into chunks loaded only when needed",
      "Separating the HTML from the CSS in a page",
      "Splitting the source files into several repositories"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you split off a rarely used feature in modern JavaScript?",
    "topic": "Code splitting, tree shaking and bundle analysis",
    "choices": [
      "Load it with a dynamic import() when it is needed",
      "Wrap it in a try/catch block at the top of the file",
      "Copy its code into every page that uses it",
      "Move it into a comment and restore it when needed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is tree shaking?",
    "topic": "Code splitting, tree shaking and bundle analysis",
    "choices": [
      "Sorting the imports of a file in alphabetical order by module name",
      "Compressing the finished bundle with gzip before it is uploaded",
      "Moving all of the code of the application into one single file",
      "Removing exports that are never used from the final bundle"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which kind of module syntax makes tree shaking possible?",
    "topic": "Code splitting, tree shaking and bundle analysis",
    "choices": [
      "Scripts that attach everything to the window object",
      "ES modules with static import and export statements",
      "JSON files imported at runtime",
      "CommonJS modules with require calls inside functions"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a bundle analyzer show?",
    "topic": "Code splitting, tree shaking and bundle analysis",
    "choices": [
      "How fast the server responds to each request",
      "Which modules take up the most space in the bundle",
      "What the code looks like after it is minified",
      "Which users downloaded the bundle most often"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why can importing one function from a large library still add a lot of weight?",
    "topic": "Code splitting, tree shaking and bundle analysis",
    "choices": [
      "The library may not be tree-shakeable, so more code is bundled than the function uses",
      "Large libraries are always cached by the browser, so they cost nothing",
      "Importing always copies the whole of the internet into the final bundle",
      "Function imports are slower than class imports by the definition of the language"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which approach usually reduces the cost of a heavy date or charting library?",
    "topic": "Code splitting, tree shaking and bundle analysis",
    "choices": [
      "Replace it with an inline script tag placed at the top of the page",
      "Include it in every page of the site so that the browser caches it early",
      "Copy its source code into the main application file by hand",
      "Use a lighter alternative or load it lazily on the route that needs it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does minification do?",
    "topic": "Code splitting, tree shaking and bundle analysis",
    "choices": [
      "Removes whitespace and shortens names to cut file size",
      "Splits the file into smaller modules",
      "Translates the code into a different language",
      "Adds comments that explain the code"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why prefer route-based code splitting as a first step?",
    "topic": "Code splitting, tree shaking and bundle analysis",
    "choices": [
      "It makes all pages share the same chunk",
      "It removes the need for a router in the application",
      "Routes are always loaded in alphabetical order",
      "Users fetch only the code for the page they visit"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What can a very large single JavaScript file do to INP and load time?",
    "topic": "Code splitting, tree shaking and bundle analysis",
    "choices": [
      "It prevents the images on the page from being displayed at all",
      "It makes the CSS apply more slowly to the elements on the page",
      "It takes longer to download, parse and run, delaying interactivity",
      "It stops the browser from caching any of the other files you serve"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the Cache-Control header 'max-age=31536000, immutable' tell the browser?",
    "topic": "Caching, compression and CDNs",
    "choices": [
      "The file expires after 31 seconds",
      "The file is private and cannot be stored",
      "The file can be cached for a year and will not change",
      "The file must be fetched again on every visit"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why do build tools add a content hash to file names like app.3f9a1c.js?",
    "topic": "Caching, compression and CDNs",
    "choices": [
      "Browsers require a hash in every file name",
      "The hash is used by the server to encrypt the file",
      "A changed file gets a new URL, making long caching safe",
      "The hash tells the browser to skip the cache"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which compression is generally preferred for text assets such as JS and CSS?",
    "topic": "Caching, compression and CDNs",
    "choices": [
      "Base64 encoding",
      "Brotli, with gzip as a fallback",
      "JPEG compression",
      "ZIP archives of each file"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a CDN do?",
    "topic": "Caching, compression and CDNs",
    "choices": [
      "Serves cached copies of content from servers close to the visitor",
      "Blocks all requests that come from countries other than your own",
      "Runs the database of the application close to the visitor's device",
      "Converts the application code into machine language before delivery"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the effect of 'Cache-Control: no-store' on a response?",
    "topic": "Caching, compression and CDNs",
    "choices": [
      "The response is cached for the longest possible time",
      "The browser and caches must not keep a copy of it",
      "The response is sent only to logged-in users",
      "The response is compressed before storing"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does 'stale-while-revalidate' allow?",
    "topic": "Caching, compression and CDNs",
    "choices": [
      "Deleting the cache each time the user reloads the page in the browser",
      "Serving a cached response immediately while it is refreshed in the background",
      "Blocking the request until the cache has been completely updated",
      "Showing an error page to the visitor when the cache is out of date"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which kind of file is usually safe to cache for a long time?",
    "topic": "Caching, compression and CDNs",
    "choices": [
      "The main HTML document that links to all of the other assets",
      "Any file whose name stays the same across all of the deploys",
      "Fingerprinted assets whose names change with their content",
      "API responses that contain personal data about the signed-in user"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does an ETag help with?",
    "topic": "Caching, compression and CDNs",
    "choices": [
      "Counting how many times a file was downloaded",
      "Encrypting the response between server and browser",
      "Lets the browser ask if its cached copy is still valid",
      "Compressing the body of the response"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should the HTML document usually have a short cache time?",
    "topic": "Caching, compression and CDNs",
    "choices": [
      "Browsers are unable to store HTML documents in the cache at all",
      "Long caching makes HTML load more slowly than it would otherwise",
      "Search engines require HTML documents to expire after every minute",
      "It points to the current asset files, so changes need to appear quickly"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a benefit of HTTP/2 or HTTP/3 for many small files?",
    "topic": "Caching, compression and CDNs",
    "choices": [
      "Multiple requests share one connection, reducing connection overhead",
      "All of the files are compressed with exactly the same algorithm",
      "Files are stored on the visitor's device permanently after one visit",
      "Requests are automatically merged into one single file by the server"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should you do before adding memoization to a React component?",
    "topic": "React performance: memoization and list virtualization",
    "choices": [
      "Replace the function components with class components first",
      "Profile to confirm that re-renders are actually causing a problem",
      "Move all of the state of the application into one global store",
      "Wrap every component in React.memo by default, to be on the safe side"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does React.memo do?",
    "topic": "React performance: memoization and list virtualization",
    "choices": [
      "Makes the component load lazily when the user scrolls to it",
      "Prevents the component from ever updating after it has first rendered",
      "Skips re-rendering a component when its props have not changed",
      "Stores the output of the component on the server for later reuse"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does list virtualization do?",
    "topic": "React performance: memoization and list virtualization",
    "choices": [
      "Renders only the rows that are visible, plus a small buffer",
      "Splits the list into several network requests",
      "Sorts the list on a background thread",
      "Renders all rows and hides the ones outside the screen with CSS"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When is virtualization most useful?",
    "topic": "React performance: memoization and list virtualization",
    "choices": [
      "For lists with thousands of items where rendering all rows is slow",
      "For menus that contain only three or four items at a time",
      "For a single paragraph of text on a simple article page",
      "For images that are smaller than ten kilobytes in total size"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why can an inline object or function prop break memoization of a child?",
    "topic": "React performance: memoization and list virtualization",
    "choices": [
      "Functions are always converted to strings before they are passed down",
      "Objects cannot be passed through props to child components at all",
      "Inline values are rejected by React.memo, which reports an error",
      "A new reference is created on each render, so the props look changed"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the React Profiler help you find?",
    "topic": "React performance: memoization and list virtualization",
    "choices": [
      "Which components render and how long each render takes",
      "Which images on the page have no alternative text provided",
      "Which dependencies in the project have known security issues",
      "Which network requests take the longest to complete on the page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which of these is a cheap, effective way to avoid unnecessary re-renders?",
    "topic": "React performance: memoization and list virtualization",
    "choices": [
      "Put all of the state at the top of the application in one place",
      "Call forceUpdate inside effects so that renders stay predictable",
      "Keep state as close as possible to the components that use it",
      "Disable StrictMode in development so that components render once"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does useTransition allow you to do?",
    "topic": "React performance: memoization and list virtualization",
    "choices": [
      "Animate elements between two routes automatically",
      "Run a function in a web worker",
      "Delay the first render of the application",
      "Mark a state update as non-urgent so the UI stays responsive"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is a stable key important for list performance?",
    "topic": "React performance: memoization and list virtualization",
    "choices": [
      "React can reuse DOM nodes instead of re-creating them when the list changes",
      "Keys are used by the browser cache to store each row of the list",
      "Without a key the list cannot be rendered by React at all",
      "Keys speed up the network requests that are used to fill the list"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a risk of memoizing everything?",
    "topic": "React performance: memoization and list virtualization",
    "choices": [
      "Extra comparison work and complexity with little or no benefit",
      "React throws an error whenever it meets a memoized component",
      "The size of the bundle doubles automatically for every memoized value",
      "Components stop rendering altogether once they have been memoized"
    ],
    "answerIdx": 0
  }
]
```

LAYER: frontend-dev-14

```json
[
  {
    "stem": "In the testing trophy approach, which kind of test gets the most emphasis?",
    "topic": "The testing trophy: unit, integration and end-to-end",
    "choices": [
      "Unit tests for every single function in the code base",
      "Manual tests carried out before every release",
      "End-to-end tests for every possible user flow",
      "Integration tests that exercise several parts together"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why are end-to-end tests usually kept to a small number of critical flows?",
    "topic": "The testing trophy: unit, integration and end-to-end",
    "choices": [
      "They are slower and more fragile than smaller tests",
      "They need a separate programming language for each test",
      "They cannot verify anything that a user would do",
      "Browsers allow only a few automated tests to run at once"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a unit test?",
    "topic": "The testing trophy: unit, integration and end-to-end",
    "choices": [
      "A test that drives a real browser through a full user journey",
      "A test of a small piece of logic in isolation, like a pure function",
      "A test done by a user before they buy a product",
      "A test that checks the deployment pipeline of the project"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the main benefit of testing behaviour rather than implementation details?",
    "topic": "The testing trophy: unit, integration and end-to-end",
    "choices": [
      "Tests keep passing when you refactor without changing what users see",
      "Tests no longer need any setup before they are run each time",
      "Tests run faster because they skip the rendering step entirely",
      "Tests are shorter because they do not need any assertions"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does 'confidence per cost' mean when choosing a test type?",
    "topic": "The testing trophy: unit, integration and end-to-end",
    "choices": [
      "How many lines of code a test covers for each minute of its runtime",
      "How many people on the team are able to read the test code",
      "How much assurance a test gives against the effort it takes to maintain",
      "How much the test costs to run in the cloud each month"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which of these is a good candidate for a unit test?",
    "topic": "The testing trophy: unit, integration and end-to-end",
    "choices": [
      "A function that formats a price or validates an email address",
      "The behaviour of the back button of the browser after a purchase",
      "The look of a page on five different kinds of devices",
      "The full checkout flow across three different pages of the site"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which of these is a good candidate for an end-to-end test?",
    "topic": "The testing trophy: unit, integration and end-to-end",
    "choices": [
      "The name of a CSS class that is used for a heading",
      "A function that adds two numbers together and returns the result",
      "Signing up, logging in and creating a record in a real browser",
      "The text that is written on a button in a single component"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a test double?",
    "topic": "The testing trophy: unit, integration and end-to-end",
    "choices": [
      "A stub or mock that replaces a real dependency in a test",
      "A pair of tests that always share exactly the same set of data",
      "A test that passes whether or not the code under test is correct",
      "A second copy of a test that runs twice to be on the safe side"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What problem do brittle tests cause?",
    "topic": "The testing trophy: unit, integration and end-to-end",
    "choices": [
      "They run so fast that the results can no longer be trusted",
      "They need too much memory on the build server to run at all",
      "They test too many user behaviours at once in one test case",
      "They fail on harmless changes, so developers stop trusting them"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the arrange, act, assert pattern describe?",
    "topic": "The testing trophy: unit, integration and end-to-end",
    "choices": [
      "Planning a test, reviewing it and approving it",
      "Installing tools, configuring them and uninstalling them",
      "Writing code, running it and deleting it",
      "Set up the state, perform the action, then check the outcome"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why do many Vite projects choose Vitest?",
    "topic": "Unit tests with Vitest",
    "choices": [
      "It reuses the Vite config and offers a Jest-compatible API",
      "It automatically writes the tests for you from the source code",
      "It replaces the need for any assertions in tests",
      "It is the only test runner that can run TypeScript files"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which function groups related tests in Vitest?",
    "topic": "Unit tests with Vitest",
    "choices": [
      "describe",
      "bundle",
      "group",
      "suite.add"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you assert that a value equals 5 in Vitest?",
    "topic": "Unit tests with Vitest",
    "choices": [
      "check(value) === 5",
      "expect(value).toBe(5)",
      "assert.equals(value, 5)",
      "value.shouldBe(5)"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When should you use toEqual instead of toBe?",
    "topic": "Unit tests with Vitest",
    "choices": [
      "To check that a function was called with the expected arguments",
      "To compare numbers that are very large and lose precision",
      "To compare the contents of objects or arrays, not their identity",
      "To compare values of different types by converting them first"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does vi.fn() create?",
    "topic": "Unit tests with Vitest",
    "choices": [
      "A function that returns the current Vite version",
      "A function that formats numbers for display",
      "A mock function that records how it was called",
      "A function that runs in a separate worker thread"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why test pure functions such as reducers and validators first?",
    "topic": "Unit tests with Vitest",
    "choices": [
      "They are the only functions that tests can call",
      "They need no setup, run fast and give clear value",
      "They always have bugs that other code does not",
      "They are required by the test runner to start"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you test code that depends on the current time?",
    "topic": "Unit tests with Vitest",
    "choices": [
      "Wait for the real time to match the value that the test expects",
      "Use fake timers or inject a clock so the time is controlled",
      "Run the test only at midnight, when the clock has a known value",
      "Disable the clock in the browser so that dates are never used"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the test.each feature do?",
    "topic": "Unit tests with Vitest",
    "choices": [
      "Retries a failing test over and over until it finally passes",
      "Runs the same test with several sets of inputs and expected outputs",
      "Runs a test once for each of the files in the whole project",
      "Runs every test in a file one after another in the order they appear"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a snapshot test do?",
    "topic": "Unit tests with Vitest",
    "choices": [
      "Records the actions of a user and plays them back at a later time",
      "Saves the state of the database before every deployment happens",
      "Takes a photo of the screen so that the designers can review it",
      "Compares output with a stored earlier version and fails on a difference"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a drawback of overusing snapshot tests?",
    "topic": "Unit tests with Vitest",
    "choices": [
      "Large snapshots are changed without review and hide real problems",
      "They delete the previous version of the code when they run",
      "They cannot be used with TypeScript code in any project",
      "They always run more slowly than end-to-end tests do"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the guiding principle of Testing Library?",
    "topic": "Component tests with Testing Library",
    "choices": [
      "Tests should check the internal state of every component",
      "Tests should call component methods directly",
      "Tests should avoid rendering components at all",
      "Tests should resemble how users interact with the software"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which query is generally preferred for finding a button?",
    "topic": "Component tests with Testing Library",
    "choices": [
      "getByRole('button', { name: ... })",
      "getByTestId for every element",
      "container.querySelector('.btn-primary')",
      "getElementsByTagName('div')[2]"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is querying by role preferred to querying by test id?",
    "topic": "Component tests with Testing Library",
    "choices": [
      "Test ids are removed from the DOM when running in development mode",
      "Roles are faster to find than ids in each of the browsers that exist",
      "It matches how assistive technology sees the page and checks accessibility",
      "Roles work only in React and are not available in other frameworks"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the difference between getBy, queryBy and findBy queries?",
    "topic": "Component tests with Testing Library",
    "choices": [
      "getBy waits for the element, queryBy throws, findBy returns null",
      "getBy searches the page, queryBy searches the database, findBy searches files",
      "They are aliases that behave the same in all cases",
      "getBy throws if missing, queryBy returns null, findBy waits and returns a promise"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which query helps assert that an element is NOT present?",
    "topic": "Component tests with Testing Library",
    "choices": [
      "findByText, which waits forever when the text is not on the page",
      "getAllByText, which returns an empty page when nothing is matched",
      "queryByText, which returns null when nothing is found",
      "getByText, which throws an error when nothing is found on the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why use userEvent instead of fireEvent to simulate typing and clicking?",
    "topic": "Component tests with Testing Library",
    "choices": [
      "It simulates the full sequence of events a real user would trigger",
      "It works without rendering the component into the document",
      "It runs the interaction faster than a real browser possibly could",
      "It automatically fixes accessibility problems it comes across"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you test UI that appears after an asynchronous update?",
    "topic": "Component tests with Testing Library",
    "choices": [
      "Use findBy queries or waitFor to wait for the change",
      "Disable the asynchronous code in the component while the test runs",
      "Render the component twice so that the second render has the data",
      "Add a long fixed delay with setTimeout before every single assertion"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the toBeInTheDocument matcher come from?",
    "topic": "Component tests with Testing Library",
    "choices": [
      "The built-in JavaScript language, which provides it for every object",
      "The jest-dom extension, which adds DOM-focused assertions",
      "The browser's developer tools, which expose it to the page",
      "The React library itself, which ships a set of testing matchers"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should a component test avoid asserting?",
    "topic": "Component tests with Testing Library",
    "choices": [
      "That a button can be clicked by the person using the page",
      "That some text is visible to the user on the screen",
      "That a form shows an error message after a failed submit",
      "Internal state variable names and implementation details"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why wrap a component in providers when testing it?",
    "topic": "Component tests with Testing Library",
    "choices": [
      "Providers speed up the test run",
      "Providers remove the need for assertions",
      "It may need context such as a router or query client to render",
      "Components cannot be rendered without a provider at all"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does Mock Service Worker (MSW) do?",
    "topic": "Mocking the network with MSW",
    "choices": [
      "Starts a real server for the application on a spare port",
      "Blocks all network access in the browser while the tests run",
      "Intercepts network requests and responds with mocked data",
      "Rewrites the component code so that it can avoid calling fetch"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is an advantage of mocking at the network level instead of mocking fetch directly?",
    "topic": "Mocking the network with MSW",
    "choices": [
      "The component's real request code runs against fake responses",
      "It removes the need to define any responses for the requests at all",
      "Fetch mocks are not allowed inside of the test files of the project",
      "Network mocks make the test run inside of a real browser window"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you define a mocked endpoint with MSW?",
    "topic": "Mocking the network with MSW",
    "choices": [
      "By creating a new route in the router of the application",
      "With a request handler for a method and a URL that returns a response",
      "By editing the code of the application's real server by hand",
      "By adding a special header to every real request the app sends"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can the same MSW handlers be reused?",
    "topic": "Mocking the network with MSW",
    "choices": [
      "In unit tests, component tests and during local development",
      "Only in end-to-end tests that run against a real browser",
      "Only in production builds of the application, never in tests",
      "Only inside the single test file where they were first written"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you test an error state with MSW?",
    "topic": "Mocking the network with MSW",
    "choices": [
      "Delete the handler from the project so no response is returned",
      "Change the component so that it always shows an error message",
      "Disconnect the computer from the network before running the test",
      "Override a handler for that test to return an error status"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should tests cover loading, empty and error states?",
    "topic": "Mocking the network with MSW",
    "choices": [
      "They make the happy path run faster",
      "They are required for the tests to compile",
      "They are the only states that need accessibility",
      "Users meet these states often and they are easy to break"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens if a request has no matching MSW handler?",
    "topic": "Mocking the network with MSW",
    "choices": [
      "The browser reloads the page and starts the test again from the top",
      "The request is sent to a random server chosen by the test runner",
      "The test passes without printing any message about the missing handler",
      "It can be configured to warn or error so unexpected calls are noticed"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you check that a request sent the correct body in an MSW test?",
    "topic": "Mocking the network with MSW",
    "choices": [
      "Print the request to a file and read it by hand",
      "Open the browser's network panel after the test",
      "Ask the server logs after the test run",
      "Read the request inside the handler and assert on it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why reset handlers between tests?",
    "topic": "Mocking the network with MSW",
    "choices": [
      "Because the handlers expire automatically after one minute of use",
      "To make the tests run in parallel without any interference at all",
      "To free some of the memory that the test process has used",
      "So an override in one test does not leak into the next"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a risk of mocks that drift from the real API?",
    "topic": "Mocking the network with MSW",
    "choices": [
      "The build runs out of disk space",
      "The mocks become faster than the real server",
      "Tests pass while the real integration is broken",
      "Tests fail only on Mondays"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does Playwright do?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "Compiles TypeScript sources into plain JavaScript for the browser to run",
      "Hosts static websites and serves them from a global network of servers",
      "Generates documentation for the project from the comments in the code",
      "Automates real browsers to run end-to-end tests on a page"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does Playwright's auto-waiting mean?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "Tests wait for another test to finish first",
      "Actions wait until elements are ready, such as visible and enabled",
      "The browser waits for the user to press a key",
      "The test runner pauses for a fixed ten seconds after each action"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which locator style does Playwright recommend?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "Absolute positions on the screen",
      "User-facing locators such as getByRole and getByText",
      "Generated class names from a build tool",
      "Long XPath expressions copied from the browser"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the Playwright trace viewer for?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "Checking the spelling of the names of the tests in a suite",
      "Replaying a failed test with actions, screenshots and network calls",
      "Viewing the history of the git commits in the project",
      "Tracing the route that the packets take to reach the server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can tests avoid logging in through the UI every time?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "Save the authenticated storage state once and reuse it",
      "Skip authentication in the application permanently",
      "Log in manually before each test run",
      "Share one user's password in every test file"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why are fixed sleeps like waitForTimeout discouraged?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "They are removed from the code by the build tool automatically",
      "Browsers do not support delays of any kind inside of tests",
      "They make tests slow and still flaky when the timing changes",
      "They make the tests fail immediately when the delay is reached"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can you make end-to-end tests independent of each other?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "Give each test its own data and clean up or isolate state",
      "Run all tests in a single huge test case",
      "Use the same user account for everything and never reset it",
      "Make each test depend on the result of the previous one"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of running tests in several browsers?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "To avoid having to write any assertions in the tests at all",
      "To measure the speed of the internet connection of the build server",
      "To catch differences between engines such as Chromium, Firefox and WebKit",
      "To make the whole test suite run twice as fast as before"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a good use of the Playwright codegen tool?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "Generating the whole backend of the application automatically for you",
      "Converting the tests that you wrote to a different programming language",
      "Recording interactions as a starting point that you then clean up",
      "Producing the final version of the tests without any human review"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which kind of check can Playwright do beyond functional steps?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "Linting of the CSS files that are used in the project",
      "Compile-time type checking of the whole application source",
      "Running database migrations before each test run begins",
      "Visual comparisons with screenshots and basic accessibility checks"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does running tests in continuous integration provide?",
    "topic": "CI, flaky tests and test coverage",
    "choices": [
      "Failing tests are hidden from the reviewers of the pull request",
      "Every change is verified automatically before it is merged",
      "Tests run only when someone on the team remembers to start them",
      "Tests run on the production servers instead of on a build machine"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a flaky test?",
    "topic": "CI, flaky tests and test coverage",
    "choices": [
      "A test that is written in a different language from the code",
      "A test that sometimes passes and sometimes fails without code changes",
      "A test that has no assertions and so can never fail at all",
      "A test that always fails, whatever changes are made to the code"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a common cause of flaky tests?",
    "topic": "CI, flaky tests and test coverage",
    "choices": [
      "Using descriptive names for the tests in the test file",
      "Timing assumptions, shared state or dependence on external services",
      "Writing the tests in TypeScript instead of plain JavaScript",
      "Having more than ten tests in a single file of the project"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How should a team treat a flaky test?",
    "topic": "CI, flaky tests and test coverage",
    "choices": [
      "Delete the whole test suite and write a new one from scratch",
      "Fix or quarantine it quickly, since it teaches people to ignore failures",
      "Rerun the pipeline until it passes and then move on to other work",
      "Ignore it, since flaky tests do not matter to the final product"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does code coverage measure?",
    "topic": "CI, flaky tests and test coverage",
    "choices": [
      "How many users the code has served since it was released",
      "How many lines of code were written during the current month",
      "The percentage of code that is executed while the tests run",
      "The percentage of bugs in the code that the tests have found"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is 100 percent coverage not a guarantee of quality?",
    "topic": "CI, flaky tests and test coverage",
    "choices": [
      "Coverage tools are not able to count more than ninety percent of lines",
      "Code that is covered by tests can never contain any bugs",
      "Code can run in tests without its behaviour being checked by assertions",
      "Coverage is only ever measured on the comments in the source files"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can coverage be used well?",
    "topic": "CI, flaky tests and test coverage",
    "choices": [
      "To decide which of the tests in the suite should be deleted",
      "To find untested areas, not as a target to chase blindly",
      "To rank the developers on a team by their coverage numbers",
      "To replace the code reviews that are done before a merge"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a sensible way to speed up a slow test suite in CI?",
    "topic": "CI, flaky tests and test coverage",
    "choices": [
      "Remove all of the assertions from the tests so they finish earlier",
      "Disable the tests on the main branch so the pipeline is quick",
      "Run only the tests that passed the last time the suite ran",
      "Run tests in parallel and split slow end-to-end tests across workers"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why run linting and type checking in the same pipeline as the tests?",
    "topic": "CI, flaky tests and test coverage",
    "choices": [
      "They hide the failing tests from the report that the team reads",
      "They are required for the test runner to be able to start up",
      "They catch different kinds of problems early and cheaply",
      "They make the tests unnecessary, since they find all of the same bugs"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should happen when a required check fails on a pull request?",
    "topic": "CI, flaky tests and test coverage",
    "choices": [
      "The merge is blocked until it is fixed or explicitly reviewed",
      "The pull request is merged automatically after a short waiting time",
      "The failure is hidden from the author until the review is finished",
      "The check is skipped on the next run so the merge can continue"
    ],
    "answerIdx": 0
  }
]
```

LAYER: frontend-dev-15

```json
[
  {
    "stem": "What is cross-site scripting (XSS)?",
    "topic": "XSS, CSRF and how frameworks help",
    "choices": [
      "An attacker getting their script to run in your page's context",
      "A user visiting two websites in the same browser window",
      "An attacker sending too many requests to overload the server",
      "A script that moves content from one site to another on request"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is React relatively safe against XSS for normal text rendering?",
    "topic": "XSS, CSRF and how frameworks help",
    "choices": [
      "It removes the HTML tags from every string at build time",
      "It stores all of the text from users on the server only",
      "It blocks all of the JavaScript from running inside of the page",
      "It escapes values in JSX before it inserts them into the DOM"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which React feature deserves extra caution because it bypasses escaping?",
    "topic": "XSS, CSRF and how frameworks help",
    "choices": [
      "An onClick handler on a button",
      "useState with a string value",
      "A className computed from props",
      "dangerouslySetInnerHTML"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should you do before rendering untrusted HTML?",
    "topic": "XSS, CSRF and how frameworks help",
    "choices": [
      "Sanitize it with a maintained library such as DOMPurify",
      "Add a data attribute to the element that will hold the HTML",
      "Convert all of the text of the HTML to uppercase letters",
      "Wrap it in a try/catch block so that errors cannot escape"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why can a user-supplied URL in an href attribute be dangerous?",
    "topic": "XSS, CSRF and how frameworks help",
    "choices": [
      "Long URLs slow down the address bar of the browser considerably",
      "Browsers refuse to open links that were entered by users at all",
      "URLs always contain the password of the user as a query parameter",
      "A javascript: URL can run script when the link is clicked"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is cross-site request forgery (CSRF)?",
    "topic": "XSS, CSRF and how frameworks help",
    "choices": [
      "A malicious site making a browser send an authenticated request",
      "A script reading the cookies of a different site directly",
      "An attacker guessing the password of a user by trying many",
      "A site copying the visual design of another site without permission"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does the SameSite cookie attribute help against CSRF?",
    "topic": "XSS, CSRF and how frameworks help",
    "choices": [
      "It stores the cookies on the server instead of in the browser",
      "It limits when cookies are sent on requests that come from other sites",
      "It encrypts the cookies so that scripts are unable to read them",
      "It makes the cookies expire at the moment the tab is closed"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is an anti-CSRF token?",
    "topic": "XSS, CSRF and how frameworks help",
    "choices": [
      "A cookie that is shared with every website the user visits",
      "A password reset link that is emailed to the user on request",
      "A session-bound secret required on state-changing requests",
      "A header that hides the request from attackers who watch the network"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should state-changing actions not use GET requests?",
    "topic": "XSS, CSRF and how frameworks help",
    "choices": [
      "GET requests are always slower than POST requests are",
      "GET requests are no longer supported by any of the modern browsers",
      "GET requests cannot carry cookies along with the request",
      "Links and images can trigger GET requests, which makes CSRF easier"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the safest way to put user data into a page?",
    "topic": "XSS, CSRF and how frameworks help",
    "choices": [
      "Store it in localStorage first and then read it back out",
      "Insert it as raw HTML and trust that the users are honest",
      "Encode it for where it appears, such as HTML text or an attribute",
      "Remove the word script from it before showing it on the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a Content Security Policy (CSP) do?",
    "topic": "Content Security Policy, CORS and secure headers",
    "choices": [
      "Prevents the page from being indexed by any search engine",
      "Encrypts the content of the page while it travels to the user",
      "Restricts the sources a page may load scripts and styles from",
      "Compresses scripts so that they load faster in the browser"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why does a strict CSP help even if an XSS bug exists?",
    "topic": "Content Security Policy, CORS and secure headers",
    "choices": [
      "It removes the XSS bug from the code of the application itself",
      "It hides the page from attackers who are searching for bugs",
      "It makes the server ignore all of the requests that it gets",
      "Injected inline scripts or scripts from unknown origins are blocked"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does CORS control?",
    "topic": "Content Security Policy, CORS and secure headers",
    "choices": [
      "Whether a page from one origin may read responses from another",
      "Which cookies are deleted when the browser is closed by the user",
      "The speed at which a browser downloads files from the server",
      "Whether a server accepts connections coming from a certain country"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Who enforces the CORS rules?",
    "topic": "Content Security Policy, CORS and secure headers",
    "choices": [
      "The browser, based on headers sent by the server",
      "The CDN, by caching requests",
      "The server, by refusing the TCP connection",
      "The operating system's firewall"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Is CORS a replacement for authorization on the server?",
    "topic": "Content Security Policy, CORS and secure headers",
    "choices": [
      "Yes, as long as the allowed origin is set to a wildcard value",
      "No, other clients ignore CORS, so the server must still check access",
      "Yes, because CORS blocks every unauthorised user from the API",
      "Only when the API is served over HTTPS and not over plain HTTP"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the Strict-Transport-Security header do?",
    "topic": "Content Security Policy, CORS and secure headers",
    "choices": [
      "Stops scripts from reading the cookies that the site has set",
      "Prevents the site from being embedded in frames on other sites",
      "Tells browsers to use only HTTPS for the site for a while",
      "Forces the server to use the TLS 1.0 protocol for all clients"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the X-Content-Type-Options: nosniff header prevent?",
    "topic": "Content Security Policy, CORS and secure headers",
    "choices": [
      "Search engines from reading the file when they crawl the site",
      "Cookies from being set by the server for that response",
      "Browsers guessing a type other than the declared one",
      "The compression of the response body before it is sent"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the frame-ancestors CSP directive (or X-Frame-Options) help prevent?",
    "topic": "Content Security Policy, CORS and secure headers",
    "choices": [
      "Cross-site scripting that comes from comments left by users",
      "Slow loading of the third-party fonts that a page uses",
      "SQL injection through the query parameters of the address",
      "Clickjacking, where your page is embedded in a hidden frame"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the risk of setting Access-Control-Allow-Origin: * together with credentials?",
    "topic": "Content Security Policy, CORS and secure headers",
    "choices": [
      "It disables HTTPS for the API that the page calls",
      "It gives the server access to the files on the user's computer",
      "It makes the site load more slowly for visitors on mobile",
      "Browsers reject it, and broad rules can expose data to sites"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a CORS preflight request?",
    "topic": "Content Security Policy, CORS and secure headers",
    "choices": [
      "An OPTIONS request the browser sends to check the real request is allowed",
      "A request that loads the fonts of the page before the first paint",
      "A request that tests the speed of the connection to the server",
      "A request that logs the user out of the current session"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is storing a long-lived access token in localStorage risky?",
    "topic": "Authentication tokens: where to store them and why",
    "choices": [
      "The browser deletes it automatically after one single minute",
      "Any script on the page, including injected ones, can read it",
      "It is sent automatically to every website the user visits",
      "It can only hold numbers, so a real token would not fit"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the HttpOnly cookie attribute do?",
    "topic": "Authentication tokens: where to store them and why",
    "choices": [
      "Makes the cookie travel only over unencrypted HTTP",
      "Shares the cookie with every subdomain",
      "Deletes the cookie when the tab closes",
      "Prevents JavaScript from reading the cookie"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the Secure cookie attribute do?",
    "topic": "Authentication tokens: where to store them and why",
    "choices": [
      "Hides the cookie from the server",
      "Encrypts the cookie contents in the browser",
      "Sends the cookie only over HTTPS",
      "Makes the cookie expire in one hour"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which combination is usually recommended for a session cookie?",
    "topic": "Authentication tokens: where to store them and why",
    "choices": [
      "Stored in a URL parameter",
      "Readable by scripts, sent over any protocol, no SameSite",
      "HttpOnly, Secure and SameSite set appropriately",
      "Saved in localStorage and copied to a cookie"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why use short-lived access tokens with refresh tokens?",
    "topic": "Authentication tokens: where to store them and why",
    "choices": [
      "A stolen access token is useful to an attacker for only a short time",
      "Short tokens are easier for the users to remember by heart",
      "Browsers refuse to accept tokens that last longer than a day",
      "Refresh tokens make the requests of the application faster"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where should the refresh token be kept in a browser app?",
    "topic": "Authentication tokens: where to store them and why",
    "choices": [
      "In the URL so that it can be bookmarked",
      "In an HttpOnly, Secure cookie out of reach of page scripts",
      "In a global JavaScript variable shared across tabs",
      "In the page's HTML as a data attribute"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should the frontend do when the server returns 401?",
    "topic": "Authentication tokens: where to store them and why",
    "choices": [
      "Retry the request forever until the server finally responds",
      "Ignore the response and carry on as if nothing had happened",
      "Show the user's token in an error message on the page",
      "Refresh the session once, then send the user to sign in"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why must logout also be handled on the server?",
    "topic": "Authentication tokens: where to store them and why",
    "choices": [
      "Servers can only log users out at midnight each day",
      "The session or refresh token must be invalidated, not just dropped",
      "Browsers refuse to delete cookies for a site by themselves",
      "Logout is only a visual change in the interface of the app"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a risk of putting tokens in URL query parameters?",
    "topic": "Authentication tokens: where to store them and why",
    "choices": [
      "URLs longer than ten characters are rejected by every browser",
      "Query parameters are encrypted so that nobody can use the tokens",
      "They can leak through history, logs and the Referer header",
      "They stop the page from loading as soon as the browser sees them"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does an OAuth login with PKCE help protect?",
    "topic": "Authentication tokens: where to store them and why",
    "choices": [
      "A public client from having its authorization code intercepted",
      "The page from being scraped by bots that read its content",
      "Cookies from being sent to other sites by the browser",
      "The database from SQL injection through the login form"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the Vite dev server do differently from a traditional bundler in development?",
    "topic": "Vite: dev server, bundling and environment variables",
    "choices": [
      "Uploads each of the changes to a cloud server for sharing",
      "Serves source files as native ES modules, transformed on demand",
      "Bundles the whole application into one single file before it starts",
      "Compiles the code into native machine code for the processor"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which tool does Vite use to bundle for production?",
    "topic": "Vite: dev server, bundling and environment variables",
    "choices": [
      "A custom compiler that only supports React applications",
      "Nothing at all, since production uses the dev server as well",
      "Rollup (with Rolldown planned or used in newer versions)",
      "A browser extension that the user installs before visiting"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which environment variables does Vite expose to client code?",
    "topic": "Vite: dev server, bundling and environment variables",
    "choices": [
      "Only variables that begin with an underscore",
      "Only those prefixed with VITE_",
      "None, since client code cannot read variables",
      "All environment variables on the machine"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why must you never put secrets in VITE_ variables?",
    "topic": "Vite: dev server, bundling and environment variables",
    "choices": [
      "Vite encrypts them so that they stop working for the application",
      "They are embedded in the bundle that every visitor can read",
      "They are deleted during the production build to save space",
      "They can only be read by the server and never by the browser"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is Hot Module Replacement (HMR)?",
    "topic": "Vite: dev server, bundling and environment variables",
    "choices": [
      "Restarting the operating system after every change to a file",
      "Replacing the hot reload server with a cold one after each change",
      "Reloading the whole page whenever the user moves the mouse",
      "Updating changed modules in the page without a full reload"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does 'vite build' produce?",
    "topic": "Vite: dev server, bundling and environment variables",
    "choices": [
      "A zipped copy of the node_modules folder",
      "A running development server",
      "A database schema",
      "Optimised, hashed static assets ready to deploy"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does 'vite preview' do?",
    "topic": "Vite: dev server, bundling and environment variables",
    "choices": [
      "Deploys the application to the internet through a hosting provider",
      "Serves the production build locally so you can check it",
      "Shows a list of the plugins that are installed in the project",
      "Previews the code changes in the editor before they are saved"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why do bundlers hash file names in the production output?",
    "topic": "Vite: dev server, bundling and environment variables",
    "choices": [
      "Because servers require hashed names for static files to work",
      "To hide the contents of the files from the people who visit",
      "So that changed files get new URLs and can be cached for a long time",
      "To reduce the size of the files that are sent to the browser"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the 'base' option in Vite config matter for?",
    "topic": "Vite: dev server, bundling and environment variables",
    "choices": [
      "Defining the main colour of the theme for the interface",
      "Setting the default font size for the whole of the application",
      "Serving the app from a sub-path such as /app/ instead of the root",
      "Choosing the database that the application connects to at runtime"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the purpose of the proxy option in the dev server?",
    "topic": "Vite: dev server, bundling and environment variables",
    "choices": [
      "Compressing images before they are served by the dev server",
      "Hiding the IP address of the developer from the backend server",
      "Blocking access to the dev server from the other computers",
      "Forwards API requests to a backend to avoid CORS issues in development"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a CI pipeline typically run on each push?",
    "topic": "CI/CD, preview deployments and rollbacks",
    "choices": [
      "A backup of the production database",
      "Install, lint, type check, test and build",
      "Only the deploy step, with no checks",
      "A manual review by the whole team"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a preview deployment?",
    "topic": "CI/CD, preview deployments and rollbacks",
    "choices": [
      "A final deployment to production that skips the normal review",
      "A temporary deployment of a branch with its own URL",
      "A local server that the developer starts on their own laptop",
      "A screenshot of the last build that the pipeline produced"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why are preview deployments valuable for frontend work?",
    "topic": "CI/CD, preview deployments and rollbacks",
    "choices": [
      "Reviewers can try the real change in a browser before merge",
      "They make the production site respond faster to visitors",
      "They remove the need for pull requests in the review process",
      "They replace all of the automated tests that a project has"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a rollback?",
    "topic": "CI/CD, preview deployments and rollbacks",
    "choices": [
      "Moving the code to a different branch of the repository",
      "Returning to a previous known-good version after a bad release",
      "Deleting the repository of the project and starting again",
      "Waiting for the bug to fix itself over the following days"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What makes rollbacks fast and safe for static frontends?",
    "topic": "CI/CD, preview deployments and rollbacks",
    "choices": [
      "Immutable, versioned builds that can point back to an older one",
      "Rebuilding the whole project from scratch with the old code",
      "Asking the users to clear their cache and reload the page",
      "Editing the live files by hand on the server after a failed release"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a feature flag used for?",
    "topic": "CI/CD, preview deployments and rollbacks",
    "choices": [
      "Turning a feature on or off for some users without redeploying",
      "Changing the main colour of the application for all of the users",
      "Marking a feature as complete on the project board of the team",
      "Reporting bugs from the application to the people who use it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why separate build-time and runtime configuration for frontend apps?",
    "topic": "CI/CD, preview deployments and rollbacks",
    "choices": [
      "Runtime configuration is always faster than build-time values are",
      "Browsers are not able to read any kind of configuration at all",
      "Build-time values are baked into the bundle, so each environment needs care",
      "Build-time configuration is always more secure than runtime values"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a staged (canary) rollout do?",
    "topic": "CI/CD, preview deployments and rollbacks",
    "choices": [
      "Rolls the release back automatically after one day has passed",
      "Releases the new version to all of the users at the same moment",
      "Releases the new version only to the internal team, for ever",
      "Releases to a small share of users first and watches"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which practice keeps secrets out of the repository?",
    "topic": "CI/CD, preview deployments and rollbacks",
    "choices": [
      "Put them in the README so that the whole team can find them",
      "Hard-code them in the frontend bundle where the app can read them",
      "Commit them to a private repository for the sake of convenience",
      "Keep them in CI secret storage and inject them at build time"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should happen if tests fail in the pipeline?",
    "topic": "CI/CD, preview deployments and rollbacks",
    "choices": [
      "Production is restarted",
      "The pipeline stops and the change is not deployed",
      "The pipeline deploys anyway and notifies the team later",
      "The failing tests are removed automatically"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why add error monitoring to a frontend application?",
    "topic": "Error monitoring, logging and web analytics",
    "choices": [
      "It prevents every error from ever happening in production",
      "It makes the application load faster for all of the visitors",
      "You learn about errors that real users hit but your tests never did",
      "It replaces the need to write tests for the application"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a source map let a monitoring tool do?",
    "topic": "Error monitoring, logging and web analytics",
    "choices": [
      "Show readable original code locations for errors in minified bundles",
      "Hide the code of the application from the people who visit",
      "Create a map of all of the pages that exist on the website",
      "Compress the bundle even further before it is sent to users"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why upload source maps to the monitoring service instead of publishing them publicly?",
    "topic": "Error monitoring, logging and web analytics",
    "choices": [
      "Browsers refuse to read source maps that are public on a site",
      "Public source maps make the site load more slowly than normal",
      "You get readable traces without publishing your source code",
      "Source maps are not allowed to be stored on production servers"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does an error boundary report to monitoring?",
    "topic": "Error monitoring, logging and web analytics",
    "choices": [
      "Errors thrown while rendering the component tree, which you can log",
      "The speed of each render that the component performs on screen",
      "Every console.log statement that appears anywhere in the code",
      "Network failures that happen when the user goes offline for a while"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What extra context makes an error report more useful?",
    "topic": "Error monitoring, logging and web analytics",
    "choices": [
      "Only the error message and nothing else about the situation",
      "The release, route, breadcrumbs of user actions and browser details",
      "The full contents of the password field that the user typed",
      "A screenshot of the desktop of the developer who wrote it"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why scrub personal data from logs and error reports?",
    "topic": "Error monitoring, logging and web analytics",
    "choices": [
      "Reports are seen by many people and kept for long, which is a privacy risk",
      "Personal data makes the logs unreadable for the tools that parse them",
      "Browsers delete the logs automatically when they contain names",
      "Monitoring tools are not able to store any text containing names"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is Real User Monitoring (RUM)?",
    "topic": "Error monitoring, logging and web analytics",
    "choices": [
      "Watching the developers while they use the application",
      "Collecting performance data such as Web Vitals from actual visitors",
      "Running a synthetic test from one single location every hour",
      "Counting the lines of code that were written each day"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a sensible approach to web analytics and privacy?",
    "topic": "Error monitoring, logging and web analytics",
    "choices": [
      "Never measure anything at all, because measuring is unethical",
      "Collect everything and decide later what is useful to keep",
      "Track users across all of the sites without telling them",
      "Collect only what you need, respect consent and avoid fingerprinting"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the benefit of tracking the release version in errors?",
    "topic": "Error monitoring, logging and web analytics",
    "choices": [
      "The version number makes the production bundle load faster",
      "Users can see which version they are running in the footer",
      "You can see whether a new deploy introduced a spike in errors",
      "Errors are fixed automatically in the next version of the app"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should an alert on error rates be based on?",
    "topic": "Error monitoring, logging and web analytics",
    "choices": [
      "A meaningful threshold or change that shows user impact",
      "Every single error event, however small it happens to be",
      "The number of developers who are currently on call",
      "The time of day at which the errors happen to occur"
    ],
    "answerIdx": 0
  }
]
```

