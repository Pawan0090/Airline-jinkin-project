# Step 1: Use an official lightweight Java runtime environment
FROM eclipse-temurin:21-jre-alpine

# Step 2: Set the directory inside the container where commands run
WORKDIR /app

# Step 3: Copy the compiled .jar file from your Maven build into the container
# Note: Jenkins will run 'mvn clean package' before building this image
COPY target/*.jar app.jar

# Step 4: Inform Docker that the container listens on port 8080 at runtime
EXPOSE 8080

# Step 5: The command to run your Spring Boot application
ENTRYPOINT ["java", "-jar", "app.jar"]
