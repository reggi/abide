pipeline {
    agent {
        docker { image 'node' }
    }
    stages {
        stage('versions') {
            steps {
                sh 'node --version'
                sh 'npm -v'
            }
        }
        stage('checkout') {
            steps {
                checkout scm
            }
        }
        stage('npm install') {
            steps {
                sh 'npm install --verbose'
            }
        }
        stage('standard check') {
            steps {
                sh 'npm run standard'
            }
        }
        stage('standard') {
            steps {
                sh 'npm run standard'
            }
        }
        stage('depcheck') {
            steps {
                sh 'npm run depcheck'
            }
        }
        stage('depcheck') {
            steps {
                sh 'npm run depcheck'
            }
        }
        stage('depcheck') {
            steps {
                sh 'npm run depcheck'
            }
        }
    }
}
