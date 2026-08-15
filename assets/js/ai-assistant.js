/* ===================================
   ETHYRA GLOBAL RESEARCH
   AI ASSISTANT
   Version 2.0
=================================== */

/* --------------------------------------------------
   CONFIGURATION
   Replace the endpoint below with your real AI API
   URL (e.g. a Cloudflare Worker / Vercel function).
   Set USE_BACKEND_AI = true once your endpoint is live.
   Leave as false to use the built-in knowledge base.
-------------------------------------------------- */
const ETHYRA_AI_CONFIG = {
    USE_BACKEND_AI: false,
    ENDPOINT: "/api/chat",               // Your serverless endpoint
    MODEL: "gpt-4o-mini",               // Model hint for your backend
    TIMEOUT_MS: 15000
};

/* --------------------------------------------------
   KNOWLEDGE BASE
   All answers are derived from the Ethyra website.
   Do NOT add invented facts, statistics, or claims.
-------------------------------------------------- */
const ETHYRA_KB = {
    company: {
        name: "Ethyra Global Research",
        tagline: "Accelerating Clinical Research With Precision & Care",
        description: "Ethyra Global Research is a healthcare research organization focused on delivering end-to-end clinical research solutions. Our multidisciplinary team works closely with sponsors, investigators, healthcare institutions, and patients to ensure successful study execution and meaningful scientific outcomes.",
        email: "ethyraglobal.research@gmail.com",
        phone: "+91 9340982077",
        location: "Narsinghpur, Madhya Pradesh, India",
        hours: "Monday – Saturday, 9:00 AM – 6:00 PM IST"
    },
    mission: "To accelerate healthcare innovation through reliable, ethical, and patient-focused clinical research.",
    vision: "To become a globally trusted clinical research partner delivering measurable impact across healthcare systems.",
    values: ["Integrity — Conducting every study with transparency, honesty, and accountability.",
             "Innovation — Leveraging scientific advances to improve research outcomes and efficiency.",
             "Collaboration — Building strong partnerships across the healthcare research ecosystem.",
             "Excellence — Delivering high-quality clinical research services with measurable impact."],
    services: [
        { name: "Site Management", desc: "Operational leadership for site activation, monitoring, and performance optimization." },
        { name: "Patient Recruitment", desc: "Strategic outreach and engagement programs to accelerate enrollment." },
        { name: "Regulatory Compliance", desc: "End-to-end compliance support aligned with global clinical standards and GCP guidelines." },
        { name: "Data Management", desc: "Accurate data collection, reporting, analytics, and quality assurance." },
        { name: "Clinical Operations", desc: "Full-spectrum clinical trial operations from feasibility through study close-out." }
    ],
    careers: {
        intro: "Ethyra Global Research offers exciting roles across clinical research, operations, compliance, and healthcare innovation.",
        positions: ["Clinical Research Associate", "Regulatory Affairs Specialist", "Data Management Associate", "Clinical Project Coordinator"],
        benefits: ["Health support and wellness-focused work culture", "Continuous training and learning opportunities", "Structured career development pathways", "Exposure to impactful global research projects"],
        apply: "You can submit your application through the Careers page on our website."
    },
    stats: {
        activeStudies: "50+",
        patientsRecruited: "10,000+",
        therapeuticAreas: "25+",
        compliance: "100% GCP Compliance"
    },
    pages: {
        about: "about.html",
        services: "services.html",
        careers: "careers.html",
        insights: "insights.html",
        contact: "contact.html"
    }
};

