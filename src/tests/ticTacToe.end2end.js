import { chromium } from 'playwright';
import { startServer } from '../startServer';

const { chromium } = require('playwright');

describe('Tic Tac Toe App', () => {
    let browser;
    let page;
  
    beforeAll(async () => {
      browser = await chromium.launch();
    });
  
    beforeEach(async () => {
      page = await browser.newPage();
      await page.goto('http://localhost:5500');
    });
  
    afterAll(async () => {
      await browser.close();
    });
  
    it('should place X or O when squares are clicked', async () => {
        
        const browser = await chromium.launch();

        const page = await browser.newPage();

        await page.goto('http://localhost:5500');

        // Test clicking on squares to place X or O
        await page.click('#square-0'); 
        await page.waitForSelector('#square-0.X'); 

        await page.click('#square-4'); 
        await page.waitForSelector('#square-4.O'); 

        await page.click('#square-6');
        await page.waitForSelector('#square-6.X'); 

        await page.click('#square-8'); 
        await page.waitForSelector('#square-8.O'); 


        await page.click('#square-3'); 
        await page.waitForSelector('#square-3.X');

        await page.click('#square-4'); 
        await page.waitForSelector('#square-4.O'); 

        await browser.close();
    });
  
    it('should detect a win by getting three X or O in a row', async () => {

        const browser = await chromium.launch();

        const page = await browser.newPage();

        await page.goto('http://localhost:5500');

        await page.click('#square-0');
        await page.click('#square-3');
        await page.click('#square-1');
        await page.click('#square-4');
        await page.click('#square-2');

        const resultMessage = await page.textContent('#message');
        expect(resultMessage).toContain('Player X wins!');

        await browser.close();
    });
  
    it('should end the game in a tie', async () => {
     
        const browser = await chromium.launch();

        const page = await browser.newPage();

        await page.goto('http://localhost:5500');

        // Play a game that ends in a tie
        await page.click('#square-0'); // X
        await page.click('#square-1'); // O
        await page.click('#square-2'); // X
        await page.click('#square-3'); // O
        await page.click('#square-4'); // X
        await page.click('#square-6'); // O
        await page.click('#square-5'); // X
        await page.click('#square-7'); // O
        await page.click('#square-8'); // X

        const resultMessage = await page.textContent('message');
        expect(resultMessage).toContain('It\'s a tie!');

        await browser.close();
    });
  
    it('should reset the game when the reset button is clicked', async () => {

        const browser = await chromium.launch();

        const page = await browser.newPage();

        await page.goto('http://localhost:5500');

        await page.click('#reset');

        const squares = await page.$$('.square');
        const isBoardCleared = await Promise.all(
            squares.map(square => square.getAttribute('class'))
        ).then(classes => classes.every(cls => cls === 'square'));

        expect(isBoardCleared).toBeTruthy();

        await browser.close();
    });
  });
  