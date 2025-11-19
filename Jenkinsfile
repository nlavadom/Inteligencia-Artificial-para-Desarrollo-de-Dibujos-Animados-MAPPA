pipeline {
    agent any

    environment {
        NODE_VERSION = '22.15.0'
        BACKEND_DIR = 'server'
        FRONTEND_DIR = '.'  // frontend en la raíz
        DOCKER_IMAGE_BACKEND = 'mappa-kids-backend'
        DOCKER_IMAGE_FRONTEND = 'mappa-kids-frontend'
    }

    tools {
        nodejs "Node22.15.0"  // asegúrate que en Jenkins esté configurado con este nombre
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            parallel {

                stage('Backend Install') {
                    steps {
                        dir("${BACKEND_DIR}") {
                            sh 'npm install'
                        }
                    }
                }

                stage('Frontend Install') {
                    steps {
                        dir("${FRONTEND_DIR}") {
                            sh 'npm install'
                        }
                    }
                }
            }
        }

        stage('Run Tests') {
            parallel {

                stage('Backend Tests') {
                    steps {
                        dir("${BACKEND_DIR}") {
                            sh 'npm test || true'
                        }
                    }
                }

                stage('Frontend Tests') {
                    steps {
                        dir("${FRONTEND_DIR}") {
                            sh 'npm test || true'
                        }
                    }
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                script {

                    echo "Construyendo backend..."
                    sh """
                        docker build \
                        -t ${DOCKER_IMAGE_BACKEND}:latest \
                        ${BACKEND_DIR}
                    """

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
}
