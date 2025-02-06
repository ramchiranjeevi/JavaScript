class WDVideo extends HTMLElement {
    constructor() {
        super();
        
        const template = document.createElement('template');
        template.innerHTML = `
            <video controls width="250">
            </video>
        `;
        
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.appendChild(template.content.cloneNode(true));
    }

    static get observedAttributes() {
        return ['webm-src', 'mp4-src', 'width'];
    }

    connectedCallback() {
        this.updateVideoSources();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            this.updateVideoSources();
        }
    }

    updateVideoSources() {
        const video = this.shadowRoot.querySelector('video');
        video.innerHTML = ''; // Clear existing sources
        
        const webmSrc = this.getAttribute('webm-src');
        const mp4Src = this.getAttribute('mp4-src');
        const width = this.getAttribute('width') || '250';
        
        video.setAttribute('width', width);

        if (webmSrc) {
            const webmSource = document.createElement('source');
            webmSource.src = webmSrc;
            webmSource.type = 'video/webm';
            video.appendChild(webmSource);
        }

        if (mp4Src) {
            const mp4Source = document.createElement('source');
            mp4Source.src = mp4Src;
            mp4Source.type = 'video/mp4';
            video.appendChild(mp4Source);
        }

        // Add fallback content
        if (webmSrc || mp4Src) {
            video.innerHTML += `
                Download the video:
                ${webmSrc ? `<a href="${webmSrc}">WEBM</a>` : ''}
                ${webmSrc && mp4Src ? 'or' : ''}
                ${mp4Src ? `<a href="${mp4Src}">MP4</a>` : ''}
            `;
        }
    }
}

// Register the custom element
customElements.define('wd-video', WDVideo); 