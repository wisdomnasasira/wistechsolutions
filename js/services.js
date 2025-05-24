document.addEventListener("DOMContentLoaded", () => {
    console.log("Services page scripts loaded!");

    const serviceItems = document.querySelectorAll(".service-item");
    const serviceModal = document.getElementById("serviceModal");
    const closeButton = document.querySelector(".close-button");
    const modalTitle = document.getElementById("modalTitle");
    const modalDescription = document.getElementById("modalDescription");
    const modalImage = document.getElementById("modalImage");
    const modalContactBtn = document.getElementById("modalContactBtn");

    const serviceDetails = {
        "hardware": {
            title: "Computer Hardware Sales",
            description: "We offer a wide range of high-quality computer hardware components, including CPUs, GPUs, RAM, storage devices, motherboards, and peripherals from leading brands. Our team can help you select the right parts for your needs, whether for gaming, professional work, or everyday use. We also provide assembly and compatibility checks.",
            image: "images/1.jpg"
        },
        "software-install": {
            title: "Software Installations",
            description: "Our experts provide seamless installation services for operating systems (Windows, macOS, Linux), productivity suites (Microsoft Office, Adobe Creative Suite), antivirus software, and specialized applications. We ensure proper configuration and compatibility, so your software runs smoothly and efficiently from day one.",
            image: "images/2.jpeg"
        },
        "software-dev": {
            title: "Custom Software Development",
            description: "Unlock your business's full potential with our custom software development services. We design and build innovative, scalable, and secure software solutions tailored to your unique requirements, including web applications, mobile apps, enterprise systems, and database solutions.",
            image: "images/4.jpeg"
        },
        "online-services": {
            title: "Online IT Services",
            description: "Navigate complex administrative tasks with ease through our comprehensive online IT services. We assist with Business Registration, URA (Uganda Revenue Authority) services for tax compliance, URSB (Uganda Registration Services Bureau) services for company and intellectual property registration, and other essential online government processes.",
            image: "images/5.jpeg"
        },
        "network-solutions": {
            title: "Networking Solutions",
            description: "From setting up secure Wi-Fi networks in your home to designing robust enterprise-grade network infrastructures, we provide complete networking solutions. This includes cabling, router configuration, firewall setup, VPN implementation, and ongoing network monitoring and maintenance for optimal performance and security.",
            image: "images/network.jpg"
        },
        "data-recovery": {
            title: "Data Recovery Services",
            description: "Accidentally deleted files? Hard drive crashed? Our data recovery specialists can help retrieve lost or corrupted data from various storage devices, including hard drives, SSDs, USB drives, and memory cards. We use advanced techniques to maximize recovery rates and protect your sensitive information.",
            image: "images/data.jpg"
        }
    };


    serviceItems.forEach(item => {
        // Hover effect
        item.addEventListener("mouseenter", () => {
            item.style.transform = "scale(1.03)";
            item.style.boxShadow = "0 8px 15px rgba(0, 0, 0, 0.2)";
        });
        item.addEventListener("mouseleave", () => {
            item.style.transform = "scale(1)";
            item.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
        });

        // Click to open modal
        item.querySelector('.details-btn').addEventListener("click", () => {
            const serviceId = item.dataset.serviceId;
            const details = serviceDetails[serviceId];

            if (details) {
                modalTitle.textContent = details.title;
                modalDescription.textContent = details.description;
                modalImage.src = details.image;
                modalImage.alt = details.title;

                serviceModal.classList.add('active'); // Show modal
            }
        });
    });

    // Close modal when close button is clicked
    closeButton.addEventListener("click", () => {
        serviceModal.classList.remove('active');
    });

    // Close modal when clicking outside of the modal content
    window.addEventListener("click", (event) => {
        if (event.target == serviceModal) {
            serviceModal.classList.remove('active');
        }
    });

    // Redirect to contact page from modal's contact button
    modalContactBtn.addEventListener('click', () => {
        serviceModal.classList.remove('active');
        window.location.href = 'contact.html'; // Or you can dynamically link to contact form with pre-filled subject
    });
});