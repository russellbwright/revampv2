SELECT * FROM projects 
FULL OUTER JOIN images ON projects.projectid = images.projectid
where images.projectid = $1;