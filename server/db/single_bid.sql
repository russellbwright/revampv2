

SELECT * FROM bids 
FULL OUTER JOIN projects ON bids.projectid = projects.projectid
where bids.bidid = $1;