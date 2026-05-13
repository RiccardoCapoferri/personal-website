const sections = {
    education: {
        title: "Education",
        tone: "#246e68",
        items: [
            {
                title: "Bocconi University",
                meta: "BSc in Economics and Management - Second year",
                details: [
                    "Building a stronger technical path in parallel with university toward AI engineering and robotics systems.",
                    "Relevant coursework: Statistics, Macroeconomics, Microeconomics, Computer Science, Mathematics.",
                    "Planned coursework: Theoretical Computer Science and Advanced Python."
                ]
            },
            {
                title: "University of Brescia (UNIBS)",
                meta: "Supplementary engineering coursework",
                details: [
                    "Additional coursework to strengthen my quantitative and engineering background.",
                    "Planned courses: Linear Algebra and Geometry."
                ]
            },
            {
                title: "Northeastern University",
                meta: "Incoming Exchange Student - Boston, Massachusetts - Spring 2027",
                details: [
                    "Planned coursework includes Robotic Science and Systems and MATH 3341 Dynamical Systems.",
                    "The exchange is part of a broader move toward technical systems, robotics, and applied AI."
                ]
            },
            {
                title: "IIS Antonietti",
                meta: "Liceo Scientifico - Applied Sciences",
                details: [
                    "Relevant coursework: IT, C++, HTML, CSS, and database management.",
                    "Added a self-taught JavaScript component while building early web projects.",
                    "Built one of my first public web projects during high school."
                ]
            }
        ]
    },
    projects: {
        title: "Projects",
        tone: "#547150",
        items: [
            {
                title: "PCTO Experience Website",
                meta: "Personal website - 2023",
                details: [
                    "Built a website describing my PCTO experiences from 10th grade through 12th grade.",
                    "Translated school work into a structured web narrative using HTML and CSS."
                ]
            },
            {
                title: "How Americans Consume Wine",
                meta: "Research project - High school",
                details: [
                    "Studied wine consumption in the United States using collected data and primary sources.",
                    "Organized sources, patterns, and market signals into an approximate consumer analysis.",
                    "Early exercise in combining research, economics, and data interpretation."
                ]
            },
            {
                title: "Ferrari N.V. Business Analysis",
                meta: "Bocconi Course Project - Business Administration",
                details: [
                    "Collaborated in a team on a comprehensive analysis of Ferrari N.V.",
                    "Covered business model, strategic positioning, governance, stakeholder management, and Industry 4.0 implications.",
                    "Contributed to financial statement interpretation, ratio evaluation, and the final outlook on Ferrari's growth trajectory.",
                    "Strengthened business analysis, teamwork, critical thinking, and time management."
                ],
                link: "assets/ferrari-business-administration-report.pdf",
                label: "Open Ferrari report"
            }
        ]
    },
    honors: {
        title: "Honors",
        tone: "#9b6042",
        items: [
            {
                title: "ISE Hackathon Finalist",
                meta: "Innovation Track - Customer experience enhancer",
                details: [
                    "The hackathon took place in Barcelona.",
                    "The project focused on a RAG system and AV technologies.",
                    "Reached the final round with a project focused on improving customer experience.",
                    "Built and presented the concept through a pitch deck for the Innovation Track."
                ],
                link: "https://drive.google.com/file/d/1O0YeT18TvMUUdYRC1yaLFvMuDf2Qf-nK/preview",
                label: "Open pitch deck"
            }
        ]
    },
    contact: {
        title: "Contact",
        tone: "#405f8f"
    }
};

const canvas = document.getElementById("field");
const ctx = canvas.getContext("2d");
const navButtons = document.querySelectorAll("[data-section]");
const homeContent = document.getElementById("home-content");
const dynamicContent = document.getElementById("dynamic-content");

let width = 0;
let height = 0;
let pixelRatio = 1;
let activeSection = "home";
let activeTone = "#246e68";
let pointer = { x: 0, y: 0, active: false };
let particles = [];
let tick = 0;

