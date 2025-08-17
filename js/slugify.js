function slugify(text) {
    return text
        .toLowerCase()                    // Convert to lowercase
        .trim()                          // Remove leading/trailing whitespace
        .replace(/[^\w\s-]/g, '')        // Remove special characters except word chars, spaces, and hyphens
        .replace(/[\s_-]+/g, '-')        // Replace spaces, underscores, and multiple hyphens with single hyphen
        .replace(/^-+|-+$/g, '');        // Remove leading and trailing hyphens
}