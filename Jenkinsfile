// 1. Import your shared library (configured in Jenkins global settings as 'jenkins-shared-library-Airline')
@Library('jenkins-shared-library-Airline') _

// 2. Call the custom global variable/function defined in your library
standardDevSecOpsPipeline(
    backendImage: 'yourdockerhubusername/aeroflight-backend',
    frontendImage: 'yourdockerhubusername/aeroflight-frontend',
    sonarProjectKey: 'AeroFlight-App',
    sonarServerId: 'SonarQubeServer',
    dockerCredsId: 'docker-hub-credentials',
    dockerServerIp: '13.127.181.56'
)
