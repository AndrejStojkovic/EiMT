CREATE TABLE countries
(
    id        BIGSERIAL PRIMARY KEY NOT NULL,
    name      VARCHAR(255) NOT NULL,
    continent VARCHAR(255) NOT NULL
);

CREATE TABLE hosts
(
    id         BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP    NOT NULL,
    updated_at TIMESTAMP    NOT NULL,
    name       VARCHAR(255) NOT NULL,
    surname    VARCHAR(255) NOT NULL,
    country_id BIGINT       NOT NULL REFERENCES countries (id) ON DELETE CASCADE
);

CREATE TABLE accommodations
(
    id         BIGSERIAL PRIMARY KEY,
    created_at TIMESTAMP    NOT NULL,
    updated_at TIMESTAMP    NOT NULL,
    name       VARCHAR(255) NOT NULL,
    category   VARCHAR(255) NOT NULL,
    host_id    BIGINT       NOT NULL REFERENCES hosts (id) ON DELETE CASCADE,
    condition  VARCHAR(255) NOT NULL,
    num_rooms  INTEGER      NOT NULL
);