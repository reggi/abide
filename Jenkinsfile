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
                sh "npm i yarn -g"
            }
        }
        stage('checkout') {
            steps {
                checkout scm
            }
        }
        stage('dep install') {
            steps {
                sh 'yarn install --prefer-offline'
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
