// Package subarraymaximo encontra a maior soma de um trecho contíguo não vazio.
package subarraymaximo

// SubarrayMaximo devolve soma e ok; uma entrada vazia produz ok=false.
func SubarrayMaximo(numeros []int64) (soma int64, ok bool) {
	if len(numeros) == 0 {
		return 0, false
	}
	// Começar no primeiro número preserva respostas negativas.
	atual, melhor := numeros[0], numeros[0]
	for _, valor := range numeros[1:] {
		atual = max(valor, atual+valor)
		melhor = max(melhor, atual)
	}
	return melhor, true
}
