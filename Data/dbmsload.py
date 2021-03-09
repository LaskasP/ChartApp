import MySQLdb
import os


connection = MySQLdb.connect(
                host = 'localhost',
                user = 'maximosstratis',
                passwd = 'maxstr123s')  # create the connection

cursor = connection.cursor()     # get the cursor
cursor.execute("DROP DATABASE chartapp")

cursor.execute("CREATE DATABASE chartapp")

cursor.execute("USE chartapp")

tablenames = []

# directory = os.path.join('H:\\', 'Projects\GitHub\ChartApp\Data\DBMSReady')
files_dir = "C:/Users/max/Documents/GitHub/ChartApp/Data/DBMSReady/"
for root, dirs, files in os.walk(files_dir):
    for file in files:
        if file.endswith(".csv"):
            tablenames.append(file.split('.')[0])

tables = []



cursor.execute("CREATE TABLE Countries (country_name VARCHAR(50) NOT NULL, country_id int PRIMARY KEY)")
cursor.execute("LOAD DATA LOCAL INFILE '" + files_dir + "Countries.csv' INTO TABLE countries FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '\n'")

cursor.execute("CREATE TABLE Years (year_value INT NOT NULL, year_id int PRIMARY KEY)")
cursor.execute("LOAD DATA LOCAL INFILE '" + files_dir + "Years.csv' INTO TABLE years FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '\n'")


for name in tablenames:
    if name != "Countries" and name != "Years":
        cursor.execute("CREATE TABLE " + name + " (country_id INT, year_id INT, value FLOAT, FOREIGN KEY (country_id) REFERENCES Countries(country_id), FOREIGN KEY (year_id) REFERENCES Years(year_id), PRIMARY KEY (country_id,year_id))")
        cursor.execute("LOAD DATA LOCAL INFILE '" + files_dir + name + ".csv' INTO TABLE " + name + " FIELDS TERMINATED BY ',' ENCLOSED BY '\"' LINES TERMINATED BY '\n'")

cursor.close()
