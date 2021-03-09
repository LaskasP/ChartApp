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

directory = os.path.join('C:\\', 'Users\max\Documents\GitHub\ChartApp\Data\DBMSReady')
for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith(".csv"):
            tablenames.append(file.split('.')[0][6:])

tables = []

cursor.execute("CREATE TABLE Countries (country_name VARCHAR(50) NOT NULL, country_id int PRIMARY KEY)")
cursor.execute("CREATE TABLE Years (year_value INT NOT NULL, year_id int PRIMARY KEY)")

for name in tablenames:
    if name != "Countries" and name != "Years":
        tables.append("CREATE TABLE " + name + " (country_id INT, year_id INT, value INT, FOREIGN KEY (country_id) REFERENCES Countries(country_id), FOREIGN KEY (year_id) REFERENCES Years(year_id), PRIMARY KEY (country_id,year_id))")

for cmd in tables:
    cursor.execute(cmd)

cursor.close()
