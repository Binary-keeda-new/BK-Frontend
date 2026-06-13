// ── FULL STACK DEVELOPER ROADMAP DATA ────────────────────────────────────────

// ── 3-MONTH TRACK (6 bi-weekly modules) ──────────────────────────────────────
const weeks3Month = [
  {
    id: '3m-w1-2',
    week: 'Weeks 1-2',
    title: 'Frontend Fundamentals (HTML & CSS)',
    points: 80,
    objectives: [
      'Write clean, semantic HTML5 structure according to standards',
      'Design responsive, modern page layouts using CSS Flexbox and Grid',
      'Optimize web pages for mobile and desktop viewport sizes'
    ],
    content: `<h3>Weeks 1-2: Frontend Fundamentals</h3>
    <p>HTML is the skeleton of every website, while CSS provides the visual style. In these weeks, you will master layout systems like Flexbox and Grid, and learn to write semantic markup.</p>`,
    topics: ['HTML5', 'CSS3', 'Flexbox', 'CSS Grid', 'Responsive Design'],
    projects: ['Personal Portfolio Page', 'Product Landing Page'],
    resources: {
      websites: [
        { title: 'MDN Web Docs - HTML Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/HTML' },
        { title: 'freeCodeCamp - Responsive Web Design', url: 'https://www.freecodecamp.org/learn/2022/responsive-web-design/' }
      ],
      videos: [
        { title: 'HTML & CSS Full Course - Dave Gray', url: 'https://www.youtube.com/embed/mU6anWqZJcc', dur: '11 hr' },
        { title: 'CSS Flexbox in 15 Minutes - Web Dev Simplified', url: 'https://www.youtube.com/embed/fYq5PXgSsbE', dur: '15 min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: '3m-w12-e1',
          question: 'Which HTML5 element describes the navigation section of a page?',
          type: 'mcq',
          options: ['<nav>', '<header>', '<section>', '<aside>'],
          ans: 0
        },
        {
          id: '3m-w12-e2',
          question: 'CSS stands for Computer Style Sheets.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 1
        }
      ],
      medium: [
        {
          id: '3m-w12-m1',
          question: 'Which of the following properties are used to control spacing inside flex container layouts? (Select all that apply)',
          type: 'msq',
          options: ['justify-content', 'align-items', 'gap', 'padding-bottom'],
          ans: [0, 1, 2]
        },
        {
          id: '3m-w12-m2',
          question: 'What is the default value of the flex-direction property?',
          type: 'mcq',
          options: ['row', 'column', 'row-reverse', 'column-reverse'],
          ans: 0
        }
      ],
      hard: [
        {
          id: '3m-w12-h1',
          question: 'Which CSS declaration makes an element a grid container and sets up 3 equal columns?',
          type: 'output',
          options: [
            'display: grid; grid-template-columns: repeat(3, 1fr);',
            'display: grid; columns: 3;',
            'display: flex; flex-direction: columns(3);',
            'grid: auto / repeat(3);'
          ],
          ans: 0
        },
        {
          id: '3m-w12-h2',
          question: 'Identify the bug in this responsive design media query rule:\n@media screen (max-width: 768px) {\n  body { font-size: 14px; }\n}',
          type: 'debug',
          options: [
            'Missing the "and" keyword between screen and the parenthesis constraint',
            'max-width parameter must be written in capital letters',
            'The body selector cannot change font-size inside media queries',
            'Missing semicolon inside screen argument'
          ],
          ans: 0
        }
      ]
    }
  },
  {
    id: '3m-w3-4',
    week: 'Weeks 3-4',
    title: 'JavaScript Core & ES6+',
    points: 90,
    objectives: [
      'Understand JS execution context, hoisting, scope, and closures',
      'Manipulate DOM nodes dynamically and handle user interaction events',
      'Execute async HTTP queries using Fetch API and Promise structures'
    ],
    content: `<h3>Weeks 3-4: JavaScript Core & ES6+</h3>
    <p>JavaScript turns static pages into interactive web apps. Master foundational operations, events delegation, Promises, and modern ES6+ syntaxes.</p>`,
    topics: ['Variables & Scopes', 'Hoisting', 'DOM Manipulation', 'Event Loop', 'Fetch API', 'Promises'],
    projects: ['Interactive To-Do List', 'Weather Forecast Dashboard'],
    resources: {
      websites: [
        { title: 'JavaScript.info - The Modern JS Tutorial', url: 'https://javascript.info' },
        { title: 'MDN Web Docs - JavaScript guide', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript' }
      ],
      videos: [
        { title: 'JavaScript Crash Course - Traversy Media', url: 'https://www.youtube.com/embed/hdI2bqOjy3c', dur: '1.5 hr' },
        { title: 'Asynchronous JavaScript Course - freeCodeCamp', url: 'https://www.youtube.com/embed/ZYb_ZU8LNxs', dur: '1hr 36min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: '3m-w34-e1',
          question: 'Which keyword declares block-scoped variables that cannot be reassigned?',
          type: 'mcq',
          options: ['var', 'let', 'const', 'define'],
          ans: 2
        },
        {
          id: '3m-w34-e2',
          question: 'The querySelector method returns all elements matching a specified selector.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 1
        }
      ],
      medium: [
        {
          id: '3m-w34-m1',
          question: 'Which of the following are valid ways to declare functions in ES6? (Select all that apply)',
          type: 'msq',
          options: ['const f = () => {}', 'function f() {}', 'const f = function() {}', 'declare function f()'],
          ans: [0, 1, 2]
        },
        {
          id: '3m-w34-m2',
          question: 'What is the output of the following code?\nconsole.log(typeof []);',
          type: 'output',
          options: ['"array"', '"object"', '"null"', '"undefined"'],
          ans: 1
        }
      ],
      hard: [
        {
          id: '3m-w34-h1',
          question: 'What is the output of this code?\nconst p = new Promise(r => r(1));\np.then(x => x + 1).then(x => console.log(x));',
          type: 'output',
          options: ['1', '2', 'undefined', 'Promise { <pending> }'],
          ans: 1
        },
        {
          id: '3m-w34-h2',
          question: 'Identify the bug: fetch() request completes successfully but response.json() causes errors.',
          type: 'debug',
          options: [
            'response.json() returns a Promise and must be resolved using awaits or .then()',
            'fetch requests cannot fetch JSON payloads',
            'response.json is not a valid method',
            'NPM package must be installed first'
          ],
          ans: 0
        }
      ]
    }
  },
  {
    id: '3m-w5-6',
    week: 'Weeks 5-6',
    title: 'React.js Basics & Tailwind styling',
    points: 100,
    objectives: [
      'Create reusable UI components using functional React paradigms',
      'Manage local states and data variables with useState hooks',
      'Style interfaces fast using Tailwind CSS utility scale classes'
    ],
    content: `<h3>Weeks 5-6: React.js Basics & Tailwind</h3>
    <p>React is the most popular frontend library. You will learn to compose functional interfaces, parse data via Props, manage local State, and style components with Tailwind CSS.</p>`,
    topics: ['React Basics', 'JSX', 'Props', 'useState Hook', 'Tailwind utility classes'],
    projects: ['Movie Database Explorer', 'Interactive Calculator UI'],
    resources: {
      websites: [
        { title: 'React Official Documentation', url: 'https://react.dev' },
        { title: 'Tailwind CSS Documentation', url: 'https://tailwindcss.com/docs' }
      ],
      videos: [
        { title: 'React JS Crash Course - Traversy Media', url: 'https://www.youtube.com/embed/w7ejDZ8SWv8', dur: '2 hr' },
        { title: 'Learn Tailwind CSS - freeCodeCamp', url: 'https://www.youtube.com/embed/ft30zcMlFao', dur: '4 hr 15min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: '3m-w56-e1',
          question: 'In React, state values are passed down from parent to child using props.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        },
        {
          id: '3m-w56-e2',
          question: 'What is the syntax for writing inline JS variables inside JSX layout tags?',
          type: 'mcq',
          options: ['%var%', '{{var}}', '{var}', '[var]'],
          ans: 2
        }
      ],
      medium: [
        {
          id: '3m-w56-m1',
          question: 'Which of the following are benefits of using Tailwind CSS? (Select all that apply)',
          type: 'msq',
          options: [
            'Utility-first classes reduce custom CSS files writing',
            'Enforces responsive design via built-in prefixes like md: and lg:',
            'Eliminates the need to write JavaScript logic',
            'Out-of-the-box support for dark mode states'
          ],
          ans: [0, 1, 3]
        },
        {
          id: '3m-w56-m2',
          question: 'What is the primary function of the useState Hook?',
          type: 'mcq',
          options: [
            'To store component data variables that trigger UI re-renders on change',
            'To execute API fetch requests',
            'To navigate between pages',
            'To bind standard DOM events'
          ],
          ans: 0
        }
      ],
      hard: [
        {
          id: '3m-w56-h1',
          question: 'What is the output/result of this hook execution?\nconst [count, setCount] = useState(0);\nconst increment = () => {\n  setCount(c => c + 1);\n  setCount(c => c + 1);\n};',
          type: 'output',
          options: ['Increments count by 1', 'Increments count by 2', 'Leaves count unchanged at 0', 'Throws a rendering error'],
          ans: 1
        },
        {
          id: '3m-w56-h2',
          question: 'Debug the error: Tailwind responsive styles (e.g. md:grid-cols-2) are not applying in the browser.',
          type: 'debug',
          options: [
            'Vite or Tailwind configurations are missing viewport breakpoints setup, or content array paths do not include the files',
            'HTML index files cannot load stylesheet utilities',
            'Vite does not support mobile breakpoints styles rendering',
            'Breakpoints must be written in capital letters'
          ],
          ans: 0
        }
      ]
    }
  },
  {
    id: '3m-w7-8',
    week: 'Weeks 7-8',
    title: 'Advanced React & Routing',
    points: 100,
    objectives: [
      'Configure side effects and data subscription states using useEffect hooks',
      'Set up client-side page routing using React Router routes configs',
      'Implement global state contexts avoiding props-drilling'
    ],
    content: `<h3>Weeks 7-8: Advanced React & Routing</h3>
    <p>Build scalable single-page apps (SPAs) by implementing hooks lifecycle tracking, global Context stores, and multi-page routing paths.</p>`,
    topics: ['useEffect Hook', 'Context API', 'React Router v6', 'Dynamic Routes'],
    projects: ['Multi-User Blog Portal UI', 'Expense Tracker with global states'],
    resources: {
      websites: [
        { title: 'React Hooks Reference', url: 'https://react.dev/reference/react' },
        { title: 'React Router Official Guides', url: 'https://reactrouter.com' }
      ],
      videos: [
        { title: 'React Router v6 Tutorial - Web Dev Simplified', url: 'https://www.youtube.com/embed/Ul3y1LXxzdU', dur: '37 min' },
        { title: 'useEffect Hook Explained - Web Dev Simplified', url: 'https://www.youtube.com/embed/0ZJgIjIuY7U', dur: '20 min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: '3m-w78-e1',
          question: 'Which component is used to define navigation link anchors in React Router?',
          type: 'mcq',
          options: ['<a>', '<Link>', '<Route>', '<Redirect>'],
          ans: 1
        },
        {
          id: '3m-w78-e2',
          question: 'The Context API should be used to store every single local input value.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 1
        }
      ],
      medium: [
        {
          id: '3m-w78-m1',
          question: 'What happens when you pass an empty array [] as the second parameter dependency of the useEffect Hook? (Select all that apply)',
          type: 'msq',
          options: [
            'The side-effect callback function runs only once on mount',
            'The callback runs on every component rendering cycle',
            'React triggers cleanup function only when the component unmounts',
            'The component throws a hook warning error'
          ],
          ans: [0, 2]
        },
        {
          id: '3m-w78-m2',
          question: 'Which React Hook lets you read Context values inside functional components?',
          type: 'mcq',
          options: ['useState', 'useContext', 'useRef', 'useReducer'],
          ans: 1
        }
      ],
      hard: [
        {
          id: '3m-w78-h1',
          question: 'What is the output/result of this route configuration matching the url "/users/42"?\n<Route path="/users/:id" element={<User />} />',
          type: 'output',
          options: [
            'Renders <User /> component with useParams() returning { id: "42" }',
            'Throws a 404 Route Not Found error',
            'Renders index homepage',
            'Redirects to "/users"'
          ],
          ans: 0
        },
        {
          id: '3m-w78-h2',
          question: 'Identify the bug: component re-renders infinitely when utilizing useEffect to update local states.',
          type: 'debug',
          options: [
            'The state variable being updated is included inside the hook dependency array argument',
            'React hooks cannot update local state variables',
            'The dependency array should be populated with component names',
            'Missing dependency parameters typing declarations'
          ],
          ans: 0
        }
      ]
    }
  },
  {
    id: '3m-w9-10',
    week: 'Weeks 9-10',
    title: 'Backend API Design & Databases',
    points: 110,
    objectives: [
      'Create HTTP servers and define REST API routes using Node.js and Express',
      'Implement Express request parsing middlewares and custom router controllers',
      'Establish database connectivity and Mongoose model validations using MongoDB'
    ],
    content: `<h3>Weeks 9-10: Backend API Design & Databases</h3>
    <p>Step behind the scenes. Build server applications using Express, design REST APIs, connect databases, and execute schemas operations.</p>`,
    topics: ['Node.js runtime', 'Express frameworks', 'REST API rules', 'MongoDB Atlas', 'Mongoose ORM'],
    projects: ['REST API Task Manager', 'User Registry service'],
    resources: {
      websites: [
        { title: 'Express Routing Guide', url: 'https://expressjs.com/en/guide/routing.html' },
        { title: 'Mongoose ODM Documentation', url: 'https://mongoosejs.com/docs/guide.html' }
      ],
      videos: [
        { title: 'Express.js Full Course - freeCodeCamp', url: 'https://www.youtube.com/embed/Oe421EPjeBE', dur: '8 hr' },
        { title: 'MongoDB Crash Course - Web Dev Simplified', url: 'https://www.youtube.com/embed/ofme2o29ngU', dur: '30 min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: '3m-w910-e1',
          question: 'Which Express method is used to parse JSON body payloads on requests?',
          type: 'mcq',
          options: ['app.use(json())', 'app.use(express.json())', 'app.use(bodyParser())', 'app.parseJSON()'],
          ans: 1
        },
        {
          id: '3m-w910-e2',
          question: 'MongoDB Atlas is a cloud database hosting provider.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: '3m-w910-m1',
          question: 'Which of the following are valid CRUD functions in Mongoose? (Select all that apply)',
          type: 'msq',
          options: ['Model.find()', 'Model.create()', 'Model.updateOne()', 'Model.selectRows()'],
          ans: [0, 1, 2]
        },
        {
          id: '3m-w910-m2',
          question: 'What is the role of an Express routing middleware function?',
          type: 'mcq',
          options: [
            'To intercept requests and execute code before reaching final route controllers',
            'To style HTML forms templates',
            'To compile browser Javascript code',
            'To set up CSS Grid columns dimensions'
          ],
          ans: 0
        }
      ],
      hard: [
        {
          id: '3m-w910-h1',
          question: 'What occurs if we trigger res.send() multiple times inside a single Express route controller?',
          type: 'output',
          options: [
            'Throws "Cannot set headers after they are sent to the client" error',
            'Combines responses contents into one stream',
            'Express ignores subsequent responses silently',
            'Restarts the nodemon dev server process'
          ],
          ans: 0
        },
        {
          id: '3m-w910-h2',
          question: 'Identify the bug: Mongoose Model operations fail with schema verification warnings when trying to update records.',
          type: 'debug',
          options: [
            'Mongoose findOneAndUpdate does not run validation checks by default; pass { runValidators: true } options',
            'MongoDB does not allow updating existing collection values',
            'Required flags are ignored inside update queries',
            'Database indexes have locked the files modifications'
          ],
          ans: 0
        }
      ]
    }
  },
  {
    id: '3m-w11-12',
    week: 'Weeks 11-12',
    title: 'Authentication & Fullstack Deployment',
    points: 120,
    objectives: [
      'Encrypt password strings using bcryptjs hashing techniques',
      'Sign and verify state tokens using JSON Web Tokens (JWT)',
      'Deploy Express backends on Render and react frontends on Vercel'
    ],
    content: `<h3>Weeks 11-12: Auth & Deployment</h3>
    <p>Complete your full-stack journey. Implement registration & login flows, issue secure cookies or JWT authorization tokens, and launch your capstone projects to live URLs.</p>`,
    topics: ['Authentication', 'bcryptjs hashing', 'JSON Web Tokens', 'Production Deployment'],
    projects: ['MERN App with Secure Authentication', 'Live Portfolio Deployment'],
    resources: {
      websites: [
        { title: 'JWT.io - Introduction to tokens', url: 'https://jwt.io/introduction' },
        { title: 'Render.com - Hosting Reference', url: 'https://docs.render.com' }
      ],
      videos: [
        { title: 'JWT Auth explained - Web Dev Simplified', url: 'https://www.youtube.com/embed/7Q17ubqLfaM', dur: '35 min' },
        { title: 'MERN Stack Tutorial for Beginners with Deployement - freeCodeCamp', url: 'https://www.youtube.com/embed/F9gB5b4jgOI', dur: '1.5 hr' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: '3m-w1112-e1',
          question: 'Which HTTP authorization header is commonly used to transfer JWT tokens?',
          type: 'mcq',
          options: ['Bearer token', 'Authorization', 'Token-Header', 'API-Key'],
          ans: 1
        },
        {
          id: '3m-w1112-e2',
          question: 'You should store plain text passwords directly in your databases.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 1
        }
      ],
      medium: [
        {
          id: '3m-w1112-m1',
          question: 'Which of the following are components of a signed JWT token structure? (Select all that apply)',
          type: 'msq',
          options: ['Header', 'Payload', 'Signature', 'Password Hash'],
          ans: [0, 1, 2]
        },
        {
          id: '3m-w1112-m2',
          question: 'What is the role of bcrypt in modern authentication flows?',
          type: 'mcq',
          options: [
            'To hash passcodes using cryptographic functions before database storage',
            'To generate authentication session cookies tokens',
            'To encrypt network routes messages',
            'To structure database schemas validation'
          ],
          ans: 0
        }
      ],
      hard: [
        {
          id: '3m-w1112-h1',
          question: 'What happens when a JWT token expires?',
          type: 'output',
          options: [
            'Verification throws JWTExpiredError and refuses access verification',
            'Token automatically extends itself',
            'Payload values are deleted automatically',
            'Express server triggers reload cycle'
          ],
          ans: 0
        },
        {
          id: '3m-w1112-h2',
          question: 'Identify the bug: JWT authorization middleware fails to extract values from requests.',
          type: 'debug',
          options: [
            'Req headers parser does not split the Bearer prefix string from the actual token value string correctly',
            'Token strings cannot contain lowercase letters',
            'Browser client blocks JWT parameters transmission',
            'Database server is missing cryptographic keys'
          ],
          ans: 0
        }
      ]
    }
  }
];

// ── 6-MONTH TRACK (12 bi-weekly modules) ─────────────────────────────────────
const weeks6Month = [
  {
    id: '6m-w1-2',
    week: 'Weeks 1-2',
    title: 'HTML5 Semantics & CSS Layouts',
    points: 80,
    objectives: [
      'Utilize semantic layouts elements to construct pages grids structure',
      'Implement fluid and responsive grid cards layout templates with CSS Grid and Flexbox',
      'Apply custom styling rules matching modern design systems'
    ],
    content: `<h3>Weeks 1-2: HTML5 & CSS Layouts</h3>
    <p>Begin your professional roadmap by mastering clean document formatting, accessibility standards, layouts structuring, and responsiveness variables.</p>`,
    topics: ['HTML5 Semantics', 'CSS Box Model', 'Flexbox', 'CSS Grid', 'Media Queries'],
    projects: ['Interactive Landing Page', 'Corporate Layout CSS Grid Templates'],
    resources: {
      websites: [
        { title: 'GeeksforGeeks - HTML Tutorial', url: 'https://www.geeksforgeeks.org/html-tutorial/' },
        { title: 'CSS Tricks - Complete Guide to Flexbox', url: 'https://css-tricks.com/snippets/css/a-guide-to-flexbox/' }
      ],
      videos: [
        { title: 'HTML & CSS Full Course - Dave Gray', url: 'https://www.youtube.com/embed/mU6anWqZJcc', dur: '11 hr' },
        { title: 'CSS Grid Crash Course - Traversy Media', url: 'https://www.youtube.com/embed/0xMQfnTU6oo', dur: '45 min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: '6m-w12-e1',
          question: 'Which tag defines layouts containers for side information?',
          type: 'mcq',
          options: ['<side>', '<aside>', '<section>', '<div>'],
          ans: 1
        },
        {
          id: '6m-w12-e2',
          question: 'Flexbox layout systems are primarily designed for one-dimensional layouts.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: '6m-w12-m1',
          question: 'Which values are part of the standard CSS box-model specification? (Select all that apply)',
          type: 'msq',
          options: ['Content', 'Padding', 'Border', 'Margin'],
          ans: [0, 1, 2, 3]
        },
        {
          id: '6m-w12-m2',
          question: 'What is the purpose of setting box-sizing: border-box;',
          type: 'mcq',
          options: [
            'Includes padding and border dimensions within the elements total width and height',
            'Removes margin spacing parameters',
            'Turns the elements display behavior to inline flex items',
            'Enforces custom database structures'
          ],
          ans: 0
        }
      ],
      hard: [
        {
          id: '6m-w12-h1',
          question: 'What does grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) achieve?',
          type: 'output',
          options: [
            'Creates a responsive grid template where columns resize and wrap based on layout space without media queries',
            'Enforces exactly 3 columns elements across layouts viewport',
            'Locks item widths to 200px size parameter permanently',
            'Throws compilation warnings'
          ],
          ans: 0
        },
        {
          id: '6m-w12-h2',
          question: 'Identify the bug: grid layout columns shrink and overlap when layout sizes shrink.',
          type: 'debug',
          options: [
            'The template sizes do not declare a minmax constraint or a responsive fractional scale (fr) setting',
            'Flexbox should be utilized instead of Grid columns',
            'CSS Grid does not support page items shrink actions',
            'Viewport elements must use fixed pixel values'
          ],
          ans: 0
        }
      ]
    }
  },
  {
    id: '6m-w3-4',
    week: 'Weeks 3-4',
    title: 'JavaScript Syntax & DOM manipulation',
    points: 80,
    objectives: [
      'Implement standard programming concepts like variables, scopes, loops, and conditions',
      'Select, edit, create and remove document elements using query operations',
      'Register event triggers and manage standard listeners parameters'
    ],
    content: `<h3>Weeks 3-4: JS Basics & DOM</h3>
    <p>Learn programming structures. Write functional algorithms, control data states, select DOM elements, and update styling values dynamically.</p>`,
    topics: ['Variables and scopes', 'Functions', 'Arrays & Objects', 'DOM Node selectors', 'DOM Events'],
    projects: ['Interactive Quiz Application', 'DOM Expense calculator'],
    resources: {
      websites: [
        { title: 'MDN Web Docs - DOM overview', url: 'https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction' },
        { title: 'freeCodeCamp - Javascript Basics', url: 'https://www.freecodecamp.org/learn/javascript-algorithms-and-data-structures/' }
      ],
      videos: [
        { title: 'JavaScript Crash Course for Beginners - Traversy Media', url: 'https://www.youtube.com/embed/hdI2bqOjy3c', dur: '1.5 hr' },
        { title: 'JavaScript DOM Manipulation - freeCodeCamp', url: 'https://www.youtube.com/embed/5fb2aPlgoys', dur: '2 hr' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: '6m-w34-e1',
          question: 'Which method returns an array of all elements matching a specified selector query?',
          type: 'mcq',
          options: ['getElementById', 'querySelector', 'querySelectorAll', 'getElementsByClassName'],
          ans: 2
        },
        {
          id: '6m-w34-e2',
          question: 'The click event bubbles up to parent elements in the DOM tree by default.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: '6m-w34-m1',
          question: 'Which of the following are valid variable scope types in JS? (Select all that apply)',
          type: 'msq',
          options: ['Global scope', 'Function scope', 'Block scope', 'Virtual scope'],
          ans: [0, 1, 2]
        },
        {
          id: '6m-w34-m2',
          question: 'What is the output of the expression: "5" + 2?',
          type: 'output',
          options: ['7', '"52"', 'TypeError', 'undefined'],
          ans: 1
        }
      ],
      hard: [
        {
          id: '6m-w34-h1',
          question: 'What does event.preventDefault() accomplish inside an submit callback handler?',
          type: 'output',
          options: [
            'Stops the form element from reloading the browser page',
            'Prevents event bubbling to parents node',
            'Clears form inputs values',
            'Deletes event listener object'
          ],
          ans: 0
        },
        {
          id: '6m-w34-h2',
          question: 'Identify the bug: class list toggle updates variables but does not reflect styling changes in the browser.',
          type: 'debug',
          options: [
            'CSS selector name does not match the class name passed inside the JS toggle method argument',
            'Browser does not support toggle operations',
            'The toggle function requires page reloads',
            'Missing DOM variables typings validation parameters'
          ],
          ans: 0
        }
      ]
    }
  },
  {
    id: '6m-w5-6',
    week: 'Weeks 5-6',
    title: 'Advanced JavaScript & Async engines',
    points: 90,
    objectives: [
      'Grasp execution contexts scoping chains, closures, and variable hoisting',
      'Manage async execution streams using Promises and async/await templates',
      'Resolve network queries using native browser Fetch API functions'
    ],
    content: `<h3>Weeks 5-6: Advanced JavaScript</h3>
    <p>Master execution environments. Learn how engines process tasks, resolve closures, run macro/micro tasks queues, and manage requests.</p>`,
    topics: ['Closures', 'Hoisting', 'Promises API', 'Fetch integration', 'Event loop structures'],
    projects: ['GitHub Profile finder API project', 'Custom JS Promises Library'],
    resources: {
      websites: [
        { title: 'Javascript.info - Event Loop mechanics', url: 'https://javascript.info/event-loop' },
        { title: 'MDN Web Docs - Async/Await guide', url: 'https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Asynchronous' }
      ],
      videos: [
        { title: 'JS Event Loop Explained - Philip Roberts', url: 'https://www.youtube.com/embed/8aGhZQkoFbQ', dur: '26 min' },
        { title: 'Async JS Promises & Async/Await - Traversy Media', url: 'https://www.youtube.com/embed/PoRJizFvM7s', dur: '30 min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: '6m-w56-e1',
          question: 'Which method returns a Promise that resolves when all passed Promises resolve successfully?',
          type: 'mcq',
          options: ['Promise.any()', 'Promise.race()', 'Promise.all()', 'Promise.resolve()'],
          ans: 2
        },
        {
          id: '6m-w56-e2',
          question: 'Closures allow nested functions to access scopes variables of their enclosing parent functions.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: '6m-w56-m1',
          question: 'Which of the following are parts of the event loop execution stack? (Select all that apply)',
          type: 'msq',
          options: ['Call Stack', 'Microtask Queue', 'Macrotask Queue', 'Memory Heap'],
          ans: [0, 1, 2]
        },
        {
          id: '6m-w56-m2',
          question: 'What is variable hoisting?',
          type: 'mcq',
          options: [
            'Moving variable declarations to the top of their containing scopes during parsing',
            'Saving variables to local storage',
            'Exporting variables across modules',
            'Modifying variable type structures'
          ],
          ans: 0
        }
      ],
      hard: [
        {
          id: '6m-w56-h1',
          question: 'What is the output of the expression:\nconsole.log(typeof null === "object");',
          type: 'output',
          options: ['true', 'false', 'TypeError', 'undefined'],
          ans: 0
        },
        {
          id: '6m-w56-h2',
          question: 'Identify the bug: network request fails inside error states without displaying custom messages.',
          type: 'debug',
          options: [
            'fetch requests only reject Promises on network failures, not on HTTP status errors (like 404/500); check response.ok flags manual checks',
            'fetch requires custom headers config to reject errors',
            'try/catch blocks cannot resolve network calls errors',
            'Express routing modules are blocked by browsers configurations'
          ],
          ans: 0
        }
      ]
    }
  },
  {
    id: '6m-w7-8',
    week: 'Weeks 7-8',
    title: 'Object-Oriented Javascript & ES6 Modules',
    points: 90,
    objectives: [
      'Construct class hierarchies using Javascript prototypal syntax structures',
      'Implement inheritance mechanisms using class extend keywords',
      'Organize file structures using ES Modules import/export schemes'
    ],
    content: `<h3>Weeks 7-8: OOP & Modules</h3>
    <p>Write modular, scalable code. Understand standard prototype delegation trees, encapsulation states, and modular setups.</p>`,
    topics: ['Prototypal Inheritance', 'JS Classes', 'Encapsulation', 'ES Modules import/export'],
    projects: ['Library Management system core', 'Custom ES Modules utilities library'],
    resources: {
      websites: [
        { title: 'MDN Web Docs - Prototypal Inheritance', url: 'https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain' },
        { title: 'JavaScript.info - Classes', url: 'https://javascript.info/classes' }
      ],
      videos: [
        { title: 'JavaScript Classes Tutorial - Traversy Media', url: 'https://www.youtube.com/embed/2ZphE5HcQPQ', dur: '30 min' },
        { title: 'ES Modules Explained - Web Dev Simplified', url: 'https://www.youtube.com/embed/cRHQNNcYf6s', dur: '15 min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: '6m-w78-e1',
          question: 'Which keyword is used to inherit from another class in ES6?',
          type: 'mcq',
          options: ['inherits', 'extends', 'implements', 'prototype'],
          ans: 1
        },
        {
          id: '6m-w78-e2',
          question: 'Every JavaScript object has an internal prototype chain linkage reference.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: '6m-w78-m1',
          question: 'Which of the following are valid JS module export syntax operations? (Select all that apply)',
          type: 'msq',
          options: ['export default MyClass', 'export { var1, var2 }', 'module.exports = MyClass', 'export const x = 1'],
          ans: [0, 1, 3]
        },
        {
          id: '6m-w78-m2',
          question: 'What does the super() function do inside a subclass constructor?',
          type: 'mcq',
          options: [
            'Invokes the parent class constructor and sets up prototype links',
            'Saves instances state variables data',
            'Prevents method overriding',
            'Triggers strict execution modes variables check'
          ],
          ans: 0
        }
      ],
      hard: [
        {
          id: '6m-w78-h1',
          question: 'What is the output of the expression:\nclass A {}\nconsole.log(typeof A);',
          type: 'output',
          options: ['"class"', '"function"', '"object"', '"undefined"'],
          ans: 1
        },
        {
          id: '6m-w78-h2',
          question: 'Identify the bug: importing modules in browsers throws "Cannot use import statement outside a module" error.',
          type: 'debug',
          options: [
            'Script tag requires type="module" attribute configurations inside index.html templates',
            'Browser does not support ES import features',
            'Export declarations require uppercase files names',
            'Class extend structures must be declared as global parameters'
          ],
          ans: 0
        }
      ]
    }
  },
  {
    id: '6m-w9-10',
    week: 'Weeks 9-10',
    title: 'React Fundamentals & Component Architecture',
    points: 100,
    objectives: [
      'Create UI components using functional React styles',
      'Manage local component data variables using useState hooks',
      'Sync component states with side-effects using useEffect hooks'
    ],
    content: `<h3>Weeks 9-10: React Fundamentals</h3>
    <p>Understand standard declarative UI paradigms. Learn component configurations, JSX markup layouts, props arrays, states hooks, and side effects tracking.</p>`,
    topics: ['Declarative UI', 'JSX markup', 'Props & States', 'useState', 'useEffect'],
    projects: ['User Profile directory dashboard', 'Local storage Notebook application'],
    resources: {
      websites: [
        { title: 'React Documentation - Describing UI', url: 'https://react.dev/learn/describing-the-ui' },
        { title: 'React Documentation - Side Effects', url: 'https://react.dev/learn/synchronizing-with-effects' }
      ],
      videos: [
        { title: 'React JS Crash Course - Traversy Media', url: 'https://www.youtube.com/embed/w7ejDZ8SWv8', dur: '2 hr' },
        { title: 'React useEffect Hook - Net Ninja', url: 'https://www.youtube.com/embed/0ZJgIjIuY7U', dur: '20 min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: '6m-w910-e1',
          question: 'Which function is used to dynamically update states inside functional components?',
          type: 'mcq',
          options: ['setState()', 'updateState()', 'useState callback updater', 'changeState()'],
          ans: 2
        },
        {
          id: '6m-w910-e2',
          question: 'React component render actions must return a single root JSX element.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: '6m-w910-m1',
          question: 'Which of the following are valid React Hooks built-in operations? (Select all that apply)',
          type: 'msq',
          options: ['useMemo', 'useRef', 'useCallback', 'useParams'],
          ans: [0, 1, 2]
        },
        {
          id: '6m-w910-m2',
          question: 'What is the role of key props inside loop iteration components lists?',
          type: 'mcq',
          options: [
            'Provides stable identify values for items so React updates lists elements efficiently on changes',
            'Assigns local index styles parameters',
            'Sets unique API validation keys',
            'Encrypts lists data parameters'
          ],
          ans: 0
        }
      ],
      hard: [
        {
          id: '6m-w910-h1',
          question: 'What is the output/result of this component mounting?\nuseEffect(() => {\n  const id = setInterval(() => console.log("tick"), 1000);\n  return () => clearInterval(id);\n}, []);',
          type: 'output',
          options: [
            'Logs "tick" once every second, clearing the interval correctly on unmount',
            'Logs "tick" only once',
            'Creates memory leak because of missing hook parameters dependencies',
            'Throws compilation warnings'
          ],
          ans: 0
        },
        {
          id: '6m-w910-h2',
          question: 'Identify the bug: setting State values inside useEffect hook causes endless loops rendering cycles.',
          type: 'debug',
          options: [
            'The useEffect Hook is missing an empty dependency array argument [], causing it to run on every render',
            'State cannot be updated inside side effect hooks',
            'The components keys match indices values',
            'Vite does not support state updates inside hooks'
          ],
          ans: 0
        }
      ]
    }
  },
  {
    id: '6m-w11-12',
    week: 'Weeks 11-12',
    title: 'Global State Systems & TanStack Query',
    points: 100,
    objectives: [
      'Manage complex global states variables using Zustand or Redux Toolkit',
      'Perform data caching, refetching, and pagination tasks with TanStack Query',
      'Optimize component renders footprint using useMemo and useCallback hooks'
    ],
    content: `<h3>Weeks 11-12: State Systems & Query</h3>
    <p>Move beyond local states. Configure global state engines, implement cache-invalidation rules with React Query, and optimize render workflows.</p>`,
    topics: ['Redux Toolkit', 'Zustand store', 'React Query', 'useMemo', 'useCallback'],
    projects: ['Full Real-time Chat dashboard', 'E-commerce basket manager store'],
    resources: {
      websites: [
        { title: 'Zustand Store Reference', url: 'https://github.com/pmndrs/zustand' },
        { title: 'TanStack Query Documentation', url: 'https://tanstack.com/query/latest/docs/framework/react/overview' }
      ],
      videos: [
        { title: 'Redux and Modern Redux Toolkit Course - freeCodeCamp', url: 'https://www.youtube.com/watch?v=SlC8941Wwrk&pp=ygUjUmVkdXggVG9vbGtpdCBDb3Vyc2UgLSBmcmVlQ29kZUNhbXA%3D', dur: '7hr 47min 45sec' },
        { title: 'Zustand in 20 Minutes - Web Dev Simplified', url: 'https://www.youtube.com/watch?v=ULS7LHNScHc&pp=ygUqWnVzdGFuZCBpbiAyMCBNaW51dGVzIC0gV2ViIERldiBTaW1wbGlmaWVk', dur: '20 min' },
        { title: 'React Query Complete Tutorial - Thapa Technical', url: 'https://www.youtube.com/watch?v=KrruJTTwOgU&pp=ygUuUmVhY3QgUXVlcnkgQ29tcGxldGUgVHV0b3JpYWwgLSBUcmF2ZXJzeSBNZWRpYQ%3D%3D', dur: '3 hr 38 min 50 sec' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: '6m-w1112-e1',
          question: 'Which TanStack Query hook handles data query operations?',
          type: 'mcq',
          options: ['useMutation', 'useQuery', 'useFetchQuery', 'useQueryData'],
          ans: 1
        },
        {
          id: '6m-w1112-e2',
          question: 'Redux Toolkit requires Context providers wrapping the application.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: '6m-w1112-m1',
          question: 'Which hooks optimize functional renderings performance footprint? (Select all that apply)',
          type: 'msq',
          options: ['useMemo', 'useCallback', 'useContext', 'useReducer'],
          ans: [0, 1]
        },
        {
          id: '6m-w1112-m2',
          question: 'What is the benefit of using Zustand stores over standard Context API stores?',
          type: 'mcq',
          options: [
            'Simple configuration without boilerplate providers, and fine-grained rendering updates via selector subscriptions',
            'Forces strict typing rules automatically',
            'Zustand handles server side rendering styles automatically',
            'Prevents CSS layouts rendering latency'
          ],
          ans: 0
        }
      ],
      hard: [
        {
          id: '6m-w1112-h1',
          question: 'Which hook should optimize calculation results and prevent recalculation on every render cycle?',
          type: 'mcq',
          options: ['useEffect', 'useMemo', 'useCallback', 'useRef'],
          ans: 1
        },
        {
          id: '6m-w1112-h2',
          question: 'Identify the bug: React Query data fails to update after mutation execution completes.',
          type: 'debug',
          options: [
            'The mutation onSuccess callback lacks queryClient.invalidateQueries() configurations to trigger refetches',
            'Mutations cannot invalidate existing query caches parameters',
            'Cache keys are case sensitive',
            'API calls require database transactions locks'
          ],
          ans: 0
        }
      ]
    }
  },
  {
    id: '6m-w13-14',
    week: 'Weeks 13-14',
    title: 'Node.js & Express REST APIs',
    points: 110,
    objectives: [
      'Understand Node.js event-driven runtime environment mechanics',
      'Create HTTP servers and dynamic route maps with Express',
      'Write custom error handler structures and routing validation middlewares'
    ],
    content: `<h3>Weeks 13-14: Node & Express APIs</h3>
    <p>Go to the backend. Create robust web servers, design API endpoints, process incoming parameters, write validation middleware, and verify payloads structures.</p>`,
    topics: ['Node.js Runtime', 'Express servers', 'HTTP routers', 'Request parsing', 'API Middlewares'],
    projects: ['REST API Backend Workspace', 'Dynamic API Router project'],
    resources: {
      websites: [
        { title: 'Node.js Official Documentation', url: 'https://nodejs.org/docs/latest/api/' },
        { title: 'Express Middleware Guide', url: 'https://expressjs.com/en/guide/using-middleware.html' }
      ],
      videos: [
        { title: 'Node.js Course for Beginners - Traversy Media', url: 'https://www.youtube.com/embed/fBNz5xF-Kx4', dur: '1.5 hr' },
        { title: 'Express.js complete backend course - freeCodeCamp', url: 'https://www.youtube.com/embed/Oe421EPjeBE', dur: '8 hr' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: '6m-w1314-e1',
          question: 'Which command initializes npm configurations and creates package.json files?',
          type: 'mcq',
          options: ['npm create', 'npm setup', 'npm init', 'npm configure'],
          ans: 2
        },
        {
          id: '6m-w1314-e2',
          question: 'Express routing parameters are accessed using req.params objects.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: '6m-w1314-m1',
          question: 'Which of the following are valid Express routing request parameters values? (Select all that apply)',
          type: 'msq',
          options: ['req.body', 'req.query', 'req.params', 'req.session'],
          ans: [0, 1, 2, 3]
        },
        {
          id: '6m-w1314-m2',
          question: 'What is the purpose of next() function inside custom middlewares?',
          type: 'mcq',
          options: [
            'Passes execution control to the next middleware or route controller function in line',
            'Terminates request-response execution pipelines',
            'Redirects requests to index endpoints',
            'Saves variables data records to database collections'
          ],
          ans: 0
        }
      ],
      hard: [
        {
          id: '6m-w1314-h1',
          question: 'What error status represents server-side execution failures?',
          type: 'mcq',
          options: ['400 Bad Request', '401 Unauthorized', '404 Not Found', '500 Internal Server Error'],
          ans: 3
        },
        {
          id: '6m-w1314-h2',
          question: 'Identify the bug: JSON requests fail with empty bodies variables req.body undefined.',
          type: 'debug',
          options: [
            'Express server is missing app.use(express.json()) configurations before router definitions',
            'Body parsing libraries require custom environment variables setup',
            'JSON format payloads are incompatible with Express',
            'Request is missing content-type declarations headers'
          ],
          ans: 0
        }
      ]
    }
  },
  {
    id: '6m-w15-16',
    week: 'Weeks 15-16',
    title: 'API Authentication & Encryption Security',
    points: 110,
    objectives: [
      'Encrypt password credentials safely using bcryptjs algorithms',
      'Issue and verify JWT tokens containing payload metadata values',
      'Enforce security constraints like CORS rules and Helmets structures headers'
    ],
    content: `<h3>Weeks 15-16: Auth & API Security</h3>
    <p>Lock down your backend endpoints. Master secure user registration pipelines, cryptographic password verification, authentication tokens logic, and route protection rules.</p>`,
    topics: ['bcrypt hashing', 'JWT issuance', 'CORS routing configurations', 'Route guards', 'Web security guidelines'],
    projects: ['Secure JWT User Authorization Gateway', 'Rate-Limited API Workspace'],
    resources: {
      websites: [
        { title: 'OWASP Security Guidelines Reference', url: 'https://owasp.org/www-project-top-ten/' },
        { title: 'Helmet.js Security Reference', url: 'https://helmetjs.github.io' }
      ],
      videos: [
        { title: 'Node.js JWT Authentication Tutorial - Web Dev Simplified', url: 'https://www.youtube.com/embed/7Q17ubqLfaM', dur: '35 min' },
        { title: 'Web Security Crash Course - Mehul Mohan', url: 'https://www.youtube.com/watch?v=80VviDER96I&pp=ygUqV2ViIFNlY3VyaXR5IENyYXNoIENvdXJzZSAtIFRyYXZlcnN5IE1lZGlh', dur: '46 min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: '6m-w1516-e1',
          question: 'Which JWT segment holds the actual user payload data variables?',
          type: 'mcq',
          options: ['Header', 'Payload', 'Signature', 'Key'],
          ans: 1
        },
        {
          id: '6m-w1516-e2',
          question: 'Bcryptjs salt parameters increase resistance against dictionary lookups attacks.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: '6m-w1516-m1',
          question: 'Which of the following headers are configured via helmet integrations? (Select all that apply)',
          type: 'msq',
          options: ['Content-Security-Policy', 'X-Frame-Options', 'X-Content-Type-Options', 'Access-Control-Allow-Origin'],
          ans: [0, 1, 2]
        },
        {
          id: '6m-w1516-m2',
          question: 'Why should JWT keys never be saved inside public client applications files?',
          type: 'mcq',
          options: [
            'Any client can extract key variables, letting them falsify signatures and compromise authentication logic',
            'Token files formats require compression',
            'JWT algorithms fail to compile in browsers environments',
            'Express server triggers internal crash errors'
          ],
          ans: 0
        }
      ],
      hard: [
        {
          id: '6m-w1516-h1',
          question: 'What encryption property represents bcrypt hashing operations configuration strength parameter?',
          type: 'mcq',
          options: ['Key Size', 'Salt Rounds', 'Block length', 'Vector length'],
          ans: 1
        },
        {
          id: '6m-w1516-h2',
          question: 'Identify the bug: JWT signatures verify fails on production routes despite using correct passwords strings.',
          type: 'debug',
          options: [
            'The production environment variables (JWT_SECRET) differ from local development setups or have not been injected properly',
            'Tokens expire too quickly',
            'Bcrypt algorithm has locked the authorization signatures files',
            'CORS middleware prevents JWT decryption processing'
          ],
          ans: 0
        }
      ]
    }
  },
  {
    id: '6m-w17-18',
    week: 'Weeks 17-18',
    title: 'Databases & Mongoose ORM integrations',
    points: 120,
    objectives: [
      'Compare Relational (SQL) structures models with Document NoSQL architectures',
      'Establish models constraints and validators utilizing Mongoose ORM',
      'Execute query operators to fetch and parse documents arrays records'
    ],
    content: `<h3>Weeks 17-18: Databases & Mongoose</h3>
    <p>Understand storage models. Set up local or Atlas database clusters, define model schemas, enforce document verification checks, and parse relational models configurations.</p>`,
    topics: ['NoSQL vs SQL', 'MongoDB Collections', 'Mongoose Schemas', 'ORM validations', 'Database Query mechanics'],
    projects: ['User Database Directory with Mongoose', 'Relational Schemas Project'],
    resources: {
      websites: [
        { title: 'MongoDB Atlas Cloud Reference', url: 'https://www.mongodb.com/docs/atlas/' },
        { title: 'Mongoose Validation Reference', url: 'https://mongoosejs.com/docs/validation.html' }
      ],
      videos: [
        { title: 'MongoDB Crash Course - Web Dev Simplified', url: 'https://www.youtube.com/embed/ofme2o29ngU', dur: '30 min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: '6m-w1718-e1',
          question: 'Which NoSQL data structure is equivalent to a SQL database Table?',
          type: 'mcq',
          options: ['Document', 'Collection', 'Record', 'Field'],
          ans: 1
        },
        {
          id: '6m-w1718-e2',
          question: 'Mongoose schemas let you configure data defaults values directly on client instances.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: '6m-w1718-m1',
          question: 'Which of the following represent key differences between SQL and NoSQL engines? (Select all that apply)',
          type: 'msq',
          options: [
            'SQL databases use structured tables while NoSQL can use documents or graphs',
            'SQL relies on rigid schemas while NoSQL provides dynamic formats flexibility',
            'NoSQL supports transactions while SQL does not support them at all',
            'SQL engines scale vertically while NoSQL scales horizontally efficiently'
          ],
          ans: [0, 1, 3]
        },
        {
          id: '6m-w1718-m2',
          question: 'What does Model.populate() achieve in Mongoose CRUD routines?',
          type: 'mcq',
          options: [
            'Replaces specified reference IDs inside documents with actual object values from other collections',
            'Encrypts schema model validation keys',
            'Executes batch indexes adjustments',
            'Connects Express middleware routes automatically'
          ],
          ans: 0
        }
      ],
      hard: [
        {
          id: '6m-w1718-h1',
          question: 'Which validation option ensures that database collections entries values must be unique?',
          type: 'mcq',
          options: ['unique: true', 'required: true', 'validateUnique: true', 'primaryKey: true'],
          ans: 0
        },
        {
          id: '6m-w1718-h2',
          question: 'Identify the bug: Mongoose save methods fail to return errors when required parameters values are passed as empty spaces strings.',
          type: 'debug',
          options: [
            'Standard validation strings do not reject empty spaces unless custom regex validation functions are registered in models',
            'Mongoose does not validate input strings characters',
            'Database collections ignore validation flags during save procedures',
            'MongoDB memory servers block custom schemas checks'
          ],
          ans: 0
        }
      ]
    }
  },
  {
    id: '6m-w19-20',
    week: 'Weeks 19-20',
    title: 'Relational Databases (SQL) & Scaling',
    points: 120,
    objectives: [
      'Write SQL queries SELECT, JOIN and WHERE to retrieve relational records',
      'Optimize database queries latency by establishing indexes tables columns',
      'Set up database transaction pools to manage concurrent operations safely'
    ],
    content: `<h3>Weeks 19-20: SQL & Database Scaling</h3>
    <p>Understand relational models. Learn SQL SELECT statements, set up PostgreSQL databases, configure connection pools, write indexing columns, and study scaling principles.</p>`,
    topics: ['SQL Queries', 'PostgreSQL tables', 'JOIN operations', 'Database Indexes', 'Scaling architectures'],
    projects: ['PostgreSQL API with Prisma ORM', 'Relational Schema Design workspace'],
    resources: {
      websites: [
        { title: 'PostgreSQL Manuals Reference', url: 'https://www.postgresql.org/docs/' },
        { title: 'Prisma ORM Getting Started', url: 'https://www.prisma.io/docs/getting-started' }
      ],
      videos: [
        { title: 'SQL & Database Queries Full Course - freeCodeCamp', url: 'https://www.youtube.com/embed/HXV3zeQKqGY', dur: '4 hr' },
        { title: 'PostgreSQL Complete Crash Course - Traversy Media', url: 'https://www.youtube.com/embed/qw--VYLpxG4', dur: '1.5 hr' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: '6m-w1920-e1',
          question: 'Which SQL keyword combines rows from two or more tables based on a related column?',
          type: 'mcq',
          options: ['COMBINE', 'JOIN', 'UNION', 'MERGE'],
          ans: 1
        },
        {
          id: '6m-w1920-e2',
          question: 'Database indexing improves query search performance but can slow down write operations.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: '6m-w1920-m1',
          question: 'Which of the following clauses are used to filter or group data inside SELECT scripts? (Select all that apply)',
          type: 'msq',
          options: ['WHERE', 'GROUP BY', 'HAVING', 'ORDER BY'],
          ans: [0, 1, 2, 3]
        },
        {
          id: '6m-w1920-m2',
          question: 'What is database sharding?',
          type: 'mcq',
          options: [
            'Horizontal partition scheme that splits database records across multiple database instances',
            'Saving database backups copies',
            'Converting document schemas to SQL formats',
            'Encrypting database files folders'
          ],
          ans: 0
        }
      ],
      hard: [
        {
          id: '6m-w1920-h1',
          question: 'What does isolation represent inside standard database ACID transactional models?',
          type: 'mcq',
          options: [
            'Ensures that concurrent execution of transactions leaves database in same state as if run sequentially',
            'Restricting database connections to localhost ports',
            'Encrypting transactional files logs',
            'Preventing databases records deletion'
          ],
          ans: 0
        },
        {
          id: '6m-w1920-h2',
          question: 'Identify the bug: SQL queries fail with "relation does not exist" errors.',
          type: 'debug',
          options: [
            'The target table has not been created, or table schema names are capitalized and need quotes mapping queries',
            'Database engine does not support relational JOIN calls',
            'Prisma ORM is incompatible with databases configurations',
            'Connection pool limits are exceeded'
          ],
          ans: 0
        }
      ]
    }
  },
  {
    id: '6m-w21-22',
    week: 'Weeks 21-22',
    title: 'DevOps: Containerization & CI/CD',
    points: 130,
    objectives: [
      'Containerize applications using standard Dockerfile and Docker Compose configurations',
      'Create automated integration routines pipelines utilizing GitHub Actions',
      'Automate lint testing validation execution on code pushes'
    ],
    content: `<h3>Weeks 21-22: Containerization & CI/CD</h3>
    <p>Automate deployment mechanics. Define Dockerfile structures, compile compose definitions, coordinate GitHub workflows pipelines, and check code builds errors automatically.</p>`,
    topics: ['Dockerfiles', 'Docker Compose', 'CI/CD Pipelines', 'GitHub Actions', 'Code quality testing'],
    projects: ['Containerized Fullstack App with Docker Compose', 'GitHub Actions CI pipeline Workspace'],
    resources: {
      websites: [
        { title: 'Docker Official Documentation Guides', url: 'https://docs.docker.com/get-started/' },
        { title: 'GitHub Actions Workflows Guides', url: 'https://docs.github.com/en/actions/writing-workflows' }
      ],
      videos: [
        { title: 'Docker Course for Beginners - TechWorld with Nana', url: 'https://www.youtube.com/embed/3c-iBn73dDE', dur: '3 hr' },
        { title: 'CI/CD Pipeline with GitHub Actions - freeCodeCamp', url: 'https://www.youtube.com/embed/R8_veQiYBjI', dur: '2 hr' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: '6m-w2122-e1',
          question: 'Which Docker directive sets the base container image inside a Dockerfile?',
          type: 'mcq',
          options: ['FROM', 'BASE', 'RUN', 'START'],
          ans: 0
        },
        {
          id: '6m-w2122-e2',
          question: 'GitHub Actions workflow configurations files are written using JSON format syntax.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 1
        }
      ],
      medium: [
        {
          id: '6m-w2122-m1',
          question: 'Which of the following are benefits of using Docker containers? (Select all that apply)',
          type: 'msq',
          options: [
            'Guarantees consistent runtime environment behavior across development and production',
            'Isolates project library dependencies files',
            'Simplifies multi-service workspace setups via Docker Compose configs',
            'Dramatically reduces codebase files lines counts'
          ],
          ans: [0, 1, 2]
        },
        {
          id: '6m-w2122-m2',
          question: 'What is the role of Docker Compose?',
          type: 'mcq',
          options: [
            'To run and orchestrate multi-container Docker applications using a single YAML configuration file',
            'To write integration test suites',
            'To host git repositories online',
            'To bundle frontend assets bundles'
          ],
          ans: 0
        }
      ],
      hard: [
        {
          id: '6m-w2122-h1',
          question: 'Which Dockerfile directive copies local workspace directories contents into the container directory?',
          type: 'mcq',
          options: ['COPY', 'RUN', 'WORKDIR', 'ENV'],
          ans: 0
        },
        {
          id: '6m-w2122-h2',
          question: 'Identify the bug: GitHub Actions workflows terminate with "permission denied" errors when running shell scripts files.',
          type: 'debug',
          options: [
            'Scripts files are missing execution permissions flags; run git update-index --chmod=+x scripts/filepath commands',
            'GitHub runners cannot execute custom shell operations',
            'The scripts must be rewritten using node.js syntaxes',
            'Environment variables have blocked files access'
          ],
          ans: 0
        }
      ]
    }
  },
  {
    id: '6m-w23-24',
    week: 'Weeks 23-24',
    title: 'Cloud Deployment, CDNs & Capstone Project',
    points: 150,
    objectives: [
      'Deploy fullstack projects live to Render, Vercel and AWS clusters',
      'Optimize delivery speed of static resources utilizing Content Delivery Networks (CDNs)',
      'Construct a complete production-grade SaaS Capstone Application'
    ],
    content: `<h3>Weeks 23-24: Production Deployment & Capstone</h3>
    <p>Complete your professional roadmap. Package frontend files, prepare backend services, deploy assets to global CDNs, configure domain links, and build your capstone applications.</p>`,
    topics: ['Render hosting', 'Vercel static deploy', 'Cloud assets CDNs', 'Server logs monitoring', 'Production SaaS design'],
    projects: ['Production-ready Fullstack MERN SaaS Capstone Application'],
    resources: {
      websites: [
        { title: 'Vercel Deployment Reference', url: 'https://vercel.com/docs/deployments/overview' },
        { title: 'Cloudflare CDN Reference Guides', url: 'https://developers.cloudflare.com/fundamentals/' }
      ],
      videos: [
        { title: 'How to deploy your website to production in 30 minutes - Harkirat Singh', url: 'https://www.youtube.com/watch?v=gViEtIJ1DCw&pp=ygUqRGVwbG95aW5nIEZ1bGxzdGFjayBXZWIgQXBwcyB0byBQcm9kdWN0aW9u', dur: '3 hr' },
        { title: 'The Complete Web Development Roadmap - Programming with Mosh', url: 'https://www.youtube.com/watch?v=GxmfcnU3feo&pp=ygUqV2ViIEluZnJhc3RydWN0dXJlIC0gUHJvZ3JhbW1pbmcgd2l0aCBNb3No', dur: '15min 15sec' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: '6m-w2324-e1',
          question: 'What does CDN stand for?',
          type: 'mcq',
          options: [
            'Content Delivery Network',
            'Computer Data Node',
            'Cloud Deployment Network',
            'Connection Data Node'
          ],
          ans: 0
        },
        {
          id: '6m-w2324-e2',
          question: 'Vercel is primarily designed for deploying server-side relational database clusters.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 1
        }
      ],
      medium: [
        {
          id: '6m-w2324-m1',
          question: 'Which of the following represent cloud monitoring tools? (Select all that apply)',
          type: 'msq',
          options: ['Datadog', 'LogRocket', 'Prometheus', 'Tailwind CSS'],
          ans: [0, 1, 2]
        },
        {
          id: '6m-w2324-m2',
          question: 'What is the benefit of using a CDN?',
          type: 'mcq',
          options: [
            'Serves assets from edge servers close to the user location, lowering request latency',
            'Secures database queries requests',
            'Generates JWT secret verification keys',
            'Handles server routers middleware parsing'
          ],
          ans: 0
        }
      ],
      hard: [
        {
          id: '6m-w2324-h1',
          question: 'Which mechanism checks server health status automatically to verify if container instances are alive?',
          type: 'mcq',
          options: ['Health Check API Route', 'CORS request parser', 'Server load balancer check', 'JWT token expiration check'],
          ans: 0
        },
        {
          id: '6m-w2324-h2',
          question: 'Identify the bug: frontend builds fail on Vercel deployment with "module not found" errors due to capitalization.',
          type: 'debug',
          options: [
            'Import paths files capitalizations must match the exact file system case sensitivity rules (e.g. Components vs components)',
            'Vercel does not support components imports structures',
            'Deployments require local node_modules folders upload',
            'CORS parameters block static files builds compilation'
          ],
          ans: 0
        }
      ]
    }
  }
];

const fullStackRoadmap = {
  id: 'full-stack',
  title: 'Full Stack Development',
  description: 'Complete web developer roadmaps — HTML, CSS, JavaScript, React, Node.js, databases, scaling, and production DevOps.',
  difficulty: 'Intermediate',
  icon: '🖥️',
  color: '#ff6b35',
  domain: 'Web Development',
  category: 'Technical',
  enrolled: 2876,
  targetUsers: ['Global BK', 'Campus'],
  durations: {
    '3 months': {
      label: '3 Months',
      tagline: 'Accelerated Developer Track',
      weeks: 12,
      totalPoints: weeks3Month.reduce((a, w) => a + w.points, 0),
      sections: weeks3Month
    },
    '6 months': {
      label: '6 Months',
      tagline: 'Deep Dive Professional Track',
      weeks: 24,
      totalPoints: weeks6Month.reduce((a, w) => a + w.points, 0),
      sections: weeks6Month
    }
  }
};

export default fullStackRoadmap;
