const fs = require('fs');
const xml2js = require('xml2js');

const filePath = './story/2023-07050730017431280.xml';

// Read the XML file
fs.readFile(filePath, 'utf8', (err, xmlData) => {
  if (err) {
    console.error('Error reading the XML file:', err);
    return;
  }
  // Parse the XML data
  xml2js.parseString(xmlData, (parseErr, result) => {
    if (parseErr) {
      console.error('Error parsing the XML:', parseErr);
      return;
    }

    const cmwStory = result['cmw-story'];
    if (!cmwStory) {
      console.log('cmw-story tag not found in the XML data.');
      return;
    }

    // Extract attributes from the cmw-story tag
    const attributes = cmwStory['$'];
  });
});




/*

cmwStory['$']['docdate']
cmwStory['$']['cmw-story-number']
cmwStory['story-mdata'][0]
cmwStory['body'][0]['headline'][0]
*/


