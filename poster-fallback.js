// LOVEFLIX - fallback visual para quando uma imagem local não foi publicada no Vercel.
function textoSeguroPoster(valor) {
    return String(valor || "LOVEFLIX")
        .replace(/&/g, "&amp;").replace(/</g, "&lt;")
        .replace(/>/g, "&gt;").replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

export function configurarFallbacksDeImagem(escopo = document) {
    escopo.querySelectorAll("img").forEach((img) => {
        if (img.dataset.fallbackPreparado === "sim") return;
        img.dataset.fallbackPreparado = "sim";
        img.addEventListener("error", () => {
            if (img.dataset.fallbackAplicado === "sim") return;
            img.dataset.fallbackAplicado = "sim";
            const titulo = textoSeguroPoster(img.alt || "LOVEFLIX");
            const partes = titulo.length > 25
                ? `<tspan x="38" dy="0">${titulo.slice(0,25)}</tspan><tspan x="38" dy="43">${titulo.slice(25,50)}</tspan>`
                : titulo;
            const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="900" viewBox="0 0 600 900"><defs><linearGradient id="f" x1="0" y1="0" x2="1" y2="1"><stop stop-color="#321018"/><stop offset=".55" stop-color="#141414"/><stop offset="1" stop-color="#7b1019"/></linearGradient><radialGradient id="l"><stop stop-color="#e50914" stop-opacity=".5"/><stop offset="1" stop-color="#e50914" stop-opacity="0"/></radialGradient></defs><rect width="600" height="900" fill="url(#f)"/><circle cx="430" cy="240" r="330" fill="url(#l)"/><path d="M0 670L600 420V900H0Z" fill="#050505" opacity=".48"/><text x="38" y="90" fill="#e50914" font-family="Arial,sans-serif" font-size="28" font-weight="700" letter-spacing="5">LOVEFLIX</text><path d="M38 112H150" stroke="#e50914" stroke-width="4"/><text x="38" y="690" fill="#fff" font-family="Arial,sans-serif" font-size="34" font-weight="700">${partes}</text><text x="38" y="830" fill="#d0d0d0" font-family="Arial,sans-serif" font-size="17" letter-spacing="4">FILMES • SÉRIES</text></svg>`;
            img.src = "data:image/svg+xml;charset=UTF-8," + encodeURIComponent(svg);
            img.classList.add("imagemIndisponivel");
        }, { once: true });
        if (img.complete && img.naturalWidth === 0 && img.getAttribute("src")) {
            img.dispatchEvent(new Event("error"));
        }
    });
}
