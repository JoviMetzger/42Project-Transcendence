// Import language files
import en from '../languages/en.json';
import de from '../languages/de.json';
import nl from '../languages/nl.json';

// Define LangData interface to type-check language data
interface LangData {
    [key: string]: string;
}

// Function to switch language
function switchLanguage(lang: string) {
    let langData: LangData;

	console.log("language.ts TEST");

    // Determine which language data to use
    switch (lang) {
        case 'de':
            langData = de;
            break;
        case 'nl':  // Change to match 'nl.json' for Dutch
            langData = nl;
            break;
        default:
            langData = en; // Default to English if no valid language selected
            break;
    }

    updateContent(langData);
    localStorage.setItem('selectedLang', lang);
}

// Function to update content based on selected language
function updateContent(langData: LangData): void {
    document.querySelectorAll('[data-i18n]').forEach((element) => {
        const key = element.getAttribute('data-i18n');
        if (!key || !langData[key]) return;

        const linkElement = element.querySelector('a');

        if (linkElement) {
            // Preserve the link while replacing the surrounding text
            const updatedText = langData[key].replace('{link}', linkElement.outerHTML);
            element.innerHTML = updatedText;
        } else {
            // Standard text replacement
            element.innerText = langData[key];
        }
    });

     // Input placeholders
     document.querySelectorAll('[data-i18n-placeholder]').forEach((element) => {
        if (element instanceof HTMLInputElement) {
            const key = element.getAttribute('data-i18n-placeholder');
            if (key && langData[key]) {
                element.placeholder = langData[key];
            }
        }
    });
}



// Load saved language or default to English
document.addEventListener('DOMContentLoaded', () => {
    const savedLang = localStorage.getItem('selectedLang') || 'en'; // Default to 'en'
    switchLanguage(savedLang);

    // Set the select dropdown to the saved language or default to English
    const languageSelector = document.getElementById('language-selector') as HTMLSelectElement;
    if (languageSelector) {
        languageSelector.value = savedLang;  // Update the dropdown to the selected language
    }
});

// Expose function globally (for use in HTML select onchange)
(window as any).switchLanguage = switchLanguage;

