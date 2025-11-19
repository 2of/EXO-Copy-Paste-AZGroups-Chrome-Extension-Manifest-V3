function createCopyButton(textToCopy) {
    const btn = document.createElement("button");
    btn.innerText = "Copy";
    btn.className = "exo-copy-btn";
    btn.style.marginLeft = "6px";

    let resetTimeout = null;

    btn.onclick = (e) => {
        e.stopPropagation();

        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                btn.innerText = "Copied!";
                if (resetTimeout) clearTimeout(resetTimeout);
                resetTimeout = setTimeout(() => {
                    btn.innerText = "Copy";
                }, 1500);
            })
            .catch(err => console.error("Copy failed", err));
    };

    return btn;
}

const observer = new MutationObserver(() => {
    try {
        const tooltipHosts = document.querySelectorAll(`
            [data-automation-key="delegates"] .ms-Persona-primaryText .ms-TooltipHost,
            .ms-DetailsRow-cell .ms-Persona-primaryText .ms-TooltipHost
        `);

        tooltipHosts.forEach(host => {
            if (host.classList.contains("exo-copy-injected")) return;

            const hidden = host.querySelector("div[hidden]");
            if (!hidden) return;

            const fullText = hidden.innerText.trim();
            if (!fullText) return;

            const btn = createCopyButton(fullText);
            host.appendChild(btn);

            host.classList.add("exo-copy-injected");
        });

    } catch (err) {
        console.error("Observer error:", err);
    }
});

observer.observe(document.body, { childList: true, subtree: true });

console.log("EXO Delegate Copier has been loaded ");
