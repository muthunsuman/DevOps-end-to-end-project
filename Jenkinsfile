pipeline {

    agent any

    environment {
        FRONTEND_IMAGE = "frontend-app"
        BACKEND_IMAGE = "backend-app"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Backend') {
            steps {
                dir('back-end-app') {
                    sh 'mvn clean package -DskipTests'
                }
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker build -t backend-app ./back-end-app'
                sh 'docker build -t frontend-app ./front-end-app'
            }
        }

        stage('Deploy Containers') {
            steps {
                sh '''
                docker-compose down || true
                docker-compose up -d --build
                '''
            }
        }
    }

    post {

        success {
            echo 'Deployment Successful'
        }

        failure {
            echo 'Deployment Failed'
        }
    }
}