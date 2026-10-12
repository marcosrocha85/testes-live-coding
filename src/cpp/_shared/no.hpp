#pragma once
#include <cstdint>

namespace desafios {
// proximo apenas liga os nós: quem os criou continua responsável pela memória.
struct No {
    std::int64_t valor;
    No* proximo = nullptr;
};
}
