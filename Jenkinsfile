pipeline {
    agent {
        docker {
            image 'node'
            args '-u root:root'
        }
    }
    stages {
        stage('setup') {
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
        stage('dep install') {
            steps {
                sh 'npm i'
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
        stage('test') {
            steps {
                sh 'npm run test'
            }
        }
    }
}
