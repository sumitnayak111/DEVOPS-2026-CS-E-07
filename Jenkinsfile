pipeline {
    agent any
    stages {
        stage('Hello') {
            steps {
                echo 'Jenkins is working!'
            }
        }
        stage('Checkout') {
            steps {
                checkout scm
            }
        }
        stage('Build') {
            steps {
                echo 'Build stage'
            }
        }
        stage('Test') {
            steps {
                echo 'Test stage'
            }
        }
    }
}
