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
                sh 'npm install'
            }
        }
    }
}
