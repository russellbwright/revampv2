DELETE FROM bids WHERE projectid = $1;
DELETE FROM projects WHERE projectid = $1;
