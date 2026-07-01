"use client";

import { useState } from "react";

type Domain = "Analytics" | "Business" | "Testing" | "Finance";
type Level = "Beginner" | "Intermediate" | "Advanced";
type TabKey = "roadmap" | "skills" | "projects" | "certifications" | "videos" | "interview" | "companies" | "salary" | "resources" | "more";

type RoadmapStep = { step: string; description: string };
type Quiz = { question: string; options: string[]; answer: number };

type CareerPath = {
  title: string;
  domain: Domain;
  level: Level;
  icon: string;
  description: string;
  learningTime: string;
  salary: {
    india: { entry: string; mid: string; senior: string };
    global: { entry: string; mid: string; senior: string };
  };
  skills: { must: string[]; good: string[] };
  companies: { name: string; type: "MNC" | "Startup" | "Product" | "Service" }[];
  growth: string[];
  demand: "High" | "Medium" | "Low";
  roadmap: RoadmapStep[];
  projects: { title: string; description: string; difficulty: "Easy" | "Medium" | "Hard" }[];
  certifications: { name: string; provider: string; link: string }[];
  videos: { title: string; channel: string; url: string }[];
  interview: { q: string; a: string }[];
  resources: { title: string; type: "Course" | "Book" | "Website" | "Tool"; url: string }[];
  quiz: Quiz[];
  tools: string[];
  dayInLife: string[];
  pros: string[];
  cons: string[];
  remote: string;
  freelance: string;
  futureScope: string;
};

