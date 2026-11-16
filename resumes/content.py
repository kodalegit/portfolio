"""Resume copy. One entry per target role. Edit here, then run build.py."""

CONTACT = {
    "location": "Kenya",
    "phone": "+254 718 782 221",
    "email": "victorkimani77@gmail.com",
    "links": [
        ("linkedin.com/in/victorkimani77", "https://www.linkedin.com/in/victorkimani77/"),
        ("github.com/kodalegit", "https://github.com/kodalegit"),
        ("victorkimani.com", "https://victorkimani.com"),
    ],
}

EDUCATION = [("BSc Civil Engineering", "University of Nairobi")]

ISLET = {
    "org": "Islet Group",
    "role": "Software Engineering Consultant",
    "dates": "Mar 2024 – May 2026",
}
CRAFTED = {
    "org": "Crafted Systems",
    "role": "Lead AI Engineer (Contract)",
    "dates": "Dec 2025 – Apr 2026",
}
UWAZO = {
    "org": "Uwazo",
    "role": "Founder and Lead Engineer (Part-time)",
    "dates": "2025 – Present",
    "link": ("uwazo.com", "https://uwazo.com"),
}
FREELANCE = {
    "org": "Freelance Consulting",
    "role": "Independent Software Engineer",
    "dates": "Aug 2023 – Present",
}
PELMIO = {
    "org": "Pelmio",
    "role": "Founder and Engineer (Part-time)",
    "dates": "2026 – Present",
    "link": ("pelmio.app", "https://www.pelmio.app"),
}

