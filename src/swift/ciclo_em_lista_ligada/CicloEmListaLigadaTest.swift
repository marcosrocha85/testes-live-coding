import Testing
import LiveCoding

@Suite struct CicloEmListaLigadaTest {
    @Test(arguments: casos("ciclo_em_lista_ligada", entrada: EntradaCiclo.self, saida: Bool.self))
    func compartilhados(_ caso: Caso<EntradaCiclo, Bool>) {
        let lista = montarLista(caso.input.valores)
        defer { desmontarLista(lista.nos) }
        if caso.input.indiceCiclo >= 0 { lista.nos.last?.proximo = lista.nos[caso.input.indiceCiclo] }
        let ponteiros = lista.nos.map { $0.proximo.map(ObjectIdentifier.init) }
        #expect(temCiclo(lista.cabeca) == caso.expected)
        #expect(lista.nos.map { $0.proximo.map(ObjectIdentifier.init) } == ponteiros)
    }

    @Test func todasAsPosicoesSemAlterarNos() {
        for tamanho in 0...20 {
            for retorno in -1..<tamanho {
                let lista = montarLista(Array(repeating: 1, count: tamanho))
                defer { desmontarLista(lista.nos) }
                if retorno >= 0 { lista.nos.last?.proximo = lista.nos[retorno] }
                let ponteiros = lista.nos.map { $0.proximo.map(ObjectIdentifier.init) }
                #expect(temCiclo(lista.cabeca) == (retorno >= 0))
                #expect(lista.nos.map { $0.proximo.map(ObjectIdentifier.init) } == ponteiros)
            }
        }
    }

    @Test func arcLiberaCicloAposDesmontar() {
        weak var observador: No?
        do {
            let no = No(1)
            observador = no
            no.proximo = no
            #expect(temCiclo(no))
            no.proximo = nil
        }
        #expect(observador == nil)
    }
}
