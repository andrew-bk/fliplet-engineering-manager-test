const rateLimit = {}; // Object to track requests per tenant

/**
 * The initial implementation has a few issues:
 * 
 * - the tenant ids are not being validated so tenant ids could be spoofed to get around the rate limit. The client could just use a different tenant id for each request and get around the rate limit.
 * - rather than using a header for storing the tenant id, we should use the authorisation cookie or token to identify the tenant rather than relying on the header which can be easily spoofed
 * - storing the tenant rate limits in memory means this would only work on a single node. The limits would need to be stored in a cache or database to allow the api to be scalable across multiple nodes
 * - if we don't persist the rate limits, when the server restarts, the limits would reset and this could cause unexpected 429 errors for our clients 
 * - implementing our own rate limiter is overkill, we could probably use an off-the-shelf library for this
 * 
 */
function rateLimiter(req, res, next) {
  const tenant = req.headers["x-tenant-id"];
  if (!tenant) return res.status(400).json({ error: "Missing tenant ID" });

  if (!rateLimit[tenant]) {
    rateLimit[tenant] = { count: 1, startTime: Date.now() };
  } else {
    let elapsed = Date.now() - rateLimit[tenant].startTime;
    if (elapsed > 60000) { // Reset every minute
      rateLimit[tenant] = { count: 1, startTime: Date.now() };
    } else {
      rateLimit[tenant].count++;
      if (rateLimit[tenant].count > 100) {
        return res.status(429).json({ error: "Rate limit exceeded" });
      }
    }
  }
  next();
}

module.exports = rateLimiter;