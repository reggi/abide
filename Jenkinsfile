pipeline {
    agent {
        docker { image 'node' }
    }
    stages {
        stage('versions') {
            sh 'node --version'
            sh 'npm -v'
        }
        stage('checkout') {
            sh 'checkout scm'
        }
        stage('npm install') {
            sh 'npm install'
        }
    }
}
