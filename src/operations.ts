import { Operation, DependentOperation, IndependentOperation, SUCCESS, FAILURE } from "lib/operation-manager";
import * as SITE from "globals-site";
import * as CONFIG from "globals-config";
import SELECTOR from "./selectors";
import { Preferences } from "userscripter/preference-handling";
import P from "preferences";
import { isOnBSCPreferencesPage, isOnSweclockersSettingsPage, isInEditMode } from "./environment";
import INSERT_PREFERENCES_MENU from "./operations/insert-preferences-menu";
import INSERT_PREFERENCES_LINK from "./operations/insert-preferences-link";
import INSERT_EDITING_TOOLS from "./operations/insert-editing-tools";
import PREVENT_ACCIDENTAL_SIGNOUT from "./operations/prevent-accidental-signout";
import PREVENT_ACCIDENTAL_UNLOAD from "./operations/prevent-accidental-unload";
import * as DarkTheme from "./operations/dark-theme";

const ALWAYS: boolean = true;

/*
******** README ********

Operations to run as soon as possible during page load are declared in this file.

Every item must be an object with the following structure:
{
    description : a brief description of the operation in the infinitive sense, whose main purpose is to identify operations failing as a consequence of the host site changing its content
    condition   : whether the operation should run at all (e.g. some saved preference value)
    selectors   : CSS selectors matching elements required to run the operation
    action      : what to do (e.g. insert a custom element); a function that will be called with the required elements as arguments, in the order they appear in `selectors`
}

`action` may return a boolean (SUCCESS or FAILURE) indicating whether or not it succeeded.

Not returning anything is equivalent to returning undefined, which is equivalent to returning SUCCESS.
*/

const OPERATIONS: ReadonlyArray<Operation> = [
    new IndependentOperation({
        description: "set body id",
        condition: ALWAYS,
        action: () => { document.documentElement.id = CONFIG.ID.document },
    }),
    new IndependentOperation({
        description: "manage dark theme",
        condition: ALWAYS,
        action: DarkTheme.manage,
    }),
    new IndependentOperation({
        description: "insert preferences menu",
        condition: isOnBSCPreferencesPage(),
        action: INSERT_PREFERENCES_MENU,
    }),
    new DependentOperation({
        description: "prevent accidental unload",
        condition: Preferences.get(P.general._.prevent_accidental_unload) && isInEditMode(),
        selectors: {
            textarea: SELECTOR.textarea,
            actionButtons: SELECTOR.actionButtons,
        },
        action: PREVENT_ACCIDENTAL_UNLOAD,
    }),
    new DependentOperation({
        description: "insert editing tools",
        condition: isInEditMode() && Preferences.get(P.editing_tools._.enable),
        selectors: { textarea: SELECTOR.textarea },
        action: INSERT_EDITING_TOOLS,
    }),
    new DependentOperation({
        description: "insert dark theme toggle",
        condition: Preferences.get(P.dark_theme._.show_toggle) && !isOnBSCPreferencesPage(),
        selectors: { lastTab: SELECTOR.lastNavigationTab },
        action: DarkTheme.insertToggle,
    }),
    new DependentOperation({
        description: "prevent accidental signout",
        condition: Preferences.get(P.general._.prevent_accidental_signout),
        selectors: { siteHeader: SELECTOR.siteHeader },
        action: PREVENT_ACCIDENTAL_SIGNOUT,
    }),
    new DependentOperation({
        description: "insert preferences link",
        condition: isOnSweclockersSettingsPage(),
        selectors: {
            settingsNavigation: SELECTOR.settingsNavigation,
            li: SELECTOR.settingsNavigationItem,
            label: SELECTOR.settingsNavigationLabel,
        },
        action: INSERT_PREFERENCES_LINK,
    }),
];

export default OPERATIONS;
