



# dev 
`npm start`



# nodejs docker webapp
- https://nodejs.org/en/docs/guides/nodejs-docker-webapp

# build 
`docker build . -t fada/yld`

# run
`docker run --name yld -p 49160:8080 -d fada/yld`

# Print app output
`docker logs yld`
ou 
`docker logs yld --follow`

# Enter the container
`docker exec -it yld /bin/bash`

# see
`curl -i localhost:49160`

or http://localhost:49160

- mix common & es6 //https://stackoverflow.com/questions/67246229/mix-commonjs-and-es6-modules-in-same-project

# dev
`npm install -g nodemon
npm run dev
`

# 25 basic bash commands
- https://www.educative.io/blog/bash-shell-command-cheat-sheet
- bash https://www.gnu.org/software/bash/manual/bash.pdf

- nodemon .cjs https://github.com/remy/nodemon/issues/1954#issuecomment-972648177
