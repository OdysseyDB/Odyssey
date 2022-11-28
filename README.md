# Odyssey

A simple, clean UI to display details about video games.

## Why a video game platform for MySql Project?

Although there are many platforms and services like Hotel booking, Online Shopping, Social media, etc, heavily rely of MySql or other databases, I wanted to show that even a simple looking, wikipedia for video games is also very much dependent on a database.

## Challenges faced

1. First, We needed data, like a lot of data. I found a website called [IGDB](https://www.igdb.com/) which provided a free API to get data about video games. Using the API, I wrote a python script to fetch all data from the API. The I had to convert all JSON to CSV using pandas library and then import the CSV to MySql. This took a lot of time and I had to do it multiple times to get all the data.

2. Data sanitization. The data was not clean, there were some games which had no name, some had no description, some had no cover image, some had no release date, etc. I had to write a python script to clean the data and remove all the games which had no name, description, cover image, etc.

3. The data was huge, it had 200,000+ rows. I had to write a python script to split the data into multiple CSV files and then import them to MySql. This was done to reduce the load on the database.

## How to run the project

_This involves multiple steps, so please read carefully_

### Step 1: Clone the repository

```bash
git clone https://github.com/OdysseyDB/Odyssey.git
```

### Step 2: Install dependencies

```bash
cd Odyssey
npm install \\ or yarn install
```

### Step 3: Create a MySql database

This project uses Prisma ORM to connect to the database. So, you need to create a database in MySql and then add the database credentials to the .env file.

```bash
# .env file (in the root directory where package.json is present)
DATABASE_URL="mysql://root:password@localhost:3306/odyssey"
APPLICATION_SECRET='9EbGeKgNjRnTqVtYv2y5A7CaFcHeMhPk'
```

_(Note: Replace password with your MySql password)_

### Step 4: Initialize the database

Use prisma to initialize the database. This will create all the tables and relations in the database.

```bash
npx prisma db push
```

### Step 5: Import the data

A file named `odysseyDB2.zip` is present in the root directory. It has been compressed using `.tar.xz` to reduce its size. Use [This](https://www.winzip.com/en/learn/tips/extract-files/tar-xz-file/#:~:text=Now%2C%20compressing%20and%20decompressing%20Tar,compressed%20file%20in%20just%20minutes!) to unzip it and import this file to your MySql database.

```bash
mysql -u root -p odyssey < odysseyDB
```

or

```bash
mysql> mysql -u root -p
mysql> use odyssey;
mysql> source odysseyDB
```

### Step 6: Start the server

This step requires NPM and Node installed on your system.

```bash
npm run dev // or yarn dev
```

### Step 7: Open the website

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


## ER Diagram

![ER Diagram](./public/ERD.svg)
