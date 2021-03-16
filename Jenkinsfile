@Library('jenkins-shared') _

pipeline {
  
  agent {
    docker {
      image 'squidfunk/mkdocs-material'
      args '--entrypoint=""'
    }
  }
  
  environment {
    SLACK_CHANNEL_NAME = '#devops-alerts'
    FAILURE_STAGE = 'Unknown'
  }
  
  stages {
    
    stage('Init') {
      steps {
        script {
          slack.start()
          deploy = GIT_BRANCH=='origin/master'
        }
      }
      post {
        failure {
          script { env.FAILURE_STAGE = 'Init' }
        }
      }
    }
    stage('Deploy') {
      when {
        expression { return deploy }
      }
      steps {
        withCredentials([
          string(credentialsId: 'github-devops-token', variable: 'GH_TOKEN')
        ]) {
          sh 'mkdocs gh-deploy'
        }
      }
      post {
        failure {
          script { env.FAILURE_STAGE = 'Deploy' }
        }
      }
    }
  }
  post {
    success {
      script {
        slack.success()
      }
    }
    failure {
      script {
        slack.failure()
      }
    }
  }
}
