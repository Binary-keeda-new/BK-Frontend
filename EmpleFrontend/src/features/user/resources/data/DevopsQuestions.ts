
  import { InterviewQuestion } from "../types/interviewQuestion";

  export const DEVOPS_QUESTIONS: InterviewQuestion[] = [
    {
      id: 1,
      question: "What does DevOps mean?",
      answer: `DevOps is a methodology in software development that merges **Development (Dev)** and **IT Operations
  (Ops)** to automate and optimize the entire process of software creation, testing, deployment, and maintenance.

  It emphasizes **collaboration, automation, and ongoing enhancement**, enabling organizations to deliver software more
  rapidly, efficiently, and with fewer mistakes.

  DevOps incorporates **Continuous Integration/Continuous Deployment (CI/CD)**, **Infrastructure as Code (IaC)**,
  monitoring, and automation to guarantee smooth building, testing, and release of software.`,
      companies: ["Amazon", "TCS", "Infosys", "Accenture", "IBM"],
    },
    {
      id: 2,
      question: "Who is a DevOps Engineer?",
      answer: `A DevOps Engineer is a specialist who blends **software development (Dev)** expertise with **IT
  operations (Ops)** skills to enhance and streamline the software development, testing, and deployment workflows.

  Their objective is to ensure **fast, efficient, and dependable** software delivery. They focus on automating and
  integrating workflows between development and IT teams, enabling continuous integration and continuous delivery of
  software.`,
      companies: ["Wipro", "Cognizant", "Capgemini", "Tech Mahindra", "Infosys"],
    },
    {
      id: 3,
      question: "Which programming and scripting languages are essential to learn for becoming a DevOps Engineer?",
      answer: `To become a proficient DevOps Engineer, mastering both programming and scripting languages is crucial.
  The recommended languages include:

  **Programming languages:**
  - Golang
  - Java
  - Ruby

  **Scripting languages:**
  - Bash
  - Python
  - Groovy
  - Powershell`,
      companies: ["Amazon", "Microsoft", "Infosys", "HCL", "Accenture"],
    },
    {
      id: 4,
      question: "What is the purpose of SSH?",
      answer: `SSH (Secure Shell) is a cryptographic network protocol that enables secure communication between two
  systems over an unsecured network. It encrypts data transmissions, protecting sensitive information like passwords and
  commands from interception.

  **SSH allows users to:**
  - Remotely log in and control servers securely from any location.
  - Transfer files safely using tools such as \`scp\` or \`sftp\`.
  - Perform port forwarding and tunneling to create encrypted channels for other applications.
  - Automate logins using SSH keys, facilitating seamless execution of scripts and configuration tools like Ansible.`,
      companies: ["Red Hat", "IBM", "Cisco", "Amazon", "TCS"],
    },
    {
      id: 5,
      question: "Can you explain what CI/CD stands for?",
      answer: `CI/CD refers to automating the integration of code changes from multiple developers into a shared
  codebase. It is a development practice where developers frequently commit their work to a central repository (like
  GitHub or Stash).

  **Continuous Integration** involves developers committing regularly to a shared repository via version control (e.g.,
  Git). Automated pipelines then build, store artifacts, run unit tests, and conduct code reviews using tools such as
  Sonar.

  **Continuous Delivery** enables developers to test code in production-like environments to avoid last-minute
  surprises. It includes UI testing, load testing, integration testing, and helps identify and fix bugs proactively.`,
      imageUrls: ["/images/interview-questions/devops/Q5.png"],
      imageCaptions: ["Figure 5: ★ CI/CD Pipeline"],
      companies: ["Amazon", "Google", "Atlassian", "GitLab", "Infosys"],
    },
    {
      id: 6,
      question: "How do Horizontal Scaling and Vertical Scaling differ?",
      answer: `**Horizontal Scaling**

  This involves adding more machines or servers to distribute the workload. Instead of upgrading one server, multiple
  servers share the load.

  It's like opening more checkout lanes in a store to serve more customers simultaneously. This approach handles high
  user traffic efficiently, with the ability to add servers as needed.

  It also improves reliability—if one server fails, others continue functioning. However, managing multiple servers is
  complex and often requires load balancers to distribute traffic evenly.

  **Vertical Scaling**

  This entails enhancing the capacity of a single machine by adding more memory, faster CPUs, or larger storage.

  It's similar to upgrading your personal computer's hardware to boost performance without changing the machine itself.
  This approach is simpler to manage and suits applications with steady traffic.

  However, there are physical limits to upgrades, and server restarts during upgrades might cause short downtime.`,
      companies: ["Amazon", "Microsoft", "Google", "Netflix", "Flipkart"],
    },
    {
      id: 7,
      question: "What is the Blue/Green Deployment strategy?",
      answer: `Blue/Green Deployment involves deploying two versions of an application simultaneously: a stable version
  and a new version with features or fixes. Traffic is routed partially to the new version to verify its stability in
  production.

  **Blue Deployment** is the primary and stable production version.

  **Green Deployment** is a clone with new changes, receiving some traffic to test. If issues arise, they can be fixed
  before promoting Green to Blue, minimizing production failures.`,
      companies: ["Amazon", "Netflix", "Microsoft", "Red Hat", "Capital One"],
    },
    {
      id: 8,
      question: "How do DevOps and Agile methodologies differ?",
      answer: `**Agile** is a methodology focused on the development process, emphasizing iterative and flexible planning. It is about how software development is organized, applicable across departments with a focus on continuous improvements.

  **DevOps**, on the other hand, emphasizes continuous testing and deployment, focusing on reliably delivering software. It is more about software deployment and infrastructure management, selecting the safest and most dependable paths.`,
      imageUrls: ["/images/interview-questions/devops/Q8.png"],
      imageCaptions: ["Figure 8: ★ DevOps vs Agile"],
      companies: ["Accenture", "IBM", "Cognizant", "Capgemini", "TCS"],
    },
    {
      id: 9,
      question: "What is involved in the continuous testing process?",
      answer: `Continuous testing is the automated process of executing tests on software continuously as soon as
  developers submit code. Testing occurs at every phase, from early development stages through deployment, ensuring
  quality throughout.`,
      companies: ["Microsoft", "Atlassian", "Infosys", "Wipro", "Accenture"],
    },
    {
      id: 10,
      question: "What role does AWS play in DevOps?",
      answer: `AWS plays a significant role in DevOps by providing services for automating CI/CD pipelines,
  Infrastructure as Code (IaC), container orchestration, monitoring, and security, streamlining software development and
  deployment.

  Services like **AWS CodePipeline, CodeBuild, and CodeDeploy** facilitate automated CI/CD workflows. **CloudFormation
  and Terraform** enable infrastructure provisioning. **Amazon ECS, EKS, and Fargate** manage containers, while
  **CloudWatch, X-Ray, and CloudTrail** provide monitoring and security.

  Additional tools like **Auto Scaling, ELB, and AWS Lambda** enhance scalability, availability, and serverless
  computing. Integration with Jenkins, GitHub, and Terraform makes AWS a cost-effective and efficient cloud DevOps
  platform.`,
      companies: ["Amazon", "Accenture", "Capgemini", "TCS", "Cognizant"],
    },
    {
      id: 11,
      question: "What is meant by Configuration Management?",
      answer: `Configuration Management refers to the process of controlling and documenting changes within a
  development system. It is part of change management and allows large teams to collaborate in a stable environment
  while retaining flexibility for innovation.`,
      companies: ["Red Hat", "HashiCorp", "IBM", "Puppet", "Accenture"],
    },
    {
      id: 12,
      question: "How would you define Infrastructure as Code (IaC)?",
      answer: `Infrastructure as Code (IaC) is the practice of managing and provisioning IT infrastructure through code
  rather than manual configuration. This enables automation, consistency, and efficiency, especially useful in DevOps
  environments where infrastructure frequently changes.

  Instead of manual setups, desired infrastructure is defined via code files using tools like **Terraform, Ansible, or
  CloudFormation**. These code files can be version-controlled, reused, tested, and automated like application code.

  **Benefits of IaC include:**

  - **Consistency:** Identical configurations every time, reducing errors.
  - **Automation:** Quick environment setup and teardown.
  - **Scalability:** Easily adjust infrastructure by modifying code.
  - **Versioning:** Track and revert changes using version control systems.`,
      imageUrls: ["/images/interview-questions/devops/Q12.png"],
      imageCaptions: ["Figure 12: ★ Infrastructure as Code (IaC)"],
      companies: ["HashiCorp", "Amazon", "Microsoft", "Red Hat", "Google"],
    },
    {
      id: 13,
      question: "Could you explain the concept of branching in Git?",
      answer: `Branching in Git allows creating separate development lines within a project. A branch acts as a pointer
  to a specific commit in the Git history.

  By default, Git starts with a main branch (\`main\` or \`master\`). Creating a new branch copies the project's
  history, allowing development of new features or fixes without affecting the main codebase.

  Branches operate independently until merged, enabling parallel development by multiple developers. Common strategies
  include **Feature Branching, Git Flow, and Trunk-Based Development**.

  **Example:**
  - \`main\` branch contains stable code.
  - \`feature/login\` branch is used for a new login feature under development.

  After testing, \`feature/login\` merges back into \`main\`.`,
      imageUrls: ["/images/interview-questions/devops/Q13.png"],
      imageCaptions: ["Figure 13: ★ Git Branching"],
      companies: ["Atlassian", "GitHub", "Microsoft", "Infosys", "TCS"],
    },
    {
      id: 14,
      question: "What does Git stash do?",
      answer: `The Git stash command allows a developer to save changes temporarily without committing them. This helps
  switch branches or work on other tasks without losing current modifications. The stash stores the current working
  state and can be reapplied later when needed.`,
      companies: ["GitLab", "Atlassian", "Wipro", "Cognizant", "Infosys"],
    },
    {
      id: 15,
      question: "What is a Git Repository?",
      answer: `A Git repository is a storage location containing a project's files and their version histories. The
  repository enables importing files to a local machine for updating and modification. Version Control Systems (VCS)
  create and manage these versions, storing them centrally in the repository.`,
      companies: ["GitHub", "Atlassian", "TCS", "Infosys", "Accenture"],
    },
    {
      id: 16,
      question: "Can you name three key KPIs in DevOps?",
      answer: `Three crucial DevOps KPIs include:

  - **Deployment Frequency (DF):** Measures how often new code is released to production. Higher frequency indicates
  faster delivery.
  - **Mean Time to Recovery (MTTR):** Tracks how quickly the system recovers from failures. Faster recovery means better
  resilience.
  - **Change Failure Rate (CFR):** Percentage of deployments causing issues in production. Lower rates indicate stable
  releases.

  Monitoring these KPIs helps teams enhance release speed, fix problems promptly, and maintain quality.`,
      companies: ["Amazon", "Microsoft", "Netflix", "IBM", "Accenture"],
    },
    {
      id: 17,
      question: "What is Jenkins?",
      answer: `Jenkins is an open-source automation server designed to build, test, and deploy software. Written in
  Java, it runs on the Java Runtime Environment (JRE). Jenkins automates Continuous Integration (CI) and Continuous
  Delivery (CD) by handling repetitive tasks throughout the software lifecycle.

  Supporting hundreds of plugins integrating with tools like **Git, Maven, Docker, and Kubernetes**, Jenkins is highly
  adaptable. It helps developers detect issues early, improve code quality, and accelerate delivery by automating
  workflows from code commit to production.`,
      companies: ["CloudBees", "Amazon", "Infosys", "Accenture", "Capgemini"],
    },
    {
      id: 18,
      question: "What is the function of the cherry-pick command in Git?",
      answer: `Git cherry-pick allows selecting a specific commit from one branch and applying it to another branch.
  Unlike merge or rebase, which typically apply multiple commits, cherry-pick focuses on individual commits.

  The command syntax is:

  \`git cherry-pick <commit-hash>\``,
      companies: ["Atlassian", "GitLab", "Microsoft", "Wipro", "Infosys"],
    },
    {
      id: 19,
      question: "What does the sudo command do in Linux?",
      answer: `The \`sudo\` (Super User DO) command in Linux runs commands with elevated privileges. Prefixing a command
  with \`sudo\` executes it as a superuser or another authorized user, similar to "Run as administrator" on Windows. It
  allows users with proper permissions to perform administrative tasks.`,
      companies: ["Red Hat", "IBM", "Canonical", "Amazon", "TCS"],
    },
    {
      id: 20,
      question: "What is the difference between Git fetch and Git pull?",
      answer: `**Git fetch** downloads changes from a remote repository to the local repository without merging them
  into the working directory. It updates repository data for review but does not affect current files.

  Command: \`git fetch <remote>\`

  **Git pull** fetches changes and automatically merges them into the current working directory, updating files
  immediately.

  Command: \`git pull <remote> <branch>\``,
      imageUrls: ["/images/interview-questions/devops/Q20.png"],
      imageCaptions: ["Figure 20: ★ Git Fetch vs Git Pull"],
      companies: ["GitHub", "Atlassian", "Microsoft", "Infosys", "Cognizant"],
    },
    {
      id: 21,
      question: "What are the main components of Selenium?",
      answer: `Selenium is a robust tool for automating web browsers. It supports all major browsers and operating
  systems, with scripts written in languages like Python, Java, and C#. The four main Selenium components are:

  - Selenium IDE
  - Selenium RC
  - Selenium WebDriver
  - Selenium Grid`,
      companies: ["Selenium", "Infosys", "Cognizant", "Accenture", "Capgemini"],
    },
    {
      id: 22,
      question: "What role does Puppet play in DevOps?",
      answer: `Puppet is an open-source automation tool for configuration management. It allows administrators to define
  infrastructure as code using Puppet's domain-specific language instead of custom scripts. Puppet ensures systems
  revert to desired states if altered accidentally.`,
      companies: ["Puppet", "Red Hat", "IBM", "Accenture", "HCL"],
    },
    {
      id: 23,
      question: "What is Ansible?",
      answer: `Ansible is an open-source automation tool for configuration management, application deployment, and task
  automation. It allows admins and DevOps teams to manage many servers from a central machine without installing agents.

  **Key features:**
  - **Agentless:** Operates over SSH, no client installation needed.
  - Uses **YAML playbooks** for simple, human-readable automation.
  - Scalable from few to thousands of servers.
  - Versatile for provisioning, patching, orchestration, and cloud automation.

  **Example:** Deploying a web app across 50 servers with one command ensures uniform configuration.`,
      imageUrls: ["/images/interview-questions/devops/Q23.png"],
      imageCaptions: ["Figure 23: ★ Ansible Automation"],
      companies: ["Red Hat", "IBM", "Amazon", "Accenture", "Capgemini"],
    },
    {
      id: 24,
      question: "How would you define Automation Testing?",
      answer: `Automation Testing involves writing scripts to test software automatically, replacing manual testing. It
  allows repetitive tasks to be executed without human intervention, increasing efficiency and consistency.`,
      companies: ["Selenium", "Microsoft", "Infosys", "Wipro", "Cognizant"],
    },
    {
      id: 25,
      question: "Why is continuous feedback important in DevOps?",
      answer: `Continuous feedback in software development is an iterative process where constant reviews, comments, and
  critiques are provided throughout the development lifecycle. It ensures developers receive timely insights into code
  quality and functionality, promoting improvements and minimizing defects.`,
      companies: ["Atlassian", "Microsoft", "IBM", "Accenture", "TCS"],
    },
    {
      id: 26,
      question: "What is Git Bash?",
      answer: `Git Bash is a command-line interface for Windows that enables users to interact with Git, the version
  control system. Tasks like cloning repositories, committing changes, and pushing/pulling updates are performed through
  Git Bash. It also supports scripting to automate manual tasks and helps users learn Git commands.`,
      companies: ["GitHub", "Atlassian", "Infosys", "TCS", "Wipro"],
    },
    {
      id: 27,
      question: "What does Git squashing mean?",
      answer: `Git squashing combines multiple commits into a single commit to clean up history and maintain an
  organized timeline. It's typically done before merging feature branches or creating pull requests.`,
      companies: ["GitLab", "Atlassian", "Microsoft", "Cognizant", "Infosys"],
    },
    {
      id: 28,
      question: "What causes a merge conflict in Git?",
      answer: `A merge conflict happens when two developers modify the same file or the same lines of code on different
  branches, causing conflicts during merging. These conflicts must be resolved manually before completing the merge.`,
      companies: ["GitHub", "Atlassian", "Microsoft", "Infosys", "Accenture"],
    },
    {
      id: 29,
      question: "What is the purpose of Git prune?",
      answer: `Git prune removes objects that are unreachable from any branch, cleaning up unneeded files in the
  repository. It helps maintain a tidy working directory after project work is done.

  Command example:

  \`git fetch --prune\``,
      companies: ["GitLab", "Atlassian", "Wipro", "Infosys", "Capgemini"],
    },
    {
      id: 30,
      question: "How do HTTP and HTTPS differ?",
      answer: `**HTTP** transmits data in plaintext without encryption and does not require certificates. It does not
  enhance search engine ranking.

  **HTTPS** encrypts data before transmission, using SSL certificates to secure communication. It improves search engine
  ranking by providing secure connections.`,
      imageUrls: ["/images/interview-questions/devops/Q30.png"],
      imageCaptions: ["Figure 30: ★ HTTP vs HTTPS"],
      companies: ["Cloudflare", "Google", "Amazon", "Microsoft", "TCS"],
    },
    {
      id: 31,
      question: "What are Virtual Machines (VMs)?",
      answer: `In DevOps, Virtual Machines (VMs) provide isolated environments for development, testing, and deployment.
  They abstract physical hardware resources, allowing multiple OS instances to run independently on a single host using
  hypervisors like VirtualBox or VMware.

  While VMs are popular in cloud computing and CI/CD pipelines, containers like Docker are preferred for being
  lightweight, faster, and more scalable for microservices and cloud-native apps.`,
      companies: ["VMware", "Microsoft", "Amazon", "Red Hat", "IBM"],
    },
    {
      id: 32,
      question: "What distinguishes Continuous Deployment from Continuous Delivery?",
      answer: `**Continuous Delivery** means code is always ready for deployment, but a manual action triggers the release. It provides control over when changes go live, suitable for regulated environments. Setup is moderately difficult.

  **Continuous Deployment** automates the entire process, deploying code immediately after passing tests. It offers fast feedback but requires robust testing and monitoring. Setup is complex but ideal for frequent updates.`,
      imageUrls: ["/images/interview-questions/devops/Q32.png"],
      imageCaptions: ["Figure 32: ★ Continuous Deployment vs Continuous Delivery"],
      companies: ["Amazon", "Google", "GitLab", "Netflix", "Accenture"],
    },
    {
      id: 33,
      question: "What are the various phases in the DevOps methodology?",
      answer: `DevOps methodology consists of interconnected phases forming a cycle, not a linear path:

  - **Planning:** Defining project goals and task organization.
  - **Development:** Writing code and storing it in repositories.
  - **Continuous Integration:** Automating build and test processes.
  - **Deployment:** Automating release of software to production.
  - **Operations:** Maintaining and managing infrastructure.
  - **Monitoring:** Tracking performance and resolving issues.

  Each phase uses specific tools like **Asana, Git, Jenkins, AWS, Loggly, and Nagios** to support efficient workflows.`,
      companies: ["Amazon", "IBM", "Accenture", "Capgemini", "Infosys"],
    },
    {
      id: 34,
      question: "What are DevOps antipatterns, and how can they be avoided?",
      answer: `Antipatterns are practices that hinder DevOps success, often focusing on short-term gains at the cost of
  long-term stability.

  **Common antipatterns:**
  - Siloed teams causing delays and blame.
  - Manual deployments leading to errors.
  - Single-person knowledge creating risks.
  - Ignoring monitoring and logs.
  - Overemphasis on tools rather than culture.

  **Avoidance** involves promoting collaboration, automation, knowledge sharing, monitoring, and fostering a strong
  DevOps culture.`,
      companies: ["Microsoft", "IBM", "Red Hat", "Accenture", "Netflix"],
    },
    {
      id: 35,
      question: "What does the Component-Based Model (CBM) refer to in DevOps?",
      answer: `The Component-Based Model (CBM) uses object-oriented technologies focusing on classes that encapsulate
  data and algorithms. In CBM, these classes become reusable components used to assemble applications.`,
      companies: ["IBM", "Accenture", "Cognizant", "Capgemini", "TCS"],
    },
    {
      id: 36,
      question: "How can you create a CI/CD pipeline using Jenkins?",
      answer: `Creating a CI/CD pipeline in Jenkins automates building, testing, and deploying applications, boosting
  productivity and quality.

  **Steps include:**
  - Installing Jenkins and necessary plugins.
  - Configuring tools like JDK, Maven, Docker.
  - Setting up credentials for Git and servers.
  - Creating a pipeline job with defined stages: Build, Test, Deploy.
  - Connecting Jenkins to Git for automatic triggers.
  - Monitoring builds and securing credentials.`,
      imageUrls: ["/images/interview-questions/devops/Q36.png"],
      imageCaptions: ["Figure 36: ★ CI/CD Pipeline in Jenkins"],
      companies: ["CloudBees", "Amazon", "Accenture", "Infosys", "Capgemini"],
    },
    {
      id: 37,
      question: "What are the differences between Chef and Puppet?",
      answer: `**Chef** requires Ruby programming knowledge and is common in small to medium companies. Its
  communication is slower, and it lacks error visibility during installation.

  **Puppet** uses DSL programming, favored by large enterprises. It offers faster communication and error visibility at
  installation, easing setup.`,
      companies: ["Chef", "Puppet", "Red Hat", "IBM", "Accenture"],
    },
    {
      id: 38,
      question: "What is Git rebase?",
      answer: `Git rebase integrates commits from one branch onto another by appending them, creating a linear, cleaner
  project history. This simplifies project navigation by avoiding forks.

  Syntax example:

  \`git rebase [-i | --interactive] [options] [--exec cmd] [--onto newbase | --keep-base] [upstream [branch]]\``,
      companies: ["Atlassian", "GitLab", "Microsoft", "Google", "Infosys"],
    },
    {
      id: 39,
      question: "What does the Selenium Tool Suite consist of?",
      answer: `Selenium is an open-source suite for automating web browsers and testing web applications. It includes:

  - Selenium IDE
  - Selenium WebDriver
  - Selenium Grid
  - Selenium Remote Control (deprecated)`,
      companies: ["Selenium", "Infosys", "Cognizant", "Wipro", "Accenture"],
    },
    {
      id: 40,
      question: "What is Selenium IDE?",
      answer: `Selenium IDE is an open-source tool that records user actions on a website and replays them as automated
  tests. It requires minimal programming skills, making it accessible for simple test automation.`,
      companies: ["Selenium", "Infosys", "Cognizant", "Capgemini", "Wipro"],
    },
    {
      id: 41,
      question: "Can you explain the Banker's Algorithm in Operating Systems?",
      answer: `The Banker's Algorithm is a resource allocation and deadlock avoidance method that simulates resource
  requests and tests system safety before granting allocations, preventing deadlocks.`,
      companies: ["Microsoft", "Amazon", "Adobe", "Oracle", "Samsung"],
    },
    {
      id: 42,
      question: "How do you back up and copy files in Jenkins?",
      answer: `In Jenkins, backups are created by copying the \`JENKINS_HOME\` directory containing configurations and
  job data. Files can be copied using pipeline scripts with shell (\`sh\`) or batch (\`bat\`) commands. Plugins like
  **ThinBackup** enable scheduled backups.`,
      companies: ["CloudBees", "Accenture", "Infosys", "Capgemini", "Wipro"],
    },
    {
      id: 43,
      question: "How do you set up a job in Jenkins?",
      answer: `To set up a Jenkins job:

  - Log in to Jenkins.
  - Click "New Item."
  - Name the job and select its type.
  - Configure source code management and triggers.
  - Add build steps like shell commands.
  - Save and trigger the build.`,
      imageUrls: ["/images/interview-questions/devops/Q43.png"],
      imageCaptions: ["Figure 43: ★ Setting Up a Job in Jenkins"],
      companies: ["CloudBees", "Amazon", "Infosys", "Accenture", "TCS"],
    },
    {
      id: 44,
      question: "Can you describe Docker's architecture?",
      answer: `Docker architecture includes:

  - **Docker Client:** CLI for issuing commands.
  - **Docker Daemon:** Manages images, containers, networks.
  - **Docker Images:** Read-only templates for containers.
  - **Docker Containers:** Lightweight runnable instances.
  - **Docker Registry:** Stores images (e.g., Docker Hub).
  - **Docker Compose:** Defines multi-container apps.
  - **Docker Networking:** Enables container communication.`,
      imageUrls: ["/images/interview-questions/devops/Q44.png"],
      imageCaptions: ["Figure 44: ★ Docker Architecture"],
      companies: ["Docker", "Amazon", "Google", "Red Hat", "Microsoft"],
    },
    {
      id: 45,
      question: "What is the life cycle of DevOps?",
      answer: `The DevOps lifecycle involves phases to integrate development and operations for faster software
  delivery:

  - Continuous Development
  - Continuous Integration
  - Continuous Testing
  - Continuous Deployment/Delivery
  - Continuous Monitoring
  - Continuous Feedback
  - Continuous Operations`,
      imageUrls: ["/images/interview-questions/devops/Q45.png"],
      imageCaptions: ["Figure 45: ★ DevOps Lifecycle"],
      companies: ["IBM", "Accenture", "Capgemini", "TCS", "Infosys"],
    },
    {
      id: 46,
      question: "How do Git merge and Git rebase differ?",
      answer: `**Git Merge** combines two branches preserving history and is simpler, suited for less active main
  branches.

  **Git Rebase** reapplies commits onto another base, creating a linear history but rewriting it, ideal for frequently
  active main branches.`,
      companies: ["Atlassian", "GitHub", "Microsoft", "Google", "Infosys"],
    },
    {
      id: 47,
      question: "What is the difference between DataOps and DevOps?",
      answer: `**DataOps** focuses on automating data integration, governance, and delivery, enhancing data reliability
  and accessibility.

  **DevOps** emphasizes automation of software development, testing, deployment, and infrastructure management to
  improve uptime and delivery speed.`,
      imageUrls: ["/images/interview-questions/devops/Q47.png"],
      imageCaptions: ["Figure 47: ★ DataOps vs DevOps"],
      companies: ["IBM", "Microsoft", "Accenture", "Google", "Capgemini"],
    },
    {
      id: 48,
      question: "What are the 7Cs of DevOps?",
      answer: `The 7 Cs of DevOps are:

  - Continuous Integration
  - Continuous Testing
  - Continuous Delivery
  - Continuous Deployment
  - Continuous Monitoring
  - Continuous Feedback
  - Continuous Operations`,
      companies: ["IBM", "Accenture", "Capgemini", "Infosys", "Cognizant"],
    },
    {
      id: 49,
      question: 'What does the "shift left to reduce failure" concept mean in DevOps?',
      answer: `"Shift left" in DevOps means incorporating testing and security checks earlier in development to detect
  and fix issues early, reducing failures and improving pipeline efficiency.`,
      companies: ["Microsoft", "IBM", "Amazon", "Accenture", "Red Hat"],
    },
    {
      id: 50,
      question: 'Can you explain Infrastructure as Code (IaC) and discuss its benefits and challenges when implemented in a large-scale production environment?',
      answer: `Infrastructure as Code (IaC) manages IT infrastructure via code files instead of manual setups, enabling
  faster deployment, consistency, scalability, and easier management.

  **Benefits** include automation, error reduction, and version control.

  **Challenges** involve initial learning curves, managing complex codebases, and ensuring security and compliance in
  large-scale environments.`,
      companies: ["HashiCorp", "Amazon", "Microsoft", "Netflix", "Google"],
    },
  ];