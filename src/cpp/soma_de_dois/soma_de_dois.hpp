#pragma once
#include <array>
#include <cstddef>
#include <cstdint>
#include <optional>
#include <span>

namespace desafios {
std::optional<std::array<std::size_t, 2>> somaDeDois(std::span<const std::int64_t> numeros, std::int64_t alvo);
}
