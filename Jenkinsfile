pipeline {
    agent {
        docker {
            image 'node'
            args '-u root:root --memory-reservation=800m --memory=900m --memory-swap=0'
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
        // stage('standard') {
        //     steps {
        //         sh 'npm run standard'
        //     }
        // }
        // stage('monorepo-dep-lint') {
        //     steps {
        //         sh 'npm run monorepo-dep-lint'
        //     }
        // }
        // stage('depcheck') {
        //     steps {
        //         sh 'npm run depcheck'
        //     }
        }
        stage('jest') {
            steps {
                sh 'npm run jest'
            }
        }
    }
}
