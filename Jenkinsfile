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
                sh 'npm install --verbose --prefer-offline'
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
        stage('requireable') {
            steps {
                sh 'npm run requireable'
            }
        }
        stage('test') {
            steps {
                sh 'npm run test'
            }
        }
    }
}
