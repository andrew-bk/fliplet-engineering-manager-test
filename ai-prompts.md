# AI Prompt Logging

## 📝 AI Usage Summary
- **Did AI help you solve any problems? If so, how?**
- **What parts were 100% human-driven?**
- **Did AI generate incorrect/misleading answers? How did you correct them?**
- **Which AI-powered IDE tools did you use? (e.g., GitHub Copilot, Cursor, ChatGPT in VS Code, etc.)**

---

## 📜 AI Prompts Used

### Frontend task


- Create a node project that wraps this Vue script. Use Vite as the build tool. The index page for the project must include the drag-drop component.
- I want to change how the elements of items are displayed in the preview div. The value of each element in items can be the string  "Text" or "Button". If the value of an element is "Text" I want an input tag of type text added to the preview div. If the value of an element is "Button" I want a Button tag added to the preview div. Assume that other string values may be added to the items array in the future so the solutino should be easy to extend to cover further types of element in the future. 
- I need to update the button component to set the child of the button tag to be teh default text of "Click Me". The current approach of just setting props on the component tag does not allow for this.

### Infra task

- I need to complete the infrastructure in infra.tf. It is a partially completed set of AWS infrastructure for web application running in ECS.  Assume I have a web application this is in a docker container named my-web-app. The container exposes port 80. First we will need an ECR repository for storing the docker images for my web app. A task definition needs to be added to the terraform module. It should run the container that is in the new ECR repository. The load balancer must then be updated with a target group so that port 80 is exposed on the load balancer and this forwards traffic to port 80 in my container running in the task. The existing ECS service must be updated and be copnfigured to use the new task definition