function extractTopKeywords(html, options = {}) {
    const {
        maxKeywords = 10,
        minWordLength = 3,
        caseSensitive = false
    } = options;

    // Common stop words to ignore
    const stopWords = new Set([
        'a', 'an', 'and', 'are', 'as', 'at', 'be', 'by', 'for', 'from',
        'has', 'he', 'in', 'is', 'it', 'its', 'of', 'on', 'that', 'the',
        'to', 'was', 'will', 'with', 'would', 'you', 'your', 'this', 'they',
        'we', 'or', 'not', 'but', 'have', 'had', 'what', 'when', 'where',
        'who', 'which', 'why', 'how', 'all', 'any', 'both', 'each', 'few',
        'more', 'most', 'other', 'some', 'such', 'no', 'nor', 'only', 'own',
        'same', 'so', 'than', 'too', 'very', 'can', 'will', 'just', 'should',
        'now', 'get', 'may', 'new', 'take', 'come', 'could', 'way', 'use',
        'her', 'many', 'them', 'these', 'two', 'been', 'call', 'first',
        'made', 'long', 'make', 'part', 'over', 'said', 'water', 'after',
        'back', 'little', 'only', 'round', 'man', 'year', 'came', 'show',
        's', 't', 'm', 'll', 've', 're', 'd', 'debellis', 'sons'
    ]);

    // Remove HTML tags and get text content
    const textContent = html.replace(/<[^>]*>/g, ' ');

    // Extract words and clean them
    const words = textContent
        .toLowerCase()
        .replace(/[^\w\s]/g, ' ')     // Replace punctuation with spaces
        .split(/\s+/)                 // Split on whitespace
        .filter(word =>
            word.length >= minWordLength &&     // Minimum length
            !stopWords.has(word) &&             // Not a stop word
            !/^\d+$/.test(word)                 // Not just numbers
        );

    // Count word frequencies
    const wordCount = {};
    words.forEach(word => {
        const key = caseSensitive ? word : word.toLowerCase();
        wordCount[key] = (wordCount[key] || 0) + 1;
    });

    // Sort by frequency and return top keywords as a string
    return Object.entries(wordCount)
        .sort(([,a], [,b]) => b - a)
        .slice(0, maxKeywords)
        .map(([word]) => word)
        .join(', ');
}