// Gerado por npm run docs. Consulte os READMEs dos desafios.
using LiveCoding;

static void Exigir(bool condicao)
{
    if (!condicao) throw new InvalidOperationException("Resultado inesperado no exemplo.");
}

string id = args.Length > 0 ? args[0] : "soma_de_dois";
Console.Write(id + ": ");
switch (id)
{
    case "soma_de_dois":
        {
            var par = SomaDeDois.Resolver([2, 7, 11, 15], 9);
            Exigir(par == (0, 1));
            Console.WriteLine(par); // (0, 1)
            break;
        }
    case "parenteses_validos":
        {
            bool resultado = ParentesesValidos.Validar("{[()]}");
            Exigir(resultado);
            Console.WriteLine(resultado); // True
            break;
        }
    case "inverter_lista_ligada":
        {
            var terceiro = new No(3);
            var segundo = new No(2, terceiro);
            var primeiro = new No(1, segundo);
            No? resultado = InverterListaLigada.Inverter(primeiro);
            Exigir(ReferenceEquals(resultado, terceiro));
            Exigir(ReferenceEquals(terceiro.Proximo, segundo));
            Exigir(ReferenceEquals(segundo.Proximo, primeiro) && primeiro.Proximo is null);
            Console.WriteLine(resultado?.Valor); // 3; 3 → 2 → 1 → null
            break;
        }
    case "busca_binaria":
        {
            int indice = BuscaBinaria.Buscar([1, 3, 5, 7, 9], 7);
            Exigir(indice == 3);
            Console.WriteLine(indice); // 3
            break;
        }
    case "mesclar_listas_ordenadas":
        {
            var tres = new No(3);
            var quatro = new No(4);
            var um = new No(1, tres);
            var dois = new No(2, quatro);
            No? resultado = MesclarListasOrdenadas.Mesclar(um, dois);
            Exigir(ReferenceEquals(resultado, um) && ReferenceEquals(um.Proximo, dois));
            Exigir(ReferenceEquals(dois.Proximo, tres) && ReferenceEquals(tres.Proximo, quatro));
            Exigir(quatro.Proximo is null);
            Console.WriteLine(resultado?.Valor); // 1; 1 → 2 → 3 → 4 → null
            break;
        }
    case "compra_e_venda_de_acoes":
        {
            long lucro = CompraEVendaDeAcoes.MaiorLucro([7, 1, 5, 3, 6, 4]);
            Exigir(lucro == 5);
            Console.WriteLine(lucro); // 5
            break;
        }
    case "subarray_maximo":
        {
            long? soma = SubarrayMaximo.Somar([-2, 1, -3, 4, -1, 2, 1, -5, 4]);
            Exigir(soma == 6);
            Console.WriteLine(soma); // 6
            break;
        }
    case "subir_escadas":
        {
            long formas = SubirEscadas.Contar(5);
            Exigir(formas == 8);
            Console.WriteLine(formas); // 8
            break;
        }
    case "anagrama_valido":
        {
            bool resultado = AnagramaValido.Validar("😀a😀", "😀😀a");
            Exigir(resultado);
            Console.WriteLine(resultado); // True
            break;
        }
    case "ciclo_em_lista_ligada":
        {
            var primeiro = new No(1);
            var segundo = new No(2, primeiro);
            primeiro.Proximo = segundo;
            bool resultado = CicloEmListaLigada.TemCiclo(primeiro);
            Exigir(resultado && ReferenceEquals(primeiro.Proximo, segundo));
            Exigir(ReferenceEquals(segundo.Proximo, primeiro));
            Console.WriteLine(resultado); // True
            break;
        }
    default:
        Console.Error.WriteLine("ID de desafio inválido.");
        return 2;
}
return 0;
