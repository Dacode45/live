/* -u user_name -p password */

CREATE TABLE base_cards (
    id BIGINT UNSIGNED NOT NULL,
    creator_id BIGINT UNSIGNED NOT NULL,
    time_created TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    name VARCHAR(255) NOT NULL,
    text TEXT,
    thumb_url VARCHAR(255),
    live_id BIGINT UNSIGNED,    --pulled from app_data
    live_id_tag VARCHAR(255),    --pulled from app_data
    PRIMARY KEY (id),
    FOREIGN key (creator_id) REFERENCES creators (creator_id)
) engine = INNODB DEFAULT character SET = utf8 COLLATE = utf8_general_ci;

CREATE TABLE live_cards (
    live_id BIGINT UNSIGNED NOT NULL,
    id BIGINT UNSIGNED NOT NULL,
    creator_id BIGINT UNSIGNED,
    name VARCHAR(255) NOT NULL,
    PRIMARY KEY (live_id),
    FOREIGN key (id) REFERENCES base_cards (id)
) engine = INNODB DEFAULT character SET = utf8 COLLATE = utf8_general_ci;

CREATE TABLE creators (
    creator_id BIGINT UNSIGNED NOT NULL,
    creator_name VARCHAR(255) NOT NULL,
    PRIMARY KEY (creator_id)
) engine = INNODB DEFAULT character SET = utf8 COLLATE = utf8_general_ci;

--Insert card story into database, populate res_x vals from response json object
--creator_id has to exist in creators table before populating base_cards
INSERT INTO base_cards (id, creator_id, name, text, thumb_url, live_id, live_id_tag) VALUES
    (res_id, res_creator_id, res_name, res_text, res_thumb_url, res_live_id, res_live_id_tag);

--Attach card story to a live card
INSERT INTO live_cards (live_id, id, creator_id, name) VALUES
    (res_live_id, res_id, res_created_by, res_live_id_tag);
    
--Insert creator name (ideally this would be pulled from login information)
INSERT INTO creators (creator_id, creator_name) VALUES
    (res_creator_id, "creator_name");
    
--Pull grouped card stories by live id, stories organized with most recent first
SELECT live_cards.live_id, live_cards.name,
    base_cards.name, base_cards.creator_id, base_cards.text,
    base_cards.time_created, base_cards.thumb_url
FROM live_cards
    JOIN base_cards on (live_cards.id=base_cards.id)
WHERE live_cards.live_id = <req_live_id>
ORDER BY base_cards.time_created desc;
    
--Pull live id category by story id
SELECT live_id, name, id FROM live_cards WHERE id = <req_id>;