/* --------------------------------------------------
   INTENT PATTERNS
   Map user query keywords → knowledge base answers.
-------------------------------------------------- */
const INTENT_MAP = [
    {
        patterns: ["service", "offer", "provide", "capabilities", "what do you do", "clinical research"],
        answer: () => {
            const list = ETHYRA_KB.services.map(s => `• **${s.name}**: ${s.desc}`).join("\n");
            return `Ethyra Global Research provides full-spectrum clinical research services:\n\n${list}\n\nWould you like to learn more about any specific service?`;
        },
        link: { text: "View All Services", url: "services.html" }
    },
    {
        patterns: ["partner", "partnership", "collaborate", "work with", "sponsor"],
        answer: () => `We'd be delighted to discuss a potential partnership.\n\nEthyra Global Research works with sponsors, investigators, healthcare institutions, and research organizations. Our team can support you across the full study lifecycle.\n\nPlease reach out to us directly — we'll schedule a consultation.`,
        link: { text: "Contact Our Team", url: "contact.html" }
    },
    {
        patterns: ["contact", "reach", "email", "phone", "call", "location", "address", "where"],
        answer: () => `You can reach the Ethyra Global Research team through:\n\n📧 **Email:** ${ETHYRA_KB.company.email}\n📞 **Phone:** ${ETHYRA_KB.company.phone}\n📍 **Location:** ${ETHYRA_KB.company.location}\n🕐 **Hours:** ${ETHYRA_KB.company.hours}`,
        link: { text: "Contact Page", url: "contact.html" }
    },
    {
        patterns: ["career", "job", "position", "apply", "hiring", "vacancy", "opportunity", "work for", "join"],
        answer: () => {
            const positions = ETHYRA_KB.careers.positions.map(p => `• ${p}`).join("\n");
            return `${ETHYRA_KB.careers.intro}\n\n**Current Opportunities:**\n${positions}\n\n**Benefits include:**\n${ETHYRA_KB.careers.benefits.map(b => `• ${b}`).join("\n")}`;
        },
        link: { text: "View Careers", url: "careers.html" }
    },
    {
        patterns: ["mission"],
        answer: () => `**Our Mission**\n\n${ETHYRA_KB.mission}`,
        link: null
    },
    {
        patterns: ["vision"],
        answer: () => `**Our Vision**\n\n${ETHYRA_KB.vision}`,
        link: null
    },
    {
        patterns: ["value", "integrity", "innovation", "collaboration", "excellence", "principle"],
        answer: () => {
            const vals = ETHYRA_KB.values.map(v => `• ${v}`).join("\n");
            return `**Our Core Values**\n\n${vals}`;
        },
        link: { text: "About Ethyra", url: "about.html" }
    },
    {
        patterns: ["about", "who", "company", "overview", "ethyra"],
        answer: () => `${ETHYRA_KB.company.description}\n\n**Mission:** ${ETHYRA_KB.mission}\n\n**Vision:** ${ETHYRA_KB.vision}`,
        link: { text: "Learn More About Us", url: "about.html" }
    },
    {
        patterns: ["stat", "number", "how many", "study", "patient", "therapeutic", "compliance", "gcp"],
        answer: () => `**Ethyra Global Research — At a Glance**\n\n• ${ETHYRA_KB.stats.activeStudies} Active Studies\n• ${ETHYRA_KB.stats.patientsRecruited} Patients Recruited\n• ${ETHYRA_KB.stats.therapeuticAreas} Therapeutic Areas\n• ${ETHYRA_KB.stats.compliance}`,
        link: null
    },
    {
        patterns: ["patient recruitment", "enroll", "enrollment"],
        answer: () => `**Patient Recruitment**\n\n${ETHYRA_KB.services.find(s => s.name === "Patient Recruitment").desc}\n\nOur strategic outreach programs are designed to accelerate enrollment timelines while maintaining the highest standards of patient safety and consent.`,
        link: { text: "Our Services", url: "services.html" }
    },
    {
        patterns: ["regulatory", "compliance", "gcp", "submission"],
        answer: () => `**Regulatory Compliance**\n\n${ETHYRA_KB.services.find(s => s.name === "Regulatory Compliance").desc}\n\nEthyra maintains 100% GCP compliance across all studies.`,
        link: { text: "Our Services", url: "services.html" }
    },
    {
        patterns: ["data management", "data", "analytics", "reporting"],
        answer: () => `**Data Management**\n\n${ETHYRA_KB.services.find(s => s.name === "Data Management").desc}`,
        link: { text: "Our Services", url: "services.html" }
    },
    {
        patterns: ["site management", "site activation", "monitoring"],
        answer: () => `**Site Management**\n\n${ETHYRA_KB.services.find(s => s.name === "Site Management").desc}`,
        link: { text: "Our Services", url: "services.html" }
    },
    {
        patterns: ["global", "international", "region", "worldwide"],
        answer: () => `Ethyra Global Research collaborates with research partners and healthcare organizations across multiple regions. Our expertise spans multiple therapeutic areas and regulatory environments.`,
        link: { text: "Contact Our Team", url: "contact.html" }
    },
    {
        patterns: ["insight", "blog", "article", "news", "publication", "research update"],
        answer: () => `You can find the latest insights, articles, and research updates on our Insights page.`,
        link: { text: "View Insights", url: "insights.html" }
    },
    {
        patterns: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening", "greet"],
        answer: () => `Hello! I'm the Ethyra AI Assistant. I'm here to help you learn about Ethyra Global Research, our services, career opportunities, and how to get in touch.\n\nHow can I assist you today?`,
        link: null
    },
    {
        patterns: ["thank", "thanks", "appreciate"],
        answer: () => `You're welcome! If you have any other questions about Ethyra Global Research, feel free to ask. You can also reach our team directly — we're always happy to help.`,
        link: { text: "Contact Our Team", url: "contact.html" }
    }
];

