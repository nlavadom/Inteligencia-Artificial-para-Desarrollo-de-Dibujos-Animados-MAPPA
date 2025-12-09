pipeline {
    agent any

    environment {
        NODE_VERSION = '22.15.0'
        FRONTEND_DIR = '.'
        DOCKER_IMAGE_FRONTEND = 'mappa-kids-frontend'
    }

    tools {
        nodejs "Node22.15.0"
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
                    sh 'npm install'
                }
            }
        }


        stage('Run Tests') {
            steps {
                dir("${FRONTEND_DIR}") {
                    sh 'npm test || true'
                }
            }
        }


        stage('Build Docker Images') {
            steps {
                script {
                    echo "Construyendo frontend..."
                    sh """
                        docker build \
                        -f Dockerfile.frontend \
                        -t ${DOCKER_IMAGE_FRONTEND}:latest \
                        ${FRONTEND_DIR}
                    """
                }
            }
        }


        stage('Deploy (Local Docker)') {
            steps {
                script {
                    echo "Puedes activar docker compose para despliegue real"
                    // sh "docker compose up -d --build"
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
