import { SearchEngine } from "globals-config";
export { SearchEngine } from "globals-config";

function searchEngineURL(engine: SearchEngine): string {
    switch (engine) {
        case SearchEngine.GOOGLE: return "https://google.com/search?q=";
        case SearchEngine.DUCKDUCKGO: return "https://duckduckgo.com/?q=";
    }
}

export function searchURL(engine: SearchEngine, completePhrase: string): string {
    return searchEngineURL(engine) + completePhrase.trim().replace(/\s+/g, "+");
}

export function siteFilter(hostname: string): string {
    return "site:" + hostname;
}