/* Medical/personal health safety patterns */
const MEDICAL_PATTERNS = ["diagnose", "diagnosis", "treat", "treatment", "medication", "drug", "prescribe",
    "symptoms", "disease", "cure", "therapy", "dose", "dosage", "my condition", "my health",
    "am i sick", "should i take", "side effect", "emergency", "hospital"];

/* --------------------------------------------------
   LOCAL AI ENGINE
   Matches user input to the knowledge base.
-------------------------------------------------- */
function localAIResponse(userMessage) {
    const lower = userMessage.toLowerCase().trim();

    // Medical safety check — highest priority
    if (MEDICAL_PATTERNS.some(p => lower.includes(p))) {
        return {
            text: "I'm Ethyra's research information assistant, not a medical professional.\n\nI can help explain Ethyra Global Research's research capabilities and services, but I'm unable to provide personal medical advice, diagnosis, or treatment recommendations.\n\nIf you have a medical concern, please consult a qualified healthcare provider.",
            link: null
        };
    }

    // Match intents
    for (const intent of INTENT_MAP) {
        if (intent.patterns.some(p => lower.includes(p))) {
            return { text: intent.answer(), link: intent.link };
        }
    }

    // Fallback
    return {
        text: "I don't have enough information to answer that accurately.\n\nPlease contact the Ethyra Global Research team and we'll be happy to assist you.",
        link: { text: "Contact Our Team", url: "contact.html" }
    };
}

/* --------------------------------------------------
   BACKEND AI (optional)
   Called when USE_BACKEND_AI = true.
-------------------------------------------------- */
async function backendAIResponse(userMessage) {
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), ETHYRA_AI_CONFIG.TIMEOUT_MS);

    try {
        const resp = await fetch(ETHYRA_AI_CONFIG.ENDPOINT, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                message: userMessage,
                model: ETHYRA_AI_CONFIG.MODEL
            }),
            signal: controller.signal
        });

        clearTimeout(timer);

        if (!resp.ok) throw new Error("Server error");

        const data = await resp.json();
        return { text: data.reply || data.message || "I received a response but couldn't parse it.", link: null };

    } catch (err) {
        clearTimeout(timer);
        if (err.name === "AbortError") {
            throw new Error("timeout");
        }
        throw err;
    }
}

/* --------------------------------------------------
   QUICK QUESTIONS
   Displayed when chat first opens.
-------------------------------------------------- */
const QUICK_QUESTIONS = [
    "What services does Ethyra provide?",
    "How can I partner with Ethyra?",
    "What clinical research capabilities do you offer?",
    "How can I contact your team?",
    "Are there career opportunities?"
];

/* --------------------------------------------------
   UI BUILDER & STATE
-------------------------------------------------- */
let chatOpen = false;
let isProcessing = false;
let greetingShown = false;

