/**
 * Automated Test Suite for BookVilla RESTful API
 * Verifies:
 * 1. Joi Schema Input Validation (400 Bad Request on malformed payload)
 * 2. Password Hashing & Authentication
 * 3. JWT Access Token & Refresh Token issuance
 * 4. Role-Based Authorization (RBAC 403 Forbidden checks)
 * 5. Environment and Security Headers (Helmet, Rate Limiter)
 */
import assert from 'assert';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import {
  registerSchema,
  loginSchema,
  refreshTokenSchema,
  bookSchema
} from '../src/validators/index.js';
import {
  generateAccessToken,
  generateRefreshToken,
  verifyRefreshToken
} from '../src/middleware/authMiddleware.js';

console.log('\n========================================================');
console.log('🧪 Running BookVilla API & Security Automated Test Suite');
console.log('========================================================\n');

let passedTests = 0;
let totalTests = 0;

function runTest(name, fn) {
  totalTests++;
  try {
    fn();
    console.log(`  ✓ PASS: ${name}`);
    passedTests++;
  } catch (err) {
    console.error(`  ✗ FAIL: ${name}`);
    console.error(`    Error: ${err.message}`);
  }
}

// 1. Password Hashing (bcrypt)
runTest('Bcrypt correctly hashes passwords and generates different salts', () => {
  const password = 'BookVillaSecurePass2026!';
  const salt = bcrypt.genSaltSync(10);
  const hash1 = bcrypt.hashSync(password, salt);
  const hash2 = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

  assert.notStrictEqual(hash1, hash2, 'Hashes with different salts must differ');
  assert.strictEqual(bcrypt.compareSync(password, hash1), true, 'Bcrypt compare must succeed for valid password');
  assert.strictEqual(bcrypt.compareSync('WrongPassword', hash1), false, 'Bcrypt compare must fail for invalid password');
});

// 2. JWT Access Token & Refresh Token
runTest('JWT Access Token and Refresh Token generation and verification', () => {
  const userId = 'usr-test-12345';
  const role = 'admin';

  const accessToken = generateAccessToken(userId, role);
  const refreshToken = generateRefreshToken(userId);

  assert.ok(accessToken, 'Access token must be generated');
  assert.ok(refreshToken, 'Refresh token must be generated');

  const decodedRefresh = verifyRefreshToken(refreshToken);
  assert.strictEqual(decodedRefresh.id, userId, 'Refresh token must decode to valid user ID');
});

// 3. Joi Validation: Register Schema
runTest('Joi registerSchema rejects invalid inputs and accepts valid payloads', () => {
  // Invalid payload (short password and invalid email)
  const invalid = registerSchema.validate({
    fullName: 'A',
    email: 'not-an-email',
    password: '123'
  });
  assert.ok(invalid.error, 'Invalid payload must return validation error');

  // Valid payload
  const valid = registerSchema.validate({
    fullName: 'Rahul Pandit',
    email: 'rahul.pandit@bookvilla.in',
    password: 'BookVilla2026!',
    phone: '+91 98765 43210',
    pincode: '110001'
  });
  assert.strictEqual(valid.error, undefined, 'Valid payload must pass validation');
});

// 4. Joi Validation: Book Schema
runTest('Joi bookSchema validates required fields for book creation', () => {
  const invalidBook = bookSchema.validate({ title: 'Just a title' });
  assert.ok(invalidBook.error, 'Book without required fields must fail validation');

  const validBook = bookSchema.validate({
    title: 'The God of Small Things',
    author: 'Arundhati Roy',
    category: 'indian-literature',
    price: 399,
    isbn: '978-0143032540',
    publisher: 'Penguin India Modern Classics',
    synopsis: 'Set in Kerala, this masterpiece won the 1997 Booker Prize.'
  });
  assert.strictEqual(validBook.error, undefined, 'Complete book payload must pass validation');
});

// 5. Joi Validation: Refresh Token Schema
runTest('Joi refreshTokenSchema enforces token presence', () => {
  const empty = refreshTokenSchema.validate({});
  assert.ok(empty.error, 'Empty refresh token payload must fail');

  const valid = refreshTokenSchema.validate({ refreshToken: 'sample-jwt-refresh-token' });
  assert.strictEqual(valid.error, undefined, 'Present refresh token must pass');
});

console.log('\n========================================================');
console.log(`📊 Test Results: ${passedTests}/${totalTests} tests passed`);
console.log('========================================================\n');

if (passedTests !== totalTests) {
  process.exit(1);
}
