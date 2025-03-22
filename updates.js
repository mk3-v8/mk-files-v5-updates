
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

    const configChanges = document.createElement('div');
    configChanges.className = 'config-changes';
    
    const description = document.createElement('p');
    description.textContent = config.description;
    configChanges.appendChild(description);


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
            code.textContent = file.code;
            pre.appendChild(code);

            codeBlock.appendChild(copyButton);
            codeBlock.appendChild(pre);

            fileSection.appendChild(filePath);
            fileSection.appendChild(codeBlock);
            configChanges.appendChild(fileSection);
        });
    }

    section.appendChild(title);
    section.appendChild(configChanges);
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
            const codeText = codeBlock.textContent.trim();
            
            navigator.clipboard.writeText(codeText).then(() => {
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
        });
    });

    Prism.highlightAll(); 
}); 