const particleCount = window.matchMedia("(max-width: 760px)").matches ? 88 : 154;

function randomBetween(min, max) {
    return min + Math.random() * (max - min);
}

function resizeCanvas() {
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * pixelRatio);
    canvas.height = Math.floor(height * pixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    setTargets(activeSection, true);
}

function seedParticles() {
    particles = Array.from({ length: particleCount }, (_, index) => ({
        x: randomBetween(0, width || window.innerWidth),
        y: randomBetween(0, height || window.innerHeight),
        vx: randomBetween(-0.2, 0.2),
        vy: randomBetween(-0.2, 0.2),
        tx: 0,
        ty: 0,
        size: randomBetween(1, 2.2),
        phase: randomBetween(0, Math.PI * 2),
        group: index % 7
    }));
}

function targetFor(index, mode) {
    const isMobile = width < 900;
    const cx = isMobile ? width * 0.5 : width * 0.68;
    const cy = isMobile ? height * 0.34 : height * 0.49;
    const scale = Math.min(width, height) * (isMobile ? 0.36 : 0.46);
    const t = index / Math.max(1, particleCount - 1);
    const angle = t * Math.PI * 2;

    if (mode === "education") {
        const columns = 4;
        const rows = Math.ceil(particleCount / columns);
        const col = index % columns;
        const row = Math.floor(index / columns);
        const slope = (row / rows - 0.5) * scale * 0.55;
        const x = cx + (col - (columns - 1) / 2) * scale * 0.22 + slope;
        const y = cy + (row / rows - 0.5) * scale * 1.28;
        return {
            x: x + Math.sin(row * 0.75) * 10,
            y: y + Math.cos(col * 1.6) * 12
        };
    }

    if (mode === "projects") {
        const side = Math.floor(index % 3);
        const local = (index % Math.ceil(particleCount / 3)) / Math.ceil(particleCount / 3);
        const radius = scale * (0.16 + 0.6 * local);
        const offset = side * (Math.PI * 2 / 3);
        return {
            x: cx + Math.cos(angle * 2.65 + offset) * radius,
            y: cy + Math.sin(angle * 1.35 + offset) * radius * 0.54 + Math.sin(local * Math.PI * 2) * 24
        };
    }

    if (mode === "honors") {
        const x = cx + (t - 0.5) * scale * 1.55;
        const y = cy + Math.sin(t * Math.PI * 6) * scale * 0.18 + Math.cos(t * Math.PI * 14) * 18;
        return { x, y };
    }

    if (mode === "contact") {
        const ring = index % 5;
        const radius = scale * (0.12 + ring * 0.105);
        const arc = angle + Math.sin(index * 0.7) * 0.38;
        return {
            x: cx + Math.cos(arc) * radius * 1.22,
            y: cy + Math.sin(arc) * radius * 0.88
        };
    }

    const spiral = Math.sqrt(t) * scale * 0.74;
    const theta = t * Math.PI * 7.4;
    return {
        x: cx + Math.cos(theta) * spiral * 1.18 + Math.sin(index * 1.7) * 20,
        y: cy + Math.sin(theta) * spiral * 0.56 + Math.cos(index * 1.1) * 20
    };
}

function setTargets(mode, immediate = false) {
    if (!particles.length) return;
    particles.forEach((particle, index) => {
        const target = targetFor(index, mode);
        particle.tx = target.x;
        particle.ty = target.y;
        if (immediate) {
            particle.x = target.x + randomBetween(-24, 24);
            particle.y = target.y + randomBetween(-24, 24);
        }
    });
}

function drawConnection(a, b, distance, tone) {
    const opacity = Math.max(0, 1 - distance / 128);
    ctx.strokeStyle = hexToRgba(tone, opacity * 0.28);
    ctx.lineWidth = 0.8;
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
}

