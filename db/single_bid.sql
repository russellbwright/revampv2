SELECT * FROM bids 
FULL OUTER JOIN projects ON bids.projectid = projects.projectid
FULL OUTER JOIN images ON projects.projectid = images.projectid
where bids.bidid = $1;