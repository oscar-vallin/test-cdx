import com.github.gradle.node.yarn.task.YarnTask

plugins {
    //id("com.coditory.webjar") version "1.0.3" //https://github.com/coditory/gradle-webjar-plugin
    id("com.github.node-gradle.node") version "3.1.0"
    java
}

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


//CI=true gradle build