pipeline {
    agent any
    
    environment {
        GITHUB_REPO = 'https://github.com/loyality7/gain-and-shine'
        DEPLOY_PATH = '/var/www/html'
        BACKUP_PATH = '/var/www/backup'
    }
    
    stages {
        stage('Checkout') {
            steps {
                // Clean workspace and checkout code
                cleanWs()
                git branch: 'main',
                    url: "${GITHUB_REPO}"
            }
        }

        stage('Backup Existing Site') {
            steps {
                // Create backup with timestamp
                sh """
                    sudo mkdir -p ${BACKUP_PATH}
                    sudo cp -r ${DEPLOY_PATH} ${BACKUP_PATH}/backup-\$(date +%Y%m%d_%H%M%S)
                """
            }
        }

        stage('Deploy') {
            steps {
                // Deploy the new files and set permissions
                sh """
                    # Copy files to deployment directory
                    sudo cp -r ./* ${DEPLOY_PATH}/
                    
                    # Set correct ownership and permissions
                    sudo chown -R www-data:www-data ${DEPLOY_PATH}
                    sudo chmod -R 755 ${DEPLOY_PATH}
                    
                    # Ensure directories are executable
                    sudo find ${DEPLOY_PATH} -type d -exec chmod 755 {} \\;
                    
                    # Ensure files are readable
                    sudo find ${DEPLOY_PATH} -type f -exec chmod 644 {} \\;
                """
            }
        }
    }
    
    post {
        success {
            echo "Website deployed successfully to ${DEPLOY_PATH}"
        }
        failure {
            // Rollback to latest backup if deployment fails
            sh """
                LATEST_BACKUP=\$(ls -t ${BACKUP_PATH} | head -n1)
                if [ ! -z "\${LATEST_BACKUP}" ]; then
                    sudo cp -r ${BACKUP_PATH}/\${LATEST_BACKUP}/* ${DEPLOY_PATH}/
                    sudo chown -R www-data:www-data ${DEPLOY_PATH}
                    sudo chmod -R 755 ${DEPLOY_PATH}
                    echo "Deployment failed - rolled back to previous version"
                fi
            """
        }
    }
}
