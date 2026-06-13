/**
 * GRC (Governance, Risk & Compliance) Roadmap
 * Includes both '4months' and '4 months' keys for UI compatibility.
 */

const mainContent = [
  {
    id: 1,
    week: 'Week 1',
    title: 'What is GRC? Core Concepts',
    points: 50,
    objectives: [
      'Define Governance, Risk, and Compliance',
      'Understand why GRC matters to organizations',
      'Learn the GRC professional role'
    ],
    content: `<h3>GRC Fundamentals</h3><p>GRC (Governance, Risk Management, and Compliance) is a structured approach to aligning IT with business goals, managing risk effectively, and ensuring compliance with regulations.</p><h4>Three Pillars:</h4><ul><li><strong>Governance:</strong> Policies, procedures, and oversight ensuring IT aligns with business goals</li><li><strong>Risk Management:</strong> Identifying, assessing, treating, and monitoring risks</li><li><strong>Compliance:</strong> Meeting legal, regulatory, and contractual obligations</li></ul><h4>Why GRC Matters:</h4><p>Without GRC, organizations face data breaches, regulatory fines, legal liability, and reputational damage. GRC professionals are the bridge between technical security and business strategy.</p>`,
    resources: {
      websites: [
        { title: 'ISACA — What is GRC?', url: 'https://www.isaca.org/resources/glossary#glossg' },
        { title: 'NIST Glossary of Terms', url: 'https://csrc.nist.gov/glossary' }
      ],
      videos: [
        { title: 'What is GRC? — MindMajix', url: 'https://www.youtube.com/watch?v=cgqD1QZA3P0', dur: '12 min' },
        { title: 'How to become a GRC Analyst — Cyber with Ben', url: 'https://www.youtube.com/embed/qqRg08Axo7g', dur: '10 min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'grc-w1-e1',
          question: 'What does GRC stand for?',
          type: 'mcq',
          options: ['General Risk Control', 'Governance, Risk, and Compliance', 'Global Regulatory Compliance', 'Governance and Risk Control'],
          ans: 1
        },
        {
          id: 'grc-w1-e2',
          question: 'Which pillar of GRC is focused on policies, procedures, and alignment with business goals?',
          type: 'mcq',
          options: ['Governance', 'Risk Management', 'Compliance', 'Security'],
          ans: 0
        }
      ],
      medium: [
        {
          id: 'grc-w1-m1',
          question: 'Which of the following are benefits of a strong GRC program? (Select all that apply)',
          type: 'msq',
          options: ['Reduced regulatory fines', 'Better data-driven decision making', 'Automatic protection against all software bugs', 'Improved reputation and client trust'],
          ans: [0, 1, 3]
        },
        {
          id: 'grc-w1-m2',
          question: 'GRC principles are only applicable to technology companies.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 1
        }
      ],
      hard: [
        {
          id: 'grc-w1-h1',
          question: 'Which option represents the main goal of the "Compliance" aspect of GRC?',
          type: 'mcq',
          options: [
            'Adhering to external laws, regulations, and internal policies',
            'Conducting penetration tests on production environments',
            'Writing technical code for applications',
            'Managing financial budgets of the IT department'
          ],
          ans: 0
        },
        {
          id: 'grc-w1-h2',
          question: 'What is a key difference between Governance and Compliance?',
          type: 'mcq',
          options: [
            'Governance is about steering the company towards its goals, while Compliance is about adhering to boundaries set by laws or policies',
            'Governance is handled by engineers, while Compliance is only handled by HR',
            'Governance is optional, while Compliance is never regulated by governments',
            'There is no difference; they are identical terms'
          ],
          ans: 0
        }
      ]
    }
  },
  {
    id: 2,
    week: 'Week 2',
    title: 'Cybersecurity Fundamentals for GRC',
    points: 50,
    objectives: [
      'Understand the CIA Triad',
      'Learn common threat categories',
      'Know basic security controls'
    ],
    content: `<h3>Security Basics</h3><p>GRC professionals don't need to be hackers, but they need enough security knowledge to assess risks and evaluate controls.</p><h4>CIA Triad:</h4><ul><li><strong>Confidentiality:</strong> Only authorized access to information</li><li><strong>Integrity:</strong> Accuracy and trustworthiness of data</li><li><strong>Availability:</strong> Systems accessible when needed</li></ul><h4>Threat Categories:</h4><ul><li>Malware, ransomware, phishing, social engineering</li><li>Insider threats, supply chain attacks</li><li>DDoS, zero-day exploits</li></ul>`,
    resources: {
      websites: [
        { title: 'Cybrary — Intro to IT & Cybersecurity (Free)', url: 'https://www.cybrary.it/course/introduction-to-it-and-cybersecurity' }
      ],
      videos: [
        { title: 'Introduction To CyberSecurity — Simplilearn', url: 'https://www.youtube.com/watch?v=z5nc9MDbvkw&pp=ygUcQ3liZXJzZWN1cml0eSBmb3IgQmVnaW5uZXJzIA%3D%3D', dur: '39 min' },
        { title: 'CIA Triad — Simply Cyber', url: 'https://www.youtube.com/embed/SBcDGb9l6yo', dur: '10 min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'grc-w2-e1',
          question: 'Which CIA triad element ensures data accuracy and trustworthiness?',
          type: 'mcq',
          options: ['Confidentiality', 'Integrity', 'Availability', 'Authentication'],
          ans: 1
        },
        {
          id: 'grc-w2-e2',
          question: 'Phishing is a form of social engineering.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: 'grc-w2-m1',
          question: 'Encryption of data-in-transit primarily protects which part of the CIA triad?',
          type: 'mcq',
          options: ['Confidentiality', 'Integrity', 'Availability', 'Non-repudiation'],
          ans: 0
        },
        {
          id: 'grc-w2-m2',
          question: 'A Distributed Denial of Service (DDoS) attack is a primary threat to which security pillar?',
          type: 'mcq',
          options: ['Confidentiality', 'Integrity', 'Availability', 'Accountability'],
          ans: 2
        }
      ],
      hard: [
        {
          id: 'grc-w2-h1',
          question: 'What is a zero-day exploit?',
          type: 'mcq',
          options: [
            'An attack that has been active for exactly zero days',
            'An attack targeting a vulnerability for which no patch or fix yet exists',
            'A tool used to scan servers for default passwords',
            'An attack that causes zero damage'
          ],
          ans: 1
        },
        {
          id: 'grc-w2-h2',
          question: 'Which of the following describes an insider threat?',
          type: 'mcq',
          options: [
            'An external hacker masquerading as an employee',
            'A current or former employee, contractor, or partner who has authorized access and misuses it',
            'A hardware flaw in the server CPU',
            'A phishing email sent by a foreign intelligence service'
          ],
          ans: 1
        }
      ]
    }
  },
  {
    id: 3,
    week: 'Week 3',
    title: 'NIST Cybersecurity Framework (CSF)',
    points: 50,
    objectives: [
      'Understand the NIST CSF functions',
      'Apply the framework to an organization',
      'Learn how to use CSF for risk assessment'
    ],
    content: `<h3>NIST CSF</h3><p>The NIST Cybersecurity Framework is the most widely used voluntary framework for managing cybersecurity risk in the US. CSF 2.0 was released in 2024.</p><h4>5 Core Functions (CSF 1.1) + 6 in CSF 2.0:</h4><ul><li><strong>Govern (new in 2.0):</strong> Organizational context and strategy</li><li><strong>Identify:</strong> Asset management, risk assessment</li><li><strong>Protect:</strong> Access control, training, data security</li><li><strong>Detect:</strong> Monitoring, anomaly detection</li><li><strong>Respond:</strong> Incident response planning</li><li><strong>Recover:</strong> Recovery planning, improvements</li></ul>`,
    resources: {
      websites: [
        { title: 'NIST CSF Official Page', url: 'https://www.nist.gov/cyberframework' },
        { title: 'NIST CSF Quick Start Guide', url: 'https://www.nist.gov/system/files/documents/cyberframework/cybersecurity-framework-021214.pdf' }
      ],
      videos: [
        { title: 'NIST CSF Explained — Simply Cyber', url: 'https://www.youtube.com/embed/J9ToNuwmyF0', dur: '20 min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'grc-w3-e1',
          question: 'NIST CSF is a set of mandatory regulations that all global companies are legally forced to follow.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 1
        },
        {
          id: 'grc-w3-e2',
          question: 'Which function includes asset management and risk assessment activities?',
          type: 'mcq',
          options: ['Protect', 'Identify', 'Respond', 'Recover'],
          ans: 1
        }
      ],
      medium: [
        {
          id: 'grc-w3-m1',
          question: 'What is the new sixth core function introduced in NIST CSF 2.0?',
          type: 'mcq',
          options: ['Govern', 'Prevent', 'Analyze', 'Audit'],
          ans: 0
        },
        {
          id: 'grc-w3-m2',
          question: 'Implementing access controls and user training fall under which NIST CSF function?',
          type: 'mcq',
          options: ['Identify', 'Protect', 'Detect', 'Respond'],
          ans: 1
        }
      ],
      hard: [
        {
          id: 'grc-w3-h1',
          question: 'What is the primary difference between the Detect and Respond functions in NIST CSF?',
          type: 'mcq',
          options: [
            'Detect focuses on finding anomalies and events; Respond focuses on taking action to contain them',
            'Detect is handled by automated scanners; Respond is only handled by legal teams',
            'Detect is part of CSF 1.1; Respond is only in CSF 2.0',
            'There is no difference; they are redundant functions'
          ],
          ans: 0
        },
        {
          id: 'grc-w3-h2',
          question: 'Which of the following are core functions of the NIST CSF 2.0 framework? (Select all that apply)',
          type: 'msq',
          options: ['Govern', 'Identify', 'Comply', 'Recover'],
          ans: [0, 1, 3]
        }
      ]
    }
  },
  {
    id: 4,
    week: 'Week 4',
    title: 'ISO 27001 & Information Security Management',
    points: 50,
    objectives: [
      'Understand ISO 27001 structure',
      'Learn ISMS (Information Security Management System)',
      'Know the key controls in Annex A'
    ],
    content: `<h3>ISO 27001</h3><p>ISO 27001 is the international standard for information security management systems (ISMS). Organizations can get certified to demonstrate strong security practices.</p><h4>Key Components:</h4><ul><li><strong>Context:</strong> Understanding the organization and stakeholders</li><li><strong>Risk Assessment:</strong> Identify and evaluate information security risks</li><li><strong>Annex A Controls:</strong> 93 controls across 4 themes (organizational, people, physical, technological)</li><li><strong>Certification:</strong> Third-party audit to confirm compliance</li></ul>`,
    resources: {
      websites: [
        { title: 'ISO 27001 Overview — IT Governance', url: 'https://www.itgovernance.co.uk/iso27001' },
        { title: 'ISMS.online ISO 27001 Guide', url: 'https://www.isms.online/iso-27001/' }
      ],
      videos: [
        { title: 'ISO 27001 Explained — GRC Solutions', url: 'https://www.youtube.com/watch?v=x792wXSeAhA&pp=ygUUSVNPIDI3MDAxIEV4cGxhaW5lZCA%3D', dur: '6 min 18sec' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'grc-w4-e1',
          question: 'What does ISMS stand for?',
          type: 'mcq',
          options: ['Information Security Management System', 'Integrated System Security Methodology', 'International Security Standards Manual', 'Internet Security Monitoring Suite'],
          ans: 0
        },
        {
          id: 'grc-w4-e2',
          question: 'ISO 27001 Annex A in the 2022 version has how many controls?',
          type: 'mcq',
          options: ['114', '93', '150', '27'],
          ans: 1
        }
      ],
      medium: [
        {
          id: 'grc-w4-m1',
          question: 'Which document is used to state which ISO 27001 Annex A controls are applicable or excluded?',
          type: 'mcq',
          options: ['System Security Plan (SSP)', 'Statement of Applicability (SoA)', 'Risk Register', 'Policy Manual'],
          ans: 1
        },
        {
          id: 'grc-w4-m2',
          question: 'ISO 27001 certification audits are performed by which of the following?',
          type: 'mcq',
          options: ['Internal IT team', 'An independent accredited third-party certification body', 'The ISO central committee', 'The organization\'s main clients'],
          ans: 1
        }
      ],
      hard: [
        {
          id: 'grc-w4-h1',
          question: 'ISO 27001:2022 Annex A controls are structured into how many themes?',
          type: 'mcq',
          options: ['4 themes (Organizational, People, Physical, Technological)', '14 domains', '5 functions', '12 requirements'],
          ans: 0
        },
        {
          id: 'grc-w4-h2',
          question: 'During an audit, what is the significance of a major non-conformity?',
          type: 'mcq',
          options: [
            'It represents a minor spelling error in a policy document',
            'It is a total breakdown or absence of a control that compromises the ISMS integrity and prevents certification',
            'It means a single employee forgot their password',
            'It only needs to be fixed within 5 years'
          ],
          ans: 1
        }
      ]
    }
  },
  {
    id: 5,
    week: 'Week 5-6',
    title: 'GDPR & Data Privacy Regulations',
    points: 60,
    objectives: [
      'Understand GDPR key principles and rights',
      'Know the roles: Controller, Processor, DPO',
      'Learn GDPR breach notification requirements'
    ],
    content: `<h3>GDPR</h3><p>The General Data Protection Regulation (EU) is the world's most comprehensive data privacy law. It applies to any organization processing EU residents' data.</p><h4>Key Principles:</h4><ul><li>Lawfulness, fairness, transparency</li><li>Purpose limitation, data minimization</li><li>Accuracy, storage limitation</li><li>Integrity and confidentiality</li></ul><h4>Individual Rights:</h4><ul><li>Right to access, erasure ("right to be forgotten"), portability</li><li>Right to object, restrict processing</li></ul><h4>Fines:</h4><p>Up to €20M or 4% of global annual turnover, whichever is higher.</p>`,
    resources: {
      websites: [
        { title: 'GDPR Official Text', url: 'https://gdpr-info.eu' },
        { title: 'ICO Guide to GDPR', url: 'https://ico.org.uk/for-organisations/uk-gdpr-guidance-and-resources/' }
      ],
      videos: [
        { title: 'GDPR Explained — Channel 4 news', url: 'https://www.youtube.com/embed/acijNEErf-c', dur: '20 min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'grc-w5-e1',
          question: 'GDPR applies only to businesses physically located inside the European Union.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 1
        },
        {
          id: 'grc-w5-e2',
          question: 'What is the maximum fine for serious violations under GDPR?',
          type: 'mcq',
          options: ['€10M or 2% global turnover', '€20M or 4% global turnover', '€5M fixed fee', 'There are no fines under GDPR'],
          ans: 1
        }
      ],
      medium: [
        {
          id: 'grc-w5-m1',
          question: 'Under GDPR, what is the maximum time allowed to report a data breach to a supervisory authority?',
          type: 'mcq',
          options: ['24 hours', '48 hours', '72 hours', '30 days'],
          ans: 2
        },
        {
          id: 'grc-w5-m2',
          question: 'Who determines the purposes and means of processing personal data?',
          type: 'mcq',
          options: ['Data Processor', 'Data Controller', 'Data Protection Officer', 'Supervisory Authority'],
          ans: 1
        }
      ],
      hard: [
        {
          id: 'grc-w5-h1',
          question: 'What is the difference between a Data Controller and a Data Processor?',
          type: 'mcq',
          options: [
            'A Controller decides the purposes/means of processing; a Processor processes data only on behalf of the Controller',
            'A Controller stores the data, while a Processor owns the databases',
            'A Controller is a government agency; a Processor is a private company',
            'They are two names for the same entity'
          ],
          ans: 0
        },
        {
          id: 'grc-w5-h2',
          question: 'Which GDPR principles are correctly matched? (Select all that apply)',
          type: 'msq',
          options: [
            'Data minimization: keep only the data necessary for the purpose',
            'Storage limitation: store data indefinitely to ensure availability',
            'Purpose limitation: collect data only for specified, explicit, and legitimate purposes',
            'Accuracy: ensure personal data is kept up to date'
          ],
          ans: [0, 2, 3]
        }
      ]
    }
  },
  {
    id: 6,
    week: 'Week 7-8',
    title: 'Risk Management Frameworks',
    points: 60,
    objectives: [
      'Conduct a risk assessment',
      'Understand risk treatment options',
      'Build and maintain a risk register'
    ],
    content: `<h3>Risk Management</h3><p>Risk management is identifying what can go wrong, evaluating the likelihood and impact, and deciding how to respond.</p><h4>Risk Assessment Process:</h4><ul><li><strong>Identify:</strong> Assets, threats, vulnerabilities</li><li><strong>Analyze:</strong> Likelihood × Impact = Risk Level</li><li><strong>Evaluate:</strong> Compare against risk appetite</li><li><strong>Treat:</strong> Accept, avoid, mitigate, transfer</li></ul><h4>Risk Register:</h4><p>A living document tracking all identified risks, their scores, owners, treatment plans, and status.</p>`,
    resources: {
      websites: [
        { title: 'NIST Risk Management Framework', url: 'https://csrc.nist.gov/projects/risk-management/about-rmf' },
        { title: 'Risk Register Template — CIS', url: 'https://www.cisecurity.org' }
      ],
      videos: [
        { title: 'Strengthening CyberSecurity with Risk Analysis — IBM Technology', url: 'https://www.youtube.com/embed/_c2L4z-v06g', dur: '11 min 21 sec' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'grc-w6-e1',
          question: 'What is the classic formula for assessing risk level?',
          type: 'mcq',
          options: ['Threats + Vulnerabilities', 'Likelihood × Impact', 'Cost / Probability', 'Asset Value × Time'],
          ans: 1
        },
        {
          id: 'grc-w6-e2',
          question: 'Which document keeps a record of all identified risks, scores, owners, and treatments?',
          type: 'mcq',
          options: ['Asset Ledger', 'Risk Register', 'Policy Manual', 'System Log'],
          ans: 1
        }
      ],
      medium: [
        {
          id: 'grc-w6-m1',
          question: 'Purchasing cybersecurity insurance is an example of which risk treatment strategy?',
          type: 'mcq',
          options: ['Avoidance', 'Mitigation', 'Transfer (Sharing)', 'Acceptance'],
          ans: 2
        },
        {
          id: 'grc-w6-m2',
          question: 'What is residual risk?',
          type: 'mcq',
          options: [
            'The risk before any security controls are applied',
            'The risk remaining after security controls and treatments have been implemented',
            'The risk of having too many employees leave the company',
            'The risk that is completely resolved'
          ],
          ans: 1
        }
      ],
      hard: [
        {
          id: 'grc-w6-h1',
          question: 'What does "risk appetite" mean?',
          type: 'mcq',
          options: [
            'The amount of budget spent on cybersecurity tools',
            'The amount and type of risk an organization is willing to pursue or retain to meet its objectives',
            'The speed at which a team can resolve security alerts',
            'The hunger of the security operations team'
          ],
          ans: 1
        },
        {
          id: 'grc-w6-h2',
          question: 'Match the risk treatment with its description: (Select all that apply)',
          type: 'msq',
          options: [
            'Avoidance: stop the activity that generates the risk',
            'Mitigation: implement controls to reduce likelihood/impact',
            'Acceptance: hire a vendor to take care of the problem',
            'Transfer: buy insurance or sign liability agreements'
          ],
          ans: [0, 1, 3]
        }
      ]
    }
  },
  {
    id: 7,
    week: 'Week 9-10',
    title: 'SOC 2 & PCI DSS',
    points: 60,
    objectives: [
      'Understand SOC 2 Trust Service Criteria',
      'Know PCI DSS requirements for payment security',
      'Learn audit and assessment processes'
    ],
    content: `<h3>SOC 2</h3><p>SOC 2 is a framework for service organizations to demonstrate controls over data security, availability, processing integrity, confidentiality, and privacy.</p><h4>Trust Service Criteria:</h4><ul><li><strong>Security (mandatory):</strong> Protection against unauthorized access</li><li>Availability, Processing Integrity, Confidentiality, Privacy</li></ul><h3>PCI DSS</h3><p>Payment Card Industry Data Security Standard — required for any organization storing, processing, or transmitting payment card data.</p><h4>12 PCI DSS Requirements:</h4><p>Network security, cardholder data protection, vulnerability management, access control, monitoring, and security policy.</p>`,
    resources: {
      websites: [
        { title: 'PCI DSS Official Standards', url: 'https://www.pcisecuritystandards.org' }
      ],
      videos: [
        { title: 'SOC 2 Compilance — Secureframe', url: 'https://www.youtube.com/embed/mpxaZIUSOmc', dur: '12 min' },
        { title: 'What is PCI DSS — GRC Solutions', url: 'https://www.youtube.com/embed/szVmMxWORBc', dur: '5 min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'grc-w7-e1',
          question: 'Which SOC 2 Trust Service Criterion is mandatory in every SOC 2 report?',
          type: 'mcq',
          options: ['Confidentiality', 'Security', 'Privacy', 'Availability'],
          ans: 1
        },
        {
          id: 'grc-w7-e2',
          question: 'PCI DSS is mandatory for any organization processing credit card payments.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: 'grc-w7-m1',
          question: 'What is a major difference between a SOC 2 Type I and a SOC 2 Type II report?',
          type: 'mcq',
          options: [
            'Type I is written by engineers; Type II is written by management',
            'Type I evaluates design at a point in time; Type II evaluates operational effectiveness over a period of time (e.g. 6 months)',
            'Type I is confidential; Type II is public',
            'Type I is free; Type II has a cost'
          ],
          ans: 1
        },
        {
          id: 'grc-w7-m2',
          question: 'How many core requirements does PCI DSS have?',
          type: 'mcq',
          options: ['5', '10', '12', '20'],
          ans: 2
        }
      ],
      hard: [
        {
          id: 'grc-w7-h1',
          question: 'Which of the following is NOT one of the five SOC 2 Trust Service Criteria?',
          type: 'mcq',
          options: ['Security', 'Compliance', 'Processing Integrity', 'Confidentiality'],
          ans: 1
        },
        {
          id: 'grc-w7-h2',
          question: 'What is Cardholder Data (CHD) according to PCI DSS? (Select all that apply)',
          type: 'msq',
          options: ['Primary Account Number (PAN)', 'Cardholder Name', 'Expiration Date', 'Cardholder Login Password'],
          ans: [0, 1, 2]
        }
      ]
    }
  },
  {
    id: 8,
    week: 'Week 11-12',
    title: 'GRC Tools & Documentation',
    points: 60,
    objectives: [
      'Work with GRC platforms (ServiceNow, Archer)',
      'Write security policies and procedures',
      'Build control frameworks'
    ],
    content: `<h3>GRC Tools</h3><p>GRC professionals use specialized platforms to manage risks, track compliance, and automate assessments.</p><h4>Popular GRC Platforms:</h4><ul><li><strong>ServiceNow GRC:</strong> Enterprise-level, widely used</li><li><strong>RSA Archer:</strong> Comprehensive risk management</li><li><strong>LogicGate:</strong> Modern, flexible</li><li><strong>Drata/Vanta:</strong> Automated compliance for SOC 2, ISO 27001</li></ul><h4>Policy Writing:</h4><p>Every GRC program needs documented policies: Information Security Policy, Acceptable Use Policy, Incident Response Policy, Business Continuity Plan.</p>`,
    resources: {
      websites: [
        { title: 'SANS Policy Templates (Free)', url: 'https://www.sans.org/information-security-policy/' },
        { title: 'How to Write a Security Policy — NIST', url: 'https://csrc.nist.gov/publications/detail/sp/800-12/rev-1/final' }
      ],
      videos: [
        { title: 'to 8 GRC Tools — Secure Governance', url: 'https://www.youtube.com/watch?v=Vws0hmC9Qq4&pp=ygUSZ3JjIHRvb2xzIG92ZXJ2aWV3', dur: '3 min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'grc-w8-e1',
          question: 'Which GRC platforms automate evidence collection for SOC 2 and ISO 27001 audits?',
          type: 'mcq',
          options: ['ServiceNow', 'Drata/Vanta', 'Wireshark', 'Burp Suite'],
          ans: 1
        },
        {
          id: 'grc-w8-e2',
          question: 'A security policy is a step-by-step technical guide for configuring a database.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 1
        }
      ],
      medium: [
        {
          id: 'grc-w8-m1',
          question: 'What is the purpose of an Acceptable Use Policy (AUP)?',
          type: 'mcq',
          options: [
            'To dictate the password requirements on the active directory',
            'To define the rules and guidelines employees must follow when using company-provided IT systems',
            'To record database schema changes',
            'To specify the server backup schedule'
          ],
          ans: 1
        },
        {
          id: 'grc-w8-m2',
          question: 'Enterprise GRC platforms (like RSA Archer or ServiceNow GRC) are primarily used to: (Select all that apply)',
          type: 'msq',
          options: [
            'Centralize and manage risk registers',
            'Map controls to multiple compliance regulations',
            'Scan source code for vulnerabilities automatically',
            'Automate compliance audit tracking'
          ],
          ans: [0, 1, 3]
        }
      ],
      hard: [
        {
          id: 'grc-w8-h1',
          question: 'What is a control framework?',
          type: 'mcq',
          options: [
            'A structured set of policies and technical controls used to meet compliance requirements and secure the enterprise',
            'A programming library for input validation',
            'A type of firewall configuration',
            'The management hierarchy of the security team'
          ],
          ans: 0
        },
        {
          id: 'grc-w8-h2',
          question: 'What is the correct hierarchy of security documentation from highest to lowest?',
          type: 'mcq',
          options: [
            'Policy → Standard → Guideline → Procedure',
            'Procedure → Guideline → Standard → Policy',
            'Standard → Policy → Procedure → Guideline',
            'Policy → Guideline → Procedure → Standard'
          ],
          ans: 0
        }
      ]
    }
  },
  {
    id: 9,
    week: 'Week 13-14',
    title: 'GRC Certifications Preparation',
    points: 60,
    objectives: [
      'Choose the right first certification',
      'Create a study plan for CompTIA Security+ or CISA',
      'Use practice exams effectively'
    ],
    content: `<h3>GRC Certifications</h3><p>Certifications validate your knowledge and are often required by employers. The right starting path depends on your background.</p><h4>Entry Level:</h4><ul><li><strong>CompTIA Security+:</strong> Best first cert, vendor-neutral, DoD approved</li><li><strong>ISC2 CC (Certified in Cybersecurity):</strong> Free exam for first million candidates</li></ul><h4>Mid Level:</h4><ul><li><strong>CISA:</strong> Certified Information Systems Auditor — audit focus</li><li><strong>CRISC:</strong> Certified in Risk and Information Systems Control</li><li><strong>CISM:</strong> Certified Information Security Manager</li></ul>`,
    resources: {
      websites: [
        { title: 'ISC2 CC Free Certification', url: 'https://www.isc2.org/certifications/cc' },
        { title: 'ISACA CRISC Exam Guide', url: 'https://www.isaca.org/credentialing/crisc' }
      ],
      videos: [
        { title: 'CompTIA SY0-701 Security + Training — Professor Messer', url: 'https://www.youtube.com/embed/KiEptGbnEBc?list=PLG49S3nxzAnl4QDVqK-hOnoqcSKEIDDuv', dur: 'Playlist' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'grc-w9-e1',
          question: 'Which certification is a popular, vendor-neutral entry point into IT security?',
          type: 'mcq',
          options: ['CISA', 'CompTIA Security+', 'CISSP', 'CRISC'],
          ans: 1
        },
        {
          id: 'grc-w9-e2',
          question: 'ISC2 offers a free Certified in Cybersecurity (CC) path for beginners.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 0
        }
      ],
      medium: [
        {
          id: 'grc-w9-m1',
          question: 'Which certification is best suited for individuals aiming to specialize in IT auditing?',
          type: 'mcq',
          options: ['CRISC', 'CISM', 'CISA', 'CEH'],
          ans: 2
        },
        {
          id: 'grc-w9-m2',
          question: 'What is the primary focus of the CRISC certification?',
          type: 'mcq',
          options: [
            'Designing firewalls and switches',
            'Risk management and information systems control',
            'Ethical hacking and penetration testing',
            'Writing secure code'
          ],
          ans: 1
        }
      ],
      hard: [
        {
          id: 'grc-w9-h1',
          question: 'Which organization issues the CISA, CRISC, and CISM certifications?',
          type: 'mcq',
          options: ['ISC2', 'CompTIA', 'ISACA', 'SANS Institute'],
          ans: 2
        },
        {
          id: 'grc-w9-h2',
          question: 'Which certification is widely regarded as a senior credential for managers and directors of security programs?',
          type: 'mcq',
          options: ['Security+', 'CC', 'CISSP / CISM', 'CEH'],
          ans: 2
        }
      ]
    }
  },
  {
    id: 10,
    week: 'Week 15-16',
    title: 'Job Applications & Career Launch',
    points: 60,
    objectives: [
      'Build a GRC-focused resume',
      'Prepare for GRC interviews',
      'Network in the cybersecurity community'
    ],
    content: `<h3>Launching Your GRC Career</h3><h4>Target Entry Roles:</h4><ul><li>GRC Analyst, Compliance Analyst</li><li>Risk Analyst, IT Auditor</li><li>Information Security Analyst (GRC track)</li><li>Third-Party Risk Analyst</li></ul><h4>Resume Tips:</h4><ul><li>Lead with certifications and frameworks known</li><li>Quantify: "Reduced audit findings by X%"</li><li>Include any compliance work from previous roles</li><li>List frameworks: NIST, ISO 27001, GDPR, SOC 2</li></ul><h4>Interview Prep:</h4><ul><li>"Walk me through a risk assessment"</li><li>"How would you handle a GDPR breach notification?"</li><li>"What's the difference between a risk and a vulnerability?"</li></ul>`,
    resources: {
      websites: [
        { title: 'GRC Resume Template — ISACA', url: 'https://www.isaca.org' }
      ],
      videos: [
        { title: 'Complete GRC Entry-Level Interview Questions and Answers — Simply Cyber', url: 'https://www.youtube.com/watch?v=p6E1PQtQIow&pp=ygUaZ3JjIGpvYiBpbnRlcnZpZXcgcXVlc3Rpb24%3D', dur: '1 hr 18 min' },
        { title: 'LinkedIn Foundations for Cybersecurity — Better Cyber Career', url: 'https://www.youtube.com/watch?v=bsmA9iNADQ0&pp=ygUbTGlua2VkSW4gZm9yIEN5YmVyc2VjdXJpdHkg', dur: '31 min' }
      ]
    },
    quizzes: {
      easy: [
        {
          id: 'grc-w10-e1',
          question: 'What is the difference between a risk and a vulnerability?',
          type: 'mcq',
          options: [
            'They are identical terms',
            'A vulnerability is a weakness; a risk is the likelihood and impact of that weakness being exploited',
            'Vulnerabilities are business issues, while risks are purely technical errors',
            'Vulnerabilities only exist in databases'
          ],
          ans: 1
        },
        {
          id: 'grc-w10-e2',
          question: 'GRC jobs are purely technical and do not require communication skills.',
          type: 'tf',
          options: ['True', 'False'],
          ans: 1
        }
      ],
      medium: [
        {
          id: 'grc-w10-m1',
          question: 'What does the STAR method stand for in behavioral interviews?',
          type: 'mcq',
          options: [
            'System, Target, Approach, Resolution',
            'Situation, Task, Action, Result',
            'Start, Think, Act, Review',
            'Security, Technology, Analysis, Risk'
          ],
          ans: 1
        },
        {
          id: 'grc-w10-m2',
          question: 'Which of the following are entry-level job titles in the GRC field? (Select all that apply)',
          type: 'msq',
          options: [
            'GRC Analyst',
            'Third-Party Risk Analyst',
            'Chief Information Security Officer (CISO)',
            'IT Compliance Auditor'
          ],
          ans: [0, 1, 3]
        }
      ],
      hard: [
        {
          id: 'grc-w10-h1',
          question: 'What is Third-Party Risk Management (TPRM)?',
          type: 'mcq',
          options: [
            'Managing risks related to third-party developers writing internal code',
            'Assessing and managing risks posed by external vendors, suppliers, and service providers who access company data',
            'Evaluating the risk of the top three competitors in the market',
            'Conducting security training for customers'
          ],
          ans: 1
        },
        {
          id: 'grc-w10-h2',
          question: 'Why is quantitative risk assessment often more difficult than qualitative risk assessment?',
          type: 'mcq',
          options: [
            'It is completely ignored by risk managers',
            'It requires reliable historical and financial data to calculate exact probabilities and loss costs, which is hard to obtain',
            'Qualitative risk assessment requires complex mathematical equations',
            'It can only be performed by external government auditors'
          ],
          ans: 1
        }
      ]
    }
  }
];

export const grcRoadmap = {
  id: 'grc',
  title: 'Governance, Risk & Compliance (GRC)',
  description: 'Complete roadmap for transitioning to a GRC role in cybersecurity. Week-by-week from fundamentals to job-ready.',
  difficulty: 'Beginner',
  icon: '⚖️',
  color: '#3B82F6',
  domain: 'Cybersecurity Governance',
  category: 'Technical',
  enrolled: 1240,
  targetUsers: ['Global BK'],
  durations: {
    '4months': { label: '4 Months', tagline: 'Structured GRC career track — beginner to job-ready', weeks: 16, totalPoints: 800, sections: mainContent },
    '4 months': { label: '4 Months', tagline: 'Structured GRC career track — beginner to job-ready', weeks: 16, totalPoints: 800, sections: mainContent }
  }
};

const getGRCRoadmap = () => grcRoadmap;
export default getGRCRoadmap;