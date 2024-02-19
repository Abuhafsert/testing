import express from "express";
import bodyParser from "body-parser"
import { dirname } from "path";
import { fileURLToPath } from "url";
import  puppeteer  from 'puppeteer';
import dotenv from 'dotenv'

const __dirname = dirname(fileURLToPath(import.meta.url));
dotenv.config()

const app = express();
const port = 4000;
let band = ''
let url = 'https://www.instagram.com/'

// const url = 'https://bot.sannysoft.com/'
let insta = 'https://www.instagram.com/accounts/login/'
let urls = 'https://www.instagram.com/'


app.use(bodyParser.urlencoded({ extended: true }))



function bandName(req, res , next){
    band = `${req.body['username']}${req.body['Amount']}`
    next();
}
app.use(bandName)

const instaBot = async (amounts, user) => {
    let accounts = process.env.accounts.split(',')

    let password = process.env.password.split(',')
    for (let i = 0; i < amounts; i++) {
        
            const browser = await puppeteer.launch({headless: 'New'});
            const page = await browser.newPage();
            await page.goto(insta);
            await page.waitForSelector('input[name="username"]');
            await page.type('input[name="username"]', accounts[i]);
          await page.type('input[name="password"]', password[i]);
          await page.click('button[type="submit"]');
          
          console.log('loggin successfully')
          await page.waitForNavigation()
          await page.goto(`${urls}${user}`)
          const element = await page.waitForSelector('div ::-p-text(Follow)');
        //   await page.waitForSelector('//div[contains(text(), "Follow")]');
        // await page.waitForTimeout(3000)

        element.click()
        // let com = await page.$eval('::-p-getById(span ._ac2a)', (h1)=>{
        //     return h1.innerText;
        // });
        // console.log(com)
        
        // await page.click('//div[contains(text(), "Follow")]');
        //   await follow[0].click()
          await page.waitForTimeout(5000)
          // Add a wait for some selector on the home page to load to ensure the next step works correctly
        //   await page.screenshot({path: './pages.jpg'});
          await browser.close();
}
  
};



app.get("/", (req, res) => {
    // console.log(__dirname + "/index.html")
    res.sendFile(__dirname + "/index.html");
});

app.post('/submit', (req, res) => {
    instaBot(req.body['Amount'], req.body['username'])
    // res.sendFile(__dirname, "/index.html")
    // res.send(`<h1>your address is:</h1><p>${band}</p>`)
    // app.get("/", (req, res) => {
    //     // console.log(__dirname + "/index.html")
    //     res.sendFile(__dirname + "/index.html");
    // });
    console.log(req.body)
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


// app.get("/", (req, res) => {
//   res.send("<h1>Home Page</h1>");
// });

// app.post("/register", (req, res) => {
//   //Do something with the data
//   res.sendStatus(201);
// });

// app.put("/user/angela", (req, res) => {
//   res.sendStatus(200);
// });

// app.patch("/user/angela", (req, res) => {
//   res.sendStatus(200);
// });

// app.delete("/user/angela", (req, res) => {
//   //Deleting
//   res.sendStatus(200);
// });

// app.listen(port, () => {
//   console.log(`Server started on port ${port}`);
// });