const careers: CareerPath[] = [
  {
    title: "Business Analyst",
    domain: "Business",
    level: "Intermediate",
    icon: "📊",
    description: "Bridge the gap between business needs and technical solutions by analyzing data, processes and requirements.",
    learningTime: "4-6 months",
    salary: {
      india: { entry: "₹4L - ₹7L", mid: "₹8L - ₹14L", senior: "₹15L - ₹28L" },
      global: { entry: "$55K - $70K", mid: "$75K - $100K", senior: "$105K - $140K" },
    },
    skills: {
      must: ["SQL", "Excel", "Power BI", "JIRA", "Agile/Scrum", "Requirements Gathering", "Stakeholder Management"],
      good: ["Tableau", "UML", "Python Basics", "BPMN", "Wireframing", "Confluence"],
    },
    companies: [
      { name: "Accenture", type: "Service" }, { name: "Deloitte", type: "Service" },
      { name: "TCS", type: "Service" }, { name: "IBM", type: "MNC" },
      { name: "Infosys", type: "Service" }, { name: "Wipro", type: "Service" },
      { name: "Capgemini", type: "Service" }, { name: "McKinsey", type: "MNC" },
    ],
    growth: ["Junior BA", "Business Analyst", "Senior BA", "Lead BA", "Product Manager", "VP Product"],
    demand: "High",
    roadmap: [
      { step: "Business Fundamentals", description: "Understand business processes, workflows, and organizational structures." },
      { step: "Master Excel & SQL", description: "Learn data analysis using Excel pivot tables and SQL queries." },
      { step: "Visualization Tools", description: "Master Power BI or Tableau for dashboards and reporting." },
      { step: "Agile & Scrum", description: "Learn sprint planning, backlog grooming, and JIRA workflows." },
      { step: "Requirements Gathering", description: "Write BRD, FRD, user stories, and use case documents." },
      { step: "Stakeholder Communication", description: "Practice presenting insights and managing expectations." },
      { step: "Get Certified", description: "Pursue CBAP, PMI-PBA, or ECBA certification." },
      { step: "Build Portfolio", description: "Complete 3-5 real projects or case studies and document them." },
    ],
    projects: [
      { title: "Sales Dashboard in Power BI", description: "Build an interactive dashboard analyzing sales KPIs using a sample retail dataset.", difficulty: "Easy" },
      { title: "E-commerce Requirements Document", description: "Write a full BRD and FRD for an e-commerce checkout flow redesign.", difficulty: "Medium" },
      { title: "Process Improvement Analysis", description: "Analyze a business process, identify bottlenecks and propose improvements using BPMN.", difficulty: "Medium" },
      { title: "Market Entry Case Study", description: "Analyze a new market entry strategy for a tech startup using research and data.", difficulty: "Hard" },
    ],
    certifications: [
      { name: "CBAP (Certified Business Analysis Professional)", provider: "IIBA", link: "https://www.iiba.org/certification/cbap/" },
      { name: "PMI-PBA", provider: "PMI", link: "https://www.pmi.org/certifications/business-analysis-pba" },
      { name: "ECBA (Entry Certificate in BA)", provider: "IIBA", link: "https://www.iiba.org/certification/ecba/" },
      { name: "Microsoft Power BI Certification", provider: "Microsoft", link: "https://learn.microsoft.com/en-us/certifications/power-bi-data-analyst-associate/" },
    ],
    videos: [
      { title: "Business Analyst videos", channel: "Search: Business Analyst Full Course", url: "https://www.youtube.com/results?search_query=business+analyst+full+course" },
      { title: "IIBA webinars and BA training", channel: "Search: IIBA Business Analysis", url: "https://www.youtube.com/results?search_query=IIBA+business+analysis+webinar" },
      { title: "Business analysis fundamentals course", channel: "Search: Business Analysis Course freeCodeCamp", url: "https://www.youtube.com/results?search_query=business+analysis+course" },
    ],
    interview: [
      { q: "What is the difference between BRD and FRD?", a: "BRD (Business Requirements Document) captures high-level business needs and objectives. FRD (Functional Requirements Document) details the specific functions the system must perform to meet those business needs." },
      { q: "How do you handle conflicting requirements from stakeholders?", a: "Prioritize using MoSCoW method (Must/Should/Could/Won't), facilitate a meeting with all stakeholders, document decisions and get sign-off from project sponsor." },
      { q: "What is the difference between Agile and Waterfall?", a: "Waterfall is sequential — each phase completes before next begins. Agile is iterative — work is done in sprints with continuous feedback, allowing changes throughout the project." },
      { q: "How do you write a user story?", a: "Format: 'As a [user type], I want [goal] so that [benefit].' Example: 'As a customer, I want to filter products by price so that I can find items within my budget.'" },
      { q: "What techniques do you use for requirements elicitation?", a: "Interviews, workshops, surveys, observation, prototyping, document analysis, and JAD (Joint Application Development) sessions." },
    ],
    resources: [
      { title: "BABOK Guide", type: "Book", url: "https://www.iiba.org/career-resources/a-business-analysis-body-of-knowledge/" },
      { title: "Business Analysis on Coursera", type: "Course", url: "https://www.coursera.org/professional-certificates/iiba-business-analysis" },
      { title: "Modern Analyst", type: "Website", url: "https://www.modernanalyst.com" },
      { title: "Power BI Documentation", type: "Tool", url: "https://learn.microsoft.com/en-us/power-bi/" },
    ],
    quiz: [
      { question: "What does BRD stand for?", options: ["Business Requirements Document", "Basic Requirement Data", "Business Reporting Document", "Base Reference Document"], answer: 0 },
      { question: "Which tool is most used by BAs for project tracking?", options: ["Photoshop", "JIRA", "VS Code", "Figma"], answer: 1 },
      { question: "What methodology do most BAs follow today?", options: ["Waterfall", "Agile", "Six Sigma", "PRINCE2"], answer: 1 },
      { question: "What is UAT?", options: ["User Acceptance Testing", "Unified Analysis Tool", "Universal App Testing", "User Application Transfer"], answer: 0 },
      { question: "Which skill is NOT required for a BA?", options: ["SQL", "Communication", "Kubernetes", "Excel"], answer: 2 },
      { question: "What does FRD stand for?", options: ["Functional Requirements Document", "Final Review Draft", "Frontend Requirement Design", "Feature Release Document"], answer: 0 },
      { question: "What is a Use Case?", options: ["A marketing strategy", "A description of user-system interaction", "A financial report", "A database query"], answer: 1 },
      { question: "What does MoSCoW stand for?", options: ["Must, Should, Could, Won't", "Main, Secondary, Core, Weak", "Major, Simple, Complex, Workaround", "None of these"], answer: 0 },
      { question: "Which certification is most recognized for BAs?", options: ["PMP", "CBAP", "AWS SAA", "CFA"], answer: 1 },
      { question: "What is a stakeholder?", options: ["A database table", "Anyone affected by the project outcome", "A type of server", "A testing framework"], answer: 1 },
    ],
    tools: ["JIRA", "Confluence", "Power BI", "Excel", "Lucidchart", "Balsamiq"],
    dayInLife: ["Stand-up meeting with dev/product team", "Refine backlog and write user stories", "Stakeholder calls to clarify requirements", "Update BRD/FRD documents", "Review dashboards and reports"],
    pros: ["High demand across every industry", "Strong bridge to Product Management", "Good work-life balance in most roles", "Transferable skills across domains"],
    cons: ["Can involve repetitive documentation", "Requires constant stakeholder management", "Less technical depth than engineering roles"],
    remote: "Highly remote-friendly — most BA work is meetings, documentation and analysis that can be done from anywhere.",
    freelance: "Limited freelance market, but consulting and contract BA roles exist for specific projects (ERP rollouts, audits).",
    futureScope: "Strong long-term scope — BAs are evolving into Product Analysts and Product Managers as companies blend business and tech roles.",
  },
  {
    title: "Data Analyst",
    domain: "Analytics",
    level: "Beginner",
    icon: "📈",
    description: "Collect, process and analyze data to help organizations make better data-driven business decisions.",
    learningTime: "3-5 months",
    salary: {
      india: { entry: "₹3.5L - ₹6L", mid: "₹7L - ₹12L", senior: "₹13L - ₹22L" },
      global: { entry: "$50K - $65K", mid: "$70K - $90K", senior: "$95K - $120K" },
    },
    skills: {
      must: ["Python", "SQL", "Excel", "Power BI / Tableau", "Statistics", "Data Cleaning"],
      good: ["Pandas", "NumPy", "R", "Matplotlib", "BigQuery", "dbt"],
    },
    companies: [
      { name: "Google", type: "Product" }, { name: "Amazon", type: "Product" },
      { name: "Microsoft", type: "Product" }, { name: "Flipkart", type: "Product" },
      { name: "Zomato", type: "Startup" }, { name: "PhonePe", type: "Startup" },
      { name: "Swiggy", type: "Startup" }, { name: "Mu Sigma", type: "Service" },
    ],
    growth: ["Junior Data Analyst", "Data Analyst", "Senior Data Analyst", "Data Scientist", "Analytics Manager", "Chief Data Officer"],
    demand: "High",
    roadmap: [
      { step: "Master Excel", description: "Formulas, pivot tables, VLOOKUP, conditional formatting and charts." },
      { step: "Learn SQL", description: "Queries, joins, subqueries, window functions and aggregations." },
      { step: "Python for Data", description: "Pandas, NumPy for data manipulation and cleaning." },
      { step: "Statistics", description: "Descriptive stats, probability, distributions, hypothesis testing." },
      { step: "Data Visualization", description: "Power BI or Tableau — build interactive dashboards." },
      { step: "Kaggle Projects", description: "Analyze 3-5 real datasets, publish notebooks on Kaggle." },
      { step: "Get Certified", description: "Google Data Analytics or IBM Data Analyst Professional Certificate." },
      { step: "Apply for Jobs", description: "Build GitHub portfolio, apply to junior DA roles." },
    ],
    projects: [
      { title: "COVID-19 Data Analysis", description: "Analyze global COVID data trends using Python, Pandas and Matplotlib.", difficulty: "Easy" },
      { title: "Sales Performance Dashboard", description: "Build a Tableau/Power BI dashboard from a retail sales CSV dataset.", difficulty: "Easy" },
      { title: "Customer Churn Analysis", description: "Predict customer churn using SQL queries and statistical analysis.", difficulty: "Medium" },
      { title: "End-to-End Data Pipeline", description: "Build a pipeline that ingests, cleans, transforms and visualizes data automatically.", difficulty: "Hard" },
    ],
    certifications: [
      { name: "Google Data Analytics Professional", provider: "Google / Coursera", link: "https://www.coursera.org/professional-certificates/google-data-analytics" },
      { name: "IBM Data Analyst Professional", provider: "IBM / Coursera", link: "https://www.coursera.org/professional-certificates/ibm-data-analyst" },
      { name: "Microsoft Power BI Data Analyst", provider: "Microsoft", link: "https://learn.microsoft.com/en-us/certifications/power-bi-data-analyst-associate/" },
      { name: "Tableau Desktop Specialist", provider: "Tableau", link: "https://www.tableau.com/learn/certification/desktop-specialist" },
    ],
    videos: [
      { title: "How I Would Become a Data Analyst (6 Month Plan)", channel: "Alex The Analyst", url: "https://www.youtube.com/watch?v=K0-8G3DgjA4" },
      { title: "SQL Tutorial - Full Database Course for Beginners", channel: "freeCodeCamp.org (Mike Dane)", url: "https://www.youtube.com/watch?v=HXV3zeQKqGY" },
      { title: "Data Analyst Roadmap", channel: "Search: Complete Data Analyst Roadmap", url: "https://www.youtube.com/results?search_query=complete+data+analyst+roadmap" },
    ],
    interview: [
      { q: "What is the difference between INNER JOIN and LEFT JOIN?", a: "INNER JOIN returns only rows where there is a match in both tables. LEFT JOIN returns all rows from the left table and matching rows from the right table — non-matching right rows are NULL." },
      { q: "How do you handle missing data?", a: "Options: remove rows with missing values, fill with mean/median/mode, use forward/backward fill for time series, or use ML imputation. Choice depends on the % missing and business context." },
      { q: "What is the difference between correlation and causation?", a: "Correlation means two variables move together. Causation means one variable directly causes the change in another. Correlation does not imply causation — always look for confounding variables." },
      { q: "What is an outlier and how do you handle it?", a: "An outlier is a data point significantly different from others. Detect using IQR or Z-score. Handle by removing, capping (winsorizing), or transforming — depending on whether it's an error or a real extreme value." },
      { q: "Explain the difference between a bar chart and a histogram.", a: "Bar charts show categorical data with gaps between bars. Histograms show distribution of continuous numerical data with no gaps — bars represent frequency ranges (bins)." },
    ],
    resources: [
      { title: "Google Data Analytics on Coursera", type: "Course", url: "https://www.coursera.org/professional-certificates/google-data-analytics" },
      { title: "Kaggle Learn", type: "Website", url: "https://www.kaggle.com/learn" },
      { title: "Storytelling with Data", type: "Book", url: "https://www.storytellingwithdata.com/books" },
      { title: "Mode Analytics SQL Tutorial", type: "Website", url: "https://mode.com/sql-tutorial/" },
    ],
    quiz: [
      { question: "Which library is most used for data manipulation in Python?", options: ["Django", "Pandas", "Flask", "FastAPI"], answer: 1 },
      { question: "What does SQL stand for?", options: ["Structured Query Language", "Simple Query Logic", "System Query Layer", "Sequential Query List"], answer: 0 },
      { question: "Which chart is best for showing trends over time?", options: ["Pie Chart", "Bar Chart", "Line Chart", "Scatter Plot"], answer: 2 },
      { question: "What is a null value?", options: ["Zero value", "Missing or unknown value", "Negative number", "Duplicate value"], answer: 1 },
      { question: "What does KPI stand for?", options: ["Key Performance Indicator", "Key Process Input", "Known Performance Index", "Key Product Item"], answer: 0 },
      { question: "Which platform has the best free datasets?", options: ["Netflix", "Kaggle", "Spotify", "LinkedIn"], answer: 1 },
      { question: "What is the median of [2, 4, 6, 8, 10]?", options: ["4", "5", "6", "8"], answer: 2 },
      { question: "Which tool is NOT used for visualization?", options: ["Tableau", "Power BI", "Postman", "Matplotlib"], answer: 2 },
      { question: "What is data cleaning?", options: ["Making data pretty", "Removing errors and inconsistencies", "Compressing data", "Encrypting data"], answer: 1 },
      { question: "What does ETL stand for?", options: ["Extract Transform Load", "Edit Transfer Log", "Export Table List", "Engine Test Layer"], answer: 0 },
    ],
    tools: ["Excel", "SQL", "Python", "Power BI", "Tableau", "Jupyter Notebook"],
    dayInLife: ["Pull and clean raw data from databases", "Write SQL queries for stakeholder requests", "Build/update dashboards", "Present insights in team meetings", "Document findings and recommendations"],
    pros: ["Huge entry-level demand, easiest analytics role to break into", "Clear progression to Data Scientist", "Highly transferable across industries", "Good remote work options"],
    cons: ["Can become repetitive (recurring report requests)", "Entry salary lower than software engineering", "Requires constant tool upskilling"],
    remote: "Very remote-friendly — most data work happens on cloud platforms and can be done from anywhere with stable internet.",
    freelance: "Good freelance demand for one-off dashboard builds, data cleaning projects and analytics consulting on platforms like Upwork.",
    futureScope: "Strong scope — as AI tools automate basic reporting, analysts who add business context and storytelling will be most valuable.",
  },
  {
    title: "Business Development",
    domain: "Business",
    level: "Beginner",
    icon: "🚀",
    description: "Drive company growth by identifying new opportunities, building partnerships and expanding market presence.",
    learningTime: "2-4 months",
    salary: {
      india: { entry: "₹3L - ₹6L", mid: "₹7L - ₹15L", senior: "₹16L - ₹30L" },
      global: { entry: "$45K - $65K", mid: "$70K - $100K", senior: "$105K - $150K" },
    },
    skills: {
      must: ["Communication", "CRM (Salesforce/HubSpot)", "Lead Generation", "Negotiation", "Cold Outreach", "Presentation"],
      good: ["Market Research", "LinkedIn Sales Navigator", "Excel", "Proposal Writing", "SEO Basics"],
    },
    companies: [
      { name: "Salesforce", type: "Product" }, { name: "Razorpay", type: "Startup" },
      { name: "Paytm", type: "Startup" }, { name: "Byju's", type: "Startup" },
      { name: "Zomato", type: "Startup" }, { name: "HubSpot", type: "Product" },
      { name: "Urban Company", type: "Startup" }, { name: "Meesho", type: "Startup" },
    ],
    growth: ["BD Intern", "BDE", "BD Manager", "Senior BD Manager", "VP Business Development", "Chief Revenue Officer"],
    demand: "High",
    roadmap: [
      { step: "Sales Fundamentals", description: "B2B/B2C sales cycle, lead generation, pipeline management and conversion basics." },
      { step: "Master CRM Tools", description: "Learn Salesforce or HubSpot for managing contacts, deals and outreach." },
      { step: "Communication Skills", description: "Cold calling scripts, email templates, LinkedIn outreach and presentation decks." },
      { step: "Market Research", description: "Identify TAM/SAM/SOM, competitive analysis, and ideal customer profiles." },
      { step: "Negotiation Tactics", description: "BATNA, win-win frameworks, objection handling and closing deals." },
      { step: "LinkedIn & Networking", description: "Optimize profile, build connections, engage with decision makers." },
      { step: "Get Internship", description: "Join a startup BD team, handle real leads and build measurable results." },
      { step: "Apply for Full-Time", description: "Target BDE/BDM roles at tech startups with documented metrics (leads closed, revenue generated)." },
    ],
    projects: [
      { title: "Cold Email Campaign", description: "Design and send a cold email sequence to 50 prospects and track open/reply rates.", difficulty: "Easy" },
      { title: "Competitor Analysis Report", description: "Research 5 competitors, map their pricing, positioning and weaknesses.", difficulty: "Easy" },
      { title: "Partnership Proposal Deck", description: "Build a professional pitch deck proposing a strategic partnership for a startup.", difficulty: "Medium" },
      { title: "GTM Strategy for a Product", description: "Create a full go-to-market strategy including target segment, channels, pricing and sales approach.", difficulty: "Hard" },
    ],
    certifications: [
      { name: "HubSpot Sales Software Certification", provider: "HubSpot Academy", link: "https://academy.hubspot.com/courses/sales-software" },
      { name: "Salesforce Sales Representative", provider: "Salesforce Trailhead", link: "https://trailhead.salesforce.com" },
      { name: "LinkedIn Sales Navigator Certification", provider: "LinkedIn", link: "https://business.linkedin.com/sales-solutions/sales-navigator" },
      { name: "Google Digital Marketing Fundamentals", provider: "Google", link: "https://learndigital.withgoogle.com" },
    ],
    videos: [
      { title: "B2B Sales training", channel: "Search: Patrick Dang B2B Sales", url: "https://www.youtube.com/results?search_query=patrick+dang+b2b+sales" },
      { title: "HubSpot Sales Training", channel: "Search: HubSpot Sales Training", url: "https://www.youtube.com/results?search_query=hubspot+sales+training" },
      { title: "Cold Outreach Masterclass", channel: "Search: Alex Berman Cold Email", url: "https://www.youtube.com/results?search_query=alex+berman+cold+email+outreach" },
    ],
    interview: [
      { q: "What is your BD process from lead to close?", a: "Prospect → Qualify (BANT: Budget, Authority, Need, Timeline) → Pitch → Handle objections → Negotiate → Close → Onboard. Each stage should have documented criteria." },
      { q: "How do you research a prospect before a call?", a: "Check LinkedIn profile, company website, recent news, funding rounds, job postings (indicates growth areas), and their competitors. Find a personal connection point." },
      { q: "What is BANT?", a: "Budget — can they afford it? Authority — are you speaking to the decision maker? Need — do they have the problem you solve? Timeline — when do they plan to act?" },
      { q: "How do you handle rejection in sales?", a: "Track rejection reasons, look for patterns, refine the pitch. 80% of deals close after 5 follow-ups. Rejection is data, not failure." },
      { q: "What metrics do you track as a BD professional?", a: "Number of outreach attempts, response rate, conversion rate, pipeline value, average deal size, sales cycle length, customer acquisition cost (CAC)." },
    ],
    resources: [
      { title: "SPIN Selling", type: "Book", url: "https://www.amazon.com/SPIN-Selling-Neil-Rackham/dp/0070511136" },
      { title: "HubSpot Academy — Free Courses", type: "Course", url: "https://academy.hubspot.com" },
      { title: "Sales Hacker Blog", type: "Website", url: "https://www.saleshacker.com" },
      { title: "Apollo.io — Prospecting Tool", type: "Tool", url: "https://www.apollo.io" },
    ],
    quiz: [
      { question: "What does BANT stand for?", options: ["Budget, Authority, Need, Timeline", "Business, Analytics, Network, Target", "Base, Account, Nurture, Track", "Brand, Audience, Notify, Test"], answer: 0 },
      { question: "Which CRM is most popular globally?", options: ["JIRA", "Salesforce", "Figma", "Slack"], answer: 1 },
      { question: "What is a lead?", options: ["A signed contract", "A potential customer", "A product feature", "A team member"], answer: 1 },
      { question: "What is cold outreach?", options: ["Contacting existing customers", "Contacting new prospects with no prior relationship", "Sending newsletters", "Internal communication"], answer: 1 },
      { question: "What does CAC stand for?", options: ["Customer Acquisition Cost", "Content Analytics Channel", "Company Account Credit", "Core Action Count"], answer: 0 },
      { question: "What is a pitch deck?", options: ["A database", "A presentation for investors or clients", "A testing tool", "A code repository"], answer: 1 },
      { question: "What does GTM mean in BD?", options: ["Go-To-Market", "Generate Team Metrics", "Global Trade Management", "Growth Tracking Model"], answer: 0 },
      { question: "What platform is best for B2B networking?", options: ["Instagram", "LinkedIn", "Twitter", "Reddit"], answer: 1 },
      { question: "What is churn in a business context?", options: ["New customer sign-ups", "Rate at which customers stop using a product", "Total revenue growth", "Number of leads generated"], answer: 1 },
      { question: "What does KAM stand for?", options: ["Key Account Manager", "Known Asset Manager", "Key Area Marketing", "Known Application Method"], answer: 0 },
    ],
    tools: ["Salesforce", "HubSpot", "LinkedIn Sales Navigator", "Apollo.io", "Calendly", "Slack"],
    dayInLife: ["Send cold emails/LinkedIn outreach to prospects", "Discovery calls with qualified leads", "Update CRM pipeline and deal stages", "Follow up with warm leads", "Team sync on weekly targets"],
    pros: ["Uncapped earning potential with commissions", "Fast track to leadership roles", "Builds strong networking and people skills", "High demand at every startup"],
    cons: ["Target-driven, can be stressful", "High rejection rate day to day", "Income can be variable if commission-heavy"],
    remote: "Mostly remote-friendly — calls, CRM and outreach can all be done remotely, though some client-facing roles need travel.",
    freelance: "Growing freelance/commission-only BD roles exist for startups, especially in early-stage sales.",
    futureScope: "Strong scope — as more companies move online, BD professionals skilled in digital outreach and CRM automation will be in high demand.",
  },
  {
    title: "Civil Liability / Legal Tech",
    domain: "Business",
    level: "Advanced",
    icon: "⚖️",
    description: "Analyze legal risks, manage compliance, and apply technology to streamline legal processes in corporate environments.",
    learningTime: "8-12 months",
    salary: {
      india: { entry: "₹5L - ₹9L", mid: "₹10L - ₹20L", senior: "₹22L - ₹50L" },
      global: { entry: "$65K - $85K", mid: "$90K - $130K", senior: "$135K - $200K" },
    },
    skills: {
      must: ["Contract Law", "Compliance Management", "Legal Research", "Risk Assessment", "Documentation", "Negotiation"],
      good: ["Legal Tech Tools", "Data Privacy (GDPR)", "IP Law", "Corporate Law", "Arbitration", "Excel/Sheets"],
    },
    companies: [
      { name: "Nishith Desai", type: "Service" }, { name: "AZB & Partners", type: "Service" },
      { name: "Khaitan & Co", type: "Service" }, { name: "LegalZoom", type: "Product" },
      { name: "Freshfields", type: "MNC" }, { name: "Clifford Chance", type: "MNC" },
      { name: "Deloitte Legal", type: "Service" }, { name: "PwC Legal", type: "Service" },
    ],
    growth: ["Legal Intern", "Junior Associate", "Associate", "Senior Associate", "Partner", "General Counsel"],
    demand: "Medium",
    roadmap: [
      { step: "Law Fundamentals", description: "Understand civil law, torts, contract law, corporate law basics." },
      { step: "Contract Drafting", description: "Learn to draft, review and negotiate commercial contracts." },
      { step: "Compliance & Regulations", description: "Study GDPR, SEBI, RBI regulations and corporate compliance." },
      { step: "Legal Research", description: "Master Manupatra, SCC Online, Westlaw for case research." },
      { step: "Risk Management", description: "Identify and mitigate legal risks in business transactions." },
      { step: "Legal Tech Tools", description: "Learn contract management tools, e-discovery, and document automation." },
      { step: "Specialization", description: "Choose: IP law, M&A, data privacy, arbitration, or corporate law." },
      { step: "Get Certified / Enroll", description: "Pursue LLB, LLM, or specialized legal tech certificates." },
    ],
    projects: [
      { title: "Contract Review Checklist", description: "Create a detailed checklist for reviewing commercial contracts for common risk clauses.", difficulty: "Easy" },
      { title: "GDPR Compliance Audit", description: "Audit a sample company's data practices against GDPR requirements.", difficulty: "Medium" },
      { title: "Legal Risk Report", description: "Analyze a hypothetical M&A deal and identify key legal risks and mitigation strategies.", difficulty: "Hard" },
      { title: "IP Strategy Document", description: "Create an IP protection strategy for a tech startup's product portfolio.", difficulty: "Hard" },
    ],
    certifications: [
      { name: "Certified Compliance & Ethics Professional", provider: "SCCE", link: "https://www.corporatecompliance.org/ccep" },
      { name: "CIPP/E (Data Privacy)", provider: "IAPP", link: "https://iapp.org/certify/cipp/" },
      { name: "Legal Project Management", provider: "IILPM", link: "https://legalpm.org" },
      { name: "Certificate in Contract Management", provider: "World Commerce & Contracting", link: "https://www.worldcc.com" },
    ],
    videos: [
      { title: "Introduction to Corporate Law", channel: "Search: Introduction to Corporate Law", url: "https://www.youtube.com/results?search_query=introduction+to+corporate+law" },
      { title: "Contract Law Basics Explained", channel: "Search: Contract Law Basics", url: "https://www.youtube.com/results?search_query=contract+law+basics+explained" },
      { title: "Legal Tech and the Future of Law", channel: "Search: Legal Tech Future of Law", url: "https://www.youtube.com/results?search_query=legal+tech+future+of+law" },
    ],
    interview: [
      { q: "What is the difference between civil and criminal liability?", a: "Civil liability involves disputes between private parties — the remedy is compensation. Criminal liability involves the state prosecuting an individual for offenses against society — the remedy is punishment." },
      { q: "What is an indemnity clause?", a: "A contractual obligation where one party agrees to compensate the other for specific losses or damages. It transfers risk from one party to another." },
      { q: "What is GDPR and why does it matter for businesses?", a: "General Data Protection Regulation — EU law governing how businesses collect, store and use personal data. Violations can result in fines up to 4% of global annual turnover." },
      { q: "What is force majeure?", a: "A contract clause that excuses a party from performance obligations when extraordinary events beyond their control occur — war, natural disasters, pandemics." },
      { q: "What is the role of in-house counsel vs external counsel?", a: "In-house counsel is employed by the company, focuses on day-to-day legal matters and strategy. External counsel is a law firm hired for specialized matters, litigation or complex transactions." },
    ],
    resources: [
      { title: "Black's Law Dictionary", type: "Book", url: "https://thelawdictionary.org" },
      { title: "Coursera — Introduction to Corporate Law", type: "Course", url: "https://www.coursera.org/learn/corporate-law" },
      { title: "IAPP — Privacy Resources", type: "Website", url: "https://iapp.org/resources/" },
      { title: "Manupatra — Legal Research", type: "Tool", url: "https://www.manupatrafast.com" },
    ],
    quiz: [
      { question: "What is a tort?", options: ["A contract violation", "A civil wrong causing harm", "A criminal offense", "A tax issue"], answer: 1 },
      { question: "What does GDPR stand for?", options: ["General Data Protection Regulation", "Global Data Privacy Rule", "Government Data Processing Requirement", "General Data Policy Regulation"], answer: 0 },
      { question: "What is an NDA?", options: ["Non-Disclosure Agreement", "New Deal Arrangement", "National Development Act", "Net Debt Analysis"], answer: 0 },
      { question: "What is force majeure?", options: ["A payment clause", "An event beyond a party's control excusing non-performance", "A type of penalty", "A legal jurisdiction"], answer: 1 },
      { question: "What is due diligence?", options: ["A marketing study", "Thorough investigation before a transaction", "A type of contract", "A court procedure"], answer: 1 },
      { question: "What does IP stand for in legal context?", options: ["Internet Protocol", "Intellectual Property", "International Policy", "Internal Procedure"], answer: 1 },
      { question: "What is arbitration?", options: ["A court trial", "A form of alternative dispute resolution", "A contract clause", "A regulatory body"], answer: 1 },
      { question: "What is indemnity?", options: ["A payment plan", "Compensation for loss or damage", "A court order", "A tax deduction"], answer: 1 },
      { question: "What does LLB stand for?", options: ["License in Law and Business", "Bachelor of Laws", "Legal and Liability Board", "Law Licensing Bureau"], answer: 1 },
      { question: "Which body regulates securities in India?", options: ["RBI", "SEBI", "IRDAI", "MCA"], answer: 1 },
    ],
    tools: ["Manupatra", "SCC Online", "DocuSign", "Westlaw", "Microsoft Word", "Contract Management Software"],
    dayInLife: ["Review and redline commercial contracts", "Research case law for ongoing matters", "Advise business teams on compliance risk", "Draft legal opinions and memos", "Attend client/stakeholder meetings"],
    pros: ["High earning potential at senior levels", "Intellectually demanding and respected field", "Wide range of specializations available", "Strong job security"],
    cons: ["Long path to qualification (LLB/LLM)", "High pressure and long hours, especially at law firms", "Competitive entry into top firms"],
    remote: "Partially remote — research and drafting can be remote, but client meetings, court appearances and negotiations often need in-person presence.",
    freelance: "Growing freelance legal consulting market, especially for contract review and compliance advisory for startups.",
    futureScope: "Strong scope — legal tech and AI-assisted contract review are creating new hybrid roles combining law and technology.",
  },
  {
    title: "Software Testing / QA",
    domain: "Testing",
    level: "Beginner",
    icon: "🧪",
    description: "Ensure software quality by designing test cases, finding bugs, and validating applications meet requirements.",
    learningTime: "3-5 months",
    salary: {
      india: { entry: "₹3L - ₹5.5L", mid: "₹6L - ₹12L", senior: "₹13L - ₹22L" },
      global: { entry: "$48K - $65K", mid: "$70K - $90K", senior: "$95K - $120K" },
    },
    skills: {
      must: ["Manual Testing", "Test Case Writing", "Bug Reporting", "JIRA", "Postman (API Testing)", "SQL"],
      good: ["Selenium", "Cypress", "TestNG", "JMeter", "CI/CD", "Python/Java for Automation"],
    },
    companies: [
      { name: "TCS", type: "Service" }, { name: "Infosys", type: "Service" },
      { name: "Wipro", type: "Service" }, { name: "HCL", type: "Service" },
      { name: "Cognizant", type: "Service" }, { name: "Accenture", type: "Service" },
      { name: "Browserstack", type: "Product" }, { name: "Perfecto", type: "Product" },
    ],
    growth: ["Junior QA", "QA Engineer", "Senior QA", "QA Lead", "QA Manager", "SDET", "VP Engineering Quality"],
    demand: "Medium",
    roadmap: [
      { step: "Testing Fundamentals", description: "SDLC, STLC, testing types (unit, integration, system, acceptance), testing principles." },
      { step: "Manual Testing", description: "Test case design, test plans, bug life cycle, severity vs priority." },
      { step: "Bug Tracking with JIRA", description: "Log defects, manage sprints, use dashboards and workflows." },
      { step: "API Testing", description: "REST APIs with Postman — GET, POST, PUT, DELETE, response validation." },
      { step: "SQL for QA", description: "Write queries to validate backend data during testing." },
      { step: "Automation with Selenium", description: "Java/Python + Selenium WebDriver, POM framework, TestNG." },
      { step: "Performance Testing", description: "Load and stress testing using JMeter or k6." },
      { step: "Get ISTQB Certified", description: "ISTQB Foundation Level — most recognized QA certification globally." },
    ],
    projects: [
      { title: "Test Cases for Login Module", description: "Write 30+ manual test cases for a login/signup flow covering positive and negative scenarios.", difficulty: "Easy" },
      { title: "API Testing with Postman", description: "Test a public REST API (e.g. JSONPlaceholder) — validate all endpoints, headers and edge cases.", difficulty: "Easy" },
      { title: "Selenium Automation Suite", description: "Automate an e-commerce site's search and checkout flow using Selenium and TestNG.", difficulty: "Medium" },
      { title: "Performance Test Report", description: "Run load tests on a web app using JMeter, analyze results and document findings.", difficulty: "Hard" },
    ],
    certifications: [
      { name: "ISTQB Foundation Level", provider: "ISTQB", link: "https://www.istqb.org/certifications/foundation-level" },
      { name: "Selenium WebDriver with Java", provider: "Udemy (Rahul Shetty)", link: "https://www.udemy.com/course/selenium-real-time-examplesinterview-questions/" },
      { name: "Postman API Testing Certification", provider: "Postman", link: "https://academy.postman.com" },
      { name: "AWS Certified DevOps Engineer", provider: "AWS", link: "https://aws.amazon.com/certification/certified-devops-engineer-professional/" },
    ],
    videos: [
      { title: "Software Testing Full Course (10 Hours)", channel: "Edureka", url: "https://www.youtube.com/watch?v=sO8eGL6SFsA" },
      { title: "Selenium WebDriver with Java", channel: "Search: Rahul Shetty Academy Selenium", url: "https://www.youtube.com/results?search_query=rahul+shetty+academy+selenium+webdriver+java" },
      { title: "Postman API Testing Course", channel: "Search: Postman API Testing Tutorial", url: "https://www.youtube.com/results?search_query=postman+api+testing+tutorial" },
    ],
    interview: [
      { q: "What is the difference between severity and priority?", a: "Severity is the impact of a bug on the system (technical measure). Priority is how urgently the bug needs to be fixed (business measure). A cosmetic bug on the homepage might be low severity but high priority." },
      { q: "What is regression testing?", a: "Re-executing tests after code changes to ensure previously working functionality is not broken. It should be automated for efficiency." },
      { q: "What is the difference between black-box and white-box testing?", a: "Black-box testing tests functionality without knowledge of internal code. White-box testing tests internal code structure, paths and logic." },
      { q: "How do you write a good bug report?", a: "Include: Bug ID, title, environment, steps to reproduce, expected vs actual result, severity, priority, screenshots/logs. Clear steps to reproduce are the most critical part." },
      { q: "What is the test pyramid?", a: "Unit tests (base — fast, many), Integration tests (middle), UI/E2E tests (top — slow, few). More unit tests means faster feedback and cheaper maintenance." },
    ],
    resources: [
      { title: "ISTQB Foundation Study Guide", type: "Book", url: "https://www.istqb.org/downloads/syllabi/foundation-level" },
      { title: "Test Automation University", type: "Course", url: "https://testautomationu.applitools.com" },
      { title: "Ministry of Testing", type: "Website", url: "https://www.ministryoftesting.com" },
      { title: "Postman — API Platform", type: "Tool", url: "https://www.postman.com" },
    ],
    quiz: [
      { question: "What does QA stand for?", options: ["Quality Assurance", "Quick Analysis", "Query Agent", "Qualified Automation"], answer: 0 },
      { question: "What does STLC stand for?", options: ["Software Testing Life Cycle", "System Tool Launch Code", "Software Tool Level Check", "Standard Testing Logic Cycle"], answer: 0 },
      { question: "Which tool is used for API testing?", options: ["Selenium", "Postman", "JIRA", "Jenkins"], answer: 1 },
      { question: "What is regression testing?", options: ["Testing new features only", "Re-testing after changes to ensure nothing broke", "Performance testing", "Security testing"], answer: 1 },
      { question: "What is Selenium used for?", options: ["API Testing", "Database Testing", "UI Automation Testing", "Performance Testing"], answer: 2 },
      { question: "Which certification is standard for QA?", options: ["AWS SAA", "ISTQB", "PMP", "CBAP"], answer: 1 },
      { question: "What is smoke testing?", options: ["Performance testing", "Quick check of basic functionality before full testing", "Security testing", "Load testing"], answer: 1 },
      { question: "What is severity vs priority?", options: ["They are the same", "Severity = impact, Priority = urgency to fix", "Priority = impact, Severity = urgency", "Both are about timeline"], answer: 1 },
      { question: "What is a test plan?", options: ["A bug report", "A document describing scope, approach and resources for testing", "An automation script", "A deployment checklist"], answer: 1 },
      { question: "What does UAT stand for?", options: ["User Acceptance Testing", "Unified Automation Tool", "Universal App Testing", "User Application Transfer"], answer: 0 },
    ],
    tools: ["JIRA", "Postman", "Selenium", "TestNG", "JMeter", "Browserstack"],
    dayInLife: ["Write and execute test cases for new features", "Log and verify bugs in JIRA", "Run automated regression suites", "Collaborate with devs on bug fixes", "Update test documentation"],
    pros: ["Easy entry point into tech industry", "Clear path into automation/SDET roles", "High job stability in service companies", "Good logical thinking skill builder"],
    cons: ["Can be seen as less prestigious than dev roles", "Manual testing can get repetitive", "Lower entry salary compared to development"],
    remote: "Highly remote-friendly — most manual and automation testing work can be done fully remotely.",
    freelance: "Decent freelance market for manual testing, app testing and automation script writing on contract basis.",
    futureScope: "Strong scope — shifting toward automation and AI-based testing tools, SDET roles are growing fast and pay significantly more.",
  },
];

