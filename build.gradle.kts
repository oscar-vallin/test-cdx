plugins {
    id("com.coditory.webjar") version "1.0.3" //https://github.com/coditory/gradle-webjar-plugin
   // id("com.dorongold.task-tree") version "1.5" //gradle build taskTree
}


/*tasks.register<Copy>("copyReactRoot") {
    from("$buildDir")
    include("*.*")
    into("$buildDir/webjar/static")
}*/

/*tasks.register<Copy>("copyReactRoot2") {
    from("$buildDir")
    include("*.*")
    into("$buildDir/resources/main/static")
}*/

/*tasks.register<Copy>("copyReactRoot3") {
    from("$buildDir/resources/main/static")
    include("*.*")
    into("$buildDir/webjar/static")
}*/

/*tasks.register<Copy>("copyReactRoot4") {
    from("$buildDir")
    include("*.*")
    into("$buildDir/static")
}*/

/*tasks.jar{//processResources
    dependsOn( "copyReactRoot2", "copyReactRoot4")
}*/

/*tasks.processResources{
    dependsOn(*//*"copyReactRoot",*//* "copyReactRoot2"*//*, "copyReactRoot3"*//*, "copyReactRoot4")
}*/

/*task<Exec>("npmExtractRoutes") {
    commandLine("npm", "run", "extract-routes")
}*/

tasks.webjarBuild{
    //dependsOn("npmExtractRoutes")
    doLast{
        //println("hello last")
        copy {
            from("$buildDir")
            include("*.*")
            into("$buildDir/static")
        }

        copy {
            from("$buildDir")
            include("*.*")
            into("$buildDir/webjar/static")
        }

        /*copy {
            from("$buildDir/../internals")
            include("parent-routes.json")
            into("$buildDir/static")
        }

        copy {
            from("$buildDir/../internals")
            include("parent-routes.json")
            into("$buildDir/webjar/static")
        }*/
    }
}

/*tasks.test{
    environment("CI", "true")
}*/

/*tasks.test{
    doFirst{
        environment("CI", "true")
    }
}*/

webjar {
    distDir = "build/static"
    //distDir = "build"
    //webjarDir = "react"

    /*taskNames {
        clean = "clean"
        build = "build"
        test = "build"
        lint = "build"
        watch = "watch"
    }*/
}
//CI=true gradle build