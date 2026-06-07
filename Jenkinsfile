// 1. Import your shared library (configured in Jenkins global settings as 'my-shared-library-Airline')
@Library('my-shared-library-Airline') _

// 2. Call the custom global variable/function defined in your library
standardDevSecOpsPipeline(
    backendImage: 'yourdockerhubusername/aeroflight-backend',
    frontendImage: 'yourdockerhubusername/aeroflight-frontend',
    sonarProjectKey: 'AeroFlight-App',
    sonarServerId: 'SonarQubeServer',
    dockerCredsId: 'docker-hub-credentials'
    dockerServerIp: 'YOUR_DOCKER_SERVER_PUBLIC_IP'
)
