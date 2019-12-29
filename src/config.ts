// This file cannot contain Webpack-resolved imports (e.g. "~src/foo").

import U from "./userscript";
import { r } from "./utilities";

export const USERSCRIPT_ID = U.id;
export const USERSCRIPT_NAME = U.name;

export const PREFIX_ID = USERSCRIPT_ID + "-";
export const PREFIX_CLASS = USERSCRIPT_ID + "-";

// How long to wait between performing operations (DOM manipulation etc) during page load:
export const OPERATIONS_INTERVAL = 25; // ms
// How many extra tries to perform after DOMContentLoaded before considering remaining operations failed:
export const OPERATIONS_EXTRA_TRIES = 3;

const i = (x: string) => PREFIX_ID + x;
const c = (x: string) => PREFIX_CLASS + x;

export const ID_STYLE_ELEMENT = i("main-style-element");
export const EDITING_TOOLS_HEIGHT = "120px"; // to prevent jumping in preferences interface

// distance between article and left side of improved corrections dialog
export const CORRECTIONS_DIALOG_OFFSET_PX = 20;

export const NBSP = "\u00A0";

export const ID = {
    document: i("document"),
    preferenceIdPrefix: i("preference-"),
    editingTools: i("editing-tools"),
    editingToolsPreferences: i("editing-tools-preferences"),
    darkThemeStylesheet: i("dark-theme-stylesheet"),
    darkThemeToggle: i("dark-theme-toggle"),
    preferencesShortcut: i("preferences-shortcut"),
    interestsPreferences: i("interests-preferences"),
    style: {
        proofreading: i("proofreading"),
    },
};

export const CLASS = {
    mousetrap: "mousetrap",
    disabled: c("disabled"),
    darkThemeActive: c("dark-theme-active"),
    editingTools: c("editing-tools"),
    iconButton: c("icon-button"),
    iconTab: c("icon-tab"),
    pmButton: c("pm-button"),
    quoteSignatureButton: c("quote-signature-button"),
    mentionEveryoneButton: c("mention-everyone-button"),
    linkToTop: c("link-to-top"),
    shibe: c("shibe"),
    button_restoreDraft: c("button-restore-draft"),
    button_color: c("button-color"),
    button_quote: c("button-quote"),
    button_spoiler: c("button-spoiler"),
    button_code: c("button-code"),
    button_math: c("button-math"),
    button_youtube: c("button-youtube"),
    splitQuote: c("split-quote"),
    colorPalette: c("color-palette"),
    preference: c("preference"),
    preferenceDescription: c("preference-description"),
    inlinePreference: c("inline-preference"),
    primaryInlinePreference: c("primary-inline-preference"),
    radioButtonPreference: c("radioButtonPreference"),
    subforum: c("subforum"),
    textareaSize: c("textarea-size"),
    codeInput: c("code-input"),
};

export const PATH = {
    PREFERENCES: {
        // Used for creating a link to the preferences menu:
        link: (sweclockersSettingsPath: string): string => (
            sweclockersSettingsPath + "/" + USERSCRIPT_ID
        ),
        // Used for checking whether we should show the preferences menu:
        check: (sweclockersSettingsPath: RegExp): RegExp => (
            new RegExp(sweclockersSettingsPath.source + r`\/` + USERSCRIPT_ID)
        ),
    },
};

export const KEY = {
    autosaved_draft: i("autosaved_draft"),
    caret_position: i("caret_position_in_textarea"),
    last_time_user_tried_to_submit: i("last_time_user_tried_to_submit"),
};

export const URL_LOGO = "https://cdn.sweclockers.com/artikel/bild/63329?l=eyJyZXNvdXJjZSI6IlwvYXJ0aWtlbFwvYmlsZFwvNjMzMjkiLCJmaWx0ZXJzIjpbInQ9b3JpZ2luYWwiXSwicGFyYW1zIjpbXSwia2V5IjoiYzk3ODM1MmY4NDVkM2YwOWY3M2UwYWRmODZlMjk1MmIifQ%3D%3D";

export const CONTENT = {
    indentation: "    ",
    shibeColor: `red`,
    shibeFont: `Comic Sans MS, Chalkboard SE, sans-serif`, // must be without quotes to work in BB
    splitQuoteEmptyLines: 3,
    edit: `[b]EDIT:[/b] `,
    doge: `[img]https://i.imgur.com/2IGEruO.png[/img]`,
};

export const ICONS = {
    // Requiring an SVG file here throws when building.
    QUOTE: `<div>”</div>`,
    DOGE: `https://i.imgur.com/2IGEruO.png`,
};

export const FOCUSABLE_ELEMENTS = [ "textarea", "input", "select" ];

export const enum SearchEngine {
    // Be careful! These strings are used in the UI.
    GOOGLE = "Google",
    DUCKDUCKGO = "DuckDuckGo",
}
