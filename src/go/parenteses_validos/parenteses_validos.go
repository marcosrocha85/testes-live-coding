// Package parentesesvalidos verifica pares e sua ordem de fechamento.
package parentesesvalidos

func ParentesesValidos(texto string) bool {
	var pilha []rune
	for _, simbolo := range texto {
		switch simbolo {
		case '(', '[', '{':
			pilha = append(pilha, simbolo)
		case ')', ']', '}':
			if len(pilha) == 0 {
				return false
			}
			abertura := pilha[len(pilha)-1]
			if (simbolo == ')' && abertura != '(') ||
				(simbolo == ']' && abertura != '[') ||
				(simbolo == '}' && abertura != '{') {
				return false
			}
			pilha = pilha[:len(pilha)-1]
		default:
			return false // O contrato aceita somente os seis símbolos.
		}
	}
	return len(pilha) == 0
}