const domainColors: Record<Domain, { bg: string; text: string }> = {
  Analytics: { bg: "#1BA0D7", text: "#e0f4ff" },
  Business: { bg: "#7c3aed", text: "#ede9fe" },
  Testing: { bg: "#059669", text: "#d1fae5" },
  Finance: { bg: "#d97706", text: "#fef3c7" },
};

const demandBadge = {
  High: "bg-emerald-900/50 text-emerald-400 border border-emerald-700",
  Medium: "bg-yellow-900/50 text-yellow-400 border border-yellow-700",
  Low: "bg-red-900/50 text-red-400 border border-red-700",
};

const levelBadge = {
  Beginner: "bg-blue-900/50 text-blue-400 border border-blue-700",
  Intermediate: "bg-purple-900/50 text-purple-400 border border-purple-700",
  Advanced: "bg-orange-900/50 text-orange-400 border border-orange-700",
};

const companyTypeBadge = {
  MNC: "text-blue-400",
  Product: "text-purple-400",
  Startup: "text-orange-400",
  Service: "text-gray-400",
};

const TABS: { key: TabKey; label: string }[] = [
  { key: "roadmap", label: "Roadmap" },
  { key: "skills", label: "Skills" },
  { key: "projects", label: "Projects" },
  { key: "certifications", label: "Certifications" },
  { key: "videos", label: "Videos" },
  { key: "interview", label: "Interview" },
  { key: "companies", label: "Companies" },
  { key: "salary", label: "Salary" },
  { key: "resources", label: "Resources" },
  { key: "more", label: "More Info" },
];

