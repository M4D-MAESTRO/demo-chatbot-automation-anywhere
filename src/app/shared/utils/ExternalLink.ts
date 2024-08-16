

export class ExternalRedirect {
    static externalLinkHandle(link: string): void {
        window.open(link, '_blank');
    }
}