function hexToRgba(hex, alpha) {
    const value = hex.replace("#", "");
    const r = parseInt(value.slice(0, 2), 16);
    const g = parseInt(value.slice(2, 4), 16);
    const b = parseInt(value.slice(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

function drawVectorField(tone) {
    const spacing = width < 760 ? 54 : 64;
    ctx.save();
    ctx.lineWidth = 0.75;

    for (let y = spacing * 0.7; y < height; y += spacing) {
        for (let x = spacing * 0.7; x < width; x += spacing) {
            const angle = Math.sin(x * 0.006 + tick * 0.7) + Math.cos(y * 0.005 - tick * 0.5);
            const length = 10 + Math.sin((x + y) * 0.01 + tick) * 4;
            const dx = Math.cos(angle) * length;
            const dy = Math.sin(angle) * length;

            ctx.strokeStyle = hexToRgba(tone, 0.08);
            ctx.beginPath();
            ctx.moveTo(x - dx, y - dy);
            ctx.lineTo(x + dx, y + dy);
            ctx.stroke();

            ctx.fillStyle = hexToRgba(tone, 0.11);
            ctx.beginPath();
            ctx.arc(x + dx, y + dy, 1.1, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    ctx.restore();
}

function drawContours(tone) {
    const isMobile = width < 900;
    const cx = isMobile ? width * 0.5 : width * 0.68;
    const cy = isMobile ? height * 0.34 : height * 0.49;
    const rings = 6;

    ctx.save();
    ctx.lineWidth = 1;
    for (let ring = 0; ring < rings; ring += 1) {
        const radiusX = 74 + ring * 42 + Math.sin(tick * 1.2 + ring) * 8;
        const radiusY = 38 + ring * 25 + Math.cos(tick + ring) * 5;
        ctx.strokeStyle = hexToRgba(tone, 0.075 - ring * 0.007);
        ctx.beginPath();
        for (let step = 0; step <= 140; step += 1) {
            const theta = (step / 140) * Math.PI * 2;
            const wobble = Math.sin(theta * 3 + tick * 1.4 + ring) * 8;
            const x = cx + Math.cos(theta) * (radiusX + wobble);
            const y = cy + Math.sin(theta) * (radiusY + wobble * 0.45);
            if (step === 0) {
                ctx.moveTo(x, y);
            } else {
                ctx.lineTo(x, y);
            }
        }
        ctx.stroke();
    }
    ctx.restore();
}

function animate() {
    tick += 0.01;
    ctx.clearRect(0, 0, width, height);

    const focusX = width < 900 ? width * 0.5 : width * 0.68;
    const focusY = width < 900 ? height * 0.34 : height * 0.49;
    const gradient = ctx.createRadialGradient(focusX, focusY, 10, focusX, focusY, Math.max(width, height) * 0.66);
    gradient.addColorStop(0, hexToRgba(activeTone, 0.12));
    gradient.addColorStop(0.45, "rgba(255,255,255,0.1)");
    gradient.addColorStop(1, "rgba(238,233,221,0)");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);
    drawVectorField(activeTone);
    drawContours(activeTone);

    for (const particle of particles) {
        const field = Math.sin((particle.y * 0.006) + tick + particle.phase) * 0.055;
        const pullX = (particle.tx - particle.x) * 0.018;
        const pullY = (particle.ty - particle.y) * 0.018;

        particle.vx = (particle.vx + pullX + field) * 0.88;
        particle.vy = (particle.vy + pullY + Math.cos((particle.x * 0.005) + tick) * 0.035) * 0.88;

        if (pointer.active) {
            const dx = particle.x - pointer.x;
            const dy = particle.y - pointer.y;
            const distance = Math.hypot(dx, dy);
            if (distance < 150) {
                const force = (1 - distance / 150) * 1.4;
                particle.vx += (dx / Math.max(distance, 1)) * force;
                particle.vy += (dy / Math.max(distance, 1)) * force;
            }
        }

        particle.x += particle.vx;
        particle.y += particle.vy;
    }

    for (let i = 0; i < particles.length; i += 1) {
        const a = particles[i];
        for (let j = i + 1; j < particles.length; j += 1) {
            const b = particles[j];
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const distance = Math.hypot(dx, dy);
            if (distance < 128 && (a.group === b.group || distance < 68)) {
                drawConnection(a, b, distance, activeTone);
            }
        }
    }

    for (const particle of particles) {
        const pulse = 0.35 + Math.sin(tick * 4 + particle.phase) * 0.18;
        ctx.fillStyle = hexToRgba(activeTone, 0.38 + pulse * 0.16);
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.size + pulse, 0, Math.PI * 2);
        ctx.fill();
    }

    requestAnimationFrame(animate);
}

function renderSection(sectionId) {
    if (sectionId === "home") {
        homeContent.classList.add("view-active");
        dynamicContent.classList.remove("view-active");
        dynamicContent.innerHTML = "";
        return;
    }

    const section = sections[sectionId];
    if (!section) return;

    homeContent.classList.remove("view-active");
    dynamicContent.classList.add("view-active");

    if (sectionId === "contact") {
        dynamicContent.innerHTML = `
            <p class="eyebrow">Signal path</p>
            <h2 class="section-title">${section.title}</h2>
            <p class="contact-copy">Feel free to reach out.</p>
            <div class="contact-links">
                <a href="mailto:capoferririccardo@gmail.com"><span class="social-mark">@</span><span class="social-name">Email</span></a>
                <a href="https://github.com/RiccardoCapoferri"><span class="social-mark">GH</span><span class="social-name">GitHub</span></a>
                <a href="https://www.linkedin.com/in/riccardo-capoferri/"><span class="social-mark">in</span><span class="social-name">LinkedIn</span></a>
                <a href="https://www.instagram.com/_riccardocapoferri_/"><span class="social-mark">IG</span><span class="social-name">Instagram</span></a>
                <a href="https://x.com/riccardocpf"><span class="social-mark">X</span><span class="social-name">X.com</span></a>
            </div>
        `;
        return;
    }

    const cards = section.items.map((item) => {
        const details = item.details.map((detail) => `<li>${detail}</li>`).join("");
        const link = item.link ? `<a class="inline-link" href="${item.link}">${item.label || "Open"}</a>` : "";
        const cardClass = sectionId === "projects" ? "project-card" : "entry";
        return `
            <article class="${cardClass}">
                <h3>${item.title}</h3>
                <p class="meta">${item.meta}</p>
                <ul>${details}</ul>
                ${link}
            </article>
        `;
    }).join("");

    const wrapperClass = sectionId === "projects" ? "card-grid" : "entry-list";
    dynamicContent.innerHTML = `
        <p class="eyebrow">${sectionId === "honors" ? "Proof of momentum" : "Trajectory"}</p>
        <h2 class="section-title">${section.title}</h2>
        <div class="${wrapperClass}">${cards}</div>
    `;
}

function changeSection(sectionId) {
    activeSection = sectionId;
    activeTone = sections[sectionId]?.tone || "#246e68";
    navButtons.forEach((button) => {
        button.classList.toggle("active", button.dataset.section === sectionId);
    });
    setTargets(sectionId);
    renderSection(sectionId);
    window.scrollTo({ top: 0, behavior: "auto" });
}

window.addEventListener("resize", resizeCanvas);
window.addEventListener("mousemove", (event) => {
    pointer = { x: event.clientX, y: event.clientY, active: true };
});
window.addEventListener("mouseleave", () => {
    pointer.active = false;
});

navButtons.forEach((button) => {
    button.addEventListener("click", () => changeSection(button.dataset.section));
});

seedParticles();
resizeCanvas();
changeSection("home");
animate();
