const chai = require(`chai`)
const chaiHttp = require(`chai-http`)
const expect = require(`chai`).expect;

require(`dotenv`).config()

chai.use(chaiHttp)

const api = chai.request(process.env.URL)

describe(`QA Test Investree`, () => {
    it(`Validate Status Code`, (done) => {
        api.get("/entries")
        .end((err, res) => {
            expect(res.status).to.equals(200)
            done()
        })
    }).timeout(15000)
    it(`Validate Response Body`, (done) => {
        api.get("/entries")
        .end((err, res) => {
            expect(res.body).to.be.an(`object`)
            expect(res.body).to.have.all.keys(`count`, `entries`)
            expect(res.body.count).to.be.a(`number`)
            expect(res.body.entries).to.be.an(`array`)
            const entries = res.body.entries
            entries.forEach(e => {
                expect(e).to.have.all.keys(`API`, `Description`, `Auth`, `HTTPS`, `Cors`, `Link`, `Category`)
                expect(e.API).to.be.a(`string`)
                expect(e.Description).to.be.a(`string`)
                expect(e.Auth).to.be.a(`string`)
                expect(e.HTTPS).to.be.a(`boolean`)
                expect(e.Cors).to.be.a(`string`)
                expect(e.Link).to.be.a(`string`)
                expect(e.Category).to.be.a(`string`)
            });
            const total = entries.length
            expect(res.body.count).to.be.equals(total)
            done()
        })
    }).timeout(15000)
    it(`Validate Headers`, (done) => {
        api.get("/entries")
        .end((err, res) => {
            expect(res.header).to.be.an(`object`)
            expect(res.header).to.have.all.keys(`access-control-allow-origin`, `content-type`, `date`, `server`, `x-rate-limit-duration`, `x-rate-limit-limit`, `x-rate-limit-request-forwarded-for`, `x-rate-limit-request-remote-addr`, `connection`, `transfer-encoding`)
            done()
        })
    }).timeout(15000)
    it(`Validate Status Code With Valid Param`, (done) => {
        api.get("/entries?title=at")
        .end((err, res) => {
            expect(res.status).to.equals(200)
            done()
        })
    }).timeout(15000)
    it(`Validate Response Body with valid param`, (done) => {
        api.get("/entries?title=at")
        .end((err, res) => {
            expect(res.body).to.be.an(`object`)
            expect(res.body).to.have.all.keys(`count`, `entries`)
            expect(res.body.count).to.be.a(`number`)
            expect(res.body.entries).to.be.an(`array`)
            const entries = res.body.entries
            entries.forEach(e => {
                expect(e).to.have.all.keys(`API`, `Description`, `Auth`, `HTTPS`, `Cors`, `Link`, `Category`)
                expect(e.API).to.be.a(`string`)
                expect(e.API.toLowerCase()).to.match(/at/)
                expect(e.Description).to.be.a(`string`)
                expect(e.Auth).to.be.a(`string`)
                expect(e.HTTPS).to.be.a(`boolean`)
                expect(e.Cors).to.be.a(`string`)
                expect(e.Link).to.be.a(`string`)
                expect(e.Category).to.be.a(`string`)
            });
            const total = entries.length
            expect(res.body.count).to.be.equals(total)
        })
        api.get("/entries?description=at")
        .end((err, res) => {
            expect(res.body).to.be.an(`object`)
            expect(res.body).to.have.all.keys(`count`, `entries`)
            expect(res.body.count).to.be.a(`number`)
            expect(res.body.entries).to.be.an(`array`)
            const entries = res.body.entries
            entries.forEach(e => {
                expect(e).to.have.all.keys(`API`, `Description`, `Auth`, `HTTPS`, `Cors`, `Link`, `Category`)
                expect(e.API).to.be.a(`string`)
                expect(e.Description).to.be.a(`string`)
                expect(e.Description.toLowerCase()).to.match(/at/)
                expect(e.Auth).to.be.a(`string`)
                expect(e.HTTPS).to.be.a(`boolean`)
                expect(e.Cors).to.be.a(`string`)
                expect(e.Link).to.be.a(`string`)
                expect(e.Category).to.be.a(`string`)
            });
            const total = entries.length
            expect(res.body.count).to.be.equals(total)
        })
        api.get("/entries?Auth=apiKey")
        .end((err, res) => {
            expect(res.body).to.be.an(`object`)
            expect(res.body).to.have.all.keys(`count`, `entries`)
            expect(res.body.count).to.be.a(`number`)
            expect(res.body.entries).to.be.an(`array`)
            const entries = res.body.entries
            entries.forEach(e => {
                expect(e).to.have.all.keys(`API`, `Description`, `Auth`, `HTTPS`, `Cors`, `Link`, `Category`)
                expect(e.API).to.be.a(`string`)
                expect(e.Description).to.be.a(`string`)
                expect(e.Auth).to.be.a(`string`)
                expect(e.Auth.toLowerCase()).to.equals(`apikey`)
                expect(e.HTTPS).to.be.a(`boolean`)
                expect(e.Cors).to.be.a(`string`)
                expect(e.Link).to.be.a(`string`)
                expect(e.Category).to.be.a(`string`)
            });
            const total = entries.length
            expect(res.body.count).to.be.equals(total)
        })
        api.get("/entries?https=true")
        .end((err, res) => {
            expect(res.body).to.be.an(`object`)
            expect(res.body).to.have.all.keys(`count`, `entries`)
            expect(res.body.count).to.be.a(`number`)
            expect(res.body.entries).to.be.an(`array`)
            const entries = res.body.entries
            entries.forEach(e => {
                expect(e).to.have.all.keys(`API`, `Description`, `Auth`, `HTTPS`, `Cors`, `Link`, `Category`)
                expect(e.API).to.be.a(`string`)
                expect(e.Description).to.be.a(`string`)
                expect(e.Auth).to.be.a(`string`)
                expect(e.HTTPS).to.be.a(`boolean`)
                expect(e.HTTPS).to.be.true
                expect(e.Cors).to.be.a(`string`)
                expect(e.Link).to.be.a(`string`)
                expect(e.Category).to.be.a(`string`)
            });
            const total = entries.length
            expect(res.body.count).to.be.equals(total)
        })
        api.get("/entries?cors=yes")
        .end((err, res) => {
            expect(res.body).to.be.an(`object`)
            expect(res.body).to.have.all.keys(`count`, `entries`)
            expect(res.body.count).to.be.a(`number`)
            expect(res.body.entries).to.be.an(`array`)
            const entries = res.body.entries
            entries.forEach(e => {
                expect(e).to.have.all.keys(`API`, `Description`, `Auth`, `HTTPS`, `Cors`, `Link`, `Category`)
                expect(e.API).to.be.a(`string`)
                expect(e.Description).to.be.a(`string`)
                expect(e.Auth).to.be.a(`string`)
                expect(e.HTTPS).to.be.a(`boolean`)
                expect(e.Cors).to.be.a(`string`)
                expect(e.Cors.toLowerCase()).to.equals(`yes`)
                expect(e.Link).to.be.a(`string`)
                expect(e.Category).to.be.a(`string`)
            });
            const total = entries.length
            expect(res.body.count).to.be.equals(total)
        })
        api.get("/entries?category=Animals")
        .end((err, res) => {
            expect(res.body).to.be.an(`object`)
            expect(res.body).to.have.all.keys(`count`, `entries`)
            expect(res.body.count).to.be.a(`number`)
            expect(res.body.entries).to.be.an(`array`)
            const entries = res.body.entries
            entries.forEach(e => {
                expect(e).to.have.all.keys(`API`, `Description`, `Auth`, `HTTPS`, `Cors`, `Link`, `Category`)
                expect(e.API).to.be.a(`string`)
                expect(e.Description).to.be.a(`string`)
                expect(e.Auth).to.be.a(`string`)
                expect(e.HTTPS).to.be.a(`boolean`)
                expect(e.Cors).to.be.a(`string`)
                expect(e.Link).to.be.a(`string`)
                expect(e.Category).to.be.a(`string`)
                expect(e.Category).to.equals(`Animals`)
            });
            const total = entries.length
            expect(res.body.count).to.be.equals(total)
            done()
        })
    }).timeout(15000)
    it(`Validate Response status more than one with valid param`, (done) => {
        api.get("/entries?title=at&category=Animals")
        .end((err, res) => {
            expect(res.status).to.equals(200)
            done()
        })
    }).timeout(15000)
    it(`Validate Response Body more than one with valid param`, (done) => {
        api.get("/entries?title=at&category=Animals")
        .end((err, res) => {
            expect(res.body).to.be.an(`object`)
            expect(res.body).to.have.all.keys(`count`, `entries`)
            expect(res.body.count).to.be.a(`number`)
            expect(res.body.entries).to.be.an(`array`)
            const entries = res.body.entries
            entries.forEach(e => {
                expect(e).to.have.all.keys(`API`, `Description`, `Auth`, `HTTPS`, `Cors`, `Link`, `Category`)
                expect(e.API).to.be.a(`string`)
                expect(e.API.toLowerCase()).to.match(/at/)
                expect(e.Description).to.be.a(`string`)
                expect(e.Auth).to.be.a(`string`)
                expect(e.HTTPS).to.be.a(`boolean`)
                expect(e.Cors).to.be.a(`string`)
                expect(e.Link).to.be.a(`string`)
                expect(e.Category).to.be.a(`string`)
                expect(e.Category).to.include(`Animals`)
            });
            const total = entries.length
            expect(res.body.count).to.be.equals(total)
            done()
        })
    }).timeout(15000)
    it(`Validate Status Code with Invalid value param`, (done) => {
        api.get("/entries?category=invalid")
        .end((err, res) => {
            expect(res.status).to.equals(200)
            done()
        })
    }).timeout(15000)
    it(`Validate Respnse Body with Invalid value param`, (done) => {
        api.get("/entries?category=invalid")
        .end((err, res) => {
            expect(res.body).to.be.an(`object`)
            expect(res.body).to.have.all.keys(`count`, `entries`)
            expect(res.body.count).to.be.a(`number`)
            expect(res.body.entries).to.be.a(`null`)
            done()
        })
    }).timeout(15000)
    it(`Validate Status Code With Invalid Param`, (done) => {
        api.get("/entries?invalidparam=invalid")
        .end((err, res) => {
            expect(res.status).to.equals(400)
            done()
        })
    }).timeout(15000)
})