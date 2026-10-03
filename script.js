/* =========================================================
   FAITHFUL LABOURERS — MAIN JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {
    const assetPath = (path) => {
        if (!path) return path;
        if (path.startsWith("img/") || path.startsWith("http://") || path.startsWith("https://") || path.startsWith("data:")) {
            return path;
        }
        return `img/${path}`;
    };

    /* -----------------------------------------------------
       1. LOADING SCREEN
       ----------------------------------------------------- */
    const loader = document.getElementById("loader");
    if (loader) {
        window.addEventListener("load", () => {
            setTimeout(() => {
                loader.classList.add("hidden");
            }, 600);
        });
    }

    /* -----------------------------------------------------
       2. HERO SLIDER
       ----------------------------------------------------- */
    const slides = document.querySelectorAll(".hero-slide");
    if (slides.length > 0) {
        let currentSlide = 0;
        setInterval(() => {
            slides[currentSlide].classList.remove("active");
            currentSlide = (currentSlide + 1) % slides.length;
            slides[currentSlide].classList.add("active");
        }, 5000);
    }

    /* -----------------------------------------------------
       3. MOBILE NAVIGATION TOGGLE
       ----------------------------------------------------- */
    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    if (menuToggle && navMenu) {
        menuToggle.addEventListener("click", () => {
            navMenu.classList.toggle("active");
            const icon = menuToggle.querySelector("i");
            if (navMenu.classList.contains("active")) {
                icon.classList.remove("fa-bars");
                icon.classList.add("fa-xmark");
            } else {
                icon.classList.remove("fa-xmark");
                icon.classList.add("fa-bars");
            }
        });

        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                navMenu.classList.remove("active");
                const icon = menuToggle.querySelector("i");
                if (icon) {
                    icon.classList.remove("fa-xmark");
                    icon.classList.add("fa-bars");
                }
            });
        });
    }

    /* -----------------------------------------------------
       4. STICKY NAVBAR ON SCROLL
       ----------------------------------------------------- */
    const navbar = document.querySelector(".navbar");
    function updateNavbar() {
        if (!navbar) return;
        if (window.scrollY > 60) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    }
    window.addEventListener("scroll", updateNavbar);
    updateNavbar();

    /* -----------------------------------------------------
       5. SCROLL REVEAL ANIMATIONS
       ----------------------------------------------------- */
    const revealElements = document.querySelectorAll(".reveal");
    const revealObserver = new IntersectionObserver(
        (entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("active");
                    observer.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );

    revealElements.forEach(el => revealObserver.observe(el));

    /* -----------------------------------------------------
       6. ACTIVE NAV LINK HIGHLIGHTING
       ----------------------------------------------------- */
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll('#nav-menu a[href^="#"]');

    function showSection(id, updateHash = true) {
        const selectedSection = document.getElementById(id);
        if (!selectedSection) return;

        sections.forEach(section => {
            section.classList.toggle("active", section === selectedSection);
        });

        navLinks.forEach(link => {
            link.classList.toggle("active", link.getAttribute("href") === `#${id}`);
        });

        if (updateHash && window.location.hash !== `#${id}`) {
            history.pushState(null, "", `#${id}`);
        }

        selectedSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    const initialSectionId = window.location.hash.slice(1) || "home";
    showSection(initialSectionId, false);

    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener("click", event => {
            const targetId = link.getAttribute("href").slice(1);
            if (!document.getElementById(targetId)) return;

            event.preventDefault();
            showSection(targetId);
        });
    });

    window.addEventListener("popstate", () => {
        showSection(window.location.hash.slice(1) || "home", false);
    });

    const sectionObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.getAttribute("id");
                    navLinks.forEach(link => {
                        link.classList.remove("active");
                        if (link.getAttribute("href") === `#${id}`) {
                            link.classList.add("active");
                        }
                    });
                }
            });
        },
        { threshold: 0.35 }
    );

    sections.forEach(s => sectionObserver.observe(s));

    /* -----------------------------------------------------
       7. ANIMATED IMPACT STATS COUNTER
       ----------------------------------------------------- */
    function animateCounter(element) {
        const target = Number(element.getAttribute("data-target"));
        const duration = 1800;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easedProgress = 1 - Math.pow(1 - progress, 3);
            const currentValue = Math.floor(target * easedProgress);

            element.textContent = currentValue.toLocaleString() + "+";
            if (progress < 1) {
                requestAnimationFrame(update);
            } else {
                element.textContent = target.toLocaleString() + "+";
            }
        }
        requestAnimationFrame(update);
    }

    const counters = document.querySelectorAll(".counter[data-target]");
    if (counters.length > 0) {
        const counterObserver = new IntersectionObserver(
            entries => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        animateCounter(entry.target);
                        counterObserver.unobserve(entry.target);
                    }
                });
            },
            { threshold: 0.5 }
        );
        counters.forEach(c => counterObserver.observe(c));
    }

    /* -----------------------------------------------------
       8. CHURCH DETAILS MODAL SYSTEM
       ----------------------------------------------------- */
    const churchData = {
        kawempe: {
            name: "Kawempe Pentecostal Church",
            location: "Kawempe, Kampala District, Uganda",
            image: "img/17.webp",
            mapUrl: "https://www.google.com/maps/search/?api=1&query=Kawempe+Pentecostal+Church,+Kawempe,+Kampala,+Uganda",
            description: "A vibrant Christian community committed to worship, Gospel ministry, fellowship, discipleship, and compassionate local outreach.",
            leaders: [
                "Elder Alice Seyonga — Church Elder",
                "Elder Samalie — Church Elder",
                "Elder Nsale Teddy — Church Elder"
            ],
            pastoralTeam: ["mary-lukwago", "ssekitoleko-robert", "david-kusasira", "kisembo-leo"],
            services: [
                ["Morning Service", "8:00 AM - 10:00 AM"],
                ["Second Service", "10:00 AM - 1:00 PM"]
            ],
            ministryFocus: [
                [["49.jpeg", "50.jpeg", "51.jpeg"], "Youth Ministry", "Camp activities, games, youth meetings, and prayer gatherings that help young people grow in faith and friendship."],
                [["16.webp", "55.jpeg", "44.jpeg"], "Music Ministry", "Leading worship through choir, praise, instrumental music, and a joyful culture of serving God."],
                [["43.webp", "31.jpeg", "39.webp"], "Preaching Ministry", "Teaching God's Word with clarity and conviction through Sunday preaching, Bible study, and discipleship."]
            ],
            youtube: "https://www.youtube.com/@KawempePentecostalChurch",
            ministries: [
                ["18.webp", "Youth Ministry", "Growing a faithful generation"],
                ["40.webp", "Worship", "Encountering God together"],
                ["38.webp", "Word & Preaching", "Built on the truth of Scripture"],
                ["28.jpeg", "Fellowship", "United in love and community"],
                ["52.jpeg", "Youth Games", ""],
                ["41.webp", "Welcoming Ushers", ""]
            ]
        },
        kisimu: {
            name: "Kisimu Pentecostal Church",
            location: "Kisimu, Wakiso District, Uganda",
            image: "img/56.jpeg",
            mapUrl: "https://www.google.com/maps/search/?api=1&query=Kisimu+Pentecostal+Church,+Kisimu,+Wakiso,+Uganda",
            description: "A growing church serving families and youth through biblical teaching, worship, prayer meetings, and local community assistance.",
            leaders: [
                "Pastor Kakooza Vicent — Senior Pastor",
                "Elder Kawuuma Robina — Church Elder",
                "Ministry Leader Travis Kisaakye — Youth Coordinator"
            ],
            pastoralTeam: ["kakooza-vicent"]
        },
        kikoza: {
            name: "Kikoza Pentecostal Church",
            location: "Kikoza, Luwero District, Uganda",
            image: "img/24.png",
            mapUrl: "https://www.google.com/maps/search/?api=1&query=Kikoza+Pentecostal+Church,+Kikoza,+Luwero,+Uganda",
            description: "Dedicated to sharing the Gospel, strengthening rural families, and supporting community development initiatives through prayer, discipleship, outreach, and practical care.",
            leaders: [
                "Pastor Kisaaye Sarah Nakafeero — Senior Pastor",
                "Pastor Jimmy Mugerwa — Assistant Pastor"
            ],
            pastoralTeam: ["kisaaye-sarah-nakafeero", "jimmy-mugerwa"],
            ministryFocus: [
                ["20.png", "Children Ministry", "Teaching children the Word of God and prayer."],
                ["29.png", "Women Fellowship", "Empowering women through prayer, encouragement, and support."],
                ["22.png", "Building church structure", "Two women carrying a tree pole to help build the church structure in Kikoza, Luwero District."],
            ],
            ministries: [
                ["21.png", "Women Ministry", "Women fellowship, prayer and discipleship"],
            ]
        }
    };

    const pastorData = {
        "kakooza-vicent": {
            name: "Pastor Kakooza Vicent",
            role: "Senior Pastor",
            image: "img/Ps4.jpeg",
            description: "Pastor Kakooza Vicent provides spiritual leadership at Kisimu Pentecostal Church, guiding the congregation in worship, discipleship, prayer, and faithful service to the community.",
            contact: "Connect through the church office",
            social: [{ label: "Church Contact", icon: "fa-church", url: "#contact" }]
        },
        "kisaaye-sarah-nakafeero": {
            name: "Pastor Kisaaye Sarah Nakafeero",
            role: "Senior Pastor",
            image: "img/Ps6.png",
            description: "Pastor Kisaaye Sarah Nakafeero provides pastoral leadership at Kikoza Pentecostal Church, guiding the congregation in prayer, biblical teaching, and discipleship.",
            contact: "Connect through the church office",
            social: [{ label: "Church Contact", icon: "fa-church", url: "#contact" }]
        },
        "jimmy-mugerwa": {
            name: "Pastor Jimmy Mugerwa",
            role: "Assistant Pastor",
            image: "img/54.jpeg",
            description: "Pastor Jimmy Mugerwa supports the Kikoza church family through preaching, pastoral care, discipleship, and mentoring believers in the faith.",
            contact: "Connect through the church office",
            social: [{ label: "Church Contact", icon: "fa-church", url: "#contact" }]
        },
        "mary-lukwago": {
            name: "Bishop Mary Lukwago",
            role: "Senior Pastor",
            image: "img/Bp.jpeg",
            description: "Bishop Mary Lukwago provides senior pastoral leadership, guiding Kawempe Pentecostal Church in worship, teaching, prayer, and faithful service to the community.",
            contact: "Connect through the church office",
            social: [{ label: "YouTube", icon: "fa-youtube", url: "https://www.youtube.com/@KawempePentecostalChurch" }]
        },
        "ssekitoleko-robert": {
            name: "Pastor Ssekitoleko Robert",
            role: "Pastor",
            image: "img/Ps2.webp",
            description: "Pastor Ssekitoleko Robert serves the church through pastoral care, Gospel ministry, teaching, and practical support for individuals and families.",
            contact: "+256 702 200 441",
            social: [{ label: "WhatsApp", icon: "fa-whatsapp", url: "https://wa.me/256702200441" }]
        },
        "david-kusasira": {
            name: "Pastor David Kusasira",
            role: "Pastor",
            image: "img/Ps1.webp",
            description: "Pastor David Kusasira serves alongside the pastoral team in ministry, discipleship, prayer, and the spiritual care of the congregation.",
            contact: "Connect through the church office",
            social: [{ label: "YouTube", icon: "fa-youtube", url: "https://www.youtube.com/@KawempePentecostalChurch" }]
        },
        "kisembo-leo": {
            name: "Pastor Kisembo Leo",
            role: "Pastor",
            image: "img/Ps3.jpeg",
            description: "Pastor Kisembo Leo supports the church through preaching, fellowship, pastoral encouragement, and service to the wider community.",
            contact: "Connect through the church office",
            social: [{ label: "Instagram", icon: "fa-instagram", url: "https://www.instagram.com/k.p.c97" }]
        }
    };

    const modal = document.getElementById("churchModal");
    const modalBody = document.getElementById("churchModalBody");
    const modalClose = document.querySelector(".modal-close");

    function openChurchModal(id) {
        const data = churchData[id];
        if (!data || !modal || !modalBody) return;

        modal.classList.toggle("kawempe-modal", id === "kawempe");
        modalBody.innerHTML = `
            <div class="modal-header">
                <img src="${assetPath(data.image)}" alt="${data.name}">
                <div class="modal-header-content">
                    <span class="section-label">OUR CHURCH</span>
                    <h2>${data.name}</h2>
                    <p><i class="fas fa-location-dot"></i> ${data.location}</p>
                    ${id === "kawempe" ? `<p class="modal-welcome">Welcome to a church family rooted in worship, the Word, and service.</p>` : ""}
                    <a class="btn btn-primary modal-map-btn" href="${data.mapUrl}" target="_blank" rel="noopener noreferrer">
                        <i class="fas fa-map-location-dot"></i> Open in Google Maps
                    </a>
                </div>
            </div>
            ${id === "kawempe" ? `
                <nav class="modal-jump-links" aria-label="Kawempe church dashboard sections">
                    <a href="#kawempe-about">About</a>
                    <a href="#kawempe-leadership">Leadership</a>
                    <a href="#kawempe-ministries">Ministries</a>
                    <a href="#kawempe-services">Services</a>
                    <a href="#kawempe-gallery">Gallery</a>
                </nav>
            ` : ""}
            <div class="modal-grid kawempe-about-grid" id="${id === "kawempe" ? "kawempe-about" : ""}">
                <div class="modal-panel about-dashboard-panel">
                    <div class="about-dashboard-image">
                        <img src="${assetPath(data.image)}" alt="${data.name}">
                    </div>
                    <div class="about-dashboard-copy">
                        <span class="section-label">ABOUT THE CHURCH</span>
                        <h3>Faith in community</h3>
                        <p>${data.description}</p>
                    </div>
                </div>
            </div>
            <div class="modal-panel" id="${id === "kawempe" ? "kawempe-leadership" : ""}">
                <h3>Church Leadership</h3>
                ${data.pastoralTeam ? `
                    <div class="leadership-subsection leadership-pastoral-team">
                        <div class="modal-kawempe-heading">
                            <div>
                                <span class="section-label">CHURCH LEADERSHIP</span>
                                <h4>Pastoral Team</h4>
                            </div>
                        </div>
                        <p class="modal-pastoral-intro">Meet the pastors serving ${data.name} through spiritual guidance, teaching, and care.</p>
                        <div class="pastoral-team">
                            ${data.pastoralTeam.map(pastorId => {
                                const pastor = pastorData[pastorId];
                                return `
                                    <article class="pastor-card" data-pastor="${pastorId}" tabindex="0" role="button" aria-label="View profile of ${pastor.name}">
                                        <div class="pastor-photo-frame"><img src="${assetPath(pastor.image)}" alt="${pastor.name}"></div>
                                        <div class="pastor-card-body">
                                            <span>${pastor.role}</span>
                                            <h3>${pastor.name}</h3>
                                            <p>${pastor.description}</p>
                                            <button class="details-btn pastor-details-btn" type="button" data-pastor="${pastorId}">View Profile <i class="fas fa-arrow-right"></i></button>
                                        </div>
                                    </article>
                                `;
                            }).join('')}
                        </div>
                    </div>
                ` : ""}
                <div class="leadership-subsection leadership-elders">
                    <div class="modal-kawempe-heading">
                        <div>
                            <span class="section-label">CHURCH LEADERSHIP</span>
                            <h4>Church Elders</h4>
                        </div>
                    </div>
                    <div class="leaders">
                        ${data.leaders.map((leader, i) => `
                            <div class="leader-item">
                                <span class="leader-badge">${i + 1}</span>
                                <span>${leader}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
            ${data.ministryFocus ? `
                <div class="modal-kawempe-block ministry-focus" id="${id === "kawempe" ? "kawempe-ministries" : "kikoza-ministries"}">
                    <div class="modal-kawempe-heading">
                        <div>
                            <span class="section-label">MINISTRY DASHBOARD</span>
                            <h3>${id === "kawempe" ? "Growing, Worshipping, Serving" : "Ministry Activities"}</h3>
                        </div>
                    </div>
                    <div class="ministry-focus-grid">
                        ${data.ministryFocus.map(ministry => `
                            <article class="ministry-focus-card" tabindex="0" role="button" aria-label="View ${ministry[1]} activities">
                                <div class="ministry-focus-image">
                                    ${Array.isArray(ministry[0]) ? ministry[0].map((image, index) => `
                                        <img src="${assetPath(image)}" alt="${ministry[1]} activity ${index + 1} at ${data.name}">
                                    `).join('') : `<img src="${assetPath(ministry[0])}" alt="${ministry[1]} at ${data.name}">`}
                                </div>
                                <div class="ministry-focus-copy">
                                    <h4>${ministry[1]}</h4>
                                    <p>${ministry[2]}</p>
                                </div>
                            </article>
                        `).join('')}
                    </div>
                </div>
            ` : ""}
            ${data.services ? `
                <div class="modal-kawempe-block" id="kawempe-services">
                    <div class="modal-kawempe-heading">
                        <h3>Sunday Services</h3>
                    </div>
                    <div class="modal-service-times">
                        ${data.services.map((service, index) => `
                            <article class="modal-service-time">
                                <span class="service-icon"><i class="fas fa-clock"></i></span>
                                <div class="service-time-copy">
                                    <span class="service-label">${index === 0 ? "Morning worship" : "Main worship"}</span>
                                    <strong>${service[0]}</strong>
                                    <span class="service-hours">${service[1].replace(" - ", " &ndash; ")}</span>
                                </div>
                            </article>
                        `).join('')}
                    </div>
                    <a class="modal-youtube-link" href="${data.youtube}" target="_blank" rel="noopener">
                        <i class="fab fa-youtube"></i>
                        <span>Visit YouTube Channel</span>
                        <i class="fas fa-arrow-up-right-from-square"></i>
                    </a>
                    <div class="modal-gallery-heading" id="kawempe-gallery">
                        <h4>Life at Kawempe</h4>
                        <span>Worship, service, and fellowship</span>
                    </div>
                    <div class="modal-ministry-gallery">
                        ${data.ministries.map(ministry => `
                            <article class="modal-ministry-card">
                                <img src="${assetPath(ministry[0])}" alt="${ministry[1]} at ${data.name}">
                                <div>
                                    <span>${ministry[1]}</span>
                                    <h4>${ministry[2]}</h4>
                                </div>
                            </article>
                        `).join('')}
                    </div>
                </div>
            ` : ""}
            ${data.ministries && !data.services ? `
                <div class="modal-kawempe-block" id="kikoza-gallery">
                    <div class="modal-kawempe-heading">
                        <div>
                            <span class="section-label">CHURCH ACTIVITY</span>
                            <h3>Ministry Gallery</h3>
                        </div>
                    </div>
                    <div class="modal-gallery-heading">
                        <h4>Life at Kikoza</h4>
                        <span>Prayer, discipleship, and community service</span>
                    </div>
                    <div class="modal-ministry-gallery">
                        ${data.ministries.map(ministry => `
                            <article class="modal-ministry-card">
                                <img src="${assetPath(ministry[0])}" alt="${ministry[1]} at ${data.name}">
                                <div>
                                    <span>${ministry[1]}</span>
                                    <h4>${ministry[2]}</h4>
                                </div>
                            </article>
                        `).join('')}
                    </div>
                </div>
            ` : ""}
            <div style="margin-top: 20px; text-align: right;">
                <a href="#contact" class="btn btn-primary modal-contact-btn">Get In Touch →</a>
            </div>
        `;

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");

        const contactBtn = modalBody.querySelector(".modal-contact-btn");
        if (contactBtn) {
            contactBtn.addEventListener("click", () => closeModal());
        }
        bindPastorCards();
        bindMinistryCards();
    }

    function openPastorModal(id) {
        const data = pastorData[id];
        if (!data || !modal || !modalBody) return;

        modalBody.innerHTML = `
            <div class="pastor-profile-header">
                <div class="pastor-profile-photo"><img src="${assetPath(data.image)}" alt="${data.name}"></div>
                <div>
                    <span class="section-label">CHURCH LEADERSHIP</span>
                    <h2>${data.name}</h2>
                    <p class="pastor-modal-role">${data.role}</p>
                </div>
            </div>
            <div class="modal-panel pastor-modal-description">
                <h3>Biography</h3>
                <p>${data.description}</p>
                <div class="pastor-profile-contact">
                    <span><i class="fas fa-phone"></i> ${data.contact}</span>
                    <div class="pastor-social-links">
                        ${data.social.map(link => `<a href="${link.url}" target="_blank" rel="noopener" aria-label="${link.label}"><i class="fab ${link.icon}"></i><span>${link.label}</span></a>`).join('')}
                    </div>
                </div>
            </div>
            <div style="margin-top: 20px; text-align: right;">
                <a href="#contact" class="btn btn-primary modal-contact-btn">Get In Touch →</a>
            </div>
        `;

        modal.classList.add("active");
        modal.setAttribute("aria-hidden", "false");
        document.body.classList.add("modal-open");

        const contactBtn = modalBody.querySelector(".modal-contact-btn");
        if (contactBtn) contactBtn.addEventListener("click", closeModal);
    }

    function closeModal() {
        if (!modal) return;
        modal.classList.remove("active");
        modal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("modal-open");
    }

    document.querySelectorAll(".details-btn").forEach(btn => {
        btn.addEventListener("click", () => {
            const churchId = btn.getAttribute("data-church");
            openChurchModal(churchId);
        });
    });

    document.querySelectorAll(".church-card[data-church]").forEach(card => {
        card.addEventListener("click", event => {
            if (event.target.closest("button")) return;
            openChurchModal(card.getAttribute("data-church"));
        });
    });

    function bindPastorCards() {
        modalBody.querySelectorAll(".pastor-details-btn").forEach(btn => {
            btn.addEventListener("click", event => {
                event.stopPropagation();
                openPastorModal(btn.getAttribute("data-pastor"));
            });
        });

        modalBody.querySelectorAll(".pastor-card[data-pastor]").forEach(card => {
        card.addEventListener("click", event => {
            if (event.target.closest("button")) return;
            openPastorModal(card.getAttribute("data-pastor"));
        });
        card.addEventListener("keydown", event => {
            if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                openPastorModal(card.getAttribute("data-pastor"));
            }
        });
        });
    }

    if (modalClose) modalClose.addEventListener("click", closeModal);
    if (modal) {
        modal.addEventListener("click", e => {
            if (e.target === modal) closeModal();
        });
    }

    document.addEventListener("keydown", event => {
        if (event.key === "Escape" && modal?.classList.contains("active")) {
            closeModal();
        }
    });

    /* -----------------------------------------------------
       9. GALLERY FILTERS & LIGHTBOX
       ----------------------------------------------------- */
    const filterButtons = document.querySelectorAll(".filter-btn");
    const galleryItems = document.querySelectorAll(".gallery-item");

    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const filter = btn.getAttribute("data-filter");

            galleryItems.forEach(item => {
                if (filter === "all" || item.getAttribute("data-category") === filter) {
                    item.classList.remove("hidden");
                } else {
                    item.classList.add("hidden");
                }
            });
        });
    });

    const lightbox = document.getElementById("lightbox");
    const lightboxImg = document.getElementById("lightboxImg");
    const lightboxClose = document.querySelector(".lightbox-close");

    function openLightbox(image) {
        if (!image || !lightbox || !lightboxImg) return;
        lightboxImg.src = image.src;
        lightboxImg.alt = image.alt;
        lightbox.classList.add("active");
        lightbox.setAttribute("aria-hidden", "false");
    }

    galleryItems.forEach(item => {
        item.addEventListener("click", () => {
            const img = item.querySelector("img");
            openLightbox(img);
        });
    });

    function bindMinistryCards() {
        modalBody?.querySelectorAll(".ministry-focus-card").forEach(card => {
            const openCardImage = event => {
                const clickedImage = event?.target?.closest("img");
                openLightbox(clickedImage || card.querySelector("img"));
            };
            card.addEventListener("click", openCardImage);
            card.addEventListener("keydown", event => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    openCardImage(event);
                }
            });
        });
    }

    if (lightboxClose) {
        lightboxClose.addEventListener("click", () => {
            lightbox.classList.remove("active");
            lightbox.setAttribute("aria-hidden", "true");
        });
    }

    if (lightbox) {
        lightbox.addEventListener("click", e => {
            if (e.target === lightbox) {
                lightbox.classList.remove("active");
                lightbox.setAttribute("aria-hidden", "true");
            }
        });
    }

    /* -----------------------------------------------------
       10. CLICK-TO-PLAY OUTREACH VIDEO
       ----------------------------------------------------- */
    const outreachVideo = document.getElementById("communityVideo");
    const videoToggle = document.querySelector("[data-video-toggle]");

    if (outreachVideo && videoToggle) {
        const videoButton = videoToggle.querySelector(".video-overlay-btn");

        const toggleVideoPlayback = async () => {
            if (outreachVideo.paused) {
                try {
                    outreachVideo.muted = false;
                    await outreachVideo.play();
                    videoToggle.classList.add("is-playing");
                    if (videoButton) {
                        videoButton.setAttribute("aria-label", "Pause outreach video");
                    }
                } catch (error) {
                    console.log("Video playback failed:", error);
                }
            } else {
                outreachVideo.pause();
                videoToggle.classList.remove("is-playing");
                if (videoButton) {
                    videoButton.setAttribute("aria-label", "Play outreach video");
                }
            }
        };

        videoToggle.addEventListener("click", toggleVideoPlayback);
        outreachVideo.addEventListener("ended", () => {
            videoToggle.classList.remove("is-playing");
        });
    }

    /* -----------------------------------------------------
       12. DYNAMIC FOOTER YEAR
       ----------------------------------------------------- */
    document.querySelectorAll(".current-year").forEach(el => {
        el.textContent = new Date().getFullYear();
    });

    /* -----------------------------------------------------
       13. BACK TO TOP BUTTON
       ----------------------------------------------------- */
    const backToTop = document.querySelector(".back-to-top");
    if (backToTop) {
        window.addEventListener("scroll", () => {
            if (window.scrollY > 600) {
                backToTop.classList.add("show");
            } else {
                backToTop.classList.remove("show");
            }
        });

        backToTop.addEventListener("click", () => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        });
    }

    /* -----------------------------------------------------
       CONTACT FORM — FORMSUBMIT AJAX / GMAIL DELIVERY
       ----------------------------------------------------- */
    const contactForm = document.getElementById("contactForm");
    const formStatus = document.getElementById("formStatus");
    const submitBtn = document.getElementById("submitBtn");
    const submitText = document.getElementById("submitText");
    const submitIcon = document.getElementById("submitIcon");

    if (contactForm && formStatus && submitBtn && submitText && submitIcon) {
        contactForm.addEventListener("submit", async event => {
            event.preventDefault();

            submitBtn.disabled = true;
            submitText.textContent = "Sending...";
            submitIcon.className = "fas fa-spinner fa-spin";
            formStatus.hidden = true;
            formStatus.className = "form-status-message";

            try {
                const response = await fetch(contactForm.action, {
                    method: "POST",
                    headers: { "Accept": "application/json" },
                    body: new FormData(contactForm)
                });
                const result = await response.json();

                if (!response.ok || !result.success) {
                    throw new Error(result.message || "Unable to send message.");
                }

                formStatus.hidden = false;
                formStatus.className = "form-status-message status-success";
                formStatus.innerHTML = `
                    <i class="fas fa-circle-check"></i>
                    <strong>Submission accepted</strong><br>
                    Thank you for contacting Faithful Labourers. FormSubmit accepted your message; this does not confirm delivery to the Gmail inbox.
                `;
                contactForm.reset();
                submitText.textContent = "Message Sent";
                submitIcon.className = "fas fa-check";
            } catch (error) {
                console.error("Form submission error:", error);
                formStatus.hidden = false;
                formStatus.className = "form-status-message status-error";
                formStatus.innerHTML = `
                    <i class="fas fa-circle-exclamation"></i>
                    <strong>Message Not Sent</strong><br>
                    Please check your internet connection and try again.
                `;
                submitText.textContent = "Try Again";
                submitIcon.className = "fas fa-rotate-right";
            } finally {
                window.setTimeout(() => {
                    submitBtn.disabled = false;
                    if (submitText.textContent === "Sending...") {
                        submitText.textContent = "Send Message";
                    }
                }, 2500);
            }
        });
    }

    /* -----------------------------------------------------
       14. IMAGE FALLBACK HANDLER
       ----------------------------------------------------- */
    document.querySelectorAll("img").forEach(img => {
        img.addEventListener("error", () => {
            img.style.background = "linear-gradient(135deg, #0d1b2f, #07111f)";
            img.style.minHeight = "200px";
            img.alt = "Faithful Labourers";
        });
    });
});