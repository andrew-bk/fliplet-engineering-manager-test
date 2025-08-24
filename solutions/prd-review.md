# PRD Review
## Review
1. Authentication is missing from the PRD. We need to define how we authenticate the user who is attempting the update to the user profile
2. An authorisation check should be included as well. We need to check that the authenticated user has the authoirty to update the profile being updated. Presumably we would want to restrict users to only be able to update their own profile.
3. Validation and error handling needs to be specified. You would need to validate the values being updated. For example: 
- are Name and Email both required?, are we preventing users from updating them to enpty strings? 
- Is the email address a valid email address? 
- Does another user already use that email address? 
- We should also be checking that the user has access to the new email address so we should send an email to the new email so that people confirm they have access to that email address.