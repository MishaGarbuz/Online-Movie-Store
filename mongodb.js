const { MongoClient, ObjectID } = require('mongodb')

const connectionURl = 'mongodb://127.0.0.1:27017'
const databaseName = 'OnlineMovieStore'

MongoClient.connect(connectionURl, { useNewUrlParser: true }, (error, client) => {
    if (error) {
        return console.log('Unable to connect to databse')
    }
    const db = client.db(databaseName)

    db.collection('Users').insertOne({
        FirstName: 'Michael',
        LastName: 'Garbuz',
        Address: '246 Bondi Road, Bondi, 2026, Sydney NSW Australia',
        Email: 'garbuzmichael@gmail.com',
        PhoneNumber: '0428157697',
        Password: 'ClickView',
        Age: 24,
        Admin: true,
        Staff: true
    }).then((result) => {
        console.log(result)
    }).catch((error) => {
        console.loog(error)
    })

    db.collection('Suppliers').insertMany([
        {
            SupplierName: 'Dovs Movie Store',
            SupplierAddress: '14 Napier Street, Dover Heights, 2000, Sydney NSW Australia',
            PhoneNumer: '0400000000',
            Categories: ['Action','Comedy','Romance']
        },
        {
            SupplierName: 'Michaels Horror Outlet',
            SupplierAddress: 'Suite 125, 26-32 Piramma Road, Pymont, 2009, Sydney NSW Australia',
            PhoneNumer: '0500000000',
            Categories: ['Horror','Comedy','Thriller']           
        }
    ], (error,result) => {
        if (error) {
            return console.log('Unable to insert suppliers')
        }

        console.log(result.ops)
    })

    db.collection('Movies').insertMany([
        {
            Name: 'The Shining',
            Runtime: 1.5,
            Category: 'Horror',
            Supplier: 'Michaels Horror Outlet',
            InStock: true,
            Remaining: 25,
            Rented: 15,
            Bought: 10
        },
        {
            Name: 'The Titanic',
            Runtime: 2.45,
            Category: 'Romance',
            Supplier: 'Dovs Movie Store',
            InStock: false,
            Remaining: 0,
            Rented: 15,
            Bought: 20
        },
        {
            Name: 'Central Intelligence',
            Runtime: 3.00,
            Category: 'Comedy',
            Supplier: 'Michaels Horror Outlet',
            InStock: true,
            Remaining: 45,
            Rented: 30,
            Bought: 0
        }

    ],(error,result) => {
        if (error) {
            return console.log('Could not insert movies')
        }

        console.log(result.ops)
    })

    db.collection('Orders').insertOne({
        CustomerName: 'Michael Garbuz',
        Movie: 'The Shining',
        Bought: false,
        Rented: true,
        ReturnDate: '2019-04-30',
        Returned: false
    }, (error,result) => {
        if (error) {
            return console.log('Could not insert order')
        }

        console.log(result.ops)
    })
})