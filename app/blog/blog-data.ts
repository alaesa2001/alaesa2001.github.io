export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  publishedAt: string;
  readingTime: number;
  image: string;
  imageSource: string;
  focus: string;
  perspective: string;
  practice: string;
  measure: string;
};

type Topic = readonly [title: string, focus: string, tags: readonly string[]];

type Collection = {
  category: string;
  image: string;
  imageId: string;
  tags: string[];
  perspective: string;
  practice: string;
  measure: string;
  topics: Topic[];
};

const collections: Collection[] = [
  {
    category: "Backend Engineering",
    image: "/blog/backend.jpg",
    imageId: "1518770660439-4636190af475",
    tags: ["Backend", "APIs"],
    perspective: "Reliable backend work begins with explicit contracts, predictable failure modes, and boundaries that are easy to reason about.",
    practice: "Start with the smallest production scenario, make retries safe, document invariants, and test the behavior around partial failure.",
    measure: "Track latency, error rate, saturation, retry volume, and the business outcome that the service is meant to protect.",
    topics: [
      ["Designing Idempotent APIs That Survive Retries", "making write operations safe when clients, queues, or networks repeat a request", ["Idempotency", "REST"]],
      ["Pagination Patterns for Large Data Sets", "choosing cursor, keyset, or offset pagination without surprising API consumers", ["Databases", "Performance"]],
      ["Reliable Background Jobs in Distributed Systems", "designing workers that recover cleanly from crashes, duplicates, and poison messages", ["Queues", "Reliability"]],
      ["Rate Limiting Without Punishing Good Clients", "protecting shared capacity while keeping limits transparent and fair", ["Traffic", "Resilience"]],
      ["Where Database Transactions Should Begin and End", "placing transaction boundaries around business invariants instead of controller methods", ["SQL", "Transactions"]],
      ["Caching Without Stale Data Surprises", "using cache-aside, invalidation, and freshness budgets deliberately", ["Caching", "Performance"]],
      ["API Error Contracts That Teams Can Depend On", "turning failures into stable, actionable, machine-readable responses", ["API Design", "DX"]],
      ["Multi-Tenant Data Isolation by Design", "preventing tenant leakage through schema, authorization, and query boundaries", ["SaaS", "Security"]],
      ["Building Webhooks That Deliver Reliably", "signing, retrying, ordering, and observing outbound event delivery", ["Webhooks", "Events"]],
      ["Profiling Spring Boot Services in Production", "finding CPU, memory, thread, and database bottlenecks with evidence", ["Java", "Spring Boot"]],
    ],
  },
  {
    category: "Cloud & AWS",
    image: "/blog/cloud.jpg",
    imageId: "1451187580459-43490279c0fa",
    tags: ["Cloud", "AWS"],
    perspective: "Cloud architecture is an exercise in balancing reliability, delivery speed, operating effort, and cost rather than maximizing any one service.",
    practice: "Make workload assumptions visible, automate repeatable changes, isolate failure domains, and rehearse recovery before it is urgent.",
    measure: "Review availability, recovery time, cost per useful transaction, deployment frequency, and unused capacity together.",
    topics: [
      ["Right-Sizing Cloud Workloads With Real Evidence", "matching compute and storage capacity to observed demand instead of intuition", ["FinOps", "Capacity"]],
      ["Serverless or Containers: A Practical Decision Guide", "choosing an execution model from traffic shape, latency, and operating constraints", ["Lambda", "Containers"]],
      ["Zero-Downtime Deployments on AWS", "coordinating application, traffic, and database changes without visible interruption", ["Deployment", "Availability"]],
      ["A Clean AWS Multi-Account Strategy", "separating environments, permissions, billing, and blast radius as a platform grows", ["IAM", "Governance"]],
      ["Event Pipelines With S3, Lambda, and Queues", "building durable file-processing workflows with backpressure and replay", ["S3", "Lambda"]],
      ["Reducing AWS Lambda Cold Starts", "improving startup latency through package, runtime, and concurrency choices", ["Serverless", "Performance"]],
      ["Cloud Cost Reviews Engineers Can Act On", "connecting infrastructure spend to owners, workloads, and concrete optimization work", ["FinOps", "Cost"]],
      ["Disaster Recovery Beyond a Backup Checkbox", "defining recovery objectives and proving that systems can meet them", ["Recovery", "Resilience"]],
      ["Observability for Cloud-Native Services", "joining logs, metrics, traces, and deployment context into useful signals", ["Monitoring", "Tracing"]],
      ["Managing Secrets Across Cloud Environments", "rotating and distributing credentials without placing them in source or images", ["Secrets", "Security"]],
    ],
  },
  {
    category: "DevOps & Delivery",
    image: "/blog/devops.jpg",
    imageId: "1558494949-ef010cbdcc31",
    tags: ["DevOps", "Delivery"],
    perspective: "A delivery system should make the safe path the easy path and provide fast, trustworthy feedback when a change is risky.",
    practice: "Remove repeated manual steps, keep artifacts immutable, test deployment behavior, and design every release with a clear recovery path.",
    measure: "Use lead time, deployment frequency, change failure rate, recovery time, and feedback latency to guide improvement.",
    topics: [
      ["Faster CI Pipelines Without Losing Confidence", "cutting feedback time through caching, parallelism, and risk-based test selection", ["CI", "Testing"]],
      ["Building Smaller and Safer Docker Images", "reducing image size and attack surface with multi-stage, reproducible builds", ["Docker", "Containers"]],
      ["Kubernetes Readiness and Liveness Done Right", "using health probes without causing restart loops or routing traffic too early", ["Kubernetes", "Reliability"]],
      ["GitOps as an Operating Model", "making desired state, review, reconciliation, and rollback visible in version control", ["GitOps", "Platform"]],
      ["Deploying Database Migrations Safely", "sequencing compatible schema changes across rolling application versions", ["Databases", "Deployment"]],
      ["Feature Flags Without Permanent Complexity", "releasing independently while keeping ownership, cleanup, and observability clear", ["Release", "Product"]],
      ["An Incident Response Loop That Improves Systems", "coordinating detection, communication, mitigation, and learning under pressure", ["Incidents", "SRE"]],
      ["Logs, Metrics, and Traces: Use Each for Its Strength", "choosing the right telemetry signal for exploration, alerting, and causality", ["Observability", "SRE"]],
      ["Infrastructure as Code That Stays Maintainable", "structuring modules, state, review, and policy for long-lived infrastructure", ["IaC", "Automation"]],
      ["Designing Rollbacks Before Deployment", "making application and data recovery part of release design rather than an emergency", ["Rollback", "Reliability"]],
    ],
  },
  {
    category: "Software Architecture",
    image: "/blog/architecture.jpg",
    imageId: "1461749280684-dccba630e2f6",
    tags: ["Architecture", "Systems"],
    perspective: "Good architecture creates options. It makes important boundaries visible while leaving teams room to change implementation details.",
    practice: "Model the domain, record tradeoffs, keep interfaces narrow, and evolve structure in response to measured pressure.",
    measure: "Watch change lead time, coupling, failure propagation, ownership clarity, and the effort required to test a business capability.",
    topics: [
      ["Why a Modular Monolith Is Often the Right Start", "gaining strong boundaries and deployment simplicity before distributed complexity is justified", ["Modularity", "Monolith"]],
      ["Finding Honest Microservice Boundaries", "splitting systems around business ownership and change patterns rather than technical layers", ["Microservices", "DDD"]],
      ["Event-Driven Architecture Without Event Chaos", "defining event meaning, ownership, compatibility, and replay from the beginning", ["Events", "Messaging"]],
      ["Domain-Driven Design for Working Engineers", "using domain language and bounded contexts without turning modeling into ceremony", ["DDD", "Modeling"]],
      ["Consistency Choices in Distributed Systems", "deciding where strong guarantees matter and where eventual consistency is acceptable", ["Consistency", "Distributed Systems"]],
      ["When an API Gateway Helps and When It Hides Problems", "centralizing edge concerns without creating a new distributed monolith", ["API Gateway", "Platform"]],
      ["Queues or Streams: Choosing the Right Tool", "matching delivery semantics and consumption patterns to the business workflow", ["Queues", "Streaming"]],
      ["Modernizing Legacy Systems in Safe Slices", "reducing risk through seams, strangler patterns, and measurable migration steps", ["Legacy", "Modernization"]],
      ["Architecture Decision Records That Stay Useful", "capturing context and tradeoffs in a format teams will actually maintain", ["ADR", "Documentation"]],
      ["Scaling Team Ownership With System Boundaries", "aligning architecture and team responsibilities to reduce coordination load", ["Teams", "Ownership"]],
    ],
  },
  {
    category: "Data Engineering",
    image: "/blog/data.jpg",
    imageId: "1551288049-bebda4e38f71",
    tags: ["Data", "Engineering"],
    perspective: "Trustworthy data products depend on clear ownership, explicit contracts, reproducible transformations, and visible quality.",
    practice: "Treat schemas as interfaces, validate at boundaries, preserve lineage, and build replay into every important pipeline.",
    measure: "Monitor freshness, completeness, validity, duplication, processing delay, and the decisions that depend on the data.",
    topics: [
      ["Designing ETL Pipelines for Replay", "making ingestion and transformation deterministic enough to recover or backfill safely", ["ETL", "Pipelines"]],
      ["Data Quality Checks That Catch Real Failures", "turning business expectations into automated tests and actionable alerts", ["Quality", "Testing"]],
      ["Schema Evolution Without Breaking Consumers", "changing data contracts with compatibility, ownership, and migration windows", ["Schemas", "Contracts"]],
      ["Lakehouse Architecture in Practical Terms", "understanding when unified storage and table formats simplify analytics", ["Lakehouse", "Analytics"]],
      ["Change Data Capture for Operational Analytics", "moving database changes downstream while preserving order and recoverability", ["CDC", "Streaming"]],
      ["Reliable Python Data Pipelines", "structuring Python jobs for testing, observability, packaging, and repeatable execution", ["Python", "ETL"]],
      ["Partitioning Strategies That Prevent Slow Queries", "choosing partitions from access patterns instead of arbitrary calendar boundaries", ["Storage", "Performance"]],
      ["Streaming Data Without Ignoring Backpressure", "controlling flow when producers and consumers move at different speeds", ["Streaming", "Resilience"]],
      ["Data Lineage as an Operational Capability", "making the origin and transformation of critical fields easy to investigate", ["Lineage", "Governance"]],
      ["Building Analytics APIs Over Curated Data", "serving stable metrics without exposing warehouse complexity to every client", ["Analytics", "APIs"]],
    ],
  },
  {
    category: "Security Engineering",
    image: "/blog/security.jpg",
    imageId: "1563013544-824ae1b704d3",
    tags: ["Security", "Engineering"],
    perspective: "Security improves when it is part of ordinary engineering decisions, supported by layers that limit both likelihood and impact.",
    practice: "Start from assets and trust boundaries, automate common controls, rotate credentials, and make authorization explicit near the data.",
    measure: "Track vulnerable exposure time, privileged access, patch delay, denied actions, secret age, and recovery confidence.",
    topics: [
      ["Applying the OWASP API Risks in Real Services", "turning common API threats into concrete design and test cases", ["OWASP", "APIs"]],
      ["Access Tokens, Refresh Tokens, and Session Safety", "designing token lifecycles that balance security and user experience", ["Authentication", "Tokens"]],
      ["Least Privilege Without Blocking Delivery", "granting narrow, temporary access through roles engineers can understand", ["IAM", "Access"]],
      ["Secrets Management Beyond Environment Files", "centralizing storage, rotation, audit, and runtime delivery of credentials", ["Secrets", "Operations"]],
      ["Reducing Software Supply Chain Risk", "verifying dependencies, build inputs, artifacts, and provenance in delivery pipelines", ["Supply Chain", "CI"]],
      ["TLS Between Internal Services", "deciding where encryption, identity, and certificate automation are needed inside a platform", ["TLS", "Networking"]],
      ["Security Logging That Supports Investigation", "recording meaningful actions without leaking sensitive data into logs", ["Audit", "Observability"]],
      ["Authorization for Multi-Tenant Applications", "enforcing tenant and resource rules consistently across every access path", ["Authorization", "SaaS"]],
      ["Backups as a Ransomware Recovery Control", "protecting backup independence, immutability, and restoration procedures", ["Backups", "Recovery"]],
      ["Making Security Reviews Part of Code Review", "using lightweight threat questions and automation during normal delivery", ["Secure Coding", "Review"]],
    ],
  },
  {
    category: "Frontend & Product",
    image: "/blog/frontend.jpg",
    imageId: "1516321318423-f06f85e504b3",
    tags: ["Frontend", "Product"],
    perspective: "A strong interface makes system state understandable, supports different users and devices, and stays fast under realistic conditions.",
    practice: "Design around user tasks, use semantic HTML, define responsive constraints, and test loading, failure, empty, and recovery states.",
    measure: "Follow task completion, accessibility, Core Web Vitals, client errors, abandonment, and support signals together.",
    topics: [
      ["React Performance Without Premature Optimization", "finding actual render and network bottlenecks before adding complexity", ["React", "Performance"]],
      ["Accessible Forms From the First Component", "building labels, errors, focus, and keyboard behavior into reusable form patterns", ["Accessibility", "Forms"]],
      ["Design Systems That Help Teams Ship", "balancing reusable tokens and components with product-specific flexibility", ["Design Systems", "UI"]],
      ["Responsive Layouts That Handle Real Content", "designing grids and typography around constraints rather than fixed device mocks", ["Responsive", "CSS"]],
      ["Choosing State Management by State Lifetime", "placing local, shared, server, and URL state where each can be reasoned about", ["State", "React"]],
      ["Loading and Error States for API-Driven UI", "keeping users oriented while requests are slow, empty, partial, or failed", ["UX", "APIs"]],
      ["Improving Core Web Vitals With Evidence", "connecting LCP, INP, and CLS measurements to concrete frontend work", ["Web Vitals", "Performance"]],
      ["Internationalization and RTL Without Layout Rework", "building language, direction, spacing, and content flexibility into the system", ["i18n", "RTL"]],
      ["Frontend Observability Beyond Console Errors", "capturing sessions, releases, requests, and user impact around client failures", ["Observability", "UX"]],
      ["How Backend Engineers Can Think Like Product Engineers", "connecting APIs and architecture decisions to the user outcome they enable", ["Product", "Collaboration"]],
    ],
  },
  {
    category: "Bioinformatics",
    image: "/blog/bioinformatics.jpg",
    imageId: "1532094349884-543bc11b234d",
    tags: ["Bioinformatics", "Research"],
    perspective: "Research software earns trust through reproducibility, transparent provenance, clear biological assumptions, and accessible outputs.",
    practice: "Pin tools and references, preserve metadata, automate quality checks, and make every transformation traceable from sample to result.",
    measure: "Review reproducibility, data completeness, workflow failure, compute cost, version provenance, and scientific interpretability.",
    topics: [
      ["Reproducible Bioinformatics Pipelines", "making tools, references, parameters, and environments repeatable across runs", ["Reproducibility", "Pipelines"]],
      ["Genomic Metadata That Remains Useful", "capturing sample and sequencing context with controlled, documented fields", ["Genomics", "Metadata"]],
      ["A Practical Introduction to Phylogenomics", "moving from conserved genomic markers to interpretable evolutionary relationships", ["Phylogenomics", "Evolution"]],
      ["Using BUSCO Beyond a Single Completeness Score", "interpreting conserved gene results in the context of assemblies and lineages", ["BUSCO", "Genomes"]],
      ["Sequence Quality Control Before Analysis", "detecting contamination, low quality, and inconsistent inputs early", ["Quality Control", "Sequencing"]],
      ["Workflow Orchestration for Scientific Computing", "using dependency-aware execution, caching, and provenance for complex analyses", ["Workflows", "HPC"]],
      ["Designing AMR Genomic Data Portals", "connecting pathogen, resistance, epidemiological, and genomic data for exploration", ["AMR", "Data Platforms"]],
      ["One Health Data Integration in Practice", "linking human, animal, food, and environmental surveillance without losing context", ["One Health", "Epidemiology"]],
      ["Research Software That Non-Specialists Can Use", "turning complex methods into guided, transparent, and responsible interfaces", ["Research Software", "UX"]],
      ["FAIR Data Principles for Genomic Platforms", "making scientific data findable, accessible, interoperable, and reusable by design", ["FAIR", "Data Governance"]],
    ],
  },
  {
    category: "AI & Automation",
    image: "/blog/ai.jpg",
    imageId: "1555066931-4365d14bab8c",
    tags: ["AI", "Automation"],
    perspective: "Useful AI systems combine a bounded task, reliable context, explicit evaluation, and a human path for uncertainty.",
    practice: "Begin with a measurable baseline, separate retrieval from generation, log decisions safely, and test failure cases before scale.",
    measure: "Track task success, groundedness, latency, cost, escalation, user correction, and drift instead of model output alone.",
    topics: [
      ["Integrating LLM APIs Into Production Systems", "placing model calls behind reliable contracts, timeouts, budgets, and observability", ["LLM", "APIs"]],
      ["Retrieval-Augmented Generation Without the Hype", "designing ingestion, search, context, and citations around a clear task", ["RAG", "Search"]],
      ["Prompt Evaluation as an Engineering Discipline", "building representative test sets and repeatable quality checks for model behavior", ["Evaluation", "Prompts"]],
      ["Controlling Cost and Latency in AI Features", "matching models, context, caching, and request paths to product value", ["Cost", "Performance"]],
      ["Building an AI Interview Coach Responsibly", "combining structured practice, feedback, privacy, and realistic limitations", ["InterviewPal", "Product"]],
      ["Human-in-the-Loop Automation That Works", "routing uncertain or high-impact decisions to people with useful context", ["Human Review", "Operations"]],
      ["AI Agents Need Boundaries More Than Autonomy", "constraining tools, permissions, plans, and stopping conditions in agent workflows", ["Agents", "Safety"]],
      ["Vector Search Quality Starts Before Embeddings", "improving chunking, metadata, filters, and relevance evaluation", ["Embeddings", "Search"]],
      ["Guardrails for Generative AI Products", "layering input controls, grounded generation, policy checks, and monitoring", ["Guardrails", "Safety"]],
      ["Automating Technical Documentation With AI", "using models to assist drafts while preserving review, ownership, and source accuracy", ["Documentation", "Automation"]],
    ],
  },
  {
    category: "Engineering Leadership",
    image: "/blog/leadership.jpg",
    imageId: "1521737711867-e3b97375f902",
    tags: ["Leadership", "Teams"],
    perspective: "Technical leadership creates clarity: what matters, who owns it, which tradeoffs were made, and how the team will learn.",
    practice: "Share context early, write decisions down, protect feedback loops, and make standards teachable instead of personal.",
    measure: "Look at delivery predictability, review time, incident learning, ownership, team health, and the growth of other engineers.",
    topics: [
      ["Code Reviews That Improve Code and People", "giving timely feedback that protects quality while transferring context", ["Code Review", "Mentoring"]],
      ["Making Technical Decisions Without Endless Meetings", "framing options, owners, evidence, and decision deadlines clearly", ["Decision Making", "ADR"]],
      ["Mentoring Engineers Through Real Work", "using pairing, review, delegation, and reflection to build independent judgment", ["Mentoring", "Growth"]],
      ["Estimation as Risk Discovery", "using estimates to expose uncertainty and dependencies rather than promise precision", ["Planning", "Delivery"]],
      ["Working Well With Product and Business Teams", "translating technical constraints into choices tied to customer outcomes", ["Collaboration", "Product"]],
      ["Building a Healthy On-Call Culture", "sharing ownership while protecting people with tooling, training, and recovery time", ["On Call", "SRE"]],
      ["Writing Technical Documents People Read", "using audience, decisions, examples, and maintenance ownership to keep docs useful", ["Documentation", "Communication"]],
      ["Balancing Roadmap Delivery and Technical Debt", "connecting maintenance work to reliability, speed, and product risk", ["Technical Debt", "Roadmap"]],
      ["Leading Distributed Engineering Teams", "creating alignment across time zones through written context and intentional rituals", ["Remote Work", "Teams"]],
      ["From Developer to Technical Leader", "shifting from solving every problem personally to multiplying team capability", ["Career", "Leadership"]],
    ],
  },
];

