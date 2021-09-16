import com.github.gradle.node.yarn.task.YarnTask

plugins {
    //id("com.coditory.webjar") version "1.0.3" //https://github.com/coditory/gradle-webjar-plugin
    id("com.github.node-gradle.node") version "3.1.0"
    java
    `maven-publish`
}

group = "com.k2u"
version = "1.0.0"

val awsAccessKeyId: String = (System.getenv("AWS_ACCESS_KEY_ID")?.toString() ?: findProperty("AWS_ACCESS_KEY_ID")?.toString()) ?: ""
val awsSecretAccessKey:String  = (System.getenv("AWS_SECRET_ACCESS_KEY")?.toString() ?: findProperty("AWS_SECRET_ACCESS_KEY")?.toString()) ?: ""


java {
    sourceCompatibility = JavaVersion.VERSION_11
}

node {
    version.set("14.17.5")
    yarnVersion.set("1.22.11")

}
task<YarnTask>("yarnInstall") {
    dependsOn(tasks.yarnSetup)
    yarnCommand.set(listOf("install"))
}

task<YarnTask>("buildReact") {
    dependsOn("yarnInstall", "extractRoutes")
    yarnCommand.set(listOf("run", "build"))
//    args.set(listOf("--out-dir", "./src/main/resources/static/dist"))
//    inputs.dir("src")
//    outputs.dir("")

    doLast {
        copy {
            from("$buildDir")
            include("*.*")
            into("$buildDir/static")
        }
        copy {
            from("$buildDir/static")
            include("**/*.*")
            into("./src/main/resources/static")
        }
    }
}

tasks.processResources {
    dependsOn("buildReact")
}
tasks.clean {
    delete(file("node_modules"))
    delete(file("src/main/resources/static"))
}

task<YarnTask>("extractRoutes"){
    //args = ['run', 'extract-routes']
    yarnCommand.set(listOf("run", "extract-routes"))
    doLast{
        copy {
            from("$buildDir/../internals")
            include("parent-routes.json")
            into("./src/main/resources/static")
        }
    }
}

task<YarnTask>("yarnTest") {
    yarnCommand.set(listOf("run", "test:forbuild"))
}

task<YarnTask>("yarnLint") {
    yarnCommand.set(listOf("run", "lint"))
}

tasks.test {
    dependsOn("yarnTest")
}

tasks.check {
    dependsOn("yarnLint")
}

publishing {
    publications {
        create<MavenPublication>("cdx-dash-react-ts") {
            from(components["java"])
        }
    }
    repositories {
        maven {
            setUrl("s3://k2u-s3-codebuild-artifacts/")
            credentials(AwsCredentials::class) {
                accessKey = awsAccessKeyId
                secretKey = awsSecretAccessKey
            }
        }
    }
}

//CI=true gradle build