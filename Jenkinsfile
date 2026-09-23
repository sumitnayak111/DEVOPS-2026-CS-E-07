pipeline {

    agent any

    options {

        disableConcurrentBuilds()

        skipDefaultCheckout(true)

    }

    environment {

        // Jenkins credential ID

        GIT_CREDENTIALS = 'Hospital_Jenkins_id'

        // Feedback file

        FEEDBACK_FILE = 'jenkins-feedback.md'

        // GitHub repository

        GITHUB_REPO = 'https://github.com/sumitnayak111/DEVOPS-2026-CS-E-07.git'

    }

    stages {

        // ==================================================

        // 1. CHECKOUT PROJECT

        // ==================================================

        stage('Checkout') {

            steps {

                checkout scm

                echo '======================================'

                echo 'Hospital Management System'

                echo 'Source code checkout completed'

                echo '======================================'

            }

        }

        // ==================================================

        // 2. CHECK WHETHER THIS IS JENKINS FEEDBACK COMMIT

        // ==================================================

        stage('Check Jenkins Feedback Commit') {

            steps {

                script {

                    def commitMessage = sh(

                        script: 'git log -1 --pretty=%B',

                        returnStdout: true

                    ).trim()

                    def changedFiles = sh(

                        script: 'git diff-tree --no-commit-id --name-only -r HEAD',

                        returnStdout: true

                    ).trim()

                    echo 'Latest commit:'

                    echo commitMessage

                    echo 'Changed files:'

                    echo changedFiles

                    def files = changedFiles

                        .split('\\n')

                        .collect { it.trim() }

                        .findAll { it }

                    /*

                     * Jenkins itself creates:

                     *

                     * [JENKINS-FEEDBACK] Update feedback

                     *

                     * If GitHub webhook triggers Jenkins again because

                     * of this commit, Jenkins will skip the testing stages.

                     *

                     * This prevents an infinite loop.

                     */

                    if (

                        commitMessage.contains('[JENKINS-FEEDBACK]') ||

                        (

                            files.size() == 1 &&

                            files[0] == 'jenkins-feedback.md'

                        )

                    ) {

                        env.SKIP_FEEDBACK_PIPELINE = 'true'

                        echo '======================================'

                        echo 'JENKINS FEEDBACK COMMIT DETECTED'

                        echo 'Pipeline will be skipped.'

                        echo 'This prevents an infinite webhook loop.'

                        echo '======================================'

                    } else {

                        env.SKIP_FEEDBACK_PIPELINE = 'false'

                        echo 'Normal developer commit detected.'

                        echo 'Pipeline will continue.'

                    }

                }

            }

        }

        // ==================================================

        // 3. INSTALL CLIENT DEPENDENCIES

        // ==================================================

        stage('Install Client Dependencies') {

            when {

                expression {

                    env.SKIP_FEEDBACK_PIPELINE != 'true'

                }

            }

            steps {

                dir('client') {

                    sh 'npm ci'

                }

            }

        }

        // ==================================================

        // 4. INSTALL SERVER DEPENDENCIES

        // ==================================================

        stage('Install Server Dependencies') {

            when {

                expression {

                    env.SKIP_FEEDBACK_PIPELINE != 'true'

                }

            }

            steps {

                dir('server') {

                    sh 'npm ci'

                }

            }

        }

        // ==================================================

        // 5. BUILD REACT CLIENT

        // ==================================================

        stage('Build Client') {

            when {

                expression {

                    env.SKIP_FEEDBACK_PIPELINE != 'true'

                }

            }

            steps {

                dir('client') {

                    echo 'Building React client...'

                    sh 'npm run build'

                    echo 'React client build completed successfully.'

                }

            }

        }

        // ==================================================

        // 6. CHECK NODE/EXPRESS SERVER

        // ==================================================

        stage('Check Server') {

            when {

                expression {

                    env.SKIP_FEEDBACK_PIPELINE != 'true'

                }

            }

            steps {

                dir('server') {

                    echo 'Checking Node.js server syntax...'

                    sh 'node --check server.js'

                    echo 'Server syntax check passed.'

                }

            }

        }

        // ==================================================

        // 7. GENERATE JENKINS FEEDBACK FILE

        // ==================================================

        stage('Generate Jenkins Feedback') {

            when {

                expression {

                    env.SKIP_FEEDBACK_PIPELINE != 'true'

                }

            }

            steps {

                script {

                    def feedback = """

# Hospital Management System

# Jenkins CI Feedback

---

## Build Information

| Item | Value |

|---|---|

| Build Number | ${env.BUILD_NUMBER} |

| Job Name | ${env.JOB_NAME} |

| Branch | ${env.BRANCH_NAME} |

| Commit | ${env.GIT_COMMIT} |

| Jenkins Result | ${currentBuild.currentResult} |

| Date | ${new Date()} |

---

## CI Checks

| Check | Result |

|---|---|

| Git Checkout | PASS |

| Client Dependencies | PASS |

| Server Dependencies | PASS |

| React Client Build | PASS |

| Node.js Server Syntax | PASS |

---

## Project

Hospital Management System

### Client

React + Vite

### Server

Node.js + Express.js

### Database

MongoDB

---

## Overall Jenkins Result

### ${currentBuild.currentResult}

---

Generated automatically by Jenkins.

"""

                    writeFile(

                        file: env.FEEDBACK_FILE,

                        text: feedback

                    )

                    echo '======================================'

                    echo 'JENKINS FEEDBACK CREATED'

                    echo '======================================'

                    echo feedback

                }

            }

        }

        // ==================================================

        // 8. PUSH JENKINS FEEDBACK TO MAIN

        // ==================================================

        stage('Push Feedback to Main') {

            when {

                allOf {

                    expression {

                        env.SKIP_FEEDBACK_PIPELINE != 'true'

                    }

                    branch 'main'

                }

            }

            steps {

                /*

                 * Your Jenkins credential is a Secret Text credential.

                 *

                 * Credential ID:

                 * Hospital_Jenkins_id

                 */

                withCredentials([

                    string(

                        credentialsId: env.GIT_CREDENTIALS,

                        variable: 'GITHUB_TOKEN'

                    )

                ]) {

                    sh '''

                        echo "Preparing Jenkins feedback commit..."

                        git config user.name "Jenkins"

                        git config user.email "jenkins@hospital-management.local"

                        git add jenkins-feedback.md

                        if git diff --cached --quiet; then

                            echo "No feedback changes found."

                        else

                            git commit -m "[JENKINS-FEEDBACK] Update feedback"

                            echo "Pushing Jenkins feedback to main..."

                            git push https://x-access-token:${GITHUB_TOKEN}@github.com/sumitnayak111/DEVOPS-2026-CS-E-07.git HEAD:main

                            echo "Jenkins feedback pushed successfully."

                        fi

                    '''

                }

            }

        }

    }

    // ======================================================

    // POST BUILD ACTIONS

    // ======================================================

    post {

        always {

            echo '======================================'

            echo 'JENKINS BUILD FINISHED'

            echo "BUILD STATUS: ${currentBuild.currentResult}"

            echo '======================================'

            archiveArtifacts(

                artifacts: 'jenkins-feedback.md',

                fingerprint: true,

                allowEmptyArchive: true

            )

        }

        success {

            echo '======================================'

            echo 'SUCCESS'

            echo 'Hospital Management System CI passed.'

            echo '======================================'

        }

        failure {

            echo '======================================'

            echo 'BUILD FAILED'

            echo 'Please check the Jenkins Console Output.'

            echo '======================================'

        }

    }

}