package livecoding.subir_escadas

// Double permite rejeitar entradas fracionárias vindas de dados externos.
fun subirEscadas(degraus: Double): Long {
    require(degraus.isFinite() && degraus in 0.0..77.0 && degraus % 1.0 == 0.0) {
        "Degraus deve ser um inteiro de 0 a 77."
    }
    var anterior = 1L // Há uma sequência vazia para zero degraus.
    var atual = 1L
    for (degrau in 2..degraus.toInt()) {
        val seguinte = anterior + atual // Último passo de um ou dois degraus.
        anterior = atual
        atual = seguinte
    }
    return atual
}
