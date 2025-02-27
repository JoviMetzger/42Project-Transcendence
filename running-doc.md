# ft_transendence running doc

This document is to keep track of our plans for ft_transendence

Current aim for the modules as these seem to fit together well:
- Backend module with Fastify - 2 point
- Frontend module with tailwind CSS - 1 point
- User managment module - 2 points
- user and game stats dashboards - 1 point

#### these all bring us to 6 points, we can pick 1 more minor module to complete the project.
obvioulsy we can pick 1 major / 2 minor or more extra if you want to do something that you think is cool

a minor module that seems relatively simple to implement but would require us to know this from the start so we can immediately develop with language keys is the multiple languages minor module.

## Dockerfiles

More info will come but using pnpm 
Using pnpm over npm can lead to faster installations and reduced disk space usage due to its efficient package management and disk space optimization techniques.


## Backend:

development will be in `Fastify`

Fastify is a web framework for Node.js, designed for building fast and efficient server-side applications. It is known for its low overhead, high performance, and extensibility, making it a popular choice for developers who need to create scalable and maintainable backend services. Fastify provides a robust plugin architecture, allowing developers to easily add functionality and customize their applications.

Fastify plugins:
https://fastify.dev/ecosystem/

https://fastify.dev/docs/latest/Guides/Getting-Started/

https://betterstack.com/community/guides/scaling-nodejs/introduction-to-fastify/

https://www.youtube.com/watch?v=Lk-uVEVGxOA



For the database can chose an sql plugin from the fastify ecosystem


For testing routes i am using the REST vscode plugin which uses the file test.http. Here you can write any request and it will show you the http response.


By going to:
http://localhost:3000/docs 
you can view all of the possible GET requests






## Frontend:

Frontend will be developed with tailwind css and using typescript additionally only.

Status: Currently I have set up the frontend container to connect to localhost 5173 and it loads the index.html at the root. Might be better to remove public and serve all pages from /frontend/src/pages. Will have to look at what is standard practise for tailwind+vite+typescripts. 

source: https://tailwindcss.com/docs/installation/using-vite