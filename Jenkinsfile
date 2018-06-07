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
                sh "yarn -v"
                sh "npm i lerna -g"
            }
        }
        stage('checkout') {
            steps {
                checkout scm
            }
        }
        stage('dep install') {
            steps {
                // sh 'yarn install --prefer-offline'
                sh 'lerna bootstrap --nohoist -- --prefer-offline'
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
