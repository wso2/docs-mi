(function () {
    'use strict';

    const Icons = {
        Copy: `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M0 6.75C0 5.784.784 5 1.75 5h1.5a.75.75 0 010 1.5h-1.5a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-1.5a.75.75 0 011.5 0v1.5A1.75 1.75 0 019.25 16h-7.5A1.75 1.75 0 010 14.25v-7.5z" /><path d="M5 1.75C5 .784 5.784 0 6.75 0h7.5C15.216 0 16 .784 16 1.75v7.5A1.75 1.75 0 0114.25 11h-7.5A1.75 1.75 0 015 9.25v-7.5zm1.75-.25a.25.25 0 00-.25.25v7.5c0 .138.112.25.25.25h7.5a.25.25 0 00.25-.25v-7.5a.25.25 0 00-.25-.25h-7.5z" /></svg>`,
        Markdown: `<svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true"><path d="M14.85 3c.63 0 1.15.52 1.14 1.15v7.7c0 .63-.51 1.15-1.15 1.15H1.15C.52 13 0 12.48 0 11.84V4.15C0 3.52.52 3 1.15 3h13.7zM9 11V5H7l-1.5 2.25L4 5H2v6h2V8l1.5 2L7 8v3h2zm2.99.5L14.5 8H13V5h-2v3H9.5l2.49 3.5z" /></svg>`,
        Chevron: `<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true" class="copy-page-chevron-icon"><path d="M2.22 4.47a.75.75 0 011.06 0L6 7.19l2.72-2.72a.75.75 0 111.06 1.06l-3.25 3.25a.75.75 0 01-1.06 0L2.22 5.53a.75.75 0 010-1.06z" /></svg>`,
        External: `<svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor" aria-hidden="true" class="copy-page-external-icon"><path d="M3.5 3a.5.5 0 00-.5.5v5a.5.5 0 00.5.5h5a.5.5 0 00.5-.5V6.5a.5.5 0 011 0v2A1.5 1.5 0 018.5 10h-5A1.5 1.5 0 012 8.5v-5A1.5 1.5 0 013.5 2h2a.5.5 0 010 1h-2z" /><path d="M7 1.5a.5.5 0 01.5-.5h3a.5.5 0 01.5.5v3a.5.5 0 01-1 0V2.707L6.354 6.354a.5.5 0 11-.708-.708L9.293 2H7.5a.5.5 0 01-.5-.5z" /></svg>`,
        ChatGPT: `<svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.676l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.896zm16.597 3.855l-5.833-3.387L15.119 7.2a.076.076 0 0 1 .071 0l4.83 2.791a4.494 4.494 0 0 1-.676 8.105v-5.678a.79.79 0 0 0-.407-.667zm2.01-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08-4.778 2.758a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z" /></svg>`,
        Claude: `<svg width="16" height="16" viewBox="0 0 256 257" fill="currentColor" aria-hidden="true"><path d="m50.228 170.321 50.357-28.257.843-2.463-.843-1.361h-2.462l-8.426-.518-28.775-.778-24.952-1.037-24.175-1.296-6.092-1.297L0 125.796l.583-3.759 5.12-3.434 7.324.648 16.202 1.101 24.304 1.685 17.629 1.037 26.118 2.722h4.148l.583-1.685-1.426-1.037-1.101-1.037-25.147-17.045-27.22-18.017-14.258-10.37-7.713-5.25-3.888-4.925-1.685-10.758 7-7.713 9.397.649 2.398.648 9.527 7.323 20.35 15.75L94.817 91.9l3.889 3.24 1.555-1.102.195-.777-1.75-2.917-14.453-26.118-15.425-26.572-6.87-11.018-1.814-6.61c-.648-2.723-1.102-4.991-1.102-7.778l7.972-10.823L71.42 0 82.05 1.426l4.472 3.888 6.61 15.101 10.694 23.786 16.591 32.34 4.861 9.592 2.592 8.879.973 2.722h1.685v-1.556l1.36-18.211 2.528-22.36 2.463-28.776.843-8.1 4.018-9.722 7.971-5.25 6.222 2.981 5.12 7.324-.713 4.73-3.046 19.768-5.962 30.98-3.889 20.739h2.268l2.593-2.593 10.499-13.934 17.628-22.036 7.778-8.749 9.073-9.657 5.833-4.601h11.018l8.1 12.055-3.628 12.443-11.342 14.388-9.398 12.184-13.48 18.147-8.426 14.518.778 1.166 2.01-.194 30.46-6.481 16.462-2.982 19.637-3.37 8.88 4.148.971 4.213-3.5 8.62-20.998 5.184-24.628 4.926-36.682 8.685-.454.324.519.648 16.526 1.555 7.065.389h17.304l32.21 2.398 8.426 5.574 5.055 6.805-.843 5.184-12.962 6.611-17.498-4.148-40.83-9.721-14-3.5h-1.944v1.167l11.666 11.406 21.387 19.314 26.767 24.887 1.36 6.157-3.434 4.86-3.63-.518-23.526-17.693-9.073-7.972-20.545-17.304h-1.36v1.814l4.73 6.935 25.017 37.59 1.296 11.536-1.814 3.76-6.481 2.268-7.13-1.297-14.647-20.544-15.1-23.138-12.185-20.739-1.49.843-7.194 77.448-3.37 3.953-7.778 2.981-6.48-4.925-3.436-7.972 3.435-15.749 4.148-20.544 3.37-16.333 3.046-20.285 1.815-6.74-.13-.454-1.49.194-15.295 20.999-23.267 31.433-18.406 19.702-4.407 1.75-7.648-3.954.713-7.064 4.277-6.286 25.47-32.405 15.36-20.092 9.917-11.6-.065-1.686h-.583L44.07 198.125l-12.055 1.555-5.185-4.86.648-7.972 2.463-2.593 20.35-13.999-.064.065Z" /></svg>`,
        Perplexity: `<svg width="16" height="16" viewBox="0 0 34 38" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" clip-rule="evenodd" d="M5.12114 0.0400391L15.919 9.98864V9.98636V0.062995H18.0209V10.0332L28.8671 0.0400391V11.3829H33.3202V27.744H28.8808V37.8442L18.0209 28.303V37.9538H15.919V28.4604L5.13338 37.96V27.744H0.680176V11.3829H5.12114V0.0400391ZM14.3344 13.4592H2.78208V25.6677H5.13074V21.8167L14.3344 13.4592ZM7.23518 22.7379V33.3271L15.919 25.6786V14.8506L7.23518 22.7379ZM18.0814 25.5775V14.8404L26.7677 22.7282V27.744H26.7789V33.219L18.0814 25.5775ZM28.8808 25.6677H31.2183V13.4592H19.752L28.8808 21.7302V25.6677ZM26.7652 11.3829V4.81584L19.6374 11.3829H26.7652ZM14.3507 11.3829H7.22306V4.81584L14.3507 11.3829Z" /></svg>`
    };

    /**
     * Derives the logical Markdown URL from the current HTML URL.
     * First checks for a data-src-path attribute on the body element for the actual source path.
     * Falls back to reconstructing from the HTML URL if the attribute is missing.
     * Logic:
     * - /en/4.6.0/guides/foo/index.html -> /en/4.6.0/guides/foo.md
     * - /en/4.6.0/guides/bar.html -> /en/4.6.0/guides/bar.md
     */
    function getFlattenedMarkdownUrlFromHtmlUrl(htmlUrl) {
        // First, check if the page template provided the source path via data attribute
        const srcPath = document.body.getAttribute('data-src-path');
        if (srcPath) {
            // Normalize the path: ensure it has .md extension and proper slashes
            const u = new URL(htmlUrl);
            const normalizedPath = srcPath.startsWith('/') ? srcPath : '/' + srcPath;
            const mdPath = normalizedPath.endsWith('.md') ? normalizedPath : normalizedPath + '.md';
            u.pathname = mdPath;
            u.hash = ''; u.search = '';
            return u.href;
        }

        // Fallback: reconstruct from the HTML URL (lossy, but works when data attribute is missing)
        const u = new URL(htmlUrl);
        u.hash = ''; u.search = '';

        // Strip trailing slash, index.html AND .html extension
        let pathname = u.pathname
            .replace(/\/$/, '')
            .replace(/\/index\.html$/, '')
            .replace(/\.html$/, '');

        const segments = pathname.split('/').filter(Boolean);
        const last = segments[segments.length - 1];

        const isVersion = /^\d+\.\d+\.\d+$/.test(last);
        const isLangOrVersion = isVersion || ['en', 'next', 'latest'].includes(last);

        if (pathname === '' || pathname === '/' || isLangOrVersion) {
            u.pathname = (pathname || '') + '/index.md';
        } else {
            u.pathname = pathname + '.md';
        }

        return u.href;
    }

    async function fetchFlattenedMarkdownForCurrentPage() {
        const mdUrl = getFlattenedMarkdownUrlFromHtmlUrl(window.location.href);
        const res = await fetch(mdUrl, { cache: 'no-cache' });
        if (!res.ok) throw new Error("Fetch failed");
        const html = await res.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(html, 'text/html');
        return doc.body.textContent;
    }

    function createCopyPageButton() {
        const container = document.createElement('div');
        container.className = 'copy-page-container';

        const button = document.createElement('button');
        button.className = 'copy-page-button md-content__button md-icon'; 
        button.setAttribute('aria-expanded', 'false');
        button.setAttribute('aria-haspopup', 'true');
        button.setAttribute('title', 'Copy page');
        button.innerHTML = Icons.Copy;

        const backdrop = document.createElement('div');
        backdrop.className = 'copy-page-backdrop';

        const menu = document.createElement('div');
        menu.className = 'copy-page-menu';
        menu.innerHTML = `
            <button class="copy-page-item cp-copy">
                ${Icons.Copy}
                <div class="copy-page-item-text">
                    <span class="copy-page-item-title">Copy page</span>
                    <span class="copy-page-item-desc">Copy as Markdown for LLMs</span>
                </div>
            </button>
            <button class="copy-page-item cp-view">
                ${Icons.Markdown}
                <div class="copy-page-item-text">
                    <span class="copy-page-item-title">View as Markdown</span>
                    <span class="copy-page-item-desc">View as plain text</span>
                </div>
            </button>
            <div class="copy-page-divider"></div>
            <button class="copy-page-item cp-chatgpt">
                ${Icons.ChatGPT}
                <div class="copy-page-item-text">
                    <span class="copy-page-item-title">Open in ChatGPT</span>
                    <span class="copy-page-item-desc">Ask questions about this page</span>
                </div>
                ${Icons.External}
            </button>
            <button class="copy-page-item cp-claude">
                ${Icons.Claude}
                <div class="copy-page-item-text">
                    <span class="copy-page-item-title">Open in Claude</span>
                    <span class="copy-page-item-desc">Ask questions about this page</span>
                </div>
                ${Icons.External}
            </button>
             <button class="copy-page-item cp-perplexity">
                ${Icons.Perplexity}
                <div class="copy-page-item-text">
                    <span class="copy-page-item-title">Open in Perplexity</span>
                    <span class="copy-page-item-desc">Ask questions about this page</span>
                </div>
                ${Icons.External}
            </button>
        `;

        container.appendChild(button); 
        container.appendChild(backdrop); 
        container.appendChild(menu);

        let isOpen = false;
        const setOpen = (open) => {
            isOpen = open; 
            button.setAttribute('aria-expanded', open.toString());
            if (open) { 
                menu.style.display = 'block'; 
                menu.classList.add('active'); 
                backdrop.classList.add('active'); 
            } else { 
                menu.classList.remove('active'); 
                menu.style.display = 'none'; 
                backdrop.classList.remove('active'); 
            }
        };

        const handleGlobalClick = (event) => {
            if (!isOpen) {
                if (button.contains(event.target)) {
                    setOpen(true);
                    event.stopPropagation();
                }
                return;
            }
            if (button.contains(event.target)) {
                setOpen(false);
                return;
            }
            if (menu.contains(event.target)) {
                return;
            }
            setOpen(false);
        };

        if (window.activeGlobalClickHandler) {
            document.removeEventListener('click', window.activeGlobalClickHandler);
        }
        window.activeGlobalClickHandler = handleGlobalClick;
        document.addEventListener('click', handleGlobalClick);

        const getPrompt = () => {
            const fullUrl = getFlattenedMarkdownUrlFromHtmlUrl(window.location.href);
            return `Could you read this document about WSO2 Micro Integrator ${fullUrl} so I can ask questions about it?`;
        };

        // Handlers
        menu.querySelector('.cp-copy').addEventListener('click', async () => {
            try {
                const markdown = await fetchFlattenedMarkdownForCurrentPage();
                await navigator.clipboard.writeText(markdown);

                // Show "Copied!" feedback on the button
                const copyButton = menu.querySelector('.cp-copy');
                const titleElement = copyButton.querySelector('.copy-page-item-title');
                const originalText = titleElement.textContent;
                titleElement.textContent = 'Copied!';

                // Also show in button title attribute
                const originalTitle = button.getAttribute('title');
                button.setAttribute('title', 'Copied!');

                // Revert after 2 seconds
                setTimeout(() => {
                    titleElement.textContent = originalText;
                    button.setAttribute('title', originalTitle);
                }, 2000);
            } catch (err) {
                console.error('Failed to copy:', err);
            }
            setOpen(false);
        });

        menu.querySelector('.cp-view').addEventListener('click', () => {
            const origin = window.location.origin;
            const pathname = window.location.pathname;

            let mdPath;
            if (pathname === '' || pathname === '/') {
                mdPath = '/index.md';
            } else {
                mdPath = pathname.replace(/\/$/, '') + '.md';
            }

            window.location.href = origin + mdPath;
            setOpen(false);
        });

        // ChatGPT and Perplexity still support query parameters
        const aiLinks = {
            '.cp-chatgpt': 'https://chat.openai.com/?q=',
            '.cp-perplexity': 'https://www.perplexity.ai/search?q='
        };

        Object.entries(aiLinks).forEach(([selector, url]) => {
            menu.querySelector(selector).addEventListener('click', () => {
                window.open(url + encodeURIComponent(getPrompt()), '_blank', 'noopener,noreferrer');
                setOpen(false);
            });
        });

        // Claude handler - copy content to clipboard, then open Claude
        menu.querySelector('.cp-claude').addEventListener('click', async () => {
            try {
                // Fetch and copy markdown content to clipboard
                const markdown = await fetchFlattenedMarkdownForCurrentPage();
                await navigator.clipboard.writeText(markdown);

                // Show feedback on the button
                const claudeButton = menu.querySelector('.cp-claude');
                const titleElement = claudeButton.querySelector('.copy-page-item-title');
                const originalText = titleElement.textContent;
                titleElement.textContent = 'Copied! Opening Claude...';

                // Open Claude in new tab (avoid /new which triggers bot detection)
                window.open('https://claude.ai', '_blank', 'noopener,noreferrer');

                // Revert button text after a moment
                setTimeout(() => {
                    titleElement.textContent = originalText;
                }, 1500);
            } catch (err) {
                console.error('Failed to copy or open Claude:', err);
            }
            setOpen(false);
        });

        return container;
    }

    function init() {
        if (document.querySelector('.copy-page-container')) return;

        // Don't show copy-page button on home page
        const pathname = window.location.pathname;

        // Segment-based home page detection
        const trimmed = pathname.replace(/^\/+|\/+$/g, '');
        const segments = trimmed ? trimmed.split('/') : [];

        // Root landing page (/) or no segments
        let isHomePage = pathname === '/' || segments.length === 0;

        // Single-segment top-level pages (e.g., /docs-mi/ or any single top-level folder)
        if (segments.length === 1) {
            // Could be a top-level folder like 'docs-mi' or a language like 'en'
            // For these, we skip the button
            isHomePage = true;
        }

        // Two-segment language/version landing pages (e.g., /en/latest/, /en/4.6.0/)
        if (segments.length === 2) {
            const lang = segments[0];
            const version = segments[1];
            const langWhitelist = ['en', 'next', 'latest'];
            const versionPattern = /^(\d+\.\d+\.\d+|latest|next)$/;

            if (langWhitelist.includes(lang) && versionPattern.test(version)) {
                isHomePage = true;
            }
        }

        if (isHomePage) {
            return;
        }

        const editButton = document.querySelector('.md-content__button.md-icon[href*="/edit/"]');
        const viewButton = document.querySelector('.md-content__button.md-icon[href*="/raw/"]') ||
            document.querySelector('.md-content__button.md-icon[href*="/blob/"]');

        let insertionPoint = viewButton || editButton;

        const btn = createCopyPageButton();

        if (insertionPoint) {
            if (insertionPoint.nextSibling) {
                insertionPoint.parentNode.insertBefore(btn, insertionPoint.nextSibling);
            } else {
                insertionPoint.parentNode.appendChild(btn);
            }
        } else {
            const contentInner = document.querySelector('.md-content__inner');
            if (contentInner) {
                contentInner.insertBefore(btn, contentInner.firstChild);
            }
        }
    }

    const observer = new MutationObserver(() => {
        if (document.querySelector('.md-content') && !document.querySelector('.copy-page-container')) {
            init();
        }
    });

    window.addEventListener('load', () => {
        init();
        observer.observe(document.body, { childList: true, subtree: true });
    });

})();
