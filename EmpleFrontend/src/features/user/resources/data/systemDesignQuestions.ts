import { InterviewQuestion } from "../types/interviewQuestion";

export const SYSTEM_DESIGN_QUESTIONS: InterviewQuestion[] = [
  {
    id: 1,
    question: "What is CAP Theorem?",
    answer: `The CAP theorem states that a distributed system cannot simultaneously guarantee all three properties: **Consistency**, **Availability**, and **Partition Tolerance**. It can only guarantee at most two of these at the same time.

**Consistency (C):** After an operation, all nodes see the same data, so queries return the same result.

**Availability (A):** The system remains operational and responsive without downtime.

**Partition Tolerance (P):** The system continues functioning despite network communication failures between nodes.

**Database Trade-offs:**
- **RDBMS** (MySQL, PostgreSQL, etc.) - CA (Consistency + Availability)
- **Redis, MongoDB, HBase** - CP (Consistency + Partition Tolerance)
- **Cassandra, CouchDB, Riak** - AP (Availability + Partition Tolerance)

This trade-off helps understand the design choices behind different distributed database systems.`,
    imageUrls: ["/images/interview-questions/system-design/Q1.png"],
    imageCaptions: ["Figure 1: CAP theorem showing trade-offs among Consistency, Availability, and Partition Tolerance."],
    companies: ["Google", "Facebook", "Amazon", "Microsoft", "Apple"],
  },
  {
    id: 2,
    question: "How do NoSQL databases differ from SQL databases?",
    answer: `**SQL:**

**Model**

- Follows relational model.

**Data**

- Deals with structured data.

**Flexibility**

- SQL follows a strict schema.

**Transactions**

- Follows ACID (Atomicity, Consistency, Isolation, Durability) properties.

**NoSQL:**

**Model**

- Follows the non-relational model.

**Data**

- Deals with semi-structured data.

**Flexibility**

- NoSQL deals with dynamic schema and is very flexible.

**Transactions**

- Follows BASE (Basic Availability, Soft-state, Eventual consistency) properties.`,
    imageUrls: ["/images/interview-questions/system-design/Q2.png"],
    imageCaptions: ["Figure 2: Comparison between SQL and NoSQL database models."],
    companies: ["Amazon", "Microsoft", "Google", "Oracle"],
  },
  {
    id: 3,
    question: "How would you design a global chat service like WhatsApp or Facebook Messenger?",
    answer: `**Required Features**

- Allow users to chat over the internet.
- Provide support for one-on-one and group chats.
- Messages need to be stored for better viewing.
- Messages need to be encrypted for security purposes.

**Common Problems**

- What would happen to a message if it is sent without an internet connection?
- Will encrypting and decrypting increase the latency?
- How are the messages sent and notified to the device?

**Possible Tips for Consideration**

- Split database schema into multiple tables such as user table, chat table, message table etc.
- Make use of web sockets for bi-directional communication between the device and the server.
- Make use of push notifications for notifying the members even if they are online.`,
    companies: ["Meta", "Microsoft", "Amazon", "Uber"],
  },
  {
    id: 4,
    question: "How would you design a URL shortening service like TinyURL or bit.ly?",
    answer: `TinyURL or bit.ly takes a long URL and generates a new unique short URL. These systems are also capable of taking the shortened URL and returning the original full URL.

**Required Features**

- Generate a short URL having a length shorter than the original URL.
- Store the original URL and map it to the shortened one.
- Allow redirects in the shortened URLs.
- Support custom names for short URLs.
- Handle multiple requests at the same time.

**Common Problems**

- What if two users input the same custom URL?
- What happens if there are more user load than expected?
- How do you regulate the database storage space?

**Possible Tips for Consideration**

- The concept of hashing can be used for linking original and new URLs.
- REST API can be used for balancing high traffic and handling front-end communication.
- Multithreading concept for handling multiple requests at the same time.
- NoSQL databases for storing original URLs.`,
    companies: ["Amazon", "Google", "Microsoft", "Atlassian"],
  },
  {
    id: 5,
    question: "How would you design a global file storage and sharing service like Google Drive or Dropbox?",
    answer: `**Required Features**

- Users should be able to upload, delete, share, and download files over the web.
- File updates should be synced across multiple devices.

**Common Problems**

- Where to store the files?
- How can you handle updates? Should the files be re-uploaded or should only the modified version be updated?
- How to handle updating two documents at the same time?

**Possible Tips for Consideration**

- Consider using chunking for splitting files into multiple sections, so a particular section can be re-uploaded instead of the whole file.
- Use cloud storage for storing the files.`,
    companies: ["Google", "Dropbox", "Microsoft"],
  },
  {
    id: 6,
    question: "How would you design a ride-sharing system like Uber, Ola, or Lyft?",
    answer: `These platforms help users request rides and drivers pick them up from the requested location and drop them at the selected destination.

**Required Features**

- Real-time ride booking service.
- Efficient ride assignment to help users reach their destination quickly.
- Show ETA of the driver after booking, and after the ride has started, show ETA to destination.

**Common Problems**

- How to store drivers' geographical locations while they are constantly moving?
- How to assign drivers to customers efficiently?
- How to calculate ETA for driver arrival or destination arrival?

**Possible Tips for Consideration**

- Use microservices with fast databases for booking rides quickly.
- Evaluate dispatch systems for assigning drivers to users.`,
    companies: ["Uber", "Lyft", "Ola", "Grab"],
  },
  {
    id: 7,
    question: "What advantages does normalization offer when creating a database schema?",
    answer: `Normalization organizes database tables to minimize redundancy and enhance data consistency. It structures data efficiently, making the database easier to manage and maintain. Key benefits include eliminating duplicate data, improving data integrity, and ensuring more dependable updates, inserts, and deletions. For example, instead of repeating customer information in every order, normalization stores Customers and Orders in separate tables linked by a customer ID, preventing data duplication.`,
    companies: ["Amazon", "Microsoft", "Google", "Oracle"],
  },
  {
    id: 8,
    question: "How can you design a secure authentication and authorization system for a distributed application?",
    answer: `A secure authentication and authorization system verifies user identities and manages access to resources across distributed services effectively. It integrates strong identity management, token-based authentication, and detailed access control. This includes using protocols like OAuth 2.0, JWT, multi-factor authentication (MFA), and password hashing for secure identity verification. Authorization is managed through role-based (RBAC) or attribute-based access control (ABAC) with centralized identity providers and token validation across services. For instance, in a microservices setup, a user logs in through an identity provider, obtains a JWT token, and each service checks the token before granting access based on assigned roles such as admin or user.`,
    companies: ["Amazon", "Google", "Microsoft", "Okta"],
  },
  {
    id: 9,
    question: "How do you choose between Monolithic and Microservices architectures in High-Level Design (HLD)?",
    answer: `The decision between Monolithic and Microservices architectures depends on factors such as the application's size, scalability needs, complexity, and team organization. Monolithic architecture fits smaller, simpler applications, while microservices suit large-scale, highly scalable systems. Monoliths are easier to develop and deploy initially but can become challenging to scale and maintain as complexity grows. Microservices offer independent scalability and flexibility but add operational and communication overhead. For example, startups often start with monolithic designs for quick development, whereas companies like Netflix and Amazon adopt microservices to scale services independently.

**Rule of thumb:** Begin with a monolithic approach for small systems, then refactor to microservices as the system expands.`,
    companies: ["Amazon", "Netflix", "Google", "Microsoft"],
  },
  {
    id: 10,
    question: "What are the trade-offs between Relational and Non-Relational (NoSQL) databases in High-Level Design?",
    answer: `Choosing between Relational and NoSQL databases depends on data structure, scalability, consistency requirements, and workload types. Relational databases excel with structured data, strong consistency, and support for complex queries, while NoSQL databases provide flexible schemas, horizontal scalability, and high performance for large distributed systems. For example, banking systems rely on relational databases like MySQL or PostgreSQL for transactional accuracy, whereas social media platforms use NoSQL databases such as MongoDB or Cassandra to manage huge volumes of unstructured data and high traffic.`,
    companies: ["Google", "Amazon", "Facebook", "Cassandra"],
  },
  {
    id: 11,
    question: "How do you ensure high availability in a High-Level Design?",
    answer: `High availability means keeping a system operational and accessible despite failures or heavy loads. It is achieved by removing single points of failure and building redundancy, failover, and distributed infrastructure. Techniques include replication, load balancing, failover mechanisms, continuous monitoring, and disaster recovery planning. For instance, a cloud application uses load balancers to distribute traffic across multiple servers, automatically redirecting requests if one server fails, thus maintaining uninterrupted service.`,
    companies: ["AWS", "Azure", "Google Cloud", "Cloudflare"],
  },
  {
    id: 12,
    question: "What is load balancing, and why is it important in High-Level Design?",
    answer: `Load balancing distributes incoming network or application traffic across multiple servers to optimize resource use, ensure high availability, and enhance system performance. It prevents any single server from being overwhelmed, improving scalability and fault tolerance. For example, a web application might use a load balancer like Nginx or AWS ELB to evenly distribute user requests among several servers, ensuring efficient handling of peak traffic without downtime.`,
    companies: ["Amazon", "Google", "NGINX", "F5"],
  },
  {
    id: 13,
    question: "What are the essential considerations for designing a scalable system in High-Level Design?",
    answer: `Designing a scalable system involves ensuring the application can handle increasing users, traffic, and data without losing performance. This requires workload distribution, resource optimization, and bottleneck reduction. Common techniques include horizontal scaling, caching, data partitioning, and database replication. Performance and reliability can also be enhanced with asynchronous processing and distributed infrastructure. For example, a video streaming service employs CDNs for static content, Redis for caching, and multiple servers behind a load balancer to support millions of concurrent viewers.`,
    companies: ["Netflix", "Amazon", "Google", "Akamai"],
  },
  {
    id: 14,
    question: "What is the purpose of database indexing?",
    answer: `Database indexing is a method used to speed up data retrieval by creating a structured reference to the data within a table. Indexes allow the database to quickly find records without scanning the entire table. This significantly enhances query performance and reduces retrieval time. However, indexing requires additional storage and can slightly slow down insert or update operations. For example, in a banking system, an index on the account number field enables quick access to customer accounts during transactions.`,
    companies: ["Oracle", "Microsoft", "MySQL", "PostgreSQL"],
  },
  {
    id: 15,
    question: "How can data consistency be maintained across distributed systems in High-Level Design?",
    answer: `Data consistency in distributed systems ensures that all nodes or services have synchronized and accurate data, even with concurrent operations. The chosen consistency model depends on business needs, scalability, and availability. Techniques include distributed transactions, idempotent operations, and conflict resolution. Systems may opt for strong consistency or eventual consistency based on the CAP theorem trade-offs. For example, online banking uses strong consistency to keep account balances accurate, whereas social media feeds use eventual consistency for better scalability.`,
    companies: ["Google", "Amazon", "Microsoft", "Cassandra"],
  },
  {
    id: 16,
    question: "What is the importance of fault tolerance in High-Level Design?",
    answer: `Fault tolerance ensures a system continues operating correctly even if some components fail or become unavailable. It enhances reliability by reducing downtime and preventing widespread failures. This is achieved through redundancy, replication, and isolating failures. Fault tolerance also improves user experience via graceful degradation and recovery processes. For instance, in a microservices application, if the recommendation service fails, the core application keeps running by temporarily disabling recommendations rather than crashing completely.`,
    companies: ["Netflix", "Amazon", "Google", "Microsoft"],
  },
  {
    id: 17,
    question: "How do you incorporate disaster recovery in High-Level Design?",
    answer: `Disaster recovery in HLD aims to enable quick system recovery and continued operation after major incidents such as server failures, data loss, or regional outages. It involves backup procedures, data replication, failover mechanisms, and recovery planning to minimize downtime and data loss. Strategies include geo-replication, automated failovers, and defining recovery metrics like RPO (Recovery Point Objective) and RTO (Recovery Time Objective). For example, a cloud app replicates its database across multiple regions so that if one data center fails, traffic redirects to another region with minimal disruption.`,
    companies: ["AWS", "Azure", "Google Cloud", "IBM"],
  },
  {
    id: 18,
    question: "What is Event-Driven Architecture and how is it applied in High-Level Design?",
    answer: `Event-Driven Architecture (EDA) is a design pattern where components interact by producing and consuming events asynchronously, rather than through direct synchronous calls. Producers create events that are sent to an event broker or message queue, and consumers process these events independently. This approach decouples components, enhancing scalability, resilience, and flexibility. For example, in an e-commerce platform, placing an order triggers an event published to Kafka or RabbitMQ, which various services like payment, inventory, and notifications consume to perform their functions.`,
    companies: ["Confluent", "Amazon", "Google", "Red Hat"],
  },
  {
    id: 19,
    question: "How does a cache determine when it is full and which data to evict?",
    answer: `A cache constantly monitors its memory usage as data is added, updated, or removed. Each cache entry has a size, and the cache manager tracks the total memory consumed. When new data is inserted, the cache calculates its size and adds it to current usage. If this total exceeds the cache’s configured limit, an eviction policy such as Least Recently Used (LRU) or Least Frequently Used (LFU) is triggered to free up space. For example, if a Redis cache with a 1 GB limit is using 950 MB and a new 100 MB object is added, Redis will evict older or less-used entries until usage falls below 1 GB.`,
    companies: ["Redis Labs", "Amazon", "Google", "Microsoft"],
  },
  {
    id: 20,
    question: "What are the key principles of RESTful API design in High-Level Design?",
    answer: `RESTful API design follows architectural guidelines that promote scalable, standardized, and maintainable communication between clients and servers. It emphasizes resource-based communication, stateless interactions, and adherence to HTTP standards. This includes using resource-oriented URIs, standard HTTP methods (GET, POST, DELETE, etc.), and status codes for clear, consistent communication. Scalability and maintainability are supported through statelessness, versioning, and content negotiation. For example, a user management API might have endpoints like GET /users/1, POST /users, and DELETE /users/1, treating users as distinct resources with appropriate HTTP methods.`,
    companies: ["Amazon", "Google", "Microsoft", "Red Hat"],
  },
  {
    id: 21,
    question: "What is the function of a message broker in High-Level Design? Provide examples.",
    answer: `A message broker is middleware that facilitates asynchronous communication between services by receiving, storing, and forwarding messages. It decouples system components, enhancing scalability, reliability, and fault tolerance in distributed architectures. Message brokers enable loose coupling by buffering messages and managing their delivery. For example, in an e-commerce system, when an order is placed, a message broker such as Kafka or RabbitMQ sends events to inventory, payment, and notification services independently, eliminating the need for direct service-to-service calls.`,
    companies: ["Confluent", "Pivotal", "Amazon", "VMware"],
  },
  {
    id: 22,
    question: "What is database replication, and why is it important?",
    answer: `Database replication involves copying and synchronizing data across multiple database servers to boost availability, reliability, and performance. It ensures that the system remains operational even if a database server fails. Replication improves fault tolerance by maintaining multiple data copies and enhances read scalability by distributing read queries among replicas. For instance, in an e-commerce platform, the primary database handles write operations, while replica databases serve read requests such as product searches and order histories.`,
    companies: ["AWS", "Google Cloud", "Microsoft", "Oracle"],
  },
  {
    id: 23,
    question: "What is a distributed cache in High-Level Design, and what benefits does it offer?",
    answer: `A distributed cache stores cached data across multiple servers or nodes rather than a single machine, enabling faster and scalable data access in distributed systems. It reduces database load and boosts application performance by serving frequently requested data from memory.

**Key Benefits:**

**Performance:** Serves frequently requested data from memory, significantly reducing response times.

**Scalability:** Spreads cached data across nodes, allowing the system to handle higher loads efficiently.

**Fault Tolerance:** Provides resilience through cache replication across multiple nodes.

**Reduced Database Load:** Offloads repetitive read queries from the primary database.

For example, an e-commerce platform might use a distributed cache like **Redis Cluster** to store popular product details, ensuring rapid responses even during peak traffic.`,
    companies: ["Google", "Microsoft", "Meta", "Amazon", "Redis Labs"],
  },
  {
    id: 24,
    question: "How does the CAP theorem influence the design of distributed databases?",
    answer: `The CAP theorem states that a distributed system can guarantee only two of the following three properties simultaneously: **Consistency**, **Availability**, and **Partition Tolerance**. This principle guides architects in balancing trade-offs based on business priorities and system needs.

**CP Systems (Consistency + Partition Tolerance):**
- Focus on consistent data at the cost of availability during network partitions.
- Example: Banking systems that prioritize accurate transactions.

**AP Systems (Availability + Partition Tolerance):**
- Emphasize continuous availability even during network issues, at the cost of strict consistency.
- Example: Social media platforms that favor user access over perfect data consistency.

The choice depends on whether strict data consistency or continuous availability is more critical for the business use case.`,
    companies: ["Google", "Amazon", "Microsoft", "Cassandra", "MongoDB"],
  },
  {
    id: 25,
    question: "What distinguishes Horizontal Scaling from Vertical Scaling?",
    answer: `Scaling increases a system's capacity to handle more traffic, users, or workload. The two primary approaches differ in how they achieve this growth.

**Horizontal Scaling (Scale Out):**
- Adds more machines to distribute the load across multiple servers.
- Improves both scalability and fault tolerance.
- No theoretical upper limit.
- Example: A social media service adding multiple servers behind a load balancer.

**Vertical Scaling (Scale Up):**
- Enhances the capacity of an existing machine by upgrading hardware components like CPU, RAM, or storage.
- Simpler to implement initially but has physical limits.
- Example: A smaller application upgrading a single server's resources.

**Rule of thumb:** Vertical scaling works well for smaller systems, but horizontal scaling is preferred for large-scale distributed applications.`,
    companies: ["Amazon", "Google", "Microsoft", "Netflix"],
  },
  {
    id: 26,
    question: "What is Rate Limiting and why is it important?",
    answer: `Rate limiting controls the number of requests a client can make to a server within a defined time frame. It is a critical mechanism for protecting systems from abuse and maintaining stability.

**Why it matters:**

**Security:** Protects against denial-of-service (DoS) attacks and brute-force attempts by blocking excessive requests.

**Fair Resource Allocation:** Ensures no single user monopolizes server resources, keeping the system fair for all clients.

**System Stability:** Prevents server overload during traffic spikes, maintaining consistent performance.

**Common Algorithms:**
- Token Bucket
- Leaky Bucket
- Sliding Window Counter
- Fixed Window Counter

For example, a public API might restrict users to **100 requests per minute** to avoid misuse and sustain performance. HTTP status code **429 (Too Many Requests)** is returned when the limit is exceeded.`,
    companies: ["Amazon", "Google", "Cloudflare", "Stripe", "Twitter"],
  },
  {
    id: 27,
    question: "What do latency, throughput, and availability mean in system design?",
    answer: `Latency, throughput, and availability are the three core metrics for assessing system performance and reliability.

**Latency:**
- Measures the delay between a client sending a request and receiving a response.
- Lower is better; critical for real-time systems.
- Example: A video streaming service needs low latency so videos start quickly.

**Throughput:**
- Indicates how many requests the system can successfully handle in a given time period.
- Higher is better; important for high-traffic systems.
- Example: A streaming platform must support millions of concurrent streams.

**Availability:**
- Reflects the proportion of time the system remains operational and accessible, often expressed as a percentage (e.g., 99.9% uptime).
- Example: A streaming service needs high availability to ensure uninterrupted access at all times.

These three metrics often involve trade-offs and must be balanced based on the system's requirements.`,
    companies: ["Google", "Amazon", "Netflix", "Microsoft", "Cloudflare"],
  },
  {
    id: 28,
    question: "How do sharding and database partitioning differ?",
    answer: `Both sharding and partitioning split large datasets into smaller parts for better performance and manageability, but they differ in scope and distribution.

**Partitioning:**
- Divides data into segments **within the same database system**.
- Improves manageability and query performance inside a single database.
- Example: A company partitioning customer data by region within one database.

**Sharding:**
- Distributes data **across multiple database servers**.
- Enhances scalability and handles massive workloads by spreading data horizontally.
- Example: A large social media platform sharding user data across multiple servers globally.

**Key Difference:** Partitioning is an internal database optimization, while sharding is a distributed architecture strategy. Sharding introduces additional complexity around cross-shard queries and data rebalancing.`,
    companies: ["Facebook", "Amazon", "Google", "MongoDB", "MySQL"],
  },
  {
    id: 29,
    question: "What is caching and what are the different cache update strategies in system design?",
    answer: `Caching temporarily stores frequently accessed data in fast memory to speed up future requests, reducing response time and server load.

**Common Cache Update Strategies:**

**Write-Through:**
- Cache and database are updated simultaneously on every write.
- Ensures strong consistency but adds write latency.

**Write-Back (Write-Behind):**
- Cache is updated first; the database is updated asynchronously later.
- Improves write performance but risks data loss on cache failure.

**Cache-Aside (Lazy Loading):**
- Application checks the cache first; if a miss occurs, it fetches from the database and populates the cache.
- Cache is updated only on demand, keeping it lean.

**Write-Around:**
- Writes go directly to the database, bypassing the cache entirely.
- Useful for data that is written once and rarely read.

**Strategy choice** depends on consistency requirements, read/write patterns, and performance goals. For example, an e-commerce site might cache popular product info using **Write-Through** for consistency or **Cache-Aside** for flexibility.`,
    companies: ["Amazon", "Google", "Redis Labs", "Microsoft", "Netflix"],
  },
  {
    id: 30,
    question: "What is a Content Delivery Network (CDN) and how does it work in system design?",
    answer: `A Content Delivery Network (CDN) is a globally distributed network of servers that caches and delivers content from locations geographically closer to the end user.

**How it works:**
1. Static assets (images, videos, scripts, files) are cached on **edge servers** distributed around the world.
2. When a user requests content, the CDN routes the request to the **nearest edge server** rather than the origin server.
3. If the edge server has the content cached, it serves it directly (**cache hit**); otherwise, it fetches from the origin and caches it for future requests (**cache miss**).

**Key Benefits:**
- **Reduced Latency:** Content is served from a nearby server, minimizing travel time.
- **Reduced Origin Load:** Edge servers absorb the majority of traffic, protecting the origin server.
- **High Availability:** CDNs handle traffic spikes and DDoS attacks effectively.

For example, when streaming a video, a CDN delivers content from the nearest edge server, resulting in faster playback and reduced buffering.`,
    companies: ["Akamai", "Cloudflare", "Amazon", "Google", "Netflix"],
  },
  {
    id: 31,
    question: "How do message queues such as Kafka and RabbitMQ enhance system design?",
    answer: `Message queues like Kafka and RabbitMQ facilitate **asynchronous communication** between different services or components, enabling them to exchange data without direct dependencies. This decoupling allows systems to process tasks more efficiently and handle large request volumes smoothly.

**Key Benefits:**

**Decoupling:** Services operate independently without tight dependencies on each other.

**Scalability:** Buffers messages during traffic spikes, preventing bottlenecks and allowing services to scale independently.

**Reliability:** Messages are persisted in the queue, ensuring delivery even if a service is temporarily unavailable.

**Kafka vs RabbitMQ:**
- **Kafka:** High-throughput, durable, distributed log — ideal for event streaming and real-time analytics. Retains messages for a configurable period (default 7 days).
- **RabbitMQ:** Lightweight, flexible routing with pub-sub and point-to-point patterns — ideal for task queues and background jobs.

For example, in a food delivery app, once an order is placed, a message queue distributes events independently to payment, notification, and delivery services, allowing each to process tasks without slowing down the main application.`,
    companies: ["LinkedIn", "Uber", "Amazon", "Confluent", "Netflix"],
  },
  {
    id: 32,
    question: "What are the differences between synchronous and asynchronous communication in distributed systems?",
    answer: `In distributed systems, the communication style between services has a significant impact on performance, scalability, and resilience.

**Synchronous Communication:**
- The sender waits for an immediate response before proceeding.
- Results in tighter coupling and potential delays if the receiver is slow or unavailable.
- Suitable for operations requiring instant feedback.
- Example: Payment verification APIs where the user expects instant confirmation.

**Asynchronous Communication:**
- The sender continues processing without waiting for a response.
- Enables better scalability and responsiveness by decoupling services.
- Messages are handled via brokers like Kafka or RabbitMQ.
- Example: Email notifications processed asynchronously after an order is placed.

**When to use which:**
- Use **synchronous** for real-time, user-facing operations requiring immediate results.
- Use **asynchronous** for background tasks, notifications, and any work that can be deferred without impacting user experience.`,
    companies: ["Amazon", "Google", "Netflix", "Uber", "Microsoft"],
  },
  {
    id: 33,
    question: "How would you design an API Gateway?",
    answer: `An API Gateway serves as a **single entry point** for all client requests in a microservices architecture. It routes incoming requests to the appropriate backend services and manages cross-cutting concerns centrally.

**Core Responsibilities:**

**Request Routing:** Directs requests to the correct microservice based on the URL path or headers.

**Authentication & Authorization:** Validates JWT tokens or API keys before forwarding requests to services.

**Rate Limiting:** Enforces per-client request limits to protect backend services from abuse.

**Load Balancing:** Distributes traffic across multiple instances of a service.

**Request Aggregation:** Combines responses from multiple services into a single response for the client.

**Logging & Monitoring:** Centralized observability for all incoming traffic.

**Popular Tools:** AWS API Gateway, Kong, Nginx, Apigee.

For example, in an e-commerce platform, the API Gateway handles requests from mobile and web apps, routing them to User, Product, and Payment services — while enforcing rate limits and validating tokens at a single layer.`,
    companies: ["Amazon", "Google", "Kong", "Apigee", "Microsoft"],
  },
  {
    id: 34,
    question: "What is the Circuit Breaker Pattern?",
    answer: `The Circuit Breaker Pattern is a **fault-tolerance strategy** used to prevent repeated calls to failing services in distributed systems. It enhances system resilience by stopping cascading failures during outages and allowing graceful recovery.

**How it works — three states:**

**Closed (Normal):** Requests flow through normally. Failures are counted.

**Open (Tripped):** After a failure threshold is exceeded, the circuit "opens" and all requests are immediately rejected or given a fallback response — no calls reach the failing service.

**Half-Open (Recovery):** After a timeout, a limited number of test requests are allowed through. If they succeed, the circuit closes again; if they fail, it reopens.

**Benefits:**
- Prevents cascading failures across services.
- Reduces load on a failing service, giving it time to recover.
- Provides fallback responses to maintain partial functionality.

For example, if the payment service in a microservices app becomes unavailable, the circuit breaker stops further calls to it, returning a graceful error message instead of causing a system-wide failure.`,
    
    companies: ["Netflix", "Amazon", "Microsoft", "Google", "Uber"],
  },
  {
    id: 35,
    question: "What is Consistent Hashing?",
    answer: `Consistent hashing is a **distributed hashing technique** that evenly distributes data across multiple servers while minimizing data movement when servers are added or removed. It is widely used in distributed caching and database sharding.

**How it works:**
- Both servers and data keys are mapped onto a circular "hash ring."
- Each key is assigned to the nearest server clockwise on the ring.
- When a server is added or removed, only the keys on the adjacent segment of the ring need to be redistributed — not all keys.

**Why it matters:**
- **Minimal Reshuffling:** Adding or removing a node only affects a small fraction of keys, unlike traditional hashing where nearly all keys may need remapping.
- **Even Distribution:** Data and load are spread evenly across nodes.
- **Scalability:** New nodes can be added seamlessly as the system grows.

**Virtual Nodes:** To improve balance, each server is assigned multiple virtual positions on the ring.

For example, **Redis Cluster** uses consistent hashing to efficiently distribute cached data across many nodes, ensuring minimal disruption when the cluster scales.`,
    
    companies: ["Amazon", "Google", "Redis Labs", "Akamai", "Cassandra"],
  },
  {
    id: 36,
    question: "What is Service Discovery?",
    answer: `Service discovery is a mechanism in microservices architectures that allows services to **dynamically locate and communicate with each other** without relying on hardcoded network addresses. As service instances scale up or down, their addresses change — service discovery automates this tracking.

**Two main approaches:**

**Client-Side Discovery:**
- The client queries a service registry (e.g., Eureka, Consul) and selects an available instance itself.
- More control, but adds discovery logic to each client.

**Server-Side Discovery:**
- The client sends the request to a load balancer or API gateway, which queries the registry and routes the request.
- Simpler for clients; discovery is centralized.

**Popular Tools:**
- **Consul** — health checking and key-value store.
- **Eureka** — Netflix's service registry for Spring Cloud.
- **Kubernetes DNS** — built-in service discovery for containerized workloads.

For example, Kubernetes uses internal DNS and service registries to enable services to find one another automatically as pods scale in and out.`,
    companies: ["Netflix", "Google", "Amazon", "HashiCorp", "Kubernetes"],
  },
  {
    id: 37,
    question: "What is a Reverse Proxy?",
    answer: `A reverse proxy is a server that sits **in front of backend servers**, accepting client requests and forwarding them on the backend's behalf. Unlike a forward proxy (which acts for clients), a reverse proxy acts for servers.

**Key Functions:**

**Load Balancing:** Distributes incoming traffic across multiple backend servers to prevent overload.

**Security:** Hides backend server details (IPs, topology) from clients, reducing the attack surface.

**Caching:** Caches responses for static content, reducing load on backend servers.

**SSL Termination:** Handles HTTPS encryption/decryption, offloading this work from backend services.

**Request Routing:** Routes requests to different services based on URL paths or headers.

**Popular Tools:** Nginx, HAProxy, AWS CloudFront, Cloudflare.

For example, **Nginx** functions as a reverse proxy by accepting user requests and directing them to multiple application servers behind it, while also caching static assets and handling SSL.`,
    companies: ["Cloudflare", "Amazon", "NGINX", "Google", "Akamai"],
  },
  {
    id: 38,
    question: "What distinguishes ACID from BASE in database systems?",
    answer: `ACID and BASE represent two contrasting consistency models used in database systems, each suited to different use cases.

**ACID (Atomicity, Consistency, Isolation, Durability):**
- Emphasizes **strong consistency** and reliability.
- Enforces strict transaction rules — all operations either fully complete or fully roll back.
- Primarily used in **relational databases** (PostgreSQL, MySQL, Oracle).
- Gives higher priority to **data accuracy**.
- Best suited for **critical transactional systems** like banking and financial applications.

**BASE (Basically Available, Soft-state, Eventually Consistent):**
- Emphasizes **high availability and scalability**.
- Allows eventual consistency instead of immediate consistency — data will become consistent over time.
- Commonly used in **NoSQL databases** (Cassandra, DynamoDB, CouchDB).
- Gives higher priority to **availability and partition tolerance**.
- Ideal for **large distributed systems** like social media platforms and recommendation engines.

For example, banking systems use ACID-compliant databases like PostgreSQL for precise transactions, whereas social media platforms rely on BASE databases like Cassandra for scalability.`,
    imageUrls: ["/images/interview-questions/system-design/Q38.png"],
    imageCaptions: ["Figure 38: Comparison of ACID and BASE database properties — focusing on consistency, availability, transaction rules, and best use cases."],
    companies: ["Oracle", "Google", "Amazon", "Microsoft", "Cassandra"],
  },
  {
    id: 39,
    question: "What is the difference between High-Level Design (HLD) and Low-Level Design (LLD)?",
    answer: `HLD and LLD represent two distinct phases of system design, each operating at a different level of abstraction.

**HLD (High-Level Design):**
- Deals with the **big picture** and overall system structure.
- Identifies major modules, databases, APIs, and the scalability approach.
- Created during the **system planning and design phase**.
- Explains how high-level components interact with each other.
- Architecture-centric and system-wide perspective.

**LLD (Low-Level Design):**
- Deals with the **small pieces** and component-level details.
- Defines classes, methods, variables, and object interactions.
- Prepared **just before coding and implementation**.
- Explains the internal logic and workflow of each module.
- Implementation-centric and code-focused.

**In practice:**
- HLD answers *what* the system does and *how* components connect.
- LLD answers *how* each component is implemented internally.

For instance, in a food delivery app, HLD might define the User Service, Order Service, and Payment Service and their interactions — while LLD designs the specific classes like \`User\`, \`Order\`, and \`PaymentProcessor\` with their methods and attributes.`,
    imageUrls: ["/images/interview-questions/system-design/Q39.png"],
    imageCaptions: ["Figure 39: Comparison of High-Level Design (HLD) and Low-Level Design (LLD) — covering primary focus, what each defines, when each is used, and overall orientation."],
    companies: ["Amazon", "Google", "Microsoft", "Adobe", "Flipkart"],
  },
  {
    id: 40,
    question: "How do Stateful and Stateless systems differ?",
    answer: `Stateful and Stateless systems differ in how they handle client session data between requests, which has major implications for scalability and architecture.

**Stateful Systems:**
- Store client session or state information **on the server**.
- Each request depends on previous requests and shared context.
- More challenging to scale in distributed systems since requests must reach the same server or share session storage.
- Requires session management to maintain state.
- Better suited for applications with **long user interactions** (e.g., online games, real-time collaboration tools).

**Stateless Systems:**
- Do **not** store client session or state information on the server.
- Every request is fully independent and self-contained.
- Easier to scale and balance load — any server can handle any request.
- No session storage or management required.
- Ideal for **scalable APIs and microservices**.

**Common pattern:** REST APIs using **JWT tokens** are stateless — the token carries all required user context with every request, eliminating server-side session storage.

For example, traditional web login sessions are stateful (server stores session), whereas REST APIs using JWT tokens are stateless (token carries the session).`,
    imageUrls: ["/images/interview-questions/system-design/Q40.png"],
    imageCaptions: ["Figure 40: Comparison of Stateful and Stateless systems — covering session storage, request dependency, scalability, session management, and ideal use cases."],
    companies: ["Google", "Amazon", "Netflix", "Microsoft", "Uber"],
  },
  {
    id: 41,
    question: "What is the OSI Model?",
    answer: `The OSI (Open Systems Interconnection) Model is a **conceptual framework** that standardizes network communication by dividing it into **seven distinct layers**, each responsible for specific functions. This separation aids in troubleshooting and enables modular, interoperable networking design.

**The 7 Layers (top to bottom):**

**7 - Application:** User-facing protocols — HTTP, HTTPS, FTP, DNS, SMTP.

**6 - Presentation:** Data translation, encryption, and compression (e.g., SSL/TLS, JPEG).

**5 - Session:** Manages sessions and connections between applications.

**4 - Transport:** End-to-end communication, reliability, flow control — TCP, UDP.

**3 - Network:** Logical addressing and routing — IP, ICMP, routers.

**2 - Data Link:** Physical addressing (MAC), error detection — Ethernet, switches.

**1 - Physical:** Raw bit transmission over physical media — cables, fiber, radio signals.

**Why it matters in system design:**
- Helps identify at which layer a problem exists (e.g., is it a network routing issue or an application protocol issue?).
- Guides the design of security measures at the appropriate layer (e.g., TLS at Layer 6, firewalls at Layer 3).

For example, when a user accesses a website, data travels from the Application Layer (HTTP request) down through all layers to the Physical Layer for transmission, then back up on the receiving end.`,
    companies: ["Cisco", "Amazon", "Google", "Microsoft", "Cloudflare"],
  },
  {
    id: 42,
    question: "What is the difference between HTTP and HTTPS?",
    answer: `**HTTP (HyperText Transfer Protocol)** and **HTTPS (HyperText Transfer Protocol Secure)** are both protocols for transferring data over the internet, but they differ significantly in security.

**HTTP:**
- Transfers data in **plain text** (readable by anyone intercepting the connection).
- Less secure and vulnerable to eavesdropping and attacks.
- Uses **port 80** by default.
- Suitable for non-sensitive websites and basic browsing.

**HTTPS:**
- Encrypts data using **SSL/TLS**, making it unreadable to interceptors.
- Secure and protects data from interception and attacks.
- Uses **port 443** by default.
- Used for banking, online payments, logins, and other secure applications.

**How HTTPS works:**
1. Client and server perform an **SSL/TLS handshake** to establish a secure connection.
2. A **digital certificate** verifies the server's identity.
3. All subsequent data is **encrypted** before transmission.

For example, an online banking site uses HTTPS to protect user credentials and payment details during transmission, while a simple blog might use HTTP for public content.`,
    imageUrls: ["/images/interview-questions/system-design/Q42.png"],
    imageCaptions: ["Figure 42: Comparison of HTTP and HTTPS — covering full form, data transmission method, security level, default ports, and best suited use cases."],
    companies: ["Google", "Cloudflare", "Amazon", "Microsoft", "Mozilla"],
  },
  {
    id: 43,
    question: "How do TCP and UDP differ?",
    answer: `**TCP (Transmission Control Protocol)** and **UDP (User Datagram Protocol)** are the two core transport layer protocols, each designed for different use cases.

**TCP:**
- **Type:** Connection-oriented protocol — establishes a connection before data transfer (3-way handshake).
- **Reliability:** Provides reliable and guaranteed data delivery with error checking and retransmissions.
- **Speed:** Slower due to error checking, acknowledgements, and retransmissions.
- **Best Used When:** Accuracy and data integrity are critical.
- **Common Applications:** File transfer, email, web browsing, and other reliable applications.

**UDP:**
- **Type:** Connectionless protocol — sends data without establishing a connection.
- **Reliability:** Does not guarantee data delivery; packets may be lost or arrive out of order.
- **Speed:** Faster since there is no error checking or acknowledgement overhead.
- **Best Used When:** Speed is more important than accuracy.
- **Common Applications:** Gaming, live video streaming, VoIP, and real-time applications.

For example, banking websites use TCP for reliability and accuracy, whereas live video streams use UDP for faster, low-latency transmission where occasional packet loss is acceptable.`,
    imageUrls: ["/images/interview-questions/system-design/Q43.png"],
    imageCaptions: ["Figure 43: Comparison of TCP and UDP — covering connection type, reliability, speed, best use cases, and common applications."],
    companies: ["Cisco", "Google", "Amazon", "Cloudflare", "Netflix"],
  },
  {
    id: 44,
    question: "What is DNS and why is it important?",
    answer: `**DNS (Domain Name System)** is often called the **internet's phonebook**. It translates human-friendly domain names like \`google.com\` into IP addresses that computers use to communicate over the internet.

**How DNS resolution works:**
1. User types \`youtube.com\` in the browser.
2. Browser checks its **local cache** for the IP address.
3. If not found, it queries the **Recursive Resolver** (usually provided by the ISP).
4. The resolver queries the **Root Name Server**, then the **TLD Name Server** (.com), then the **Authoritative Name Server**.
5. The authoritative server returns the IP address.
6. Browser connects to the server at that IP.

**Why DNS is important in system design:**
- **Abstraction:** Services can change IPs without users needing to know — DNS handles the mapping.
- **Load Balancing:** DNS can return multiple IPs, distributing traffic across servers (DNS-based load balancing).
- **Failover:** DNS can route traffic to a backup server if the primary fails.
- **CDN Routing:** CDNs use DNS to direct users to the nearest edge server.

For example, when a user types \`youtube.com\`, DNS resolves it to an IP address so the browser can connect to the correct server automatically.`,
    companies: ["Cloudflare", "Amazon", "Google", "Akamai", "Microsoft"],
  },
  {
    id: 45,
    question: "What happens during a cache miss?",
    answer: `A **cache miss** occurs when requested data is not found in the cache, forcing the system to retrieve it from the main database or backend service.

**Cache Miss Flow:**
1. Client requests data.
2. System checks the cache — data is **not found** (cache miss).
3. System fetches the data from the **primary database or backend**.
4. The fetched data is **stored in the cache** for future requests.
5. The data is returned to the client.

**Impact of cache misses:**
- **Increased latency:** The request takes longer since it must go to the slower database.
- **Higher database load:** Frequent cache misses can overwhelm the backend.

**Types of cache misses:**
- **Cold Miss:** Cache is empty (first time the system starts).
- **Capacity Miss:** Cache is full and evicted the needed data.
- **Conflict Miss:** Data was evicted due to cache replacement policies like LRU or LFU.

**Cache Stampede:** When many requests miss simultaneously and all hit the database at once — mitigated using locking or request collapsing.

For example, if a product's details aren't found in Redis cache, the application fetches it from the database, then caches it so subsequent queries are served from memory.`,
    companies: ["Amazon", "Google", "Redis Labs", "Netflix", "Meta"],
  },
  {
    id: 46,
    question: "What is cache invalidation?",
    answer: `**Cache invalidation** is the process of removing or updating outdated data in the cache to ensure users receive accurate and current information. It is one of the hardest problems in distributed systems.

**Why it matters:**
- When underlying data changes in the database, the cached copy becomes **stale**.
- Serving stale data can lead to incorrect behavior (e.g., showing an old price to a customer).

**Common Cache Invalidation Strategies:**

**TTL (Time-To-Live):**
- Each cache entry expires automatically after a set duration.
- Simple but may serve stale data until expiry.

**Write-Through Invalidation:**
- Cache is updated simultaneously when the database is written.
- Ensures consistency but adds write latency.

**Manual/Event-Based Invalidation:**
- Cache entry is explicitly deleted or updated when a specific event occurs (e.g., a price update triggers cache deletion).
- Most precise but requires careful implementation.

**Cache-Aside with Invalidation:**
- Application deletes the cache entry on data update; next read repopulates from the database.

For instance, in an e-commerce app, if a product's price changes in the database, the cached entry is invalidated so users see the latest price on their next request.`,
    companies: ["Amazon", "Google", "Redis Labs", "Meta", "Shopify"],
  },
  {
    id: 47,
    question: "What occurs if the leader node fails in a distributed system?",
    answer: `In a distributed system, the **leader node** coordinates writes and critical decisions. If it fails, the system must detect the failure and elect a new leader to continue operating without manual intervention.

**What happens step by step:**
1. Other nodes detect the leader failure via **missed heartbeats or timeouts**.
2. A **leader election algorithm** is triggered automatically.
3. Nodes vote and a new leader is elected.
4. The new leader takes over coordination and write operations resume.

**Common Leader Election Algorithms:**

**Raft:**
- Nodes use randomized timeouts to start elections.
- A candidate requests votes; if it gets a majority, it becomes leader.
- Widely used in etcd, CockroachDB, and TiKV.

**Paxos:**
- A classic consensus algorithm used in Google Spanner and Chubby.
- More complex but highly fault-tolerant.

**Zookeeper (ZAB Protocol):**
- Used by Apache Kafka for broker coordination.

**Key concerns during failover:**
- **Split-Brain:** Two nodes believe they are the leader — prevented by requiring a majority quorum.
- **Data Loss:** Uncommitted writes from the old leader may be lost.

For example, in a distributed database cluster, if the primary server crashes, a replica is automatically promoted to leader to maintain write operations with minimal downtime.`,
    companies: ["Google", "Amazon", "MongoDB", "Confluent", "etcd"],
  },
  {
    id: 48,
    question: "How does auto-scaling function in distributed systems?",
    answer: `**Auto-scaling** automatically adjusts system resources by adding or removing servers based on current traffic or workload, maintaining performance while optimizing costs.

**How it works:**
1. A monitoring system continuously tracks metrics like **CPU utilization, memory usage, request rate, or queue depth**.
2. When a metric exceeds a defined threshold, the auto-scaler triggers a **scale-out** action (adds servers).
3. When traffic drops below a threshold, it triggers a **scale-in** action (removes servers) to reduce costs.

**Types of Auto-Scaling:**

**Horizontal Auto-Scaling (Scale Out/In):**
- Adds or removes server instances.
- Most common in distributed systems.
- Example: AWS Auto Scaling Groups, Kubernetes HPA (Horizontal Pod Autoscaler).

**Vertical Auto-Scaling (Scale Up/Down):**
- Increases or decreases the resources (CPU, RAM) of existing instances.
- Less common; requires restarts in some cases.

**Reactive vs Predictive Scaling:**
- **Reactive:** Responds to real-time metrics after load increases.
- **Predictive:** Uses historical patterns to scale proactively before expected traffic spikes.

For example, during a festival sale, an e-commerce platform automatically spins up more servers to handle increased traffic, then scales down when demand drops — balancing performance and cost.`,
    companies: ["Amazon", "Google", "Microsoft", "Netflix", "Uber"],
  },
  {
    id: 49,
    question: "What is a Sticky Session in load balancing?",
    answer: `**Sticky Session** (also called **Session Persistence**) is a load balancing technique that routes all requests from the same user to the **same backend server** throughout their session.

**Why it's needed:**
- Some applications store user-specific data (like shopping cart or login state) **locally on the server**.
- If a subsequent request goes to a different server, that server has no knowledge of the session data.
- Sticky sessions ensure the user always lands on the same server that holds their data.

**How it's implemented:**
- **Cookie-based:** Load balancer inserts a cookie identifying the target server; subsequent requests carry this cookie.
- **IP-based:** Requests from the same client IP are always routed to the same server.
- **Session ID-based:** The load balancer inspects the session ID in the request.

**Trade-offs:**

| Advantage | Disadvantage |
|---|---|
| Simple session consistency | Uneven load distribution |
| No shared session storage needed | Server failure loses session data |
| Works with legacy apps | Harder to scale horizontally |

**Modern alternative:** Use a **centralized session store** (e.g., Redis) so any server can handle any request — eliminating the need for sticky sessions.

For example, in an online store, sticky sessions keep a user's shopping cart consistent by directing all requests to the same server during checkout.`,
    companies: ["Amazon", "NGINX", "F5", "Google", "Microsoft"],
  },
  {
    id: 50,
    question: "How does a load balancer determine if a server is functioning or has failed?",
    answer: `A load balancer continuously monitors backend servers using **health checks** to determine which servers are healthy and capable of handling requests.

**How Health Checks Work:**

**Active Health Checks:**
- The load balancer periodically sends **test requests** (heartbeats) to each server.
- If the server responds correctly within a timeout window, it is marked **healthy**.
- If it fails to respond or returns errors (e.g., HTTP 500) repeatedly, it is marked **unhealthy**.
- Traffic is automatically stopped to unhealthy servers.

**Passive Health Checks:**
- The load balancer monitors **real traffic responses**.
- If a server returns repeated errors for actual user requests, it is marked as failed.

**Common Health Check Types:**
- **HTTP/HTTPS checks:** Sends a GET request to a health endpoint (e.g., \`/health\`) and expects a 200 OK.
- **TCP checks:** Verifies the server accepts TCP connections.
- **gRPC checks:** For gRPC-based microservices.

**Recovery:**
- Once a failed server recovers and passes health checks again, the load balancer **resumes sending traffic** to it.

For example, if one of four servers running a food delivery app crashes, the load balancer detects the failure through missed health checks and routes all user requests to the remaining three healthy servers — ensuring uninterrupted service.`,
    companies: ["Amazon", "NGINX", "Cloudflare", "Google", "F5"],
  },
];
