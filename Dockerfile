FROM clmntlxndr/rails6-with-builddeps
WORKDIR /app
EXPOSE 3000
CMD ["bundle", "exec", "rails", "server", "-b", "0.0.0.0", "-p", "3000"]
COPY Dockerfile package.json* yarn.lock* /app/
COPY Dockerfile node_modules* /app/node_modules/
COPY Dockerfile Gemfile* /app/
COPY Dockerfile vendor* /app/vendor/
RUN rm /app/Dockerfile /app/vendor/Dockerfile /app/node_modules/Dockerfile
RUN bundle check || bundle install ; exit 0
RUN bundle cache ; exit 0
RUN yarn check --integrity || yarn install ; exit 0