RESUMES = {
    "applied-ai-engineer": {
        "title": "Applied AI Engineer | LLM and Agentic Systems",
        "summary": (
            "Applied AI engineer who builds and deploys agents, retrieval systems and AI products. "
            "Built the production AI backend for an enterprise debt-recovery platform, including an agent "
            "that queries live data, human approval for outbound actions, and evaluation tooling. "
            "Works in Python, FastAPI, LangGraph, TypeScript and Next.js."
        ),
        "skills": [
            ("Applied AI", "LLM applications, AI agents, LangGraph, RAG, context engineering, prompt engineering, evaluation, XGBoost"),
            ("Backend and data", "Python, FastAPI, Django, PostgreSQL, Supabase, SQL, REST APIs"),
            ("Frontend", "TypeScript, JavaScript, Next.js, React"),
            ("Infrastructure", "Docker, Google Cloud Platform, Vercel, Cloudflare, Railway, Git"),
        ],
        "experience": [
            {**CRAFTED, "bullets": [
                "Designed and deployed the AI backend for an enterprise financial platform that banks and SACCOs use for debt recovery, with portfolios of thousands of debtor case files.",
                "Built case-summarization agents that read debt histories, customer messages and account records, then write a summary and recommend next steps.",
                "Built an agent that writes SQL, retrieves customer records, drafts SMS, email and WhatsApp messages, and charts data. A person approves every outbound message before it is sent.",
                "Built RAG pipelines and evaluation tests for agent correctness, retrieval quality and reliability. Prompt and date-context changes cut date-range errors from about 30% to zero on the targeted tests.",
                "Added access controls and PII safeguards for sensitive financial data.",
            ]},
            {**UWAZO, "bullets": [
                "Designed and deployed a multi-tenant AI research platform for legal and tax professionals on FastAPI, Next.js, Supabase and LangGraph.",
                "Built agentic research workflows that stream answers with source citations and run semantic search across legal sources, user documents and past conversations.",
                "Onboarded 17 accounts through direct outreach to legal and tax professionals, and changed workflows and UX from their feedback.",
            ]},
            {**FREELANCE, "bullets": [
                "Design and deliver software for business clients in operations, machine learning, property and e-commerce.",
                "Built and deployed an operations platform in TypeScript, Next.js and Supabase with role-based access, audit trails, analytics and automated wage calculations. It replaced about 8 hours of manual reconciliation a week.",
                "Built Ujenzi, an XGBoost app that predicts concrete strength, for an engineering consultancy.",
            ]},
            {**ISLET, "bullets": [
                "Built and launched the digital platform for a national pharmaceutical association with 13,000+ members.",
                "Built REST API integrations that track certification for 10,000+ professionals and automate conference administration.",
            ]},
        ],
        "project": {**PELMIO, "name": "Pelmio, AI Learning Experience Platform", "bullets": [
            "Built a pilot-ready platform that turns curriculum documents into source-grounded objectives and teacher-reviewed missions.",
            "Built document processing, objective review, mission generation, the learner runtime and evidence collection with Next.js, FastAPI and PostgreSQL.",
        ]},
    },
    "ai-product-engineer": {
        "title": "AI Product Engineer | Full-Stack Software Engineer",
        "summary": (
            "Full-stack engineer who takes products from requirements through architecture, development "
            "and deployment. Built AI research software for professionals, enterprise AI integrations and "
            "business management platforms, owning the backend, database, frontend and infrastructure. "
            "Works in Python, FastAPI, TypeScript, Next.js and PostgreSQL."
        ),
        "skills": [
            ("Frontend", "TypeScript, JavaScript, Next.js, React, HTML, CSS, PWAs"),
            ("Backend", "Python, FastAPI, Node.js, Django, REST APIs"),
            ("Databases and infrastructure", "PostgreSQL, Supabase, SQL, Docker, Vercel, Cloudflare, Railway, Google Cloud Platform"),
            ("AI and ML", "LangGraph, LLM applications, RAG, AI agents, evaluation, XGBoost"),
        ],
        "experience": [
            {**UWAZO, "bullets": [
                "Designed, built and deployed a multi-tenant AI research platform for legal and tax professionals. Owned the architecture, FastAPI backend, Next.js frontend, data infrastructure and AI integration.",
                "Built LangGraph research workflows with streaming responses, source citations and semantic search across legal resources, user documents and conversation history.",
                "Onboarded 17 accounts through direct outreach and changed features and UX based on practitioner feedback.",
            ]},
            {**FREELANCE, "bullets": [
                "Design and build complete applications for business clients, including operations platforms and machine learning tools, with property-management and e-commerce projects in progress.",
                "Delivered an operations platform in Next.js, TypeScript and Supabase that handles 1,000+ entries a month, employee records, automated wage allocation and business analytics.",
                "Added role-based access, audit logs and a mobile PWA so owners can delegate supervision. The platform replaced about 8 hours of manual bookkeeping and reconciliation a week.",
                "Built Ujenzi, an XGBoost app that predicts concrete strength, for an engineering consultancy.",
            ]},
            {**CRAFTED, "bullets": [
                "Built and deployed the AI backend for an enterprise debt-recovery platform that banks and SACCOs use to work portfolios of thousands of debtor case files, integrated into the client's existing applications.",
                "Built case-summarization agents that turn debt histories, customer messages and account records into a summary and recommended next steps.",
                "Built an agent that writes SQL to retrieve customer records, drafts SMS, email and WhatsApp messages, and charts data. A person approves every outbound message before it is sent.",
                "Built retrieval pipelines, evaluation tests, access controls and PII safeguards. Prompt and date-context changes cut date-range errors from about 30% to zero on the targeted tests.",
            ]},
            {**ISLET, "bullets": [
                "Built and launched the digital platform for a national pharmaceutical association with 13,000+ members.",
                "Built custom REST API integrations that track certification for 10,000+ professionals and automate conference administration.",
            ]},
        ],
        "project": {**PELMIO, "name": "Pelmio, AI Learning Experience Platform", "bullets": [
            "Built an education platform, ready for pilots, where teachers turn curriculum materials into reviewed objectives and interactive missions.",
            "Built the full authoring and learning workflow: document ingestion, source tracing, objective review, mission generation, the learner runtime and evidence collection.",
            "Built with Next.js, FastAPI and PostgreSQL. Pilots with teachers and schools are next.",
        ]},
    },
    "backend-engineer": {
        "title": "Backend Software Engineer | Python and Application Systems",
        "summary": (
            "Backend software engineer who builds production applications, APIs and data integrations "
            "in Python, FastAPI, PostgreSQL and TypeScript. Has owned multi-tenant applications, "
            "authorization, audit logging, business workflows and AI service integration, from design "
            "to deployment."
        ),
        "skills": [
            ("Backend", "Python, FastAPI, Django, Node.js, PHP, REST APIs"),
            ("Databases", "PostgreSQL, Supabase, SQL, data modeling, data integration"),
            ("Architecture and security", "Multi-tenancy, RBAC, data isolation, audit logging, API integrations"),
            ("Infrastructure", "Docker, Google Cloud Platform, Vercel, Cloudflare, Railway, Git"),
            ("Frontend", "TypeScript, JavaScript, Next.js, React"),
            ("AI systems", "LangGraph, RAG, LLM integrations, evaluation"),
        ],
        "experience": [
            {**FREELANCE, "bullets": [
                "Designed and deployed a business operations platform in Next.js, TypeScript and Supabase that handles 1,000+ entries a month.",
                "Built employee records, automated wage calculations, financial reconciliation, role-based authorization and audit logging. Owners can now delegate operations, and the platform replaced about 8 hours of manual work a week.",
                "Shipped it as a mobile PWA with analytics and reporting. Other work includes an XGBoost prediction app and property and e-commerce systems.",
            ]},
            {**UWAZO, "bullets": [
                "Designed and built the backend for a multi-tenant AI research platform in Python, FastAPI and Supabase, with data isolated per tenant.",
                "Built LangGraph orchestration services for streaming responses, document retrieval, vector search and persistent user context.",
                "Integrated legal sources, user documents and conversation history. Onboarded 17 accounts during early validation.",
            ]},
            {**CRAFTED, "bullets": [
                "Built and deployed the AI backend for an enterprise financial application used for debt recovery and analysis of large sets of debtor case records.",
                "Built agent workflows that generate SQL for data retrieval, reporting and customer messages. A person must approve each outbound message.",
                "Built retrieval pipelines, evaluation tooling, access controls and PII safeguards for AI services that handle sensitive financial data.",
            ]},
            {**ISLET, "bullets": [
                "Built and launched the main digital platform for a national pharmaceutical association with 13,000+ members.",
                "Built custom PHP integrations with external REST APIs that track certification for 10,000+ professionals and sync conference data daily.",
            ]},
        ],
        "project": {**PELMIO, "name": "Pelmio, Learning Experience Platform", "bullets": [
            "Built an education platform on FastAPI and PostgreSQL that handles curriculum ingestion, source-grounded AI processing, mission generation, learner activities and evidence collection.",
            "Built the authoring and learner workflows in one Next.js app. The platform is ready for teacher pilots.",
        ]},
    },
}

