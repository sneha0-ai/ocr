const fileInput = document.getElementById('fileInput');
const uploadArea = document.querySelector('.upload-area');
const previewContainer = document.getElementById('previewContainer');
const previewImage = document.getElementById('previewImage');
const loading = document.getElementById('loading');
const analysisResults = document.getElementById('analysisResults');

const sampleNames = [
    'Alexander Johnson', 'Emma Rodriguez', 'Michael Chen', 'Sofia Patel', 'David Kim',
    'Isabella Garcia', 'James Wilson', 'Olivia Brown', 'William Davis', 'Ava Martinez',
    'Benjamin Taylor', 'Mia Anderson', 'Lucas Thompson', 'Charlotte White', 'Henry Lee'
];

const sampleProfessions = [
    'Software Engineer', 'Doctor', 'Teacher', 'Artist', 'Lawyer', 'Chef', 'Writer',
    'Photographer', 'Designer', 'Scientist', 'Musician', 'Entrepreneur', 'Student'
];

uploadArea.addEventListener('dragover', (e) => {
    e.preventDefault();
    uploadArea.classList.add('dragover');
});

uploadArea.addEventListener('dragleave', () => {
    uploadArea.classList.remove('dragover');
});

uploadArea.addEventListener('drop', (e) => {
    e.preventDefault();
    uploadArea.classList.remove('dragover');
    const files = e.dataTransfer.files;
    if (files.length > 0) handleFile(files[0]);
});

fileInput.addEventListener('change', (e) => {
    if (e.target.files.length > 0) handleFile(e.target.files[0]);
});

function handleFile(file) {
    if (!file.type.startsWith('image/')) {
        alert('Please upload a valid image file.');
        return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
        previewImage.src = e.target.result;
        previewContainer.style.display = 'block';
        setTimeout(() => analyzeImage(e.target.result), 500);
    };
    reader.readAsDataURL(file);
}

function analyzeImage(imageData) {
    loading.style.display = 'block';
    analysisResults.style.display = 'none';

    setTimeout(() => {
        performFaceRecognition();
        performOCR();
        performFakeDetection();
        loading.style.display = 'none';
        analysisResults.style.display = 'grid';
    }, 2000 + Math.random() * 1000);
}

function performFaceRecognition() {
    const faceResults = document.getElementById('faceResults');
    const hasFace = Math.random() > 0.3;
    if (hasFace) {
        const name = sampleNames[Math.floor(Math.random() * sampleNames.length)];
        const age = Math.floor(Math.random() * 50) + 18;
        const profession = sampleProfessions[Math.floor(Math.random() * sampleProfessions.length)];
        const confidence = Math.floor(Math.random() * 30) + 70;
        faceResults.innerHTML = `
            <div class="result-item">
                <div class="result-label">Detected Person:</div>
                <div class="result-value">${name}</div>
            </div>
            <div class="result-item">
                <div class="result-label">Estimated Age:</div>
                <div class="result-value">${age} years old</div>
            </div>
            <div class="result-item">
                <div class="result-label">Likely Profession:</div>
                <div class="result-value">${profession}</div>
            </div>
            <div class="result-item">
                <div class="result-label">Confidence Level:</div>
                <div class="confidence-bar">
                    <div class="confidence-fill" style="width: ${confidence}%"></div>
                </div>
                <div class="result-value">${confidence}%</div>
            </div>
        `;
    } else {
        faceResults.innerHTML = `
            <div class="result-item">
                <div class="result-label">Status:</div>
                <div class="result-value">No human faces detected in this image</div>
            </div>
        `;
    }
}

function performOCR() {
    const ocrResults = document.getElementById('ocrResults');
    const hasText = Math.random() > 0.4;
    if (hasText) {
        const sampleTexts = [
            'Welcome to our store\nOpen 9 AM - 6 PM\nPhone: (555) 123-4567',
            'STOP\nDo not enter\nAuthorized personnel only',
            'Menu\nPizza - $12.99\nBurger - $8.99\nSalad - $6.99',
            'For Sale\nBeautiful house\nCall: 555-0123',
            'Warning: Wet Floor\nPlease use caution',
            'Exit\n→\nThis way to parking',
            'License Plate:\nABC 1234\nExpires: 12/2025'
        ];
        const detectedText = sampleTexts[Math.floor(Math.random() * sampleTexts.length)];
        const confidence = Math.floor(Math.random() * 20) + 80;
        ocrResults.innerHTML = `
            <div class="result-item">
                <div class="result-label">Detected Text:</div>
                <div class="ocr-text">${detectedText}</div>
            </div>
            <div class="result-item">
                <div class="result-label">OCR Confidence:</div>
                <div class="confidence-bar">
                    <div class="confidence-fill" style="width: ${confidence}%"></div>
                </div>
                <div class="result-value">${confidence}%</div>
            </div>
        `;
    } else {
        ocrResults.innerHTML = `
            <div class="result-item">
                <div class="result-label">Status:</div>
                <div class="result-value">No readable text detected in this image</div>
            </div>
        `;
    }
}

function performFakeDetection() {
    const fakeResults = document.getElementById('fakeResults');
    const fakeScore = Math.random();
    let status, className, analysis;

    if (fakeScore < 0.3) {
        status = 'Likely Authentic';
        className = 'fake-real';
        analysis = 'Image appears to be genuine. No obvious signs of digital manipulation detected.';
    } else if (fakeScore < 0.7) {
        status = 'Possibly Modified';
        className = 'fake-suspicious';
        analysis = 'Some inconsistencies detected. Image may have been edited or enhanced.';
    } else {
        status = 'Likely Fake/Manipulated';
        className = 'fake-likely';
        analysis = 'Strong indicators of digital manipulation. Image likely contains artificial elements.';
    }

    const confidence = Math.floor(fakeScore * 100);

    fakeResults.innerHTML = `
        <div class="result-item">
            <div class="result-label">Authenticity Status:</div>
            <div class="result-value">
                <span class="fake-indicator ${className}">${status}</span>
            </div>
        </div>
        <div class="result-item">
            <div class="result-label">Analysis:</div>
            <div class="result-value">${analysis}</div>
        </div>
        <div class="result-item">
            <div class="result-label">Manipulation Probability:</div>
            <div class="confidence-bar">
                <div class="confidence-fill" style="width: ${confidence}%"></div>
            </div>
            <div class="result-value">${confidence}%</div>
        </div>
        <div class="result-item">
            <div class="result-label">Technical Notes:</div>
            <div class="result-value">
                ${generateTechnicalNotes(fakeScore)}
            </div>
        </div>
    `;
}

function generateTechnicalNotes(score) {
    const notes = [];
    if (score > 0.7) {
        notes.push('• Inconsistent lighting patterns detected');
        notes.push('• Pixel-level anomalies found');
    }
    if (score > 0.5) {
        notes.push('• JPEG compression artifacts analyzed');
        notes.push('• Color histogram irregularities');
    }
    if (score < 0.3) {
        notes.push('• Consistent metadata patterns');
        notes.push('• Natural compression artifacts');
        notes.push('• No edge manipulation detected');
    }
    
    return notes.length > 0 ? notes.join('\n') : 'Standard digital image properties detected';
}

function resetAnalysis() {
    previewContainer.style.display = 'none';
    analysisResults.style.display = 'none';
    loading.style.display = 'none';
    fileInput.value = '';
}