const difficultyColor = { Easy: "text-emerald-400", Medium: "text-yellow-400", Hard: "text-red-400" };
const resourceTypeColor: Record<string, string> = {
  Course: "bg-blue-900/40 text-blue-400 border-blue-700",
  Book: "bg-purple-900/40 text-purple-400 border-purple-700",
  Website: "bg-teal-900/40 text-teal-400 border-teal-700",
  Tool: "bg-orange-900/40 text-orange-400 border-orange-700",
};

export default function CareerPathsHome() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState<Record<string, TabKey>>({});
  const [expandedInterview, setExpandedInterview] = useState<Record<string, number | null>>({});
  const [favorites, setFavorites] = useState<string[]>([]);
  const [completedSteps, setCompletedSteps] = useState<Record<string, Record<number, boolean>>>({});
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);

  // Quiz popup state
  const [quizCard, setQuizCard] = useState<string | null>(null);
  const [quizAnswers, setQuizAnswers] = useState<Record<number, number>>({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);

  const filtered = careers.filter((c) => {
    const matchesSearch =
      c.title.toLowerCase().includes(search.toLowerCase()) ||
      c.skills.must.some((s) => s.toLowerCase().includes(search.toLowerCase())) ||
      c.skills.good.some((s) => s.toLowerCase().includes(search.toLowerCase())) ||
      c.domain.toLowerCase().includes(search.toLowerCase());
    const favMatch = !showFavoritesOnly || favorites.includes(c.title);
    return matchesSearch && favMatch;
  });

  const getTab = (title: string): TabKey => activeTab[title] ?? "roadmap";
  const openLink = (url: string) => window.open(url, "_blank", "noopener,noreferrer");

  const toggleFavorite = (title: string) => {
    setFavorites((prev) => (prev.includes(title) ? prev.filter((t) => t !== title) : [...prev, title]));
  };

  const toggleStep = (title: string, index: number) => {
    setCompletedSteps((prev) => ({
      ...prev,
      [title]: { ...prev[title], [index]: !prev[title]?.[index] },
    }));
  };

  const openQuiz = (title: string) => {
    setQuizCard(title);
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const closeQuiz = () => {
    setQuizCard(null);
    setQuizAnswers({});
    setQuizSubmitted(false);
  };

  const currentQuiz = careers.find((c) => c.title === quizCard);
  const score = currentQuiz ? currentQuiz.quiz.filter((q, i) => quizAnswers[i] === q.answer).length : 0;

  return (
    <div className="min-h-screen px-6 py-10 bg-gray-950">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8 flex items-start justify-between gap-4 flex-wrap">
          <div>
            <h1 className="text-2xl font-semibold text-white tracking-tight">Career Paths</h1>
            <p className="text-gray-500 text-sm mt-1">Explore roles, roadmaps, projects and test your knowledge</p>
          </div>
          <button
            onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
            className={`flex items-center gap-1.5 text-xs px-3 py-2 rounded-lg border transition-colors ${
              showFavoritesOnly ? "bg-pink-600 border-pink-600 text-white" : "bg-gray-900 border-gray-700 text-gray-400 hover:border-gray-500"
            }`}
          >
            <svg className="w-4 h-4" fill={showFavoritesOnly ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24" strokeWidth={1.5}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
            </svg>
            Favorites {favorites.length > 0 && `(${favorites.length})`}
          </button>
        </div>

        {/* Search Bar */}
        <div className="mb-8 relative">
          <svg className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by role, skill or domain — e.g. SQL, Data Analyst, Testing"
            className="w-full bg-gray-900 border border-gray-700 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-500 outline-none focus:border-orange-500 transition-colors"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white text-xs">
              Clear
            </button>
          )}
        </div>

        <p className="text-xs text-gray-700 mb-6">{filtered.length} career path{filtered.length !== 1 ? "s" : ""} found</p>

        {/* Cards */}
        <div className="grid md:grid-cols-2 gap-5">
          {filtered.map((career) => {
            const tab = getTab(career.title);
            const expandedQ = expandedInterview[career.title] ?? null;
            const isFav = favorites.includes(career.title);
            const stepsDone = completedSteps[career.title] ?? {};
            const progressPct = Math.round((Object.values(stepsDone).filter(Boolean).length / career.roadmap.length) * 100);

            return (
              <div
                key={career.title}
                className="group rounded-xl overflow-hidden bg-gray-900 border border-gray-800 hover:border-orange-500/60 transition-all duration-300 hover:shadow-[0_0_25px_-5px_rgba(249,115,22,0.35)] hover:-translate-y-1"
              >

                {/* Card Header */}
                <div className="p-5 relative overflow-hidden">
                  {/* animated orange glow accent */}
                  <div className="absolute -top-10 -right-10 w-32 h-32 bg-orange-500/10 rounded-full blur-2xl group-hover:bg-orange-500/20 transition-all duration-500" />
                  <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-to-b from-orange-500 via-orange-400 to-orange-600" />

                  <div className="flex items-start justify-between gap-3 relative z-10">
                    <div className="flex items-center gap-3">
                      <span className="text-2xl">{career.icon}</span>
                      <div>
                        <h2 className="text-white font-semibold text-base leading-tight">{career.title}</h2>
                        <div className="flex items-center gap-2 mt-0.5">
                          <span className="text-xs text-orange-400">{career.domain}</span>
                          <span className="text-gray-600 text-xs">·</span>
                          <span className="text-xs text-gray-500">⏳ {career.learningTime}</span>
                        </div>
                      </div>
                    </div>
                    <button onClick={() => toggleFavorite(career.title)} aria-label="Toggle favorite" className="flex-shrink-0">
                      <svg className="w-5 h-5 transition-colors" fill={isFav ? "#ec4899" : "none"} stroke={isFav ? "#ec4899" : "currentColor"} viewBox="0 0 24 24" strokeWidth={1.5} style={{ color: isFav ? "#ec4899" : "#6b7280" }}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                      </svg>
                    </button>
                  </div>

                  <div className="flex gap-1.5 mt-2 relative z-10">
                    <span className={`text-xs px-2 py-0.5 rounded-full ${levelBadge[career.level]}`}>{career.level}</span>
                    <span className={`text-xs px-2 py-0.5 rounded-full ${demandBadge[career.demand]}`}>{career.demand} demand</span>
                  </div>
                  <p className="text-gray-500 text-xs mt-2 leading-relaxed relative z-10">{career.description}</p>

                  {/* Progress bar */}
                  <div className="mt-3 relative z-10">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-xs text-gray-500">Roadmap progress</span>
                      <span className="text-xs text-orange-400 font-medium">{progressPct}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-gray-800 rounded-full overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-orange-500 to-orange-400 transition-all duration-500" style={{ width: `${progressPct}%` }} />
                    </div>
                  </div>

                  {/* Take Quiz button */}
                  <button
                    onClick={() => openQuiz(career.title)}
                    className="mt-4 w-full bg-orange-500 hover:bg-orange-600 text-white text-xs font-semibold py-2 rounded-lg transition-colors relative z-10"
                  >
                    🧠 Take Quiz
                  </button>
                </div>

                {/* Tabs */}
                <div className="border-t border-gray-800 overflow-x-auto">
                  <div className="flex min-w-max">
                    {TABS.map((t) => (
                      <button key={t.key} onClick={() => setActiveTab({ ...activeTab, [career.title]: t.key })}
                        className={`text-xs px-3 py-2.5 whitespace-nowrap border-b-2 transition-all ${tab === t.key ? "border-orange-500 text-orange-400" : "border-transparent text-gray-500 hover:text-gray-300"}`}>
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Tab Content */}
                <div className="p-5 border-t border-gray-800">

                  {/* ROADMAP */}
                  {tab === "roadmap" && (
                    <div className="space-y-1">
                      {career.roadmap.map((r, i) => {
                        const done = !!stepsDone[i];
                        return (
                          <label key={i} className="flex gap-3 items-start cursor-pointer group py-2">
                            <input
                              type="checkbox"
                              checked={done}
                              onChange={() => toggleStep(career.title, i)}
                              className="mt-0.5 w-4 h-4 accent-orange-500 cursor-pointer flex-shrink-0"
                            />
                            <div>
                              <p className={`text-xs font-semibold transition-colors ${done ? "text-gray-500 line-through" : "text-white"}`}>{r.step}</p>
                              <p className={`text-xs mt-0.5 leading-relaxed transition-colors ${done ? "text-gray-600" : "text-gray-500"}`}>{r.description}</p>
                            </div>
                          </label>
                        );
                      })}
                    </div>
                  )}

                  {/* SKILLS */}
                  {tab === "skills" && (
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest">Must Know</p>
                        <div className="flex flex-wrap gap-1.5">
                          {career.skills.must.map((s) => (
                            <span key={s} className="text-xs px-2.5 py-1 rounded-md border bg-orange-500/10 text-orange-400 border-orange-500/30">{s}</span>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest">Good to Have</p>
                        <div className="flex flex-wrap gap-1.5">
                          {career.skills.good.map((s) => (
                            <span key={s} className="text-xs px-2.5 py-1 rounded-md bg-gray-800 text-gray-400 border border-gray-700">{s}</span>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* PROJECTS */}
                  {tab === "projects" && (
                    <div className="space-y-3">
                      {career.projects.map((p, i) => (
                        <div key={i} className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                          <div className="flex items-center justify-between mb-1">
                            <p className="text-white text-xs font-semibold">{p.title}</p>
                            <span className={`text-xs font-medium ${difficultyColor[p.difficulty]}`}>{p.difficulty}</span>
                          </div>
                          <p className="text-gray-500 text-xs leading-relaxed">{p.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* CERTIFICATIONS */}
                  {tab === "certifications" && (
                    <div className="space-y-2.5">
                      {career.certifications.map((c, i) => (
                        <div key={i} className="flex items-center justify-between bg-gray-800 rounded-lg p-3 border border-gray-700">
                          <div>
                            <p className="text-white text-xs font-semibold">{c.name}</p>
                            <p className="text-gray-500 text-xs mt-0.5">{c.provider}</p>
                          </div>
                          <button onClick={() => openLink(c.link)}
                            className="text-xs px-3 py-1 rounded-md text-white transition-colors flex-shrink-0 ml-3 bg-orange-500 hover:bg-orange-600">
                            View →
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* VIDEOS */}
                  {tab === "videos" && (
                    <div className="space-y-2.5">
                      {career.videos.map((v, i) => (
                        <div key={i} className="flex items-center justify-between bg-gray-800 rounded-lg p-3 border border-gray-700">
                          <div>
                            <p className="text-white text-xs font-semibold">{v.title}</p>
                            <p className="text-gray-500 text-xs mt-0.5">{v.channel}</p>
                          </div>
                          <button onClick={() => openLink(v.url)}
                            className="bg-red-600 hover:bg-red-700 text-white text-xs px-3 py-1 rounded-md flex-shrink-0 ml-3 transition-colors">
                            ▶ Watch
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* INTERVIEW */}
                  {tab === "interview" && (
                    <div className="space-y-2">
                      {career.interview.map((item, i) => (
                        <div key={i} className="border border-gray-700 rounded-lg overflow-hidden">
                          <button onClick={() => setExpandedInterview({ ...expandedInterview, [career.title]: expandedQ === i ? null : i })}
                            className="w-full flex items-center justify-between p-3 text-left hover:bg-gray-800 transition-colors">
                            <p className="text-white text-xs font-semibold pr-3">{i + 1}. {item.q}</p>
                            <span className="text-gray-500 text-xs flex-shrink-0">{expandedQ === i ? "▲" : "▼"}</span>
                          </button>
                          {expandedQ === i && (
                            <div className="px-3 pb-3 border-t border-gray-700">
                              <p className="text-gray-400 text-xs leading-relaxed pt-2">{item.a}</p>
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  {/* COMPANIES */}
                  {tab === "companies" && (
                    <div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        {career.companies.map((c) => (
                          <div key={c.name} className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2">
                            <p className="text-white text-xs font-semibold">{c.name}</p>
                            <p className={`text-xs ${companyTypeBadge[c.type]}`}>{c.type}</p>
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest">Growth Path</p>
                        <div className="flex items-center flex-wrap gap-1">
                          {career.growth.map((g, i) => (
                            <div key={g} className="flex items-center gap-1">
                              <span className="text-xs bg-gray-800 text-gray-300 px-2 py-1 rounded border border-gray-700">{g}</span>
                              {i < career.growth.length - 1 && <span className="text-orange-500 text-xs">→</span>}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* SALARY */}
                  {tab === "salary" && (
                    <div className="space-y-4">
                      <div>
                        <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest">🇮🇳 India</p>
                        <div className="grid grid-cols-3 gap-2">
                          {(["entry", "mid", "senior"] as const).map((lvl) => (
                            <div key={lvl} className="bg-gray-800 rounded-lg p-3 border border-gray-700 text-center">
                              <p className="text-gray-500 text-xs capitalize mb-1">{lvl}</p>
                              <p className="text-white text-xs font-semibold">{career.salary.india[lvl]}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest">🌍 Global</p>
                        <div className="grid grid-cols-3 gap-2">
                          {(["entry", "mid", "senior"] as const).map((lvl) => (
                            <div key={lvl} className="bg-gray-800 rounded-lg p-3 border border-gray-700 text-center">
                              <p className="text-gray-500 text-xs capitalize mb-1">{lvl}</p>
                              <p className="text-white text-xs font-semibold">{career.salary.global[lvl]}</p>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* RESOURCES */}
                  {tab === "resources" && (
                    <div className="space-y-2.5">
                      {career.resources.map((r, i) => (
                        <div key={i} className="flex items-center justify-between bg-gray-800 rounded-lg p-3 border border-gray-700">
                          <div className="flex items-center gap-2">
                            <span className={`text-xs px-2 py-0.5 rounded border ${resourceTypeColor[r.type]}`}>{r.type}</span>
                            <p className="text-white text-xs font-medium">{r.title}</p>
                          </div>
                          <button onClick={() => openLink(r.url)}
                            className="text-gray-400 hover:text-white text-xs ml-3 flex-shrink-0 transition-colors">
                            Open →
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* MORE INFO */}
                  {tab === "more" && (
                    <div className="space-y-5">
                      <div>
                        <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest">Tools Used</p>
                        <div className="flex flex-wrap gap-1.5">
                          {career.tools.map((t) => (
                            <span key={t} className="text-xs px-2.5 py-1 rounded-md bg-gray-800 text-gray-300 border border-gray-700">{t}</span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-gray-500 mb-2 uppercase tracking-widest">A Day in the Life</p>
                        <div className="space-y-1.5">
                          {career.dayInLife.map((d, i) => (
                            <div key={i} className="flex gap-2 items-start">
                              <span className="text-orange-500 text-xs mt-0.5">{i + 1}.</span>
                              <p className="text-gray-400 text-xs leading-relaxed">{d}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <p className="text-xs text-emerald-400 mb-2 uppercase tracking-widest">Pros</p>
                          <div className="space-y-1.5">
                            {career.pros.map((p, i) => (
                              <p key={i} className="text-gray-400 text-xs leading-relaxed">+ {p}</p>
                            ))}
                          </div>
                        </div>
                        <div>
                          <p className="text-xs text-red-400 mb-2 uppercase tracking-widest">Cons</p>
                          <div className="space-y-1.5">
                            {career.cons.map((c, i) => (
                              <p key={i} className="text-gray-400 text-xs leading-relaxed">– {c}</p>
                            ))}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-2.5">
                        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                          <p className="text-xs font-semibold text-white mb-1">🏠 Remote Opportunities</p>
                          <p className="text-gray-400 text-xs leading-relaxed">{career.remote}</p>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                          <p className="text-xs font-semibold text-white mb-1">💼 Freelancing Opportunities</p>
                          <p className="text-gray-400 text-xs leading-relaxed">{career.freelance}</p>
                        </div>
                        <div className="bg-gray-800 rounded-lg p-3 border border-gray-700">
                          <p className="text-xs font-semibold text-white mb-1">🔮 Future Scope</p>
                          <p className="text-gray-400 text-xs leading-relaxed">{career.futureScope}</p>
                        </div>
                      </div>
                    </div>
                  )}

                </div>
              </div>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20 text-gray-600 text-sm">
            No career paths match your search.
          </div>
        )}

      </div>

      {/* QUIZ POPUP MODAL */}
      {quizCard && currentQuiz && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
          <div className="bg-gray-900 rounded-xl border border-orange-500/40 w-full max-w-2xl max-h-[85vh] overflow-y-auto p-6 shadow-[0_0_40px_-10px_rgba(249,115,22,0.4)]">
            <div className="flex items-center justify-between mb-6 sticky top-0 bg-gray-900 pb-3 -mt-1 pt-1">
              <h2 className="text-white font-bold text-lg">🧠 {quizCard} Quiz</h2>
              <button onClick={closeQuiz} className="text-gray-400 hover:text-white text-xl px-2" aria-label="Close quiz">✕</button>
            </div>

            {!quizSubmitted ? (
              <>
                <div className="space-y-6">
                  {currentQuiz.quiz.map((q, i) => (
                    <div key={i}>
                      <p className="text-white text-sm font-semibold mb-3">{i + 1}. {q.question}</p>
                      <div className="space-y-2">
                        {q.options.map((opt, j) => (
                          <button key={j} onClick={() => setQuizAnswers({ ...quizAnswers, [i]: j })}
                            className={`w-full text-left px-4 py-2.5 rounded-lg text-xs border transition-all ${quizAnswers[i] === j ? "bg-orange-500 text-white border-orange-500" : "bg-gray-800 text-gray-300 border-gray-600 hover:border-orange-400"}`}>
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
                <button onClick={() => setQuizSubmitted(true)}
                  disabled={Object.keys(quizAnswers).length < currentQuiz.quiz.length}
                  className="mt-6 w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 disabled:cursor-not-allowed text-white py-3 rounded-lg font-semibold text-sm transition-colors">
                  Submit Quiz ({Object.keys(quizAnswers).length}/{currentQuiz.quiz.length} answered)
                </button>
              </>
            ) : (
              <div className="text-center">
                <div className="text-6xl mb-4">{score >= 8 ? "🎉" : score >= 5 ? "👍" : "📚"}</div>
                <p className="text-white text-2xl font-bold mb-2">{score}/10</p>
                <p className="text-gray-400 text-sm mb-6">
                  {score >= 8 ? "Excellent! You know this field well!" : score >= 5 ? "Good job! Keep learning!" : "Keep studying the roadmap!"}
                </p>
                <div className="space-y-3 text-left mb-6">
                  {currentQuiz.quiz.map((q, i) => (
                    <div key={i} className={`p-3 rounded-lg text-xs ${quizAnswers[i] === q.answer ? "bg-green-900/30 border border-green-700" : "bg-red-900/30 border border-red-700"}`}>
                      <p className="text-white font-semibold mb-1">{i + 1}. {q.question}</p>
                      <p className={quizAnswers[i] === q.answer ? "text-green-400" : "text-red-400"}>
                        Your answer: {q.options[quizAnswers[i]]}
                      </p>
                      {quizAnswers[i] !== q.answer && <p className="text-green-400">Correct: {q.options[q.answer]}</p>}
                    </div>
                  ))}
                </div>
                <div className="flex gap-3">
                  <button onClick={() => { setQuizAnswers({}); setQuizSubmitted(false); }}
                    className="flex-1 bg-orange-500 hover:bg-orange-600 text-white py-2.5 rounded-lg text-sm font-semibold transition-colors">
                    Retry Quiz
                  </button>
                  <button onClick={closeQuiz}
                    className="flex-1 bg-gray-800 hover:bg-gray-700 text-white py-2.5 rounded-lg text-sm font-semibold border border-gray-700 transition-colors">
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}