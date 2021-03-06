pipeline {
    agent {
        docker {
            image 'node'
            args '--memory-reservation=800m --memory=900m --memory-swap=0'
        }
    }
    stages {
        stage('setup') {
            steps {
                sh 'node --version'
                sh 'npm -v'
                sh "npm cache clean --force"
            }
        }
        stage('checkout') {
            steps {
                checkout scm
            }
        }
        stage('dep install') {
            steps {
                sh 'npm install --no-save'
            }
        }
        stage('standard') {
            steps {
                sh 'npm run standard'
            }
        }
        stage('monorepo-dep-lint') {
            steps {
                sh 'npm run monorepo-dep-lint'
            }
        }
        stage('depcheck') {
            steps {
                sh 'npm run depcheck'
            }
        }
        stage('shebang-check') {
            steps {
                sh 'npm run shebang-check'
            }
        }
        stage('sort-package-json') {
            steps {
                sh "npm run sort-package-json"
            }
        }
        stage('jest') {
            steps {
                sh 'npm run jest'
            }
        }
        stage('ensure-no-individual-coverage') {
            steps {
                sh 'npm run ensure-no-individual-coverage'
            }
        }
        stage('babel') {
            steps {
                sh 'npm run babel-ci'
            }
        }
        stage('git-status-porcelain') {
            steps {
                sh 'npm run git-status-porcelain'
            }
        }
        stage('lerna publish') {
            steps {
                withCredentials([sshUserPrivateKey(credentialsId: 'cb8acd82-3a50-4a94-9d5f-44b04856e6fd', keyFileVariable: 'GITHUB_KEY')]) {
                    sh 'echo ssh -i $GITHUB_KEY -l git -o StrictHostKeyChecking=no \\"\\$@\\" > ./run_ssh.sh'
                    sh 'chmod +x ./run_ssh.sh'
                    withEnv(['GIT_SSH=./run_ssh.sh']) {
                        withNPM(npmrcConfig: 'da4e5199-b04b-41b6-a03f-dfbcc344f701') {
                            sh 'mv ./.npmrc ~/.npmrc'
                            sh 'npm config set registry https://registry.npmjs.org/'
                            sh 'git config --global user.email "thomas@reggi.com"'
                            sh 'git config --global user.name "reggi"'
                            sh 'git checkout master'
                            sh 'git pull origin master --force'
                            sh 'npm run lerna-publish'
                        }
                    }
                }
            }
        }
    }
}
