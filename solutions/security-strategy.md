# Security Strategy: JWT Expiry Fix
## Problem
Tokens never expire.

## Solution

We would need to change the authentication flow to use 2 or 3 legged OAuth2 that creates JWT tokens that have an expiry. 

### Rollout

The existing authentication flow that creates long lived tokens will be removed. This would prevent new clients from using it and forcing them to use the new authentication flow that creates short-lived tokens with an auth/refresh mechanism.

Existing clients could continue to use their long-lived tokens.

After a certain point in time once notice has been given to change to an auth/refresh approach, we can change the system to disallow the use of long-lived tokens.


### Potential Risks

#### Clients have been coded with the assumption that tokens are long lived and don't need to be refreshed

Mitigation: We will need to notify clients in advance of the change that they will need to change to use the OAuth flow for authentication and refresh.

#### Just refusing all long lived tokens would cause disruption for our customers

Mitigiation: a gradual rollout and removal of support for long-lived tokens would reduce the disruption
