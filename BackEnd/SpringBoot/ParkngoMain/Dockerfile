# Stage 1: Build the Spring Boot application
FROM maven:3.8.6-amazoncorretto-17 AS build

WORKDIR /app

# Copy the project files
COPY pom.xml .
COPY src ./src

# Build the application
RUN mvn clean package -DskipTests

# Stage 2: Create the final image
FROM amazoncorretto:17-alpine-jdk

WORKDIR /app

# Copy the JAR file from the build stage
COPY --from=build /app/target/spring_boot_backend_parkngo-0.0.1-SNAPSHOT.jar /app/app.jar 
# Replace your-spring-boot-app.jar

# Expose the port
EXPOSE 9443

# Set the entrypoint to run the Spring Boot application
ENTRYPOINT ["java", "-jar", "/app/app.jar"]

# Optional: User and Group (Highly Recommended for Security)
# RUN addgroup -S myusergroup && adduser -S -G myusergroup myuser
# USER myuser:myusergroup

# Optional: Healthcheck (Recommended)
# HEALTHCHECK --interval=30s --timeout=10s --retries=5 --start-period=60s CMD ["curl", "-f", "http://localhost:9443/actuator/health"] || exit 1

# Optional: Copy application.properties or other configuration files
# COPY application.properties /app/application.properties

# Optional: Set environment variables
# ENV SPRING_PROFILES_ACTIVE=production
# ENV JAVA_OPTS="-Xmx512m"
