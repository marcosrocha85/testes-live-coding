#pragma once
#include "../_shared/no.hpp"
#include <nlohmann/json.hpp>
#include <algorithm>
#include <cstdint>
#include <fstream>
#include <iostream>
#include <memory>
#include <random>
#include <stdexcept>
#include <string>
#include <vector>

namespace testes {
using Json = nlohmann::json;
using Numeros = std::vector<std::int64_t>;
inline std::size_t verificacoes = 0;
inline std::size_t casosJson = 0;
inline std::string contexto;

inline void exigir(bool condicao, const std::string& mensagem) {
    ++verificacoes;
    if (!condicao) throw std::runtime_error(contexto + ": " + mensagem);
}
inline Json casos(const std::string& id) {
    std::ifstream arquivo("docs/casos/" + id + ".json");
    if (!arquivo) throw std::runtime_error("Não foi possível ler os casos de " + id);
    Json dados;
    arquivo >> dados; // Inteiros do JSON são lidos como inteiros, sem passar por double.
    casosJson += dados.size();
    return dados;
}
inline Numeros numerosAleatorios(std::mt19937& gerador, int minimo = -20, int maximo = 20) {
    Numeros valores(static_cast<std::size_t>(std::uniform_int_distribution<int>(0, 35)(gerador)));
    for (auto& valor : valores) valor = std::uniform_int_distribution<int>(minimo, maximo)(gerador);
    return valores;
}

// Cada unique_ptr possui um nó. As ligações cruas não possuem nem destroem outros nós.
// Assim até uma lista longa ou cíclica é liberada sem recursão ou dupla liberação.
struct Lista {
    std::vector<std::unique_ptr<desafios::No>> donos;
    std::vector<desafios::No*> nos;
    explicit Lista(const Numeros& valores) {
        for (const auto valor : valores) {
            donos.push_back(std::make_unique<desafios::No>(desafios::No{valor}));
            nos.push_back(donos.back().get());
        }
        for (std::size_t i = 1; i < nos.size(); ++i) nos[i - 1]->proximo = nos[i];
    }
    desafios::No* cabeca() const { return nos.empty() ? nullptr : nos.front(); }
};

inline void conferirLista(desafios::No* resultado, const std::vector<desafios::No*>& ordem, const Numeros& valores) {
    exigir(ordem.size() == valores.size(), "referência de nós e valores compatível");
    for (std::size_t i = 0; i < ordem.size(); ++i) {
        exigir(resultado == ordem[i], "identidade e ordem dos nós");
        exigir(resultado->valor == valores[i], "valores não mudaram");
        const auto seguinte = i + 1 < ordem.size() ? ordem[i + 1] : nullptr;
        exigir(resultado->proximo == seguinte, "ligação aponta para o próximo nó esperado");
        resultado = resultado->proximo;
    }
    exigir(resultado == nullptr, "cauda termina sem ciclo ou nós extras");
}

void somaDeDois();
void parentesesValidos();
void inverterListaLigada();
void buscaBinaria();
void mesclarListasOrdenadas();
void maiorLucro();
void subarrayMaximo();
void subirEscadas();
void anagramaValido();
void temCiclo();
}
