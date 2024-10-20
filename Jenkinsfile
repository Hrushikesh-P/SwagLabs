pipeline {
    agent { docker { image 'my-playwright-image:latest' } }
    stages {
        stage('e2e-tests') {
            steps {
                sh '''
                # Set a temporary npm cache directory
                export NPM_CONFIG_CACHE=/workspace/.npm
                npm ci
                npx playwright test
                '''
            }
        }
    }
}
