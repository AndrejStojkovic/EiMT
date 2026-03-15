ALTER TABLE accommodations
    ADD rented BOOLEAN;

ALTER TABLE accommodations
    ALTER COLUMN rented SET NOT NULL;