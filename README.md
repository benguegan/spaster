docker-compose build --no-cache 
docker-compose up --force-recreate --no-deps

Options:
    -d, --detach        Detached mode: Run containers in the background,
                        print new container names. Incompatible with
                        --abort-on-container-exit.
    --no-deps           Don't start linked services.
    --force-recreate    Recreate containers even if their configuration
                        and image haven't changed.
    --build             Build images before starting containers.