export function scrollToSection(sectionId: string, behavior: ScrollBehavior = 'smooth'): boolean {
    const element = document.getElementById(sectionId);

    if (!element) {
        return false;
    }

    window.scrollTo({ top: element.offsetTop, behavior });
    return true;
}

export function scrollToSectionWhenReady(
    sectionId: string,
    maxAttempts = 50,
    intervalMs = 100,
): () => void {
    if (scrollToSection(sectionId)) {
        return () => {};
    }

    let attempts = 0;
    const timer = setInterval(() => {
        attempts += 1;

        if (scrollToSection(sectionId) || attempts >= maxAttempts) {
            clearInterval(timer);
        }
    }, intervalMs);

    return () => clearInterval(timer);
}
