plugins {
    kotlin("jvm") version "2.4.21"
}

repositories { mavenCentral() }

kotlin { jvmToolchain(21) }

// Mantém solução, teste e explicação juntos, sem incluir testes no JAR.
val desafios = listOf(
    "soma_de_dois", "parenteses_validos", "inverter_lista_ligada", "busca_binaria",
    "mesclar_listas_ordenadas", "compra_e_venda_de_acoes", "subarray_maximo",
    "subir_escadas", "anagrama_valido", "ciclo_em_lista_ligada"
)
kotlin.sourceSets {
    main {
        kotlin.setSrcDirs(desafios + "_shared")
        kotlin.exclude("**/*Test.kt")
    }
    test {
        kotlin.setSrcDirs(desafios + "_tests")
        kotlin.include("**/*Test.kt", "Casos.kt", "Listas.kt")
    }
}
sourceSets.test {
    resources.setSrcDirs(listOf("../../docs"))
    resources.include("casos/*.json")
}

dependencies {
    testImplementation(platform("org.junit:junit-bom:6.0.3"))
    testImplementation("org.junit.jupiter:junit-jupiter")
    testImplementation("com.google.code.gson:gson:2.14.0")
    testRuntimeOnly("org.junit.platform:junit-platform-launcher")
}

tasks.test {
    useJUnitPlatform()
    // Um erro de laço nos exercícios não deve prender a CI indefinidamente.
    systemProperty("junit.jupiter.execution.timeout.default", "10 s")
    testLogging { events("passed", "skipped", "failed") }
}
