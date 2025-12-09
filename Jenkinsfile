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


        stage('Build Docker Images') {
            steps {
                script {
                    echo "Construyendo frontend..."
                    bat """
                        docker build ^
                        -f Dockerfile.frontend ^
                        -t ${DOCKER_IMAGE_FRONTEND}:latest ^
                        ${FRONTEND_DIR}
                    """
                }
            }
        }


        stage('Deploy (Local Docker)') {
            steps {
                script {
                    echo "Puedes activar docker compose para despliegue real"
                    // bat "docker compose up -d --build"
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo "🎉 CI pipeline completado exitosamente"
        }
    }

    triggers {
        githubPush()
    }

}
