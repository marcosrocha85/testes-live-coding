// Package compraevendadeacoes respeita a ordem dos dias de compra e venda.
package compraevendadeacoes

func MaiorLucro(precos []int64) int64 {
	if len(precos) == 0 {
		return 0
	}
	menor, lucro := precos[0], int64(0)
	for _, preco := range precos[1:] {
		// O menor preço ainda pertence a um dia anterior à venda atual.
		lucro = max(lucro, preco-menor)
		menor = min(menor, preco)
	}
	return lucro
}
