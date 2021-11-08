const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

console.log(path.join(__dirname, '../public'))

const app = express()
const port = process.env.PORT || 3000

const rootDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine','hbs')
app.set('views', viewsPath)
app.use(express.static(rootDir))
hbs.registerPartials(partialsPath)

app.get('/help', (req, res) => {
    res.render('help', {
        Helpanswer: 'You need to reboot',
        title: 'Help',
        name: 'Charlie'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'Me',
        name: 'KBT'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.city) {
        return res.send({
            error: 'You need provide a city'
        })
    } else { 
        geocode(req.query.city, (error, {lat, long, loc} = {}) => {
            if (error) {
                return res.send(error)
            }
            
            forecast({lat, long}, (error, data2) => {
                if (error) {
                    return res.send(error)
                }
                      
                res.send({
                    loc,
                    temp: data2,
                    // location: 'denver'
                })
            })

        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query.search);
    res.send({
        products: []
    })
})


app.get('', (req, res) => {
    res.render('index', {
        title:'Weather App',
        name: 'Denver'
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        error: "Help Article Not Found"
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found'
    })
})

app.listen(port, () => {
    console.log('Port ' + port)
})