const slugify = (value: string) =>
  value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

const start = Date.UTC(2022, 0, 12);
const end = Date.UTC(2026, 7, 18);

const chronologicalPosts: BlogPost[] = Array.from({ length: 100 }, (_, index) => {
  const collection = collections[index % collections.length];
  const topic = collection.topics[Math.floor(index / collections.length)];
  const publishedAt = new Date(start + ((end - start) * index) / 99).toISOString().slice(0, 10);

  return {
    slug: slugify(topic[0]),
    title: topic[0],
    excerpt: `A practical guide to ${topic[1]}, with design tradeoffs, implementation habits, and signals worth measuring.`,
    category: collection.category,
    tags: [...collection.tags, ...topic[2]],
    publishedAt,
    readingTime: 5 + (index % 4),
    image: collection.image,
    imageSource: `https://unsplash.com/photos/${collection.imageId}`,
    focus: topic[1],
    perspective: collection.perspective,
    practice: collection.practice,
    measure: collection.measure,
  };
});

export const blogPosts = chronologicalPosts.reverse();
export const blogCategories = collections.map(({ category }) => category);

export function getBlogPost(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}

export function getRelatedPosts(post: BlogPost, limit = 3) {
  return blogPosts.filter((candidate) => candidate.category === post.category && candidate.slug !== post.slug).slice(0, limit);
}

export function formatBlogDate(date: string) {
  return new Intl.DateTimeFormat("en", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" }).format(new Date(`${date}T00:00:00Z`));
}
