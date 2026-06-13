import { InterviewQuestion } from "../types/interviewQuestion";

export const CN_QUESTIONS: InterviewQuestion[] = [
  {
    id: 1,
    question: "How are different types of networks categorized?",
    answer: `Network types are classified based on the **geographical area** they cover or the extent of their distribution.

**PAN (Personal Area Network):**
- Allows devices to connect and communicate within the **immediate range of an individual**.
- Example: Bluetooth connections between personal devices.

**LAN (Local Area Network):**
- A privately owned network that functions within a **limited area** such as a single building.
- Example: Home networks, office networks, factory networks.

**MAN (Metropolitan Area Network):**
- Connects devices across an **entire city**.
- Example: Cable TV networks covering a metropolitan area.

**WAN (Wide Area Network):**
- Covers a **broad geographical area**, often spanning countries or continents.
- Example: The Internet is the largest WAN.

**GAN (Global Area Network):**
- Also referred to as the Internet, connects systems **globally using satellite technology**.
- Commonly called a network of WANs.`,
    companies: ["Cisco", "Amazon", "Microsoft", "TCS", "Infosys"],
  },
  {
    id: 2,
    question: "What is a Local Area Network (LAN), and how does it function?",
    answer: `A **Local Area Network (LAN)** is extensively used to connect computers, laptops, and consumer electronics to facilitate **resource sharing** such as printers and fax machines, as well as to exchange information.

**Key Characteristics:**
- Privately owned and operates within a **limited geographical area**.
- When deployed by businesses, often termed **enterprise networks**.

**Two Forms of LAN:**

**Wireless LAN (WLAN):**
- Uses **Wi-Fi technology** and does not require physical cables.
- Increasingly popular in environments where wiring is impractical or difficult to install.

**Wired LAN:**
- Uses **LAN cables (Ethernet)** for connectivity.
- Generally more reliable and faster than wireless connections.

**Common Uses:**
- File and resource sharing (printers, storage).
- Internal communication within organizations.
- Internet access sharing across multiple devices.`,
    companies: ["Cisco", "Microsoft", "TCS", "Infosys", "Wipro"],
  },
  {
    id: 3,
    question: "Can you explain what nodes and links are in a network?",
    answer: `**Node:**
- A node is any **device capable of communicating within a network**.
- It is a connection point where data can be **sent or received**.
- Examples: Computers, laptops, printers, servers, and modems.

**Link:**
- A link represents the **connection between two nodes** in a network.
- Defines how nodes are **physically or wirelessly connected**.
- Includes the **communication protocols** that enable one node to communicate with another.

**Types of Links:**

**Wired Links:**
- Physical cables such as Ethernet, fiber optic, or coaxial cables.
- Generally faster and more reliable.

**Wireless Links:**
- Connections via Wi-Fi, Bluetooth, or cellular networks.
- More flexible but potentially less reliable.

**Key Point:**
- Together, nodes and links form the fundamental building blocks of any network — nodes are the endpoints and links are the pathways connecting them.`,
    companies: ["Cisco", "Amazon", "TCS", "Infosys", "Cognizant"],
  },
  {
    id: 4,
    question: "What does the term network topology mean?",
    answer: `**Network topology** refers to the **physical or logical arrangement of nodes and the connections (links)** between them in a network.

It illustrates how various computers, devices, and cables are interconnected.

**Two Types of Topology:**

**Physical Topology:**
- Describes the **actual physical layout** of the network — how devices are physically connected using cables and hardware.

**Logical Topology:**
- Describes how **data flows** through the network, regardless of the physical layout.

**Why Topology Matters:**
- Determines **network performance** and efficiency.
- Affects **fault tolerance** — how well the network handles failures.
- Influences **cost and complexity** of installation and maintenance.
- Impacts **scalability** — how easily the network can grow.

**Example:**
- A star topology where all devices connect to a central switch is common in offices because it is easy to manage and a single cable failure only affects one device.`,
    companies: ["Cisco", "Microsoft", "TCS", "Infosys", "Wipro"],
  },
  {
    id: 5,
    question: "What are the various types of network topologies?",
    answer: `**Bus Topology:**
- All nodes connect to a **single central cable** called the bus.
- Suitable for a small number of devices.
- If the main bus cable fails, the **entire network is affected**.

**Star Topology:**
- Each node connects to a **central hub or switch**.
- More reliable — failure of one peripheral node doesn't affect others.
- If the **central node fails**, the whole network collapses.
- Commonly used in **homes and offices**.

**Ring Topology:**
- Every node connects to **exactly two other nodes**, forming a ring.
- A failure in any single node can **disrupt the entire network**.
- Rarely used due to complexity and cost.

**Mesh Topology:**
- Each node is **interconnected with multiple other nodes**.
- Highly robust — failure of one link only isolates the affected node.
- Infrequent due to difficulty in **installation and management**.

**Tree Topology:**
- Combination of **star and bus topologies**.
- Multiple star networks connected to a single bus.
- If the main bus fails, the **entire network is compromised**.

**Hybrid Topology:**
- A mixture of **two or more different topologies** to leverage advantages of each.`,
    imageUrls: ["/images/interview-questions/cn/Q5.png"],
    imageCaptions: ["Figure 5: ★ Network Topologies (Bus, Star, Ring, Mesh, Tree, Hybrid)"],
    companies: ["Cisco", "Microsoft", "TCS", "Infosys", "Cognizant"],
  },
  {
    id: 6,
    question: "What defines an IPv4 address, and what are its different classes?",
    answer: `An **IPv4 address** is a **32-bit address** assigned dynamically or statically to devices on a network. It is composed of **four 8-bit segments called octets**, with each octet ranging from 0 to 255.

IPv4 addresses are grouped into **five classes** based on network size and number of hosts:

**Class A:**
- Range: **0.0.0.0 to 127.255.255.255**
- Used for **very large networks** with millions of hosts.

**Class B:**
- Range: **128.0.0.0 to 191.255.255.255**
- Suitable for **medium-sized networks**.

**Class C:**
- Range: **192.0.0.0 to 223.255.255.255**
- Typically used for **smaller local area networks**.

**Class D:**
- Range: **224.0.0.0 to 239.255.255.255**
- Reserved for **multicast groups**.

**Class E:**
- Range: **240.0.0.0 to 255.255.255.254**
- Reserved for **experimental and research purposes**.`,
    companies: ["Cisco", "Amazon", "Google", "Microsoft", "TCS"],
  },
  {
    id: 7,
    question: "What are private IP addresses and special IP addresses?",
    answer: `**Private IP Addresses:**
Within each IP class, specific ranges are **reserved for private use** and cannot be routed over the public Internet. Used internally within networks:

- **Class A:** 10.0.0.0 to 10.255.255.255
- **Class B:** 172.16.0.0 to 172.31.255.255
- **Class C:** 192.168.0.0 to 192.168.255.255

**Special IP Addresses:**

**Loopback Address:**
- Range: **127.0.0.1 to 127.255.255.255**
- Reserved for **loopback or network testing purposes**.
- Used to refer back to the host machine itself.
- Commonly used as **127.0.0.1** (localhost) for testing network applications locally.

**Why Private IPs Matter:**
- Conserve **public IP addresses** by allowing multiple devices to share one public IP via NAT.
- Provide an additional layer of **security** as they are not directly accessible from the Internet.
- Enable **internal network communication** without using public address space.`,
    companies: ["Cisco", "Amazon", "Google", "Microsoft", "Infosys"],
  },
  {
    id: 8,
    question: "What is meant by internetworking?",
    answer: `**Internetworking** refers to the process of **connecting multiple distinct networks or segments together** through intermediary devices such as routers or gateways.

This interconnected system functions as a **single large network**, allowing communication and data exchange across various public, private, commercial, industrial, or governmental networks.

**Key Points:**
- The term originated from the concept of **interconnected networks**.
- Encompasses the **technologies, products, and procedures** used to create and manage combined networks.
- Forms the **basis of the Internet** — the largest example of internetworking.

**Intermediary Devices Used:**
- **Routers:** Direct data packets between networks based on IP addresses.
- **Gateways:** Connect networks using different protocols or architectures.
- **Bridges:** Connect two similar network segments.

**Benefits:**
- Enables **global communication** across heterogeneous networks.
- Allows **resource sharing** across organizational and geographical boundaries.
- Provides **scalability** by interconnecting networks of different sizes and types.`,
    companies: ["Cisco", "Amazon", "TCS", "Infosys", "Wipro"],
  },
  {
    id: 9,
    question: "Could you explain what a VPN is?",
    answer: `A **Virtual Private Network (VPN)** is a technology that establishes a **secure and encrypted connection** through a less secure network, commonly the Internet.

**How it Works:**
- Extends a **private network across a public one**.
- Users appear as if they are part of the private network even while physically remote.
- Uses **tunneling protocols** to ensure data traveling between the user and the private network is encrypted and secure from interception.

**Key Features:**

**Encryption:**
- All data transmitted through the VPN is **encrypted**, making it unreadable to interceptors.

**Tunneling:**
- Creates a **secure tunnel** through the public network for private data transmission.

**Anonymity:**
- Masks the user's real IP address, providing **privacy and anonymity**.

**Common Use Cases:**
- **Remote work** — employees securely access company resources from home.
- **Privacy** — browsing without exposing personal data to ISPs.
- **Geo-restriction bypass** — accessing content restricted to specific regions.
- **Secure public Wi-Fi** — protecting data on unsecured networks.`,
    companies: ["Cisco", "Palo Alto", "Amazon", "Microsoft", "Cloudflare"],
  },
  {
    id: 10,
    question: "What are the different categories of VPNs?",
    answer: `The different types of VPNs include:

**Access VPN (Remote Access VPN):**
- Supports **remote connectivity** for mobile users and telecommuters.
- Serves as an alternative to traditional dial-up or ISDN connections.
- Offers **broad connectivity at a relatively low cost**.
- Example: An employee working from home connecting to the company network.

**Site-to-Site VPN:**
- Commonly used by **large organizations** with multiple office locations.
- Connects the networks of different sites **securely over the Internet**.
- Has two subtypes:

**Intranet VPN:**
- Connects **remote offices** of the same organization using shared infrastructure.
- Maintains private WAN-like accessibility policies.

**Extranet VPN:**
- Connects **external entities** such as suppliers, customers, or partners.
- Uses shared infrastructure but with **dedicated connections**.
- Allows controlled access to specific parts of the internal network.

**Key Difference:**
- **Access VPN** connects individual users to a network.
- **Site-to-Site VPN** connects entire networks to each other.`,
    companies: ["Cisco", "Palo Alto", "Amazon", "Microsoft", "Cloudflare"],
  },
  {
    id: 11,
    question: "Can you describe the OSI Reference Model?",
    answer: `The **OSI (Open Systems Interconnection) model** is a **conceptual framework developed by ISO** to standardize communication functions of telecommunication or computing systems without regard to their underlying internal structure and technology.

**Key Purpose:**
- Enables **diverse communication systems to interoperate** by separating network functions into different abstraction layers.
- Each layer has a defined function guided by **internationally recognized protocols**.

**The 7 Layers (top to bottom):**

- **7 - Application:** User-facing protocols — HTTP, HTTPS, FTP, DNS, SMTP.
- **6 - Presentation:** Data translation, encryption, compression — SSL/TLS, JPEG.
- **5 - Session:** Manages sessions and connections between applications.
- **4 - Transport:** End-to-end communication, reliability — TCP, UDP.
- **3 - Network:** Logical addressing and routing — IP, routers.
- **2 - Data Link:** Physical addressing (MAC), error detection — Ethernet, switches.
- **1 - Physical:** Raw bit transmission — cables, fiber, radio signals.

**Benefits:**
- Promotes **interoperability** between different vendors and technologies.
- Simplifies **troubleshooting** by isolating issues to specific layers.`,
    imageUrls: ["/images/interview-questions/cn/Q11.png"],
    imageCaptions: ["Figure 11: ★ OSI Reference Model (7 Layers)"],
    companies: ["Cisco", "Amazon", "Google", "Microsoft", "TCS"],
  },
  {
    id: 12,
    question: "Which layers in the OSI model are considered software or user support layers?",
    answer: `The layers considered **software or user support layers** in the OSI model are the **upper three layers**:

**Layer 7 — Application Layer:**
- The topmost layer that **directly interacts with the end user**.
- Provides network services to applications.
- Protocols: HTTP, HTTPS, FTP, DNS, SMTP, POP3.

**Layer 6 — Presentation Layer:**
- Responsible for **data translation, encryption, and compression**.
- Ensures data is in a usable format for the application layer.
- Protocols: SSL/TLS, JPEG, ASCII, MPEG.

**Layer 5 — Session Layer:**
- Manages **sessions and connections** between communicating applications.
- Handles session establishment, maintenance, and termination.
- Protocols: NetBIOS, RPC, PPTP.

**Why They Are Called User Support Layers:**
- These layers are primarily concerned with **application-level data handling**.
- They deal with **how data is presented and used** by applications and users.
- They are implemented mainly in **software** rather than hardware.
- They abstract the complexity of the lower layers from application developers.`,
    companies: ["Cisco", "Amazon", "Microsoft", "TCS", "Infosys"],
  },
  {
    id: 13,
    question: "Which layers in the OSI model are hardware or network support layers?",
    answer: `The **hardware or network support layers** in the OSI model are the **lower three layers**:

**Layer 3 — Network Layer:**
- Responsible for **logical addressing and routing** of data packets.
- Determines the best path for data to travel across interconnected networks.
- Devices: Routers.
- Protocols: IP, ICMP, OSPF.

**Layer 2 — Data Link Layer:**
- Handles **physical addressing (MAC addresses)** and error detection.
- Manages how data is formatted for transmission over the physical network.
- Devices: Switches, bridges.
- Protocols: Ethernet, Wi-Fi (802.11).

**Layer 1 — Physical Layer:**
- Deals with the **actual physical transmission** of raw bits over a medium.
- Defines hardware elements such as cables, connectors, and signal specifications.
- Devices: Hubs, repeaters, network cables, fiber optics.

**Why They Are Called Hardware/Network Support Layers:**
- These layers are primarily implemented in **hardware**.
- They deal with the **physical movement of data** across networks.
- They are responsible for the actual **transmission infrastructure**.`,
    companies: ["Cisco", "Amazon", "Microsoft", "TCS", "Wipro"],
  },
  {
    id: 14,
    question: "At which OSI layer are headers and trailers added to data?",
    answer: `In the OSI model, **headers and trailers are added at specific layers** as data moves downward through the stack — a process called **encapsulation**.

**Headers are added at:**

**Layer 6 — Presentation Layer:**
- Adds formatting, encryption, and compression information.

**Layer 5 — Session Layer:**
- Adds session management information.

**Layer 4 — Transport Layer:**
- Adds port numbers and sequence numbers for reliable delivery.

**Layer 3 — Network Layer:**
- Adds **source and destination IP addresses** for routing.

**Trailer is added at:**

**Layer 2 — Data Link Layer:**
- Adds both a **header** (MAC addresses) and a **trailer** (error detection like CRC).
- The trailer is unique to this layer and used for **error checking**.

**Key Concept — Encapsulation:**
- Each layer wraps the data from the layer above with its own header (and trailer at Layer 2).
- This process is called **encapsulation** going down the stack.
- The reverse process (**decapsulation**) happens at the receiving end as data moves up the layers.`,
    companies: ["Cisco", "Amazon", "Google", "TCS", "Infosys"],
  },
  {
    id: 15,
    question: "What occurs in the OSI model when data moves from lower to upper layers?",
    answer: `As data packets move from the **lower layers to the upper layers** in the OSI model, the process of **decapsulation** occurs.

**What Happens:**
- The **headers that were previously added** during encapsulation (when data moved downward) are **removed sequentially** at each layer.
- Each layer reads its corresponding header, processes the relevant information, and **strips it off** before passing the data to the layer above.
- This continues until the **original payload** is fully extracted at the Application Layer for the receiving application to use.

**Layer-by-Layer Process (receiving side):**
- **Layer 1 (Physical):** Receives raw bits and passes electrical/optical signals up.
- **Layer 2 (Data Link):** Removes the frame header and trailer (checks MAC address and CRC).
- **Layer 3 (Network):** Removes the IP header (checks destination IP).
- **Layer 4 (Transport):** Removes the transport header (checks port numbers, reassembles segments).
- **Layer 5-7 (Session/Presentation/Application):** Further decapsulation until the original data reaches the application.

**Summary:** Moving upward = **removing headers** = **decapsulation**.`,
    companies: ["Cisco", "Microsoft", "TCS", "Infosys", "Cognizant"],
  },
  {
    id: 16,
    question: "What happens in the OSI model as data moves from upper to lower layers?",
    answer: `When data packets move from the **upper layers to the lower layers** in the OSI model, the process of **encapsulation** occurs.

**What Happens:**
- **Headers are added at each layer** as the data travels downward.
- These headers contain **essential control information** required for correct data transmission and delivery.
- Each layer adds its own header (and Layer 2 adds a trailer) before passing the data to the layer below.

**Layer-by-Layer Process (sending side):**
- **Layer 7 (Application):** Original data/message is created.
- **Layer 6 (Presentation):** Adds encryption/formatting header.
- **Layer 5 (Session):** Adds session management header.
- **Layer 4 (Transport):** Adds port numbers and sequence info → becomes a **segment**.
- **Layer 3 (Network):** Adds IP addresses → becomes a **packet**.
- **Layer 2 (Data Link):** Adds MAC addresses + CRC trailer → becomes a **frame**.
- **Layer 1 (Physical):** Converts to **bits** for transmission over the medium.

**Summary:** Moving downward = **adding headers** = **encapsulation**.`,
    companies: ["Cisco", "Microsoft", "TCS", "Infosys", "Wipro"],
  },
  {
    id: 17,
    question: "Can you explain the TCP/IP Reference Model?",
    answer: `The **TCP/IP Reference Model** is a **streamlined version of the OSI model**, comprising **four layers**. It was developed by the **U.S. Department of Defense** in the 1980s.

Named after its two core protocols:
- **TCP (Transmission Control Protocol)**
- **IP (Internet Protocol)**

**Why It Was Created:**
- Designed for **practical, real-world network communication**.
- Built to survive partial network failures — originally designed for military use.
- More flexible and less rigid than the OSI model.

**Key Characteristics:**
- **4 layers** instead of OSI's 7.
- Combines the OSI's upper three layers (Application, Presentation, Session) into a **single Application Layer**.
- Combines the OSI's Physical and Data Link layers into a **single Link Layer**.
- It is the **foundation of the modern Internet**.

**Protocols:**
- Each layer uses specific protocols — HTTP/FTP at Application, TCP/UDP at Transport, IP at Internet, and Ethernet at Link layer.

**Practical Significance:**
- Every device connected to the Internet uses the TCP/IP model for communication.`,
    companies: ["Cisco", "Amazon", "Google", "Microsoft", "TCS"],
  },
  {
    id: 18,
    question: "What are the four layers of the TCP/IP Reference Model and their functions?",
    answer: `The four layers of the TCP/IP Reference Model are:

**1. Link Layer (Network Access Layer):**
- Manages **physical and logical connections** such as Ethernet or serial lines.
- Handles hardware addressing (MAC) and physical data transmission.
- Corresponds to OSI Layers 1 and 2.
- Protocols: Ethernet, Wi-Fi, ARP.

**2. Internet Layer:**
- The **critical layer responsible for routing IP packets** to their destination across interconnected networks.
- Handles logical addressing and path determination.
- Corresponds to OSI Layer 3.
- Protocols: IP, ICMP, OSPF.

**3. Transport Layer:**
- Provides **end-to-end communication services**, enabling two hosts to maintain a conversation.
- Handles reliable or fast delivery of data.
- Corresponds to OSI Layer 4.
- Protocols: TCP (reliable), UDP (fast).

**4. Application Layer:**
- Encompasses all **higher-level protocols** that provide network services to applications.
- Combines OSI Layers 5, 6, and 7.
- Protocols: HTTP, HTTPS, FTP, DNS, SMTP, POP3.`,
    imageUrls: ["/images/interview-questions/cn/Q18.png"],
    imageCaptions: ["Figure 18: ★ TCP/IP Reference Model (4 Layers)"],
    companies: ["Cisco", "Amazon", "Google", "Microsoft", "Flipkart"],
  },
  {
    id: 19,
    question: "How does the OSI Reference Model differ from the TCP/IP Reference Model?",
    answer: `**Key Differences between OSI and TCP/IP:**

**Number of Layers:**
- **OSI** has **7 layers**.
- **TCP/IP** has **4 layers**.

**Layer Boundaries:**
- **OSI** defines **fixed boundaries** and specific functions for each layer.
- **TCP/IP** has a **more flexible architecture** without strict boundaries.

**Reliability:**
- **OSI** is generally considered **less reliable** in practice.
- **TCP/IP** is designed for **high reliability** and is the foundation of the Internet.

**Approach:**
- **OSI** follows a **vertical layering approach** — strictly separates functions.
- **TCP/IP** follows a **horizontal layering approach** — more integrated layers.

**Development:**
- **OSI** was developed by **ISO** as a theoretical framework.
- **TCP/IP** was developed by the **U.S. Department of Defense** for practical use.

**Usage:**
- **OSI** is primarily used as a **reference/teaching model**.
- **TCP/IP** is the **actual protocol suite** used on the Internet today.

**Application Layer:**
- **OSI** splits it into three layers (Session, Presentation, Application).
- **TCP/IP** combines all three into a **single Application Layer**.`,
    imageUrls: ["/images/interview-questions/cn/Q19.png"],
    imageCaptions: ["Figure 19: ★ OSI vs TCP/IP Reference Models"],
    companies: ["Cisco", "Amazon", "Google", "Microsoft", "TCS"],
  },
  {
    id: 20,
    question: "Where does transmission media fit within the OSI model?",
    answer: `In the OSI model, **physical transmission media corresponds to the Physical Layer — Layer 1**.

**Physical Layer Responsibilities:**
- Defines the **electrical, mechanical, and procedural** specifications for activating and deactivating physical connections.
- Responsible for **transmission and reception of raw bit streams** over a physical medium.
- Deals with **signal types** — electrical, optical, or radio signals.

**Types of Transmission Media at Layer 1:**

**Guided (Wired) Media:**
- **Twisted Pair Cable** — commonly used in Ethernet (e.g., Cat5, Cat6).
- **Coaxial Cable** — used in cable TV and older Ethernet networks.
- **Fiber Optic Cable** — uses light signals for high-speed, long-distance transmission.

**Unguided (Wireless) Media:**
- **Radio Waves** — used in Wi-Fi and cellular networks.
- **Microwaves** — used in satellite and point-to-point communication.
- **Infrared** — used in short-range communication like TV remotes.

**Key Point:**
- Transmission media is **below the OSI model** conceptually but is managed and defined by the Physical Layer specifications.`,
    companies: ["Cisco", "Microsoft", "TCS", "Infosys", "Wipro"],
  },
  {
    id: 21,
    question: "What are the HTTP and HTTPS protocols?",
    answer: `**HTTP (HyperText Transfer Protocol):**
- The protocol defining **rules for transmitting information** on the World Wide Web.
- Facilitates communication between **web browsers and servers**.
- Operates as a **stateless protocol** — each request is independent with no memory of previous requests.
- Runs at the **Application Layer** over TCP.
- Uses **port 80** by default.
- Data is transmitted in **plain text** — not secure for sensitive information.

**HTTPS (HTTP Secure):**
- A **secure extension of HTTP** that uses **SSL/TLS encryption** protocols.
- Protects data transmission and **verifies server identity** via digital certificates.
- Uses **port 443** by default.
- Data is **encrypted** — cannot be read by interceptors.
- Essential for **banking, e-commerce, and login pages**.

**Key Difference:**
- **HTTP** → plain text, less secure, port 80.
- **HTTPS** → encrypted, secure, port 443.

**How to identify:** HTTPS pages show a **padlock icon** in the browser address bar.`,
    companies: ["Google", "Amazon", "Microsoft", "Cloudflare", "TCS"],
  },
  {
    id: 22,
    question: "How is the HTTPS protocol defined?",
    answer: `**HTTPS (HyperText Transfer Protocol Secure)** is an **advanced and secure version of HTTP**. It is the standard protocol for **secure communication** on the World Wide Web.

**Key Characteristics:**
- Operates on **port 443** by default.
- Uses **SSL (Secure Sockets Layer)** or **TLS (Transport Layer Security)** protocols to encrypt communication.
- Ensures **confidentiality and security** during data exchange on the web.

**How HTTPS Works:**
1. Client requests a secure connection to the server.
2. Server sends its **SSL/TLS certificate** containing the public key.
3. Client verifies the certificate with a trusted **Certificate Authority (CA)**.
4. A **session key** is established using asymmetric encryption.
5. All subsequent data is transmitted using **symmetric encryption** with the session key.

**Benefits:**
- **Data Encryption:** Prevents eavesdropping on transmitted data.
- **Data Integrity:** Ensures data is not tampered with during transmission.
- **Authentication:** Verifies the website's identity to prevent impersonation.

**Modern Importance:**
- Required for **SEO ranking** — Google prioritizes HTTPS sites.
- Mandatory for handling **payment information** (PCI DSS compliance).`,
    imageUrls: ["/images/interview-questions/cn/Q22.png"],
    imageCaptions: ["Figure 22: ★ HTTPS Protocol Workflow"],
    companies: ["Google", "Amazon", "Microsoft", "Cloudflare", "Mozilla"],
  },
  {
    id: 23,
    question: "What is the SMTP protocol used for?",
    answer: `**SMTP (Simple Mail Transfer Protocol)** is the **standard protocol for sending emails** between servers.

**Key Characteristics:**
- Defines the **communication rules** for email transfer.
- Supports both **end-to-end** and **store-and-forward** email delivery.
- Listens continuously on **port 25** by default.
- Modern implementations also use **port 587** for submission and **port 465** for SMTPS (SMTP over SSL).

**How SMTP Works:**
1. Email client sends a message to the **SMTP server**.
2. SMTP server looks up the **recipient's mail server** using DNS (MX records).
3. The message is forwarded to the **recipient's SMTP server**.
4. The recipient retrieves the email using **POP3 or IMAP**.

**SMTP vs Other Email Protocols:**
- **SMTP** — used for **sending** emails.
- **POP3** — used for **downloading** emails to a local device.
- **IMAP** — used for **accessing and managing** emails on the server.

**Example:**
- When you click "Send" in Gmail or Outlook, SMTP handles the delivery of your email to the recipient's mail server.`,
    companies: ["Google", "Microsoft", "Amazon", "TCS", "Infosys"],
  },
  {
    id: 24,
    question: "What does DNS stand for, and what does it do?",
    answer: `**DNS stands for Domain Name System.**

It is a **hierarchical and decentralized naming system** for devices and services connected to the Internet.

**Primary Function:**
- Translates **human-readable domain names** like \`interviewbit.com\` into their corresponding **IP addresses** such as \`172.217.166.36\`.
- Allows users to access websites using **easy-to-remember names** instead of numeric IP addresses.

**DNS operates by default on port 53.**

**How DNS Resolution Works:**
1. User types a domain name in the browser.
2. Browser checks its **local cache**.
3. If not found, queries the **Recursive Resolver** (usually ISP).
4. Resolver queries the **Root Name Server**.
5. Root server directs to the **TLD Name Server** (.com, .org, etc.).
6. TLD server directs to the **Authoritative Name Server**.
7. Authoritative server returns the **IP address**.
8. Browser connects to the server at that IP.

**Analogy:**
- DNS is like the **internet's phonebook** — you look up a name and get the corresponding address.`,
    imageUrls: ["/images/interview-questions/cn/Q24.png"],
    imageCaptions: ["Figure 24: ★ DNS Resolution Process"],
    companies: ["Cloudflare", "Amazon", "Google", "Microsoft", "Akamai"],
  },
  {
    id: 25,
    question: "What is the primary function of a DNS server?",
    answer: `The **Domain Name Server (DNS)** translates **domain names and hostnames into IP addresses** and vice versa.

**Primary Functions:**

**Name Resolution:**
- Converts human-readable domain names (e.g., \`google.com\`) into **machine-readable IP addresses**.
- Allows browsers to locate and connect to the correct web server.

**Reverse DNS Lookup:**
- Resolves an **IP address back to a domain name**.
- Used for logging, security, and email verification.

**Load Distribution:**
- Can return **multiple IP addresses** for a single domain name, distributing traffic across servers (DNS-based load balancing).

**Global Management:**
- A **global network of DNS servers** manages domain name assignments and mappings.
- Designates **authoritative name servers** for each domain.
- Organizes two main namespaces: the **domain name hierarchy** and the **IP address space**.

**Caching:**
- DNS servers **cache resolved queries** for a period (TTL — Time to Live) to speed up future requests and reduce DNS lookup traffic.

**Example:**
- When you type \`youtube.com\`, the DNS server resolves it to an IP like \`142.250.80.78\` so your browser can connect.`,
    imageUrls: ["/images/interview-questions/cn/Q25.png"],
    imageCaptions: ["Figure 25: ★ DNS Server Functions"],
    companies: ["Cloudflare", "Amazon", "Google", "Microsoft", "Akamai"],
  },
  {
    id: 26,
    question: "What protocol and port number does DNS use?",
    answer: `**DNS uses both TCP and UDP** protocols, operating on **port 53**.

**UDP (User Datagram Protocol) — Primary:**
- DNS primarily uses **UDP on port 53** for standard queries.
- UDP is preferred because it is **faster and has lower overhead**.
- Most DNS queries are small enough to fit in a single UDP packet.

**TCP (Transmission Control Protocol) — Secondary:**
- DNS uses **TCP on port 53** for:
  - **Zone transfers** — when DNS servers replicate their databases.
  - **Large responses** that exceed 512 bytes (the UDP limit for DNS).
  - **DNSSEC** — when DNS responses include security extensions.

**Key Points:**
- Port 53 is reserved exclusively for DNS.
- Both TCP and UDP on **port 53 are treated as separate** — they can both operate simultaneously.
- Modern DNS (DNS over HTTPS / DNS over TLS) also uses **port 443** and **port 853** respectively for encrypted DNS queries.

**Example:**
- A typical DNS lookup (e.g., resolving \`google.com\`) uses **UDP port 53** for speed.
- A DNS zone transfer between two name servers uses **TCP port 53** for reliability.`,
    companies: ["Cisco", "Cloudflare", "Amazon", "Google", "TCS"],
  },
  {
    id: 27,
    question: "What is the TCP protocol?",
    answer: `**TCP (Transmission Control Protocol)** is a **core protocol of the Internet Protocol Suite** that defines how computers establish a connection and transmit data **reliably** over a network.

**Key Characteristics:**
- **Connection-Oriented:** Creates a virtual connection between devices before data transfer.
- **Reliable:** Guarantees delivery of data packets in the correct order.
- **Error Checking:** Detects and retransmits lost or corrupted packets.
- **Flow Control:** Prevents the sender from overwhelming the receiver.
- **Congestion Control:** Adjusts transmission rate based on network conditions.

**Three-Way Handshake:**
TCP establishes connections using a three-way handshake:
1. **SYN** — Client sends a synchronization request.
2. **SYN-ACK** — Server acknowledges and responds.
3. **ACK** — Client acknowledges, connection established.

**Common Use Cases:**
- Web browsing (HTTP/HTTPS)
- Email (SMTP, POP3, IMAP)
- File transfers (FTP)
- Any application requiring **reliable, ordered data delivery**.

**Trade-off:**
- TCP's reliability mechanisms make it **slower** than UDP but more suitable for accuracy-critical applications.`,
    imageUrls: ["/images/interview-questions/cn/Q27.png"],
    imageCaptions: ["Figure 27: ★ TCP Protocol Characteristics"],
    companies: ["Cisco", "Amazon", "Google", "Microsoft", "TCS"],
  },
  {
    id: 28,
    question: "What is the UDP protocol?",
    answer: `**UDP (User Datagram Protocol)** is a **connectionless transport protocol** that operates using datagrams.

**Key Characteristics:**
- **Connectionless:** Transmits data **without establishing a connection** first.
- **No Reliability:** Does not guarantee delivery — packets may be lost.
- **No Error Checking:** Does not perform error verification or retransmission.
- **No Ordering:** Packets may arrive out of order.
- **Lightweight:** Minimal overhead makes it **faster than TCP**.
- Primarily used for **multicasting and broadcasting**.

**How UDP Works:**
- Sender simply sends packets to the destination without handshaking.
- No acknowledgment from receiver — **fire and forget** approach.

**Common Use Cases:**
- **Live video/audio streaming** — speed matters more than perfect delivery.
- **Online gaming** — low latency is critical.
- **VoIP** — real-time voice communication.
- **DNS queries** — small, fast lookups.
- **DHCP** — network configuration broadcasts.

**Trade-off:**
- UDP sacrifices reliability for **speed and low latency**.
- Suitable when **occasional data loss is acceptable** but delay is not.`,
    companies: ["Cisco", "Amazon", "Google", "Netflix", "TCS"],
  },
  {
    id: 29,
    question: "How do TCP and UDP compare?",
    answer: `**TCP vs UDP — Key Comparisons:**

**Connection:**
- **TCP** is **connection-oriented** — establishes a connection via 3-way handshake.
- **UDP** is **connectionless** — sends data without establishing a connection.

**Reliability:**
- **TCP** provides **higher reliability** — guarantees delivery and ordering.
- **UDP** is **less reliable** — no delivery guarantee.

**Speed:**
- **TCP** has **slower transmission** due to overhead.
- **UDP** transmits **faster** with minimal overhead.

**Packet Order:**
- **TCP** preserves **packet order** using sequence numbers.
- **UDP** packets are **independent and unordered**.

**Error Checking:**
- **TCP** supports **error checking** and retransmission.
- **UDP** does **not** perform error checking.

**Packet Size:**
- **TCP** packets are **heavier** with more header information.
- **UDP** packets are **lightweight**.

**Use Cases:**
- **TCP:** HTTP, FTP, SMTP — accuracy-critical applications.
- **UDP:** DNS, RIP, video streaming, gaming — speed-critical applications.

**Summary:** Use TCP when **accuracy matters**; use UDP when **speed matters**.`,
    companies: ["Cisco", "Amazon", "Google", "Microsoft", "Netflix"],
  },
  {
    id: 30,
    question: "What is the function of the ICMP protocol?",
    answer: `**ICMP (Internet Control Message Protocol)** operates at the **Network Layer** and is used primarily for **error reporting and network diagnostics**.

**Primary Functions:**

**Error Reporting:**
- Notifies the sender when data packets **cannot reach their destination**.
- Reports issues like unreachable hosts, networks, or ports.

**Network Diagnostics:**
- Helps routers and devices **detect network issues**.
- Verifies if data packets reach their destination.

**Key Tools Using ICMP:**

**Ping:**
- Sends ICMP Echo Request messages to a host.
- Measures **round-trip time** and verifies connectivity.
- Example: \`ping google.com\`

**Traceroute:**
- Uses ICMP to **trace the path** packets take from source to destination.
- Identifies each hop and measures latency at each step.

**Key Characteristics:**
- ICMP typically uses **port 7** (echo port).
- Unlike TCP and UDP, ICMP is **not used for data transfer** between applications.
- It is a **supporting protocol** for IP, helping manage network communication.

**Security Note:**
- ICMP can be exploited in **Ping of Death** and **ICMP flood (Smurf) attacks** — hence some firewalls block ICMP traffic.`,
    companies: ["Cisco", "Amazon", "Google", "Cloudflare", "Microsoft"],
  },
  {
    id: 31,
    question: "What does the DHCP protocol do?",
    answer: `**DHCP (Dynamic Host Configuration Protocol)** is an **Application Layer protocol** that **automatically assigns IP addresses and other network settings** to devices on an IP network.

**Primary Function:**
- Eliminates the need for **manual IP address configuration**.
- Facilitates device communication by automatically providing:
  - **IP Address**
  - **Subnet Mask**
  - **Default Gateway**
  - **DNS Server addresses**

**DHCP servers usually operate on port 67** (server) and **port 68** (client).

**How DHCP Works (DORA Process):**
1. **Discover** — Client broadcasts a request for an IP address.
2. **Offer** — DHCP server offers an available IP address.
3. **Request** — Client requests the offered IP address.
4. **Acknowledge** — Server confirms the assignment.

**Key Benefits:**
- **Centralized management** of IP addresses.
- **Prevents IP conflicts** by tracking assigned addresses.
- **Reduces administrative overhead** — no manual configuration needed.

**IP Lease:**
- DHCP assigns IPs for a **limited time (lease period)**.
- Devices renew their lease before it expires.`,
    companies: ["Cisco", "Microsoft", "Amazon", "TCS", "Infosys"],
  },
  {
    id: 32,
    question: "What is the role of the ARP protocol?",
    answer: `**ARP (Address Resolution Protocol)** is a **network protocol** that maps a device's **logical IP address to its physical MAC address**.

**Primary Role:**
- Helps devices **communicate over local networks** by resolving IP addresses to hardware (MAC) addresses.
- Bridges the gap between **Layer 3 (Network Layer — IP)** and **Layer 2 (Data Link Layer — MAC)**.

**How ARP Works:**
1. Device A wants to communicate with Device B on the same network.
2. Device A knows Device B's **IP address** but not its **MAC address**.
3. Device A broadcasts an **ARP Request**: "Who has IP 192.168.1.5?"
4. Device B responds with an **ARP Reply**: "I have that IP, my MAC is XX:XX:XX:XX:XX:XX."
5. Device A stores the mapping in its **ARP cache** for future use.

**ARP Cache:**
- Stores recently resolved IP-to-MAC mappings.
- Reduces network traffic by avoiding repeated ARP broadcasts.
- Entries expire after a **TTL period**.

**Security Concern:**
- **ARP Spoofing/Poisoning** — attackers send fake ARP replies to redirect traffic.
- Can lead to **Man-in-the-Middle attacks**.`,
    imageUrls: ["/images/interview-questions/cn/Q32.png"],
    imageCaptions: ["Figure 32: ★ ARP Protocol Operation"],
    companies: ["Cisco", "Amazon", "Microsoft", "TCS", "Infosys"],
  },
  {
    id: 33,
    question: "What is the FTP protocol used for?",
    answer: `**FTP (File Transfer Protocol)** is an **Application Layer protocol** enabling **reliable and efficient file transfers** between hosts over a TCP/IP network.

**Primary Use:**
- Commonly used to **download files from remote servers** to local computers.
- Also used to **upload files** to remote servers.
- Operates on **port 21** for control commands and **port 20** for data transfer.

**Note:** The answer document mentions port 27, but the standard FTP control port is **port 21**.

**How FTP Works:**
- Uses **two separate connections**:
  - **Control Connection (Port 21):** Sends commands and receives responses.
  - **Data Connection (Port 20):** Transfers the actual file data.

**Two Modes:**
- **Active Mode:** Server initiates the data connection to the client.
- **Passive Mode:** Client initiates both connections — useful when firewalls block incoming connections.

**Security:**
- Standard FTP transmits data in **plain text** — not secure.
- **FTPS (FTP Secure)** adds SSL/TLS encryption.
- **SFTP (SSH File Transfer Protocol)** uses SSH for secure transfers.

**Common Use Cases:**
- Website file management (uploading web pages).
- Software distribution and file sharing.
- Backup and archiving files to remote servers.`,
    companies: ["Cisco", "Amazon", "Microsoft", "TCS", "Wipro"],
  },
  {
    id: 34,
    question: "What services does the Application Layer provide in the Internet model?",
    answer: `The **Application Layer** in the Internet (TCP/IP) model is the topmost layer that **directly interacts with end-user applications** and provides a wide range of network services.

**Services Provided:**

**Mail Services:**
- Handles sending, receiving, and storing emails.
- Protocols: **SMTP** (sending), **POP3** (downloading), **IMAP** (server-based access).

**Directory Services:**
- Provides a way to look up information about network resources.
- Protocol: **LDAP** (Lightweight Directory Access Protocol).

**File Transfer:**
- Enables uploading and downloading of files between hosts.
- Protocol: **FTP**, **SFTP**, **TFTP**.

**Access Management:**
- Controls and manages user access to network resources.
- Protocol: **RADIUS**, **TACACS+**.

**Network Virtual Terminal:**
- Allows users to **log in to remote hosts** and use them as if locally connected.
- Protocol: **Telnet**, **SSH**.

**Additional Services:**
- Web browsing — **HTTP/HTTPS**.
- Domain name resolution — **DNS**.
- Network time synchronization — **NTP**.
- Dynamic IP assignment — **DHCP**.`,
    companies: ["Cisco", "Amazon", "Google", "Microsoft", "TCS"],
  },
  {
    id: 35,
    question: "Why is the POP3 protocol necessary for email?",
    answer: `**POP3 (Post Office Protocol version 3)** is widely adopted by email clients as a **standard method to access mailboxes and download messages**.

**Primary Necessity:**
- Allows users to **retrieve emails to their local device** so they can read messages **offline** without needing continuous internet access.

**How POP3 Works:**
1. Email client connects to the **POP3 server** on **port 110** (or port 995 for POP3S).
2. User authenticates with username and password.
3. Client **downloads all new emails** from the server to the local device.
4. By default, emails are **deleted from the server** after download.

**Why POP3 is Necessary:**

**Offline Access:**
- Users can read emails even without an internet connection after downloading.

**Storage Management:**
- Emails are stored **locally**, freeing server storage space.

**Simplicity:**
- Simple protocol, easy to implement and use.

**POP3 vs IMAP:**
- **POP3** downloads and (usually) deletes from server — single device use.
- **IMAP** keeps emails on the server — access from multiple devices.

**Modern Usage:**
- POP3 is less common today as **IMAP** is preferred for multi-device access, but it remains relevant for **single-device, offline-first** email setups.`,
    companies: ["Google", "Microsoft", "Amazon", "TCS", "Infosys"],
  },
  {
    id: 36,
    question: "What is a MAC address, and how is it connected to the Network Interface Card (NIC)?",
    answer: `A **MAC (Media Access Control) address** is a **unique 48-bit or 64-bit identifier** assigned to devices on a network.

**Key Characteristics:**
- Also referred to as the **physical address** or **hardware address**.
- Written in **hexadecimal format**, typically displayed as: \`00:1A:2B:3C:4D:5E\`
- **Globally unique** — no two network devices should have the same MAC address.
- Operates at the **Data Link Layer (Layer 2)** of the OSI model.

**Connection to NIC:**
- The MAC address is **embedded (burned) into the Network Interface Card (NIC)** during manufacturing.
- The **NIC** is the hardware component that enables a device to connect to a network.
- The MAC address is stored in the NIC's **ROM (Read-Only Memory)**.
- Every NIC has a **unique MAC address** assigned by the manufacturer.

**Structure of MAC Address:**
- First **3 bytes (OUI):** Identifies the **manufacturer** (assigned by IEEE).
- Last **3 bytes:** Unique identifier assigned by the **manufacturer** for each device.

**Usage:**
- Used for **device identification** on a local network.
- Used in **ARP** to map IP addresses to physical addresses.
- Used in **switching** to forward frames to the correct device.`,
    companies: ["Cisco", "Amazon", "Microsoft", "TCS", "Infosys"],
  },
  {
    id: 37,
    question: "How does a MAC address differ from an IP address?",
    answer: `**MAC Address vs IP Address — Key Differences:**

**Full Form:**
- **MAC:** Media Access Control address.
- **IP:** Internet Protocol address.

**Size:**
- **MAC:** 6 bytes (48-bit) or 8 bytes (64-bit) hexadecimal value.
- **IP:** 4 bytes (IPv4) or 16 bytes (IPv6).

**Assignment:**
- **MAC:** **Embedded in the NIC** by the manufacturer — permanent hardware address.
- **IP:** **Assigned by the network** (statically or dynamically via DHCP).

**Type:**
- **MAC:** **Physical address** — tied to the hardware.
- **IP:** **Logical address** — tied to the network location.

**OSI Layer:**
- **MAC:** Operates at the **Data Link Layer (Layer 2)**.
- **IP:** Functions at the **Network Layer (Layer 3)**.

**Scope:**
- **MAC:** Identifies devices on the **local network** (LAN).
- **IP:** Identifies device connectivity on **wider networks** (Internet).

**Changeability:**
- **MAC:** Generally **fixed** (though can be spoofed).
- **IP:** Can **change** based on network or DHCP assignment.

**Format:**
- **MAC:** \`00:1A:2B:3C:4D:5E\` (hexadecimal).
- **IP:** \`192.168.1.1\` (decimal, IPv4).`,
    imageUrls: ["/images/interview-questions/cn/Q37.png"],
    imageCaptions: ["Figure 37: ★ MAC Address vs IP Address"],
    companies: ["Cisco", "Amazon", "Google", "Microsoft", "TCS"],
  },
  {
    id: 38,
    question: "What is a subnet?",
    answer: `A **subnet** is a **segmented portion of a larger network** created through **subnetting** — the process of dividing a network into smaller sub-networks.

**Primary Purpose:**
- **Enhances routing efficiency** by reducing the size of routing tables.
- **Improves network security** by isolating traffic within subnet boundaries.
- **Reduces network congestion** by containing broadcast traffic within subnets.

**How Subnetting Works:**
- Uses a **subnet mask** to determine which portion of an IP address identifies the network and which identifies the host.
- **CIDR (Classless Inter-Domain Routing) notation** represents subnets concisely — e.g., \`192.168.1.0/24\`.

**Example:**
- Network: \`192.168.1.0/24\` can be divided into:
  - Subnet 1: \`192.168.1.0/25\` (hosts: .1 to .126)
  - Subnet 2: \`192.168.1.128/25\` (hosts: .129 to .254)

**Benefits:**
- **Security:** Different departments can be isolated (e.g., HR, Finance, IT).
- **Performance:** Reduces broadcast domain size.
- **IP Management:** More efficient use of IP address space.
- **Troubleshooting:** Easier to isolate network issues within subnets.`,
    imageUrls: ["/images/interview-questions/cn/Q38.png"],
    imageCaptions: ["Figure 38: ★ Subnetting Process"],
    companies: ["Cisco", "Amazon", "Google", "Microsoft", "TCS"],
  },
  {
    id: 39,
    question: "What are the differences between a hub and a switch?",
    answer: `**Hub vs Switch — Key Differences:**

**OSI Layer:**
- **Hub** operates at the **Physical Layer (Layer 1)**.
- **Switch** functions at the **Data Link Layer (Layer 2)**.

**Transmission Mode:**
- **Hub** transmission is **half-duplex** — cannot send and receive simultaneously.
- **Switch** supports **full-duplex** communication — can send and receive at the same time.

**Connectivity:**
- **Hub** connects **Ethernet devices** in a network.
- **Switch** connects **LAN devices** intelligently.

**Intelligence:**
- **Hubs** are **simpler and less intelligent** — broadcast data to all ports.
- **Switches** are **smarter** — forward data only to the intended recipient using MAC address tables.

**Administration:**
- **Hubs** lack administration software.
- **Switches** provide **management capabilities** and can be configured.

**Speed:**
- **Hubs** support speeds up to **100 Mbps**.
- **Switches** support **gigabit speeds** (1 Gbps and beyond).

**Collision Handling:**
- **Hubs** are less efficient as they **cannot prevent collisions** — all devices share bandwidth.
- **Switches** significantly **reduce or avoid collisions** using separate collision domains per port.

**Cost:**
- **Hubs** are **more affordable**.
- **Switches** are more expensive but far more efficient.`,
    companies: ["Cisco", "Amazon", "Microsoft", "TCS", "Infosys"],
  },
  {
    id: 40,
    question: "What is the purpose of a router, and how does it differ from a gateway?",
    answer: `**Router:**
- A device that **connects multiple network segments** and **directs data traffic** between them.
- Transfers data (web pages, emails, videos) in **packet form** from source to destination.
- Operates at the **Network Layer (Layer 3)** of the OSI model.
- Makes forwarding decisions based on **IP addresses** and routing tables.
- Connects networks using the **same protocol** (typically TCP/IP).

**Gateway:**
- Also routes and regulates traffic but can **interconnect different network types**.
- Unlike routers which connect **similar networks**, gateways connect networks using **different protocols or architectures**.
- Operates at **multiple OSI layers** (up to Layer 7).
- Acts as a **protocol converter** — translates between different network protocols.

**Key Differences:**

| Feature | Router | Gateway |
|---|---|---|
| Protocol | Same protocol | Different protocols |
| OSI Layer | Layer 3 | Multiple layers |
| Function | Routes packets | Translates protocols |
| Complexity | Simpler | More complex |

**Example:**
- A **router** connects your home network to your ISP's network (both use TCP/IP).
- A **gateway** connects a corporate TCP/IP network to a legacy IBM SNA network.`,
    imageUrls: ["/images/interview-questions/cn/Q40.png"],
    imageCaptions: ["Figure 40: ★ Router vs Gateway"],
    companies: ["Cisco", "Amazon", "Google", "Microsoft", "TCS"],
  },
  {
    id: 41,
    question: "How do the commands ipconfig and ifconfig differ?",
    answer: `**ipconfig vs ifconfig — Key Differences:**

**ipconfig (Internet Protocol Configuration):**
- Used in **Microsoft Windows** operating systems.
- Displays and manages network interface configuration.
- Common commands:
  - \`ipconfig\` — displays basic IP configuration.
  - \`ipconfig /all\` — shows detailed network info including MAC address.
  - \`ipconfig /release\` — releases current DHCP IP address.
  - \`ipconfig /renew\` — renews DHCP IP address.
  - \`ipconfig /flushdns\` — clears DNS cache.

**ifconfig (Interface Configuration):**
- Used in **UNIX, Linux, and macOS** operating systems.
- Similar purpose — view and configure network interfaces.
- Common commands:
  - \`ifconfig\` — displays all active network interfaces.
  - \`ifconfig eth0\` — shows configuration for a specific interface.
  - \`ifconfig eth0 up/down\` — enables or disables an interface.

**Common Features:**
- Both provide **TCP/IP configuration summaries**.
- Both allow changes to **DHCP and DNS settings**.
- Both display **IP address, subnet mask, and MAC address**.

**Modern Note:**
- On newer Linux systems, \`ifconfig\` is being replaced by the \`ip\` command (e.g., \`ip addr show\`).`,
    companies: ["Microsoft", "Cisco", "TCS", "Infosys", "Wipro"],
  },
  {
    id: 42,
    question: "What is a firewall, and what does it do?",
    answer: `A **firewall** is a **network security system** designed to **monitor and control incoming and outgoing network traffic** based on predefined security rules.

**Primary Function:**
- Acts as a **barrier between a private network and the public Internet**.
- **Blocks unauthorized access** while permitting legitimate traffic.
- Can be **hardware, software, or a combination** of both.

**How a Firewall Works:**
- Inspects data packets and compares them against a **rule set**.
- Allows or denies traffic based on:
  - **Source/Destination IP address**
  - **Port numbers**
  - **Protocols (TCP, UDP)**
  - **Application type (NGFW)**

**Types of Firewalls:**

**Packet Filtering:**
- Inspects packets at the Network Layer based on IP/port rules.

**Stateful Inspection:**
- Tracks active connections and allows only legitimate session traffic.

**Application Layer (Proxy) Firewall:**
- Inspects traffic at the Application Layer for deep content filtering.

**Next-Generation Firewall (NGFW):**
- Combines traditional firewall with IPS, application awareness, and user identity tracking.
- Used by **Palo Alto, Cisco, Fortinet**.

**Benefits:**
- Prevents **unauthorized access and cyberattacks**.
- Protects against **malware, DoS attacks, and intrusions**.`,
    companies: ["Cisco", "Palo Alto", "Cloudflare", "Amazon", "Microsoft"],
  },
  {
    id: 43,
    question: "What do the terms unicasting, anycasting, multicasting, and broadcasting mean?",
    answer: `These terms describe **different methods of transmitting data** from a source to one or more destinations in a network.

**Unicasting:**
- Sending a message from a **source to a single specific node**.
- One-to-one communication.
- Commonly used for **direct connections** like web browsing and file downloads.
- Example: Loading a webpage — your browser sends a request to one specific server.

**Anycasting:**
- Sending a message to **any one node within a group** — typically the nearest one.
- One-to-nearest communication.
- Used in **Content Delivery Networks (CDNs)** to retrieve data from the nearest server.
- Example: Cloudflare uses anycast to route users to the nearest data center.

**Multicasting:**
- Sending a message to a **selected group of nodes** simultaneously.
- One-to-many communication (specific group).
- Used in **video conferencing, IPTV, and online gaming**.
- Example: A live video stream sent to all subscribed users.

**Broadcasting:**
- Sending a message to **all nodes within a network**.
- One-to-all communication.
- Protocols like **DHCP and ARP** utilize broadcasting within local networks.
- Example: DHCP discovery message sent to all devices on the network.`,
    companies: ["Cisco", "Amazon", "Google", "Akamai", "TCS"],
  },
  {
    id: 44,
    question: "What do confidentiality, integrity, and availability (CIA) represent in security?",
    answer: `The **CIA Triad** represents the **three core principles of information security**.

**Confidentiality:**
- Ensures that **information is accessible only to authorized individuals** or systems.
- Protects sensitive data from unauthorized access or disclosure.
- Implemented through: **encryption, access controls, authentication**.
- Example: If a password is observed during login, **confidentiality is compromised**.

**Integrity:**
- Maintains the **accuracy and completeness of data**, preventing unauthorized modifications.
- Ensures data has not been **tampered with or corrupted**.
- Implemented through: **hashing, digital signatures, checksums**.
- Example: Updating employee status accurately only by authorized personnel reflects **data integrity**.

**Availability:**
- Guarantees that **information is accessible when needed** by authorized users.
- Ensures systems and data are **operational and accessible** at all times.
- Implemented through: **redundancy, backups, disaster recovery, DDoS protection**.
- Example: Attacks like **Denial of Service (DoS)** impair availability by preventing access to data.

**Why CIA Matters:**
- Forms the **foundation of all security policies** and frameworks.
- Every security control and measure maps back to protecting one or more of these three principles.`,
    companies: ["Cisco", "Palo Alto", "Amazon", "Microsoft", "Google"],
  },
  {
    id: 45,
    question: "What is IP spoofing?",
    answer: `**IP Spoofing** is a **hacking technique** where attackers **disguise their IP addresses** to gain unauthorized access to systems or launch attacks while hiding their true identity.

**How It Works:**
- The attacker creates **IP packets with a forged source IP address**.
- The forged address makes the packets appear to come from a **trusted or legitimate source**.
- This tricks the target system into accepting the malicious packets.

**History:**
- Initially discussed academically in the **1980s**.
- Exploits weaknesses in the **TCP protocol's sequence prediction**.

**Common Uses of IP Spoofing:**

**DoS/DDoS Attacks:**
- Attackers send massive amounts of traffic from **spoofed IPs** to overwhelm a target.
- Used to **hide the source** of denial-of-service attacks.

**Man-in-the-Middle Attacks:**
- Intercepting communication between two parties by **impersonating one of them**.

**Session Hijacking:**
- Taking over an established network session.

**Prevention:**
- **Packet filtering** at routers and firewalls.
- **Ingress filtering** — ISPs blocking packets with spoofed source addresses.
- **Cryptographic authentication** protocols (IPSec).
- **Deep packet inspection**.`,
    companies: ["Cisco", "Palo Alto", "Cloudflare", "Amazon", "Microsoft"],
  },
  {
    id: 46,
    question: "What do threat, vulnerability, and risk mean in cybersecurity?",
    answer: `These three terms form the foundation of **cybersecurity risk assessment**.

**Threat:**
- Any **potential cause** that can exploit a vulnerability to cause harm to assets such as people, property, or information.
- Threats can be **intentional** (hackers, malware) or **unintentional** (natural disasters, human error).
- Examples: Malware, phishing attacks, insider threats, ransomware.

**Vulnerability:**
- A **weakness or gap in security measures** that can be exploited by a threat.
- Can exist in software, hardware, processes, or human behavior.
- Examples: Unpatched software, weak passwords, misconfigured firewalls, open ports.

**Risk:**
- The **potential for loss or damage**, arising from the combination of assets, threats, and vulnerabilities.
- Represented as: **Risk = Asset + Threat + Vulnerability (A + T + V = R)**
- Risk quantifies the **likelihood and impact** of a threat exploiting a vulnerability.

**Relationship:**
- A **vulnerability** without a **threat** poses no risk.
- A **threat** without a **vulnerability** cannot cause harm.
- **Risk** exists when both a threat and a vulnerability are present.

**Example:**
- **Vulnerability:** Unpatched web server.
- **Threat:** Hacker attempting SQL injection.
- **Risk:** Potential data breach from the combination.`,
    companies: ["Cisco", "Palo Alto", "Amazon", "Microsoft", "Google"],
  },
  {
    id: 47,
    question: "How does an Intrusion Prevention System (IPS) differ from a firewall?",
    answer: `**Intrusion Prevention System (IPS):**
- Monitors **network and system activities** to detect and **actively prevent** malicious behavior.
- Extends the functions of **Intrusion Detection Systems (IDS)** by not only identifying threats but also **blocking them**.
- Analyzes **traffic content and patterns** for known attack signatures.
- Can **automatically block, drop, or alert** on suspicious traffic.
- Operates **inline** — traffic passes through the IPS.

**Firewall:**
- Controls traffic based on **predefined security rules** (IP, port, protocol).
- Does **not perform active threat detection** — only enforces access policies.
- Acts as a **barrier** based on network parameters.
- Permits or denies traffic based on **static rules**.

**Key Differences:**

| Feature | IPS | Firewall |
|---|---|---|
| Function | Detects and prevents threats | Controls access based on rules |
| Traffic Analysis | Deep content inspection | Header-based inspection |
| Response | Active blocking | Rule-based allow/deny |
| Threat Detection | Yes | No |
| Position | Inline with traffic | Network perimeter |

**Modern Note:**
- **Next-Generation Firewalls (NGFW)** like Palo Alto combine firewall and IPS functionality into a single device.`,
    companies: ["Cisco", "Palo Alto", "Cloudflare", "Amazon", "Microsoft"],
  },
  {
    id: 48,
    question: "What is the difference between symmetric and asymmetric encryption?",
    answer: `**Symmetric Encryption:**
- Uses a **single key** for both **encryption and decryption**.
- The same key must be shared between sender and receiver.
- **Easier and faster** to use — lower computational overhead.
- **Less secure** due to **key distribution challenges** — securely sharing the key is difficult.
- Best for **encrypting large amounts of data**.
- Examples: **AES (Advanced Encryption Standard), DES, 3DES**.
- Use cases: File encryption, disk encryption, VPN tunnels.

**Asymmetric Encryption:**
- Uses a **pair of keys** — a **public key** (for encryption) and a **private key** (for decryption).
- The public key can be shared openly; the private key is kept secret.
- Offers **higher security** — no need to share the private key.
- **Computationally slower** due to complex mathematical operations.
- Best for **key exchange and digital signatures**.
- Examples: **RSA, ECC (Elliptic Curve Cryptography), DSA**.
- Use cases: HTTPS (SSL/TLS), digital certificates, email encryption (PGP).

**How They Work Together:**
- In practice, **HTTPS uses both** — asymmetric encryption to securely exchange a symmetric session key, then symmetric encryption for the actual data transfer (faster).`,
    imageUrls: ["/images/interview-questions/cn/Q48.png"],
    imageCaptions: ["Figure 48: ★ Symmetric vs Asymmetric Encryption"],
    companies: ["Google", "Amazon", "Microsoft", "Cloudflare", "Palo Alto"],
  },
  {
    id: 49,
    question: "What is a zone-based firewall?",
    answer: `A **Zone-Based Firewall** is an **advanced stateful firewall** that organizes network interfaces into **security zones** and controls traffic between them based on policies.

**Key Characteristics:**
- Maintains a **database recording source and destination IP addresses and port numbers**.
- **Permits only traffic initiated from inside the network** and the corresponding replies from outside.
- Traffic between zones is **denied by default** unless explicitly permitted by a policy.

**How it Works:**
- Network interfaces are assigned to **zones** (e.g., Inside, Outside, DMZ).
- Security policies are defined **between zone pairs** rather than individual interfaces.
- Only traffic matching an **explicit allow policy** between zones is permitted.

**Cisco Implementation:**
- Cisco IOS routers can be configured as firewalls using:
  - **CBAC (Context-Based Access Control)** — older method.
  - **Zone-Based Firewall (ZBF)** — newer, simplified approach.
- ZBF **simplifies administration** compared to CBAC.

**Common Zones:**
- **Inside Zone:** Trusted internal network.
- **Outside Zone:** Untrusted external network (Internet).
- **DMZ (Demilitarized Zone):** Semi-trusted zone for public-facing servers.

**Advantage:**
- More **scalable and manageable** than traditional ACL-based firewalls.`,
    companies: ["Cisco", "Palo Alto", "Check Point", "Amazon", "Microsoft"],
  },
  {
    id: 50,
    question: "What happens technically when you type google.com into a web browser?",
    answer: `When you enter \`google.com\` in a browser, the following steps occur:

**1. Cache Check:**
- The browser checks its **local cache** for fresh content and displays it if available.

**2. DNS Resolution:**
- If not cached, the browser checks for the IP in its **own cache and OS cache**.
- If absent, it sends a **DNS lookup request via UDP** to the configured DNS server.
- The DNS server resolves \`google.com\` to an IP address (e.g., \`142.250.80.78\`).

**3. TCP Connection:**
- A new **TCP connection is established** through a **three-way handshake** (SYN → SYN-ACK → ACK).
- If HTTPS, an additional **TLS handshake** occurs to establish an encrypted session.

**4. HTTP Request:**
- The browser sends an **HTTP/HTTPS GET request** over the established connection.

**5. Server Response:**
- Google's web server **processes the request** and sends back an **HTTP response** with HTML, CSS, JS content.

**6. Connection Management:**
- The browser optionally **closes or reuses** the TCP connection (HTTP keep-alive).

**7. Caching:**
- If the response is **cacheable**, it stores it for future use.

**8. Rendering:**
- The browser **decodes and renders** the web page content, making additional requests for images, scripts, and stylesheets as needed.`,
    imageUrls: ["/images/interview-questions/cn/Q50.png"],
    imageCaptions: ["Figure 50: ★ DNS Resolution Process"],
    companies: ["Google", "Amazon", "Microsoft", "Cloudflare", "Flipkart"],
  },
];