function buildAIWidget() {
    // FAB (Floating Action Button)
    const fab = document.createElement("button");
    fab.id = "ethyra-ai-fab";
    fab.className = "ethyra-ai-fab";
    fab.setAttribute("aria-label", "Ask Ethyra AI Assistant");
    fab.setAttribute("title", "Ask Ethyra AI");
    fab.innerHTML = `
        <span class="ethyra-ai-fab-ring"></span>
        <i class="bi bi-stars" aria-hidden="true"></i>
        <span class="ethyra-ai-fab-tooltip">Ask Ethyra AI</span>
    `;

    // Chat panel
    const panel = document.createElement("div");
    panel.id = "ethyra-ai-panel";
    panel.className = "ethyra-ai-panel";
    panel.setAttribute("role", "dialog");
    panel.setAttribute("aria-label", "Ethyra AI Assistant");
    panel.setAttribute("aria-modal", "false");
    panel.innerHTML = `
        <div class="ethyra-ai-header">
            <div class="ethyra-ai-header-info">
                <div class="ethyra-ai-avatar" aria-hidden="true">
                    <i class="bi bi-stars"></i>
                </div>
                <div>
                    <div class="ethyra-ai-header-name">Ethyra AI Assistant</div>
                    <div class="ethyra-ai-header-sub">Research information assistant</div>
                </div>
            </div>
            <button class="ethyra-ai-close" id="ethyra-ai-close" aria-label="Close AI Assistant">
                <i class="bi bi-x-lg" aria-hidden="true"></i>
            </button>
        </div>

        <div class="ethyra-ai-messages" id="ethyra-ai-messages" role="log" aria-live="polite" aria-label="Chat messages">
        </div>

        <div class="ethyra-ai-quick" id="ethyra-ai-quick" aria-label="Suggested questions">
        </div>

        <div class="ethyra-ai-input-row">
            <input
                type="text"
                id="ethyra-ai-input"
                class="ethyra-ai-input"
                placeholder="Ask about our services..."
                maxlength="300"
                autocomplete="off"
                aria-label="Type your message"
            />
            <button
                id="ethyra-ai-send"
                class="ethyra-ai-send"
                aria-label="Send message"
            >
                <i class="bi bi-send-fill" aria-hidden="true"></i>
            </button>
        </div>
    `;

    document.body.appendChild(fab);
    document.body.appendChild(panel);
}

function renderQuickQuestions() {
    const container = document.getElementById("ethyra-ai-quick");
    if (!container) return;
    container.innerHTML = "";
    QUICK_QUESTIONS.forEach(q => {
        const btn = document.createElement("button");
        btn.className = "ethyra-ai-quick-btn";
        btn.textContent = q;
        btn.setAttribute("aria-label", `Ask: ${q}`);
        btn.addEventListener("click", () => {
            container.style.display = "none";
            sendMessage(q);
        });
        container.appendChild(btn);
    });
}

function addMessage(text, type, linkObj = null) {
    const messages = document.getElementById("ethyra-ai-messages");
    if (!messages) return;

    const msg = document.createElement("div");
    msg.className = `ethyra-ai-msg ethyra-ai-msg-${type}`;

    // Convert **bold** markdown to <strong>
    const formatted = text
        .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replace(/\n/g, "<br>");

    const bubble = document.createElement("div");
    bubble.className = "ethyra-ai-bubble";
    bubble.innerHTML = formatted;

    msg.appendChild(bubble);

    if (linkObj && linkObj.url) {
        const linkWrap = document.createElement("div");
        linkWrap.className = "ethyra-ai-link-wrap";
        const a = document.createElement("a");
        a.href = linkObj.url;
        a.className = "ethyra-ai-link-btn";
        a.textContent = linkObj.text;
        a.setAttribute("aria-label", linkObj.text);
        linkWrap.appendChild(a);
        msg.appendChild(linkWrap);
    }

    messages.appendChild(msg);

    // Animate in
    requestAnimationFrame(() => {
        msg.classList.add("ethyra-ai-msg-in");
    });

    // Scroll to bottom
    messages.scrollTop = messages.scrollHeight;
}

