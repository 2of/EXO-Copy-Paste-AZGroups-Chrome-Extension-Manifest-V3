
function createCopyButton(textToCopy) {
    const btn = document.createElement("button");
    btn.innerText = "Copy";
    btn.className = "exo-copy-btn";

    btn.onclick = (e) => {
        e.stopPropagation();
        navigator.clipboard.writeText(textToCopy)
            .then(() => console.log(`Copied: ${textToCopy}`))
            .catch(err => console.error("Copy failed", err));
    };

    return btn;
}


const observer = new MutationObserver(() => {
    try {
        const nodes = document.querySelectorAll("[data-automation-key='delegates'], .ms-DetailsRow-cell");

        nodes.forEach(node => {
            if (node.classList.contains("exo-copy-injected")) return;

            const text = node.innerText?.trim();
            if (!text) return;

            const btn = createCopyButton(text);

            node.appendChild(btn);
            node.classList.add("exo-copy-injected");
        });
    } catch (err) {
        console.error("Observer error:", err);
    }
});


observer.observe(document.body, { childList: true, subtree: true });


console.log("EXO Delegate Copier loaded.");
