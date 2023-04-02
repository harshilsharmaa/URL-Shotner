const PDFDocument = require('pdfkit');
const fs = require('fs');
const path = require('path');

exports.genrateUrlReport = async (url, analytics) => {
    try {

        // Define the data to be included in the PDF
        const heading = 'Report';


        console.log(analytics);

        // Create a new PDF document
        const doc = new PDFDocument();

        // set page size and margins
        doc.page.width = 612;
        doc.page.height = 792;
        doc.page.margins = { top: 50, bottom: 50, left: 50, right: 50 };

        // Add padding inside the border
        doc.lineWidth(0.5);
        doc.rect(36, 36, doc.page.width - 72, doc.page.height - 72).stroke();

        // Set the document title and metadata
        doc.info['Title'] = 'Report';
        doc.info['Author'] = 'Your Name';
        doc.info['Subject'] = 'Report';
        doc.info['Keywords'] = 'report, url data, clicks';

        // Set the font size and line height
        doc.fontSize(12);
        // doc.lineHeight(1.2);

        // Add the heading
        doc.text(heading, { align: 'center', fontSize: 20, underline: true });

        // add the URL data
        doc.fontSize(16).text('URL Details', { underline: true });
        doc.moveDown();

        doc.font('Helvetica').fontSize(12).text(`URL Name: ${url.urlName}`);
        doc.moveDown();

        doc.font('Helvetica').fontSize(10).text(`Long URL: ${url.longUrl}`);
        doc.moveDown();

        doc.font('Helvetica').text(`Short URL: ${url.shortUrl}`);
        doc.moveDown();

        doc.font('Helvetica').text(`Hash: ${url.hash}`);
        doc.moveDown();

        doc.font('Helvetica').text(`Custom Hash: ${url.customHash}`);
        doc.moveDown();

        doc.font('Helvetica').text(`Captcha: ${url.captcha}`);
        doc.moveDown();

        doc.font('Helvetica').text(`Created At: ${url.createdAt}`);
        doc.moveDown();

        // -----------------------------------------
        // Add the analytics data

        // add the URL data
        doc.fontSize(16).text('Analytics', { underline: true });
        doc.moveDown();

        doc.font('Helvetica').fontSize(12).text(`Clicks: ${url.urlName}`, { underline: true });
        doc.moveDown();
        doc.font('Helvetica').fontSize(10).text(`Total: ${analytics.clicks.total}`);
        doc.moveDown();
        doc.font('Helvetica').fontSize(10).text(`Today: ${analytics.clicks.today}`);
        doc.moveDown();
        doc.font('Helvetica').fontSize(10).text(`This Month: ${analytics.clicks.thisMonth}`);
        doc.moveDown();
        doc.font('Helvetica').fontSize(10).text(`This Year: ${analytics.clicks.thisYear}`);
        doc.moveDown();

        doc.font('Helvetica').fontSize(12).text(`Browsers`, { underline: true });
        doc.moveDown();
        for (let i = 0; i < analytics.browser.length; i++) {
            const browser = analytics.browser[i];
            doc.font('Helvetica').fontSize(10).text(`${browser.name}: ${browser.count}`);
            doc.moveDown();
        }

        doc.font('Helvetica').fontSize(12).text(`Operating Systems`, { underline: true });
        doc.moveDown();
        for (let i = 0; i < analytics.os.length; i++) {
            const os = analytics.os[i];
            doc.font('Helvetica').fontSize(10).text(`${os.name}: ${os.count}`);
            doc.moveDown();
        }

        doc.font('Helvetica').fontSize(12).text(`Devices`, { underline: true });
        doc.moveDown();
        for (let i = 0; i < analytics.device.length; i++) {
            const device = analytics.device[i];
            doc.font('Helvetica').fontSize(10).text(`${device.name}: ${device.count}`);
            doc.moveDown();
        }



        // Save the PDF to a file
        const outputPath = path.join(__dirname, `../public/asset/report-${url.hash}.pdf`);
        doc.pipe(fs.createWriteStream(outputPath));
        doc.end();

        // Schedule the file for deletion
        setTimeout(() => {
            fs.unlink(outputPath, (err) => {
                if (err) {
                    console.error(err);
                } else {
                    console.log(`Deleted file: ${outputPath}`);
                }
            });
        }, 1000*60*5);

        return outputPath;

    } catch (error) {
        console.log(error)
        return false;
    }
}