# Articles on victorkimani.com/writing. Titles match the site; findings come from each
# article's `result` frontmatter. Pick which ones each resume shows in WRITING_FOR below.
SITE = "https://victorkimani.com"
ARTICLES = {
    "workflow-to-agent": {
        "title": "My research assistant started as a workflow. Better models made an agent the right default.",
        "project": "Uwazo", "date": "Aug 2026",
        "finding": "One tool-calling agent refused 2 of 18 research questions where my routed pipeline refused 10, at the same speed.",
    },
    "pgvector-empty-index": {
        "title": "Our search got worse as we added documents. The cause was an index built on an empty table.",
        "project": "Uwazo", "date": "Aug 2026",
        "finding": "Recall fell to 0.20 on an IVFFlat index built on an empty table. Iterative HNSW scans brought it back to 0.99.",
    },
    "passing-checks-is-where-review-starts": {
        "title": "Passing every check is where review starts: lessons from testing AI in a classroom product",
        "project": "Pelmio", "date": "Nov 2026",
        "finding": "Of 43 AI drafts that passed every automatic check, a reviewer would use 29 as they were.",
    },
    "agent-loop-or-second-try": {
        "title": "Agent loop or a second try? What I learned removing agents and then testing one again",
        "project": "Pelmio", "date": "Oct 2026",
        "finding": "Two repair turns produced 26 of 27 usable drafts, at a third of the agent loop's tokens.",
    },
    "branching-chat-message-tree": {
        "title": "Edit, regenerate, switch back: building branching chat on a message tree",
        "project": "Uwazo", "date": "May 2026",
        "finding": "Parent ids and one active-leaf pointer were enough. The two bugs came from id swaps and a null with two meanings.",
    },
}

WRITING_FOR = {
    "applied-ai-engineer": ["workflow-to-agent", "passing-checks-is-where-review-starts", "pgvector-empty-index"],
    "ai-product-engineer": ["passing-checks-is-where-review-starts", "branching-chat-message-tree", "workflow-to-agent"],
    "backend-engineer": ["pgvector-empty-index", "branching-chat-message-tree", "workflow-to-agent"],
}

WRITING_LINE = " Publishes write-ups of the experiments behind this work."
