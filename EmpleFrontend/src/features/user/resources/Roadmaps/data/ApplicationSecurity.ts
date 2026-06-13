/**
 * Application Security Roadmap
 * Includes both '6months' and '6 months' keys for UI compatibility.
 */

const mainContent = [
  {
    id: 1,
    week: 'Week 1-2',
    title: 'Web Fundamentals for Security',
    points: 80,
    objectives: [
      'Understand HTTP/HTTPS deeply',
      'Learn cookies, sessions, and headers',
      'Study Same-Origin Policy and CORS'
    ],
    content: `<h3>Web Security Foundations</h3><p>Before attacking or defending web apps, you need to deeply understand how the web works.</p><h4>Key HTTP Security Headers:</h4><ul><li><strong>Content-Security-Policy:</strong> Prevents XSS by controlling resource loading</li><li><strong>X-Frame-Options:</strong> Prevents clickjacking</li><li><strong>HSTS:</strong> Forces HTTPS</li><li><strong>X-Content-Type-Options:</strong> Prevents MIME sniffing</li></ul><h4>Cookies:</h4><ul><li>HttpOnly — prevents JavaScript access</li><li>Secure — HTTPS only</li><li>SameSite — controls cross-origin sending</li></ul>`,
    resources: {
      websites: [
        { title: 'PortSwigger Web Security Academy — HTTP', url: 'https://portswigger.net/web-security/getting-started' },
        { title: 'MDN HTTP Headers Reference', url: 'https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers' }
      ],
      videos: [
        { title: 'HTTP Crash Course — Traversy Media', url: 'https://www.youtube.com/embed/iYM2zFP3Zn0', dur: '38 min' },
        { title: 'CORS Explained — Fireship', url: 'https://www.youtube.com/embed/4KHiSt0oLJ0', dur: '10 min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'appsec-w1-e1',
          question: 'Which cookie flag prevents JavaScript from accessing the cookie?',
          type: 'mcq',
          options: ['Secure', 'SameSite', 'HttpOnly', 'Private'],
          ans: 2
        },
        {
          id: 'appsec-w1-e2',
          question: 'The Same-Origin Policy (SOP) restricts scripts on one page from accessing sensitive data on another page of a different origin.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: 'appsec-w1-m1',
          question: 'Which HTTP security header is primarily used to prevent Cross-Site Scripting (XSS) by controlling where scripts can load from?',
          type: 'mcq',
          options: ['X-Frame-Options', 'Content-Security-Policy (CSP)', 'Strict-Transport-Security (HSTS)', 'X-Content-Type-Options'],
          ans: 1
        },
        {
          id: 'appsec-w1-m2',
          question: 'What does CORS stand for?',
          type: 'mcq',
          options: ['Cross-Origin Resource Sharing', 'Computer Oriented Security Standard', 'Cross-Origin Reference System', 'Common Object Request Service'],
          ans: 0
        }
      ],
      hard: [
        {
          id: 'appsec-w1-h1',
          question: 'If a cookie is configured with SameSite=Strict, how does the browser handle it for cross-site link clicks?',
          type: 'mcq',
          options: [
            'It will send the cookie only on POST requests',
            'It will not send the cookie on any cross-site request (e.g. clicking a link from an external site)',
            'It will send the cookie normally',
            'It will encrypt the cookie'
          ],
          ans: 1
        },
        {
          id: 'appsec-w1-h2',
          question: 'Which header prevents a page from being embedded inside an iframe on another site to protect against clickjacking? (Select all that apply)',
          type: 'msq',
          options: [
            'X-Frame-Options: DENY',
            'Content-Security-Policy: frame-ancestors \'none\'',
            'X-Content-Type-Options: nosniff',
            'Access-Control-Allow-Origin: *'
          ],
          ans: [0, 1]
        }
      ]
    }
  },
  {
    id: 2,
    week: 'Week 3-4',
    title: 'OWASP Top 10 — Part 1',
    points: 80,
    objectives: [
      'Understand Broken Access Control',
      'Learn Cryptographic Failures',
      'Study Injection vulnerabilities'
    ],
    content: `<h3>OWASP Top 10 (2021) — First Half</h3><p>The OWASP Top 10 is the standard reference for web application vulnerabilities. Every AppSec professional must know these cold.</p><h4>A01 — Broken Access Control:</h4><p>Users can act outside intended permissions. Examples: IDOR (accessing other users\' data by changing IDs), privilege escalation, missing function-level access control.</p><h4>A02 — Cryptographic Failures:</h4><p>Sensitive data exposed due to weak/missing encryption. Using MD5 for passwords, HTTP instead of HTTPS, weak TLS configs.</p><h4>A03 — Injection:</h4><p>SQL, NoSQL, OS, LDAP injection. Untrusted data sent to an interpreter as part of a command or query.</p>`,
    resources: {
      websites: [
        { title: 'OWASP Top 10 Official', url: 'https://owasp.org/Top10/' },
        { title: 'PortSwigger Access Control Labs', url: 'https://portswigger.net/web-security/access-control' }
      ],
      videos: [
        { title: 'OWASP Top 10 Explained', url: 'https://www.youtube.com/watch?v=HE244moNuXE&list=PLa2xctTiNSCiUcETvRT7lbYuKTpgKDchD', dur: 'Playlist' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'appsec-w2-e1',
          question: 'Which OWASP 2021 category ranked #1?',
          type: 'mcq',
          options: ['Injection', 'Broken Access Control', 'Cryptographic Failures', 'SSRF'],
          ans: 1
        },
        {
          id: 'appsec-w2-e2',
          question: 'MD5 is considered a secure hashing algorithm for passwords in modern applications.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 1
        }
      ],
      medium: [
        {
          id: 'appsec-w2-m1',
          question: 'What is Insecure Direct Object Reference (IDOR)?',
          type: 'mcq',
          options: [
            'An SQL injection attack',
            'A vulnerability where a user can access another user\'s resources simply by changing the ID in the request',
            'An error in the styling layer',
            'A network port scanning method'
          ],
          ans: 1
        },
        {
          id: 'appsec-w2-m2',
          question: 'Which of the following are examples of Cryptographic Failures? (Select all that apply)',
          type: 'msq',
          options: [
            'Storing passwords in plaintext',
            'Using HTTP instead of HTTPS',
            'Missing parameterized SQL queries',
            'Using weak key derivation algorithms (like unsalted SHA-1)'
          ],
          ans: [0, 1, 3]
        }
      ],
      hard: [
        {
          id: 'appsec-w2-h1',
          question: 'How does vertical privilege escalation differ from horizontal privilege escalation?',
          type: 'mcq',
          options: [
            'Vertical escalation is gaining higher access privileges (e.g. user to admin); horizontal escalation is accessing resources of another user with similar privileges',
            'Vertical is web-based; horizontal is network-based',
            'Vertical is faster than horizontal',
            'There is no difference'
          ],
          ans: 0
        },
        {
          id: 'appsec-w2-h2',
          question: 'Which OWASP category does command injection (executing OS commands via web parameters) fall under?',
          type: 'mcq',
          options: ['Broken Access Control', 'Cryptographic Failures', 'Injection', 'Security Misconfiguration'],
          ans: 2
        }
      ]
    }
  },
  {
    id: 3,
    week: 'Week 5-6',
    title: 'OWASP Top 10 — Part 2 + XSS Deep Dive',
    points: 80,
    objectives: [
      'Understand XSS (Stored, Reflected, DOM)',
      'Learn CSRF attacks and defenses',
      'Study Security Misconfiguration'
    ],
    content: `<h3>XSS & CSRF</h3><h4>Cross-Site Scripting (XSS):</h4><ul><li><strong>Stored XSS:</strong> Payload stored on server, served to all users</li><li><strong>Reflected XSS:</strong> Payload in URL, reflected back</li><li><strong>DOM XSS:</strong> Payload executed in browser DOM</li></ul><h4>Prevention:</h4><ul><li>Output encoding (HTML, JS, CSS, URL context)</li><li>Content Security Policy headers</li><li>Use safe DOM APIs (textContent not innerHTML)</li></ul><h4>CSRF:</h4><p>Forged requests from authenticated users. Prevent with CSRF tokens and SameSite cookies.</p>`,
    resources: {
      websites: [
        { title: 'PortSwigger XSS Labs', url: 'https://portswigger.net/web-security/cross-site-scripting' },
        { title: 'OWASP XSS Prevention Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html' }
      ],
      videos: [
        { title: 'XSS Explained — LiveOverflow', url: 'https://www.youtube.com/embed/EoaDgUgS6QA', dur: '20 min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'appsec-w3-e1',
          question: 'Which type of XSS stores the malicious payload on the target server (e.g. in a database)?',
          type: 'mcq',
          options: ['Reflected', 'DOM-based', 'Stored', 'Blind'],
          ans: 2
        },
        {
          id: 'appsec-w3-e2',
          question: 'CSRF tokens should be cryptographically secure and unique per session.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: 'appsec-w3-m1',
          question: 'What is the primary difference between Reflected XSS and Stored XSS?',
          type: 'mcq',
          options: [
            'Reflected XSS requires the payload to be part of the request (e.g. query parameter) and reflected back immediately; Stored XSS stores the payload permanently on the server',
            'Reflected XSS is only in databases; Stored XSS is in the browser',
            'Reflected XSS only targets administrators',
            'There is no difference'
          ],
          ans: 0
        },
        {
          id: 'appsec-w3-m2',
          question: 'Which of the following are valid defenses against XSS? (Select all that apply)',
          type: 'msq',
          options: [
            'Context-aware output encoding',
            'Content Security Policy (CSP)',
            'Regulating user passwords',
            'Using textContent instead of innerHTML'
          ],
          ans: [0, 1, 3]
        }
      ],
      hard: [
        {
          id: 'appsec-w3-h1',
          question: 'How does DOM-based XSS differ from Reflected or Stored XSS?',
          type: 'mcq',
          options: [
            'The vulnerability is entirely in the client-side JavaScript processing, where input is unsafely written to a sink in the DOM',
            'It is executed on the server side',
            'It cannot be prevented by CSP',
            'It only works on Chrome browsers'
          ],
          ans: 0
        },
        {
          id: 'appsec-w3-h2',
          question: 'What is the primary mechanism of a CSRF (Cross-Site Request Forgery) attack?',
          type: 'mcq',
          options: [
            'Stealing session cookies using JavaScript',
            'Tricking the user\'s browser into sending an authorized request to a target application where they are already authenticated',
            'Injecting scripts into database fields',
            'Fuzzing server API endpoints'
          ],
          ans: 1
        }
      ]
    }
  },
  {
    id: 4,
    week: 'Week 7-8',
    title: 'SQL Injection & Input Validation',
    points: 80,
    objectives: [
      'Perform SQL injection attacks in labs',
      'Implement parameterized queries',
      'Apply input validation and output encoding'
    ],
    content: `<h3>SQL Injection</h3><p>SQL injection is one of the oldest and most dangerous web vulnerabilities. It allows attackers to manipulate database queries.</p><h4>Types:</h4><ul><li>Classic/Error-based, Union-based, Blind (Boolean/Time-based), Out-of-band</li></ul><h4>Prevention:</h4><ul><li><strong>#1: Parameterized queries</strong> — never concatenate SQL</li><li>Stored procedures</li><li>ORM frameworks</li><li>Least privilege database accounts</li><li>WAF as defense in depth</li></ul>`,
    resources: {
      websites: [
        { title: 'PortSwigger SQL Injection Labs', url: 'https://portswigger.net/web-security/sql-injection' },
        { title: 'OWASP SQL Injection Prevention', url: 'https://cheatsheetseries.owasp.org/cheatsheets/SQL_Injection_Prevention_Cheat_Sheet.html' },
        { title: 'SQLMap — Automated SQL Injection Tool', url: 'https://sqlmap.org' }
      ],
      videos: [
        { title: 'SQL Injection — OWASP', url: 'https://www.youtube.com/embed/ciNHn38EyRc', dur: '30 min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'appsec-w4-e1',
          question: 'What is the primary defense against SQL injection?',
          type: 'mcq',
          options: ['Input length limits', 'Parameterized queries', 'Error handling', 'Rate limiting'],
          ans: 1
        },
        {
          id: 'appsec-w4-e2',
          question: 'SQLMap is a tool used to automatically scan and exploit SQL injection vulnerabilities.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: 'appsec-w4-m1',
          question: 'Which type of SQL injection relies on observing the time it takes for the database to respond to conditional queries?',
          type: 'mcq',
          options: ['Error-based SQLi', 'Union-based SQLi', 'Time-based Blind SQLi', 'Out-of-band SQLi'],
          ans: 2
        },
        {
          id: 'appsec-w4-m2',
          question: 'Which of the following are safe practices for database security? (Select all that apply)',
          type: 'msq',
          options: [
            'Using Object-Relational Mappers (ORMs) correctly',
            'Enforcing least privilege database accounts',
            'Concatenating input strings directly into SQL statements',
            'Using prepared statements (parameterization)'
          ],
          ans: [0, 1, 3]
        }
      ],
      hard: [
        {
          id: 'appsec-w4-h1',
          question: 'Why is input sanitization (like stripping single quotes) not a robust primary defense against SQLi?',
          type: 'mcq',
          options: [
            'Attackers can use alternative encodings (like hex or URL encoding) to bypass filters',
            'It slows down the database performance too much',
            'It is forbidden by the W3C standards',
            'It only works on SQL Server and not MySQL'
          ],
          ans: 0
        },
        {
          id: 'appsec-w4-h2',
          question: 'In a Union-based SQL injection, what must match between the original query and the injected query?',
          type: 'mcq',
          options: [
            'The number and data types of the columns selected',
            'The table names',
            'The database usernames',
            'The database port numbers'
          ],
          ans: 0
        }
      ]
    }
  },
  {
    id: 5,
    week: 'Week 9-10',
    title: 'Authentication & Authorization Security',
    points: 80,
    objectives: [
      'Identify broken authentication vulnerabilities',
      'Implement secure session management',
      'Understand OAuth 2.0 and JWT security'
    ],
    content: `<h3>AuthN & AuthZ Security</h3><h4>Common Auth Vulnerabilities:</h4><ul><li>Weak password policies, no account lockout</li><li>Insecure "forgot password" flows</li><li>Predictable session tokens</li><li>JWT algorithm confusion attacks (alg:none)</li></ul><h4>Secure Implementation:</h4><ul><li>bcrypt/Argon2 for password hashing</li><li>TOTP-based MFA</li><li>Secure random session token generation</li><li>Proper JWT validation (verify signature, check expiry)</li></ul>`,
    resources: {
      websites: [
        { title: 'PortSwigger Authentication Labs', url: 'https://portswigger.net/web-security/authentication' },
        { title: 'OWASP Authentication Cheat Sheet', url: 'https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html' }
      ],
      videos: [
        { title: 'JWT Security Best Practices — Auth0', url: 'https://www.youtube.com/embed/tWVWeAqZ0WU', dur: '15 min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'appsec-w5-e1',
          question: 'Which password hashing algorithm is recommended for new applications?',
          type: 'mcq',
          options: ['MD5', 'SHA-256', 'bcrypt or Argon2', 'SHA-1'],
          ans: 2
        },
        {
          id: 'appsec-w5-e2',
          question: 'Authentication verifies *who* you are, while Authorization verifies *what* you can do.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: 'appsec-w5-m1',
          question: 'What is a significant vulnerability vector when parsing JSON Web Tokens (JWT)?',
          type: 'mcq',
          options: [
            'JWTs are written in JSON format',
            'Accepting the `{"alg": "none"}` header parameter, allowing users to bypass signature checks',
            'JWT payloads cannot be encrypted',
            'JWTs are too short'
          ],
          ans: 1
        },
        {
          id: 'appsec-w5-m2',
          question: 'Which of the following are secure session management practices? (Select all that apply)',
          type: 'msq',
          options: [
            'Regenerating session IDs after a user logs in successfully',
            'Setting the HttpOnly and Secure flags on session cookies',
            'Using long, cryptographically random session IDs',
            'Storing session IDs directly in the URL query string'
          ],
          ans: [0, 1, 2]
        }
      ],
      hard: [
        {
          id: 'appsec-w5-h1',
          question: 'What is a session fixation vulnerability?',
          type: 'mcq',
          options: [
            'An attacker forces a known session identifier onto a victim and accesses their account after they log in',
            'The database session pools are exhausted, causing a denial of service',
            'Cookies are set to expire too quickly',
            'The server fails to invalidate cookies after 30 days'
          ],
          ans: 0
        },
        {
          id: 'appsec-w5-h2',
          question: 'When using JWTs, what is the purpose of the signature part of the token?',
          type: 'mcq',
          options: [
            'To encrypt the payload content',
            'To verify that the sender of the JWT is who it says it is, and to ensure that the message was not changed along the way',
            'To speed up transmission speed',
            'To store database connection strings'
          ],
          ans: 1
        }
      ]
    }
  },
  {
    id: 6,
    week: 'Week 11-12',
    title: 'API Security & OWASP API Top 10',
    points: 80,
    objectives: [
      'Understand BOLA/IDOR vulnerabilities',
      'Test REST and GraphQL APIs',
      'Implement API security best practices'
    ],
    content: `<h3>API Security</h3><p>APIs are the attack surface of modern applications. The OWASP API Security Top 10 is the reference.</p><h4>Most Critical: BOLA (API1)</h4><p>Broken Object Level Authorization — changing an ID in a request to access another user\'s data. Most common and impactful API vulnerability.</p><h4>API Security Checklist:</h4><ul><li>Always authenticate and authorize</li><li>Rate limiting on all endpoints</li><li>Return only needed data (avoid mass exposure)</li><li>Validate and sanitize all inputs</li><li>Use HTTPS everywhere</li></ul>`,
    resources: {
      websites: [
        { title: 'OWASP API Security Top 10', url: 'https://owasp.org/www-project-api-security/' },
        { title: 'PortSwigger API Testing Labs', url: 'https://portswigger.net/web-security/api-testing' }
      ],
      videos: [
        { title: 'Security Testing — QAFox', url: 'https://www.youtube.com/embed/videoseries?list=PLsjUcU8CQXGG24TgYSLLS1wtp-gJxpNxz', dur: 'Playlist' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'appsec-w6-e1',
          question: 'What does BOLA stand for in API security?',
          type: 'mcq',
          options: ['Broken Object Level Authorization', 'Backend Object Layer Attack', 'Blind Object Logic Analysis', 'Broken OAuth Link Attack'],
          ans: 0
        },
        {
          id: 'appsec-w6-e2',
          question: 'APIs should return raw database objects and rely on the frontend user interface to hide sensitive fields.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 1
        }
      ],
      medium: [
        {
          id: 'appsec-w6-m1',
          question: 'What is mass assignment (Broken Object Member Level Authorization) in APIs?',
          type: 'mcq',
          options: [
            'Sending emails to thousands of users simultaneously',
            'An attacker modifies internal model parameters (e.g. `isAdmin: true`) because the API accepts and binds input values directly without filtering',
            'A Denial-of-Service attack on databases',
            'Uploading multiple large files'
          ],
          ans: 1
        },
        {
          id: 'appsec-w6-m2',
          question: 'Which of the following are API security best practices? (Select all that apply)',
          type: 'msq',
          options: [
            'Enforcing authentication and authorization checks on every endpoint',
            'Implementing rate limiting to prevent abuse',
            'Returning only necessary data in API responses',
            'Disabling HTTPS to increase throughput speed'
          ],
          ans: [0, 1, 2]
        }
      ],
      hard: [
        {
          id: 'appsec-w6-h1',
          question: 'What is the difference between Broken Object Level Authorization (BOLA) and Broken Function Level Authorization (BFLA)?',
          type: 'mcq',
          options: [
            'BOLA restricts access to data resources (objects); BFLA restricts access to administrative commands or functions',
            'BOLA is for SQL; BFLA is for NoSQL',
            'BFLA is only on REST; BOLA is only on GraphQL',
            'There is no difference'
          ],
          ans: 0
        },
        {
          id: 'appsec-w6-h2',
          question: 'Which mechanism prevents Denial-of-Service attacks caused by complex nested queries in GraphQL APIs?',
          type: 'mcq',
          options: [
            'Query depth limiting and complexity analysis',
            'Enforcing prepared statements',
            'Cross-Origin Resource Sharing (CORS)',
            'Content Security Policy'
          ],
          ans: 0
        }
      ]
    }
  },
  {
    id: 7,
    week: 'Week 13-15',
    title: 'Secure Code Review & SAST',
    points: 100,
    objectives: [
      'Conduct manual code reviews for vulnerabilities',
      'Set up and use Semgrep for SAST',
      'Review Python, JavaScript, and Java code'
    ],
    content: `<h3>Secure Code Review</h3><p>Reviewing source code for security vulnerabilities before deployment — the most cost-effective way to prevent vulnerabilities.</p><h4>What to Look For:</h4><ul><li>Hardcoded secrets and API keys</li><li>Insecure deserialization</li><li>Path traversal vulnerabilities</li><li>Dangerous function calls (eval, exec, system)</li><li>SQL concatenation</li><li>Missing authorization checks</li></ul><h4>Tools:</h4><ul><li><strong>Semgrep:</strong> Fast, customizable SAST</li><li><strong>SonarQube:</strong> Comprehensive code quality + security</li><li><strong>Bandit:</strong> Python-specific security scanner</li><li><strong>ESLint security plugin:</strong> JavaScript security linting</li></ul>`,
    resources: {
      websites: [
        { title: 'OWASP Code Review Guide', url: 'https://owasp.org/www-project-code-review-guide/' },
        { title: 'Semgrep Getting Started', url: 'https://semgrep.dev/docs/getting-started/' },
        { title: 'Semgrep Playground', url: 'https://semgrep.dev/playground' }
      ],
      videos: [
        { title: 'Secure Code Review — Noisy Hacker', url: 'https://www.youtube.com/watch?v=VjsTSro6dIo&list=PLanZMaPa4zzyXQnSvqZBjTUGPN-R51WTG&pp=0gcJCWUDOCosWNin', dur: '10 min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'appsec-w7-e1',
          question: 'What does SAST stand for?',
          type: 'mcq',
          options: ['Static Application Security Testing', 'Server-side Attack Security Test', 'Secure API Scanning Tool', 'Software Assurance Security Testing'],
          ans: 0
        },
        {
          id: 'appsec-w7-e2',
          question: 'Semgrep is a tool used for static analysis of application source code.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: 'appsec-w7-m1',
          question: 'Which of the following is a dangerous function in Python that can execute arbitrary strings as Python code?',
          type: 'mcq',
          options: ['print()', 'eval()', 'len()', 'input()'],
          ans: 1
        },
        {
          id: 'appsec-w7-m2',
          question: 'What are common issues identified during secure code reviews? (Select all that apply)',
          type: 'msq',
          options: [
            'Hardcoded API keys or credentials',
            'Lack of input sanitization before executing commands',
            'CSS design alignment errors',
            'Missing authorization checks on administrative controllers'
          ],
          ans: [0, 1, 3]
        }
      ],
      hard: [
        {
          id: 'appsec-w7-h1',
          question: 'In SAST terminology, what is taint analysis?',
          type: 'mcq',
          options: [
            'Measuring compiler performance',
            'Tracking untrusted data from a source (e.g. user input) to a sensitive sink (e.g. database query, system command) to ensure it is sanitized',
            'Checking if files contain syntax errors',
            'Searching for duplicate code functions'
          ],
          ans: 1
        },
        {
          id: 'appsec-w7-h2',
          question: 'What is a major limitation of SAST tools?',
          type: 'mcq',
          options: [
            'They cannot scan source code in python',
            'They typically produce high false positive rates and cannot easily analyze runtime authentication/authorization logic',
            'They are only command-line based',
            'They execute code which can damage test servers'
          ],
          ans: 1
        }
      ]
    }
  },
  {
    id: 8,
    week: 'Week 16-18',
    title: 'Penetration Testing with Burp Suite',
    points: 100,
    objectives: [
      'Set up Burp Suite for web app testing',
      'Intercept and modify HTTP requests',
      'Complete PortSwigger labs'
    ],
    content: `<h3>Web App Penetration Testing</h3><p>Pen testing is authorized hacking — finding vulnerabilities before attackers do. Burp Suite is the industry-standard tool.</p><h4>Burp Suite Features:</h4><ul><li><strong>Proxy:</strong> Intercept and modify requests</li><li><strong>Scanner:</strong> Automated vulnerability detection</li><li><strong>Intruder:</strong> Fuzzing and brute force attacks</li><li><strong>Repeater:</strong> Manually test individual requests</li><li><strong>Decoder:</strong> Encode/decode data (Base64, URL, etc.)</li></ul><h4>Methodology:</h4><p>Recon → Mapping → Vulnerability ID → Exploitation → Reporting</p>`,
    resources: {
      websites: [
        { title: 'PortSwigger Web Security Academy (Free)', url: 'https://portswigger.net/web-security' },
        { title: 'Burp Suite Community Edition', url: 'https://portswigger.net/burp/communitydownload' }
      ],
      videos: [
        { title: 'Burp Suite for Beginners — TCM Security', url: 'https://www.youtube.com/embed/G3hpAeoZ4ek', dur: '2 hr' },
        { title: 'Web App Hacking — TryHackMe', url: 'https://www.youtube.com/embed/tWVWeAqZ0WU', dur: '2 hr' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'appsec-w8-e1',
          question: 'Which Burp Suite module is used to intercept and modify HTTP traffic in real time?',
          type: 'mcq',
          options: ['Scanner', 'Repeater', 'Proxy', 'Intruder'],
          ans: 2
        },
        {
          id: 'appsec-w8-e2',
          question: 'Burp Suite is a proxy tool that sits between your browser and the web server.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: 'appsec-w8-m1',
          question: 'Which Burp Suite module is specifically designed to perform automated attacks like password brute-forcing or fuzzing parameter inputs?',
          type: 'mcq',
          options: ['Proxy', 'Intruder', 'Repeater', 'Decoder'],
          ans: 1
        },
        {
          id: 'appsec-w8-m2',
          question: 'What is the function of Burp Suite Repeater?',
          type: 'mcq',
          options: [
            'To scan the entire website structure',
            'To modify and resend a specific HTTP request manually to analyze the response',
            'To repeat administrative reports',
            'To encode data to base64'
          ],
          ans: 1
        }
      ],
      hard: [
        {
          id: 'appsec-w8-h1',
          question: 'Why must you install Burp Suite\'s CA certificate in your browser to inspect HTTPS traffic?',
          type: 'mcq',
          options: [
            'To allow Burp Suite to act as a trusted certificate authority, decrypting and re-encrypting traffic to perform a Man-in-the-Middle analysis',
            'To speed up network loading',
            'To bypass local windows authentication checks',
            'To unlock the pro features of the scanner'
          ],
          ans: 0
        },
        {
          id: 'appsec-w8-h2',
          question: 'In Burp Intruder, which attack type places payloads into multiple positions simultaneously, using a single payload set in a one-to-one fashion?',
          type: 'mcq',
          options: ['Sniper', 'Battering Ram', 'Pitchfork', 'Cluster Bomb'],
          ans: 2
        }
      ]
    }
  },
  {
    id: 9,
    week: 'Week 19-21',
    title: 'DevSecOps & CI/CD Security',
    points: 100,
    objectives: [
      'Integrate security into CI/CD pipelines',
      'Use DAST tools in automated testing',
      'Set up dependency scanning and secrets detection'
    ],
    content: `<h3>DevSecOps</h3><p>Security integrated into every step of the development pipeline — not bolted on at the end.</p><h4>Pipeline Security Gates:</h4><ul><li><strong>Pre-commit:</strong> GitLeaks for secrets detection</li><li><strong>Build:</strong> Semgrep SAST, Bandit</li><li><strong>Dependency:</strong> Snyk, OWASP Dependency-Check</li><li><strong>Container:</strong> Trivy image scanning</li><li><strong>DAST:</strong> OWASP ZAP in automated mode</li><li><strong>IaC:</strong> Checkov for Terraform/CloudFormation</li></ul>`,
    resources: {
      websites: [
        { title: 'OWASP DevSecOps Guideline', url: 'https://owasp.org/www-project-devsecops-guideline/' },
        { title: 'GitLeaks — Secret Detection', url: 'https://github.com/gitleaks/gitleaks' }
      ],
      videos: [
        { title: 'DevSecOps Pipeline — Mkbn Tech', url: 'https://www.youtube.com/watch?v=tEnT7RlQqa4&pp=ygUTRGV2U2VjT3BzIFBpcGVsaW5lIA%3D%3D', dur: '1 hr 15 min' },
        { title: 'Snyk Security Tutorial - Snyk', url: 'https://www.youtube.com/watch?v=9RHM4ybvyT8&pp=ygUWU255ayBTZWN1cml0eSBUdXRvcmlhbA%3D%3D', dur: '20 min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'appsec-w9-e1',
          question: 'Which tool detects secrets (e.g. API keys, private keys) accidentally committed to a git repository?',
          type: 'mcq',
          options: ['Trivy', 'GitLeaks', 'Semgrep', 'Bandit'],
          ans: 1
        },
        {
          id: 'appsec-w9-e2',
          question: 'DevSecOps emphasizes integrating security checks into the CI/CD pipeline rather than waiting for manual audits at the end.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: 'appsec-w9-m1',
          question: 'Which tool is best suited for scanning Docker container images for vulnerabilities in a CI/CD pipeline?',
          type: 'mcq',
          options: ['GitLeaks', 'Trivy', 'Semgrep', 'Checkov'],
          ans: 1
        },
        {
          id: 'appsec-w9-m2',
          question: 'What is Software Composition Analysis (SCA)?',
          type: 'mcq',
          options: [
            'Analyzing the styling components of the UI',
            'Identifying vulnerable third-party library dependencies in the application code',
            'Writing tests for database triggers',
            'Deploying infrastructure on AWS'
          ],
          ans: 1
        }
      ],
      hard: [
        {
          id: 'appsec-w9-h1',
          question: 'What is a key difference between SAST and DAST in automated testing pipelines?',
          type: 'mcq',
          options: [
            'SAST scans the static source code without execution; DAST scans the running application from the outside, finding runtime flaws',
            'SAST is only for Java; DAST is only for Python',
            'SAST runs on client devices; DAST runs on server CPUs only',
            'SAST is manual; DAST is completely automated'
          ],
          ans: 0
        },
        {
          id: 'appsec-w9-h2',
          question: 'Which tool would you integrate to scan Infrastructure as Code (IaC) files, such as Terraform configurations, for security misconfigurations?',
          type: 'mcq',
          options: ['Bandit', 'Checkov', 'GitLeaks', 'Snyk'],
          ans: 1
        }
      ]
    }
  },
  {
    id: 10,
    week: 'Week 22-24',
    title: 'Bug Bounty & Career Preparation',
    points: 100,
    objectives: [
      'Set up bug bounty profiles on HackerOne and Bugcrowd',
      'Write professional vulnerability reports',
      'Build your AppSec portfolio and resume'
    ],
    content: `<h3>Bug Bounty & Career</h3><p>Bug bounty programs pay for finding real vulnerabilities in production systems. This is the best way to gain real-world experience and get paid while learning.</p><h4>Getting Started:</h4><ul><li>Complete all PortSwigger labs first</li><li>Start with programs that have "beginner friendly" labels</li><li>Focus on one vulnerability class at a time</li><li>Read disclosed reports on HackerOne for inspiration</li></ul><h4>Portfolio:</h4><ul><li>Document CTF writeups on a blog or GitHub</li><li>Contribute to open-source security tools</li><li>Get certifications: CompTIA Security+, eJPT, OSCP</li></ul>`,
    resources: {
      websites: [
        { title: 'HackerOne Bug Bounty Platform', url: 'https://www.hackerone.com' },
        { title: 'Bugcrowd Platform', url: 'https://www.bugcrowd.com' }
      ],
      videos: [
        { title: 'Bug Bounty Basics — NahamSec', url: 'https://www.youtube.com/watch?v=krCsMZfbuB4&pp=ygUkSG93IHRvIFN0YXJ0IEJ1ZyBCb3VudHkg4oCUIE5haGFtU2Vj0gcJCTgLAYcqIYzv', dur: '1.5 hr' },
        { title: 'HackerOne Disclosed Reports', url: 'https://www.youtube.com/embed/tWVWeAqZ0WU', dur: '20 min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'appsec-w10-e1',
          question: 'What is the gold-standard, hands-on certification for penetration testing?',
          type: 'mcq',
          options: ['CEH', 'Security+', 'OSCP', 'CISM'],
          ans: 2
        },
        {
          id: 'appsec-w10-e2',
          question: 'Bug bounty programs allow security researchers to hack any website on the internet without permission.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 1
        }
      ],
      medium: [
        {
          id: 'appsec-w10-m1',
          question: 'What is a Vulnerability Disclosure Policy (VDP)?',
          type: 'mcq',
          options: [
            'A legal contract outlining how security researchers can safely find and report vulnerabilities in an organization\'s systems',
            'An internal document for password generation rules',
            'A firewall configuration guide',
            'A list of software bugs found in development'
          ],
          ans: 0
        },
        {
          id: 'appsec-w10-m2',
          question: 'Which of the following are popular bug bounty platforms? (Select all that apply)',
          type: 'msq',
          options: ['HackerOne', 'Bugcrowd', 'GitHub', 'StackOverflow'],
          ans: [0, 1]
        }
      ],
      hard: [
        {
          id: 'appsec-w10-h1',
          question: 'What is a CVE (Common Vulnerabilities and Exposures)?',
          type: 'mcq',
          options: [
            'A dictionary of publicly known information security vulnerabilities in commercial or open-source software products',
            'A command-line tool for penetration testing',
            'An encryption algorithm',
            'A database optimization framework'
          ],
          ans: 0
        },
        {
          id: 'appsec-w10-h2',
          question: 'In a bug bounty vulnerability report, what is a Proof of Concept (PoC)?',
          type: 'mcq',
          options: [
            'A detailed document or exploit script demonstrating step-by-step how to reproduce the vulnerability and prove its security impact',
            'A payment receipt',
            'The developer\'s resume',
            'A project timeline chart'
          ],
          ans: 0
        }
      ]
    }
  }
];

export const appSecurityRoadmap = {
  id: 'app-security',
  title: 'Application Security',
  description: 'B.Tech CSE+CSF roadmap to become an Application Security Engineer. Week-by-week from web fundamentals to advanced AppSec.',
  difficulty: 'Intermediate',
  icon: '🛡️',
  color: '#EF4444',
  domain: 'Application Security',
  category: 'Technical',
  enrolled: 2103,
  targetUsers: ['Global BK', 'Campus'],
  durations: {
    '6months': { label: '6 Months', tagline: 'Complete AppSec Engineer track', weeks: 24, totalPoints: 1200, sections: mainContent },
    '6 months': { label: '6 Months', tagline: 'Complete AppSec Engineer track', weeks: 24, totalPoints: 1200, sections: mainContent }
  }
};

const getAppSecurityRoadmap = () => appSecurityRoadmap;
export default getAppSecurityRoadmap;