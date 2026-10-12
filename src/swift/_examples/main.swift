// Gerado por npm run docs. Consulte os READMEs dos desafios.
import LiveCoding

guard let desafio = CommandLine.arguments.dropFirst().first else {
    fatalError("Informe o ID do desafio, como soma_de_dois.")
}
switch desafio {
case "soma_de_dois":
    print(somaDeDois([2, 7, 11, 15], 9) ?? []) // [0, 1]
case "parenteses_validos":
    print(parentesesValidos("{[()]}")) // true
case "inverter_lista_ligada":
    let cabeca = No(1, No(2, No(3)))
    let invertida = inverterListaLigada(cabeca)
    print(invertida?.valor ?? 0) // 3; as ligações são 3 → 2 → 1 → nil
case "busca_binaria":
    print(buscaBinaria([1, 3, 5, 7, 9], 7)) // 3
case "mesclar_listas_ordenadas":
    let mesclada = mesclarListasOrdenadas(No(1, No(3)), No(2, No(4)))
    print(mesclada?.valor ?? 0) // 1; a sequência é 1 → 2 → 3 → 4 → nil
case "compra_e_venda_de_acoes":
    print(maiorLucro([7, 1, 5, 3, 6, 4])) // 5
case "subarray_maximo":
    print(subarrayMaximo([-2, 1, -3, 4, -1, 2, 1, -5, 4]) ?? 0) // 6
case "subir_escadas":
    print(try subirEscadas(3)) // 3
case "anagrama_valido":
    print(anagramaValido("😀a😀", "😀😀a")) // true
case "ciclo_em_lista_ligada":
    let primeiro = No(1)
    let segundo = No(2, primeiro)
    primeiro.proximo = segundo
    defer { primeiro.proximo = nil; segundo.proximo = nil } // Libera o ciclo em ARC.
    print(temCiclo(primeiro)) // true
default:
    fatalError("Desafio desconhecido: " + desafio)
}
