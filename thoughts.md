1️⃣  JavaScript/TypeScript Performance Task (20 min)

For this task I tried to keep the time complexity good which having an efficient de-duping mechanism.  The whole approach of having the function work on 1 million users would need to change to work on chunks of the user list to keep the space complexity constant.

2️⃣ Express.js Rate Limiter Middleware (20 min)

I've noted the limitations of the existing implementation rather than reimplementing a new rate limiter from scratch. If the rate limiter function had not been implemented I would have implemented one there. The best solutino for this is to use an off the shelf library for this anyway.

3️⃣ Vue.js Drag-and-Drop Component (25 min)

I've not written an Vue code before so I created a project around the given script to I can test my assumption that the existing code would add the strings "text" or "button" to the preview section. This also allowed me to test the solution that the AI came up with.

4️⃣ Infrastructure as Code (Terraform) (25 min)

I've not writted any Terraform config before but I have read some. I noted what resources were missing from the ECS service and got the AI to generate it. The AI actually went further than I had thought and added plenty of VPC config that is needed. It added lots of tags for the names of the resources. I'm not sure if that is best practice with Terraform but it seemeed appropriate. The same goes for the outputs at the end.

7️⃣ PRD Review & Critique (15 min)

I tried to think of the issues with the given feature. Some of the issues had already been noted in the PRD but they are valid high impact issues so I have just expanded that. I'm not sure if points 2 and 3 are considered part of the PRD or not. All in all, just not enough detail/information in the PRD.

8️⃣ AWS Debugging Scenario (20 min)

I don't have experience with Postgres so my thoughts are from some googling of Postgres extension issues and first-hand experience of upgrading MySQL in RDS.

9️⃣ Scalability Strategy (20 min)

If I had had more time on this I would have liked to have added a mermaid diagram for how this all fits together. Also this just needs more details before it would be ready to be picked up.

🔟 Security Strategy: JWT Expiry Fix (20 min)

I didn;t have as much time left for this one so it is a bit rushed.