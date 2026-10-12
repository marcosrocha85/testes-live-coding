#pragma once
#include <cstddef>
#include <cstdint>
#include <span>
namespace desafios {
std::ptrdiff_t buscaBinaria(std::span<const std::int64_t> numeros, std::int64_t alvo);
}
