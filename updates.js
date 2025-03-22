const updates = window.updates || [];

function createUpdateElement(update, isLatest = false) {
    const updateElement = document.createElement('div');
    updateElement.className = `update-version ${isLatest ? 'active' : ''}`;
    

    const header = document.createElement('div');
    header.className = 'version-header';
    
    const title = document.createElement('div');
    title.className = 'version-title';
    title.innerHTML = `
        <i class="fa-solid fa-gear fa-icon"></i>
        تحديث ${update.version}
    `;
    
    const date = document.createElement('div');
    date.className = 'version-date';
    date.textContent = update.date;
    

    const toggleIcon = document.createElement('i');
    toggleIcon.className = `fa-solid ${isLatest ? 'fa-chevron-up' : 'fa-chevron-down'} fa-icon toggle-icon`;
    
    header.appendChild(title);
    header.appendChild(date);
    header.appendChild(toggleIcon);
    

    const content = document.createElement('div');
    content.className = 'version-content';
    

    if (update.features) {
        const featuresSection = createSection('الميزات الجديدة', update.features);
        content.appendChild(featuresSection);
    }
    

    if (update.fixes) {
        const fixesSection = createSection('إصلاحات الأخطاء', update.fixes);
        content.appendChild(fixesSection);
    }
    

    if (update.configChanges) {
        const configSection = createConfigSection(update.configChanges);
        content.appendChild(configSection);
    }
    

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
    

    let icon = 'fa-list'; 
    if (title === 'الميزات الجديدة') {
        icon = 'fa-circle-plus';
    } else if (title === 'إصلاحات الأخطاء') {
        icon = 'fa-hammer';
    }
    
    sectionTitle.innerHTML = `
        <i class="fa-solid ${icon} fa-icon"></i>
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
    if (!config) return '';

    const section = document.createElement('div');
    section.className = 'update-section';

    const title = document.createElement('div');
    title.className = 'section-title';
    title.innerHTML = `
        <i class="fa-solid fa-code fa-icon"></i>
        ${config.title}
    `;

    const description = document.createElement('p');
    description.className = 'config-changes';
    description.textContent = config.description;

    section.appendChild(title);
    section.appendChild(description);

    if (config.files && Array.isArray(config.files)) {
        config.files.forEach(file => {
            const fileSection = document.createElement('div');
            fileSection.className = 'config-file';

            const filePath = document.createElement('h4');
            filePath.innerHTML = `
                <i class="fa-solid fa-file-code fa-icon"></i>
                ${file.path}
            `;

            const codeBlock = document.createElement('div');
            codeBlock.className = 'code-block';

            const copyButton = document.createElement('button');
            copyButton.className = 'copy-button';
            copyButton.innerHTML = `
                <i class="fa-regular fa-copy fa-icon"></i>
                نسخ
            `;

            const pre = document.createElement('pre');
            const code = document.createElement('code');
            code.className = 'language-lua';
            
            // If there's new code, replace the placeholder with the new code
            if (file.newCode) {
                const oldCode = file.code;
                const newCode = file.newCode;
                
                // Replace the placeholder with the new code
                const fullCode = oldCode.replace('--[[NEW_CODE]]', newCode);
                code.textContent = fullCode;
                
                // Find the line number where the placeholder was
                const oldLines = oldCode.split('\n');
                const placeholderLine = oldLines.findIndex(line => line.includes('--[[NEW_CODE]]')) + 1;
                const newCodeLines = newCode.split('\n').length;
                
                // Add line-highlight attribute to the pre element
                pre.setAttribute('data-line', `${placeholderLine}-${placeholderLine + newCodeLines - 1}`);
                pre.setAttribute('data-line-offset', '0');
            } else {
                code.textContent = file.code;
            }

            pre.appendChild(code);
            codeBlock.appendChild(copyButton);
            codeBlock.appendChild(pre);

            fileSection.appendChild(filePath);
            fileSection.appendChild(codeBlock);
            section.appendChild(fileSection);
        });
    }

    return section;
}

function renderUpdates() {
    const updateList = document.querySelector('.update-list');
    if (!updateList) return;
    

    updateList.innerHTML = '';
    

    updates.forEach((update, index) => {
        const updateElement = createUpdateElement(update, index === 0);
        updateList.appendChild(updateElement);
    });
    

    const lastUpdated = document.querySelector('.last-updated');
    if (lastUpdated) {
        lastUpdated.textContent = `آخر تحديث: ${updates[0].date}`;
    }
}


document.addEventListener('DOMContentLoaded', function() {
    renderUpdates();
    

    const versionHeaders = document.querySelectorAll('.version-header');
    versionHeaders.forEach(header => {
        header.addEventListener('click', function() {
            const parent = this.parentElement;
            const toggleIcon = this.querySelector('.toggle-icon');
            
            parent.classList.toggle('active');
            
            if (parent.classList.contains('active')) {
                toggleIcon.classList.remove('fa-chevron-down');
                toggleIcon.classList.add('fa-chevron-up');
            } else {
                toggleIcon.classList.remove('fa-chevron-up');
                toggleIcon.classList.add('fa-chevron-down');
            }
        });
    });
    
    
    const copyButtons = document.querySelectorAll('.copy-button');
    copyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            
            const codeBlock = this.nextElementSibling;
            const codeElement = codeBlock.querySelector('code');
            const fullCode = codeElement.textContent;
            
            // Check if this code block has new code (has data-line attribute)
            const pre = codeBlock.querySelector('pre');
            if (pre && pre.hasAttribute('data-line')) {
                const [startLine, endLine] = pre.getAttribute('data-line').split('-').map(Number);
                const lines = fullCode.split('\n');
                const newCode = lines.slice(startLine - 1, endLine).join('\n');
                
                navigator.clipboard.writeText(newCode).then(() => {
                    const originalText = this.innerHTML;
                    this.classList.add('copied');
                    this.innerHTML = '<i class="fa-solid fa-check fa-icon"></i> تم النسخ';
                    
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.classList.remove('copied');
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                });
            } else {
                // If no new code, copy the whole code
                navigator.clipboard.writeText(fullCode).then(() => {
                    const originalText = this.innerHTML;
                    this.classList.add('copied');
                    this.innerHTML = '<i class="fa-solid fa-check fa-icon"></i> تم النسخ';
                    
                    setTimeout(() => {
                        this.innerHTML = originalText;
                        this.classList.remove('copied');
                    }, 2000);
                }).catch(err => {
                    console.error('Failed to copy: ', err);
                });
            }
        });
    });

    Prism.highlightAll(); 
}); 