

// const express = require("express");
// const puppeteer = require("puppeteer");
// const cheerio = require("cheerio");
// const cors = require("cors");
// require("dotenv").config();

// const app = express();
// app.use(cors());

// const fetchDataForDate = async (page, dateFilter) => {
//   const maxRetries = 3;
//   let attempt = 0;
//   while (attempt < maxRetries) {
//     try {
//       await page.goto("https://www.nbc.gov.kh/english/economic_research/exchange_rate.php", { waitUntil: 'networkidle2', timeout: 60000 });
      
//       await page.waitForSelector("#datepicker");
//       await page.$eval(
//         "#datepicker",
//         (datepicker, dateFilter) => {
//           datepicker.value = dateFilter;
//         },
//         dateFilter
//       );

//       await Promise.all([
//         page.waitForNavigation({ waitUntil: 'networkidle2', timeout: 60000 }),
//         page.click('input[name="view"]'),
//       ]);

//       await page.waitForSelector("table.tbl-responsive");

//       const content = await page.content();
//       const $ = cheerio.load(content);

//       const officialExchangeRateRow = $('td:contains("Official Exchange Rate")');
//       const officialExchangeRateText = officialExchangeRateRow.text();
//       const officialExchangeRateMatch = officialExchangeRateText.match(/(\d+)/);
//       const officialExchangeRate = officialExchangeRateMatch
//         ? parseInt(officialExchangeRateMatch[1])
//         : null;

//       return {
//         officialExchangeRate,
//       };
//     } catch (error) {
//       console.error(`Error fetching data for date ${dateFilter}:`, error);
//       attempt++;
//       if (attempt >= maxRetries) {
//         throw new Error(`Failed to fetch data for date ${dateFilter} after ${maxRetries} attempts`);
//       }
//     }
//   }
// };

// app.get("/data", async (req, res) => {
//   try {
//     const today = new Date().toISOString().split("T")[0];
//     const startDate = req.query.startDate || today;
//     const endDate = req.query.endDate || today;

//     const start = new Date(startDate);
//     const end = new Date(endDate);

//     if (start > end) {
//       return res
//         .status(400)
//         .json({ error: "Start date must be before end date" });
//     }

//     const dateArray = [];
//     for (let dt = new Date(start); dt <= end; dt.setDate(dt.getDate() + 1)) {
//       dateArray.push(new Date(dt).toISOString().split("T")[0]);
//     }

//     const { default: pLimit } = await import('p-limit');
//     const limit = pLimit(5); // Limit the number of concurrent Puppeteer instances to 5

//     const browser = await puppeteer.launch({
//       headless: "new",
//       args: ["--no-sandbox", "--disable-setuid-sandbox"],
//       executablePath:
//         process.env.NODE_ENV === "production"
//           ? process.env.PUPPETEER_EXECUTABLE_PATH
//           : undefined,
//     });

//     const page = await browser.newPage();

//     await page.setUserAgent(
//       "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36"
//     );

//     const results = await Promise.all(
//       dateArray.map((date) =>
//         limit(async () => {
//           try {
//             const result = await fetchDataForDate(page, date);
//             return { date, ...result };
//           } catch (error) {
//             console.error(`Failed to fetch data for ${date}:`, error);
//             return { date, error: error.message };
//           }
//         })
//       )
//     );

//     await browser.close();

//     res.json({ ok: true, data: results });
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(500).json({ error: error.message });
//   }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });
