import { UserClaimProvider } from "./user_claim_provider.ts";

/**
 * Interface to get a claim value by specifying a user's subject,
 * a claim name and optionally a language tag.
 */
export class UserClaimProviderAdapter implements UserClaimProvider
{
    public getUserClaimValue(subject: string, claimName: string, languageTag?: string)
    {
        return null;
    }
}