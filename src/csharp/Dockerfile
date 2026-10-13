# SDK .NET oficial e sistema base fixados pela identidade do conteúdo.
FROM mcr.microsoft.com/dotnet/sdk:10.0.100-noble@sha256:c7445f141c04f1a6b454181bd098dcfa606c61ba0bd213d0a702489e5bd4cd71
RUN useradd --create-home --uid 10001 runner \
    && mkdir -p /app/src/csharp \
    && chown -R runner:runner /app
ENV DOTNET_CLI_TELEMETRY_OPTOUT=1 \
    DOTNET_NOLOGO=1 \
    DOTNET_CLI_HOME=/home/runner \
    NUGET_PACKAGES=/home/runner/.nuget/packages
WORKDIR /app/src/csharp
COPY --chown=runner:runner src/csharp/ ./
COPY --chown=runner:runner docs/casos/ /app/docs/casos/
USER runner
RUN dotnet restore LiveCoding.slnx --locked-mode
CMD ["sh", "executar.sh", "check"]
