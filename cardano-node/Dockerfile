FROM inputoutput/cardano-node:1.35.3

COPY config/ config/

ENV NETWORK=preprod
ENV CARDANO_NODE_SOCKET_PATH=/ipc/node.socket
ENV NETWORK_MAGIC=1

ENTRYPOINT [ "cardano-node", "run", \
    "--topology", "config/topology.json", \
    "--database-path", "data/db", \
    "--socket-path", "/ipc/node.socket", \
# use 0.0.0.0 for preprod (https://stackoverflow.com/questions/73742197/cardano-pre-production-testnet-trconnecterror)
    "--host-addr", "0.0.0.0", \
    "--port", "1337", \
    "--config", "config/config.json" ]
