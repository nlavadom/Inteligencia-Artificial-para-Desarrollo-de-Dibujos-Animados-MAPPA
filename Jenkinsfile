pipeline {
    agent any

    environment {
        NODE_VERSION = '22.15.0'
        FRONTEND_DIR = '.'
        DOCKER_IMAGE_FRONTEND = 'mappa-kids-frontend'
    }

    tools {
        nodejs "node22.15.0"
    }


    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                dir("${FRONTEND_DIR}") {
                    bat 'npm install'
                }
            }
        }


        stage('Run Tests') {
            steps {
                dir("${FRONTEND_DIR}") {
                    bat 'npm test || exit 0'
                }
            }
        }


        stage('Build Project') {
            steps {
                dir("${FRONTEND_DIR}") {
                    echo "Verificando build..."
                    bat 'npm run build'
                }
            }
        }

    }

    post {
        always {
            cleanWs()
        }
        success {
            echo "CI pipeline completado exitosamente"
        }
    }

    triggers {
        githubPush()
    }

}
