#pragma once
#include <cstdint>
#include <optional>
#include <span>
namespace desafios {
std::optional<std::int64_t> subarrayMaximo(std::span<const std::int64_t> numeros);
}
