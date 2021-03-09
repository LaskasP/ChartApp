import os
import csv

Years = {}
countries = {}
yearId = 0
countryId = 0
directory = os.path.join('H:\\', 'Projects\GitHub\ChartApp\Data\gapminder')
for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith(".csv"):
            finalData =[]
            with open('gapminder\\'+file) as csv_file:
                csv_reader = csv.reader(csv_file, delimiter=',')
                data = list(csv_reader)
                firstLine = data[:1][0]
                for year in firstLine[1:]:
                    if year not in Years.keys():
                        Years[year] = yearId
                        yearId += 1
                fileCountries = [x[0] for x in data[1:]]
                for country in fileCountries:
                    if country not in countries.keys():
                        countries[country] = countryId
                        countryId += 1
                for x in range(len(data)):
                    if x != 0:
                        for j in range(len(data[x])):
                            if j != 0:
                                year = data[0][j]
                                country = data[x][0]
                                id_year = Years[year]
                                id_country = countries[country]
                                finalData.append([id_country, id_year, data[x][j]])
            with open('DBMSReady\Table_'+file, 'w+', newline ='') as file_csv:
                write = csv.writer(file_csv)
                write.writerows(finalData)



with open('DBMSReady\Table_Years.csv', 'w+', newline ='') as file_csv:
    writer = csv.writer(file_csv)
    for key, value in Years.items():
        writer.writerow([key, value])

with open('DBMSReady\Table_Countries.csv', 'w+', newline ='') as file_csv:
    writer = csv.writer(file_csv)
    for key, value in countries.items():
        writer.writerow([key, value])

print(Years)
print(countries)

