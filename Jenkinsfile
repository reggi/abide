pipeline {
    agent {
        docker {
            image 'node'
            args '-u 0:0'
        }
    }
    stages {
        stage('setup') {
            steps {
                sh 'node --version'
                sh 'npm -v'
                sh "npm i yarn -g"
                sh "yarn -v"
            }
        }
        stage('checkout') {
            steps {
                checkout scm
            }
        }
        stage('dep install') {
            steps {
                sh 'yarn install --verbose --prefer-offline'
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
