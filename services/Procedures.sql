DELIMITER $$
CREATE PROCEDURE `FetchPlatformGame`(IN platformId varchar(10))
BEGIN
SELECT 
    id , 
    name, 
    slug, 
    rating, 
    themes, 
    summary, 
    platforms, 
    created_at, 
    age_ratings 
from Game where platforms like 
    concat("[", platformId, ", %") or
    concat("% ", platformId, ", %") or
    concat("% ", platformId, "]")
limit 10;
END
$$
DELIMITER ;

DELIMITER $$
CREATE PROCEDURE `GetMaxPagesForPlatform`(IN platformId varchar(100))
BEGIN
SELECT CEIL(COUNT(*) / 10)
from Game where platforms like 
    concat("[", platformId, ", %") or
    concat("% ", platformId, ", %") or
    concat("% ", platformId, "]");
END
$$
DELIMITER ;


-- Triggers to increment and decrement follow counts
DELIMITER $$
CREATE TRIGGER UpdateGameFollowCountOnFollow
AFTER INSERT ON UserFollows FOR EACH ROW
BEGIN
  UPDATE Game SET Game.follows=Game.follows+1 WHERE Game.id=NEW.gameId;
END
$$
DELIMITER ;


DELIMITER $$
CREATE TRIGGER UpdateGameFollowCountOnUnFollow
AFTER DELETE ON UserFollows FOR EACH ROW
BEGIN
  UPDATE Game SET Game.follows=Game.follows-1 WHERE Game.id=OLD.gameId;
END
$$
DELIMITER ;