// Get the updates array from the global scope
const updates = window.updates || [];

function createUpdateElement(update, isLatest = false) {
    const updateElement = document.createElement('div');
    updateElement.className = `update-version ${isLatest ? 'active' : ''}`;
    
    // Create version header
    const header = document.createElement('div');
    header.className = 'version-header';
    
    const title = document.createElement('div');
    title.className = 'version-title';
    title.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
            <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
        </svg>
        الإصدار ${update.version}
    `;
    
    const date = document.createElement('div');
    date.className = 'version-date';
    date.textContent = update.date;
    
    header.appendChild(title);
    header.appendChild(date);
    
    // Create version content
    const content = document.createElement('div');
    content.className = 'version-content';
    
    // Add features section if exists
    if (update.features) {
        const featuresSection = createSection('الميزات الجديدة', update.features);
        content.appendChild(featuresSection);
    }
    
    // Add fixes section if exists
    if (update.fixes) {
        const fixesSection = createSection('إصلاحات الأخطاء', update.fixes);
        content.appendChild(fixesSection);
    }
    
    // Add config changes section if exists
    if (update.configChanges) {
        const configSection = createConfigSection(update.configChanges);
        content.appendChild(configSection);
    }
    
    // Add changes section if exists (for older versions)
    if (update.changes) {
        const changesSection = createSection('التغييرات', update.changes);
        content.appendChild(changesSection);
    }
    
    updateElement.appendChild(header);
    updateElement.appendChild(content);
    
    return updateElement;
}

function createSection(title, items) {
    const section = document.createElement('div');
    section.className = 'update-section';
    
    const sectionTitle = document.createElement('div');
    sectionTitle.className = 'section-title';
    sectionTitle.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
            <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2zm15 0a1 1 0 0 0-1-1H2a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V2z"/>
        </svg>
        ${title}
    `;
    
    const list = document.createElement('ul');
    items.forEach(item => {
        const li = document.createElement('li');
        li.textContent = item;
        list.appendChild(li);
    });
    
    section.appendChild(sectionTitle);
    section.appendChild(list);
    
    return section;
}

function createConfigSection(config) {
    const section = document.createElement('div');
    section.className = 'update-section';
    
    const sectionTitle = document.createElement('div');
    sectionTitle.className = 'section-title';
    sectionTitle.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M4.5 6a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1ZM6 6a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1Zm2-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0Z"/>
            <path d="M12 1a2 2 0 0 1 2 2 2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h3.546a2 2 0 0 1 1.892 1.35L7.99 1h4.01ZM2 2a1 1 0 0 0-1 1v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1h-3.535a1 1 0 0 1-.945-.674l-.63-1.89A1 1 0 0 0 8.535 1H2a1 1 0 0 0 0 0Z"/>
        </svg>
        تغييرات الإعدادات
    `;
    
    const configChanges = document.createElement('div');
    configChanges.className = 'config-changes';
    
    const title = document.createElement('h4');
    title.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
            <path d="M7.002 11a1 1 0 1 1 2 0 1 1 0 0 1-2 0zM7.1 4.995a.905.905 0 1 1 1.8 0l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 4.995z"/>
        </svg>
        ${config.title}
    `;
    
    const description = document.createElement('p');
    description.textContent = config.description;
    
    const codeBlock = document.createElement('div');
    codeBlock.className = 'code-block';
    
    const copyButton = document.createElement('button');
    copyButton.className = 'copy-button';
    copyButton.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
            <path d="M4 1.5H3a2 2 0 0 0-2 2V14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V3.5a2 2 0 0 0-2-2h-1v1h1a1 1 0 0 1 1 1V14a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.5a1 1 0 0 1 1-1h1v-1z"/>
            <path d="M9.5 1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5v-1a.5.5 0 0 1 .5-.5h3zm-3-1A1.5 1.5 0 0 0 5 1.5v1A1.5 1.5 0 0 0 6.5 4h3A1.5 1.5 0 0 0 11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3z"/>
        </svg>
        نسخ
    `;
    
    const pre = document.createElement('pre');
    pre.className = 'language-lua';
    const code = document.createElement('code');
    code.className = 'language-lua';
    code.textContent = config.code;
    pre.appendChild(code);
    
    codeBlock.appendChild(copyButton);
    codeBlock.appendChild(pre);
    
    configChanges.appendChild(title);
    configChanges.appendChild(description);
    configChanges.appendChild(codeBlock);
    
    section.appendChild(sectionTitle);
    section.appendChild(configChanges);
    
    return section;
}

function renderUpdates() {
    const updateList = document.querySelector('.update-list');
    if (!updateList) return;
    
    // Clear existing content
    updateList.innerHTML = '';
    
    // Render updates
    updates.forEach((update, index) => {
        const updateElement = createUpdateElement(update, index === 0);
        updateList.appendChild(updateElement);
    });
    
    // Update last updated date
    const lastUpdated = document.querySelector('.last-updated');
    if (lastUpdated) {
        lastUpdated.textContent = `آخر تحديث: ${updates[0].date}`;
    }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    renderUpdates();
    
    // Add toggle functionality
    const versionHeaders = document.querySelectorAll('.version-header');
    versionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const parent = this.parentElement;
            parent.classList.toggle('active');
        });
    });
    
    // Add copy button functionality
    const copyButtons = document.querySelectorAll('.copy-button');
    copyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const codeBlock = this.nextElementSibling;
            const codeText = codeBlock.textContent.trim();
            
            navigator.clipboard.writeText(codeText).then(() => {
                const originalText = this.innerHTML;
                this.classList.add('copied');
                this.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16"><path d="M10.97 4.97a.75.75 0 0 1 1.07 1.05l-3.99 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.267.267 0 0 1 .02-.022z"></path></svg> تم النسخ';
                
                setTimeout(() => {
                    this.innerHTML = originalText;
                    this.classList.remove('copied');
                }, 2000);
            }).catch(err => {
                console.error('Failed to copy: ', err);
            });
        });
    });
}); 