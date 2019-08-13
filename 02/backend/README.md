# Spring boot based CRUD for lawyers management

Restful backend for create, update, delete and list lawyers.
In the default (development) profile, the backend runs the src/main/resources/data.sql script
to prepopulate the H2 Database

## Implementation Details

Source code was written in portuguese language, but is dead simple to understand how it is structured

- **src/main/java/br/jus/trt22/demo/config** package contains spring beans customizing the runtime context
- **src/main/java/br/jus/trt22/demo/modelo** package contains the entity class Advogado (lawyer)
- **src/main/java/br/jus/trt22/demo/repositorio** package contains the restful controller for the Advogado entity

# How to run in development mode

You must have the JDK >= 9 properly installed on your machine.
Just run either `mvnw.cmd spring-boot:run` (on Windows machine) or `mvnw spring-boot:run` (on a linux machine)

# How to build

Run `mvn clean package` in order to package the spring boot backend server. The script will generate the file ./target/demo-backend.jar

To run with the development configurations, just run `java -jar ./target/demo-backend.jar`.
To run with the production profile, run `java -jar -Dspring.profiles.active=production ./target/demo-backend.jar`


# How to build a docker image

just run `mvn clean package && docker build -t demo-backend .`
and to start a docker container `docker run --rm -it -p 8080:8080 demo-backend`
