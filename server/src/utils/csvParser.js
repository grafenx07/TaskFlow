import fs from 'fs';
import csvParser from 'csv-parser';
import xlsx from 'xlsx';
import path from 'path';

/**
 * Parse CSV file and return array of records
 * @param {string} filePath - Path to CSV file
 * @returns {Promise<Array>} - Array of parsed records
 */
export const parseCSV = (filePath) => {
  return new Promise((resolve, reject) => {
    const results = [];

    fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (data) => results.push(data))
      .on('end', () => {
        resolve(results);
      })
      .on('error', (error) => {
        reject(error);
      });
  });
};

/**
 * Parse Excel file (XLSX/XLS) and return array of records
 * @param {string} filePath - Path to Excel file
 * @returns {Array} - Array of parsed records
 */
export const parseExcel = (filePath) => {
  try {
    const workbook = xlsx.readFile(filePath);
    const sheetName = workbook.SheetNames[0]; // Get first sheet
    const worksheet = workbook.Sheets[sheetName];
    const records = xlsx.utils.sheet_to_json(worksheet);

    return records;
  } catch (error) {
    throw new Error(`Failed to parse Excel file: ${error.message}`);
  }
};

/**
 * Main parser function - detects file type and parses accordingly
 * @param {string} filePath - Path to file
 * @returns {Promise<Array>} - Array of parsed records
 */
export const parseFile = async (filePath) => {
  const ext = path.extname(filePath).toLowerCase();

  try {
    let records;

    if (ext === '.csv') {
      records = await parseCSV(filePath);
    } else if (ext === '.xlsx' || ext === '.xls') {
      records = parseExcel(filePath);
    } else {
      throw new Error('Unsupported file format');
    }

    return records;
  } catch (error) {
    throw error;
  }
};

/**
 * Validate parsed records structure
 * @param {Array} records - Array of records to validate
 * @returns {Object} - Validation result
 */
export const validateRecords = (records) => {
  const errors = [];

  if (!records || records.length === 0) {
    return {
      valid: false,
      errors: ['File is empty or contains no valid data']
    };
  }

  // Check for required fields in each record
  records.forEach((record, index) => {
    const requiredFields = ['FirstName', 'Phone'];
    const missingFields = [];

    requiredFields.forEach(field => {
      // Check both exact case and case-insensitive
      const hasField = Object.keys(record).some(
        key => key.toLowerCase() === field.toLowerCase()
      );

      if (!hasField || !record[field]) {
        missingFields.push(field);
      }
    });

    if (missingFields.length > 0) {
      errors.push(`Row ${index + 1}: Missing or empty fields - ${missingFields.join(', ')}`);
    }
  });

  return {
    valid: errors.length === 0,
    errors
  };
};

/**
 * Normalize record field names (handle case-insensitive field names)
 * @param {Array} records - Array of records
 * @returns {Array} - Normalized records
 */
export const normalizeRecords = (records) => {
  return records.map(record => {
    const normalized = {};

    // Map fields case-insensitively
    Object.keys(record).forEach(key => {
      const lowerKey = key.toLowerCase();

      if (lowerKey === 'firstname') {
        normalized.firstName = record[key];
      } else if (lowerKey === 'phone') {
        normalized.phone = String(record[key]); // Ensure phone is string
      } else if (lowerKey === 'notes') {
        normalized.notes = record[key] || '';
      }
    });

    return normalized;
  });
};
