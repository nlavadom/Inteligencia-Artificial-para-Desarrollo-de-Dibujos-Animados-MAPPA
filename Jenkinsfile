pipeline {
    agent any

    environment {
        NODE_VERSION = '20'
        DOCKER_IMAGE_BACKEND = 'mappa-kids-backend'
        DOCKER_IMAGE_FRONTEND = 'mappa-kids-frontend'
        DOCKER_REGISTRY = "${env.DOCKER_REGISTRY ?: 'localhost:5000'}"
    }

    stages {
        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            parallel {
                stage('Backend Dependencies') {
                    steps {
                        dir('server') {
                            sh 'npm ci'
                        }
                    }
                }
                stage('Frontend Dependencies') {
                    steps {
                        sh 'npm ci'
                    }
                }
            }
        }

        stage('Lint & Test') {
            parallel {
                stage('Backend Lint') {
                    steps {
                        dir('server') {
                            script {
                                try {
                                    sh 'npm run lint || true'
                                } catch (Exception e) {
                                    echo "Linting skipped or not configured"
                                }
                            }
                        }
                    }
                }
                stage('Frontend Lint') {
                    steps {
                        script {
                            try {
                                sh 'npm run lint || true'
                            } catch (Exception e) {
                                echo "Linting skipped or not configured"
                            }
                        }
                    }
                }
            }
        }

        stage('Build') {
            parallel {
                stage('Build Backend') {
                    steps {
                        dir('server') {
                            sh 'npm run build'
                        }
                    }
                }
                stage('Build Frontend') {
                    steps {
                        sh 'npm run build'
                    }
                }
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    // Build backend image
                    sh """
                        docker build -t ${DOCKER_IMAGE_BACKEND}:${env.BUILD_NUMBER} \
                            -t ${DOCKER_IMAGE_BACKEND}:latest \
                            ./server
                    """
                    
                    // Build frontend image
                    sh """
                        docker build -t ${DOCKER_IMAGE_FRONTEND}:${env.BUILD_NUMBER} \
                            -t ${DOCKER_IMAGE_FRONTEND}:latest \
                            -f Dockerfile.frontend .
                    """
                }
            }
        }

        stage('Docker Push') {
            when {
                anyOf {
                    branch 'main'
                    branch 'master'
                }
            }
            steps {
                script {
                    if (env.DOCKER_REGISTRY && env.DOCKER_REGISTRY != 'localhost:5000') {
                        sh """
                            docker tag ${DOCKER_IMAGE_BACKEND}:${env.BUILD_NUMBER} \
                                ${DOCKER_REGISTRY}/${DOCKER_IMAGE_BACKEND}:${env.BUILD_NUMBER}
                            docker tag ${DOCKER_IMAGE_BACKEND}:latest \
                                ${DOCKER_REGISTRY}/${DOCKER_IMAGE_BACKEND}:latest
                            
                            docker tag ${DOCKER_IMAGE_FRONTEND}:${env.BUILD_NUMBER} \
                                ${DOCKER_REGISTRY}/${DOCKER_IMAGE_FRONTEND}:${env.BUILD_NUMBER}
                            docker tag ${DOCKER_IMAGE_FRONTEND}:latest \
                                ${DOCKER_REGISTRY}/${DOCKER_IMAGE_FRONTEND}:latest
                            
                            docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE_BACKEND}:${env.BUILD_NUMBER}
                            docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE_BACKEND}:latest
                            docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE_FRONTEND}:${env.BUILD_NUMBER}
                            docker push ${DOCKER_REGISTRY}/${DOCKER_IMAGE_FRONTEND}:latest
                        """
                    }
                }
            }
        }

        stage('Deploy') {
            when {
                anyOf {
                    branch 'main'
                    branch 'master'
                }
            }
            steps {
                script {
                    echo "Deployment would happen here"
                    echo "Example: docker-compose up -d"
                    // Uncomment and configure for your deployment:
                    // sh 'docker-compose -f docker-compose.prod.yml up -d'
                }
            }
        }
    }

    post {
        always {
            cleanWs()
        }
        success {
            echo "Pipeline succeeded!"
        }
        failure {
            echo "Pipeline failed!"
        }
    }
}

