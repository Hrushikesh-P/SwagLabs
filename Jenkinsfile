pipeline {
    agent { docker { image 'ubuntu_play:latest' } }
    stages {
        stage('e2e-tests') {
            steps {
                sh '''
                # Set a temporary npm cache directory
                export NPM_CONFIG_CACHE=/var/lib/jenkins/workspace/FirstPipeline/.npm
                npm ci
                npx playwright test --project=chromium
                '''
            }
        }
    }
}
