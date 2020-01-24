# README

Run app
`docker-compose up`

RailsAdmin
http://localhost:3000/admin

Run test suite (models, API controller & actioncable )
`docker-compose run --rm rails rails test`

Run integration tests with Cypress

1) Start rails server in test env
`docker-compose run --rm -p "3000:3000" rails rails s -e test -b 0.0.0.0`
2) Start cypress within host
`yarn cypress open --project ./spec`

Demo : https://www.youtube.com/watch?v=gFbscUYXOzw