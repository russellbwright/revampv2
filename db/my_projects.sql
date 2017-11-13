SELECT * FROM projects 
FULL OUTER JOIN images ON projects.projectid = images.projectid
where images.userid = $1;