function showTyping() {
    const messages = document.getElementById("ethyra-ai-messages");
    if (!messages) return;

    const existing = document.getElementById("ethyra-ai-typing");
    if (existing) return;

    const typing = document.createElement("div");
    typing.id = "ethyra-ai-typing";
    typing.className = "ethyra-ai-msg ethyra-ai-msg-bot";
    typing.setAttribute("aria-label", "Ethyra AI is typing");
    typing.innerHTML = `
        <div class="ethyra-ai-bubble ethyra-ai-typing-bubble">
            <span class="ethyra-ai-typing-dot"></span>
            <span class="ethyra-ai-typing-dot"></span>
            <span class="ethyra-ai-typing-dot"></span>
        </div>
    `;
    messages.appendChild(typing);
    messages.scrollTop = messages.scrollHeight;
}

function hideTyping() {
    const t = document.getElementById("ethyra-ai-typing");
    if (t) t.remove();
}

async function sendMessage(text) {
    if (isProcessing || !text.trim()) return;

    const input = document.getElementById("ethyra-ai-input");
    const sendBtn = document.getElementById("ethyra-ai-send");
    const quick = document.getElementById("ethyra-ai-quick");

    // Hide quick questions after first interaction
    if (quick) quick.style.display = "none";

    addMessage(text, "user");
    if (input) input.value = "";

    isProcessing = true;
    if (sendBtn) sendBtn.disabled = true;
    if (input) input.disabled = true;

    showTyping();

    // Simulate natural typing delay
    await new Promise(r => setTimeout(r, 700 + Math.random() * 600));

    try {
        let response;

        if (ETHYRA_AI_CONFIG.USE_BACKEND_AI) {
            response = await backendAIResponse(text);
        } else {
            response = localAIResponse(text);
        }

        hideTyping();
        addMessage(response.text, "bot", response.link);

    } catch (err) {
        hideTyping();
        addMessage(
            "I'm having trouble connecting right now.\n\nPlease try again or contact the Ethyra Global Research team directly.",
            "bot",
            { text: "Contact Our Team", url: "contact.html" }
        );
    } finally {
        isProcessing = false;
        if (sendBtn) sendBtn.disabled = false;
        if (input) {
            input.disabled = false;
            input.focus();
        }
    }
}

function openChat() {
    const panel = document.getElementById("ethyra-ai-panel");
    const fab = document.getElementById("ethyra-ai-fab");
    if (!panel || !fab) return;

    chatOpen = true;
    panel.classList.add("ethyra-ai-panel-open");
    fab.setAttribute("aria-expanded", "true");

    // Show greeting on first open
    if (!greetingShown) {
        greetingShown = true;
        setTimeout(() => {
            addMessage(
                "Hello! 👋 I'm the Ethyra AI Assistant.\n\nI can help you learn about our services, clinical research capabilities, career opportunities, or how to get in touch. What would you like to know?",
                "bot"
            );
            renderQuickQuestions();
        }, 300);
    }

    setTimeout(() => {
        const input = document.getElementById("ethyra-ai-input");
        if (input) input.focus();
    }, 400);
}

function closeChat() {
    const panel = document.getElementById("ethyra-ai-panel");
    const fab = document.getElementById("ethyra-ai-fab");
    if (!panel || !fab) return;

    chatOpen = false;
    panel.classList.remove("ethyra-ai-panel-open");
    fab.setAttribute("aria-expanded", "false");
    fab.focus();
}

/* --------------------------------------------------
   EVENT LISTENERS
-------------------------------------------------- */
function initAIAssistant() {
    buildAIWidget();

    const fab = document.getElementById("ethyra-ai-fab");
    const closeBtn = document.getElementById("ethyra-ai-close");
    const sendBtn = document.getElementById("ethyra-ai-send");
    const input = document.getElementById("ethyra-ai-input");

    fab.addEventListener("click", () => {
        chatOpen ? closeChat() : openChat();
    });

    closeBtn.addEventListener("click", closeChat);

    sendBtn.addEventListener("click", () => {
        sendMessage(input.value.trim());
    });

    input.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            sendMessage(input.value.trim());
        }
    });

    // Escape key closes the chat
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && chatOpen) {
            closeChat();
        }
    });

    // Footer AI link hook
    document.addEventListener("click", (e) => {
        if (e.target && e.target.classList.contains("ethyra-ai-footer-trigger")) {
            e.preventDefault();
            openChat();
        }
    });
}

document.addEventListener("DOMContentLoaded", initAIAssistant);
