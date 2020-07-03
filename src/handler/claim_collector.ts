import { UserClaimProvider } from "../spi/user_claim_provider.ts";
import { isEmpty, isNotEmpty, isUndefined } from "../util/util.ts";


/**
 * Drop empty and duplicate claim locales from the given array.
 */
function normalizeClaimLocales(claimLocales?: string[]): string[] | undefined
{
    // If no claim locale is specified.
    if (isEmpty(claimLocales)) return undefined;

    // From 5.2. Claims Languages and Scripts in OpenID Connect Core 1.0
    //
    //     However, since BCP47 language tag values are case insensitive,
    //     implementations SHOULD interpret the language tag values
    //     supplied in a case insensitive manner.

    // A set for duplicate check.
    const set = new Set<string>();

    // The resultant list.
    const list: string[] = [];

    // Loop to drop empty and duplicate claim locales.
    claimLocales!.forEach((claimLocale) => {
        // Skip if the claim locale is empty.
        if (claimLocale.length === 0) return;

        // Skip if the claim locale is a duplicate.
        if (set.has(claimLocale.toLowerCase())) return;

        // Add the claim locale as a known one.
        set.add(claimLocale.toLowerCase());

        // Add the claim locale to the resultant list.
        list.push(claimLocale);
    })

    // Return the collected claim locales or null.
    return list.length > 0 ? list : undefined;
}


/**
 * Collector of claim values.
 */
export class ClaimCollector
{
    private claimProvider: UserClaimProvider;
    private subject: string;
    private claimNames?: string[];
    private claimLocales?: string[];


    /**
     * @param claimProvider
     *         An implementation of the `IUserClaimProvider` which
     *         provides actual claim values.
     *
     * @param subject
     *         The subject (= unique identifier) of a user.
     *
     * @param claimNames
     *         Claim names.
     *
     * @param claimLocales
     *         Claim locales. This should be the value of the `claims_locales`
     *         request parameter.
     */
    public constructor(claimProvider: UserClaimProvider, subject: string, claimNames?: string[], claimLocales?: string[])
    {
        this.claimProvider = claimProvider;
        this.subject       = subject;
        this.claimNames    = claimNames;
        this.claimLocales  = normalizeClaimLocales(claimLocales);
    }


    /**
     * Collect claim values.
     */
    public collect(): { [key: string]: any } | null
    {
        // If no claim is required.
        if (isEmpty(this.claimNames)) return null;

        // Claim values.
        const claims: { [key: string]: any } = {};

        // For each requested claim.
        this.claimNames!.forEach((claimName) => {
            // Skip if the claim name is empty.
            if (claimName.length === 0) return;

            // Split the claim name into the name part and the tag part.
            const [ name, tag ] = claimName.split('#', 2);

            // Skip if the name part is empty.
            if (name.length === 0) return;

            // Get the claim value of the claim.
            const value = this.getClaimValue(name, tag);

            // Skip if the claim value was not obtained.
            if (value === null) return;

            // Just for an edge case where claimName ends with '#'.
            const key = isUndefined(tag)? name : claimName;

            // Add the pair of the claim name and the claim value.
            claims[key] = value;
        });

        // Return the collected claims or null.
        return Object.keys(claims).length > 0 ? claims : null;
    }


    private getClaimValue(name: string, tag?: string): object | null
    {
        // If a language tag is explicitly appended, get the claim value
        // of the claim with the specific language tag.
        if (isNotEmpty(tag))
        {
            return this.claimProvider.getUserClaimValue(this.subject, name, tag!);
        }

        // If claim locales are not specified by 'claims_locales' request
        // parameter, get the claim value of the claim without any language
        // tag.
        if (isEmpty(this.claimLocales))
        {
            return this.claimProvider.getUserClaimValue(this.subject, name);
        }

        // For each claim locale. They are ordered by preference.
        for(const claimLocale of this.claimLocales!)
        {
            // Try to get the claim value with the claim locale.
            const value = this.claimProvider.getUserClaimValue(this.subject, name, claimLocale);

            // If the claim value was obtained.
            if (value) return value;
        }

        // The last resort. Try to get the claim value without any language
        // tag.
        return this.claimProvider.getUserClaimValue(this.subject, name);
    }
}